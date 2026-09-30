'use strict';
// Minijogos: Asteroides (mineração), Júpiter (sequência das luas), Saturno (travessia dos anéis).

// ---------- ASTEROIDES: atirar, partir pedras e pegar cristais ----------
A.GAMES.asteroids = (o = {}) => A.game({
  hud: o.hud || 'MISSÃO 7 · MINERAÇÃO', keys: '◀ ▶ · A ATIRA', lives: 3 + A.lifeBonus('broca'), intro: 'A PARA ATIRAR',
  init(g) { g.x = 72; g.shots = []; g.rocks = []; g.gems = []; g.got = 0; g.need = o.need || 15; g.cool = 0; g.rt = 0.5; },
  update(g, dt) {
    const ship = A.SHIPS[A.shipLevel()];
    if (A.K.left) g.x -= 85 * dt;
    if (A.K.right) g.x += 85 * dt;
    g.x = A.clamp(g.x, 0, 144);
    g.cool -= dt;
    if (A.K.a && g.cool <= 0) { g.shots.push({ x: g.x + 7, y: 108 }); g.cool = 0.26; A.tone(1400, 0.03); }
    g.rt -= dt;
    if (g.rt <= 0) { g.rt = Math.max(0.7, 1.3 - g.t * 0.012); g.rocks.push({ x: A.rnd(10, 150), y: -12, r: A.pick([10, 10, 6]), vx: A.rnd(-10, 10), vy: A.rnd(18, 30) }); }
    g.shots.forEach(s => { s.y -= 160 * dt; }); g.shots = g.shots.filter(s => s.y > -5);
    for (let i = g.rocks.length - 1; i >= 0; i--) {
      const r = g.rocks[i];
      r.x += r.vx * dt; r.y += r.vy * dt;
      if (r.x < r.r || r.x > 160 - r.r) r.vx *= -1;
      const hit = g.shots.findIndex(s => Math.abs(s.x - r.x) < r.r && Math.abs(s.y - r.y) < r.r);
      if (hit >= 0) {
        g.shots.splice(hit, 1); g.rocks.splice(i, 1); A.sfx('hit');
        if (r.r > 3) { const nr = r.r > 6 ? 6 : 3; g.rocks.push({ x: r.x, y: r.y, r: nr, vx: -18, vy: r.vy }, { x: r.x, y: r.y, r: nr, vx: 18, vy: r.vy }); }
        if (Math.random() < 0.65) g.gems.push({ x: r.x, y: r.y });
        continue;
      }
      if (r.y > 150) { g.rocks.splice(i, 1); continue; }
      if (Math.abs(r.x - (g.x + 8)) < r.r + 4 && Math.abs(r.y - 114) < r.r + 5) { g.rocks.splice(i, 1); g.hurt(); }
    }
    for (let i = g.gems.length - 1; i >= 0; i--) {
      const c = g.gems[i]; c.y += 32 * dt;
      if (Math.abs(c.x - (g.x + 8)) < 9 && Math.abs(c.y - 112) < 9) { g.gems.splice(i, 1); g.got++; A.sfx('coin'); if (g.got >= g.need) g.win('AMOSTRAS COLETADAS!'); }
      else if (c.y > 150) g.gems.splice(i, 1);
    }
    g.ship = ship;
  },
  draw(g) {
    A.cls(0);
    for (let i = 0; i < 30; i++) A.rect((i * 53) % 160, (i * 37 + g.t * 25) % 144, 1, 1, i % 4 ? 1 : 3);
    g.rocks.forEach(r => { A.disc(r.x, r.y, r.r, 0); A.disc(r.x, r.y, r.r - 1, 1); A.rect(r.x - r.r / 3, r.y - r.r / 3, 2, 2, 2); });
    g.gems.forEach(c => { A.rect(c.x - 1, c.y - 3, 3, 7, 2); A.rect(c.x - 3, c.y - 1, 7, 3, 2); A.rect(c.x, c.y, 1, 1, 3); });
    g.shots.forEach(s => A.rect(s.x, s.y, 2, 5, 3));
    if (g.state === 'lose') A.boom(g.x + 8, 112);
    else if (A.flick(g)) { A.draw(A.FLAME[Math.floor(g.t * 10) % 2], g.x + 5, 118); A.draw(g.ship || A.SHIPS[0], g.x, 104); }
  },
  top(g) { A.rect(0, 0, 160, 10, 0); A.hearts(g.lives, g.maxL, 2, 2); A.txt(`CRISTAIS ${g.got}/${g.need}`, 88, 3, 2); },
});

// ---------- JÚPITER: repetir a sequência das luas ----------
const MOONS = { up: ['IO', 80, 22, 523], right: ['EUROPA', 138, 72, 659], down: ['GANIMEDES', 80, 122, 784], left: ['CALISTO', 22, 72, 392] };
const DIRS4 = ['up', 'right', 'down', 'left'];
A.GAMES.jupiter = (o = {}) => {
  const rounds = o.rounds || [3, 4, 5, 6];
  return A.game({
    hud: o.hud || 'MISSÃO 8 · LUAS DE GALILEU', keys: 'REPITA COM ▲▶▼◀', lives: 3 + A.lifeBonus('escudo-rad'), intro: 'OBSERVE A SEQUENCIA',
    init(g) { g.seq = []; g.r = 0; while (g.seq.length < rounds[0]) g.seq.push(A.pick(DIRS4)); g.phase = 'show'; g.i = 0; g.pt = -1.4; g.lit = null; g.litT = 0; },
    update(g, dt) {
      g.litT -= dt; if (g.litT <= 0) g.lit = null;
      if (g.phase === 'show') {
        g.pt += dt;
        if (g.pt >= 0.75) {
          g.pt = 0;
          if (g.i < g.seq.length) { g.lit = g.seq[g.i]; g.litT = 0.5; A.tone(MOONS[g.lit][3], 0.35); g.i++; }
          else { g.phase = 'input'; g.i = 0; }
        }
        return;
      }
      for (const d of DIRS4) {
        if (!A.hit(d)) continue;
        g.lit = d; g.litT = 0.25; A.tone(MOONS[d][3], 0.18);
        if (d === g.seq[g.i]) {
          g.i++;
          if (g.i >= g.seq.length) {
            g.r++;
            if (g.r >= rounds.length) { g.win('LUAS REGISTRADAS!'); return; }
            while (g.seq.length < rounds[g.r]) g.seq.push(A.pick(DIRS4));
            g.phase = 'show'; g.i = 0; g.pt = -1; A.sfx('ok');
          }
        } else { g.hurt(); g.phase = 'show'; g.i = 0; g.pt = -1.2; }
        break;
      }
    },
    draw(g) {
      A.cls(0);
      for (let i = 0; i < 25; i++) A.rect((i * 53) % 160, (i * 37) % 144, 1, 1, 1);
      for (let y = -26; y <= 26; y++) { const w = Math.floor(Math.sqrt(26 * 26 - y * y)); A.rect(80 - w, 72 + y, w * 2 + 1, 1, [2, 3, 1, 2, 3, 2][Math.floor((y + 26) / 9)]); }
      A.disc(88, 80, 4, 1);
      for (const d of DIRS4) {
        const [name, x, y] = MOONS[d], on = g.lit === d;
        A.disc(x, y, on ? 9 : 7, 0); A.disc(x, y, on ? 8 : 6, on ? 3 : 1);
        A.txt(name, Math.max(1, Math.min(159 - A.txtW(name), x - A.txtW(name) / 2)), y + (d === 'down' ? -18 : 11), on ? 3 : 2);
      }
    },
    top(g) {
      A.rect(0, 0, 160, 10, 0); A.hearts(g.lives, g.maxL, 2, 2);
      A.txt(`RODADA ${g.r + 1}/${rounds.length}`, 50, 3, 3);
      if (g.state === 'play') A.txt(g.phase === 'show' ? 'OLHE' : 'SUA VEZ', 124, 3, g.phase === 'show' ? 3 : 2);
    },
  });
};

// ---------- SATURNO: atravessar as faixas dos anéis ----------
A.GAMES.saturn = () => {
  const LANES = 6, TOP = 20, H = 16;
  const mk = k => Array.from({ length: LANES }, (_, i) => {
    const dir = i % 2 ? 1 : -1, sp = (18 + ((i * 7) % 5) * 7) * (1 + k * 0.18), n = 3, chunks = [];
    for (let j = 0; j < n; j++) chunks.push({ x: j * (180 / n) + A.rnd(0, 20), w: A.ri(18, 30) });
    return { dir, sp, chunks };
  });
  return A.game({
    hud: 'MISSÃO 9 · ANÉIS', keys: '▲ ▼ ◀ ▶ MOVER', lives: 3 + A.lifeBonus('radar'), intro: 'CHEGUE AO TOPO 3 VEZES',
    init(g) { g.cx = 5; g.cy = LANES + 1; g.cross = 0; g.lanes = mk(0); g.mc = 0; },
    update(g, dt) {
      g.lanes.forEach(l => l.chunks.forEach(c => { c.x += l.dir * l.sp * dt; if (c.x > 180) c.x -= 200; if (c.x < -40) c.x += 200; }));
      g.mc -= dt;
      if (g.mc <= 0) {
        const d = ['up', 'down', 'left', 'right'].find(k => A.K[k]);
        if (d) {
          g.mc = 0.17; A.sfx('step');
          if (d === 'up') g.cy--; if (d === 'down') g.cy = Math.min(LANES + 1, g.cy + 1);
          if (d === 'left') g.cx = Math.max(0, g.cx - 1); if (d === 'right') g.cx = Math.min(9, g.cx + 1);
          if (g.cy < 1) { g.cross++; A.sfx('up'); if (g.cross >= 3) { g.win('ANEIS ATRAVESSADOS!'); return; } g.cy = LANES + 1; g.lanes = mk(g.cross); }
        }
      }
      if (g.cy >= 1 && g.cy <= LANES) {
        const l = g.lanes[g.cy - 1], px = g.cx * 16 + 3;
        if (l.chunks.some(c => px + 10 > c.x && px < c.x + c.w) && g.hurt()) { g.cy = LANES + 1; }
      }
    },
    draw(g) {
      A.cls(0);
      A.rect(0, TOP - 16 + 4, 160, 12, 2); A.txtC('DIVISAO DE CASSINI', TOP - 9, 0);
      g.lanes.forEach((l, i) => {
        const y = TOP + i * H;
        A.rect(0, y, 160, H, 1); A.rect(0, y, 160, 1, 0);
        l.chunks.forEach(c => { A.rect(c.x, y + 3, c.w, H - 6, 3); A.rect(c.x + 2, y + 4, c.w - 4, 2, 2); });
      });
      A.rect(0, TOP + LANES * H, 160, 144, 0);
      for (let i = 0; i < 20; i++) A.rect((i * 41) % 160, TOP + LANES * H + 4 + (i * 7) % 18, 1, 1, 2);
      const y = g.cy === 0 ? TOP - 14 : TOP + (g.cy - 1) * H;
      if (g.state === 'lose') A.boom(g.cx * 16 + 8, y + 8);
      else if (A.flick(g)) A.draw(A.SHIPS[A.shipLevel()], g.cx * 16, y);
    },
    top(g) { A.rect(0, 0, 160, 8, 0); A.hearts(g.lives, g.maxL, 2, 1); A.txt(`TRAVESSIAS ${g.cross}/3`, 96, 2, 3); },
  });
};
