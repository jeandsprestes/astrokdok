'use strict';
// Mundo em ladrilhos 16x16 (10x9) e caminhada estilo Pokémon.
const T = 16, STEP = 0.17;
const R = (x, px, py, w, h, c) => { x.fillStyle = A.PAL[c]; x.fillRect(px, py, w, h); };
const floor = (x, px, py) => { R(x, px, py, T, T, 3); R(x, px, py + 7, T, 1, 2); R(x, px, py + 15, T, 1, 2); R(x, px + (py % 32 ? 4 : 11), py, 1, 7, 2); R(x, px + (py % 32 ? 11 : 4), py + 8, 1, 7, 2); };
const grass = (x, px, py) => { R(x, px, py, T, T, 3); [[3, 4], [11, 2], [7, 10], [13, 12], [2, 13]].forEach(([a, b]) => { R(x, px + a, py + b, 1, 2, 2); R(x, px + a + 2, py + b, 1, 2, 2); R(x, px + a + 1, py + b + 1, 1, 2, 2); }); };
const wall = (x, px, py) => { R(x, px, py, T, T, 1); for (let i = 0; i < 4; i++) { R(x, px, py + i * 4 + 3, T, 1, 0); R(x, px + (i % 2 ? 4 : 12), py + i * 4, 1, 3, 0); } };
const TILE = {
  '.': floor,
  '#': wall,
  'W': (x, px, py) => { wall(x, px, py); R(x, px + 2, py + 2, 12, 11, 0); R(x, px + 3, py + 3, 10, 9, 3); R(x, px + 7, py + 3, 2, 9, 0); R(x, px + 3, py + 7, 10, 1, 0); R(x, px + 4, py + 4, 2, 2, 2); },
  'B': (x, px, py) => { wall(x, px, py); R(x, px, py + 1, T, 12, 0); R(x, px, py + 13, T, 2, 2); R(x, px, py + 15, T, 1, 0); },
  'D': (x, px, py) => { floor(x, px, py); R(x, px + 1, py + 3, 14, 10, 0); R(x, px + 2, py + 4, 12, 8, 1); R(x, px + 2, py + 4, 12, 2, 2); R(x, px + 4, py + 7, 5, 3, 3); },
  'c': (x, px, py) => { floor(x, px, py); R(x, px + 3, py + 4, 10, 9, 0); R(x, px + 4, py + 5, 8, 7, 1); },
  'g': (x, px, py) => { floor(x, px, py); R(x, px + 3, py + 4, 10, 9, 0); R(x, px + 4, py + 5, 8, 7, 2); R(x, px + 7, py + 6, 2, 5, 0); R(x, px + 5, py + 8, 6, 1, 0); },
  'T': (x, px, py) => { floor(x, px, py); R(x, px, py + 3, T, 11, 0); R(x, px, py + 4, T, 9, 1); R(x, px, py + 4, T, 2, 2); },
  'd': (x, px, py) => { floor(x, px, py); R(x, px + 1, py + 6, 14, 10, 0); R(x, px + 2, py + 7, 12, 9, 2); for (let i = 0; i < 3; i++) R(x, px + 3, py + 9 + i * 2, 10, 1, 1); },
  ',': grass,
  'p': (x, px, py) => { R(x, px, py, T, T, 2); [[2, 3], [9, 6], [5, 11], [13, 13], [12, 1]].forEach(([a, b]) => R(x, px + a, py + b, 2, 1, 1)); },
  't': (x, px, py) => { grass(x, px, py); A.disc(px + 8, py + 7, 7, 0, x); A.disc(px + 8, py + 7, 6, 1, x); R(x, px + 4, py + 3, 3, 2, 2); R(x, px + 10, py + 6, 2, 2, 2); R(x, px + 7, py + 13, 2, 3, 0); },
  'r': (x, px, py) => { R(x, px, py, T, T, 0); for (let i = 1; i < T; i += 3) R(x, px, py + i, T, 1, 1); },
  'w': (x, px, py) => { R(x, px, py, T, T, 2); R(x, px, py + 14, T, 2, 1); R(x, px + 3, py + 3, 10, 8, 0); R(x, px + 4, py + 4, 8, 6, 3); R(x, px + 8, py + 4, 1, 6, 0); },
  'e': (x, px, py) => { R(x, px, py, T, T, 2); R(x, px + 2, py + 2, 12, 14, 0); R(x, px + 3, py + 3, 10, 13, 1); R(x, px + 10, py + 9, 2, 2, 2); },
  'S': (x, px, py) => { grass(x, px, py); R(x, px + 7, py + 8, 2, 7, 0); R(x, px + 4, py + 13, 3, 2, 0); R(x, px + 9, py + 13, 3, 2, 0); for (let i = 0; i < 9; i++) R(x, px + 2 + i, py + 8 - Math.floor(i / 2), 2, 3, i === 8 ? 2 : 0); },
  'R': (x, px, py) => { R(x, px, py, T, T, 1); R(x, px, py, T, 1, 0); R(x, px, py, 1, T, 0); for (let i = 2; i < T; i += 4) R(x, px + i, py + i, 3, 1, 2); },
  // estante de livros
  'Q': (x, px, py) => { R(x, px, py, T, T, 0); for (let r = 0; r < 3; r++) { R(x, px + 1, py + 1 + r * 5, 14, 4, 1); for (let i = 0; i < 6; i++) R(x, px + 2 + i * 2, py + 1 + r * 5 + (i % 2), 1, 4 - (i % 2), [2, 3, 2, 1, 3, 2][(i + r) % 6]); } },
  // prateleira de laboratório
  'L': (x, px, py) => { wall(x, px, py); R(x, px, py + 9, T, 2, 0); [[2, 3], [7, 2], [11, 3]].forEach(([a, h]) => { R(x, px + a, py + 9 - h * 2, 3, h * 2, 3); R(x, px + a + 1, py + 9 - h * 2 - 2, 1, 2, 3); R(x, px + a, py + 7, 3, 2, 2); }); },
  // bancada de laboratório
  'K': (x, px, py) => { floor(x, px, py); R(x, px + 1, py + 3, 14, 10, 0); R(x, px + 2, py + 4, 12, 8, 3); R(x, px + 3, py + 5, 3, 5, 2); R(x, px + 4, py + 3, 1, 2, 0); R(x, px + 9, py + 7, 4, 3, 1); },
  // mesa de piquenique (pátio)
  'P': (x, px, py) => { grass(x, px, py); R(x, px + 1, py + 4, 14, 8, 0); R(x, px + 2, py + 5, 12, 6, 1); for (let i = 4; i < 14; i += 4) R(x, px + i, py + 5, 1, 6, 2); },
  // banquinho no pátio (h = do jogador)
  'j': (x, px, py) => { grass(x, px, py); A.disc(px + 8, py + 8, 4, 0, x); A.disc(px + 8, py + 8, 3, 1, x); },
  'h': (x, px, py) => { grass(x, px, py); A.disc(px + 8, py + 8, 5, 0, x); A.disc(px + 8, py + 8, 4, 2, x); R(x, px + 7, py + 6, 2, 5, 0); R(x, px + 5, py + 8, 6, 1, 0); },
  // portão do pátio
  'o': (x, px, py) => { R(x, px, py, T, T, 2); [[2, 3], [9, 6], [5, 11]].forEach(([a, b]) => R(x, px + a, py + b, 2, 1, 1)); },
};
const SOLID = '#WBDTctrwSRQLKPj';
const DIRS = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
const OPP = { up: 'down', down: 'up', left: 'right', right: 'left' };

A.MAPS = {
  base: ['rrrrttrrrr', 'wwwwttwwww', 'wwewttweww', ',,p,,,,p,,', ',,pppppp,,', 't,,,p,,,,t', 'tS,,p,,RRt', 't,,,p,,RRt', 'tttttttttt'],
  school: ['#WBBBBBW##', '#.....TT.#', '#........#', '#.D.D.D..#', '#.c.c.g..#', '#.D.D.D..#', '#.c.c.c..#', '#........#', '####d#####'],
  lab: ['#LBBBBBLL#', '#.....TT.#', '#........#', '#.K.K.K..#', '#.c.c.g..#', '#.K.K.K..#', '#.c.c.c..#', '#........#', '####d#####'],
  biblio: ['#QBBBBBQQ#', '#.....TT.Q', '#........Q', '#.D.D.D..Q', '#.c.c.g..#', '#.D.D.D..Q', '#.c.c.c..Q', '#........#', '####d#####'],
  patio: ['ttBBBBBttt', 't,,,,,PP,t', 't,,,,,,,,t', 't,P,P,P,,t', 't,j,j,h,,t', 't,P,P,P,,t', 't,j,j,j,,t', 't,,,,,,,,t', 'tttto,tttt'],
};
const NIGHT = ['#050505', '#1c1600', '#5a4600', '#8a7a40'];

A.GAB = A.makeChar(0, 2, 1);

// def: { rows, paint(x), extra(ctx,t), npcs: [...], onStep(x,y,ch) → fn?, onFace(x,y,ch) → fn?, onB → fn }
A.worldScene = (def, sx, sy, sdir = 'down') => {
  const pal = A.PAL;
  if (def.night) A.PAL = NIGHT;
  const bg = A.mk(A.W, A.H, x => {
    def.rows.forEach((r, j) => [...r].forEach((ch, i) => (TILE[ch] || floor)(x, i * T, j * T)));
    if (def.paint) def.paint(x);
    if (def.night) for (let i = 0; i < 40; i++) { x.fillStyle = pal[i % 4 ? 3 : 2]; x.fillRect((i * 37) % 160, (i * 53) % 144, 1, 1); }
  });
  A.PAL = pal;
  const pl = { x: sx, y: sy, ox: sx, oy: sy, dir: sdir, mv: 0, n: 0 };
  const npcs = def.npcs || [];
  let t = 0, bump = 0;
  const blocked = (x, y) => {
    if (x < 0 || y < 0 || x >= 10 || y >= 9) return true;
    if (SOLID.includes(def.rows[y][x])) return true;
    return npcs.some(n => n.x === x && n.y === y && !n.hidden);
  };
  const s = { def, pl, npcs };
  const run = async fn => { A.busy = true; try { await fn(s); } finally { A.busy = false; A.P = {}; } };
  s.run = run;
  const arrive = () => {
    if (!def.onStep) return;
    const f = def.onStep(pl.x, pl.y, def.rows[pl.y][pl.x], s);
    if (f) run(f);
  };
  const interact = () => {
    const [dx, dy] = DIRS[pl.dir], tx = pl.x + dx, ty = pl.y + dy;
    const n = npcs.find(n => n.x === tx && n.y === ty && !n.hidden);
    if (n) { if (n.ch) n.dir = OPP[pl.dir]; if (n.talk) run(n.talk); return; }
    const ch = def.rows[ty] && def.rows[ty][tx];
    if (def.onFace) { const f = def.onFace(tx, ty, ch, s); if (f) run(f); }
  };
  s.update = dt => {
    t += dt; bump -= dt;
    if (pl.mv > 0) { pl.mv -= dt; if (pl.mv <= 0) { pl.mv = 0; arrive(); } return; }
    if (A.locked()) return;
    if (A.hit('a')) { interact(); return; }
    if (A.hit('b') && def.onB) { run(def.onB); return; }
    for (const d of ['up', 'down', 'left', 'right']) {
      if (!A.K[d]) continue;
      pl.dir = d;
      const [dx, dy] = DIRS[d], nx = pl.x + dx, ny = pl.y + dy;
      if (!blocked(nx, ny)) { pl.ox = pl.x; pl.oy = pl.y; pl.x = nx; pl.y = ny; pl.mv = STEP; pl.n++; }
      else if (bump <= 0) { A.sfx('step'); bump = 0.3; }
      break;
    }
  };
  s.draw = ctx => {
    ctx.drawImage(bg, 0, 0);
    if (def.extra) def.extra(ctx, t);
    const k = pl.mv > 0 ? 1 - pl.mv / STEP : 1;
    const px = (pl.ox + (pl.x - pl.ox) * k) * T, py = (pl.oy + (pl.y - pl.oy) * k) * T;
    const fr = pl.mv > STEP / 2 ? (pl.n % 2 ? 1 : 3) : 0;
    const list = npcs.filter(n => !n.hidden).map(n => ({ y: n.y * T, f: () => {
      const img = n.ch ? n.ch[n.dir || 'down'][0] : n.img;
      const bob = n.bob ? Math.round(Math.sin(t * 4) * 1) : 0;
      A.draw(img, n.x * T, n.y * T - 3 + bob);
    } }));
    list.push({ y: py, f: () => A.draw(A.GAB[pl.dir][fr], px, py - 3) });
    list.sort((a, b) => a.y - b.y).forEach(o => o.f());
  };
  return s;
};

A.goMap = async (def, x, y, dir) => {
  await A.fade(1, 200);
  A.setScene(A.worldScene(def, x, y, dir));
  await A.fade(0, 200);
};
