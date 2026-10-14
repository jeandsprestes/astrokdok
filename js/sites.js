'use strict';
// Cenários dos locais de lançamento (160x144, chão em y=108).
// Cores diretas de cada lugar (não dependem da paleta ativa); amarelo+preto fica só para a Astrokdok.
const GY = 108;
const SITE_C = {
  ceu: '#6fb6ff', hor: '#b2dcff', noite: '#0a1034', noiteH: '#1b2660', // céu de dia e de noite (alto, perto do horizonte)
  sol: '#ffa62b', solM: '#ffe066', est: '#ffffff', estA: '#9fb8ff', estQ: '#ffd9a0',
  grama: '#78c850', gramaE: '#4c9a3c', folha: '#2f8a36', folhaE: '#1f6b2a', folhaC: '#62c050', tronco: '#7a4a24',
  mar: '#3a8fe0', onda: '#b4e0ff', areia: '#f0dca0', torre: '#d0462e', branco: '#f4f6fa',
};
const rg = (x, fn, c, from = 0, to = 160) => { for (let i = from; i < to; i++) { const y = Math.round(fn(i)); A.rect(i, y, 1, 144 - y, c, x); } };
// céu em duas faixas (alto e horizonte), com uma linha pontilhada na emenda
const sky = (x, c = SITE_C.ceu, h = SITE_C.hor) => { A.rect(0, 0, 160, 144, c, x); A.rect(0, 44, 160, 100, h, x); for (let i = 0; i < 160; i += 2) A.rect(i, 43, 1, 1, h, x); };
const siteSun = (x, cx, cy, r, c = SITE_C.sol, m = SITE_C.solM) => { A.disc(cx, cy, r, c, x); A.disc(cx, cy, r - 2, m, x); };
const starsOn = (x, n = 70) => { for (let i = 0; i < n; i++) A.rect((i * 37) % 160, (i * 23) % 70, 1, 1, i % 5 ? SITE_C.est : i % 2 ? SITE_C.estA : SITE_C.estQ, x); };
const ground = (x, c = SITE_C.grama, e) => { rg(x, () => GY, c); if (e) A.rect(0, GY, 160, 1, e, x); };
const palm = (x, px, py, tr = SITE_C.tronco, lf = SITE_C.folha, le = SITE_C.folhaE) => { A.rect(px, py, 2, GY - py, tr, x); for (const [dx, dy] of [[-6, 1], [-3, -1], [2, -1], [5, 1]]) { A.rect(px + dx, py + dy, 6, 2, lf, x); A.rect(px + dx, py + dy + 1, 6, 1, le, x); } };
const tree = (x, px, py, r = 7) => { A.disc(px, py, r, SITE_C.folhaE, x); A.disc(px, py, r - 1, SITE_C.folha, x); A.disc(px - 2, py - 2, r - 5, SITE_C.folhaC, x); A.rect(px - 1, py + r - 1, 2, GY - py - r + 1, SITE_C.tronco, x); };
const tower = (x, px, c = SITE_C.torre) => { A.rect(px, 36, 2, GY - 36, c, x); A.rect(px + 6, 36, 2, GY - 36, c, x); for (let y = 38; y < GY; y += 6) A.rect(px, y, 8, 1, c, x); };
const rocketT = (x, px, top) => { const b = SITE_C.branco, o = '#4a5060'; A.rect(px - 3, top + 6, 7, GY - top - 6, b, x); A.rect(px - 3, top + 6, 1, GY - top - 6, o, x); A.rect(px + 3, top + 6, 1, GY - top - 6, o, x); for (let i = 0; i < 4; i++) A.rect(px - 2 + i % 2 * 3 - (i > 1 ? 1 : 0), top + 2 + i, 3 - (i > 1 ? 0 : 1), 1, o, x); A.rect(px - 7, GY - 20, 3, 20, b, x); A.rect(px + 5, GY - 20, 3, 20, b, x); };

A.SITES = {
  capao: x => {
    sky(x); siteSun(x, 132, 20, 9);
    rg(x, i => i > 18 && i < 62 ? 38 + (i < 24 ? (24 - i) * 3 : 0) + (i > 56 ? (i - 56) * 3 : 0) : 64 + Math.sin(i / 11) * 6, '#7fae8a');
    A.rect(24, 39, 33, 12, '#c9b393', x); for (let i = 26; i < 56; i += 6) A.rect(i, 40, 1, 10, '#a48d6a', x); // paredão de pedra do Pai Inácio
    A.rect(24, 38, 33, 1, '#4f8a3e', x);
    rg(x, i => 76 + Math.sin(i / 9 + 1) * 5, '#58a84a'); ground(x, SITE_C.grama, SITE_C.gramaE);
    for (let i = 0; i < 160; i += 7) A.rect(i + (i % 3), GY + 4 + (i % 5) * 5, 2, 1, SITE_C.gramaE, x);
    tree(x, 6, 90); tree(x, 150, 90);
    A.rect(8, 96, 16, 12, '#5cc6c0', x); A.rect(6, 92, 20, 5, '#c8462e', x); A.rect(14, 101, 4, 7, '#8a4a22', x); // casinha colorida
  },
  capaoNoite: x => {
    sky(x, SITE_C.noite, SITE_C.noiteH);
    for (let i = 0; i < 160; i++) A.rect(i, 17 + Math.round(Math.sin(i / 25) * 10), 1, 7, '#1e2a6e', x); // brilho da Via Láctea
    starsOn(x, 110);
    for (let i = 0; i < 160; i++) if ((i * 7) % 5 === 0) A.rect(i, 20 + Math.round(Math.sin(i / 25) * 10), 1, 1, '#d4ccff', x);
    rg(x, i => i > 18 && i < 62 ? 38 + (i < 24 ? (24 - i) * 3 : 0) + (i > 56 ? (i - 56) * 3 : 0) : 64 + Math.sin(i / 11) * 6, '#2b2452');
    rg(x, i => 80 + Math.sin(i / 9 + 1) * 5, '#121836'); ground(x, '#1e3d2e', '#2f5a40');
    A.rect(8, 96, 16, 12, '#3a8a86', x); A.rect(6, 92, 20, 5, '#5e2418', x); A.rect(14, 101, 4, 7, '#2a1a10', x); A.rect(10, 98, 3, 3, '#ffd36b', x); // janela acesa
  },
  alcantara: x => {
    sky(x); siteSun(x, 30, 22, 9);
    const casas = ['#ef8f7a', '#f6ecd4', '#7fc8a8', '#f2c48a'];
    for (let i = 0; i < 60; i += 6) A.rect(i, 64 - (i * 7) % 9, 5, 8 + (i * 7) % 9, casas[(i / 6) % 4], x); // casarões coloridos
    A.rect(0, 70, 160, 30, SITE_C.mar, x);
    for (let i = 0; i < 12; i++) A.rect((i * 29) % 150, 74 + (i * 7) % 22, 8, 1, SITE_C.onda, x);
    rg(x, () => 98, SITE_C.areia); ground(x, SITE_C.grama, SITE_C.gramaE);
    for (let i = 0; i < 3; i++) { A.rect(10 + i * 12, 86, 3, 22, '#d8ccb2', x); A.rect(12 + i * 12, 87, 1, 21, '#a0927a', x); A.rect(10 + i * 12, 84, 12, 3, '#d8ccb2', x); } // ruínas de pedra
    A.rect(146, 30, 3, 78, SITE_C.torre, x); A.rect(140, 30, 1, 78, SITE_C.torre, x);
    for (let y = 32; y < 106; y += 6) A.rect(140, y, 12, 1, SITE_C.torre, x);
  },
  atacama: x => {
    sky(x, '#0b1034', '#2a2462'); starsOn(x);
    rg(x, i => 58 + Math.abs(((i + 20) % 60) - 30) * 0.9, '#4a3358');
    rg(x, i => 90 + Math.sin(i / 14) * 4, '#a4553a'); ground(x, '#c8703f', '#d98a55');
    for (const [dx, r] of [[18, 9], [42, 7]]) { A.disc(dx, 90, r, '#eef1f7', x); A.rect(dx - r, 90, r * 2 + 1, r, '#eef1f7', x); A.rect(dx - 1, 90 - r, 2, r, '#4a4f6e', x); }
    for (let i = 0; i < 4; i++) { const ax = 62 + i * 10; A.rect(ax + 3, 92, 2, 8, '#9aa0b4', x); A.rect(ax, 88, 8, 2, '#e8ecf4', x); A.rect(ax + 1, 90, 6, 1, '#e8ecf4', x); }
  },
  roma: x => {
    sky(x); siteSun(x, 136, 18, 8); ground(x, SITE_C.grama, SITE_C.gramaE);
    A.rect(8, 56, 90, 52, '#e3c793', x); A.rect(8, 56, 90, 2, '#b8955e', x);
    for (let r = 0; r < 3; r++) for (let c = 0; c < 9; c++) { const k = r === 2 ? '#5e4026' : '#9c7448'; A.rect(12 + c * 10, 62 + r * 15, 6, 10, k, x); A.disc(15 + c * 10, 62 + r * 15, 3, k, x); }
    for (let i = 0; i < 12; i++) A.rect(98 - i * 2, 56 + i * 4, 2, 52 - i * 4, '#f4e2ba', x);
    for (const px of [110, 124]) { A.disc(px, 80, 4, '#1f6332', x); A.rect(px - 3, 68, 7, 14, '#1f6332', x); A.rect(px - 2, 60, 5, 10, '#1f6332', x); A.rect(px - 2, 64, 1, 14, '#3a8a4a', x); A.rect(px - 1, 82, 2, 26, '#5a3a1e', x); } // ciprestes
  },
  manaus: x => {
    sky(x); siteSun(x, 24, 20, 9);
    for (let i = 0; i < 160; i += 9) { A.disc(i, 70 + (i * 7) % 6, 8, '#2a7f36', x); A.disc(i - 2, 68 + (i * 7) % 6, 3, '#4caf4a', x); }
    A.rect(0, 76, 160, 12, '#2a7f36', x); A.rect(0, 86, 80, 14, '#3a2418', x); A.rect(80, 86, 80, 14, '#c89a5c', x); // Rio Negro e Solimões
    for (let i = 0; i < 8; i++) A.rect(78 + (i % 2) * 3, 86 + i * 2, 4, 1, '#7a5a38', x);
    A.rect(0, 100, 160, 8, SITE_C.areia, x); ground(x, SITE_C.grama, SITE_C.gramaE);
    // Teatro Amazonas: cúpula atrás da fachada rosa
    A.disc(33, 54, 12, '#2f9a6a', x); A.rect(18, 54, 30, 22, '#f2a2b4', x); for (let i = 0; i < 6; i++) A.rect(20 + i * 5, 58, 2, 18, '#fff0f4', x);
    A.rect(21, 54, 25, 1, '#fff0f4', x); for (let i = 0; i < 5; i++) A.rect(24 + i * 5, 44, 1, 10, i % 2 ? '#3a6fd8' : '#f6d24a', x); A.rect(32, 38, 2, 5, '#8a6a4a', x);
  },
  florida: x => {
    sky(x); A.rect(0, 84, 160, 16, SITE_C.mar, x); for (let i = 0; i < 10; i++) A.rect((i * 31) % 150, 88 + (i * 5) % 10, 7, 1, SITE_C.onda, x);
    A.rect(0, 100, 160, 8, SITE_C.areia, x); ground(x, SITE_C.grama, SITE_C.gramaE);
    A.rect(8, 50, 34, 58, SITE_C.branco, x); A.rect(40, 51, 2, 57, '#d6dbe4', x); A.rect(8, 50, 34, 1, '#8a93a6', x);
    A.rect(12, 56, 10, 6, '#d8343a', x); for (let y = 57; y < 62; y += 2) A.rect(12, y, 10, 1, '#ffffff', x); A.rect(12, 56, 4, 3, '#2f4fae', x); // bandeira
    A.rect(26, 56, 12, 2, '#4a5468', x); A.rect(26, 60, 12, 2, '#4a5468', x);
    palm(x, 60, 78); palm(x, 88, 82);
    A.rect(146, 34, 3, 74, SITE_C.torre, x); for (let y = 36; y < 106; y += 6) A.rect(138, y, 11, 1, SITE_C.torre, x);
  },
  japao: x => {
    sky(x); A.disc(120, 28, 14, '#e8342c', x);
    const fuji = i => 40 + Math.abs(i - 72) * 0.9; // cone até o pico (antes cortado em y=70 e a neve flutuava)
    rg(x, fuji, '#6f8fd0', 10, 134); rg(x, fuji, '#5a76b4', 73, 134); // lado da sombra
    for (let i = 52; i < 93; i++) { const y = 40 + Math.abs(i - 72) * 0.9; if (y < 52) A.rect(i, Math.round(y), 1, 52 - Math.round(y), i < 73 ? '#f6faff' : '#d4e0f2', x); }
    rg(x, () => 96, '#7cc456'); ground(x, '#4f9e45', '#3f8a3a');
    const tor = '#e0401f'; // torii vermelho com a viga de cima escura
    A.rect(10, 70, 32, 4, tor, x); A.rect(8, 68, 36, 2, '#2a1e1e', x); A.rect(12, 78, 28, 2, tor, x); A.rect(14, 70, 3, 38, tor, x); A.rect(35, 70, 3, 38, tor, x);
  },
  guiana: x => {
    sky(x); siteSun(x, 30, 18, 8);
    A.rect(0, 86, 160, 22, '#8fd06a', x); // clareira
    for (let i = -4; i < 164; i += 10) { A.disc(i, 80 + (i * 3) % 7, 10, '#14552a', x); A.disc(i, 81 + (i * 3) % 7, 9, '#2f8a3a', x); }
    ground(x, '#4f9e45', '#3f8a3a'); tower(x, 152);
    A.rect(94, 58, 5, 50, SITE_C.branco, x); A.rect(98, 58, 1, 50, '#d6dce6', x); A.rect(95, 52, 3, 6, SITE_C.branco, x); A.rect(96, 49, 1, 3, '#d84a3a', x); A.rect(91, 88, 3, 20, '#d6dce6', x); A.rect(99, 88, 3, 20, '#d6dce6', x);
  },
  baikonur: x => {
    sky(x, '#8ccfff', '#c8eaff'); siteSun(x, 24, 24, 8); rg(x, () => 94, '#e4c87a'); ground(x, '#c9a14e', '#b08a3e');
    for (let i = 0; i < 160; i += 11) A.rect(i, 98 + (i % 4) * 2, 3, 1, '#9a7a3a', x);
    tower(x, 152); A.rect(95, 62, 4, 32, SITE_C.branco, x); A.rect(96, 58, 2, 4, '#8fa08a', x); A.rect(92, 84, 2, 10, '#d0d6de', x); A.rect(100, 84, 2, 10, '#d0d6de', x);
    const cam = '#9a6434'; // camelo
    A.rect(10, 94, 16, 6, cam, x); A.disc(15, 93, 3, cam, x); A.disc(21, 93, 3, cam, x); A.rect(26, 88, 3, 8, cam, x); A.rect(27, 86, 5, 3, cam, x);
    for (const lx of [11, 14, 22, 25]) A.rect(lx, 100, 1, 8, cam, x);
  },
  londres: x => {
    sky(x, '#94a8bf', '#b9c6d4'); for (const [cx, cy] of [[30, 20], [100, 14], [140, 26]]) { A.disc(cx, cy, 7, '#eef1f5', x); A.disc(cx + 8, cy + 2, 6, '#eef1f5', x); }
    A.rect(0, 92, 160, 8, '#4f7898', x); A.rect(0, 100, 160, 8, '#86c55a', x); ground(x, '#5aa83e', '#4a8f34');
    A.rect(14, 38, 14, 70, '#d8bd84', x); A.rect(17, 56, 1, 50, '#b8995c', x); A.rect(24, 56, 1, 50, '#b8995c', x); A.rect(16, 30, 10, 8, '#c4a46a', x); A.rect(19, 22, 4, 8, '#3e4a5c', x); A.disc(21, 48, 5, '#fbf6e2', x); A.rect(21, 45, 1, 4, '#1e1e28', x); A.rect(21, 48, 3, 1, '#1e1e28', x);
    A.disc(70, 84, 10, '#d4d8e0', x); A.rect(60, 84, 21, 12, '#b8573c', x); A.rect(70, 74, 1, 10, '#3a3f50', x);
    A.rect(96, 100, 1, 8, '#ff5a4a', x); A.txt('0', 94, 94, '#ff5a4a', 1, x); // meridiano 0°
  },
  india: x => {
    sky(x); siteSun(x, 130, 20, 9); A.rect(0, 80, 160, 18, SITE_C.mar, x); A.rect(0, 98, 160, 10, SITE_C.areia, x); ground(x, SITE_C.grama, SITE_C.gramaE);
    A.disc(40, 70, 14, '#f6f4ee', x); A.rect(24, 70, 33, 38, '#f6f4ee', x); A.rect(39, 50, 2, 8, '#e0a83a', x);
    A.rect(34, 88, 12, 20, '#3a4a6e', x); A.disc(40, 88, 6, '#3a4a6e', x);
    for (const mx of [16, 64]) { A.rect(mx - 1, 58, 3, 50, '#f6f4ee', x); A.rect(mx - 2, 56, 5, 3, '#e8863a', x); }
    palm(x, 96, 84);
  },
  antartida: x => {
    sky(x, '#6fb0e8', '#a8d4f4'); siteSun(x, 130, 26, 7, '#ffe9a0', '#fffbe6');
    rg(x, i => 70 + Math.abs(((i + 10) % 50) - 25) * 0.6, '#dcecfa'); ground(x, '#f6fbff', '#c4def2');
    for (let i = 0; i < 160; i += 13) A.rect(i, 72 + (i % 5), 1, 36, '#a8cdea', x);
    A.rect(56, 90, 36, 18, '#f07a2a', x); A.rect(56, 90, 36, 2, '#8a2e10', x); for (let i = 0; i < 4; i++) A.rect(60 + i * 8, 95, 4, 4, '#2a4a6e', x); // estação laranja
    for (const px of [12, 20]) { A.rect(px, 98, 6, 10, '#1a1e2a', x); A.rect(px + 1, 101, 4, 6, '#ffffff', x); A.rect(px + 2, 96, 3, 3, '#1a1e2a', x); A.rect(px + 5, 97, 2, 1, '#f08a2c', x); } // pinguins
  },
  australia: x => {
    sky(x, '#0a0e2e', '#1d1a48'); starsOn(x, 90);
    for (let i = 0; i < 160; i++) A.rect(i, 60 - i * 0.35 + Math.sin(i / 5) * 3, 1, 6, '#34357e', x); // Via Láctea
    for (let i = 1; i < 160; i += 4) A.rect(i, 61 - i * 0.35 + Math.sin(i / 5) * 3 + (i % 3), 1, 1, '#d8d4ff', x);
    rg(x, i => i > 20 && i < 110 ? 76 + Math.pow(Math.abs(i - 65) / 45, 3) * 30 : 144, '#c4542a'); // Uluru
    for (let i = 24; i < 106; i += 7) A.rect(i, 80 + (i % 3), 1, 26, '#86321a', x);
    ground(x, '#6e2e1c', '#8a3c24');
  },
  mexico: x => {
    sky(x); siteSun(x, 136, 20, 8);
    A.rect(0, 88, 160, 20, '#86c95a', x); // clareira
    for (let i = -4; i < 164; i += 12) { A.disc(i, 88, 9, '#2a8238', x); A.disc(i - 2, 86, 3, '#47a84a', x); }
    ground(x, '#4f9e45', '#3f8a3a');
    for (let s = 0; s < 5; s++) A.rect(20 + s * 7, 98 - s * 10, 90 - s * 14, 10, s % 2 ? '#b9ab8a' : '#d6caa8', x); // degrau largo embaixo (antes ficava de cabeça para baixo)
    A.rect(56, 60, 18, 48, '#9a8a68', x); for (let y = 62; y < 108; y += 3) A.rect(56, y, 18, 1, '#6e604a', x);
    A.rect(52, 48, 26, 12, '#c9bb98', x); A.rect(60, 51, 10, 9, '#3a3226', x);
  },
  havai: x => {
    sky(x, '#0a0f2e', '#1c2660'); starsOn(x, 100);
    rg(x, i => 44 + Math.pow(Math.abs(i - 70) / 70, 1.6) * 60, '#3a2a3a'); // vulcão
    for (const [dx, r] of [[62, 5], [76, 4]]) { A.disc(dx, 46, r, '#eef1f7', x); A.rect(dx - r, 46, r * 2 + 1, 3, '#eef1f7', x); }
    A.rect(0, 96, 160, 12, '#1a3c7c', x); for (let i = 0; i < 9; i++) A.rect((i * 23) % 150, 98 + (i * 3) % 8, 6, 1, '#6a9ae0', x);
    ground(x, '#9a845c', '#b49c70'); palm(x, 20, 84, '#4a3020', '#1f5a38', '#123d26');
  },
  lisboa: x => {
    sky(x); siteSun(x, 30, 20, 8); A.rect(0, 86, 160, 16, SITE_C.mar, x);
    for (let i = 0; i < 10; i++) A.rect((i * 29) % 150, 90 + (i * 7) % 10, 7, 1, SITE_C.onda, x);
    A.rect(0, 102, 160, 6, '#ddd3bf', x); ground(x, SITE_C.grama, SITE_C.gramaE);
    const pd = '#f0e7d2'; // Torre de Belém
    A.rect(10, 54, 22, 54, pd, x); A.rect(29, 54, 3, 54, '#d6cab0', x); A.rect(14, 44, 14, 10, pd, x); for (let i = 0; i < 5; i++) A.rect(10 + i * 5, 51, 3, 3, pd, x); A.rect(17, 64, 8, 10, '#9c8a6a', x); A.rect(19, 82, 4, 8, '#4a3a2a', x);
    A.rect(70, 88, 34, 7, '#8a5428', x); A.rect(74, 95, 26, 2, '#5a3418', x); A.rect(86, 58, 2, 30, '#5a3a1e', x); // caravela
    A.rect(78, 60, 18, 16, '#fbfaf2', x); A.rect(86, 62, 2, 12, '#d42a2a', x); A.rect(81, 67, 12, 2, '#d42a2a', x);
  },
  egito: x => {
    sky(x, '#7cc4ff', '#c4e6ff'); siteSun(x, 24, 20, 10); ground(x, '#e8c67a', '#d4ac5e');
    for (const [cx, h] of [[50, 58], [100, 44], [132, 30]]) for (let i = 0; i < h; i++) { const y = GY - h + i; A.rect(cx - i, y, i * 2 + 1, 1, '#e0b264', x); A.rect(cx + 1, y, i, 1, '#c4924a', x); A.rect(cx - i, y, 1, 1, '#f4d690', x); A.rect(cx + i, y, 1, 1, '#8f6a32', x); }
    A.rect(0, 102, 160, 3, '#2f7fd0', x); palm(x, 12, 84);
  },
};
