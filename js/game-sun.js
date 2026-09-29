'use strict';
// Minijogo 3: coletar vento solar desviando de explosões (com escudo de espelho).
A.GAMES.sun = () => new Promise(done => {
  const MAXL = A.has('traje') ? 4 : 3, NEED = 25;
  const ship = A.SHIPS[A.shipLevel()];
  const pl = { x: 72, y: 114 };
  let lives = MAXL, got = 0, inv = 0, t = 0, state = 'play', endT = 0, shake = 0;
  let shield = 0, cool = 0, partT = 0.5, flareT = 2, cmeT = 9;
  const parts = [], flares = [];
  const SUN_Y = 26;

  A.hud('MISSÃO 3 · VENTO SOLAR', '◀ ▶ · A ESCUDO');
  A.setScene({
    update(dt) {
      t += dt; inv -= dt; shake = Math.max(0, shake - dt);
      if (state !== 'play') { endT += dt; if (state === 'win') pl.y -= 50 * dt; if (endT > 2.4) { A.setScene(null); done(state === 'win'); } return; }
      if (A.K.left) pl.x -= 88 * dt;
      if (A.K.right) pl.x += 88 * dt;
      pl.x = A.clamp(pl.x, 0, 144);
      shield -= dt; cool -= dt;
      if (A.hit('a') && cool <= 0) { shield = 0.9; cool = 2.6; A.sfx('coin'); }
      const hard = got / NEED;
      // partículas
      partT -= dt;
      if (partT <= 0) { partT = A.rnd(0.25, 0.45); parts.push({ x: A.rnd(4, 152), y: SUN_Y, vy: A.rnd(38, 58) }); }
      // explosões em coluna
      flareT -= dt;
      if (flareT <= 0) {
        flareT = A.rnd(1.9, 2.4) - hard * 0.9;
        const w = A.ri(18, 26), aim = Math.random() < 0.5 ? pl.x + 8 - w / 2 : A.rnd(0, 160 - w);
        flares.push({ x: A.clamp(aim, 0, 160 - w), w, warn: 0.95 - hard * 0.2, fire: 0.45 });
      }
      // onda de ejeção de massa: faixa larga com uma brecha
      if (got >= 8) {
        cmeT -= dt;
        if (cmeT <= 0) { cmeT = A.rnd(7, 9) - hard * 2; const gx = A.ri(8, 116); flares.push({ x: 0, w: gx, warn: 1.3, fire: 0.5, cme: true }); flares.push({ x: gx + 36, w: 160 - gx - 36, warn: 1.3, fire: 0.5, cme: true }); }
      }
      const me = { x: pl.x + 4, y: pl.y + 2, w: 8, h: 11 };
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i]; p.y += p.vy * dt;
        if (p.y > 144) { parts.splice(i, 1); continue; }
        if (A.hitbox(me, { x: p.x - 2, y: p.y - 2, w: 5, h: 5 })) { parts.splice(i, 1); got++; A.sfx('coin'); if (got >= NEED) { state = 'win'; A.sfx('win'); flares.length = 0; return; } }
      }
      for (let i = flares.length - 1; i >= 0; i--) {
        const f = flares[i];
        if (f.warn > 0) { f.warn -= dt; if (Math.floor(f.warn * 8) % 2 === 0 && Math.random() < 0.15) A.sfx('warn'); continue; }
        f.fire -= dt;
        if (f.fire <= 0) { flares.splice(i, 1); continue; }
        if (inv <= 0 && A.hitbox(me, { x: f.x, y: SUN_Y, w: f.w, h: 144 })) {
          if (shield > 0) { inv = 0.3; A.sfx('ok'); }
          else {
            lives--; inv = 1.3; shake = 0.35; A.sfx('hit');
            if (lives <= 0) { state = 'lose'; endT = 0; A.sfx('boom'); }
          }
        }
      }
    },
    draw(ctx) {
      ctx.save();
      if (shake > 0) ctx.translate(A.ri(-2, 2), A.ri(-2, 2));
      A.cls(0);
      for (let i = 0; i < 30; i++) A.rect((i * 53) % 160, (i * 71 + t * 20) % 144, 1, 1, 1);
      // superfície do Sol
      for (let x = 0; x < 160; x += 2) {
        const h = SUN_Y + Math.sin(x / 9 + t * 2) * 2 + Math.sin(x / 4 - t * 3);
        A.rect(x, 0, 2, h, 2); A.rect(x, h - 1, 2, 2, 1);
      }
      for (let i = 0; i < 18; i++) A.rect((i * 29 + Math.floor(t * 3) * 7) % 160, (i * 13) % 20 + 2, 2, 1, 3);
      // explosões
      flares.forEach(f => {
        if (f.warn > 0) {
          if (Math.floor(f.warn * 10) % 2) { A.rect(f.x, SUN_Y, 1, 118, 2); A.rect(f.x + f.w - 1, SUN_Y, 1, 118, 2); A.txt('!', f.x + f.w / 2 - 1, SUN_Y + 6, 2); }
        } else {
          A.rect(f.x, SUN_Y - 2, f.w, 146, 2);
          A.rect(f.x + 3, SUN_Y - 2, f.w - 6, 146, 3);
          for (let k = 0; k < 6; k++) A.rect(f.x + A.ri(0, f.w - 2), A.ri(SUN_Y, 140), 2, 3, 1);
        }
      });
      parts.forEach(p => { A.rect(p.x - 1, p.y - 1, 3, 3, 2); A.rect(p.x, p.y, 1, 1, 3); });
      if (state === 'lose') for (let k = 0; k < 10; k++) A.disc(pl.x + 8 + A.ri(-9, 9), pl.y + 8 + A.ri(-8, 8), A.ri(1, 4), A.ri(0, 2));
      else if (inv <= 0 || Math.floor(t * 12) % 2) {
        A.draw(A.FLAME[Math.floor(t * 10) % 2], pl.x + 5, pl.y + 13);
        A.draw(ship, pl.x, pl.y);
        if (shield > 0) { A.rect(pl.x - 3, pl.y - 4, 22, 2, 3); A.rect(pl.x - 3, pl.y - 4, 2, 8, 3); A.rect(pl.x + 17, pl.y - 4, 2, 8, 3); }
      }
      ctx.restore();
      A.rect(0, 134, 160, 10, 0);
      A.hearts(lives, MAXL, 3, 136);
      A.txt(`AMOSTRAS ${got}/${NEED}`, 44, 136, 2);
      A.txt(cool <= 0 ? 'ESC OK' : 'ESC ..', 132, 136, cool <= 0 ? 3 : 1);
      if (state === 'play' && t < 3) { A.rect(0, 64, 160, 13, 0); A.txtC('COLETE AS PARTICULAS', 68, 2); }
      if (state === 'win') { A.rect(0, 60, 160, 13, 0); A.txtC('COLETA COMPLETA!', 64, 2); }
      if (state === 'lose' && endT > 0.6) { A.rect(0, 60, 160, 13, 0); A.txtC('ESCUDOS ESGOTADOS', 64, 2); }
    },
  });
});
