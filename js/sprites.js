'use strict';
// Fonte 3x5, personagens, naves, obstáculos e ladrilhos.

// ---------- fonte 3x5 ----------
const FONT = {
  A: [2, 5, 7, 5, 5], B: [6, 5, 6, 5, 6], C: [3, 4, 4, 4, 3], D: [6, 5, 5, 5, 6], E: [7, 4, 6, 4, 7], F: [7, 4, 6, 4, 4],
  G: [3, 4, 5, 5, 3], H: [5, 5, 7, 5, 5], I: [7, 2, 2, 2, 7], J: [1, 1, 1, 5, 2], K: [5, 5, 6, 5, 5], L: [4, 4, 4, 4, 7],
  M: [5, 7, 7, 5, 5], N: [6, 5, 5, 5, 5], O: [2, 5, 5, 5, 2], P: [6, 5, 6, 4, 4], Q: [2, 5, 5, 6, 3], R: [6, 5, 6, 5, 5],
  S: [3, 4, 2, 1, 6], T: [7, 2, 2, 2, 2], U: [5, 5, 5, 5, 7], V: [5, 5, 5, 5, 2], W: [5, 5, 7, 7, 5], X: [5, 5, 2, 5, 5],
  Y: [5, 5, 2, 2, 2], Z: [7, 1, 2, 4, 7],
  0: [7, 5, 5, 5, 7], 1: [2, 6, 2, 2, 7], 2: [6, 1, 2, 4, 7], 3: [6, 1, 2, 1, 6], 4: [5, 5, 7, 1, 1],
  5: [7, 4, 6, 1, 6], 6: [3, 4, 6, 5, 2], 7: [7, 1, 2, 2, 2], 8: [2, 5, 2, 5, 2], 9: [2, 5, 3, 1, 6],
  ':': [0, 2, 0, 2, 0], '.': [0, 0, 0, 0, 2], ',': [0, 0, 0, 2, 4], '-': [0, 0, 7, 0, 0], '!': [2, 2, 2, 0, 2], '?': [6, 1, 2, 0, 2],
  '/': [1, 1, 2, 4, 4], '%': [5, 1, 2, 4, 5], '+': [0, 2, 7, 2, 0], '*': [5, 2, 7, 2, 5], '=': [0, 7, 0, 7, 0], '(': [1, 2, 2, 2, 1], ')': [4, 2, 2, 2, 4],
  '<': [1, 2, 4, 2, 1], '>': [4, 2, 1, 2, 4], '°': [2, 5, 2, 0, 0], '#': [5, 7, 5, 7, 5], '♥': [5, 7, 7, 2, 0], ' ': [0, 0, 0, 0, 0],
};
const norm = s => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase();
A.txt = (s, x, y, p = 0, sc = 1, ctx = A.ctx) => {
  ctx.fillStyle = A.PAL[p];
  let cx = Math.round(x);
  for (const ch of norm(s)) {
    const g = FONT[ch];
    if (g) for (let r = 0; r < 5; r++) for (let c = 0; c < 3; c++) if (g[r] & (4 >> c)) ctx.fillRect(cx + c * sc, Math.round(y) + r * sc, sc, sc);
    cx += 4 * sc;
  }
};
A.txtW = (s, sc = 1) => (norm(s).length * 4 - 1) * sc;
A.txtC = (s, y, p = 0, sc = 1, ctx = A.ctx) => A.txt(s, Math.round((A.W - A.txtW(s, sc)) / 2), y, p, sc, ctx);
// texto com contorno (legível sobre qualquer fundo)
A.txtO = (s, x, y, p, o, sc = 1) => { for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) A.txt(s, x + dx, y + dy, o, sc); A.txt(s, x, y, p, sc); };

// ---------- personagens 16x16 ----------
const mirror = h => h + h.split('').reverse().join('');
const DOWN = ['........', '....oooo', '...ohhhh', '..ohhhhh', '..ohhhhh', '..ohssss', '..ossess', '..ossess',
  '...ossss', '...occcc', '..occccc', '..sccccc', '..occccc', '...opppp', '...oppo.', '...okko.'].map(mirror);
const UP = DOWN.map((r, i) => (i >= 5 && i <= 7) ? mirror('..ohhhhh') : i === 8 ? mirror('...ohhhh') : r);
const SIDE = ['................', '.....ooooo......', '....ohhhhho.....', '...ohhhhhhho....', '...ohhhhhhho....',
  '..osshhhhhho....', '..oeshhhhhho....', '..osssshhho.....', '...ossssso......', '....occco.......',
  '...occccco......', '...occscco......', '...occccco......', '....oppo........', '....oppo........', '...okkko........'];
const patch = (rows, from, repl) => rows.map((r, i) => (i >= from && i < from + repl.length) ? repl[i - from] : r);
A.makeChar = (hair, shirt, pants = 1) => {
  const map = { o: 0, h: hair, s: 3, e: 0, c: shirt, p: pants, k: 0 };
  const mk = rows => A.spr(rows, map);
  const walk4 = base => [mk(base), mk(patch(base, 14, ['...okko..oppo...', '.........okko...'])), mk(base), mk(patch(base, 14, ['...oppo..okko...', '...okko.........']))];
  const s0 = mk(SIDE), s1 = mk(patch(SIDE, 13, ['...oppppo.......', '..opo..po.......', '..oko..ko.......']));
  return { down: walk4(DOWN), up: walk4(UP), left: [s0, s1, s0, s1], right: [A.flip(s0), A.flip(s1), A.flip(s0), A.flip(s1)] };
};

A.KDOK = A.spr([
  '........o.......',
  '.......o2o......',
  '........o.......',
  '..oooooooooooo..',
  '..o1111111111o..',
  '..o1ooooo3331o..',
  '..o1o333o3131o..',
  '..o1o303o3331o..',
  '..o1o333o1111o..',
  '..o1ooooo1331o..',
  '..o1111111111o..',
  '..oooooooooooo..',
  '....o1o..o1o....',
  '....o1o..o1o....',
  '...oo1oo.oo1oo..',
  '...ooooo.ooooo..',
], { o: 0 });

// ---------- naves ----------
A.SHIPS = [
  A.spr([ // 0: Calhambeque-1 (caixa-d'água com fita)
    '.......00.......',
    '......0330......',
    '.....033330.....',
    '.....031130.....',
    '.....031130.....',
    '.....033330.....',
    '.....022220.....',
    '.....033330.....',
    '....00333300....',
    '...03033330 30..'.replace(' ', '.'),
    '...030322303 0..'.replace(' ', '.'),
    '...0000330000...',
    '......0220......',
    '.......22.......',
    '................',
    '................',
  ]),
  A.spr([ // 1: Turbo
    '.......00.......',
    '......0220......',
    '.....033330.....',
    '.....031130.....',
    '.....031130.....',
    '.....033330.....',
    '.....022220.....',
    '....0333333 0...'.replace(' ', '3'),
    '...03333333330..',
    '..0203333333020.',
    '..0220333330220.',
    '..0000033000000.',
    '....0220.0220...',
    '.....22...22....',
    '................',
    '................',
  ]),
  A.spr([ // 2: Vela Solar
    '.......00.......',
    '......0220......',
    '.....033330.....',
    '.00..031130..00.',
    '.020.031130.020.',
    '.0220033330.0220',
    '.02220222200222 '.replace(' ', '0'),
    '.022203333302220',
    '.020003333300020',
    '.00.033333330.00',
    '...0233333332 0.'.replace(' ', '0'),
    '...0000330000...',
    '....0220.0220...',
    '.....22...22....',
    '................',
    '................',
  ]),
];
// naves 3-5 desenhadas pela metade esquerda (espelhada)
const half = rows => A.spr(rows.map(mirror));
A.SHIPS.push(
  half(['.......0', '......02', '.....022', '.....031', '....0031', '...02033', '..020333', '.0200333',
    '.0200222', '.0200333', '..000333', '....0333', '....0000', '.....022', '......02', '........']), // 3: Nave Iônica
  half(['00000000', '03333333', '03222223', '03333333', '00000000', '.0......', '..0.....', '...0...0',
    '....0.02', '.....022', '.....031', '.....033', '....0033', '....0000', '......02', '........']), // 4: Vela-Laser
  half(['.......0', '......03', '.....033', '.....031', '..222031', '.2...033', '2....033', '2...0222',
    '2...0333', '.2..0333', '..222333', '....0333', '...00000', '....0.22', '......22', '........']), // 5: Dobra-1
);
const LEVELS = ['turbo', 'vela', 'ionico', 'vela-laser', 'dobra'];
A.shipLevel = () => { let lv = 0; LEVELS.forEach((id, i) => { if (A.has(id)) lv = i + 1; }); return lv; };
A.SHIP_NAMES = ['CALHAMBEQUE-1', 'CALHAMBEQUE TURBO', 'ESTRELA DO CAPÃO', 'NAVE IÔNICA', 'VELA-LASER', 'DOBRA-1'];

A.FLAME = [A.spr(['.2..2.', '2322 2'.replace(' ', '3'), '.2..2.']), A.spr(['..22..', '.2332.', '..22..'])];

// ---------- obstáculos ----------
A.OBJ = {
  bird: [A.spr(['0.....0.', '00...00.', '.00000..', '..000...']), A.spr(['........', '.00000..', '00.0.00.', '0.....0.'])],
  plane: A.spr(['......00........', '.....0330.......', '00000333300000..', '0333333333333330', '00000333300000..', '.....0330.......', '......00........']),
  balloon: A.spr(['..0000..', '.033330.', '03333330', '03333330', '03333330', '.033330.', '..0330..', '...00...', '...00...', '..0..0..', '..0000..']),
  meteor: A.spr(['.....2..', '...222..', '.02222..', '0000200.', '00000...', '0010....', '.00.....', '........']),
  sat: A.spr(['0000...0...0000.', '0220..000..0220.', '0220.01110.0220.', '0220001310000220', '0220.01110.0220.', '0220..000..0220.', '0000...0...0000.']),
  junk: [A.spr(['.00.', '0110', '0100', '.00.']), A.spr(['000..', '01100', '00110', '..000']), A.spr(['0..', '010', '.00'])],
  cloud: A.spr(['.....3333.......', '...33333333.....', '.3333333333333..', '3333333333333333', '.33333333333333.']),
};

// ---------- corpos celestes (grandes) ----------
A.bigEarth = r => A.mk(r * 2 + 2, r * 2 + 2, x => {
  A.disc(r, r, r, 0, x); A.disc(r, r, r - 1, 1, x);
  const land = [[-0.4, -0.3, 0.35], [0.3, 0.2, 0.3], [-0.1, 0.5, 0.2], [0.45, -0.45, 0.18]];
  land.forEach(([a, b, s]) => A.disc(r + a * r, r + b * r, Math.max(2, s * r), 2, x));
  x.fillStyle = A.PAL[3];
  for (let i = 0; i < r * 1.5; i++) { const ang = Math.random() * 6.28, d = Math.random() * r * 0.85; x.fillRect(Math.round(r + Math.cos(ang) * d), Math.round(r + Math.sin(ang) * d), A.ri(2, 5), 1); }
  // sombra da noite
  x.globalCompositeOperation = 'source-atop'; x.fillStyle = A.PAL[0];
  for (let y = 0; y <= 2 * r; y++) { const w = Math.sqrt(Math.max(0, r * r - (y - r) * (y - r))); x.fillRect(Math.round(r + w * 0.35), y, r * 2, 1); }
  x.globalCompositeOperation = 'source-over';
});
A.bigMoon = r => A.mk(r * 2 + 2, r * 2 + 2, x => {
  A.disc(r, r, r, 0, x); A.disc(r, r, r - 1, 3, x);
  for (let i = 0; i < 9; i++) { const ang = Math.random() * 6.28, d = Math.random() * r * 0.7, s = A.ri(1, Math.max(2, r / 5)); A.disc(r + Math.cos(ang) * d, r + Math.sin(ang) * d, s, 2, x); }
});
A.bigSun = r => A.mk(r * 2 + 2, r * 2 + 2, x => {
  A.disc(r, r, r, 1, x); A.disc(r, r, r - 2, 2, x);
  x.fillStyle = A.PAL[3];
  for (let i = 0; i < r * 3; i++) { const ang = Math.random() * 6.28, d = Math.random() * r * 0.9; x.fillRect(Math.round(r + Math.cos(ang) * d), Math.round(r + Math.sin(ang) * d), 1, 1); }
  for (let i = 0; i < 3; i++) { const ang = Math.random() * 6.28, d = Math.random() * r * 0.6; A.disc(r + Math.cos(ang) * d, r + Math.sin(ang) * d, Math.max(1, r / 10), 1, x); }
});

// ---------- estrelas de fundo ----------
A.stars = (n, w = A.W, h = A.H) => Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, s: Math.random() < 0.2 ? 2 : 1, v: A.rnd(0.3, 1) }));
A.drawStars = (st, p = 3, dy = 0) => st.forEach(s => A.rect(s.x, ((s.y + dy * s.v) % A.H + A.H) % A.H, s.s, s.s, s.s > 1 ? 2 : p));
