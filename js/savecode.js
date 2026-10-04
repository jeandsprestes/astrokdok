'use strict';
// Código de save: 5 letras que guardam missão, etapa e estrelas. Funciona mesmo se o celular apagar os dados.
const ABC = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'; // sem 0, 1, I e O (fáceis de confundir)
const lessonsDone = (m, step) => {
  const out = [];
  A.MISSIONS.forEach((M, i) => {
    const all = [...M.lessons, M.site.lesson];
    if (i < m) out.push(...all);
    else if (i === m) out.push(...all.slice(0, step));
  });
  return out;
};
const check = p => ((p * 2654435761) >>> 0) % 509;

A.saveCode = (S = A.S) => {
  const step = S.m >= A.MISSIONS.length ? 0 : S.step;
  const p = S.m | (step << 5) | (Math.min(511, S.stars) << 7);
  let v = p * 512 + check(p), s = '';
  for (let i = 0; i < 5; i++) { s = ABC[v % 32] + s; v = Math.floor(v / 32); }
  return s;
};

// devolve {m, step, stars} ou null se o código não vale
A.readCode = txt => {
  const s = String(txt).toUpperCase().replace(/[^0-9A-Z]/g, '');
  if (s.length !== 5) return null;
  let v = 0;
  for (const ch of s) { const k = ABC.indexOf(ch); if (k < 0) return null; v = v * 32 + k; }
  const p = Math.floor(v / 512);
  if (v % 512 !== check(p)) return null;
  const m = p & 31, step = (p >> 5) & 3, stars = p >> 7;
  if (m > A.MISSIONS.length || (m === A.MISSIONS.length && step)) return null;
  if (stars > lessonsDone(m, step).reduce((a, L) => a + L.quiz.length, 0)) return null;
  return { m, step, stars };
};

A.codeLabel = c => c.m >= A.MISSIONS.length ? `Jogo zerado · ★ ${c.stars}` : `Missão ${c.m + 1} · ${['começando', '1 aula feita', '2 aulas feitas', 'pronto para lançar'][c.step]} · ★ ${c.stars}`;

// monta um save completo a partir do código (itens, cartas e aulas saem da missão)
A.applyCode = c => {
  const S = A.newSave();
  S.m = c.m; S.step = c.step; S.started = true; S.mute = A.S ? A.S.mute : false;
  A.MISSIONS.slice(0, c.m).forEach(M => { S.items.push(M.reward.id); S.cards.push(M.card.id); });
  let left = c.stars;
  lessonsDone(c.m, c.step).forEach(L => { const got = Math.min(L.quiz.length, left); S.lessons[L.id] = got; left -= got; });
  S.stars = c.stars;
  A.S = S; A.save();
};

// cartão por cima de tudo, sem atrapalhar o que está acontecendo no jogo
A.showCard = html => new Promise(res => {
  const card = A.$('#card'), box = A.$('#cardBox'), prev = A.modal;
  box.innerHTML = A.fmt(html) + '<button class="btn" id="cardOk">FECHAR</button>';
  card.hidden = false;
  A.modal = { key: () => true };
  box.querySelector('#cardOk').onclick = () => { A.sfx('blip'); card.hidden = true; A.modal = prev; res(); };
});
A.saveCardHtml = () => {
  const c = { m: A.S.m, step: A.over() ? 0 : A.S.step, stars: A.S.stars };
  return `<span class="tag">JOGO SALVO</span><h2>Seu código de save</h2><div class="code">${A.saveCode()}</div>
    <p><b>Tire uma foto</b> ou anote este código. Se o jogo sumir do celular, abra o jogo, escolha <b>CARREGAR CÓDIGO</b> e digite o código.</p>
    <p>Progresso guardado: <b>${A.codeLabel(c)}</b></p>`;
};
A.manualSave = () => { A.save(); A.sfx('ok'); return A.showCard(A.saveCardHtml()); };
A.$('#saveBtn').onclick = () => { if (A.S && A.S.started && A.$('#card').hidden) A.manualSave(); };

// pede nome do jogador e do rival (o código não guarda nomes)
A.askNames = async () => {
  await A.askName();
  A.S.rival = await A.askRival();
  A.save();
};

// tela de digitar o código
A.enterCode = () => new Promise(res => {
  const u = A.ui(`<span class="tag">CARREGAR CÓDIGO</span><p class="q">Digite o código de save (5 letras e números):</p>
    <input class="name" id="cd" maxlength="7" autocomplete="off" autocapitalize="characters" spellcheck="false"><div id="cmsg"></div>
    <div class="row"><button class="btn alt" id="back">◀ VOLTAR</button><button class="btn" id="go2">CARREGAR</button></div>`);
  const inp = u.querySelector('#cd'), msg = u.querySelector('#cmsg');
  u.querySelector('#back').onclick = () => { A.sfx('blip'); A.uiClose(); res(null); };
  u.querySelector('#go2').onclick = () => {
    const c = A.readCode(inp.value);
    if (!c) { A.sfx('bad'); msg.innerHTML = '<div class="fb no"><b>Código inválido.</b> Confira as letras e os números na foto.</div>'; return; }
    A.sfx('ok'); A.uiClose(); res(c);
  };
});

// carrega um código (da tela ou do link), confirma se for apagar um jogo mais adiantado e vai para a base
A.loadCode = async c => {
  if (A.S && A.S.started && (A.S.m > c.m || (A.S.m === c.m && A.S.step > c.step))) {
    const k = await A.choose(`Você já tem um jogo salvo mais adiantado neste celular (${A.codeLabel({ m: A.S.m, step: A.S.step, stars: A.S.stars })}). Carregar o código mesmo assim?`, ['NÃO, CONTINUAR O MEU JOGO', 'SIM, CARREGAR O CÓDIGO']);
    if (k === 0) return false;
  }
  A.applyCode(c);
  await A.askNames();
  await A.toBase(4, 5, 'down');
  await A.say({ who: 'KDOK', t: A.over() ? 'Bip! Jogo carregado, comandante {nome}!' : `Bip! Jogo carregado! ${A.objective()}` });
  return true;
};

// pede ao navegador para não apagar os dados do jogo
if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
