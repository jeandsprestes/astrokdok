'use strict';
// Ambiente de teste (02/11/2026): só os minijogos das 18 missões, sem aulas, com feedback de dificuldade.
// O jogo de verdade não é tocado: este arquivo não salva nada no progresso da criança.
A.save = () => {};
A.S = A.newSave(); A.S.started = false; A.S.nome = 'TESTE'; A.S.rival = A.AMIGO;
A.applyLook();

const NOTAS = ['MUITO FÁCIL', 'FÁCIL', 'NA MEDIDA', 'DIFÍCIL', 'MUITO DIFÍCIL', 'IMPOSSÍVEL'];
let db = null, dados = {};
(window.claude ? window.claude.use('db') : Promise.resolve(null)).then(d => {
  db = d;
  if (db) db.collection('feedback').onSnapshot(q => { dados = {}; q.docs.forEach(x => { const v = x.data(); (dados[v.missao] = dados[v.missao] || []).push(v); }); }, () => {});
}).catch(() => {});

const ceu = () => {
  const st = A.stars(60); let t = 0;
  return { update(dt) { t += dt; }, draw() { A.usePal('espaco'); A.cls(0); A.drawStars(st, 3, t * 10); A.usePal('brand'); A.txtO('TESTE', 80 - A.txtW('TESTE', 2) / 2, 30, 2, 0, 2); A.txtC('DOS JOGOS', 52, '#ffffff'); } };
};
const nomeJogo = (M, i) => `${i + 1} · ${M.card ? M.card.name : M.place}`;

let desistir = null;
A.$('#skipBtn').textContent = 'DESISTIR';
A.$('#skipBtn').onclick = () => { if (desistir) { A.sfx('blip'); A.setScene(null); const r = desistir; desistir = null; r(false); } };

async function menu() {
  A.setScene(ceu());
  A.hud('TESTE DOS JOGOS', '');
  const u = A.ui(`<span class="tag">SÓ OS JOGOS</span><h2>Escolha um jogo</h2>
    <p>Sem aulas e sem exercícios. Jogue quantas vezes quiser e, no fim, diga o que achou da dificuldade.</p>
    <div class="tj">${A.MISSIONS.map((M, i) => { const f = dados[i + 1]; return `<button class="opt" data-i="${i}">${nomeJogo(M, i)}${f ? `<br><small>✓ ${f.length} feedback(s)</small>` : ''}</button>`; }).join('')}</div>
    ${db ? '' : '<p><small>Os feedbacks só são guardados quando a página é aberta pelo link do Claude, com a conta conectada.</small></p>'}`);
  u.querySelectorAll('.opt').forEach(b => b.onclick = () => { A.sfx('blip'); A.uiClose(); jogar(+b.dataset.i); });
}

async function jogar(i) {
  const M = A.MISSIONS[i];
  A.S.m = i;
  A.hud(nomeJogo(M, i), '');
  A.setScene(ceu());
  if (M.gameIntro) await A.say(M.gameIntro);
  let tent = 0, venceu = false;
  for (;;) {
    tent++;
    await A.fade(1, 200);
    const fim = new Promise(r => { desistir = r; });
    A.skipArmed = true; A.$('#skipBtn').hidden = false;
    const game = A.GAMES[M.game]();
    await A.fade(0, 200);
    const r = await Promise.race([game, fim]);
    desistir = null; A.skipArmed = false; A.$('#skipBtn').hidden = true;
    A.setScene(ceu()); A.hud(nomeJogo(M, i), '');
    venceu = venceu || !!r;
    const c = await A.choose(`${r ? 'Venceu!' : 'Não deu desta vez.'} Tentativa ${tent}.`, ['JOGAR DE NOVO', 'DAR FEEDBACK', 'VOLTAR À LISTA']);
    if (c === 0) continue;
    if (c === 1) await feedback(M, i, tent, venceu);
    return menu();
  }
}

function feedback(M, i, tent, venceu) {
  return new Promise(res => {
    let nota = -1;
    const u = A.ui(`<span class="tag">FEEDBACK</span><h2>${nomeJogo(M, i)}</h2>
      <p>${tent} tentativa(s), ${venceu ? 'venceu' : 'não venceu'}. Qual foi a dificuldade?</p>
      <div class="nota">${NOTAS.map((n, k) => `<button class="opt" data-k="${k}">${n}</button>`).join('')}</div>
      <p>O que mudar? (opcional)</p><textarea class="fb" placeholder="Ex.: muito rápido no fim, os controles confundem..."></textarea>
      <p id="msg"></p><button class="btn" id="ok">SALVAR</button> <button class="btn" id="sai">SAIR SEM SALVAR</button>`);
    u.querySelectorAll('.nota .opt').forEach(b => b.onclick = () => { nota = +b.dataset.k; u.querySelectorAll('.nota .opt').forEach(x => x.classList.toggle('on', x === b)); });
    u.querySelector('#sai').onclick = () => { A.uiClose(); res(); };
    u.querySelector('#ok').onclick = async () => {
      const msg = u.querySelector('#msg');
      if (nota < 0) { msg.textContent = 'Escolha a dificuldade primeiro.'; return; }
      if (!db) { msg.textContent = 'Não deu para guardar: abra pelo link do Claude.'; return; }
      msg.textContent = 'Guardando...';
      try {
        await db.collection('feedback').add({ missao: i + 1, jogo: M.game, nota, notaTexto: NOTAS[nota], venceu, tentativas: tent, comentario: u.querySelector('textarea').value.trim().slice(0, 2000), quando: new Date().toISOString() });
        A.sfx('ok'); A.uiClose(); res();
      } catch (e) { msg.textContent = 'Não deu para guardar (' + (e && e.code || 'erro') + '). Tente de novo.'; }
    };
  });
}

menu();
