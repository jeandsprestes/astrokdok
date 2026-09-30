'use strict';
// Local de lançamento, contagem, minijogo, retorno da missão e fim de episódio.
const GROUND = 108;
const OLD_GUIDE = { capao: 'dito', alcantara: 'nara', atacama: 'paz' };

A.siteScene = M => {
  const kind = M.scene;
  const bg = A.mk(160, 144, x => { A.SITES[kind](x); A.rect(104, GROUND, 44, 4, 0, x); A.rect(106, GROUND, 40, 1, 2, x); });
  const guide = M.site.look ? A.look(M.site.look) : A.CH[OLD_GUIDE[kind]];
  const extra = (M.site.extra || []).map(l => typeof l === 'string' ? A.CH[l] : A.look(l));
  const s = { cd: null, t: 0 };
  s.update = dt => { s.t += dt; };
  s.draw = () => {
    A.draw(bg, 0, 0);
    extra.forEach((c, i) => A.draw(c.down[0], 4 + i * 14, GROUND - 14));
    A.draw(guide.down[0], 30, GROUND - 14);
    A.draw(A.GAB.right[0], 52, GROUND - 14);
    A.draw(A.KDOK, 72, GROUND - 15 + Math.round(Math.sin(s.t * 4)));
    A.drawS(A.SHIPS[A.shipLevel()], 110, GROUND - 32, 2);
    if (s.cd) { A.rect(0, 40, 160, 38, 0); A.rect(0, 41, 160, 1, 2); A.rect(0, 76, 160, 1, 2); A.txtC(s.cd, 47, 2, s.cd.length > 2 ? 3 : 5); }
  };
  return s;
};

A.runSite = async M => {
  await A.fade(1);
  const sc = A.siteScene(M);
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
  const gen = A.BODIES[body] && A.BODIES[body]();
  const img = gen ? gen.img : body === 'earth' ? A.bigEarth(44) : body === 'moon' ? A.bigEarth(11) : A.bigSun(70);
  const s = { mode: 'body', t: 0 };
  s.update = dt => { s.t += dt; };
  s.draw = () => {
    const t = s.t, ship = A.SHIPS[A.shipLevel()];
    if (s.mode === 'reward') {
      A.cls(0); A.drawStars(st, 3);
      for (let i = 0; i < 12; i++) { const a = i / 12 * 6.28 + t; A.rect(80 + Math.cos(a) * (40 + Math.sin(t * 3) * 4), 70 + Math.sin(a) * 40, 2, 2, 2); }
      A.drawS(ship, 48, 38, 4);
      return;
    }
    if (s.mode === 'radio') {
      A.cls(0); A.drawStars(st, 3);
      A.draw(A.bigEarth(20), 58, 90);
      for (let k = 0; k < 4; k++) { const r = ((t * 30 + k * 12) % 48) + 6; A.rect(80 - r, 80 - r * 0.6, r * 2, 1, k % 2 ? 2 : 3); }
      A.txtC('RADIO DE CASA', 12, 2);
      return;
    }
    if (gen) { A.draw(img, 0, 0); A.draw(ship, gen.ship[0], gen.ship[1] + Math.round(Math.sin(t * 3) * 2)); return; }
    A.cls(0); A.drawStars(st, 3);
    if (body === 'earth') { A.draw(img, 36, 30); A.draw(ship, 10 + (t * 8) % 40, 12); }
    else if (body === 'moon') {
      A.draw(img, 118, 16);
      for (let i = 0; i < 160; i++) { const y = Math.round(104 + Math.sin(i / 12) * 4 + Math.sin(i / 5) * 1.5); A.rect(i, y, 1, 144 - y, 3); }
      A.disc(30, 118, 6, 2); A.disc(128, 126, 8, 2);
      A.draw(ship, 64, 88);
      A.rect(92, 84, 1, 20, 0); A.rect(93, 84, 8, 3, 2); A.rect(93, 87, 8, 3, 0);
    } else {
      A.draw(img, 10, -80);
      A.draw(ship, 72, 104 + Math.round(Math.sin(t * 3) * 2));
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
  const ep = A.EPISODES.find(e => e.upTo === A.S.m);
  if (ep) await A.episodeEnd(ep);
  await A.toBase(5, 5, 'right');
  if (!A.over()) await A.say({ who: 'KDOK', t: 'Bip! O Comandante quer falar com você sobre a próxima missão!' });
};

A.episodeEnd = async ep => {
  const st = A.stars(80), last = ep.n === A.EPISODES.length;
  let t = 0;
  A.setScene({ update(dt) { t += dt; }, draw() {
    A.cls(0); A.drawStars(st, 3, t * 6);
    const a = last ? 'VOCE ZEROU' : 'FIM DO', b = last ? 'ASTROKDOK!' : `EPISODIO ${ep.n}`;
    A.txtO(a, 80 - A.txtW(a, 2) / 2, 36, 2, 0, 2); A.txtO(b, 80 - A.txtW(b, 2) / 2, 52, 2, 0, 2);
    A.drawS(A.SHIPS[A.shipLevel()], 64, 76 + Math.round(Math.sin(t * 2) * 3), 2);
  } });
  A.hud(last ? 'ASTROKDOK · FIM' : `EPISÓDIO ${ep.n} · ${ep.title.toUpperCase()}`, `★ ${A.S.stars}`);
  if (last) A.sfx('win');
  await A.say(ep.end);
  const next = A.EPISODES[ep.n];
  await A.btnWait(`<span class="tag">${last ? 'VOCÊ ZEROU ASTROKDOK' : `FIM DO EPISÓDIO ${ep.n}`}</span><h2>${ep.rank} {nome}</h2>
    <p>Estrelas: <b>★ ${A.S.stars}</b><br>Cosmodex: <b>${A.S.cards.length}/${A.COSMODEX.length}</b></p>
    ${next ? `<p>Próximo episódio: <b>${next.title.toUpperCase()}</b>.</p><p>Continua...</p>` : '<p>Da Terra até a borda do universo observável. Obrigado por jogar, comandante.</p>'}`, 'VOLTAR PARA A BASE ▶');
};
