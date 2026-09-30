'use strict';
// Cenários dos locais de lançamento (160x144, chão em y=108).
const GY = 108;
const rg = (x, fn, c, from = 0, to = 160) => { for (let i = from; i < to; i++) { const y = Math.round(fn(i)); A.rect(i, y, 1, 144 - y, c, x); } };
const sky = (x, c = 3) => A.rect(0, 0, 160, 144, c, x);
const starsOn = (x, n = 70) => { for (let i = 0; i < n; i++) A.rect((i * 37) % 160, (i * 23) % 70, 1, 1, i % 5 ? 3 : 2, x); };
const ground = (x, c = 1) => rg(x, () => GY, c);
const palm = (x, px, py) => { A.rect(px, py, 2, GY - py, 0, x); for (const [dx, dy] of [[-6, 1], [-3, -1], [2, -1], [5, 1]]) A.rect(px + dx, py + dy, 6, 2, 1, x); };
const tree = (x, px, py, r = 7) => { A.disc(px, py, r, 0, x); A.disc(px, py, r - 1, 1, x); A.rect(px - 1, py + r - 1, 2, GY - py - r + 1, 0, x); };
const tower = (x, px) => { A.rect(px, 36, 2, GY - 36, 0, x); A.rect(px + 6, 36, 2, GY - 36, 0, x); for (let y = 38; y < GY; y += 6) A.rect(px, y, 8, 1, 0, x); };
const rocketT = (x, px, top) => { A.rect(px - 3, top + 6, 7, GY - top - 6, 3, x); A.rect(px - 3, top + 6, 1, GY - top - 6, 0, x); A.rect(px + 3, top + 6, 1, GY - top - 6, 0, x); for (let i = 0; i < 4; i++) A.rect(px - 2 + i % 2 * 3 - (i > 1 ? 1 : 0), top + 2 + i, 3 - (i > 1 ? 0 : 1), 1, 0, x); A.rect(px - 7, GY - 20, 3, 20, 3, x); A.rect(px + 5, GY - 20, 3, 20, 3, x); };

A.SITES = {
  capao: x => {
    sky(x); A.disc(132, 20, 9, 2, x);
    rg(x, i => i > 18 && i < 62 ? 38 + (i < 24 ? (24 - i) * 3 : 0) + (i > 56 ? (i - 56) * 3 : 0) : 64 + Math.sin(i / 11) * 6, 1);
    A.rect(24, 38, 33, 1, 0, x);
    rg(x, i => 76 + Math.sin(i / 9 + 1) * 5, 2); ground(x);
    for (let i = 0; i < 160; i += 7) A.rect(i + (i % 3), GY + 4 + (i % 5) * 5, 2, 1, 2, x);
    tree(x, 6, 90); tree(x, 150, 90);
    A.rect(8, 96, 16, 12, 3, x); A.rect(6, 92, 20, 5, 0, x); A.rect(14, 101, 4, 7, 0, x);
  },
  capaoNoite: x => {
    sky(x, 0); starsOn(x, 110);
    for (let i = 0; i < 160; i++) if ((i * 7) % 5 === 0) A.rect(i, 20 + Math.round(Math.sin(i / 25) * 10), 1, 1, 2, x);
    rg(x, i => i > 18 && i < 62 ? 38 + (i < 24 ? (24 - i) * 3 : 0) + (i > 56 ? (i - 56) * 3 : 0) : 64 + Math.sin(i / 11) * 6, 1);
    rg(x, i => 80 + Math.sin(i / 9 + 1) * 5, 0); ground(x, 1);
    A.rect(8, 96, 16, 12, 2, x); A.rect(6, 92, 20, 5, 0, x); A.rect(14, 101, 4, 7, 0, x); A.rect(10, 98, 3, 3, 3, x);
  },
  alcantara: x => {
    sky(x); A.disc(30, 22, 9, 2, x);
    for (let i = 0; i < 60; i += 6) A.rect(i, 64 - (i * 7) % 9, 5, 8 + (i * 7) % 9, 1, x);
    A.rect(0, 70, 160, 30, 1, x);
    for (let i = 0; i < 12; i++) A.rect((i * 29) % 150, 74 + (i * 7) % 22, 8, 1, 2, x);
    rg(x, () => 98, 2); ground(x);
    for (let i = 0; i < 3; i++) { A.rect(10 + i * 12, 86, 3, 22, 0, x); A.rect(10 + i * 12, 84, 12, 3, 0, x); }
    A.rect(146, 30, 3, 78, 0, x); A.rect(140, 30, 1, 78, 0, x);
    for (let y = 32; y < 106; y += 6) A.rect(140, y, 12, 1, 0, x);
  },
  atacama: x => {
    sky(x, 0); starsOn(x);
    rg(x, i => 58 + Math.abs(((i + 20) % 60) - 30) * 0.9, 1);
    rg(x, i => 90 + Math.sin(i / 14) * 4, 2); ground(x);
    for (const [dx, r] of [[18, 9], [42, 7]]) { A.disc(dx, 90, r, 3, x); A.rect(dx - r, 90, r * 2 + 1, r, 3, x); A.rect(dx - 1, 90 - r, 2, r, 1, x); }
    for (let i = 0; i < 4; i++) { const ax = 62 + i * 10; A.rect(ax + 3, 92, 2, 8, 3, x); A.rect(ax, 88, 8, 2, 3, x); A.rect(ax + 1, 90, 6, 1, 3, x); }
  },
  roma: x => {
    sky(x); A.disc(136, 18, 8, 2, x); ground(x, 2);
    A.rect(8, 56, 90, 52, 2, x); A.rect(8, 56, 90, 2, 1, x);
    for (let r = 0; r < 3; r++) for (let c = 0; c < 9; c++) { A.rect(12 + c * 10, 62 + r * 15, 6, 10, r === 2 ? 0 : 1, x); A.disc(15 + c * 10, 62 + r * 15, 3, r === 2 ? 0 : 1, x); }
    for (let i = 0; i < 12; i++) A.rect(98 - i * 2, 56 + i * 4, 2, 52 - i * 4, 3, x);
    for (const px of [110, 124]) { A.disc(px, 80, 4, 0, x); A.rect(px - 3, 68, 7, 14, 0, x); A.rect(px - 2, 60, 5, 10, 0, x); A.rect(px - 1, 82, 2, 26, 0, x); }
  },
  manaus: x => {
    sky(x); A.disc(24, 20, 9, 2, x);
    for (let i = 0; i < 160; i += 9) A.disc(i, 70 + (i * 7) % 6, 8, 1, x);
    A.rect(0, 76, 160, 12, 1, x); A.rect(0, 86, 80, 14, 0, x); A.rect(80, 86, 80, 14, 2, x);
    for (let i = 0; i < 8; i++) A.rect(78 + (i % 2) * 3, 86 + i * 2, 4, 1, 1, x);
    ground(x, 1);
    A.rect(18, 54, 30, 22, 3, x); A.disc(33, 54, 12, 2, x); A.rect(21, 54, 25, 1, 0, x); for (let i = 0; i < 5; i++) A.rect(24 + i * 5, 44, 1, 10, 1, x); A.rect(32, 38, 2, 5, 0, x);
  },
  florida: x => {
    sky(x); A.rect(0, 84, 160, 16, 1, x); for (let i = 0; i < 10; i++) A.rect((i * 31) % 150, 88 + (i * 5) % 10, 7, 1, 2, x);
    ground(x, 2);
    A.rect(8, 50, 34, 58, 3, x); A.rect(8, 50, 34, 1, 0, x); A.rect(12, 56, 10, 6, 1, x); A.rect(26, 56, 12, 2, 0, x); A.rect(26, 60, 12, 2, 0, x);
    palm(x, 60, 78); palm(x, 88, 82);
    A.rect(146, 34, 3, 74, 0, x); for (let y = 36; y < 106; y += 6) A.rect(138, y, 11, 1, 0, x);
  },
  japao: x => {
    sky(x); A.disc(120, 28, 14, 2, x);
    rg(x, i => Math.max(40 + Math.abs(i - 72) * 0.9, 70), 1, 10, 134);
    for (let i = 52; i < 93; i++) { const y = 40 + Math.abs(i - 72) * 0.9; if (y < 52) A.rect(i, Math.round(y), 1, 52 - Math.round(y), 3, x); }
    rg(x, () => 96, 2); ground(x);
    A.rect(10, 70, 32, 4, 0, x); A.rect(8, 68, 36, 2, 0, x); A.rect(12, 78, 28, 2, 0, x); A.rect(14, 70, 3, 38, 0, x); A.rect(35, 70, 3, 38, 0, x);
  },
  guiana: x => {
    sky(x); A.disc(30, 18, 8, 2, x);
    for (let i = -4; i < 164; i += 10) { A.disc(i, 80 + (i * 3) % 7, 10, 0, x); A.disc(i, 81 + (i * 3) % 7, 9, 1, x); }
    ground(x, 1); tower(x, 152);
    A.rect(94, 58, 5, 50, 3, x); A.rect(95, 52, 3, 6, 3, x); A.rect(96, 49, 1, 3, 0, x); A.rect(91, 88, 3, 20, 3, x); A.rect(99, 88, 3, 20, 3, x);
  },
  baikonur: x => {
    sky(x); A.disc(24, 24, 8, 2, x); rg(x, () => 94, 2); ground(x, 2);
    for (let i = 0; i < 160; i += 11) A.rect(i, 98 + (i % 4) * 2, 3, 1, 1, x);
    tower(x, 152); A.rect(95, 62, 4, 32, 3, x); A.rect(96, 58, 2, 4, 3, x); A.rect(92, 84, 2, 10, 3, x); A.rect(100, 84, 2, 10, 3, x);
    A.rect(10, 94, 16, 6, 1, x); A.disc(15, 93, 3, 1, x); A.disc(21, 93, 3, 1, x); A.rect(26, 88, 3, 8, 1, x); A.rect(27, 86, 5, 3, 1, x);
    for (const lx of [11, 14, 22, 25]) A.rect(lx, 100, 1, 8, 1, x);
  },
  londres: x => {
    sky(x); for (const [cx, cy] of [[30, 20], [100, 14], [140, 26]]) { A.disc(cx, cy, 7, 2, x); A.disc(cx + 8, cy + 2, 6, 2, x); }
    A.rect(0, 92, 160, 8, 1, x); ground(x, 2);
    A.rect(14, 38, 14, 70, 1, x); A.rect(16, 30, 10, 8, 1, x); A.rect(19, 22, 4, 8, 0, x); A.disc(21, 48, 5, 3, x); A.rect(21, 45, 1, 4, 0, x); A.rect(21, 48, 3, 1, 0, x);
    A.disc(70, 84, 10, 3, x); A.rect(60, 84, 21, 12, 3, x); A.rect(70, 74, 1, 10, 0, x);
    A.rect(96, 100, 1, 8, 0, x); A.txt('0', 94, 94, 0, 1, x);
  },
  india: x => {
    sky(x); A.disc(130, 20, 9, 2, x); A.rect(0, 80, 160, 18, 1, x); ground(x, 2);
    A.disc(40, 70, 14, 3, x); A.rect(24, 70, 33, 38, 3, x); A.rect(39, 50, 2, 8, 2, x);
    A.rect(34, 88, 12, 20, 0, x); A.disc(40, 88, 6, 0, x);
    for (const mx of [16, 64]) { A.rect(mx - 1, 58, 3, 50, 3, x); A.rect(mx - 2, 56, 5, 3, 1, x); }
    palm(x, 96, 84);
  },
  antartida: x => {
    sky(x); A.disc(130, 26, 7, 2, x);
    rg(x, i => 70 + Math.abs(((i + 10) % 50) - 25) * 0.6, 3); rg(x, () => GY, 3);
    for (let i = 0; i < 160; i += 13) A.rect(i, 72 + (i % 5), 1, 36, 2, x);
    A.rect(56, 90, 36, 18, 2, x); A.rect(56, 90, 36, 2, 0, x); for (let i = 0; i < 4; i++) A.rect(60 + i * 8, 95, 4, 4, 0, x);
    for (const px of [12, 20]) { A.rect(px, 98, 6, 10, 0, x); A.rect(px + 1, 101, 4, 6, 3, x); A.rect(px + 2, 96, 3, 3, 0, x); A.rect(px + 5, 97, 2, 1, 2, x); }
  },
  australia: x => {
    sky(x, 0); starsOn(x, 90);
    for (let i = 0; i < 160; i++) A.rect(i, 60 - i * 0.35 + Math.sin(i / 5) * 3, 1, 6, 1, x);
    rg(x, i => i > 20 && i < 110 ? 76 + Math.pow(Math.abs(i - 65) / 45, 3) * 30 : 144, 2);
    for (let i = 24; i < 106; i += 7) A.rect(i, 80 + (i % 3), 1, 26, 1, x);
    ground(x, 1);
  },
  mexico: x => {
    sky(x); A.disc(136, 20, 8, 2, x);
    for (let i = -4; i < 164; i += 12) A.disc(i, 88, 9, 1, x);
    ground(x, 1);
    for (let s = 0; s < 5; s++) A.rect(20 + s * 7, 60 + s * 10, 90 - s * 14, 10, s % 2 ? 2 : 3, x);
    A.rect(56, 60, 18, 48, 1, x); for (let y = 62; y < 108; y += 3) A.rect(56, y, 18, 1, 0, x);
    A.rect(52, 48, 26, 12, 2, x); A.rect(60, 51, 10, 9, 0, x);
  },
  havai: x => {
    sky(x, 0); starsOn(x, 100);
    rg(x, i => 44 + Math.pow(Math.abs(i - 70) / 70, 1.6) * 60, 1);
    for (const [dx, r] of [[62, 5], [76, 4]]) { A.disc(dx, 46, r, 3, x); A.rect(dx - r, 46, r * 2 + 1, 3, 3, x); }
    A.rect(0, 96, 160, 12, 1, x); for (let i = 0; i < 9; i++) A.rect((i * 23) % 150, 98 + (i * 3) % 8, 6, 1, 2, x);
    ground(x, 2); palm(x, 20, 84);
  },
  lisboa: x => {
    sky(x); A.disc(30, 20, 8, 2, x); A.rect(0, 86, 160, 16, 1, x);
    for (let i = 0; i < 10; i++) A.rect((i * 29) % 150, 90 + (i * 7) % 10, 7, 1, 2, x);
    ground(x, 2);
    A.rect(10, 54, 22, 54, 3, x); A.rect(14, 44, 14, 10, 3, x); for (let i = 0; i < 5; i++) A.rect(10 + i * 5, 51, 3, 3, 3, x); A.rect(17, 64, 8, 10, 1, x); A.rect(19, 82, 4, 8, 0, x);
    A.rect(70, 88, 34, 7, 0, x); A.rect(74, 95, 26, 2, 0, x); A.rect(86, 58, 2, 30, 0, x);
    A.rect(78, 60, 18, 16, 3, x); A.rect(86, 62, 2, 12, 2, x); A.rect(81, 67, 12, 2, 2, x);
  },
  egito: x => {
    sky(x); A.disc(24, 20, 10, 2, x); ground(x, 2);
    for (const [cx, h] of [[50, 58], [100, 44], [132, 30]]) for (let i = 0; i < h; i++) { A.rect(cx - i, GY - h + i, i * 2 + 1, 1, 2, x); A.rect(cx - i, GY - h + i, 1, 1, 1, x); A.rect(cx + i, GY - h + i, 1, 1, 0, x); }
    A.rect(0, 102, 160, 3, 1, x); palm(x, 12, 84);
  },
};
