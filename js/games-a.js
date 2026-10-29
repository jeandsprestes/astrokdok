'use strict';
// Minijogos: Mercúrio (crepúsculo), Vênus (sonda-balão), Marte (jipe-robô).
// jipe branco, painel azul, rodas escuras
const ROVER = A.spr(['..0000..', '.033330.', '03311330', '00000000', '02.00.20', '.0....0.'], { 0: '#1a1c24', 1: '#3b7ae0', 2: '#6a6f7a', 3: '#f4f6fa' });
const HUD_FRIO = '#5ab4ff', HUD_CALOR = '#ff4a3a';

// ---------- MERCÚRIO: ficar na faixa entre o dia e a noite ----------
A.GAMES.mercury = () => {
  // faixa larga e lenta; termômetros enchem em 2 s e zeram no dano; crateras raras e lentas
  const band = t => ({ c: 80 + Math.sin(t * 0.45) * 32 + Math.sin(t * 1.0) * 7, w: Math.max(40, 58 - t * 0.4) });
  return A.game({
    hud: 'MISSÃO 4 · CREPÚSCULO', keys: '◀ ▶ MOVER', lives: 5, intro: 'FIQUE NA FAIXA ESCURA',
    init(g) { g.x = 76; g.hot = 0; g.cold = 0; g.cr = []; g.ct = 3; g.T = 30; },
    update(g, dt) {
      if (A.K.left) g.x -= 72 * dt;
      if (A.K.right) g.x += 72 * dt;
      g.x = A.clamp(g.x, 0, 152);
      const b = band(g.t), px = g.x + 4;
      if (px > b.c + b.w / 2) { g.hot += 50 * dt; g.cold = Math.max(0, g.cold - 40 * dt); }
      else if (px < b.c - b.w / 2) { g.cold += 50 * dt; g.hot = Math.max(0, g.hot - 40 * dt); }
      else { g.hot = Math.max(0, g.hot - 70 * dt); g.cold = Math.max(0, g.cold - 70 * dt); }
      if (g.hot >= 100) { g.hot = 0; g.hurt(); }
      if (g.cold >= 100) { g.cold = 0; g.hurt(); }
      g.ct -= dt;
      if (g.ct <= 0) { g.ct = Math.max(1.5, 2.4 - g.t * 0.02); const f = band(g.t + 3.2); g.cr.push({ x: f.c + A.rnd(-f.w / 2 + 4, f.w / 2 - 4), y: -8, r: A.ri(4, 6) }); }
      for (let i = g.cr.length - 1; i >= 0; i--) {
        const c = g.cr[i]; c.y += 38 * dt;
        if (c.y > 150) { g.cr.splice(i, 1); continue; }
        if (Math.abs(c.x - px) < c.r - 1 && Math.abs(c.y - 115) < c.r - 1) { g.cr.splice(i, 1); g.hurt(); }
      }
      if (g.t >= g.T) g.win('CREPUSCULO ATRAVESSADO!');
    },
    draw(g) {
      // frio azul-escuro gelado · crepúsculo roxo/marrom · quente laranja/vermelho
      for (let y = 10; y < 144; y += 2) {
        const b = band(g.t + (115 - y) / 38), l = Math.round(b.c - b.w / 2), r = Math.round(b.c + b.w / 2);
        A.rect(0, y, l, 2, '#16305e'); A.rect(l, y, r - l, 2, '#6b3f5e'); A.rect(r, y, 160 - r, 2, '#e4581e');
        const k = (y * 7 + Math.floor(g.t * 45)) % 23;
        if (k < 2) A.rect((y * 13) % Math.max(1, l), y, 1, 1, '#bfe6ff');
        if (k > 19) A.rect(r + (y * 11) % Math.max(1, 160 - r), y, 2, 1, '#ffd040');
      }
      g.cr.forEach(c => { A.disc(c.x, c.y, c.r, '#1e1418'); A.disc(c.x, c.y - 1, c.r - 1, '#e07040'); A.disc(c.x, c.y, c.r - 2, '#3a2630'); });
      if (g.state === 'lose') A.boom(g.x + 4, 115); else if (A.flick(g)) A.draw(ROVER, g.x, 112);
    },
    top(g) {
      A.usePal('ui');
      A.rect(0, 0, 160, 10, 0);
      A.hearts(g.lives, g.maxL, 2, 2);
      A.txt('FRIO', 50, 3, HUD_FRIO); A.rect(68, 3, 30, 4, 1); A.rect(68, 3, Math.round(30 * g.cold / 100), 4, HUD_FRIO);
      A.txt('CALOR', 102, 3, HUD_CALOR); A.rect(124, 3, 30, 4, 1); A.rect(124, 3, Math.round(30 * g.hot / 100), 4, HUD_CALOR);
      A.rect(0, 141, Math.round(160 * Math.min(1, g.t / g.T)), 3, 2);
    },
  });
};

// ---------- VÊNUS: sonda-balão nas nuvens ----------
// brechas largas, nuvens lentas e raras, balão com caixa menor, raio avisa por 1,4 s
A.GAMES.venus = () => A.game({
  hud: 'MISSÃO 5 · SONDA-BALÃO', keys: 'SEGURE A · SOBE', lives: 5 + A.lifeBonus('refletor'), intro: 'SEGURE A PARA SUBIR',
  init(g) { g.y = 60; g.vy = 0; g.got = 0; g.need = 8; g.walls = []; g.orbs = []; g.wt = 2; g.bolt = null; g.bt = 7; },
  update(g, dt) {
    g.vy += (A.K.a ? -95 : 60) * dt; g.vy = A.clamp(g.vy, -55, 55); g.y += g.vy * dt;
    if (g.y < 14) { g.y = 14; g.vy = 0; }
    if (g.y > 122) { g.y = 122; g.vy = -45; g.hurt(); }
    const gap = Math.max(48, 58 - g.got);
    g.wt -= dt;
    if (g.wt <= 0) { g.wt = 2.8; const c = A.rnd(42, 100); g.walls.push({ x: 164, c, gap }); g.orbs.push({ x: 170, y: c }); }
    const me = { x: 40, y: g.y - 5, w: 8, h: 14 };
    g.walls.forEach(w => { w.x -= 34 * dt; if (A.hitbox(me, { x: w.x, y: 12, w: 14, h: w.c - w.gap / 2 - 12 }) || A.hitbox(me, { x: w.x, y: w.c + w.gap / 2, w: 14, h: 144 })) g.hurt(); });
    g.walls = g.walls.filter(w => w.x > -20);
    for (let i = g.orbs.length - 1; i >= 0; i--) {
      const o = g.orbs[i]; o.x -= 34 * dt;
      if (Math.abs(o.x - 44) < 10 && Math.abs(o.y - g.y) < 16) { g.orbs.splice(i, 1); g.got++; A.sfx('coin'); if (g.got >= g.need) g.win('DADOS COLETADOS!'); }
      else if (o.x < -10) g.orbs.splice(i, 1);
    }
    g.bt -= dt;
    if (!g.bolt && g.bt <= 0) g.bolt = { y: A.rnd(24, 118), t: 0 };
    if (g.bolt) {
      g.bolt.t += dt;
      if (g.bolt.t > 1.4 && g.bolt.t < 1.65 && Math.abs(g.bolt.y - g.y) < 6) g.hurt();
      if (g.bolt.t > 1.65) { g.bolt = null; g.bt = A.rnd(6, 9); }
    }
  },
  draw(g) {
    // céu amarelo-alaranjado, nuvens de ácido verde-amareladas com borda marrom, dados ciano, balão azul
    A.cls('#f0b048');
    for (let i = 0; i < 14; i++) A.rect((i * 41 - g.t * 25) % 180 + 160 * (((i * 41 - g.t * 25) % 180) < -20), 20 + (i * 17) % 110, 18, 3, '#fbe2a8');
    A.rect(0, 134, 160, 10, '#8a4416');
    g.walls.forEach(w => {
      A.rect(w.x, 12, 14, w.c - w.gap / 2 - 12, '#b4c03a'); A.rect(w.x, w.c + w.gap / 2, 14, 144, '#b4c03a');
      A.rect(w.x - 2, w.c - w.gap / 2 - 4, 18, 4, '#6a4a1a'); A.rect(w.x - 2, w.c + w.gap / 2, 18, 4, '#6a4a1a');
    });
    g.orbs.forEach(o => { A.disc(o.x, o.y, 3, '#0a4a5a'); A.disc(o.x, o.y, 2, '#5ff0ff'); });
    if (g.bolt) {
      if (g.bolt.t < 1.4) { if (Math.floor(g.bolt.t * 10) % 2) { A.rect(0, g.bolt.y - 6, 160, 1, '#d02020'); A.rect(0, g.bolt.y + 6, 160, 1, '#d02020'); A.txt('!', 150, g.bolt.y - 2, '#d02020'); } }
      else for (let x = 0; x < 160; x += 6) A.rect(x, g.bolt.y - 2 + ((x / 6) % 2) * 3, 6, 3, (x / 6) % 2 ? '#fff27a' : '#ffffff');
    }
    if (g.state === 'lose') A.boom(44, g.y);
    else if (A.flick(g)) { A.disc(44, g.y - 3, 7, '#1a1a3a'); A.disc(44, g.y - 3, 6, '#3a6ae0'); A.rect(41, g.y - 7, 2, 6, '#ff6a8a'); A.rect(43, g.y + 3, 1, 5, '#3a2a1a'); A.rect(45, g.y + 3, 1, 5, '#3a2a1a'); A.rect(41, g.y + 8, 7, 3, '#7a4a24'); }
  },
  top(g) { A.usePal('ui'); A.rect(0, 0, 160, 10, 0); A.hearts(g.lives, g.maxL, 2, 2); A.txt(`DADOS ${g.got}/${g.need}`, 100, 3, 2); },
});

// ---------- MARTE: jipe-robô pulando pedras ----------
A.GAMES.mars = () => {
  const GYM = 112;
  return A.game({
    // jipe mais lento, pedras menores e mais raras, caixa do jipe menor, gelo mais baixo e fácil de pegar
    hud: 'MISSÃO 6 · JIPE-ROBÔ', keys: 'A · PULAR', lives: 5 + A.lifeBonus('casco'), intro: 'A PARA PULAR',
    init(g) { g.h = 0; g.vy = 0; g.on = true; g.obs = []; g.ice = []; g.ot = 2.5; g.it = 1; g.got = 0; g.need = 8; g.sp = 48; g.dust = []; },
    update(g, dt) {
      g.sp = Math.min(70, 48 + g.t * 0.8);
      if (A.hit('a') && g.on) { g.vy = 150; g.on = false; A.sfx('blip'); }
      g.h += g.vy * dt; g.vy -= 380 * dt;
      if (g.h <= 0) { g.h = 0; g.vy = 0; g.on = true; }
      g.ot -= dt;
      if (g.ot <= 0) { g.ot = A.rnd(1.8, 2.6); g.obs.push(Math.random() < 0.3 ? { x: 164, w: 16, hole: true } : { x: 164, w: A.ri(8, 10), h: A.ri(5, 8) }); }
      g.it -= dt;
      if (g.it <= 0) { g.it = A.rnd(1.2, 1.8); g.ice.push({ x: 170, y: GYM - A.ri(6, 30) }); }
      const me = { x: 27, y: GYM - 5 - g.h, w: 4, h: 5 };
      g.obs.forEach(o => {
        o.x -= g.sp * dt;
        if (o.hit) return;
        if (o.hole ? (g.h < 1 && 27 > o.x + 3 && 31 < o.x + o.w - 3) : A.hitbox(me, { x: o.x + 2, y: GYM - o.h + 1, w: o.w - 4, h: o.h - 1 })) { o.hit = true; g.hurt(); }
      });
      g.obs = g.obs.filter(o => o.x > -20);
      for (let i = g.ice.length - 1; i >= 0; i--) {
        const c = g.ice[i]; c.x -= g.sp * dt;
        if (Math.abs(c.x - 29) < 9 && Math.abs(c.y - (GYM - 3 - g.h)) < 10) { g.ice.splice(i, 1); g.got++; A.sfx('coin'); if (g.got >= g.need) g.win('GELO COLETADO!'); }
        else if (c.x < -10) g.ice.splice(i, 1);
      }
      if (g.got >= 5) { for (let k = 0; k < 1; k++) g.dust.push({ x: 164, y: A.rnd(10, 140), v: A.rnd(90, 140) }); }
      g.dust.forEach(d => { d.x -= d.v * dt; }); g.dust = g.dust.filter(d => d.x > -4);
    },
    draw(g) {
      // céu caramelo-rosado, morros e chão ferrugem, pedras marrons, crateras escuras, gelo azul-claro, poeira laranja
      A.cls('#e6b08a');
      A.disc(130, 26, 4, '#fff2d8');
      const off = (g.t * g.sp * 0.3) % 40;
      for (let i = -1; i < 6; i++) A.disc(i * 40 - off, 100, 18, '#c8704a');
      A.rect(0, GYM, 160, 32, '#a33f1c');
      for (let i = 0; i < 12; i++) A.rect((i * 29 - g.t * g.sp) % 180 + (((i * 29 - g.t * g.sp) % 180) < 0 ? 180 : 0), GYM + 4 + (i % 4) * 6, 3, 1, '#6a2410');
      g.obs.forEach(o => { if (o.hole) { A.rect(o.x, GYM, o.w, 10, '#2a0e06'); A.rect(o.x, GYM, o.w, 1, '#e08a5a'); } else { A.rect(o.x, GYM - o.h, o.w, o.h, '#4a2c1c'); A.rect(o.x + 1, GYM - o.h + 1, o.w - 3, 2, '#9a7058'); } });
      g.ice.forEach(c => { A.rect(c.x - 1, c.y - 3, 3, 7, '#bfefff'); A.rect(c.x - 3, c.y - 1, 7, 3, '#bfefff'); A.rect(c.x, c.y, 1, 1, '#3a8ad0'); });
      g.dust.forEach(d => A.rect(d.x, d.y, 3, 1, '#d8641e'));
      if (g.state === 'lose') A.boom(29, GYM - 4); else if (A.flick(g)) A.draw(ROVER, 25, GYM - 6 - g.h);
    },
    top(g) { A.usePal('ui'); A.rect(0, 0, 160, 10, 0); A.hearts(g.lives, g.maxL, 2, 2); A.txt(`GELO ${g.got}/${g.need}`, 104, 3, 3); },
  });
};
