'use strict';
// Minijogos: Mercúrio (crepúsculo), Vênus (sonda-balão), Marte (jipe-robô).
const ROVER = A.spr(['..0000..', '.033330.', '03311330', '00000000', '02.00.20', '.0....0.']);

// ---------- MERCÚRIO: ficar na faixa entre o dia e a noite ----------
A.GAMES.mercury = () => {
  const band = t => ({ c: 80 + Math.sin(t * 0.55) * 36 + Math.sin(t * 1.3) * 9, w: Math.max(28, 46 - t * 0.45) });
  return A.game({
    hud: 'MISSÃO 4 · CREPÚSCULO', keys: '◀ ▶ MOVER', lives: 3, intro: 'FIQUE NA FAIXA ESCURA',
    init(g) { g.x = 76; g.hot = 0; g.cold = 0; g.cr = []; g.ct = 2; g.T = 40; },
    update(g, dt) {
      if (A.K.left) g.x -= 72 * dt;
      if (A.K.right) g.x += 72 * dt;
      g.x = A.clamp(g.x, 0, 152);
      const b = band(g.t), px = g.x + 4;
      if (px > b.c + b.w / 2) { g.hot += 75 * dt; g.cold = Math.max(0, g.cold - 40 * dt); }
      else if (px < b.c - b.w / 2) { g.cold += 75 * dt; g.hot = Math.max(0, g.hot - 40 * dt); }
      else { g.hot = Math.max(0, g.hot - 50 * dt); g.cold = Math.max(0, g.cold - 50 * dt); }
      if (g.hot >= 100) { g.hot = 30; g.hurt(); }
      if (g.cold >= 100) { g.cold = 30; g.hurt(); }
      g.ct -= dt;
      if (g.ct <= 0) { g.ct = Math.max(0.9, 1.6 - g.t * 0.02); const f = band(g.t + 2.4); g.cr.push({ x: f.c + A.rnd(-f.w / 2 + 4, f.w / 2 - 4), y: -8, r: A.ri(4, 6) }); }
      for (let i = g.cr.length - 1; i >= 0; i--) {
        const c = g.cr[i]; c.y += 45 * dt;
        if (c.y > 150) { g.cr.splice(i, 1); continue; }
        if (Math.abs(c.x - px) < c.r + 2 && Math.abs(c.y - 115) < c.r + 2) { g.cr.splice(i, 1); g.hurt(); }
      }
      if (g.t >= g.T) g.win('CREPUSCULO ATRAVESSADO!');
    },
    draw(g) {
      for (let y = 10; y < 144; y += 2) {
        const b = band(g.t + (115 - y) / 45), l = Math.round(b.c - b.w / 2), r = Math.round(b.c + b.w / 2);
        A.rect(0, y, l, 2, 0); A.rect(l, y, r - l, 2, 1); A.rect(r, y, 160 - r, 2, 2);
        const k = (y * 7 + Math.floor(g.t * 45)) % 23;
        if (k < 2) A.rect((y * 13) % Math.max(1, l), y, 1, 1, 3);
        if (k > 19) A.rect(r + (y * 11) % Math.max(1, 160 - r), y, 2, 1, 3);
      }
      g.cr.forEach(c => { A.disc(c.x, c.y, c.r, 0); A.disc(c.x, c.y - 1, c.r - 1, 1); A.disc(c.x, c.y, c.r - 2, 0); });
      if (g.state === 'lose') A.boom(g.x + 4, 115); else if (A.flick(g)) A.draw(ROVER, g.x, 112);
    },
    top(g) {
      A.rect(0, 0, 160, 10, 0);
      A.hearts(g.lives, g.maxL, 2, 2);
      A.txt('FRIO', 34, 3, 3); A.rect(52, 3, 30, 4, 1); A.rect(52, 3, Math.round(30 * g.cold / 100), 4, 3);
      A.txt('CALOR', 88, 3, 2); A.rect(110, 3, 30, 4, 1); A.rect(110, 3, Math.round(30 * g.hot / 100), 4, 2);
      A.rect(0, 141, Math.round(160 * Math.min(1, g.t / g.T)), 3, 2);
    },
  });
};

// ---------- VÊNUS: sonda-balão nas nuvens ----------
A.GAMES.venus = () => A.game({
  hud: 'MISSÃO 5 · SONDA-BALÃO', keys: 'SEGURE A · SOBE', lives: 3 + A.lifeBonus('refletor'), intro: 'SEGURE A PARA SUBIR',
  init(g) { g.y = 60; g.vy = 0; g.got = 0; g.need = 12; g.walls = []; g.orbs = []; g.wt = 1.2; g.bolt = null; g.bt = 5; },
  update(g, dt) {
    g.vy += (A.K.a ? -95 : 60) * dt; g.vy = A.clamp(g.vy, -55, 55); g.y += g.vy * dt;
    if (g.y < 14) { g.y = 14; g.vy = 0; }
    if (g.y > 122) { g.y = 122; g.vy = -45; g.hurt(); }
    const gap = Math.max(38, 50 - g.got);
    g.wt -= dt;
    if (g.wt <= 0) { g.wt = 2.3; const c = A.rnd(34, 104); g.walls.push({ x: 164, c, gap }); g.orbs.push({ x: 170, y: c }); }
    const me = { x: 38, y: g.y - 7, w: 12, h: 18 };
    g.walls.forEach(w => { w.x -= 40 * dt; if (A.hitbox(me, { x: w.x, y: 12, w: 14, h: w.c - w.gap / 2 - 12 }) || A.hitbox(me, { x: w.x, y: w.c + w.gap / 2, w: 14, h: 144 })) g.hurt(); });
    g.walls = g.walls.filter(w => w.x > -20);
    for (let i = g.orbs.length - 1; i >= 0; i--) {
      const o = g.orbs[i]; o.x -= 40 * dt;
      if (Math.abs(o.x - 44) < 9 && Math.abs(o.y - g.y) < 11) { g.orbs.splice(i, 1); g.got++; A.sfx('coin'); if (g.got >= g.need) g.win('DADOS COLETADOS!'); }
      else if (o.x < -10) g.orbs.splice(i, 1);
    }
    g.bt -= dt;
    if (!g.bolt && g.bt <= 0) g.bolt = { y: A.rnd(24, 118), t: 0 };
    if (g.bolt) {
      g.bolt.t += dt;
      if (g.bolt.t > 0.9 && g.bolt.t < 1.15 && Math.abs(g.bolt.y - g.y) < 9) g.hurt();
      if (g.bolt.t > 1.15) { g.bolt = null; g.bt = A.rnd(3.5, 6); }
    }
  },
  draw(g) {
    A.cls(2);
    for (let i = 0; i < 14; i++) A.rect((i * 41 - g.t * 25) % 180 + 160 * (((i * 41 - g.t * 25) % 180) < -20), 20 + (i * 17) % 110, 18, 3, 3);
    A.rect(0, 134, 160, 10, 1);
    g.walls.forEach(w => {
      A.rect(w.x, 12, 14, w.c - w.gap / 2 - 12, 1); A.rect(w.x, w.c + w.gap / 2, 14, 144, 1);
      A.rect(w.x - 2, w.c - w.gap / 2 - 4, 18, 4, 0); A.rect(w.x - 2, w.c + w.gap / 2, 18, 4, 0);
    });
    g.orbs.forEach(o => { A.disc(o.x, o.y, 3, 0); A.disc(o.x, o.y, 2, 3); });
    if (g.bolt) {
      if (g.bolt.t < 0.9) { if (Math.floor(g.bolt.t * 10) % 2) { A.rect(0, g.bolt.y - 6, 160, 1, 0); A.rect(0, g.bolt.y + 6, 160, 1, 0); A.txt('!', 150, g.bolt.y - 2, 0); } }
      else for (let x = 0; x < 160; x += 6) A.rect(x, g.bolt.y - 2 + ((x / 6) % 2) * 3, 6, 3, 3);
    }
    if (g.state === 'lose') A.boom(44, g.y);
    else if (A.flick(g)) { A.disc(44, g.y - 3, 7, 0); A.disc(44, g.y - 3, 6, 3); A.rect(41, g.y - 7, 2, 6, 2); A.rect(43, g.y + 3, 1, 5, 0); A.rect(45, g.y + 3, 1, 5, 0); A.rect(41, g.y + 8, 7, 3, 0); }
  },
  top(g) { A.rect(0, 0, 160, 10, 0); A.hearts(g.lives, g.maxL, 2, 2); A.txt(`DADOS ${g.got}/${g.need}`, 100, 3, 2); },
});

// ---------- MARTE: jipe-robô pulando pedras ----------
A.GAMES.mars = () => {
  const GYM = 112;
  return A.game({
    hud: 'MISSÃO 6 · JIPE-ROBÔ', keys: 'A · PULAR', lives: 3 + A.lifeBonus('casco'), intro: 'A PARA PULAR',
    init(g) { g.h = 0; g.vy = 0; g.on = true; g.obs = []; g.ice = []; g.ot = 1.5; g.it = 1; g.got = 0; g.need = 10; g.sp = 55; g.dust = []; },
    update(g, dt) {
      g.sp = Math.min(88, 55 + g.t * 1.1);
      if (A.hit('a') && g.on) { g.vy = 150; g.on = false; A.sfx('blip'); }
      g.h += g.vy * dt; g.vy -= 380 * dt;
      if (g.h <= 0) { g.h = 0; g.vy = 0; g.on = true; }
      g.ot -= dt;
      if (g.ot <= 0) { g.ot = A.rnd(1.25, 1.9); g.obs.push(Math.random() < 0.35 ? { x: 164, w: 16, hole: true } : { x: 164, w: A.ri(8, 12), h: A.ri(6, 10) }); }
      g.it -= dt;
      if (g.it <= 0) { g.it = A.rnd(1.3, 2); g.ice.push({ x: 170, y: GYM - A.ri(8, 40) }); }
      const me = { x: 26, y: GYM - 6 - g.h, w: 6, h: 6 };
      g.obs.forEach(o => {
        o.x -= g.sp * dt;
        if (o.hit) return;
        if (o.hole ? (g.h < 1 && 27 > o.x + 2 && 31 < o.x + o.w - 2) : A.hitbox(me, { x: o.x + 1, y: GYM - o.h, w: o.w - 2, h: o.h })) { o.hit = true; g.hurt(); }
      });
      g.obs = g.obs.filter(o => o.x > -20);
      for (let i = g.ice.length - 1; i >= 0; i--) {
        const c = g.ice[i]; c.x -= g.sp * dt;
        if (Math.abs(c.x - 29) < 7 && Math.abs(c.y - (GYM - 3 - g.h)) < 8) { g.ice.splice(i, 1); g.got++; A.sfx('coin'); if (g.got >= g.need) g.win('GELO COLETADO!'); }
        else if (c.x < -10) g.ice.splice(i, 1);
      }
      if (g.got >= 6) { for (let k = 0; k < 1; k++) g.dust.push({ x: 164, y: A.rnd(10, 140), v: A.rnd(90, 140) }); }
      g.dust.forEach(d => { d.x -= d.v * dt; }); g.dust = g.dust.filter(d => d.x > -4);
    },
    draw(g) {
      A.cls(2);
      A.disc(130, 26, 4, 3);
      const off = (g.t * g.sp * 0.3) % 40;
      for (let i = -1; i < 6; i++) A.disc(i * 40 - off, 100, 18, 1);
      A.rect(0, GYM, 160, 32, 1);
      for (let i = 0; i < 12; i++) A.rect((i * 29 - g.t * g.sp) % 180 + (((i * 29 - g.t * g.sp) % 180) < 0 ? 180 : 0), GYM + 4 + (i % 4) * 6, 3, 1, 0);
      g.obs.forEach(o => { if (o.hole) { A.rect(o.x, GYM, o.w, 10, 0); A.rect(o.x, GYM, o.w, 1, 2); } else { A.rect(o.x, GYM - o.h, o.w, o.h, 0); A.rect(o.x + 1, GYM - o.h + 1, o.w - 3, 2, 1); } });
      g.ice.forEach(c => { A.rect(c.x - 1, c.y - 3, 3, 7, 3); A.rect(c.x - 3, c.y - 1, 7, 3, 3); A.rect(c.x, c.y, 1, 1, 0); });
      g.dust.forEach(d => A.rect(d.x, d.y, 3, 1, 3));
      if (g.state === 'lose') A.boom(29, GYM - 4); else if (A.flick(g)) A.draw(ROVER, 25, GYM - 6 - g.h);
    },
    top(g) { A.rect(0, 0, 160, 10, 0); A.hearts(g.lives, g.maxL, 2, 2); A.txt(`GELO ${g.got}/${g.need}`, 104, 3, 3); },
  });
};
