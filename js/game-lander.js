'use strict';
// Minijogo 2: pouso lunar com gravidade fraca e combustível limitado.
A.GAMES.lander = () => new Promise(done => {
  const turbo = A.has('turbo');
  const G = 9, THR = turbo ? 25 : 19, SIDE = 11, FMAX = turbo ? 100 : 70, SAFE_V = 15, SAFE_H = 14;
  const ship = A.SHIPS[A.shipLevel()];
  const stars = A.stars(45);
  const earth = A.bigEarth(7);
  // terreno
  const pad = { x: A.ri(96, 128), w: 24 };
  const ground = new Array(160);
  const ph = [A.rnd(0, 6), A.rnd(0, 6), A.rnd(0, 6)];
  for (let x = 0; x < 160; x++) ground[x] = 116 + Math.sin(x / 13 + ph[0]) * 7 + Math.sin(x / 5 + ph[1]) * 2.5 + Math.sin(x / 29 + ph[2]) * 9;
  const craters = [[A.ri(20, 60), A.ri(5, 9)], [A.ri(60, 90), A.ri(4, 7)]];
  craters.forEach(([cx, r]) => { for (let x = cx - r; x <= cx + r; x++) if (x >= 0 && x < 160) ground[x] += Math.sqrt(r * r - (x - cx) * (x - cx)) * 0.7; });
  const py = Math.round(Math.min(...ground.slice(pad.x, pad.x + pad.w)) + 2);
  // a aproximação da plataforma fica sempre mais baixa que ela (sem morro no caminho)
  for (let x = pad.x - 34; x < pad.x + pad.w + 16; x++) if (x >= 0 && x < 160 && (x < pad.x || x >= pad.x + pad.w)) ground[x] = Math.max(ground[x], py + 3 + Math.sin(x / 3) * 1.5);
  for (let x = pad.x; x < pad.x + pad.w; x++) ground[x] = py;
  const terrain = A.mk(160, 144, c => {
    for (let x = 0; x < 160; x++) {
      const g = Math.round(ground[x]);
      A.rect(x, g, 1, 144 - g, 3, c); A.rect(x, g, 1, 1, 1, c);
      for (let y = g + 3; y < 144; y += 5) if ((x * 7 + y * 3) % 11 === 0) A.rect(x, y, 2, 1, 2, c);
    }
    A.rect(pad.x, py, pad.w, 3, 2, c); A.rect(pad.x, py + 3, pad.w, 1, 0, c);
  });

  const s = { x: 18, y: 14, vx: 10, vy: 0 };
  let fuel = FMAX, state = 'play', endT = 0, t = 0, burn = false, side = 0, msg = '';
  A.dbg = { s, pad, py };

  A.hud('MISSÃO 2 · POUSO', 'A MOTOR · ◀ ▶');
  A.setScene({
    update(dt) {
      t += dt;
      if (state !== 'play') { endT += dt; if (endT > 2.4) { A.setScene(null); done(state === 'win'); } return; }
      burn = A.K.a && fuel > 0;
      side = fuel > 0 ? (A.K.left ? -1 : A.K.right ? 1 : 0) : 0;
      s.vy += (G - (burn ? THR : 0)) * dt;
      s.vx = A.clamp(s.vx + side * SIDE * dt, -20, 20);
      if (burn) fuel -= 13 * dt;
      if (side) fuel -= 5 * dt;
      fuel = Math.max(0, fuel);
      if ((burn || side) && Math.random() < 0.3) A.sfx('thrust');
      s.x += s.vx * dt; s.y += s.vy * dt;
      if (s.x < 0) { s.x = 0; s.vx = 0; }
      if (s.x > 144) { s.x = 144; s.vx = 0; }
      if (s.y < 0) { s.y = 0; s.vy = Math.max(0, s.vy); }
      let gy = 999;
      for (let x = Math.floor(s.x) + 3; x <= Math.floor(s.x) + 12; x++) gy = Math.min(gy, ground[A.clamp(x, 0, 159)]);
      if (s.y + 12 >= gy) {
        s.y = gy - 12;
        const onPad = s.x + 3 >= pad.x && s.x + 12 <= pad.x + pad.w;
        if (onPad && s.vy < SAFE_V && Math.abs(s.vx) < SAFE_H) { state = 'win'; A.sfx('win'); msg = 'POUSO PERFEITO!'; }
        else {
          state = 'lose'; A.sfx('boom');
          msg = !onPad ? 'FORA DA PLATAFORMA' : s.vy >= SAFE_V ? 'RAPIDO DEMAIS!' : 'DE LADO DEMAIS!';
        }
        s.vx = 0; s.vy = 0;
      }
    },
    draw() {
      A.cls(0);
      A.drawStars(stars, 3);
      A.draw(earth, 130, 16);
      A.draw(terrain, 0, 0);
      if (state === 'play' && Math.floor(t * 3) % 2) { A.rect(pad.x, py - 1, 2, 1, 2); A.rect(pad.x + pad.w - 2, py - 1, 2, 1, 2); }
      if (state === 'play' && t < 5 && Math.floor(t * 3) % 2) A.txt('POUSE AQUI', pad.x + pad.w / 2 - 19, py - 22, 2);
      if (state === 'play' && t < 5) A.txt('V', pad.x + pad.w / 2 - 1, py - 14, 2);
      if (state === 'lose') for (let k = 0; k < 10; k++) A.disc(s.x + 8 + A.ri(-9, 9), s.y + 8 + A.ri(-8, 6), A.ri(1, 4), A.ri(0, 2));
      else {
        if (burn) A.draw(A.FLAME[Math.floor(t * 12) % 2], s.x + 5, s.y + 13);
        if (side) A.rect(side > 0 ? s.x + 1 : s.x + 13, s.y + 8, 2, 2, 3);
        A.draw(ship, s.x, s.y);
      }
      // painel
      A.rect(0, 0, 160, 9, 0);
      A.txt('COMB', 3, 2, 3);
      A.rect(21, 2, 42, 5, 1); A.rect(22, 3, Math.round(40 * fuel / FMAX), 3, fuel < FMAX * 0.25 && Math.floor(t * 6) % 2 ? 3 : 2);
      const v = Math.round(state === 'play' ? s.vy : 0), okv = v < SAFE_V;
      A.txt(`VEL ${Math.max(0, v)}`, 70, 2, okv ? 2 : 3);
      A.txt(okv ? 'OK' : 'FREIE!', 106, 2, okv ? 2 : (Math.floor(t * 8) % 2 ? 3 : 1));
      if (fuel <= 0 && state === 'play') A.txtC('SEM COMBUSTIVEL', 14, 3);
      if (msg) { A.rect(0, 60, 160, 13, 0); A.txtC(msg, 64, 2); }
    },
  });
});
