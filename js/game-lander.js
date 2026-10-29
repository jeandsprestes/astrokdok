'use strict';
// Minijogo 2: pouso lunar com gravidade fraca, combustível limitado e 3 escudos (tentativas).
A.GAMES.lander = () => new Promise(done => {
  const turbo = A.has('turbo');
  const G = 9, THR = turbo ? 25 : 19, SIDE = 11, FMAX = turbo ? 130 : 100, SAFE_V = 20, SAFE_H = 18, MAXL = 3;
  const ship = A.SHIPS[A.shipLevel()];
  const stars = A.stars(45);
  const earth = A.withPal('terra_pl', () => A.bigEarth(7)); // Terra azul e verde no céu
  // terreno
  const pad = { x: A.ri(88, 118), w: 34 };
  const ground = new Array(160);
  const ph = [A.rnd(0, 6), A.rnd(0, 6), A.rnd(0, 6)];
  for (let x = 0; x < 160; x++) ground[x] = 116 + Math.sin(x / 13 + ph[0]) * 7 + Math.sin(x / 5 + ph[1]) * 2.5 + Math.sin(x / 29 + ph[2]) * 9;
  const craters = [[A.ri(20, 60), A.ri(5, 9)], [A.ri(60, 90), A.ri(4, 7)]];
  craters.forEach(([cx, r]) => { for (let x = cx - r; x <= cx + r; x++) if (x >= 0 && x < 160) ground[x] += Math.sqrt(r * r - (x - cx) * (x - cx)) * 0.7; });
  const py = Math.round(Math.min(...ground.slice(pad.x, pad.x + pad.w)) + 2);
  // a aproximação da plataforma fica sempre mais baixa que ela (sem morro no caminho)
  for (let x = pad.x - 34; x < pad.x + pad.w + 16; x++) if (x >= 0 && x < 160 && (x < pad.x || x >= pad.x + pad.w)) ground[x] = Math.max(ground[x], py + 3 + Math.sin(x / 3) * 1.5);
  for (let x = pad.x; x < pad.x + pad.w; x++) ground[x] = py;
  // solo lunar cinza: borda clara (luz do Sol), manchas escuras; plataforma da Astrokdok em faixas amarelo/preto
  const terrain = A.mk(160, 144, c => {
    for (let x = 0; x < 160; x++) {
      const g = Math.round(ground[x]);
      A.rect(x, g, 1, 144 - g, '#8e8e98', c); A.rect(x, g, 1, 1, '#dcdce4', c);
      for (let y = g + 3; y < 144; y += 5) if ((x * 7 + y * 3) % 11 === 0) A.rect(x, y, 2, 1, '#5e5e68', c);
    }
    A.rect(pad.x, py, pad.w, 3, '#f2c200', c);
    for (let i = 0; i < pad.w; i++) for (let j = 0; j < 3; j++) if ((i + j) % 6 < 2) A.rect(pad.x + i, py + j, 1, 1, '#0e0e0e', c);
    A.rect(pad.x, py + 3, pad.w, 1, '#0e0e0e', c);
  });
  const GO = '#5dff7a', BAD = '#ff3a3a'; // verde = pode, vermelho = perigo

  const s = { x: 18, y: 14, vx: 10, vy: 0 };
  let lives = MAXL, fuel = FMAX, state = 'play', endT = 0, t = 0, st = 0, burn = false, side = 0, msg = '';
  // nova tentativa: nave de volta ao começo, tanque cheio
  const spawn = () => { Object.assign(s, { x: 18, y: 14, vx: 10, vy: 0 }); fuel = FMAX; st = 0; msg = ''; state = 'play'; };
  A.dbg = { s, pad, py };

  A.hud('MISSÃO 2 · POUSO', 'A MOTOR · ◀ ▶');
  A.setScene({
    update(dt) {
      t += dt; st += dt;
      if (state === 'crash') { endT += dt; if (endT > 1.8) spawn(); return; } // perdeu um escudo: volta ao começo
      if (state !== 'play') { endT += dt; if (endT > 2.4) { A.setScene(null); done(state === 'win'); } return; }
      burn = A.K.a && fuel > 0;
      side = fuel > 0 ? (A.K.left ? -1 : A.K.right ? 1 : 0) : 0;
      s.vy += (G - (burn ? THR : 0)) * dt;
      s.vx = A.clamp(s.vx + side * SIDE * dt, -20, 20);
      if (burn) fuel -= 12 * dt;
      if (side) fuel -= 4 * dt;
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
          lives--; endT = 0; state = lives > 0 ? 'crash' : 'lose'; A.sfx('boom');
          msg = !onPad ? 'FORA DA PLATAFORMA' : s.vy >= SAFE_V ? 'RAPIDO DEMAIS!' : 'DE LADO DEMAIS!';
        }
        s.vx = 0; s.vy = 0;
      }
    },
    draw() {
      A.usePal('espaco'); // céu preto com estrelas
      A.cls(0);
      A.drawStars(stars, 3);
      A.draw(earth, 130, 16);
      A.draw(terrain, 0, 0);
      if (state === 'play' && Math.floor(t * 3) % 2) { A.rect(pad.x, py - 1, 2, 1, GO); A.rect(pad.x + pad.w - 2, py - 1, 2, 1, GO); }
      if (state === 'play' && st < 6 && Math.floor(t * 3) % 2) A.txt('POUSE AQUI', pad.x + pad.w / 2 - 19, py - 22, GO);
      if (state === 'play' && st < 6) A.txt('V', pad.x + pad.w / 2 - 1, py - 14, GO);
      if (state === 'lose' || state === 'crash') for (let k = 0; k < 10; k++) A.disc(s.x + 8 + A.ri(-9, 9), s.y + 8 + A.ri(-8, 6), A.ri(1, 4), A.pick(A.BOOM));
      else {
        if (burn) A.draw(A.FLAME[Math.floor(t * 12) % 2], s.x + 5, s.y + 13);
        if (side) A.rect(side > 0 ? s.x + 1 : s.x + 13, s.y + 8, 2, 2, '#dff4ff');
        A.draw(ship, s.x, s.y);
      }
      // painel
      A.usePal('ui');
      A.rect(0, 0, 160, 9, 0);
      A.txt('COMB', 3, 2, 3);
      // combustível: verde → amarelo → vermelho (pisca no fim)
      const fr = fuel / FMAX, fc = fr > 0.5 ? '#3ad65a' : fr > 0.25 ? '#f0b020' : Math.floor(t * 6) % 2 ? '#ff9a9a' : BAD;
      A.rect(21, 2, 42, 5, 1); A.rect(22, 3, Math.round(40 * fuel / FMAX), 3, fc);
      // velocidade: verde = ok, amarelo = avisa antes do limite, vermelho = perigo
      const v = Math.round(state === 'play' ? s.vy : 0), okv = v < SAFE_V, warn = v >= SAFE_V - 6, vc = okv ? (warn ? '#f0b020' : GO) : BAD;
      A.txt(`VEL ${Math.max(0, v)}`, 70, 2, vc);
      A.txt(warn ? 'FREIE!' : 'OK', 106, 2, okv ? vc : (Math.floor(t * 8) % 2 ? BAD : '#7a1414'));
      A.hearts(lives, MAXL, 132, 2);
      if (fuel <= 0 && state === 'play') A.txtC('SEM COMBUSTIVEL', 14, BAD);
      if (msg) { A.rect(0, 60, 160, 13, 0); A.txtC(msg, 64, 2); }
      if (state === 'crash' && endT > 0.6) { A.rect(0, 74, 160, 13, 0); A.txtC('TENTE DE NOVO!', 78, 2); }
    },
  });
});
