'use strict';
// Minijogos: Magalhães (astrolábio), Andrômeda (corredores de estrelas), Final (3 etapas + sintonia).

// ---------- MAGALHÃES: medir o ângulo da estrela-guia ----------
A.GAMES.magellan = () => {
  const PX = 20, PY = 118, R = 96;
  const pt = a => [PX + Math.cos(a * Math.PI / 180) * R, PY - Math.sin(a * Math.PI / 180) * R];
  return A.game({
    hud: 'MISSÃO 16 · ASTROLÁBIO', keys: '▲ ▼ GIRA · A MEDE', lives: 2 + A.lifeBonus('astrolabio'), intro: 'PONTEIRO EM CIMA DA ESTRELA',
    init(g) { g.ok = 0; g.need = 5; g.round = 0; g.p = 10; g.T = A.ri(20, 72); g.res = null; g.resT = 0; },
    update(g, dt) {
      g.resT -= dt;
      if (g.res && g.resT <= 0) { g.res = null; g.T = A.ri(18, 74); }
      if (g.res) return;
      g.p = A.clamp(g.p + ((A.K.up || A.K.left ? 1 : 0) - (A.K.down || A.K.right ? 1 : 0)) * 28 * dt, 0, 90);
      g.shown = g.p + Math.sin(g.t * 2.3) * (1.5 + g.ok * 1.1);
      if (A.hit('a')) {
        const err = Math.round(Math.abs(g.shown - g.T));
        if (err <= 3) { g.ok++; A.sfx('ok'); if (g.ok >= g.need) { g.win('NAVEGACAO PRECISA!'); return; } }
        else g.hurt();
        g.res = `ESTRELA ${g.T}° · ERRO ${err}°`; g.resT = 1.6;
      }
    },
    draw(g) {
      A.cls(0);
      for (let i = 0; i < 50; i++) A.rect((i * 53) % 160, (i * 37) % 100, 1, 1, i % 6 ? 1 : 3);
      const tilt = Math.sin(g.t * 2.3) * 2;
      for (let x = 0; x < 160; x++) { const y = Math.round(PY + (x - 80) * tilt / 80); A.rect(x, y, 1, 144 - y, 1); if ((x + Math.floor(g.t * 20)) % 9 === 0) A.rect(x, y + 4, 3, 1, 2); }
      for (let a = 0; a <= 90; a += 10) { const [x, y] = pt(a); A.rect(x, y, 2, 2, 1); }
      const [sx, sy] = pt(g.T);
      A.disc(sx, sy, 3, 3); A.rect(sx - 6, sy, 13, 1, 2); A.rect(sx, sy - 6, 1, 13, 2);
      const sh = g.shown == null ? g.p : g.shown;
      for (let k = 0; k < R; k += 2) { const a = sh * Math.PI / 180; A.rect(PX + Math.cos(a) * k, PY - Math.sin(a) * k, 1, 1, 2); }
      A.disc(PX, PY, 5, 2); A.disc(PX, PY, 3, 0);
    },
    top(g) {
      A.rect(0, 0, 160, 10, 0); A.hearts(g.lives, g.maxL, 2, 2);
      A.txt(`MEDIDAS ${g.ok}/${g.need}`, 96, 3, 3);
      A.rect(0, 134, 160, 10, 0);
      A.txt(g.res || `PONTEIRO ${Math.round(g.shown == null ? g.p : g.shown)}°`, 4, 136, g.res ? 2 : 3);
    },
  });
};

// ---------- ANDRÔMEDA: recolher a luz das estrelas nos corredores ----------
const MAZE = ['....#.....', '.##.#.###.', '.#.......#', '...##.#...', '.#......#.', '.#.###.##.', '..........', '.##.#..##.'];
A.GAMES.andromeda = () => {
  const V = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] }, OPP = { up: 'down', down: 'up', left: 'right', right: 'left' };
  const open = (x, y) => x >= 0 && y >= 0 && x < 10 && y < 8 && MAZE[y][x] !== '#';
  const HOLES = [[9, 0], [5, 2]];
  return A.game({
    hud: 'MISSÃO 17 · ANDRÔMEDA', keys: '▲▼◀▶ ANDAR', lives: 3, intro: 'RECOLHA TODAS AS ESTRELAS',
    init(g) {
      g.dots = new Set(); MAZE.forEach((r, y) => [...r].forEach((c, x) => { if (c === '.') g.dots.add(x + ',' + y); }));
      g.p = { x: 0, y: 7, fx: 0, fy: 7, d: null, t: 0 }; g.dots.delete('0,7');
      g.total = g.dots.size + 1;
      g.h = HOLES.map(([x, y]) => ({ x, y, fx: x, fy: y, d: 'left', t: 0 }));
    },
    update(g, dt) {
      const p = g.p;
      const want = ['up', 'down', 'left', 'right'].find(k => A.K[k]);
      p.t += dt;
      if (p.t >= 0.16) {
        p.t = 0;
        if (want && open(p.x + V[want][0], p.y + V[want][1])) p.d = want;
        if (p.d && open(p.x + V[p.d][0], p.y + V[p.d][1])) { p.x += V[p.d][0]; p.y += V[p.d][1]; }
        else p.d = null;
        const k = p.x + ',' + p.y;
        if (g.dots.delete(k)) { A.tone(1200, 0.03); if (!g.dots.size) { g.win('ANDROMEDA ATRAVESSADA!'); return; } }
      }
      p.fx += (p.x - p.fx) * Math.min(1, dt * 14); p.fy += (p.y - p.fy) * Math.min(1, dt * 14);
      g.h.forEach(h => {
        h.t += dt;
        if (h.t >= 0.3) {
          h.t = 0;
          let opts = Object.keys(V).filter(d => open(h.x + V[d][0], h.y + V[d][1]) && d !== OPP[h.d]);
          if (!opts.length) opts = [OPP[h.d]];
          const dist = d => Math.abs(h.x + V[d][0] - p.x) + Math.abs(h.y + V[d][1] - p.y);
          h.d = Math.random() < 0.65 ? opts.sort((a, b) => dist(a) - dist(b))[0] : A.pick(opts);
          h.x += V[h.d][0]; h.y += V[h.d][1];
        }
        h.fx += (h.x - h.fx) * Math.min(1, dt * 10); h.fy += (h.y - h.fy) * Math.min(1, dt * 10);
        if (Math.hypot(h.fx - p.fx, h.fy - p.fy) < 0.6 && g.hurt()) g.h.forEach((q, i) => { q.x = q.fx = HOLES[i][0]; q.y = q.fy = HOLES[i][1]; });
      });
    },
    draw(g) {
      A.cls(0);
      MAZE.forEach((r, y) => [...r].forEach((c, x) => {
        const X = x * 16, Y = 16 + y * 16;
        if (c === '#') { A.rect(X, Y, 16, 16, 1); A.rect(X + 2, Y + 2, 12, 12, 0); for (let i = 0; i < 3; i++) A.rect(X + 3 + i * 4, Y + 4 + (i % 2) * 6, 1, 1, 2); }
        else if (g.dots.has(x + ',' + y)) { A.rect(X + 7, Y + 6, 2, 4, 3); A.rect(X + 6, Y + 7, 4, 2, 3); }
      }));
      g.h.forEach(h => { const X = h.fx * 16 + 8, Y = 16 + h.fy * 16 + 8; for (let r = 7; r > 4; r--) A.disc(X, Y, r, r % 2 ? 2 : 1); A.disc(X, Y, 4, 0); });
      if (g.state === 'lose') A.boom(g.p.fx * 16 + 8, 16 + g.p.fy * 16 + 8);
      else if (A.flick(g)) A.draw(A.GAB[g.p.d || 'down'][Math.floor(g.t * 8) % 4], g.p.fx * 16, 16 + g.p.fy * 16 - 2);
    },
    top(g) { A.rect(0, 0, 160, 16, 0); A.hearts(g.lives, g.maxL, 2, 5); A.txt(`ESTRELAS ${g.total - g.dots.size}/${g.total}`, 84, 6, 3); },
  });
};

// ---------- FINAL: três etapas e a sintonia do sinal ----------
A.GAMES.tune = () => A.game({
  hud: 'FINAL 3/3 · SINTONIA', keys: '◀ ▶ GIRA · A TRAVA', lives: 1, intro: 'SINTONIZE O SINAL',
  init(g) { g.f = 5; g.goal = [A.ri(25, 45), A.ri(55, 75), A.ri(82, 96)]; g.goal.sort(() => Math.random() - 0.5); g.k = 0; g.img = A.BODIES.cmb().img; g.msg = ''; g.msgT = 0; },
  update(g, dt) {
    g.msgT -= dt;
    g.f = A.clamp(g.f + ((A.K.right ? 1 : 0) - (A.K.left ? 1 : 0)) * 20 * dt, 0, 100);
    g.dist = Math.abs(g.f - g.goal[g.k]);
    if (Math.random() < Math.min(0.6, g.dist / 40)) A.hiss(0.04, 0.01 + Math.min(0.03, g.dist / 1500));
    if (A.hit('a')) {
      if (g.dist < 2.5) { g.k++; A.sfx('up'); g.msg = `FAIXA ${g.k} SINTONIZADA!`; g.msgT = 1.3; if (g.k >= 3) g.win('SINAL CAPTADO!'); }
      else { A.sfx('bad'); g.msg = 'AINDA TEM CHIADO'; g.msgT = 1; }
    }
  },
  draw(g) {
    A.cls(0);
    const show = Math.min(3, g.k);
    A.ctx.save(); A.ctx.beginPath(); A.ctx.rect(0, 12, 160 * show / 3, 104); A.ctx.clip(); A.draw(g.img, 0, 0); A.ctx.restore();
    const n = g.state === 'win' ? 0 : Math.floor(40 + (g.dist || 0) * 12);
    for (let i = 0; i < n; i++) A.rect(Math.random() * 160, 12 + Math.random() * 104, 1, 1, A.ri(1, 3));
    A.rect(0, 118, 160, 26, 0);
    A.rect(8, 124, 144, 3, 1);
    for (let i = 0; i <= 10; i++) A.rect(8 + i * 14.4, 122, 1, 7, 1);
    A.rect(8 + g.f * 1.44 - 1, 119, 3, 11, 2);
    const bars = g.state === 'win' ? 5 : Math.max(0, 5 - Math.floor((g.dist || 99) / 7));
    for (let i = 0; i < 5; i++) A.rect(120 + i * 6, 140 - i * 2 - 2, 4, i * 2 + 2, i < bars ? 2 : 1);
    A.txt(`${Math.round(88 + g.f * 0.2)}.${Math.round(g.f * 7) % 10} MHZ`, 8, 134, 3);
  },
  top(g) { A.rect(0, 0, 160, 11, 0); A.txt(`FAIXAS ${g.k}/3`, 4, 3, 3); if (g.msgT > 0) A.txt(g.msg, 56, 3, 2); },
});
A.GAMES.final = async () => {
  if (!await A.GAMES.asteroids({ need: 8, hud: 'FINAL 1/3 · ASTEROIDES' })) return false;
  await A.say({ who: 'KDOK', t: 'Bip! Etapa 1 vencida! Agora as luas-guia: repita a sequência.' });
  if (!await A.GAMES.jupiter({ rounds: [3, 4, 5], hud: 'FINAL 2/3 · LUAS-GUIA' })) return false;
  await A.say({ who: 'ZÉ DO RÁDIO', t: 'Chegou a hora! Gire o botão da antena devagar. Onde o chiado sumir, aperte A. São 3 faixas.' });
  return A.GAMES.tune();
};
