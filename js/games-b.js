'use strict';
// Minijogos: Asteroides (mineração), Júpiter (sequência das luas), Saturno (lua pastora dos anéis).

// ---------- ASTEROIDES: atirar, partir pedras e pegar cristais ----------
A.GAMES.asteroids = (o = {}) => A.game({
  hud: o.hud || 'MISSÃO 7 · MINERAÇÃO', keys: '◀ ▶ · A ATIRA', lives: 5 + A.lifeBonus('broca'), intro: 'A PARA ATIRAR',
  init(g) { g.x = 72; g.shots = []; g.rocks = []; g.gems = []; g.got = 0; g.need = o.need || 10; g.cool = 0; g.rt = 0.5; },
  update(g, dt) {
    const ship = A.SHIPS[A.shipLevel()];
    if (A.K.left) g.x -= 85 * dt;
    if (A.K.right) g.x += 85 * dt;
    g.x = A.clamp(g.x, 0, 144);
    g.cool -= dt;
    if (A.K.a && g.cool <= 0) { g.shots.push({ x: g.x + 7, y: 108 }); g.cool = 0.2; A.tone(1400, 0.03); }
    g.rt -= dt;
    // pedras lentas e espaçadas: criança de 10 a 13 anos vence na 1ª ou 2ª tentativa
    if (g.rt <= 0) { g.rt = Math.max(1, 1.7 - g.t * 0.01); g.rocks.push({ x: A.rnd(10, 150), y: -12, r: A.pick([10, 10, 6]), vx: A.rnd(-6, 6), vy: A.rnd(12, 22) }); }
    g.shots.forEach(s => { s.y -= 160 * dt; }); g.shots = g.shots.filter(s => s.y > -5);
    for (let i = g.rocks.length - 1; i >= 0; i--) {
      const r = g.rocks[i];
      r.x += r.vx * dt; r.y += r.vy * dt;
      if (r.x < r.r || r.x > 160 - r.r) r.vx *= -1;
      const hit = g.shots.findIndex(s => Math.abs(s.x - r.x) < r.r && Math.abs(s.y - r.y) < r.r);
      if (hit >= 0) {
        g.shots.splice(hit, 1); g.rocks.splice(i, 1); A.sfx('hit');
        if (r.r > 3) { const nr = r.r > 6 ? 6 : 3; g.rocks.push({ x: r.x, y: r.y, r: nr, vx: -12, vy: r.vy }, { x: r.x, y: r.y, r: nr, vx: 12, vy: r.vy }); }
        if (Math.random() < 0.8) g.gems.push({ x: r.x, y: r.y });
        continue;
      }
      if (r.y > 150) { g.rocks.splice(i, 1); continue; }
      // só o miolo da nave bate; depois do dano, 2 s sem levar outro
      if (Math.abs(r.x - (g.x + 8)) < r.r + 1 && Math.abs(r.y - 114) < r.r + 2) { g.rocks.splice(i, 1); if (g.hurt()) g.inv = 2; }
    }
    for (let i = g.gems.length - 1; i >= 0; i--) {
      const c = g.gems[i]; c.y += 26 * dt;
      if (Math.abs(c.x - (g.x + 8)) < 11 && Math.abs(c.y - 112) < 11) { g.gems.splice(i, 1); g.got++; A.sfx('coin'); if (g.got >= g.need) g.win('AMOSTRAS COLETADAS!'); }
      else if (c.y > 150) g.gems.splice(i, 1);
    }
    g.ship = ship;
  },
  draw(g) {
    A.usePal('espaco'); A.cls(0);
    for (let i = 0; i < 30; i++) A.rect((i * 53) % 160, (i * 37 + g.t * 25) % 144, 1, 1, i % 4 ? 1 : 3);
    // rochas marrom-acinzentadas, cristais ciano ou verdes, tiros vermelhos
    g.rocks.forEach(r => { A.disc(r.x, r.y, r.r, '#3b2f28'); A.disc(r.x, r.y, r.r - 1, '#7d6a5c'); A.rect(r.x - r.r / 3, r.y - r.r / 3, 2, 2, '#b8a493'); });
    g.gems.forEach(c => { const k = Math.floor(c.x) % 2 ? '#3fe6ff' : '#5cf07a'; A.rect(c.x - 1, c.y - 3, 3, 7, k); A.rect(c.x - 3, c.y - 1, 7, 3, k); A.rect(c.x, c.y, 1, 1, '#ffffff'); });
    g.shots.forEach(s => A.rect(s.x, s.y, 2, 5, '#ff3b30'));
    if (g.state === 'lose') A.boom(g.x + 8, 112);
    else if (A.flick(g)) { A.draw(A.FLAME[Math.floor(g.t * 10) % 2], g.x + 5, 118); A.draw(g.ship || A.SHIPS[0], g.x, 104); }
  },
  top(g) { A.usePal('ui'); A.rect(0, 0, 160, 10, 0); A.hearts(g.lives, g.maxL, 2, 2); A.txt(`CRISTAIS ${g.got}/${g.need}`, 88, 3, 2); },
});

// ---------- JÚPITER: repetir a sequência das luas ----------
// [nome, x, y, nota, cor apagada, cor acesa]
const MOONS = {
  up: ['IO', 80, 22, 523, '#b0701c', '#ffd84a'], right: ['EUROPA', 138, 72, 659, '#9a8f7c', '#fff8e6'],
  down: ['GANIMEDES', 80, 122, 784, '#7a6858', '#ecd6b8'], left: ['CALISTO', 22, 72, 392, '#4a4a54', '#d8d8e8'],
};
const DIRS4 = ['up', 'right', 'down', 'left'];
A.GAMES.jupiter = (o = {}) => {
  const rounds = o.rounds || [2, 3, 4, 5]; // sequências curtas: começa com 2 luas
  return A.game({
    hud: o.hud || 'MISSÃO 8 · LUAS DE GALILEU', keys: 'REPITA COM ▲▶▼◀', lives: 5 + A.lifeBonus('escudo-rad'), intro: 'OBSERVE A SEQUENCIA',
    init(g) { g.seq = []; g.r = 0; while (g.seq.length < rounds[0]) g.seq.push(A.pick(DIRS4)); g.phase = 'show'; g.i = 0; g.pt = -1.4; g.lit = null; g.litT = 0; },
    update(g, dt) {
      g.litT -= dt; if (g.litT <= 0) g.lit = null;
      if (g.phase === 'show') {
        g.pt += dt;
        if (g.pt >= 0.9) { // mostra devagar: cada lua acesa por 0,6 s
          g.pt = 0;
          if (g.i < g.seq.length) { g.lit = g.seq[g.i]; g.litT = 0.6; A.tone(MOONS[g.lit][3], 0.4); g.i++; }
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
      A.usePal('espaco'); A.cls(0);
      for (let i = 0; i < 25; i++) A.rect((i * 53) % 160, (i * 37) % 144, 1, 1, 1);
      A.usePal('jupiter'); // faixas bege e marrom
      for (let y = -26; y <= 26; y++) { const w = Math.floor(Math.sqrt(26 * 26 - y * y)); A.rect(80 - w, 72 + y, w * 2 + 1, 1, [2, 3, 1, 2, 3, 2][Math.floor((y + 26) / 9)]); }
      A.disc(88, 80, 4, '#c4432a'); // Grande Mancha Vermelha
      for (const d of DIRS4) {
        const [name, x, y, , dim, lit] = MOONS[d], on = g.lit === d;
        A.disc(x, y, on ? 9 : 7, on ? '#ffffff' : '#141420'); A.disc(x, y, on ? 8 : 6, on ? lit : dim);
        A.txt(name, Math.max(1, Math.min(159 - A.txtW(name), x - A.txtW(name) / 2)), y + (d === 'down' ? -18 : 11), on ? lit : '#8a90c8');
      }
    },
    top(g) {
      A.usePal('ui'); A.rect(0, 0, 160, 10, 0); A.hearts(g.lives, g.maxL, 2, 2);
      A.txt(`RODADA ${g.r + 1}/${rounds.length}`, 50, 3, 3);
      if (g.state === 'play') A.txt(g.phase === 'show' ? 'OLHE' : 'SUA VEZ', 124, 3, g.phase === 'show' ? 3 : 2);
    },
  });
};

// ---------- SATURNO: lua pastora que devolve o gelo ao anel ----------
// Jogo novo em 02/11/2026: a travessia dos anéis (estilo Frogger) foi achada impossível por uma criança.
// Agora a nave faz o papel de lua pastora: anda só para os lados e rebate de volta os pedaços de gelo
// que escapam do anel. Gelo lento, no máximo 2 caindo ao mesmo tempo e rede larga.
A.GAMES.saturn = () => {
  const RING = 44, NET = 112, HALF = 17; // fim do anel, altura da rede, meia largura da rede
  const radar = A.has('radar');
  return A.game({
    hud: 'MISSÃO 9 · ANÉIS', keys: '◀ ▶ MOVER', lives: 5 + A.lifeBonus('radar'), intro: 'DEVOLVA O GELO AO ANEL',
    init(g) { g.x = 72; g.ice = []; g.got = 0; g.need = 12; g.st = 1.2; g.fx = []; },
    update(g, dt) {
      if (A.K.left) g.x -= 90 * dt;
      if (A.K.right) g.x += 90 * dt;
      g.x = A.clamp(g.x, 0, 144);
      g.st -= dt;
      if (g.st <= 0 && g.ice.filter(c => c.vy > 0).length < 2) {
        g.st = Math.max(1.9, 2.8 - g.got * 0.08);
        g.ice.push({ x: A.rnd(16, 144), y: RING, vx: A.rnd(-6, 6), vy: 18 + g.got * 0.8, r: A.pick([4, 4, 5]) });
      }
      const mid = g.x + 8;
      for (let i = g.ice.length - 1; i >= 0; i--) {
        const c = g.ice[i];
        c.x += c.vx * dt; c.y += c.vy * dt;
        if (c.x < 4 || c.x > 156) { c.vx *= -1; c.x = A.clamp(c.x, 4, 156); }
        if (c.vy < 0) { // voltando para o anel
          if (c.y <= RING - 4) { g.ice.splice(i, 1); g.fx.push({ x: c.x, t: 0 }); }
          continue;
        }
        if (c.y >= NET - 2 && c.y <= NET + 6 && Math.abs(c.x - mid) <= HALF) {
          c.vy = -60; c.vx *= 0.4; g.got++; A.sfx('coin');
          if (g.got >= g.need) { g.win('ANEL ARRUMADO!'); return; }
          continue;
        }
        if (c.y > 140) { g.ice.splice(i, 1); g.hurt(); if (g.state === 'lose') g.msg = 'O GELO ESCAPOU'; }
      }
      g.fx.forEach(e => { e.t += dt; }); g.fx = g.fx.filter(e => e.t < 0.6);
    },
    draw(g) {
      A.usePal('espaco'); A.cls(0);
      for (let i = 0; i < 30; i++) A.rect((i * 53) % 160, 48 + (i * 37) % 96, 1, 1, i % 4 ? 1 : 3);
      // Saturno no alto, com faixas, e o anel atravessando a tela
      A.withPal('saturno', () => { for (let y = 8; y < 34; y++) { const w = Math.floor(Math.sqrt(Math.max(0, 80 * 80 - (y + 46) * (y + 46)))); A.rect(80 - w, y, w * 2, 1, [1, 2, 3, 2][Math.floor(y / 6) % 4]); } });
      A.rect(0, 32, 160, 5, '#ece0c0'); A.rect(0, 37, 160, 1, '#14100a'); A.rect(0, 38, 160, 6, '#b8a47c'); // anel A, Divisão de Cassini, anel B
      for (let i = 0; i < 24; i++) A.rect((i * 29 + g.t * (i % 2 ? 14 : 9)) % 160, 33 + (i * 5) % 10, 1, 1, '#ffffff');
      g.fx.forEach(e => { const r = 2 + e.t * 10; A.rect(e.x - r, RING - 4, 1, 1, '#ffffff'); A.rect(e.x + r, RING - 4, 1, 1, '#ffffff'); A.rect(e.x, RING - 4 - r / 2, 1, 1, '#8cc6ee'); });
      // radar de anéis: marca no chão onde cada pedaço vai chegar
      if (radar) g.ice.forEach(c => { if (c.vy > 0) { const px = A.clamp(c.x + c.vx * (NET - c.y) / c.vy, 4, 156); A.rect(px - 2, 136, 5, 1, '#3fc6d6'); A.rect(px, 134, 1, 1, '#3fc6d6'); } });
      g.ice.forEach(c => { A.rect(c.x - c.r / 2, c.y - c.r / 2, c.r, c.r, '#eef8ff'); A.rect(c.x - c.r / 2, c.y - c.r / 2, 1, 1, '#8cc6ee'); });
      if (g.state !== 'lose') { // o gelo que escapou não acerta a nave: ela não pisca
        const mid = g.x + 8, pulse = Math.floor(g.t * 6) % 2;
        for (let k = -HALF; k <= HALF; k += 2) A.rect(mid + k, NET + (Math.abs(k) > 12 ? 1 : 0), 1, 1, pulse ? '#3fc6d6' : '#8ef0ff'); // rede de gravidade
        A.draw(A.SHIPS[A.shipLevel()], g.x, 116);
      }
    },
    top(g) { A.usePal('ui'); A.rect(0, 0, 160, 8, 0); A.hearts(g.lives, g.maxL, 2, 1); A.txt(`GELO ${g.got}/${g.need}`, 104, 2, 3); },
  });
};
