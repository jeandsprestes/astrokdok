'use strict';
// Mundo em ladrilhos 16x16 (10x9) e caminhada estilo Pokémon.
// Ladrilhos usam cores diretas (não dependem da paleta ativa). Amarelo+preto só no hangar e na plataforma da Astrokdok.
const T = 16, STEP = 0.17;
const R = (x, px, py, w, h, c) => { x.fillStyle = A.col(c); x.fillRect(px, py, w, h); };
const GR = A.PALS.grama, FLO = A.PALS.floresta, BR = A.PALS.brand;
const ESC = '#1c1c28', MAD = ['#4a2c14', '#a0662f', '#c98b4a']; // contorno escuro; madeira escura → clara
const PISO = ['#c4955a', '#ecc98c'], MURO = ['#2c427a', '#5b7fc4'], TRILHA = ['#b8894a', '#e3c486'], VIDRO = '#e6f4ff';
const AMARELA = A.C.amarelo, MARCA = '#7a3f00'; // cadeira/banquinho do jogador
const CAD = ['#3b6fd6', '#3aa655', '#e04848', '#8e5bd6']; // cadeiras dos colegas (nunca amarelo)
const LIVROS = ['#e04848', '#3b6fd6', '#3aa655', '#f08a2c', '#8e5bd6', '#3fc6d6'];
const FRASCOS = ['#4fd65a', '#ff5a8a', '#3fc6d6', '#b06bff', '#ffb020'];
const cor = (arr, px, py) => arr[((px + py) >> 5) % arr.length]; // varia a cor pela posição
// prédios do mapa base: colunas 0-3 = Escola do Capão (colorida), colunas 6-9 = hangar da Astrokdok (amarelo e preto)
const PRED = {
  escola: { telha: '#c8402f', junta: '#8c1f1f', muro: '#f3e6c4', faixa: '#3b6fd6', moldura: '#2c427a', vidro: '#9fd4ff', borda: MAD[0], porta: '#9a5a2a', trinco: AMARELA },
  hangar: { telha: BR[0], junta: BR[1], muro: BR[2], faixa: BR[0], moldura: BR[0], vidro: '#d6ecff', borda: BR[0], porta: '#3a3a44', trinco: BR[2] },
};
const pred = px => px >= 96 ? PRED.hangar : PRED.escola;
const floor = (x, px, py) => { R(x, px, py, T, T, PISO[1]); R(x, px, py + 7, T, 1, PISO[0]); R(x, px, py + 15, T, 1, PISO[0]); R(x, px + (py % 32 ? 4 : 11), py, 1, 7, PISO[0]); R(x, px + (py % 32 ? 11 : 4), py + 8, 1, 7, PISO[0]); };
const grass = (x, px, py) => { R(x, px, py, T, T, GR[2]); [[3, 4], [11, 2], [7, 10], [13, 12], [2, 13]].forEach(([a, b]) => { R(x, px + a, py + b, 1, 2, GR[1]); R(x, px + a + 2, py + b, 1, 2, GR[1]); R(x, px + a + 1, py + b + 1, 1, 2, GR[1]); }); };
const wall = (x, px, py) => { R(x, px, py, T, T, MURO[1]); for (let i = 0; i < 4; i++) { R(x, px, py + i * 4 + 3, T, 1, MURO[0]); R(x, px + (i % 2 ? 4 : 12), py + i * 4, 1, 3, MURO[0]); } };
const TILE = {
  '.': floor,
  '#': wall,
  'W': (x, px, py) => { wall(x, px, py); R(x, px + 2, py + 2, 12, 11, '#6b4224'); R(x, px + 3, py + 3, 10, 9, '#9fd4ff'); R(x, px + 7, py + 3, 2, 9, '#6b4224'); R(x, px + 3, py + 7, 10, 1, '#6b4224'); R(x, px + 4, py + 4, 2, 2, VIDRO); },
  // lousa verde-escura
  'B': (x, px, py) => { wall(x, px, py); R(x, px, py + 1, T, 12, '#1f4d33'); R(x, px, py + 13, T, 2, MAD[2]); R(x, px, py + 15, T, 1, MAD[0]); },
  'D': (x, px, py) => { floor(x, px, py); R(x, px + 1, py + 3, 14, 10, MAD[0]); R(x, px + 2, py + 4, 12, 8, MAD[1]); R(x, px + 2, py + 4, 12, 2, MAD[2]); R(x, px + 4, py + 7, 5, 3, '#ffffff'); },
  'c': (x, px, py) => { floor(x, px, py); R(x, px + 3, py + 4, 10, 9, ESC); R(x, px + 4, py + 5, 8, 7, cor(CAD, px, py)); },
  'g': (x, px, py) => { floor(x, px, py); R(x, px + 3, py + 4, 10, 9, ESC); R(x, px + 4, py + 5, 8, 7, AMARELA); R(x, px + 7, py + 6, 2, 5, MARCA); R(x, px + 5, py + 8, 6, 1, MARCA); },
  'T': (x, px, py) => { floor(x, px, py); R(x, px, py + 3, T, 11, '#3a160a'); R(x, px, py + 4, T, 9, '#8c3f22'); R(x, px, py + 4, T, 2, '#c0643a'); },
  // tapete vermelho da saída
  'd': (x, px, py) => { floor(x, px, py); R(x, px + 1, py + 6, 14, 10, MAD[0]); R(x, px + 2, py + 7, 12, 9, '#d94a3a'); for (let i = 0; i < 3; i++) R(x, px + 3, py + 9 + i * 2, 10, 1, '#8c1f1f'); },
  ',': grass,
  'p': (x, px, py) => { R(x, px, py, T, T, TRILHA[1]); [[2, 3], [9, 6], [5, 11], [13, 13], [12, 1]].forEach(([a, b]) => R(x, px + a, py + b, 2, 1, TRILHA[0])); },
  't': (x, px, py) => { grass(x, px, py); A.disc(px + 8, py + 7, 7, FLO[0], x); A.disc(px + 8, py + 7, 6, FLO[1], x); R(x, px + 4, py + 3, 3, 2, FLO[2]); R(x, px + 10, py + 6, 2, 2, FLO[2]); R(x, px + 7, py + 13, 2, 3, '#5a3417'); },
  // telhado, parede e porta dos prédios (escola ou hangar, pela coluna)
  'r': (x, px, py) => { const c = pred(px); R(x, px, py, T, T, c.telha); for (let i = 1; i < T; i += 3) R(x, px, py + i, T, 1, c.junta); },
  'w': (x, px, py) => { const c = pred(px); R(x, px, py, T, T, c.muro); R(x, px, py + 14, T, 2, c.faixa); R(x, px + 3, py + 3, 10, 8, c.moldura); R(x, px + 4, py + 4, 8, 6, c.vidro); R(x, px + 8, py + 4, 1, 6, c.moldura); },
  'e': (x, px, py) => { const c = pred(px); R(x, px, py, T, T, c.muro); R(x, px + 2, py + 2, 12, 14, c.borda); R(x, px + 3, py + 3, 10, 13, c.porta); R(x, px + 10, py + 9, 2, 2, c.trinco); },
  // telescópio
  'S': (x, px, py) => { grass(x, px, py); R(x, px + 7, py + 8, 2, 7, '#2b2b33'); R(x, px + 4, py + 13, 3, 2, '#2b2b33'); R(x, px + 9, py + 13, 3, 2, '#2b2b33'); for (let i = 0; i < 9; i++) R(x, px + 2 + i, py + 8 - Math.floor(i / 2), 2, 3, i === 8 ? '#9fe8ff' : '#2c427a'); },
  // plataforma de foguete da Astrokdok (faixas de alerta amarelas)
  'R': (x, px, py) => { R(x, px, py, T, T, '#5b5d6b'); R(x, px, py, T, 1, '#2b2b33'); R(x, px, py, 1, T, '#2b2b33'); for (let i = 2; i < T; i += 4) R(x, px + i, py + i, 3, 1, BR[2]); },
  // estante de livros
  'Q': (x, px, py) => { R(x, px, py, T, T, '#3a2414'); for (let r = 0; r < 3; r++) { R(x, px + 1, py + 1 + r * 5, 14, 4, '#7a4a24'); for (let i = 0; i < 6; i++) R(x, px + 2 + i * 2, py + 1 + r * 5 + (i % 2), 1, 4 - (i % 2), LIVROS[(i + r * 2 + px / T) % 6]); } },
  // prateleira de laboratório
  'L': (x, px, py) => { wall(x, px, py); R(x, px, py + 9, T, 2, MAD[1]); [[2, 3], [7, 2], [11, 3]].forEach(([a, h], k) => { R(x, px + a, py + 9 - h * 2, 3, h * 2, VIDRO); R(x, px + a + 1, py + 9 - h * 2 - 2, 1, 2, VIDRO); R(x, px + a, py + 7, 3, 2, FRASCOS[(k + px / T) % 5]); }); },
  // bancada de laboratório
  'K': (x, px, py) => { floor(x, px, py); R(x, px + 1, py + 3, 14, 10, '#2b2b33'); R(x, px + 2, py + 4, 12, 8, '#dcdde6'); R(x, px + 3, py + 5, 3, 5, '#3fc6d6'); R(x, px + 4, py + 3, 1, 2, '#2b2b33'); R(x, px + 9, py + 7, 4, 3, '#e04848'); },
  // mesa de piquenique (pátio)
  'P': (x, px, py) => { grass(x, px, py); R(x, px + 1, py + 4, 14, 8, MAD[0]); R(x, px + 2, py + 5, 12, 6, MAD[1]); for (let i = 4; i < 14; i += 4) R(x, px + i, py + 5, 1, 6, MAD[2]); },
  // banquinho no pátio (h = do jogador, amarelo)
  'j': (x, px, py) => { grass(x, px, py); A.disc(px + 8, py + 8, 4, ESC, x); A.disc(px + 8, py + 8, 3, cor(CAD, px, py), x); },
  'h': (x, px, py) => { grass(x, px, py); A.disc(px + 8, py + 8, 5, ESC, x); A.disc(px + 8, py + 8, 4, AMARELA, x); R(x, px + 7, py + 6, 2, 5, MARCA); R(x, px + 5, py + 8, 6, 1, MARCA); },
  // portão do pátio
  'o': (x, px, py) => { R(x, px, py, T, T, TRILHA[1]); [[2, 3], [9, 6], [5, 11]].forEach(([a, b]) => R(x, px + a, py + b, 2, 1, TRILHA[0])); },
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
const NIGHT = '#6676c4', LUZES = ['#ffffff', '#c8f07a']; // véu azul da noite; brilho e vaga-lume

// aparência do jogador (escolhida na tela de aparência; sem escolha, o visual de sempre)
A.LOOKS = {
  hair: [['CURTO', 'curto'], ['COMPRIDO', 'comprido'], ['VOLUMOSO', 'volumoso'], ['RASPADO', 'raspado']],
  hairCol: [['PRETO', '#2a2630'], ['CASTANHO', A.C.cabelo[1]], ['LOIRO', A.C.cabelo[2]], ['RUIVO', A.C.cabelo[4]]],
  skin: A.C.pele.map((c, i) => [`TOM ${i + 1}`, c]),
  shirt: [['AMARELO', A.C.amarelo], ['AZUL', A.C.azul], ['VERMELHO', A.C.vermelho], ['VERDE', A.C.verde], ['ROXO', A.C.roxo], ['ROSA', A.C.rosa], ['LARANJA', A.C.laranja], ['BRANCO', '#f2f4f8'], ['PRETO', '#2c2c38']],
  legs: [['CALÇA', 'calca'], ['BERMUDA', 'bermuda'], ['SAIA', 'saia']],
  legsCol: [['JEANS', A.C.jeans], ['PRETO', '#2c2c38'], ['CINZA', '#4a4e5c'], ['MARROM', A.C.marrom], ['VERDE', '#2f6f3a'], ['VERMELHO', '#a8331f']],
  shoe: [['MARROM', '#3a2618'], ['PRETO', '#141414'], ['BRANCO', '#e8e8ee'], ['VERMELHO', '#c43a3a']],
};
A.LOOK0 = { hair: 0, hairCol: 0, skin: 0, shirt: 0, legs: 0, legsCol: 0, shoe: 0 };
A.charOf = l => {
  const v = k => (A.LOOKS[k][l[k]] || A.LOOKS[k][0])[1];
  return A.makeChar(v('hairCol'), v('shirt'), v('legsCol'), v('skin'), { hair: v('hair'), legs: v('legs'), shoe: v('shoe') });
};
A.applyLook = () => { A.GAB = A.S && A.S.look ? A.charOf(A.S.look) : A.makeChar(0, 2, 1); };
A.applyLook();

// def: { rows, paint(x), extra(ctx,t), npcs: [...], onStep(x,y,ch) → fn?, onFace(x,y,ch) → fn?, onB → fn }
A.worldScene = (def, sx, sy, sdir = 'down') => {
  // fundo pré-renderizado; 'ui' é a paleta padrão do paint (letreiros) e não vaza
  const bg = A.withPal('ui', () => A.mk(A.W, A.H, x => {
    def.rows.forEach((r, j) => [...r].forEach((ch, i) => (TILE[ch] || floor)(x, i * T, j * T)));
    if (def.paint) def.paint(x);
    if (def.night) { // noite: escurece tudo com azul (multiply) e acende vaga-lumes por cima
      x.globalCompositeOperation = 'multiply'; R(x, 0, 0, A.W, A.H, NIGHT); x.globalCompositeOperation = 'source-over';
      for (let i = 0; i < 40; i++) R(x, (i * 37) % 160, (i * 53) % 144, 1, 1, LUZES[i % 4 ? 1 : 0]);
    }
  }));
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
    A.usePal('ui'); // paleta padrão dos extras do mapa (textos e luzinhas)
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
