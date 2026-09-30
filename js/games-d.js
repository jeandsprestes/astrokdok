'use strict';
// Minijogos: Próxima Centauri (ritmo do laser), Órion (ligar estrelas), Sagitário A* (órbita).

// ---------- PRÓXIMA: apertar no ritmo dos pulsos de laser ----------
A.GAMES.proxima = () => {
  const LINE = 104, KEY = { a: 'A', left: '<', right: '>' };
  return A.game({
    hud: 'MISSÃO 13 · VELA A LASER', keys: 'A · ◀ ▶ NO RITMO', lives: 1, intro: 'APERTE NA LINHA AMARELA',
    init(g) { g.pulses = []; g.bt = 0.8; g.speed = 0; g.fx = 0; g.combo = 0; g.limit = 75; },
    update(g, dt) {
      g.bt -= dt; g.fx -= dt;
      if (g.t > g.limit) { g.lose('A JANELA DO LASER FECHOU'); return; }
      if (g.bt <= 0) { g.bt = Math.max(0.55, 0.85 - g.speed * 0.003); const r = Math.random(); g.pulses.push({ y: 10, k: r < 0.6 ? 'a' : r < 0.8 ? 'left' : 'right' }); }
      g.pulses.forEach(p => { p.y += 62 * dt; });
      for (const k of ['a', 'left', 'right']) {
        if (!A.hit(k)) continue;
        const p = g.pulses.find(p => !p.done && p.k === k && Math.abs(p.y - LINE) < 11);
        if (p) { p.done = true; g.speed = Math.min(100, g.speed + 4 + Math.min(2, g.combo * 0.5)); g.combo++; g.fx = 0.18; A.tone(880 + g.combo * 20, 0.06); if (g.speed >= 100) { g.win('CHEGAMOS!'); return; } }
        else { g.combo = 0; A.sfx('bad'); g.speed = Math.max(0, g.speed - 2); }
      }
      g.pulses.forEach(p => { if (!p.done && !p.miss && p.y > LINE + 11) { p.miss = true; g.combo = 0; g.speed = Math.max(0, g.speed - 3); A.tone(180, 0.08); } });
      g.pulses = g.pulses.filter(p => p.y < 150 && !p.done);
    },
    draw(g) {
      A.cls(0);
      const sp = 20 + g.speed * 2;
      for (let i = 0; i < 36; i++) { const y = (i * 37 + g.t * sp) % 144; A.rect((i * 53) % 160, y, 1, 1 + Math.floor(g.speed / 25), i % 4 ? 1 : 3); }
      A.rect(60, 0, 40, 144, 0); A.rect(60, 0, 1, 144, 1); A.rect(99, 0, 1, 144, 1);
      A.rect(58, LINE - 1, 44, 3, 2);
      g.pulses.forEach(p => {
        if (p.k === 'a') { A.disc(80, p.y, 6, 2); A.disc(80, p.y, 4, 3); A.txt('A', 79, p.y - 2, 0); }
        else { A.rect(70, p.y - 4, 20, 9, 3); A.txt(p.k === 'left' ? '<<<' : '>>>', 75, p.y - 2, 0); }
      });
      if (g.fx > 0) A.rect(78, LINE, 4, 40, 3);
      A.drawS(A.SHIPS[A.shipLevel()], 120, 60 + Math.round(Math.sin(g.t * 3) * 2), 2);
    },
    top(g) {
      A.rect(0, 0, 160, 10, 0); A.txt(`TEMPO ${Math.max(0, Math.ceil(g.limit - g.t))}`, 3, 3, g.limit - g.t < 15 ? 3 : 2);
      A.txt('VEL', 106, 3, 3); A.rect(120, 3, 36, 4, 1); A.rect(120, 3, Math.round(36 * g.speed / 100), 4, 2);
      A.rect(0, 134, 58, 10, 0); A.txt(`COMBO ${g.combo}`, 3, 136, g.combo > 4 ? 2 : 1);
    },
  });
};

// ---------- ÓRION: ligar as estrelas na ordem ----------
const CONST = [
  { name: 'ORION', stars: [['BETELGEUSE', 48, 32], ['BELLATRIX', 108, 38], ['MINTAKA', 92, 70], ['ALNILAM', 80, 74], ['ALNITAK', 68, 78], ['SAIPH', 56, 118], ['RIGEL', 112, 114]],
    edges: [[0, 1], [0, 4], [1, 2], [2, 3], [3, 4], [4, 5], [2, 6]] },
  { name: 'CRUZEIRO DO SUL', stars: [['GACRUX', 80, 28], ['ACRUX', 84, 118], ['MIMOSA', 46, 66], ['DELTA', 116, 60], ['INTROMETIDA', 102, 90]],
    edges: [[0, 1], [2, 3]] },
];
A.GAMES.orion = () => A.game({
  hud: 'MISSÃO 14 · CONSTELAÇÕES', keys: 'MIRA ▲▼◀▶ · A LIGA', lives: 1, intro: 'LIGUE NA ORDEM DOS NUMEROS',
  init(g) { g.ci = 0; g.next = 0; g.cx = 20; g.cy = 130; g.limit = 50 + (A.has('mapa') ? 15 : 0); g.left = g.limit; g.bg = A.stars(40); g.msg = ''; g.msgT = 0; },
  update(g, dt) {
    const C = CONST[g.ci];
    g.left -= dt; g.msgT -= dt;
    if (g.left <= 0) { g.lose('O TEMPO ACABOU'); return; }
    g.cx = A.clamp(g.cx + ((A.K.right ? 1 : 0) - (A.K.left ? 1 : 0)) * 70 * dt, 2, 158);
    g.cy = A.clamp(g.cy + ((A.K.down ? 1 : 0) - (A.K.up ? 1 : 0)) * 70 * dt, 14, 142);
    if (!A.hit('a')) return;
    const i = C.stars.findIndex(([, x, y]) => Math.hypot(x - g.cx, y - g.cy) < 8);
    if (i === g.next) {
      g.next++; A.tone(660 + g.next * 60, 0.12); g.msg = C.stars[i][0]; g.msgT = 1.2;
      if (g.next >= C.stars.length) {
        A.sfx('up'); g.ci++; g.next = 0; g.left = g.limit;
        if (g.ci >= CONST.length) { g.ci = CONST.length - 1; g.next = CONST[g.ci].stars.length; g.win('CONSTELACOES MAPEADAS!'); }
      }
    } else if (i >= 0) { A.sfx('bad'); g.left -= 3; g.msg = 'ORDEM ERRADA: -3S'; g.msgT = 1; }
    else { A.sfx('bad'); g.msg = 'NENHUMA ESTRELA AQUI'; g.msgT = 0.8; }
  },
  draw(g) {
    const C = CONST[g.ci];
    A.cls(0); A.drawStars(g.bg, 1);
    C.edges.forEach(([a, b]) => {
      if (a >= g.next || b >= g.next) return;
      const [, x1, y1] = C.stars[a], [, x2, y2] = C.stars[b], n = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
      for (let k = 0; k <= n; k += 2) A.rect(x1 + (x2 - x1) * k / n, y1 + (y2 - y1) * k / n, 1, 1, 2);
    });
    C.stars.forEach(([, x, y], i) => {
      const done = i < g.next;
      A.disc(x, y, done ? 3 : 2, done ? 2 : 3);
      if (!done) A.txt(String(i + 1), x + 5, y - 7, i === g.next ? 2 : 1);
    });
    if (g.ci === 0) { A.disc(62, 96, 3, 1); A.rect(61, 95, 2, 2, 3); }
    const c = 3;
    A.rect(g.cx - 7, g.cy, 4, 1, c); A.rect(g.cx + 4, g.cy, 4, 1, c); A.rect(g.cx, g.cy - 7, 1, 4, c); A.rect(g.cx, g.cy + 4, 1, 4, c);
  },
  top(g) {
    A.rect(0, 0, 160, 10, 0);
    A.txt(CONST[g.ci].name, 2, 3, 3);
    A.rect(104, 3, 52, 4, 1); A.rect(104, 3, Math.max(0, Math.round(52 * g.left / g.limit)), 4, g.left < 10 ? 3 : 2);
    if (g.msgT > 0) A.txtC(g.msg, 134, 2);
  },
});

// ---------- SAGITÁRIO A*: manter a órbita segura ----------
A.GAMES.blackhole = () => {
  const CX = 80, CY = 76, IN = 22, SAFE1 = 30, SAFE2 = 58, OUT = 66;
  const dot = () => ({ a: A.rnd(0, 6.28), r: A.rnd(SAFE1 + 3, SAFE2 - 3) });
  return A.game({
    hud: 'MISSÃO 15 · SAGITÁRIO A*', keys: 'SEGURE A · PARA FORA', lives: 3 + A.lifeBonus('relogio'), intro: 'SEGURE A PARA SUBIR A ORBITA',
    init(g) { g.r = 46; g.a = 0; g.got = 0; g.need = 15; g.dots = [dot(), dot(), dot()]; g.ss = [{ r: 38, a: 1, w: -0.9 }, { r: 52, a: 3.5, w: 0.55 }]; g.days = 0; },
    update(g, dt) {
      g.a += 1.5 * Math.pow(46 / g.r, 1.5) * dt;
      g.r += (A.K.a ? 30 : -16 - (60 - g.r) * 0.25) * dt;
      if (g.r < IN) { g.hurt(); g.r = 44; }
      if (g.r > OUT) { g.hurt(); g.r = 44; }
      g.days += dt * (1 + (60 - g.r) * 0.25);
      const px = CX + Math.cos(g.a) * g.r, py = CY + Math.sin(g.a) * g.r * 0.8;
      g.dots.forEach((d, i) => { if (Math.hypot(CX + Math.cos(d.a) * d.r - px, CY + Math.sin(d.a) * d.r * 0.8 - py) < 7) { g.dots[i] = dot(); g.got++; A.sfx('coin'); if (g.got >= g.need) g.win('DADOS COLETADOS!'); } });
      g.ss.forEach(s => { s.a += s.w * dt; if (Math.hypot(CX + Math.cos(s.a) * s.r - px, CY + Math.sin(s.a) * s.r * 0.8 - py) < 7) g.hurt(); });
      g.px = px; g.py = py;
    },
    draw(g) {
      A.cls(0);
      for (let i = 0; i < 40; i++) A.rect((i * 53) % 160, (i * 37) % 144, 1, 1, 1);
      for (let a = 0; a < 6.283; a += 0.03) { A.rect(CX + Math.cos(a) * SAFE1, CY + Math.sin(a) * SAFE1 * 0.8, 1, 1, 1); A.rect(CX + Math.cos(a) * SAFE2, CY + Math.sin(a) * SAFE2 * 0.8, 1, 1, 1); }
      for (let r = IN - 6; r > 12; r -= 2) for (let a = 0; a < 6.283; a += 0.05) A.rect(CX + Math.cos(a + g.t * 2) * r, CY + Math.sin(a + g.t * 2) * r * 0.3, 1, 1, r % 4 ? 2 : 3);
      A.disc(CX, CY, 11, 3); A.disc(CX, CY, 10, 0);
      g.dots.forEach(d => { const x = CX + Math.cos(d.a) * d.r, y = CY + Math.sin(d.a) * d.r * 0.8; A.rect(x - 1, y - 1, 3, 3, 2); A.rect(x, y, 1, 1, 3); });
      g.ss.forEach(s => { const x = CX + Math.cos(s.a) * s.r, y = CY + Math.sin(s.a) * s.r * 0.8; A.disc(x, y, 3, 3); A.rect(x - 5, y, 11, 1, 2); A.rect(x, y - 5, 1, 11, 2); });
      if (g.state === 'lose') A.boom(g.px || CX, g.py || CY);
      else if (A.flick(g) && g.px) { A.disc(g.px, g.py, 4, 0); A.disc(g.px, g.py, 3, 2); A.rect(g.px - 1, g.py - 1, 2, 2, 3); }
    },
    top(g) {
      A.rect(0, 0, 160, 10, 0); A.hearts(g.lives, g.maxL, 2, 2); A.txt(`DADOS ${g.got}/${g.need}`, 104, 3, 2);
      A.rect(0, 134, 160, 10, 0); A.txt(`NA TERRA JA PASSARAM ${Math.floor(g.days / 6)} DIAS`, 4, 136, 1);
    },
  });
};
