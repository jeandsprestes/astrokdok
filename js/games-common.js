'use strict';
// Base comum dos minijogos: vidas, vitória/derrota, tremida, faixas de aviso.
// o = { hud, keys, lives, intro, init(g), update(g, dt), draw(g, ctx), top(g), onEnd(g, dt) }
A.banner = (s, y = 64, p = 2) => { A.rect(0, y - 4, 160, 13, 0); A.txtC(s, y, p); };
A.lifeBonus = id => A.has(id) ? 1 : 0;
A.flick = g => g.inv <= 0 || Math.floor(g.t * 12) % 2;
A.boom = (x, y) => { for (let k = 0; k < 8; k++) A.disc(x + A.ri(-8, 8), y + A.ri(-8, 8), A.ri(1, 4), A.ri(0, 2)); };

A.game = o => new Promise(done => {
  const g = { t: 0, state: 'play', endT: 0, shake: 0, inv: 0, lives: o.lives || 3, msg: '' };
  g.maxL = g.lives;
  g.win = m => { if (g.state !== 'play') return; g.state = 'win'; g.endT = 0; g.msg = m || 'MISSAO CUMPRIDA!'; A.sfx('win'); };
  g.lose = m => { if (g.state !== 'play') return; g.state = 'lose'; g.endT = 0; g.msg = m || 'ESCUDOS ESGOTADOS'; A.sfx('boom'); };
  g.hurt = () => {
    if (g.inv > 0 || g.state !== 'play') return false;
    if (A.GOD) return false;
    g.lives--; g.inv = 1.3; g.shake = 0.3; A.sfx('hit');
    if (g.lives <= 0) g.lose();
    return true;
  };
  A.hud(o.hud, o.keys || '');
  if (o.init) o.init(g);
  A.setScene({
    update(dt) {
      g.t += dt; g.inv -= dt; g.shake = Math.max(0, g.shake - dt);
      if (g.state !== 'play') {
        g.endT += dt;
        if (o.onEnd) o.onEnd(g, dt);
        if (g.endT > 2.3) { A.setScene(null); done(g.state === 'win'); }
        return;
      }
      if (A.GOD && g.t > 4) { g.win('TESTE'); return; }
      o.update(g, dt);
    },
    draw(ctx) {
      ctx.save();
      if (g.shake > 0) ctx.translate(A.ri(-2, 2), A.ri(-2, 2));
      o.draw(g, ctx);
      ctx.restore();
      if (o.top) o.top(g);
      if (g.state === 'play' && o.intro && g.t < 2.6) A.banner(o.intro);
      if (g.state !== 'play' && g.endT > 0.4) A.banner(g.msg);
    },
  });
});
