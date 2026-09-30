'use strict';
// Imagens de chegada de cada missão (fundo 160x144) e onde a nave aparece.
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
const bg = fn => A.mk(160, 144, x => { A.rect(0, 0, 160, 144, 0, x); for (let i = 0; i < 50; i++) A.rect(Math.random() * 160, Math.random() * 144, 1, 1, Math.random() < 0.2 ? 2 : 3, x); fn(x); });

// cada entrada: () => { img, ship: [x, y] }
A.BODIES = {
  mercury: () => ({ img: bg(x => { A.disc(80, 70, 50, 1, x); A.disc(80, 70, 48, 2, x); craters(x, 80, 70, 48, 26, 1); }), ship: [18, 16] }),
  venus: () => ({ img: bg(x => { bands(x, 80, 72, 50, [3, 2, 3, 3, 2], 7); for (let i = 0; i < 30; i++) A.rect(40 + (i * 13) % 80, 30 + (i * 17) % 84, 6, 1, 2, x); }), ship: [18, 16] }),
  mars: () => ({ img: A.mk(160, 144, x => {
    A.rect(0, 0, 160, 144, 2, x); A.disc(128, 24, 4, 3, x);
    for (let i = 0; i < 160; i++) { const y = Math.round(96 + Math.sin(i / 17) * 5 + Math.sin(i / 6) * 1.5); A.rect(i, y, 1, 144 - y, 1, x); }
    for (let i = 0; i < 14; i++) A.disc((i * 37) % 160, 110 + (i * 11) % 30, 1 + i % 3, 0, x);
    A.rect(104, 98, 16, 6, 3, x); A.rect(106, 104, 2, 3, 0, x); A.rect(116, 104, 2, 3, 0, x); A.rect(111, 92, 1, 6, 0, x); A.rect(110, 91, 4, 2, 3, x);
  }), ship: [60, 82] }),
  asteroids: () => ({ img: bg(x => { for (let i = 0; i < 22; i++) { const r = 2 + (i * 5) % 9, cx = (i * 47) % 160, cy = (i * 29) % 144; A.disc(cx, cy, r, 0, x); A.disc(cx, cy, r - 1, 1, x); A.rect(cx - r / 3, cy - r / 3, 2, 2, 2, x); } A.disc(110, 60, 22, 0, x); A.disc(110, 60, 21, 1, x); craters(x, 110, 60, 20, 10, 0); }), ship: [30, 90] }),
  jupiter: () => ({ img: bg(x => { bands(x, 90, 72, 52, [2, 3, 1, 2, 3, 2, 1, 3], 6); A.disc(104, 88, 7, 1, x); A.rect(97, 86, 15, 4, 1, x); A.rect(100, 87, 8, 2, 2, x); [[16, 30], [22, 120], [150, 20], [150, 124]].forEach(([a, b]) => A.disc(a, b, 3, 3, x)); }), ship: [14, 64] }),
  saturn: () => ({ img: bg(x => { ringE(x, 80, 72, 70, 16, 2, false); ringE(x, 80, 72, 60, 13, 3, false); bands(x, 80, 72, 36, [2, 3, 2, 1], 7); for (let r = 50; r <= 70; r += 2) ringE(x, 80, 72, r, r * 0.23, r % 4 ? 3 : 2, true); A.disc(20, 26, 3, 2, x); }), ship: [120, 22] }),
  uranus: () => ({ img: bg(x => { A.disc(80, 72, 40, 1, x); A.disc(80, 72, 39, 3, x); for (let r = 50; r < 58; r += 3) { for (let a = 0; a < 6.283; a += 0.01) A.rect(80 + Math.cos(a) * r * 0.25, 72 + Math.sin(a) * r, 1, 1, 2, x); } }), ship: [14, 20] }),
  neptune: () => ({ img: bg(x => { bands(x, 80, 72, 44, [1, 1, 2, 1], 9); A.disc(66, 62, 7, 0, x); A.rect(82, 50, 12, 2, 3, x); A.rect(60, 90, 16, 2, 3, x); A.disc(140, 30, 4, 3, x); }), ship: [14, 110] }),
  pluto: () => ({ img: bg(x => {
    A.disc(76, 76, 42, 1, x); A.disc(76, 76, 41, 2, x); craters(x, 76, 76, 40, 8, 1);
    A.disc(82, 82, 8, 3, x); A.disc(96, 82, 8, 3, x); for (let i = 0; i < 12; i++) A.rect(82 + i / 2, 84 + i, 15 - i, 1, 3, x);
    A.disc(138, 34, 12, 1, x); A.disc(138, 34, 11, 2, x);
  }), ship: [14, 18] }),
  proxima: () => ({ img: bg(x => { A.disc(84, 70, 46, 0, x); A.disc(84, 70, 44, 1, x); for (let i = 0; i < 20; i++) A.disc(60 + (i * 17) % 50, 40 + (i * 13) % 60, 2, 2, x); A.disc(22, 118, 7, 1, x); A.disc(22, 118, 6, 2, x); }), ship: [130, 18] }),
  nebula: () => ({ img: bg(x => {
    for (let i = 0; i < 40; i++) A.disc((i * 53) % 160, (i * 37) % 144, 8 + (i * 7) % 12, i % 3 ? 1 : 2, x);
    for (let i = 0; i < 25; i++) A.disc((i * 71) % 160, (i * 43) % 144, 3 + i % 5, i % 2 ? 2 : 3, x);
    for (let i = 0; i < 4; i++) { const cx = 70 + i * 6, cy = 66 + (i % 2) * 5; A.rect(cx - 3, cy, 7, 1, 3, x); A.rect(cx, cy - 3, 1, 7, 3, x); }
  }), ship: [20, 110] }),
  blackhole: () => ({ img: bg(x => {
    ringE(x, 80, 72, 62, 14, 1, false); for (let r = 40; r <= 60; r += 2) ringE(x, 80, 72, r, r * 0.24, r % 4 ? 2 : 3, false);
    A.disc(80, 72, 24, 3, x); A.disc(80, 72, 22, 0, x);
    for (let r = 40; r <= 60; r += 2) ringE(x, 80, 72, r, r * 0.24, r % 4 ? 2 : 3, true);
  }), ship: [14, 18] }),
  galaxy: () => ({ img: bg(x => { A.disc(84, 66, 6, 3, x); A.disc(84, 66, 9, 2, x); A.disc(84, 66, 5, 3, x); spiral(x, 84, 66, 1.4, 0.9, 0.3, 160); A.disc(28, 112, 7, 1, x); A.disc(28, 112, 4, 2, x); A.disc(46, 124, 4, 1, x); A.disc(46, 124, 2, 2, x); }), ship: [130, 118] }),
  andromeda: () => ({ img: bg(x => { for (let r = 60; r > 0; r -= 3) { for (let a = 0; a < 6.283; a += 0.02) { const px = Math.cos(a) * r, py = Math.sin(a) * r * 0.28; A.rect(80 + px * 0.9 - py * 0.4, 72 + px * 0.4 + py * 0.9, 1, 1, r < 12 ? 3 : r < 30 ? 2 : 1, x); } } A.disc(80, 72, 5, 3, x); }), ship: [14, 120] }),
  cmb: () => ({ img: A.mk(160, 144, x => {
    A.rect(0, 0, 160, 144, 0, x);
    for (let y = -50; y <= 50; y++) { const w = Math.floor(76 * Math.sqrt(1 - (y / 50) ** 2)); for (let i = -w; i <= w; i += 2) { const n = Math.sin(i * 0.31 + y * 0.17) + Math.sin(i * 0.07 - y * 0.29) + Math.sin((i + y) * 0.13); A.rect(80 + i, 70 + y, 2, 1, n > 0.9 ? 3 : n > -0.2 ? 2 : 1, x); } }
  }), ship: [72, 124] }),
};
