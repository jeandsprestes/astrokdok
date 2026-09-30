'use strict';
// Minijogos: Urano (gelo deslizante), Netuno (ventos), Plutão (fotografia).

// ---------- URANO: salas de gelo em que se desliza até bater ----------
const ICE = [
  { map: ['..#.......', '.......#..', '#.........', 'S.....#...', '.#........', '....#....#', '.........E', '..#....#..'], tip: 'DCDBEBD' },
  { map: ['....#.....', '#.......#.', '..#.......', '.....#...#', 'S#........', '......#...', '.#.......#', '...#..E#..'], tip: 'CDBDBD' },
  { map: ['.#....#...', '...#.....#', '#.......#.', '..#..E....', '.....#..#.', 'S..#......', '#.......#.', '...#.#....'], tip: 'DCDCDB' },
];
A.GAMES.uranus = () => {
  const V = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
  const start = g => { const L = ICE[g.room].map; L.forEach((r, y) => [...r].forEach((c, x) => { if (c === 'S') { g.px = x; g.py = y; } })); g.fx = g.px; g.fy = g.py; g.moving = null; g.roomT = 0; };
  return A.game({
    hud: 'MISSÃO 10 · GELO DE URANO', keys: '▲▼◀▶ · B RECOMEÇA', lives: 1, intro: 'CHEGUE NA SAIDA AMARELA',
    init(g) { g.room = 0; g.moves = 0; start(g); },
    update(g, dt) {
      g.roomT += dt;
      const L = ICE[g.room].map;
      if (g.moving) {
        const [dx, dy] = V[g.moving];
        g.fx += dx * 14 * dt; g.fy += dy * 14 * dt;
        if (Math.abs(g.fx - g.px) >= 1 || Math.abs(g.fy - g.py) >= 1) {
          g.px += dx; g.py += dy; g.fx = g.px; g.fy = g.py;
          if (L[g.py][g.px] === 'E') {
            A.sfx('up'); g.room++;
            if (g.room >= ICE.length) { g.win('LABIRINTO VENCIDO!'); return; }
            start(g); return;
          }
          const nx = g.px + dx, ny = g.py + dy;
          if (nx < 0 || ny < 0 || nx > 9 || ny > 7 || L[ny][nx] === '#') { g.moving = null; A.sfx('step'); }
        }
        return;
      }
      if (A.hit('b')) { A.sfx('door'); start(g); return; }
      for (const d of ['up', 'down', 'left', 'right']) {
        if (!A.K[d]) continue;
        const [dx, dy] = V[d], nx = g.px + dx, ny = g.py + dy;
        if (nx < 0 || ny < 0 || nx > 9 || ny > 7 || L[ny][nx] === '#') break;
        g.moving = d; g.moves++; A.hiss(0.1, 0.02); break;
      }
    },
    draw(g) {
      A.cls(0);
      const L = ICE[g.room].map;
      L.forEach((r, y) => [...r].forEach((c, x) => {
        const X = x * 16, Y = 16 + y * 16;
        A.rect(X, Y, 16, 16, 3); A.rect(X + 2, Y + 3, 5, 1, 2); A.rect(X + 9, Y + 11, 4, 1, 2);
        if (c === '#') { A.disc(X + 8, Y + 9, 7, 0); A.disc(X + 8, Y + 8, 6, 1); A.rect(X + 5, Y + 5, 3, 2, 2); }
        if (c === 'E') { A.rect(X + 1, Y + 1, 14, 14, 0); A.rect(X + 3, Y + 3, 10, 10, Math.floor(g.t * 4) % 2 ? 2 : 3); }
      }));
      A.draw(A.GAB.down[0], g.fx * 16, 16 + g.fy * 16 - 2);
    },
    top(g) {
      A.rect(0, 0, 160, 16, 0);
      A.txt(`SALA ${Math.min(g.room + 1, ICE.length)}/${ICE.length}`, 3, 2, 3);
      A.txt(`MOVIMENTOS ${g.moves}`, 3, 9, 1);
      if (g.roomT > 40 && g.room < ICE.length) A.txt(`DICA: ${ICE[g.room].tip}`, 74, 2, 2), A.txt('C=CIMA B=BAIXO', 74, 9, 1);
      else A.txt('B RECOMECA', 110, 5, 1);
    },
  });
};

// ---------- NETUNO: voar contra as rajadas de vento ----------
A.GAMES.neptune = () => A.game({
  hud: 'MISSÃO 11 · VENTOS', keys: '◀ ▶ CONTRA O VENTO', lives: 3 + A.lifeBonus('aquecedor'), intro: 'PASSE PELOS ANEIS',
  init(g) { g.x = 72; g.vx = 0; g.wind = 0; g.target = 0; g.next = 0; g.wt = 2; g.warn = 0; g.rings = []; g.storms = []; g.rt = 1; g.st = 3; g.got = 0; g.need = 12; },
  update(g, dt) {
    if (A.K.left) g.vx -= 130 * dt;
    if (A.K.right) g.vx += 130 * dt;
    g.wt -= dt;
    if (g.wt <= 0 && !g.warn) { g.next = A.pick([-65, -40, 0, 40, 65].filter(w => w !== g.target)); g.warn = 1.1; }
    if (g.warn) { g.warn -= dt; if (g.warn <= 0) { g.warn = 0; g.target = g.next; g.wt = A.rnd(2.4, 3.4); } }
    g.wind += (g.target - g.wind) * Math.min(1, 2.5 * dt);
    g.vx += g.wind * dt; g.vx *= 1 - 1.6 * dt;
    g.x += g.vx * dt;
    if (g.x < 0) { g.x = 0; g.vx = 20; } if (g.x > 144) { g.x = 144; g.vx = -20; }
    g.rt -= dt;
    if (g.rt <= 0) { g.rt = 1.6; g.rings.push({ x: A.rnd(16, 144), y: -10 }); }
    g.st -= dt;
    if (g.st <= 0) { g.st = A.rnd(2.2, 3.4); g.storms.push({ x: A.rnd(10, 150), y: -10 }); }
    for (let i = g.rings.length - 1; i >= 0; i--) {
      const r = g.rings[i]; r.y += 50 * dt;
      if (!r.done && Math.abs(r.y - 112) < 5) { if (Math.abs(r.x - (g.x + 8)) < 9) { r.done = true; g.got++; A.sfx('coin'); if (g.got >= g.need) g.win('MEDICOES FEITAS!'); } }
      if (r.y > 150) g.rings.splice(i, 1);
    }
    for (let i = g.storms.length - 1; i >= 0; i--) {
      const s = g.storms[i]; s.y += 42 * dt; s.x += g.wind * 0.3 * dt;
      if (Math.hypot(s.x - (g.x + 8), s.y - 114) < 12) { g.storms.splice(i, 1); g.hurt(); continue; }
      if (s.y > 160) g.storms.splice(i, 1);
    }
  },
  draw(g) {
    A.cls(1);
    for (let i = 0; i < 26; i++) { const y = (i * 29 + g.t * 60) % 144, x = ((i * 47) + g.t * g.wind) % 160; A.rect((x + 160) % 160, y, Math.max(2, Math.abs(g.wind) / 6), 1, 2); }
    g.rings.forEach(r => { const c = r.done ? 1 : 3; A.rect(r.x - 9, r.y - 1, 18, 3, c); A.rect(r.x - 9, r.y - 3, 2, 7, c); A.rect(r.x + 7, r.y - 3, 2, 7, c); });
    g.storms.forEach(s => { A.disc(s.x, s.y, 8, 0); A.disc(s.x + 2, s.y - 1, 4, 1); });
    if (g.state === 'lose') A.boom(g.x + 8, 112);
    else if (A.flick(g)) { A.draw(A.FLAME[Math.floor(g.t * 10) % 2], g.x + 5, 118); A.draw(A.SHIPS[A.shipLevel()], g.x, 104); }
  },
  top(g) {
    A.rect(0, 0, 160, 18, 0); A.hearts(g.lives, g.maxL, 2, 2);
    A.txt(`ANEIS ${g.got}/${g.need}`, 104, 3, 3);
    const show = g.warn ? g.next : g.target, blink = !g.warn || Math.floor(g.t * 8) % 2;
    if (blink) {
      const n = Math.round(Math.abs(show) / 22);
      A.txt(show === 0 ? 'CALMO' : Array(n + 1).join(show < 0 ? '<' : '>'), 64, 10, g.warn ? 3 : 2);
      if (g.warn) A.txt('VENTO', 30, 10, 3);
    }
  },
});

// ---------- PLUTÃO: fotografar os alvos numa passagem rápida ----------
A.GAMES.pluto = () => {
  const TARGETS = [['CORACAO', 10, 10], ['MONTANHAS', -24, -16], ['CEU AZUL', 0, -44], ['CARONTE', 74, -40]];
  return A.game({
    hud: 'MISSÃO 12 · FOTOS DE PLUTÃO', keys: 'MIRA ▲▼◀▶ · A FOTO', lives: 1, intro: 'FOTOGRAFE OS 4 ALVOS',
    init(g) { g.cx = 80; g.cy = 72; g.px = 190; g.film = 8 + (A.has('camera') ? 2 : 0); g.got = []; g.flash = 0; g.msgT = 0; g.msg = ''; },
    update(g, dt) {
      g.px -= 6.5 * dt;
      g.cx = A.clamp(g.cx + ((A.K.right ? 1 : 0) - (A.K.left ? 1 : 0)) * 62 * dt, 4, 156);
      g.cy = A.clamp(g.cy + ((A.K.down ? 1 : 0) - (A.K.up ? 1 : 0)) * 62 * dt, 18, 140);
      g.flash -= dt; g.msgT -= dt;
      if (A.hit('a') && g.film > 0) {
        g.film--; g.flash = 0.15; A.sfx('blip');
        const t = TARGETS.find(([n, dx, dy]) => !g.got.includes(n) && Math.hypot(g.px + dx - g.cx, 72 + dy - g.cy) < 9);
        if (t) { g.got.push(t[0]); A.sfx('ok'); g.msg = t[0] + '!'; g.msgT = 1.2; if (g.got.length === TARGETS.length) { g.win('FOTOS FEITAS!'); return; } }
        else { A.sfx('bad'); g.msg = 'FORA DO ALVO'; g.msgT = 1; }
      }
      if (g.film <= 0 && g.flash <= 0) g.lose('ACABOU O FILME');
      else if (g.px < -100) g.lose('PLUTAO PASSOU!');
    },
    draw(g) {
      A.cls(0);
      for (let i = 0; i < 40; i++) A.rect((i * 53 + g.px * 0.2) % 160, (i * 37) % 144, 1, 1, i % 5 ? 1 : 3);
      const X = g.px;
      A.disc(X, 72, 46, 1); A.disc(X, 72, 45, 2);
      for (let a = -1.2; a < 1.2; a += 0.05) A.rect(X + Math.sin(a) * 47, 72 - Math.cos(a) * 47, 2, 2, 3);
      [[-10, 20, 6], [18, -26, 5], [-30, 12, 4], [26, 22, 5]].forEach(([dx, dy, r]) => A.disc(X + dx, 72 + dy, r, 1));
      A.disc(X + 6, 80, 7, 3); A.disc(X + 17, 80, 7, 3); for (let i = 0; i < 12; i++) A.rect(X + 5 + i / 2, 82 + i, 13 - i, 1, 3);
      for (let i = 0; i < 4; i++) { A.rect(X - 30 + i * 4, 56 - i * 2, 3, 6 + i * 2, 0); A.rect(X - 29 + i * 4, 56 - i * 2, 1, 2, 3); }
      A.disc(X + 74, 32, 11, 0); A.disc(X + 74, 32, 10, 1); A.disc(X + 71, 29, 3, 2);
      const c = 3;
      A.rect(g.cx - 8, g.cy, 5, 1, c); A.rect(g.cx + 4, g.cy, 5, 1, c); A.rect(g.cx, g.cy - 8, 1, 5, c); A.rect(g.cx, g.cy + 4, 1, 5, c);
      A.rect(g.cx - 6, g.cy - 6, 3, 1, c); A.rect(g.cx - 6, g.cy - 6, 1, 3, c); A.rect(g.cx + 4, g.cy + 6, 3, 1, c); A.rect(g.cx + 6, g.cy + 4, 1, 3, c);
      if (g.flash > 0) A.cls(3);
    },
    top(g) {
      A.rect(0, 0, 160, 14, 0);
      A.txt(`FILME ${g.film}`, 2, 2, 3);
      TARGETS.forEach(([n], i) => A.txt((g.got.includes(n) ? '*' : '-') + n.split(' ')[0].slice(0, 5), 38 + i * 30, 2, g.got.includes(n) ? 2 : 1));
      if (g.msgT > 0) A.txtC(g.msg, 8, 2);
    },
  });
};
