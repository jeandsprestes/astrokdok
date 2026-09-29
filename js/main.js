'use strict';
// Tela de título, introdução e início.
A.titleScene = () => {
  const st = A.stars(60);
  let t = 0;
  return {
    update(dt) { t += dt; },
    draw() {
      A.cls(0);
      A.drawStars(st, 3, t * 10);
      A.txtO('ASTROKDOK', 80 - A.txtW('ASTROKDOK', 2) / 2, 26, 2, 1, 2);
      A.txtC('VIAGENS ESPACIAIS', 44, 3);
      const y = 66 + Math.round(Math.sin(t * 2) * 3);
      A.drawS(A.FLAME[Math.floor(t * 10) % 2], 74, y + 26, 2);
      A.drawS(A.SHIPS[0], 64, y, 2);
      if (Math.floor(t * 2) % 2) A.txtC('APERTE A', 118, 2);
    },
  };
};

const waitStart = () => new Promise(r => {
  const scr = A.$('#screen');
  const go = () => { A.modal = null; scr.onclick = null; A.sfx('ok'); r(); };
  A.modal = { key: k => { if (k === 'a') go(); return true; } };
  scr.onclick = go;
});

const askRival = () => new Promise(res => {
  const u = A.ui(`<span class="tag">CADASTRO DE CADETE</span><p class="q">Todo cadete tem um RIVAL: aquele colega metido que acha que sabe tudo.</p><p>Qual é o nome do seu rival?</p>
    <input class="name" id="rv" maxlength="10" value="OTÁVIO" autocomplete="off"><button class="btn" id="ok">ESSE MESMO ▶</button>`);
  u.querySelector('#ok').onclick = () => {
    const v = u.querySelector('#rv').value.replace(/[^\p{L}\p{N} ]/gu, '').trim().toUpperCase();
    A.S.rival = v || 'OTÁVIO';
    A.sfx('ok'); A.uiClose(); res();
  };
});

A.intro = async () => {
  const st = A.stars(70);
  let t = 0;
  A.setScene({ update(dt) { t += dt; }, draw() {
    A.cls(0); A.drawStars(st, 3);
    A.disc(120, 28, 8, 3); A.disc(123, 26, 7, 0);
    A.rect(0, 100, 160, 44, 1);
    for (let i = 0; i < 160; i++) A.rect(i, 84 + Math.round(Math.abs(((i + 30) % 70) - 35) * 0.45), 1, 20, 0);
    A.rect(60, 104, 26, 18, 2); A.rect(56, 98, 34, 7, 0); A.rect(70, 112, 7, 10, 0); A.rect(64, 108, 4, 4, 3);
  } });
  A.hud('VALE DO CAPÃO', '');
  await A.fade(0);
  await A.say([
    'Vale do Capão, Bahia. Uma noite cheia de estrelas.',
    'Gabriel Rosa, 10 anos, encontra uma carta embaixo da porta. O envelope é amarelo e preto...',
    '"Parabéns! Você foi aceito como CADETE da ASTROKDOK, a empresa de viagens espaciais."',
    '"Apresente-se amanhã na base. Traga curiosidade. O resto a gente ensina."',
  ]);
  await askRival();
  await A.say({ who: '{rival}', t: 'Hunf. Então você é o novato? Vamos ver quem chega mais longe no espaço.' });
  A.S.started = true; A.save();
  await A.toBase(4, 5, 'down');
  await A.say([
    { who: 'KDOK', t: 'Bip-bop! Cadete Gabriel! Eu sou o Kdok, o robô ajudante da Astrokdok.' },
    { who: 'KDOK', t: 'Ande com as setas. Para falar com alguém, fique de frente e aperte A. O botão B abre o menu.' },
    { who: 'KDOK', t: 'Primeiro, fale com o Comandante Julius. É aquele de uniforme preto, perto do foguete!' },
  ]);
};

A.boot = async () => {
  const had = A.load() && A.S.started;
  A.setScene(A.titleScene());
  A.hud('ASTROKDOK', had ? `★ ${A.S.stars}` : '');
  await waitStart();
  const opts = had ? ['CONTINUAR', 'NOVO JOGO'] : ['NOVO JOGO'];
  const c = opts[await A.choose('', opts)];
  if (c === 'CONTINUAR') { await A.toBase(4, 5, 'down'); return; }
  if (had) {
    const k = await A.choose('Começar do zero? Todo o progresso salvo será apagado.', ['NÃO, VOLTAR', 'SIM, APAGAR TUDO']);
    if (k === 0) { A.boot(); return; }
  }
  const mute = A.S.mute;
  A.S = A.newSave(); A.S.mute = mute;
  await A.fade(1);
  await A.intro();
};

if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {});
A.boot();
