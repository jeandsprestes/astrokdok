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
  ctx.fillStyle = A.col(p);
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
// cores por índice (compatível com [cabelo, camisa, calça] de scenes.js e dos conteúdos) ou cor direta ('#3b6fd6')
const HAIR = ['#2a2630', A.C.cabelo[1], A.C.cabelo[2], A.C.cabelo[3]]; // preto, castanho, loiro, grisalho
const SHIRT = ['#2c2c38', A.C.azul, A.C.amarelo, '#f2f4f8']; // preto, azul, amarelo Astrokdok, branco
const PANTS = ['#4a4e5c', A.C.jeans]; // cinza-escuro, jeans
const CH_OUT = '#161a26', CH_SHOE = '#3a2618'; // contorno e olhos; sapato
const colOf = (v, tab) => typeof v === 'string' ? v : (tab[v] || tab[0]);
// pele: sai da combinação (o mesmo visual tem sempre a mesma pele), para haver vários tons
const sumCh = v => [...String(v)].reduce((a, c) => a + c.charCodeAt(0), 0);
const skinOf = (h, s, p) => { let i = (sumCh(h) * 3 + sumCh(s) * 5 + sumCh(p) * 2 + 1) % 4; if (h === 2) i %= 2; return A.C.pele[i]; };
A.makeChar = (hair, shirt, pants = 1, skin) => {
  if (typeof skin === 'number') skin = A.C.pele[skin];
  const map = { o: CH_OUT, h: colOf(hair, HAIR), s: skin || skinOf(hair, shirt, pants), e: CH_OUT, c: colOf(shirt, SHIRT), p: colOf(pants, PANTS), k: CH_SHOE };
  const mk = rows => A.spr(rows, map);
  const walk4 = base => [mk(base), mk(patch(base, 14, ['...okko..oppo...', '.........okko...'])), mk(base), mk(patch(base, 14, ['...oppo..okko...', '...okko.........']))];
  const s0 = mk(SIDE), s1 = mk(patch(SIDE, 13, ['...oppppo.......', '..opo..po.......', '..oko..ko.......']));
  return { down: walk4(DOWN), up: walk4(UP), left: [s0, s1, s0, s1], right: [A.flip(s0), A.flip(s1), A.flip(s0), A.flip(s1)] };
};

// robô Kdok: cinza com detalhes amarelos da Astrokdok, olho ciano na tela
A.KDOK = A.spr([
  '........o.......',
  '.......oyo......',
  '........o.......',
  '..oooooooooooo..',
  '..owwwwwwwwwwo..',
  '..o1oooooyyy1o..',
  '..o1osssoyry1o..',
  '..o1osdsoyyy1o..',
  '..o1ossso1111o..',
  '..o1ooooo1gg1o..',
  '..oqqqqqqqqqqo..',
  '..oooooooooooo..',
  '....o1o..o1o....',
  '....o1o..o1o....',
  '...oo1oo.oo1oo..',
  '...ooooo.ooooo..',
], { o: '#1c1e26', w: '#d3d8e0', 1: '#a3aab5', q: '#6f7684', y: A.C.amarelo, s: '#8ff0ff', d: '#0b3a52', r: A.C.vermelho, g: '#5ad35a' });

// ---------- naves ----------
// cores das naves: 0 contorno, 1 janela, 3 casco; letras = detalhes
const SH = { 0: '#141b30', 1: '#3d8bf0', 3: '#e6ebf2', r: '#e8452c', a: A.C.laranja, n: '#8a919e', s: '#d5dbe5', y: A.C.amarelo };
const TANK = { 1: '#a8e6ff', 3: '#2a7de1', w: '#7cc0ff', t: '#c3c9d4', f: '#e8452c' }; // caixa-d'água azul, fita prateada
const shipSpr = (rows, extra) => A.spr(rows, Object.assign({}, SH, extra));
A.SHIPS = [
  shipSpr([ // 0: Calhambeque-1 (caixa-d'água com fita e faixa amarela)
    '.......00.......',
    '......0w30......',
    '.....0w3330.....',
    '.....0w1130.....',
    '.....0w1130.....',
    '.....0w3330.....',
    '.....0yyyy0.....',
    '.....0w3330.....',
    '....00w33300....',
    '...0f0w3330.f0..',
    '...0f0wtt30f.0..',
    '...0000330000...',
    '......0nn0......',
    '.......nn.......',
    '................',
    '................',
  ], TANK),
  shipSpr([ // 1: Turbo (a mesma caixa-d'água, com foguetes laterais)
    '.......00.......',
    '......0rr0......',
    '.....0w3330.....',
    '.....0w1130.....',
    '.....0w1130.....',
    '.....0w3330.....',
    '.....0yyyy0.....',
    '....03w333330...',
    '...033w3333330..',
    '..0r03w333330r0.',
    '..0ss0w33330ss0.',
    '..0000033000000.',
    '....0nn0.0nn0...',
    '.....nn...nn....',
    '................',
    '................',
  ], TANK),
  shipSpr([ // 2: Vela Solar (velas douradas)
    '.......00.......',
    '......0rr0......',
    '.....033330.....',
    '.00..031130..00.',
    '.0g0.031130.0g0.',
    '.0gg0033330.0gg0',
    '.0ggg0aaaa00ggg0',
    '.0ggg0333330ggg0',
    '.0g00033333000g0',
    '.00.033333330.00',
    '...0r3333333r00.',
    '...0000330000...',
    '....0nn0.0nn0...',
    '.....nn...nn....',
    '................',
    '................',
  ], { g: '#f0b832' }),
];
// naves 3-5 desenhadas pela metade esquerda (espelhada)
const half = (rows, extra) => shipSpr(rows.map(mirror), extra);
A.SHIPS.push(
  half(['.......0', '......0r', '.....0rr', '.....031', '....0031', '...0a033', '..0a0333', '.0a00333',
    '.0a00yyy', '.0a00333', '..000333', '....0333', '....0000', '.....0ii', '......0i', '........'], { i: '#5fd6ff' }), // 3: Nave Iônica (motor de brilho azul)
  half(['00000000', '0vvvvvvv', '0vlllllv', '0vvvvvvv', '00000000', '.t......', '..t.....', '...t...0',
    '....t.0r', '.....0rr', '.....031', '.....033', '....0033', '....0000', '......0n', '........'], { v: '#cfd8e6', l: '#ff6a3a', t: '#9aa3b5' }), // 4: Vela-Laser
  half(['.......0', '......0r', '.....033', '.....031', '..ccc031', '.c...033', 'c....033', 'c...0ccc',
    'c...0333', '.c..0333', '..ccc333', '....0333', '...00000', '....0.nn', '......nn', '........'], { c: '#3fe6ff' }), // 5: Dobra-1 (anel ciano)
);
const LEVELS = ['turbo', 'vela', 'ionico', 'vela-laser', 'dobra'];
A.shipLevel = () => { let lv = 0; LEVELS.forEach((id, i) => { if (A.has(id)) lv = i + 1; }); return lv; };
A.SHIP_NAMES = ['CALHAMBEQUE-1', 'CALHAMBEQUE TURBO', 'ESTRELA DO CAPÃO', 'NAVE IÔNICA', 'VELA-LASER', 'DOBRA-1'];

const FL = { 2: '#ff7a1a', 3: '#ffe45a' }; // chama: laranja por fora, amarela no miolo
A.FLAME = [A.spr(['.2..2.', '2322 2'.replace(' ', '3'), '.2..2.'], FL), A.spr(['..22..', '.2332.', '..22..'], FL)];

// ---------- obstáculos ----------
const BIRD = { 0: '#d63a2f' }; // passarinho vermelho (tiê-sangue)
const JUNK = (fill) => ({ 0: '#6b7080', 1: fill });
A.OBJ = {
  bird: [A.spr(['0.....0.', '00...00.', '.00000..', '..000...'], BIRD), A.spr(['........', '.00000..', '00.0.00.', '0.....0.'], BIRD)],
  plane: A.spr(['......00........', '.....0rr0.......', '00000rrrr00000..', '0333333333333330', '00000rrrr00000..', '.....0rr0.......', '......00........'],
    { 0: '#1b2033', 3: '#f4f6fa', r: A.C.vermelho }), // avião branco de asa vermelha
  balloon: A.spr(['..0000..', '.0ryyr0.', '0rryyrr0', '0rryyrr0', '0rryyrr0', '.0ryyr0.', '..0rr0..', '...00...', '...00...', '..m..m..', '..mmmm..'],
    { 0: '#2a1a1a', r: '#e8402a', y: '#ffc83a', m: '#8a5a2c' }), // balão listrado
  meteor: A.spr(['.....r..', '...rrr..', '.0aaaa..', '0000y00.', '00000...', '0010....', '.00.....', '........'],
    { 0: '#8f5a3a', 1: '#4a2a1a', r: '#e0402a', a: '#ff8a1a', y: '#ffe45a' }), // rocha marrom com cauda de fogo
  sat: A.spr(['0000...0...0000.', '0220..000..0220.', '0220.01110.0220.', '0220001310000220', '0220.01110.0220.', '0220..000..0220.', '0000...0...0000.'],
    { 0: '#8a919e', 1: '#e0b030', 2: '#3f7fff', 3: '#ff4a4a' }), // painéis solares azuis, corpo dourado
  junk: [A.spr(['.00.', '0110', '0100', '.00.'], JUNK('#c8ccd6')), A.spr(['000..', '01100', '00110', '..000'], JUNK('#e0662a')), A.spr(['0..', '010', '.00'], JUNK('#d84040'))],
  cloud: A.spr(['.....3333.......', '...33333333.....', '.3333333333333..', '3333333333333333', '.22222222222222.'], { 2: '#d6e6f7', 3: '#ffffff' }),
};

// ---------- corpos celestes (grandes) ----------
// cores fixas: não dependem da paleta ativa
A.bigEarth = r => A.mk(r * 2 + 2, r * 2 + 2, x => {
  const E = A.PALS.terra_pl; // contorno, oceano, terra, nuvem
  A.disc(r, r, r, E[0], x); A.disc(r, r, r - 1, E[1], x);
  const land = [[-0.4, -0.3, 0.35], [0.3, 0.2, 0.3], [-0.1, 0.5, 0.2], [0.45, -0.45, 0.18]], LC = [E[2], '#2f8a3c', '#b8894a', E[2]]; // matas e deserto
  land.forEach(([a, b, s], i) => A.disc(r + a * r, r + b * r, Math.max(2, s * r), LC[i], x));
  x.fillStyle = E[3];
  for (let i = 0; i < r * 1.5; i++) { const ang = Math.random() * 6.28, d = Math.random() * r * 0.85; x.fillRect(Math.round(r + Math.cos(ang) * d), Math.round(r + Math.sin(ang) * d), A.ri(2, 5), 1); }
  // sombra da noite (escura, deixando o planeta aparecer de leve)
  x.globalCompositeOperation = 'source-atop'; x.fillStyle = 'rgba(4,8,32,0.72)';
  for (let y = 0; y <= 2 * r; y++) { const w = Math.sqrt(Math.max(0, r * r - (y - r) * (y - r))); x.fillRect(Math.round(r + w * 0.35), y, r * 2, 1); }
  x.globalCompositeOperation = 'source-over';
});
A.bigMoon = r => A.mk(r * 2 + 2, r * 2 + 2, x => {
  const L = A.PALS.lua; // cinzas
  A.disc(r, r, r, L[1], x); A.disc(r, r, r - 1, L[3], x);
  for (let i = 0; i < 9; i++) { const ang = Math.random() * 6.28, d = Math.random() * r * 0.7, s = A.ri(1, Math.max(2, r / 5)); A.disc(r + Math.cos(ang) * d, r + Math.sin(ang) * d, s, L[2], x); }
});
A.bigSun = r => A.mk(r * 2 + 2, r * 2 + 2, x => {
  const S = A.PALS.sol; // laranja por fora, amarelo por dentro
  A.disc(r, r, r, S[1], x); A.disc(r, r, r - 2, S[2], x);
  x.fillStyle = S[3];
  for (let i = 0; i < r * 3; i++) { const ang = Math.random() * 6.28, d = Math.random() * r * 0.9; x.fillRect(Math.round(r + Math.cos(ang) * d), Math.round(r + Math.sin(ang) * d), 1, 1); }
  for (let i = 0; i < 3; i++) { const ang = Math.random() * 6.28, d = Math.random() * r * 0.6; A.disc(r + Math.cos(ang) * d, r + Math.sin(ang) * d, Math.max(1, r / 10), '#b8420a', x); } // manchas solares
});

// ---------- estrelas de fundo ----------
// a maioria branca, algumas azuladas e amareladas (k = tom sorteado na criação)
const STAR = ['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#bcd4ff', '#a8c4ff', '#fff0a8', '#ffd9a0'];
const STAR_DIM = ['#1a1d3a', '#3c4378', '#8a90c8']; // brilho 0, 1, 2
A.stars = (n, w = A.W, h = A.H) => Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, s: Math.random() < 0.2 ? 2 : 1, v: A.rnd(0.3, 1), k: A.ri(0, STAR.length - 1) }));
// p = brilho das estrelas pequenas (3 = cheio e colorido; 0-2 = mais apagadas) ou uma cor direta
A.drawStars = (st, p = 3, dy = 0) => st.forEach(s => A.rect(s.x, ((s.y + dy * s.v) % A.H + A.H) % A.H, s.s, s.s,
  s.s > 1 || p === 3 ? STAR[s.k | 0] : typeof p === 'string' ? p : STAR_DIM[p]));
