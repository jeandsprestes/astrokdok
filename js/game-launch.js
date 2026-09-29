'use strict';
// Minijogo 1: subir pelas camadas da atmosfera desviando de obstáculos.
A.GAMES = A.GAMES || {};
const HEART = ['.22.22.', '2222222', '2222222', '.22222.', '..222..', '...2...'];
const HEARTS = [A.spr(HEART, { 2: 1 }), A.spr(HEART)];
A.hearts = (n, max, x, y) => { for (let i = 0; i < max; i++) A.draw(HEARTS[i < n ? 1 : 0], x + i * 9, y - 1); };

A.GAMES.launch = () => new Promise(done => {
  const ship = A.SHIPS[A.shipLevel()];
  const LAYERS = [
    { name: 'TROPOSFERA', bg: 3, fg: 0, t: 12, every: 0.95, kinds: ['bird', 'bird', 'plane', 'cloud'], km: [0, 12] },
    { name: 'ESTRATOSFERA', bg: 2, fg: 0, t: 12, every: 0.8, kinds: ['balloon', 'balloon', 'plane', 'cloud'], km: [12, 50] },
    { name: 'MESOSFERA', bg: 1, fg: 3, t: 12, every: 0.62, kinds: ['meteor'], km: [50, 80] },
    { name: 'TERMOSFERA', bg: 0, fg: 3, t: 14, every: 0.55, kinds: ['sat', 'junk', 'junk'], km: [80, 400] },
  ];
  const pl = { x: 72, y: 112 };
  const stars = A.stars(40);
  let lives = 3, inv = 0, li = 0, lt = 0, spawnT = 1.2, banner = 2.2, state = 'play', endT = 0, shake = 0, t = 0;
  const objs = [];

  const spawn = kind => {
    const side = Math.random() < 0.5 ? -1 : 1;
    let o;
    if (kind === 'bird') o = { img: A.OBJ.bird, x: side < 0 ? -8 : 160, y: A.rnd(0, 70), vx: -side * A.rnd(28, 45), vy: 26 };
    else if (kind === 'plane') o = { img: A.OBJ.plane, x: side < 0 ? -16 : 160, y: A.rnd(0, 50), vx: -side * A.rnd(55, 70), vy: 22, flip: side > 0 };
    else if (kind === 'cloud') o = { img: A.OBJ.cloud, x: A.rnd(-8, 150), y: -6, vx: 0, vy: 34, safe: true };
    else if (kind === 'balloon') o = { img: A.OBJ.balloon, x: A.rnd(4, 148), y: -12, vx: 0, vy: A.rnd(30, 42), sway: A.rnd(0, 6) };
    else if (kind === 'meteor') o = { img: A.OBJ.meteor, x: A.rnd(20, 170), y: -8, vx: -A.rnd(15, 35), vy: A.rnd(70, 95) };
    else if (kind === 'sat') o = { img: A.OBJ.sat, x: side < 0 ? -16 : 160, y: A.rnd(0, 40), vx: -side * A.rnd(20, 32), vy: 30 };
    else o = { img: A.pick(A.OBJ.junk), x: A.rnd(0, 156), y: -6, vx: A.rnd(-15, 15), vy: A.rnd(50, 80) };
    o.kind = kind;
    if (o.flip) o.img = A.flip(o.img);
    objs.push(o);
  };

  A.hud('MISSÃO 1 · LANÇAMENTO', '◀ ▶ DESVIAR');
  A.setScene({
    update(dt) {
      t += dt; inv -= dt; shake = Math.max(0, shake - dt); banner -= dt;
      if (state === 'play') {
        lt += dt;
        const L = LAYERS[li];
        if (lt > L.t) {
          li++; lt = 0;
          if (li >= LAYERS.length) { state = 'win'; li = LAYERS.length - 1; A.sfx('win'); objs.length = 0; }
          else { banner = 2.2; A.sfx('up'); }
        }
        if (A.K.left) pl.x -= 82 * dt;
        if (A.K.right) pl.x += 82 * dt;
        pl.x = A.clamp(pl.x, 0, 144);
        spawnT -= dt;
        if (state === 'play' && spawnT <= 0) { spawnT = LAYERS[li].every * A.rnd(0.7, 1.25); spawn(A.pick(LAYERS[li].kinds)); }
      } else {
        endT += dt;
        if (state === 'win') pl.y -= 60 * dt * endT;
        if (endT > 2.2) { A.setScene(null); done(state === 'win'); return; }
      }
      const me = { x: pl.x + 5, y: pl.y + 2, w: 6, h: 11 };
      for (let i = objs.length - 1; i >= 0; i--) {
        const o = objs[i];
        o.x += o.vx * dt; o.y += o.vy * dt;
        if (o.sway != null) o.x += Math.sin(t * 2 + o.sway) * 0.3;
        if (o.y > 150 || o.x < -30 || o.x > 190) { objs.splice(i, 1); continue; }
        if (state !== 'play' || o.safe || inv > 0) continue;
        const im = Array.isArray(o.img) ? o.img[0] : o.img;
        if (A.hitbox(me, { x: o.x + 1, y: o.y + 1, w: im.width - 2, h: im.height - 2 })) {
          lives--; inv = 1.3; shake = 0.3; A.sfx('hit'); objs.splice(i, 1);
          if (lives <= 0) { state = 'lose'; endT = 0; A.sfx('boom'); }
        }
      }
    },
    draw(ctx) {
      const L = LAYERS[li];
      ctx.save();
      if (shake > 0) ctx.translate(A.ri(-2, 2), A.ri(-2, 2));
      A.cls(L.bg);
      if (li >= 2) A.drawStars(stars, li === 2 ? 2 : 3, t * 30);
      else for (let i = 0; i < 12; i++) A.rect((i * 37) % 160, (i * 53 + t * 90) % 144, 1, 3, L.bg === 3 ? 2 : 1);
      objs.filter(o => o.safe).forEach(o => A.draw(o.img, o.x, o.y));
      objs.filter(o => !o.safe).forEach(o => {
        const img = Array.isArray(o.img) ? o.img[Math.floor(t * 6) % 2] : o.img;
        if (o.kind === 'meteor') for (let k = 1; k < 4; k++) A.rect(o.x + 4 - o.vx * 0.03 * k, o.y + 3 - o.vy * 0.03 * k, 2, 2, k < 2 ? 2 : 1);
        A.draw(img, o.x, o.y);
      });
      if (state !== 'lose' && (inv <= 0 || Math.floor(t * 12) % 2)) {
        A.draw(A.FLAME[Math.floor(t * 10) % 2], pl.x + 5, pl.y + 13);
        A.draw(ship, pl.x, pl.y);
      }
      if (state === 'lose') for (let k = 0; k < 8; k++) A.disc(pl.x + 8 + A.ri(-8, 8), pl.y + 8 + A.ri(-8, 8), A.ri(1, 4), A.ri(0, 2));
      ctx.restore();
      const km = Math.round(L.km[0] + (L.km[1] - L.km[0]) * Math.min(1, lt / L.t));
      A.rect(0, 0, 160, 9, 0);
      A.hearts(lives, 3, 3, 2);
      A.txt(`ALT ${state === 'win' ? 400 : km} KM`, 100, 2, 2);
      if (banner > 0 && state === 'play') { A.rect(0, 62, 160, 13, 0); A.txtC(L.name, 66, 2); }
      if (state === 'win') { A.rect(0, 58, 160, 20, 0); A.txtC('ORBITA ALCANCADA!', 61, 2); A.txtC('400 KM', 69, 3); }
      if (state === 'lose' && endT > 0.6) { A.rect(0, 62, 160, 13, 0); A.txtC('ESCUDOS ESGOTADOS', 66, 2); }
    },
  });
});
