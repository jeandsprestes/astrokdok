'use strict';
// Imagens de chegada de cada missão (fundo 160x144) e onde a nave aparece. Cores reais de cada corpo celeste.
const bands = (x, cx, cy, r, cols, step) => {
  for (let y = -r; y <= r; y++) {
    const w = Math.floor(Math.sqrt(r * r - y * y + r * 0.8));
    A.rect(cx - w, cy + y, w * 2 + 1, 1, cols[Math.floor((y + r) / step) % cols.length], x);
  }
};
const craters = (x, cx, cy, r, n, c) => { for (let i = 0; i < n; i++) { const a = i * 2.4, d = (i * 0.37 % 1) * r * 0.75; A.disc(cx + Math.cos(a) * d, cy + Math.sin(a) * d, 1 + (i * 7) % Math.max(2, r / 6), c, x); } };
const ringE = (x, cx, cy, rx, ry, c, front) => { for (let a = 0; a < 6.283; a += 0.01) { const s = Math.sin(a); if (front === undefined || (s > 0) === front) A.rect(cx + Math.cos(a) * rx, cy + s * ry, 1, 1, c, x); } };
const spiral = (x, cx, cy, sx, sy, rot, n) => {
  for (let arm = 0; arm < 2; arm++) for (let i = 0; i < n; i++) {
    const t = i / n * 3.4, a = t * 2.2 + arm * Math.PI + rot, d = 3 + t * 16;
    const px = cx + Math.cos(a) * d * sx, py = cy + Math.sin(a) * d * sy;
    A.rect(px, py, 2, 1, i % 3 ? 2 : 3, x); if (i % 2) A.rect(px + A.rnd(-3, 3), py + A.rnd(-2, 2), 1, 1, 1, x);
  }
};
// fundo de espaço preto com estrelas brancas e algumas coloridas; pal = paleta usada no desenho do corpo
const bg = (pal, fn) => A.withPal(pal, () => A.mk(160, 144, x => {
  A.rect(0, 0, 160, 144, '#05060f', x);
  for (let i = 0; i < 50; i++) A.rect(Math.random() * 160, Math.random() * 144, 1, 1, Math.random() < 0.2 ? A.pick(['#8fa8ff', '#ffe49a', '#ffb4a8', '#b8bcd8']) : '#ffffff', x);
  fn(x);
}));

// cada entrada: () => { img, ship: [x, y] }
A.BODIES = {
  // Mercúrio: cinza com crateras
  mercury: () => ({ img: bg('mercurio', x => { A.disc(80, 70, 50, 1, x); A.disc(80, 70, 48, 2, x); craters(x, 80, 70, 48, 26, 1); }), ship: [18, 16] }),
  // Vênus: amarelo-creme coberto de nuvens
  venus: () => ({ img: bg(['#3a2a10', '#c9953f', '#ecc678', '#f8e3ae'], x => { bands(x, 80, 72, 50, [3, 2, 3, 3, 2], 7); for (let i = 0; i < 30; i++) A.rect(40 + (i * 13) % 80, 30 + (i * 17) % 84, 6, 1, 2, x); }), ship: [18, 16] }),
  // Marte: céu caramelo-rosado, chão vermelho-ferrugem, jipe-robô branco
  mars: () => ({ img: A.mk(160, 144, x => {
    A.rect(0, 0, 160, 144, '#e8b48e', x); A.rect(0, 0, 160, 34, '#c98a6c', x); A.rect(0, 34, 160, 30, '#d89c7a', x); A.disc(128, 24, 4, '#fff6e8', x);
    for (let i = 0; i < 160; i++) { const y = Math.round(96 + Math.sin(i / 17) * 5 + Math.sin(i / 6) * 1.5); A.rect(i, y, 1, 144 - y, '#b04a22', x); }
    for (let i = 0; i < 14; i++) A.disc((i * 37) % 160, 110 + (i * 11) % 30, 1 + i % 3, '#6e2510', x);
    A.rect(104, 98, 16, 6, '#e8e8ec', x); A.rect(106, 104, 2, 3, '#2a2a2e', x); A.rect(116, 104, 2, 3, '#2a2a2e', x); A.rect(111, 92, 1, 6, '#2a2a2e', x); A.rect(110, 91, 4, 2, '#e8e8ec', x);
  }), ship: [60, 82] }),
  // cinturão de asteroides: rochas marrom-acinzentadas
  asteroids: () => ({ img: bg(['#1c1712', '#6b5a48', '#9e8a74', '#cdbda6'], x => { for (let i = 0; i < 22; i++) { const r = 2 + (i * 5) % 9, cx = (i * 47) % 160, cy = (i * 29) % 144; A.disc(cx, cy, r, 0, x); A.disc(cx, cy, r - 1, 1, x); A.rect(cx - r / 3, cy - r / 3, 2, 2, 2, x); } A.disc(110, 60, 22, 0, x); A.disc(110, 60, 21, 1, x); craters(x, 110, 60, 20, 10, 0); }), ship: [30, 90] }),
  // Júpiter: faixas bege/marrom/branco, Grande Mancha Vermelha e as 4 luas de Galileu (Io, Europa, Ganimedes, Calisto)
  jupiter: () => ({ img: bg('jupiter', x => { bands(x, 90, 72, 52, [2, 3, 1, 2, 3, 2, 1, 3], 6); A.disc(104, 88, 7, '#b04a2c', x); A.rect(97, 86, 15, 4, '#b04a2c', x); A.rect(100, 87, 8, 2, '#e07a52', x); const luas = ['#e8d050', '#e8dcc0', '#a89884', '#7a6e62']; [[16, 30], [22, 120], [150, 20], [150, 124]].forEach(([a, b], i) => A.disc(a, b, 3, luas[i], x)); }), ship: [14, 64] }),
  // Saturno: dourado, anéis bege e Titã alaranjada
  saturn: () => ({ img: bg(['#2b220e', '#a8823a', '#e2b85c', '#f4d88e'], x => { const anelE = '#b8a47c', anelC = '#ece0c0'; ringE(x, 80, 72, 70, 16, anelE, false); ringE(x, 80, 72, 60, 13, anelC, false); bands(x, 80, 72, 36, [2, 3, 2, 1], 7); for (let r = 50; r <= 70; r += 2) ringE(x, 80, 72, r, r * 0.23, r % 4 ? anelC : anelE, true); A.disc(20, 26, 3, '#e0a040', x); }), ship: [120, 22] }),
  // Urano: ciano-claro com anel em pé
  uranus: () => ({ img: bg('urano', x => { A.disc(80, 72, 40, '#3f9fa8', x); A.disc(80, 72, 39, '#9fe0e4', x); for (let r = 50; r < 58; r += 3) { for (let a = 0; a < 6.283; a += 0.01) A.rect(80 + Math.cos(a) * r * 0.25, 72 + Math.sin(a) * r, 1, 1, 3, x); } }), ship: [14, 20] }),
  // Netuno: azul, mancha escura, nuvens brancas e Tritão
  neptune: () => ({ img: bg('netuno', x => { bands(x, 80, 72, 44, [1, 1, 2, 1], 9); A.disc(66, 62, 7, 0, x); A.rect(82, 50, 12, 2, '#ffffff', x); A.rect(60, 90, 16, 2, '#ffffff', x); A.disc(140, 30, 4, '#d8c4bc', x); }), ship: [14, 110] }),
  // Plutão: bege/marrom com o coração claro; Caronte cinza
  pluto: () => ({ img: bg('plutao', x => {
    A.disc(76, 76, 42, 1, x); A.disc(76, 76, 41, 2, x); craters(x, 76, 76, 40, 8, 1);
    A.disc(82, 82, 8, 3, x); A.disc(96, 82, 8, 3, x); for (let i = 0; i < 12; i++) A.rect(82 + i / 2, 84 + i, 15 - i, 1, 3, x);
    A.disc(138, 34, 12, '#606066', x); A.disc(138, 34, 11, '#a4a4aa', x);
  }), ship: [14, 18] }),
  // Próxima Centauri: anã-vermelha e um planetinha rochoso
  proxima: () => ({ img: bg('ana_verm', x => { A.disc(84, 70, 46, '#8a1c0e', x); A.disc(84, 70, 44, '#e04a22', x); for (let i = 0; i < 20; i++) A.disc(60 + (i * 17) % 50, 40 + (i * 13) % 60, 2, '#ff8a42', x); A.disc(22, 118, 7, '#4a3428', x); A.disc(22, 118, 6, '#a0745a', x); }), ship: [130, 18] }),
  // Nebulosa de Órion: nuvens rosa, roxas e azuis com as estrelas do Trapézio
  nebula: () => ({ img: bg('nebulosa', x => {
    // cor pela distância do centro: rosa no meio, roxo em volta, azul na borda
    const zona = (cx, cy) => { const d = Math.hypot(cx - 80, cy - 70); return d < 34 ? 0 : d < 58 ? 1 : 2; };
    const grande = ['#d04c90', '#7a2e98', '#2c4fa8'], peq = ['#ffd1f0', '#f07ab8', '#8fc0ff'];
    for (let i = 0; i < 40; i++) { const cx = (i * 53) % 160, cy = (i * 37) % 144; A.disc(cx, cy, 8 + (i * 7) % 12, grande[zona(cx, cy)], x); }
    for (let i = 0; i < 25; i++) { const cx = (i * 71) % 160, cy = (i * 43) % 144; A.disc(cx, cy, 3 + i % 5, peq[zona(cx, cy)], x); }
    for (let i = 0; i < 4; i++) { const cx = 70 + i * 6, cy = 66 + (i % 2) * 5; A.rect(cx - 3, cy, 7, 1, '#ffffff', x); A.rect(cx, cy - 3, 1, 7, '#ffffff', x); }
  }), ship: [20, 110] }),
  // buraco negro: disco de gás laranja/dourado em volta do centro preto
  blackhole: () => ({ img: bg('buraco', x => {
    const disco = r => r % 4 ? '#ff8c1a' : '#ffc84a';
    ringE(x, 80, 72, 62, 14, '#6a3008', false); for (let r = 40; r <= 60; r += 2) ringE(x, 80, 72, r, r * 0.24, disco(r), false);
    A.disc(80, 72, 24, '#fff2c0', x); A.disc(80, 72, 22, '#000000', x);
    for (let r = 40; r <= 60; r += 2) ringE(x, 80, 72, r, r * 0.24, disco(r), true);
  }), ship: [14, 18] }),
  // Via Láctea vista de fora: braços azulados/brancos e as duas Nuvens de Magalhães
  galaxy: () => ({ img: bg(['#05060f', '#5560b0', '#a7b6ff', '#ffffff'], x => { A.disc(84, 66, 6, 3, x); A.disc(84, 66, 9, '#c8d0ff', x); A.disc(84, 66, 5, '#fff4d0', x); spiral(x, 84, 66, 1.4, 0.9, 0.3, 160); A.disc(28, 112, 7, 1, x); A.disc(28, 112, 4, 2, x); A.disc(46, 124, 4, 1, x); A.disc(46, 124, 2, 2, x); }), ship: [130, 118] }),
  // Andrômeda: disco azul/branco com núcleo amarelado
  andromeda: () => ({ img: bg('galaxia', x => { for (let r = 60; r > 0; r -= 3) { for (let a = 0; a < 6.283; a += 0.02) { const px = Math.cos(a) * r, py = Math.sin(a) * r * 0.28; A.rect(80 + px * 0.9 - py * 0.4, 72 + px * 0.4 + py * 0.9, 1, 1, r < 12 ? '#fff0c8' : r < 30 ? '#b0c4ff' : '#4a5cc0', x); } } A.disc(80, 72, 5, '#ffe08a', x); }), ship: [14, 120] }),
  // Radiação Cósmica de Fundo: mapa do satélite Planck (frio azul → quente vermelho)
  cmb: () => ({ img: A.mk(160, 144, x => {
    A.rect(0, 0, 160, 144, '#05060f', x);
    for (let y = -50; y <= 50; y++) { const w = Math.floor(76 * Math.sqrt(1 - (y / 50) ** 2)); for (let i = -w; i <= w; i += 2) { const n = Math.sin(i * 0.31 + y * 0.17) + Math.sin(i * 0.07 - y * 0.29) + Math.sin((i + y) * 0.13); A.rect(80 + i, 70 + y, 2, 1, n > 1 ? '#c62a1e' : n > 0.3 ? '#f07a24' : n > -0.3 ? '#f5cc4a' : n > -1 ? '#6fb4e8' : '#1f4fb8', x); } }
  }), ship: [72, 124] }),
};
