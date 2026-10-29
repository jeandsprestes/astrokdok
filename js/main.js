'use strict';
// Tela de título, escolha do nome, introdução e início.
A.titleScene = () => {
  const st = A.stars(60);
  let t = 0;
  return {
    update(dt) { t += dt; },
    draw() {
      A.usePal('espaco');
      A.cls(0);
      A.drawStars(st, 3, t * 10);
      A.disc(136, 120, 22, '#1e5bd8'); A.disc(130, 114, 7, '#3fae4b'); A.disc(144, 126, 5, '#3fae4b');
      A.usePal('brand');
      A.txtO('ASTROKDOK', 80 - A.txtW('ASTROKDOK', 2) / 2, 26, 2, 0, 2);
      A.txtC('VIAGENS ESPACIAIS', 44, '#ffffff');
      const y = 66 + Math.round(Math.sin(t * 2) * 3);
      A.drawS(A.FLAME[Math.floor(t * 10) % 2], 74, y + 26, 2);
      A.drawS(A.SHIPS[0], 64, y, 2);
      if (Math.floor(t * 2) % 2) A.txtC('APERTE A', 118, '#ffffff');
    },
  };
};

const waitStart = () => new Promise(r => {
  const scr = A.$('#screen');
  const go = () => { A.modal = null; scr.onclick = null; A.sfx('ok'); r(); };
  A.modal = { key: k => { if (k === 'a') go(); return true; } };
  scr.onclick = go;
});

const clean = v => v.replace(/[^\p{L}\p{N} ]/gu, '').trim().toUpperCase();
// def: o que já vem escrito; vazio: o que vale se a caixa ficar em branco
const askText = (tag, html, def, vazio = '') => new Promise(res => {
  const u = A.ui(`<span class="tag">${tag}</span>${html}<input class="name" id="tx" maxlength="10" value="${def}" autocomplete="off"><button class="btn" id="ok">PRONTO ▶</button>`);
  const inp = u.querySelector('#tx');
  inp.onfocus = () => inp.select();
  u.querySelector('#ok').onclick = () => { const v = clean(inp.value); A.sfx('ok'); A.uiClose(); res(v || vazio); };
});
A.askRival = () => askText('CADASTRO DE CADETE', '<p class="q">Todo cadete tem uma MELHOR AMIGA OU AMIGO na turma: alguém que torce por você e ajuda quando a coisa aperta.</p><p>Qual é o nome dessa pessoa?</p><p>Se preferir, deixe em branco: aí o nome fica OTÁVIO.</p>', (A.S && A.S.rival) || '', 'OTÁVIO');
A.askName = async () => {
  A.S.nome = await askText('CADASTRO DE CADETE', '<p class="q">Boas-vindas à Astrokdok!</p><p>Qual é o seu nome, cadete?</p><p>Se preferir, deixe em branco: aí você é só CADETE.</p>', A.S.nome || '');
  A.save();
};

// tela de aparência: setas para cada parte e o boneco montado em cima, de frente e de lado
const LOOK_ROWS = [['hair', 'CABELO'], ['hairCol', 'COR DO CABELO'], ['skin', 'PELE'], ['shirt', 'ROUPA DE CIMA'], ['legs', 'PARTE DE BAIXO'], ['legsCol', 'COR DE BAIXO'], ['shoe', 'CALÇADO']];
A.askLook = () => new Promise(res => {
  const l = Object.assign({}, A.LOOK0, A.S.look);
  const u = A.ui(`<span class="tag">CADASTRO DE CADETE</span><p class="q">Monte o seu visual!</p>
    <div class="lookPv"><canvas width="16" height="16"></canvas><canvas width="16" height="16"></canvas></div>
    ${LOOK_ROWS.map(([k, n]) => `<div class="lookRow"><span>${n}</span><button class="lb" data-k="${k}" data-d="-1">◀</button><em data-v="${k}"></em><button class="lb" data-k="${k}" data-d="1">▶</button></div>`).join('')}
    <button class="btn" id="ok">PRONTO ▶</button>`);
  const [cf, cs] = u.querySelectorAll('canvas');
  const draw = () => {
    const ch = A.charOf(l);
    [[cf, ch.down[0]], [cs, ch.right[0]]].forEach(([c, img]) => { const x = c.getContext('2d'); x.clearRect(0, 0, 16, 16); x.drawImage(img, 0, 0); });
    LOOK_ROWS.forEach(([k]) => { const [n, v] = A.LOOKS[k][l[k]]; u.querySelector(`[data-v="${k}"]`).innerHTML = (v[0] === '#' ? `<i style="background:${v}"></i>` : '') + n; });
  };
  u.querySelectorAll('.lb').forEach(b => b.onclick = () => { const k = b.dataset.k, n = A.LOOKS[k].length; l[k] = (l[k] + +b.dataset.d + n) % n; A.sfx('blip'); draw(); });
  u.querySelector('#ok').onclick = () => { A.S.look = l; A.applyLook(); A.save(); A.sfx('ok'); A.uiClose(); res(); };
  draw();
});

// avisos do começo: o primeiro é para o adulto que pode estar junto na primeira vez
A.avisos = async () => {
  if (A.avisado) return; // uma vez por abertura do jogo
  A.avisado = true;
  await A.btnWait(`<span class="tag">PARA O PAI, A MÃE OU QUEM CUIDA</span><h2>Como o jogo salva</h2>
    <p>O progresso fica salvo <b>sozinho</b>, neste aparelho e neste navegador. Não tem conta nem senha.</p>
    <p><b>Para não perder o progresso:</b></p>
    <p>1. No celular, coloque o jogo na tela inicial. No Android (Chrome): menu ⋮ e "Adicionar à tela inicial". No iPhone (Safari): botão Compartilhar (se não achar, toque antes em ⋯) e "Adicionar à Tela de Início".</p>
    <p>2. Jogue sempre no mesmo aparelho e no mesmo navegador.</p>
    <p>3. Não use aba anônima e não limpe os dados do navegador.</p>
    <p>No iPhone, se o jogo não estiver na tela inicial, o Safari pode apagar o progresso depois de 7 dias sem abrir o jogo.</p>`, 'ENTENDI ▶');
  await A.btnWait(`<span class="tag">ANTES DE DECOLAR</span><h2>Separe o material</h2>
    <p>Pegue <b>papel, lápis e borracha</b> e deixe do seu lado.</p>
    <p>Nas aulas tem conta para fazer e coisa para anotar. Fazer no papel ajuda muito a acertar e a aprender!</p>`, 'TUDO PRONTO ▶');
};

A.intro = async () => {
  const st = A.stars(70);
  let t = 0;
  A.setScene({ update(dt) { t += dt; }, draw() {
    A.usePal('noite'); A.cls(0); A.drawStars(st, 3);
    A.disc(120, 28, 8, '#fff6c8'); A.disc(123, 26, 7, 0);
    A.rect(0, 100, 160, 44, '#1d4a2a');
    for (let i = 0; i < 160; i++) A.rect(i, 84 + Math.round(Math.abs(((i + 30) % 70) - 35) * 0.45), 1, 20, '#123320');
    A.rect(60, 104, 26, 18, '#8fb1e8'); A.rect(56, 98, 34, 7, '#a8331f'); A.rect(70, 112, 7, 10, '#5a3417'); A.rect(64, 108, 4, 4, '#ffd34d');
  } });
  A.hud('VALE DO CAPÃO', '');
  await A.fade(0);
  await A.askName();
  await A.askLook();
  await A.say([
    'Vale do Capão, Bahia. Uma noite cheia de estrelas.',
    '{nome} encontra uma carta embaixo da porta. O envelope é amarelo e preto...',
    '"Parabéns! Você foi {{aceito|aceita}} como CADETE da ASTROKDOK, a empresa de viagens espaciais."',
    '"Você vai estudar na Escola do Capão e voar com a gente. Traga curiosidade. O resto a gente ensina."',
  ]);
  A.S.rival = await A.askRival();
  await A.say([{ who: '{rival}', t: 'Ei, {nome}! Você também entrou na Astrokdok? Que demais! Vamos juntos até o fim do espaço.' }, { who: '{rival}', t: 'Se alguma aula apertar, me chama. A gente estuda junto.' }]);
  A.S.started = true; A.save();
  await A.toBase(4, 5, 'down');
  await A.say([
    { who: 'KDOK', t: 'Bip-bop! Cadete {nome}! Eu sou o Kdok, o robô ajudante da Astrokdok.' },
    { who: 'KDOK', t: 'Ande com as setas. Para falar com alguém, fique de frente e aperte A. O botão B abre o menu.' },
    { who: 'KDOK', t: 'Primeiro, fale com o Comandante Dozinho. É aquele de uniforme preto, perto do foguete!' },
  ]);
};

A.boot = async () => {
  const had = A.load() && A.S.started;
  A.applyLook();
  A.setScene(A.titleScene());
  A.hud('ASTROKDOK', had ? `★ ${A.S.stars}` : '');
  await waitStart();
  if (!had) await A.avisos();
  const opts = had ? ['CONTINUAR', 'ESCOLHER MISSÃO', 'NOVO JOGO'] : ['NOVO JOGO', 'ESCOLHER MISSÃO'];
  const c = opts[await A.choose('', opts)];
  if (c === 'ESCOLHER MISSÃO') {
    if (!had) { const mute = A.S.mute; A.S = A.newSave(); A.S.mute = mute; A.applyLook(); }
    if (!await A.pickMission()) { A.boot(); return; }
    if (!had || !A.S.nome) await A.askNames();
    await A.toBase(4, 5, 'down');
    await A.missionHello();
    return;
  }
  if (c === 'CONTINUAR') {
    if (!A.S.nome) await A.askName();
    await A.toBase(4, 5, 'down');
    return;
  }
  if (had) {
    const k = await A.choose('Começar do zero? Todo o progresso salvo será apagado.', ['NÃO, VOLTAR', 'SIM, APAGAR TUDO']);
    if (k === 0) { A.boot(); return; }
    await A.avisos();
  }
  const mute = A.S.mute;
  A.S = A.newSave(); A.S.mute = mute; A.applyLook();
  await A.fade(1);
  await A.intro();
};

if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {});
A.boot();
