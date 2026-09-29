'use strict';
// Local de lançamento, contagem, minijogo, retorno da missão e fim do episódio.
const ridge = (x, fn, c, from = 0, to = 160) => { for (let i = from; i < to; i++) { const y = Math.round(fn(i)); A.rect(i, y, 1, 144 - y, c, x); } };
const GROUND = 108;
const SITES = {
  capao: x => {
    A.rect(0, 0, 160, 144, 3, x);
    A.disc(132, 20, 9, 2, x);
    // Morro do Pai Inácio (topo reto) e a serra
    ridge(x, i => i > 18 && i < 62 ? 38 + (i < 24 ? (24 - i) * 3 : 0) + (i > 56 ? (i - 56) * 3 : 0) : 64 + Math.sin(i / 11) * 6, 1);
    A.rect(24, 38, 33, 1, 0, x);
    ridge(x, i => 76 + Math.sin(i / 9 + 1) * 5, 2);
    ridge(x, () => GROUND, 1);
    for (let i = 0; i < 160; i += 7) A.rect(i + (i % 3), GROUND + 4 + (i % 5) * 5, 2, 1, 2, x);
    for (const tx of [6, 150]) { A.disc(tx, 90, 7, 0, x); A.disc(tx, 90, 6, 1, x); A.rect(tx - 1, 96, 2, 12, 0, x); }
    A.rect(8, 96, 16, 12, 3, x); A.rect(6, 92, 20, 5, 0, x); A.rect(14, 101, 4, 7, 0, x);
  },
  alcantara: x => {
    A.rect(0, 0, 160, 144, 3, x);
    A.disc(30, 22, 9, 2, x);
    for (let i = 0; i < 60; i += 6) A.rect(i, 64 - (i * 7) % 9, 5, 8 + (i * 7) % 9, 1, x);
    A.rect(0, 70, 160, 30, 1, x);
    for (let i = 0; i < 12; i++) A.rect((i * 29) % 150, 74 + (i * 7) % 22, 8, 1, 2, x);
    ridge(x, () => 98, 2);
    ridge(x, () => GROUND, 1);
    for (let i = 0; i < 3; i++) { A.rect(10 + i * 12, 86, 3, 22, 0, x); A.rect(10 + i * 12, 84, 12, 3, 0, x); }
    A.rect(146, 30, 3, 78, 0, x);
    for (let y = 32; y < 106; y += 6) A.rect(140, y, 12, 1, 0, x);
    A.rect(140, 30, 1, 78, 0, x);
  },
  atacama: x => {
    A.rect(0, 0, 160, 144, 0, x);
    for (let i = 0; i < 70; i++) A.rect((i * 37) % 160, (i * 23) % 60, 1, 1, i % 5 ? 3 : 2, x);
    ridge(x, i => 58 + Math.abs(((i + 20) % 60) - 30) * 0.9, 1);
    ridge(x, i => 90 + Math.sin(i / 14) * 4, 2);
    ridge(x, () => GROUND, 1);
    for (const [dx, r] of [[18, 9], [42, 7]]) { A.disc(dx, 90, r, 3, x); A.rect(dx - r, 90, r * 2 + 1, r, 3, x); A.rect(dx - 1, 90 - r, 2, r, 1, x); }
    for (let i = 0; i < 4; i++) { const ax = 62 + i * 10; A.rect(ax + 3, 92, 2, 8, 3, x); A.rect(ax, 88, 8, 2, 3, x); A.rect(ax + 1, 90, 6, 1, 3, x); }
  },
};
const GUIDE = { capao: 'dito', alcantara: 'nara', atacama: 'paz' };

A.siteScene = kind => {
  const bg = A.mk(160, 144, x => { SITES[kind](x); A.rect(104, GROUND, 44, 4, 0, x); A.rect(106, GROUND, 40, 1, 2, x); });
  const s = { cd: null, t: 0 };
  s.update = dt => { s.t += dt; };
  s.draw = () => {
    A.draw(bg, 0, 0);
    A.draw(A.CH[GUIDE[kind]].down[0], 30, GROUND - 14);
    A.draw(A.GAB.right[0], 52, GROUND - 14);
    A.draw(A.KDOK, 72, GROUND - 15 + Math.round(Math.sin(s.t * 4)));
    A.drawS(A.SHIPS[A.shipLevel()], 110, GROUND - 32, 2);
    if (s.cd) { A.rect(0, 40, 160, 38, 0); A.rect(0, 41, 160, 1, 2); A.rect(0, 76, 160, 1, 2); A.txtC(s.cd, 47, 2, s.cd.length > 2 ? 3 : 5); }
  };
  return s;
};

A.runSite = async M => {
  await A.fade(1);
  const sc = A.siteScene(M.scene);
  A.setScene(sc);
  A.hud(M.where.toUpperCase(), `★ ${A.S.stars}`);
  await A.fade(0);
  if (A.S.step < 3) {
    await A.say(M.site.intro);
    await A.runLesson(M.site.lesson);
    A.hud(M.where.toUpperCase(), `★ ${A.S.stars}`);
    await A.say(M.site.outro);
    A.S.step = 3; A.save();
  }
  await A.runLaunch(M, sc);
};

A.runLaunch = async (M, sc) => {
  let first = true;
  for (;;) {
    if (first) await A.say(M.gameIntro);
    first = false;
    for (const n of ['3', '2', '1', 'JÁ!']) { sc.cd = n; A.sfx(n === 'JÁ!' ? 'up' : 'warn'); await A.wait(750); }
    sc.cd = null;
    await A.fade(1, 200);
    const game = A.GAMES[M.game]();
    await A.fade(0, 200);
    if (await game) break;
    const c = await A.choose('A missão falhou... mas todo astronauta erra antes de acertar. Tentar de novo?', ['TENTAR DE NOVO', 'VOLTAR PARA A BASE']);
    if (c === 1) { await A.toBase(5, 5, 'right'); return; }
    A.setScene(sc);
    A.hud(M.where.toUpperCase(), `★ ${A.S.stars}`);
  }
  await A.runDebrief(M);
};

A.debriefScene = body => {
  const st = A.stars(50);
  const img = body === 'earth' ? A.bigEarth(44) : body === 'moon' ? A.bigEarth(11) : A.bigSun(70);
  const s = { mode: 'body', t: 0 };
  s.update = dt => { s.t += dt; };
  s.draw = () => {
    const t = s.t;
    A.cls(0); A.drawStars(st, 3);
    if (s.mode === 'reward') {
      for (let i = 0; i < 12; i++) { const a = i / 12 * 6.28 + t; A.rect(80 + Math.cos(a) * (40 + Math.sin(t * 3) * 4), 70 + Math.sin(a) * 40, 2, 2, 2); }
      A.drawS(A.SHIPS[A.shipLevel()], 48, 38, 4);
      return;
    }
    if (s.mode === 'radio') {
      A.draw(A.bigEarth(20), 58, 90);
      for (let k = 0; k < 4; k++) { const r = ((t * 30 + k * 12) % 48) + 6; A.rect(80 - r, 80 - r * 0.6, r * 2, 1, k % 2 ? 2 : 3); }
      A.txtC('RADIO DE CASA', 12, 2);
      return;
    }
    if (body === 'earth') { A.draw(img, 36, 30); A.draw(A.SHIPS[A.shipLevel()], 10 + (t * 8) % 40, 12); }
    else if (body === 'moon') {
      A.draw(img, 118, 16);
      ridge(A.ctx, i => 104 + Math.sin(i / 12) * 4 + Math.sin(i / 5) * 1.5, 3);
      A.disc(30, 118, 6, 2); A.disc(128, 126, 8, 2);
      A.draw(A.SHIPS[A.shipLevel()], 64, 88);
      A.rect(92, 84, 1, 20, 0); A.rect(93, 84, 8, 3, 2); A.rect(93, 87, 8, 3, 0);
    } else {
      A.draw(img, 10, -80);
      A.draw(A.SHIPS[A.shipLevel()], 72, 104 + Math.round(Math.sin(t * 3) * 2));
      A.rect(69, 100, 22, 2, 3);
    }
  };
  return s;
};

A.runDebrief = async M => {
  await A.fade(1);
  const sc = A.debriefScene(M.body);
  A.setScene(sc);
  A.hud(`MISSÃO ${M.n} · SUCESSO!`, `★ ${A.S.stars}`);
  await A.fade(0);
  await A.say(M.debrief);
  if (!A.S.cards.includes(M.card.id)) A.S.cards.push(M.card.id);
  A.sfx('up');
  await A.btnWait(`<span class="tag">COSMODEX · NOVO REGISTRO</span><h2>${M.card.name}</h2><div class="card">${M.card.lines.join('<br>')}</div>`, 'GUARDAR NO COSMODEX ▶');
  if (!A.has(M.reward.id)) A.S.items.push(M.reward.id);
  sc.mode = 'reward'; A.sfx('win');
  await A.btnWait(`<span class="tag">ITEM NOVO!</span><h2>${M.reward.name}</h2><p>${M.reward.desc}</p>`, 'INSTALAR ▶');
  sc.mode = 'radio'; A.sfx('blip');
  await A.btnWait(`<span class="tag">RÁDIO DE CASA · MENSAGEM RECEBIDA</span><p>"${M.radio}"</p><p style="text-align:right">— Papai</p>`, 'CÂMBIO ▶');
  await A.btnWait(`<span class="tag">MISSÃO DE VERDADE</span><h2>Para fazer fora do jogo</h2><p>${M.real}</p>`, 'ACEITO ▶');
  A.S.m++; A.S.step = 0; A.save();
  if (A.over()) await A.episodeEnd();
  await A.toBase(5, 5, 'right');
  if (!A.over()) await A.say({ who: 'KDOK', t: 'Bip! O Comandante quer falar com você sobre a próxima missão!' });
};

A.episodeEnd = async () => {
  const st = A.stars(80);
  let t = 0;
  A.setScene({ update(dt) { t += dt; }, draw() { A.cls(0); A.drawStars(st, 3, t * 6); A.txtO('FIM DO', 80 - A.txtW('FIM DO', 2) / 2, 40, 2, 0, 2); A.txtO('EPISODIO 1', 80 - A.txtW('EPISODIO 1', 2) / 2, 56, 2, 0, 2); A.drawS(A.SHIPS[2], 64, 80, 2); } });
  A.hud('ASTROKDOK', `★ ${A.S.stars}`);
  await A.say(A.EPISODE_END);
  await A.btnWait(`<span class="tag">FIM DO EPISÓDIO 1</span><h2>Gabriel Rosa, piloto da Astrokdok</h2>
    <p>Estrelas: <b>★ ${A.S.stars}</b><br>Cosmodex: <b>${A.S.cards.length}/${A.COSMODEX.length}</b></p>
    <p>Próximo episódio: <b>MERCÚRIO, VÊNUS e MARTE</b>.</p><p>Continua...</p>`, 'VOLTAR PARA A BASE ▶');
};
