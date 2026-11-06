// viagem.js: o céu, a subida, o painel de bordo (HUD), o relógio da luz e a régua das paradas (LOOMB, 05/11/2026).
// Vem do conceito "A viagem": rolar a página é subir. O céu é um canvas fixo, em pixel e em escala inteira,
// desenhado com a arte do próprio jogo (js/engine.js, palette.js, sprites.js e bodies.js). Nada anda sozinho:
// a cena só muda quando a pessoa rola. Com "reduzir movimento", cada camada vira um quadro parado.
'use strict';
(() => {
  const AK = window.AK = window.AK || {};
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const cv = $('#ceu');
  if (!cv || !cv.getContext) return;
  const cx = cv.getContext('2d');
  const calmo = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // =====================================================================
  // O MOTOR DE PIXEL (o mesmo jeito de desenhar do jogo)
  // =====================================================================
  const PALS = { brand: ['#0e0e0e', '#6b5200', '#f2c200', '#fff4c0'], mercurio: ['#1a1a1a', '#5e5a57', '#9b958f', '#d6d1cc'] };
  let PAL = PALS.brand;
  const col = p => typeof p === 'string' ? p : PAL[p];
  const withPal = (p, fn) => { const o = PAL; PAL = Array.isArray(p) ? p : (PALS[p] || PALS.brand); try { return fn(); } finally { PAL = o; } };
  const mk = (w, h, fn) => { const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d'); x.imageSmoothingEnabled = false; if (fn) fn(x, c); return c; };
  const spr = (rows, map) => mk(rows[0].length, rows.length, x => rows.forEach((r, j) => { for (let i = 0; i < r.length; i++) { let ch = r[i]; if (map && ch in map) ch = map[ch]; if (ch === '.' || ch === ' ') continue; x.fillStyle = typeof ch === 'string' && ch.length > 1 ? ch : PAL[+ch]; x.fillRect(i, j, 1, 1); } }));
  const flip = c => mk(c.width, c.height, x => { x.translate(c.width, 0); x.scale(-1, 1); x.drawImage(c, 0, 0); });
  const rect = (X, Y, w, h, p, x) => { x.fillStyle = col(p); x.fillRect(Math.round(X), Math.round(Y), w, h); };
  const disc = (cx0, cy, r, p, x) => { x.fillStyle = col(p); for (let y = -r; y <= r; y++) { const w = Math.floor(Math.sqrt(r * r - y * y + r * 0.8)); x.fillRect(Math.round(cx0 - w), Math.round(cy + y), w * 2 + 1, 1); } };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const suave = t => t * t * (3 - 2 * t);
  function semente(s) { return () => { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  const faixas = (x, cx0, cy, r, cols, step) => { for (let y = -r; y <= r; y++) { const w = Math.floor(Math.sqrt(r * r - y * y + r * 0.8)); rect(cx0 - w, cy + y, w * 2 + 1, 1, cols[Math.floor((y + r) / step) % cols.length], x); } };
  const crateras = (x, cx0, cy, r, n, c) => { for (let i = 0; i < n; i++) { const a = i * 2.4, d = (i * 0.37 % 1) * r * 0.75; disc(cx0 + Math.cos(a) * d, cy + Math.sin(a) * d, 1 + (i * 7) % Math.max(2, r / 6), c, x); } };
  const anel = (x, cx0, cy, rx, ry, c, frente) => { for (let a = 0; a < 6.283; a += 0.01) { const s = Math.sin(a); if (frente === undefined || (s > 0) === frente) rect(cx0 + Math.cos(a) * rx, cy + s * ry, 1, 1, c, x); } };

  // a fonte 3x5 do jogo (a faixa com o nome da camada)
  const FONT = { A: [2, 5, 7, 5, 5], B: [6, 5, 6, 5, 6], C: [3, 4, 4, 4, 3], D: [6, 5, 5, 5, 6], E: [7, 4, 6, 4, 7], F: [7, 4, 6, 4, 4], G: [3, 4, 5, 5, 3], H: [5, 5, 7, 5, 5], I: [7, 2, 2, 2, 7], J: [1, 1, 1, 5, 2], K: [5, 5, 6, 5, 5], L: [4, 4, 4, 4, 7], M: [5, 7, 7, 5, 5], N: [6, 5, 5, 5, 5], O: [2, 5, 5, 5, 2], P: [6, 5, 6, 4, 4], Q: [2, 5, 5, 6, 3], R: [6, 5, 6, 5, 5], S: [3, 4, 2, 1, 6], T: [7, 2, 2, 2, 2], U: [5, 5, 5, 5, 7], V: [5, 5, 5, 5, 2], W: [5, 5, 7, 7, 5], X: [5, 5, 2, 5, 5], Y: [5, 5, 2, 2, 2], Z: [7, 1, 2, 4, 7], ' ': [0, 0, 0, 0, 0] };
  const norm = s => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase();
  const txt = (s, X, Y, p, sc, x) => { x.fillStyle = col(p); let c0 = Math.round(X); for (const ch of norm(s)) { const g = FONT[ch]; if (g) for (let r = 0; r < 5; r++) for (let c = 0; c < 3; c++) if (g[r] & (4 >> c)) x.fillRect(c0 + c * sc, Math.round(Y) + r * sc, sc, sc); c0 += 4 * sc; } };
  const txtW = (s, sc) => (norm(s).length * 4 - 1) * sc;

  // ---------- as naves (sprites.js do jogo) ----------
  const espelha = h => h + h.split('').reverse().join('');
  const SH = { 0: '#141b30', 1: '#3d8bf0', 3: '#e6ebf2', r: '#e8452c', a: '#f08a2c', n: '#8a919e', s: '#d5dbe5', y: '#f2c200' };
  const TANK = { 1: '#a8e6ff', 3: '#2a7de1', w: '#7cc0ff', t: '#c3c9d4', f: '#e8452c' };
  const nave = (rows, extra) => spr(rows, Object.assign({}, SH, extra));
  const metade = (rows, extra) => nave(rows.map(espelha), extra);
  const NAVES = [
    nave(['.......00.......', '......0w30......', '.....0w3330.....', '.....0w1130.....', '.....0w1130.....', '.....0w3330.....', '.....0yyyy0.....', '.....0w3330.....', '....00w33300....', '...0f0w3330.f0..', '...0f0wtt30f.0..', '...0000330000...', '......0nn0......', '.......nn.......', '................', '................'], TANK),
    nave(['.......00.......', '......0rr0......', '.....0w3330.....', '.....0w1130.....', '.....0w1130.....', '.....0w3330.....', '.....0yyyy0.....', '....03w333330...', '...033w3333330..', '..0r03w333330r0.', '..0ss0w33330ss0.', '..0000033000000.', '....0nn0.0nn0...', '.....nn...nn....', '................', '................'], TANK),
    nave(['.......00.......', '......0rr0......', '.....033330.....', '.00..031130..00.', '.0g0.031130.0g0.', '.0gg0033330.0gg0', '.0ggg0aaaa00ggg0', '.0ggg0333330ggg0', '.0g00033333000g0', '.00.033333330.00', '...0r3333333r00.', '...0000330000...', '....0nn0.0nn0...', '.....nn...nn....', '................', '................'], { g: '#f0b832' }),
    metade(['.......0', '......0r', '.....0rr', '.....031', '....0031', '...0a033', '..0a0333', '.0a00333', '.0a00yyy', '.0a00333', '..000333', '....0333', '....0000', '.....0ii', '......0i', '........'], { i: '#5fd6ff' }),
    metade(['00000000', '0vvvvvvv', '0vlllllv', '0vvvvvvv', '00000000', '.t......', '..t.....', '...t...0', '....t.0r', '.....0rr', '.....031', '.....033', '....0033', '....0000', '......0n', '........'], { v: '#cfd8e6', l: '#ff6a3a', t: '#9aa3b5' }),
    metade(['.......0', '......0r', '.....033', '.....031', '..ccc031', '.c...033', 'c....033', 'c...0ccc', 'c...0333', '.c..0333', '..ccc333', '....0333', '...00000', '....0.nn', '......nn', '........'], { c: '#3fe6ff' }),
  ];
  const NOMES_NAVES = (AK.dados && Array.isArray(AK.dados.naves) && AK.dados.naves.length === 6) ? AK.dados.naves : ['CALHAMBEQUE-1', 'CALHAMBEQUE TURBO', 'ESTRELA DO CAPÃO', 'NAVE IÔNICA', 'VELA-LASER', 'DOBRA-1'];
  const FL = { 2: '#ff7a1a', 3: '#ffe45a' };
  const CHAMA = [spr(['.2..2.', '232232', '.2..2.'], FL), spr(['..22..', '.2332.', '..22..'], FL)];

  // ---------- o que passa na subida (sprites.js do jogo) ----------
  const JUNK = f => ({ 0: '#6b7080', 1: f });
  const OBJ = {
    passaro: [spr(['0.....0.', '00...00.', '.00000..', '..000...'], { 0: '#d63a2f' }), spr(['........', '.00000..', '00.0.00.', '0.....0.'], { 0: '#d63a2f' })],
    aviao: spr(['......00........', '.....0rr0.......', '00000rrrr00000..', '0333333333333330', '00000rrrr00000..', '.....0rr0.......', '......00........'], { 0: '#1b2033', 3: '#f4f6fa', r: '#e04848' }),
    balao: spr(['..0000..', '.0ryyr0.', '0rryyrr0', '0rryyrr0', '0rryyrr0', '.0ryyr0.', '..0rr0..', '...00...', '...00...', '..m..m..', '..mmmm..'], { 0: '#2a1a1a', r: '#e8402a', y: '#ffc83a', m: '#8a5a2c' }),
    meteoro: spr(['.....r..', '...rrr..', '.0aaaa..', '0000y00.', '00000...', '0010....', '.00.....', '........'], { 0: '#8f5a3a', 1: '#4a2a1a', r: '#e0402a', a: '#ff8a1a', y: '#ffe45a' }),
    satelite: spr(['0000...0...0000.', '0220..000..0220.', '0220.01110.0220.', '0220001310000220', '0220.01110.0220.', '0220..000..0220.', '0000...0...0000.'], { 0: '#8a919e', 1: '#e0b030', 2: '#3f7fff', 3: '#ff4a4a' }),
    lixo: [spr(['.00.', '0110', '0100', '.00.'], JUNK('#c8ccd6')), spr(['000..', '01100', '00110', '..000'], JUNK('#e0662a')), spr(['0..', '010', '.00'], JUNK('#d84040'))],
    nuvem: spr(['.....3333.......', '...33333333.....', '.3333333333333..', '3333333333333333', '.22222222222222.'], { 2: '#d6e6f7', 3: '#ffffff' }),
    nuvemAm: spr(['.....3333.......', '...33333333.....', '.3333333333333..', '3333333333333333', '.22222222222222.'], { 2: '#c77a8e', 3: '#f6b8a8' }),
    nuvemFina: spr(['....33333333333.....', '.333333333333333333.', '22222222222222222222'], { 2: '#b8d4f2', 3: '#eef6ff' }),
    estacao: spr(['.33..33...33..33.', '.33..33...33..33.', '.33..33.1.33..33.', '00000000111000000', '.33..33.1.33..33.', '.33..33...33..33.', '.33..33...33..33.'], { 0: '#8a919e', 1: '#e6ebf2', 3: '#d9a540' }),
  };
  const OBJ_FLIP = { passaro: OBJ.passaro.map(flip), aviao: flip(OBJ.aviao) };
  const KDOK = spr(['........o.......', '.......oyo......', '........o.......', '..oooooooooooo..', '..owwwwwwwwwwo..', '..o1oooooyyy1o..', '..o1osssoyry1o..', '..o1osdsoyyy1o..', '..o1ossso1111o..', '..o1ooooo1gg1o..', '..oqqqqqqqqqqo..', '..oooooooooooo..', '....o1o..o1o....', '....o1o..o1o....', '...oo1oo.oo1oo..', '...ooooo.ooooo..'],
    { o: '#1c1e26', w: '#d3d8e0', 1: '#a3aab5', q: '#6f7684', y: '#f2c200', s: '#8ff0ff', d: '#0b3a52', r: '#e04848', g: '#5ad35a' });

  // =====================================================================
  // O CÉU (o canvas fixo). Rolar a página = subir.
  // =====================================================================
  let S = 3, W = 0, H = 0, imagem, px32, cena = null;
  const T_FIM = 900;                                   // o fim da trilha da subida (pixels do desenho)
  const T_ORBITA = 780;
  const CAMADAS = [[0, 0], [150, 6], [300, 12], [460, 50], [620, 80], [T_ORBITA, 400]]; // trilha -> km (as alturas da aula da missão 1)
  const NOMES_CAMADAS = [[150, 'TROPOSFERA'], [300, 'ESTRATOSFERA'], [460, 'MESOSFERA'], [620, 'TERMOSFERA']];
  const altDe = t => { if (t <= 0) return 0; for (let i = 1; i < CAMADAS.length; i++) if (t <= CAMADAS[i][0]) { const [t0, a0] = CAMADAS[i - 1], [t1, a1] = CAMADAS[i]; return a0 + (a1 - a0) * (t - t0) / (t1 - t0); } return 400 + (t - T_ORBITA) * 3; };
  const hex = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  const empac = h => { const [r, g, b] = hex(h); return (255 << 24 | b << 16 | g << 8 | r) >>> 0; };
  const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map(v => (v + 0.5) / 16);
  // o amanhecer, do brilho junto do horizonte até o topo escuro
  const AMANHECER = ['#fff3b8', '#ffd27e', '#f9ab5c', '#ec7e5c', '#cf5c74', '#9c4a86', '#6a3c88', '#45337c', '#2d2c6c', '#1f2558', '#161c44', '#0f1434', '#0a0d24', '#070917', '#05060f'].map(empac);
  // o céu pela altitude: as cores das camadas do minijogo de lançamento (js/game-launch.js)
  const CEU_ALT = [[0, '#a9dbff'], [4, '#8fcdfb'], [9, '#7cc2f6'], [12, '#63a7ee'], [22, '#3f80df'], [34, '#2f6fd6'], [46, '#2b55b8'], [53, '#2a3a92'], [60, '#252466'], [68, '#1e174e'], [76, '#130f2e'], [92, '#0a0a1c'], [140, '#05060f']].map(([a, c]) => [a, empac(c)]);
  const VAZIO = empac('#05060f');
  const ESTRELAS_COR = ['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#bcd4ff', '#a8c4ff', '#fff0a8', '#ffd9a0'].map(empac);
  // depois da subida, atrás do texto, o céu fica mais calmo: menos estrelas e a maioria mais fraca
  const ESTRELAS_FRACAS = ['#4b5383', '#5a6394', '#3f4775', '#646a8c', '#545c8a'].map(empac);

  function medir() {
    const vw = document.documentElement.clientWidth, vh = window.innerHeight;
    const novoS = vw < 700 ? 3 : vw < 1800 ? 4 : 5;
    const nW = Math.ceil(vw / novoS), nH = Math.ceil(vh / novoS);
    if (nW !== W || nH !== H || novoS !== S) {
      S = novoS; W = nW; H = nH;
      cv.width = W; cv.height = H; cv.style.width = W * S + 'px'; cv.style.height = H * S + 'px';
      cx.imageSmoothingEnabled = false;
      imagem = cx.createImageData(W, H); px32 = new Uint32Array(imagem.data.buffer);
      cena = montarCena();
    }
    medirPagina();
    pedir();
  }

  // ---------- a cena da base, desenhada uma vez por tamanho de tela ----------
  function montarCena() {
    const largo = W > 200;
    const c = { largo };
    c.hz = H - 58;                                         // a linha do horizonte (o pé das mesas de longe)
    c.chao = H - 34;                                       // o chão do vale
    c.plat = H - 28;                                       // a superfície da plataforma
    c.fogX = Math.round(W * (largo ? 0.69 : 0.63));        // o centro do foguete
    c.solX = Math.round(W * (largo ? 0.79 : 0.82));
    c.cruz = Math.round(H * 0.56) - 16;                    // a altura da nave durante a subida (topo do sprite em 2x)
    c.fogTopo0 = c.plat - 32;
    // o céu do amanhecer: as cores quentes ficam só perto do horizonte, e mais fortes perto do Sol
    c.am = new Uint32Array(W * H);
    const N = AMANHECER.length - 1;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const u = clamp((c.hz - y) / (c.hz * 0.92), 0, 1);
      const dx = (x - c.solX) / W, dy = (y - c.hz) / H;
      const q = Math.max(0, 1 - Math.hypot(dx * 1.1, dy * 2.6) / 0.55);
      const i = clamp(N * Math.pow(u, 0.58) - q * q * 3.8 - q * 0.5, 0, N);
      const k = Math.floor(i), f = i - k;
      c.am[y * W + x] = AMANHECER[Math.min(N, BAYER[(y & 3) * 4 + (x & 3)] < f ? k + 1 : k)];
    }
    // as mesas da Chapada: três camadas, de longe para perto, cada uma cheia até o chão
    const perfil = (mesas, base, ondas) => { const h = new Float32Array(W); for (let x = 0; x < W; x++) { const xn = x / W; let v = base + ondas(x); for (const m of mesas) { let a = 0; if (xn >= m.a && xn <= m.b) a = m.h - ((x * 7 + Math.floor(m.h)) % 13 === 0 ? 1 : 0) - (m.d && xn > m.d ? 2 : 0); else { const d = xn < m.a ? m.a - xn : xn - m.b; if (d < m.t) { const k = 1 - d / m.t; a = m.h * 0.58 * k * k; } } v = Math.max(v, a); } h[x] = Math.max(1, Math.round(v)); } return h; };
    const camada = (h, cor, borda, quente, acima, abaixo, estrato) => mk(W, acima + abaixo, x => {
      for (let i = 0; i < W; i++) {
        const top = acima - h[i]; rect(i, top, 1, h[i] + abaixo, cor, x);
        if (estrato && h[i] > 9) rect(i, top + 4, 1, 1, estrato, x);        // a linha do arenito no paredão
        rect(i, top, 1, 1, Math.abs(i - c.solX) < W * 0.22 ? quente : borda, x);
      }
    });
    const M = largo
      ? { longe: [{ a: -0.05, b: 0.32, h: 27, t: 0.05, d: 0.2 }, { a: 0.39, b: 0.5, h: 20, t: 0.035 }, { a: 0.9, b: 1.12, h: 24, t: 0.04 }], meio: [{ a: 0.08, b: 0.2, h: 13, t: 0.04 }, { a: 0.54, b: 0.6, h: 8, t: 0.03 }, { a: 0.94, b: 1.1, h: 12, t: 0.03 }] }
      : { longe: [{ a: -0.08, b: 0.34, h: 26, t: 0.06, d: 0.24 }, { a: 0.42, b: 0.56, h: 19, t: 0.05 }, { a: 0.97, b: 1.15, h: 21, t: 0.05 }], meio: [{ a: 0.03, b: 0.2, h: 13, t: 0.05 }, { a: 0.36, b: 0.46, h: 8, t: 0.04 }, { a: 0.94, b: 1.1, h: 12, t: 0.04 }] };
    c.longe = camada(perfil(M.longe, 4, x => 1.5 * Math.sin(x * 0.11) + 1), '#3b3372', '#5f5190', '#d27a86', 30, c.chao - c.hz + 6, '#433b7c');
    c.meio = camada(perfil(M.meio, 3, x => 1.2 * Math.sin(x * 0.07 + 2) + 1), '#262150', '#383268', '#80507c', 16, c.chao - c.hz, '#2b2658');
    // morros de perto, com árvores redondas
    c.perto = mk(W, 30, x => {
      for (let i = 0; i < W; i++) { const h = Math.round(9 + 2 * Math.sin(i * 0.13) + 1.5 * Math.sin(i * 0.37 + 1)); rect(i, 30 - h, 1, h, '#171a33', x); }
      const rr = semente(11);
      for (let i = 0; i < W / 7; i++) { const tx = Math.floor(rr() * W), tr = 2 + Math.floor(rr() * 3); if (Math.abs(tx - c.fogX) < 16 || Math.abs(tx - c.solX) < 6) continue; disc(tx, 30 - 9 - tr + 2, tr, '#12152b', x); rect(tx + Math.round(tr * 0.5), 30 - 9 - tr * 2 + 3, 1, 1, '#2c2d5a', x); }
    });
    // o chão, a plataforma, a torre, o hangar e o KDOK
    c.chaoImg = mk(W, 60, x => {
      const y0 = 14; // onde começa o chão dentro desta imagem (acima dele, os prédios)
      rect(0, y0, W, 60 - y0, '#0d1120', x);
      const rr = semente(3);
      for (let i = 0; i < W * 4; i++) rect(Math.floor(rr() * W), y0 + 1 + Math.floor(rr() * 44), 1, 1, rr() < 0.5 ? '#121a2b' : '#0a0d19', x);
      // a trilha de terra até a plataforma
      for (let k = 0; k < 34; k++) { const tx = Math.round(lerp(c.fogX - 40, c.fogX - 6, k / 33) + Math.sin(k * 0.45) * 2); rect(tx, y0 + 40 - k, 5, 1, '#232035', x); }
      // a plataforma, com a faixa amarela e preta da Astrokdok
      const pX = c.fogX - 14, pY = y0 + 6;
      rect(pX, pY, 28, 3, '#5b5d6b', x); rect(pX, pY, 28, 1, '#9a9cab', x);
      for (let i = 0; i < 28; i += 4) { rect(pX + i, pY + 3, 2, 2, '#f2c200', x); rect(pX + i + 2, pY + 3, 2, 2, '#0e0e0e', x); }
      rect(pX + 2, pY + 5, 3, 6, '#2b2f45', x); rect(pX + 23, pY + 5, 3, 6, '#2b2f45', x);
      // o hangar da Astrokdok, com as luzes acesas de madrugada
      const hX = largo ? Math.round(W * 0.86) : 3, hW = largo ? 42 : 38, hY = y0 - 8;
      rect(hX, hY, hW, 16, '#5a4800', x); rect(hX, hY, hW, 2, '#f2c200', x); rect(hX - 1, hY - 1, hW + 2, 1, '#0e0e0e', x);
      for (let i = 0; i < 14; i += 3) rect(hX + hW - 16 + i, hY + 5, 2, 11, '#0e0e0e', x);
      rect(hX + 3, hY + 6, 3, 2, '#ffd27e', x); rect(hX + 9, hY + 6, 3, 2, '#ffd27e', x); rect(hX + 15, hY + 6, 3, 2, '#ffd27e', x);
      rect(hX + 2, hY + 11, 36 - 16, 1, '#3a2f00', x);
      // a Escola do Capão (só onde cabe)
      if (largo) { const eX = Math.round(W * 0.05), eY = y0 - 9; rect(eX, eY + 4, 46, 13, '#2a3f70', x); for (let i = 0; i < 5; i++) rect(eX - 2 + i, eY + 4 - i, 50 - i * 2, 1, '#6e1a1a', x); rect(eX - 2, eY + 4, 50, 1, '#8c1f1f', x);
        for (let i = 0; i < 5; i++) rect(eX + 4 + i * 8, eY + 8, 4, 3, i === 2 ? '#2a3f70' : '#ffd27e', x); rect(eX + 20, eY + 10, 6, 7, '#1c2340', x); }
      // poste de luz
      const lX = c.fogX - (largo ? 44 : 36); rect(lX, y0 - 10, 1, 12, '#2a2f45', x); rect(lX - 1, y0 - 11, 3, 1, '#ffd27e', x); rect(lX - 2, y0 - 10, 1, 1, '#7a5a30', x); rect(lX + 2, y0 - 10, 1, 1, '#7a5a30', x);
      // o KDOK, de pé ao lado da torre
      x.drawImage(KDOK, c.fogX - (largo ? 34 : 30), y0 - 9);
    });
    c.chaoY0 = 14;
    // a torre de lançamento, em treliça
    c.torre = mk(9, 48, x => {
      for (let y = 2; y < 48; y++) { rect(0, y, 1, 1, '#3a3f5c', x); rect(5, y, 1, 1, '#5b6290', x); if (y % 4 === 0) rect(0, y, 6, 1, '#3a3f5c', x); if (y % 4 === 2) rect(2 + (y % 8 === 2 ? 0 : 2), y, 2, 1, '#454b70', x); }
      rect(0, 2, 9, 2, '#3a3f5c', x); rect(6, 3, 3, 1, '#5b6290', x); rect(2, 0, 1, 2, '#e04848', x);
    });
    // estrelas: posição na tela, limiar de aparecimento e velocidade
    const rs = semente(5);
    c.estrelas = Array.from({ length: Math.round(W * H / 90) }, () => ({ x: Math.floor(rs() * W), y: rs() * H * 2, l: rs(), v: 0.4 + rs() * 0.6, g: rs() < 0.12, k: Math.floor(rs() * ESTRELAS_COR.length) }));
    // o que passa na subida: o ponto da trilha em que o objeto passa pela nave, x de 0 a 1 e o tipo
    const ro = semente(21), objs = [], cz = c.cruz + 16;
    const poe = (k, t0, t1, n, extra) => { for (let i = 0; i < n; i++) objs.push(Object.assign({ k, t: lerp(t0, t1, (i + ro()) / n), x: ro(), s: ro() }, extra)); };
    [[0.12, 30], [0.5, 25], [0.86, 34]].forEach(([fx, acima], i) => objs.push({ k: 'nuvemAm', t: cz - (c.hz - acima), x: largo ? fx : [0.02, 0.4, 0.78][i], s: 0.3, f: 0.55 }));
    poe('nuvem', 200, 310, 10); poe('passaro', 215, 300, 4); poe('aviao', 250, 262, 1);
    poe('nuvemFina', 300, 345, 3); poe('aviao', 330, 340, 1); poe('balao', 360, 450, 3); poe('meteoro', 490, 615, 5);
    poe('satelite', 650, 760, 2); poe('lixo', 640, 775, 7); poe('estacao', 748, 752, 1);
    c.objs = objs;
    // a Terra vista da órbita: um arco enorme, com a linha fininha da atmosfera
    const LH = Math.ceil(H * 0.5);
    c.terra = mk(W, LH, x => {
      const R = W * 1.25, ccx = W * 0.5, ccy = 3 + R, rr = semente(9);
      const im = x.createImageData(W, LH), b = new Uint32Array(im.data.buffer);
      const OCE = empac('#1e5bd8'), OCE2 = empac('#1a4fbf'), TER = empac('#3fae4b'), TER2 = empac('#2f8a3c'), NUV = empac('#ffffff'), NUV2 = empac('#dfe9f7'), NOITE = empac('#0a1030'), NOITE2 = empac('#101a48'), ATM = empac('#9fd0ff'), ATM2 = empac('#3b6fd6'), BRI = empac('#dff0ff'), LUZ = empac('#ffd27e');
      for (let y = 0; y < LH; y++) for (let i = 0; i < W; i++) {
        const d = Math.hypot(i - ccx, y - ccy) - R, bay = BAYER[(y & 3) * 4 + (i & 3)];
        if (d > 2.6) continue;
        if (d > 0) { b[y * W + i] = d < 1.3 ? ATM : (bay < 0.5 ? ATM2 : 0); continue; }
        if (d > -1.2) { b[y * W + i] = i > W * 0.36 ? BRI : ATM2; continue; }
        const n = Math.sin(i * 0.083 + y * 0.31) + Math.sin(i * 0.031 - y * 0.19 + 1.7) + Math.sin((i + y * 1.6) * 0.047);
        const nv = Math.sin(i * 0.05 + y * 0.9) + Math.sin(i * 0.013 + y * 0.4 + 2.2);
        let cor = n > 1.25 ? (n > 1.7 ? TER2 : TER) : (bay < 0.18 ? OCE2 : OCE);
        if (nv > 1.35) cor = bay < 0.5 ? NUV : NUV2;
        const sombra = (W * 0.34 - i) / (W * 0.12);
        if (sombra > 1) cor = bay < 0.3 ? NOITE2 : NOITE; else if (sombra > 0 && bay < sombra) cor = NOITE2;
        if (sombra > 1.2 && n > 1.3 && rr() < 0.05) cor = LUZ; // as luzes das cidades no lado da noite
        b[y * W + i] = cor;
      }
      x.putImageData(im, 0, 0);
    });
    // o Sol e a Lua de hoje (no amanhecer, na fase certa, vista do hemisfério sul)
    c.sol = mk(24, 24, x => { disc(12, 12, 9, '#ffb020', x); disc(12, 12, 7, '#ffe27a', x); disc(12, 12, 5, '#fff3a0', x); });
    c.solOrbita = mk(13, 13, x => { disc(6, 6, 5, '#fff3a0', x); disc(6, 6, 3, '#ffffff', x); });
    c.ondeLua = luaHoje();
    c.lua = desenharLua(largo ? 6 : 5, c.ondeLua.idade, '#f1ece2', null);
    c.corpos = montarCorpos(largo);
    return c;
  }

  // ---------- os corpos que passam ao fundo, em cada parada (a arte e as cores do jogo, js/bodies.js) ----------
  function montarCorpos(largo) {
    const R = largo ? 34 : 40, C = {};
    const bola = (r, borda, base, fn, w, h) => { w = w || r * 2 + 4; h = h || r * 2 + 4; return mk(w, h, x => { const a = w / 2, b = h / 2; disc(a, b, r, borda, x); disc(a, b, r - 1, base, x); if (fn) fn(x, a, b); }); };
    const brilho = (x, a, b, r, ext, cores) => { for (let y = Math.floor(b - ext); y < b + ext; y++) for (let i = Math.floor(a - ext); i < a + ext; i++) { const d = Math.hypot(i - a, y - b); if (d < r || d > ext) continue; const t = (d - r) / (ext - r); if (BAYER[(y & 3) * 4 + (i & 3)] > (1 - t) * 0.6) continue; rect(i, y, 1, 1, cores[Math.min(cores.length - 1, Math.floor(t * cores.length))], x); } };
    C.lua = bola(R, '#555555', '#bdbdbd', (x, a, b) => { crateras(x, a, b, R - 3, 16, '#8e8e8e'); disc(a - R * 0.3, b - R * 0.25, R * 0.22, '#a3a3a3', x); });
    C.sol = mk(R * 4, R * 4, x => { const a = R * 2; brilho(x, a, a, R, R * 1.85, ['#c2410c', '#7a2a08', '#3a1204']); disc(a, a, R, '#ff9a1a', x); disc(a, a, R - 3, '#ffc23a', x); disc(a, a, R - 9, '#ffe27a', x); for (let i = 0; i < 4; i++) disc(a + Math.cos(i * 1.9) * R * 0.5, a + Math.sin(i * 1.9) * R * 0.45, 2 + i % 2, '#d0560e', x); });
    const r1 = Math.round(R * 0.5);
    C.planetas = [
      withPal('mercurio', () => bola(Math.round(r1 * 0.55), 1, 2, (x, a, b) => crateras(x, a, b, r1 * 0.5, 7, 1))),
      bola(Math.round(r1 * 0.85), '#b07b2c', '#ecc678', (x, a, b) => faixas(x, a, b, Math.round(r1 * 0.85) - 1, ['#f8e3ae', '#ecc678', '#f8e3ae', '#e0b860'], 4)),
      bola(Math.round(r1 * 0.7), '#8f2f14', '#d4602f', (x, a, b) => { disc(a - 3, b + 2, 3, '#a8401e', x); disc(a + 4, b - 3, 2, '#f3a77c', x); }),
      bola(Math.round(r1 * 1.5), '#8c5a33', '#d9a273', (x, a, b) => { faixas(x, a, b, Math.round(r1 * 1.5) - 1, ['#d9a273', '#f6e3c9', '#8c5a33', '#d9a273', '#f6e3c9'], 5); disc(a + r1 * 0.5, b + r1 * 0.45, 3, '#b04a2c', x); }),
      (() => { const r = Math.round(r1 * 1.15), w = Math.round(r * 4.2), h = r * 2 + 6; return mk(w, h, x => { const a = w / 2, b = h / 2; anel(x, a, b, r * 1.9, r * 0.42, '#b8a47c', false); anel(x, a, b, r * 1.6, r * 0.34, '#ece0c0', false); disc(a, b, r, '#9c7f3c', x); faixas(x, a, b, r - 1, ['#e0c27a', '#f8ecc8', '#e0c27a', '#c8a85c'], 4); for (let k = r * 1.45; k <= r * 1.95; k += 1.5) anel(x, a, b, k, k * 0.22, k % 3 < 1.5 ? '#ece0c0' : '#b8a47c', true); }); })(),
      bola(Math.round(r1 * 0.95), '#2f8f9a', '#9fe0e4', (x, a, b) => { for (let k = 0; k < 6.283; k += 0.02) rect(a + Math.cos(k) * r1 * 0.3, b + Math.sin(k) * r1 * 1.3, 1, 1, '#d9f7f8', x); }, Math.round(r1 * 2.2), Math.round(r1 * 2.9)),
      bola(Math.round(r1 * 1.05), '#1f4fc4', '#4f8cff', (x, a, b) => { faixas(x, a, b, Math.round(r1 * 1.05) - 1, ['#4f8cff', '#4f8cff', '#7aa8ff', '#3a70e0'], 5); disc(a - 4, b - 3, 3, '#1a3a9a', x); rect(a + 2, b - 7, 7, 1, '#ffffff', x); }),
    ];
    C.proxima = mk(R * 4, R * 4, x => { const a = R * 2; brilho(x, a, a, R * 0.8, R * 1.7, ['#a3201a', '#5a0c08', '#2a0505']); disc(a, a, Math.round(R * 0.8), '#e04a22', x); disc(a, a, Math.round(R * 0.8) - 3, '#ff6a36', x); for (let i = 0; i < 7; i++) disc(a + Math.cos(i * 2.3) * R * 0.4, a + Math.sin(i * 2.3) * R * 0.35, 2, '#ff9a5a', x); });
    C.sgra = mk(R * 4, R * 2, x => { const a = R * 2, b = R; const d = r => r % 4 ? '#ff8c1a' : '#ffc84a'; anel(x, a, b, R * 1.8, R * 0.42, '#6a3008', false); for (let r = R * 1.1; r <= R * 1.7; r += 2) anel(x, a, b, r, r * 0.24, d(Math.round(r)), false); disc(a, b, Math.round(R * 0.62), '#fff2c0', x); disc(a, b, Math.round(R * 0.58), '#000000', x); for (let r = R * 1.1; r <= R * 1.7; r += 2) anel(x, a, b, r, r * 0.24, d(Math.round(r)), true); });
    C.magalhaes = mk(R * 4, R * 3, x => { const nuvem = (a, b, r, cor) => { for (let y = -r; y <= r; y++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, y * 1.3) / r; if (d > 1) continue; if (BAYER[((b + y) & 3) * 4 + ((a + i) & 3)] < (1 - d) * 0.75) rect(a + i, b + y, 1, 1, cor, x); } }; nuvem(R * 1.4, R * 1.3, Math.round(R * 0.95), '#a7b6ff'); nuvem(R * 1.4, R * 1.3, Math.round(R * 0.5), '#dfe6ff'); nuvem(R * 3, R * 2.1, Math.round(R * 0.55), '#a7b6ff'); nuvem(R * 3, R * 2.1, Math.round(R * 0.26), '#dfe6ff'); });
    C.andromeda = mk(R * 4, R * 3, x => { const a = R * 2, b = R * 1.5; for (let r = R * 1.7; r > 0; r -= 2.5) for (let k = 0; k < 6.283; k += 0.025) { const px = Math.cos(k) * r, py = Math.sin(k) * r * 0.3; if (BAYER[(Math.round(py) & 3) * 4 + (Math.round(px) & 3)] > 0.85 - r / (R * 3)) continue; rect(a + px * 0.92 - py * 0.4, b + px * 0.38 + py * 0.92, 1, 1, r < R * 0.3 ? '#fff0c8' : r < R * 0.9 ? '#b0c4ff' : '#4a5cc0', x); } disc(a, b, 4, '#ffe08a', x); });
    return C;
  }
  // onde cada corpo passa: no meio da sua parada, com o lado alternado (Órion passa no caminho entre a Próxima e Sagitário A*)
  function medirCorpos() {
    if (!cena) return;
    const C = cena.corpos, lista = [];
    const de = id => G.paradas.find(p => p.id === id);
    const poe = (id, img, f = 0.5, lado = 1) => { const p = de(id); if (p && img) lista.push({ img, m: lerp(p.ini, p.fim, f), lado }); };
    poe('lua', C.lua, 0.35, 1); poe('sol', C.sol, 0.8, -1);
    // nos planetas, três de cada vez não cabem: passam Júpiter, Saturno e Netuno, bem separados
    [3, 4, 6].forEach((k, j) => poe('planetas', C.planetas[k], 0.12 + j * 0.38, j % 2 ? -1 : 1));
    poe('proxima', C.proxima, 0.4, 1);
    // a borda já mostra o mapa da luz mais antiga no conteúdo: ali o fundo fica só com as estrelas
    poe('sgra', C.sgra, 0.35, 1); poe('magalhaes', C.magalhaes, 0.25, -1); poe('andromeda', C.andromeda, 0.3, 1);
    G.corpos = lista;
  }

  // ---------- o estado da cena a partir da rolagem ----------
  const G = { fimA: 1, ancT: [], fimB: 1, paradas: [], pontos: [], etapas: [], vh: 800, hudPx: 44 };
  function medirPagina() {
    const vh = window.innerHeight, topo = el => el.getBoundingClientRect().top + window.scrollY;
    G.vh = vh;
    const heroi = $('#base'), sub = $('#subida');
    if (!heroi || !sub) return;
    G.fimA = Math.max(1, heroi.offsetHeight * 0.55);
    // onde termina o texto do topo (a Lua do amanhecer só aparece no céu livre, entre o texto e as mesas)
    const ult = $$('.topo .zeros, .topo .celular').filter(el => el.offsetParent).pop();
    G.textoFim = ult ? ult.getBoundingClientRect().bottom + window.scrollY : 0;
    // os retângulos dos textos do topo: ali não se acende estrela (as letras ficam limpas)
    G.limpos = $$('.topo .rotulo, .topo .sub-pixel, .topo .lema').map(el => { const r = el.getBoundingClientRect(); return { x0: r.left - 6, x1: r.right + 6, y0: r.top + window.scrollY - 4, y1: r.bottom + window.scrollY + 4 }; }).filter(r => r.x1 - r.x0 > 12);
    const etapas = $$('.etapa', sub);
    // cada etapa começa (o T dela) quando o topo da etapa passa pelo meio da tela
    G.ancT = [[G.fimA, 0]];
    etapas.forEach((e, i) => { if (i > 0) G.ancT.push([Math.max(G.ancT[G.ancT.length - 1][0] + 1, topo(e) - vh * 0.5), +e.dataset.t]); });
    G.fimB = Math.max(G.ancT[G.ancT.length - 1][0] + 1, topo(sub) + sub.offsetHeight - vh * 0.75);
    G.ancT.push([G.fimB, T_FIM]);
    G.etapas = etapas.map(e => [topo(e), topo(e) + e.offsetHeight, +e.dataset.t]);
    medirParadas(topo, vh);
    medirCorpos();
    G.reguaAlto = reguaLista ? reguaLista.clientHeight : 0; reguaChave = null; reguaTop = null;
  }
  function trilhaDe(y) {
    const a = G.ancT;
    if (!a.length || y <= a[0][0]) return 0;
    for (let i = 1; i < a.length; i++) if (y <= a[i][0]) return lerp(a[i - 1][1], a[i][1], (y - a[i - 1][0]) / (a[i][0] - a[i - 1][0]));
    return T_FIM;
  }
  function trilhaCalma(y) { // movimento reduzido: um quadro parado para cada etapa
    const meio = y + G.vh * 0.5, fixos = [40, 110, 235, 395, 545, 705, 880];
    if (y < G.fimA * 0.9) return -1;
    let k = 0; G.etapas.forEach((e, i) => { if (meio >= e[0]) k = i; });
    return y > G.fimB ? T_FIM : fixos[Math.min(k, fixos.length - 1)];
  }

  let ultimoY = -1, rolando = false, paradoTimer = 0;
  function estado(y) {
    const c = cena, e = { y };
    if (calmo) {
      const tc = trilhaCalma(y);
      e.T = Math.max(0, tc); e.pA = tc < 0 ? 0 : 1; e.chama = tc < 0 ? -1 : 0;
    } else {
      e.T = trilhaDe(y); e.pA = clamp(y / G.fimA, 0, 1);
      e.chama = e.pA > 0.015 ? (rolando ? Math.floor(y / 14) % 2 : 0) : -1;
    }
    e.pos = Math.max(0, y - G.fimB);            // quanto já rolou depois da subida
    const ease = e.pA * e.pA * e.pA;
    e.fogY = Math.round(lerp(c.fogTopo0, c.cruz, ease));
    if (e.pos > 0 && !calmo) e.fogY = Math.round(c.cruz - Math.pow(e.pos / (G.vh * 0.5), 2) * H);
    if (e.pos > G.vh * 0.3 && calmo) e.fogY = -999;   // movimento reduzido: a nave some sem voar
    e.w = suave(clamp(e.T / 135, 0, 1));        // do amanhecer para o céu da altitude
    return e;
  }

  // ---------- desenhar um quadro ----------
  function rampaAlt(a) {
    const P = CEU_ALT;
    if (a <= P[0][0]) return [P[0][1], P[0][1], 0];
    for (let i = 1; i < P.length; i++) if (a <= P[i][0]) return [P[i - 1][1], P[i][1], (a - P[i - 1][0]) / (P[i][0] - P[i - 1][0])];
    return [VAZIO, VAZIO, 0];
  }
  function desenhar(e) {
    const c = cena; if (!c) return;
    const T = e.T, cruz = c.cruz + 16;           // a linha da trilha que fica no meio da nave
    const desl = Math.round(T * 0.6);            // o horizonte desce junto com as mesas de longe
    const espaco = T >= T_ORBITA && e.w >= 1;
    const vw = document.documentElement.clientWidth, dxTela = (W * S - vw) / 2;
    // 1) o céu: o dia chega de cima para baixo, uma fronteira pontilhada desce pela tela enquanto a nave sobe
    const fronteira = lerp(-16, H + 16, e.w), dia = y => clamp((fronteira - y) / 16 + 0.5, 0, 1);
    if (espaco) px32.fill(VAZIO);
    else for (let y = 0; y < H; y++) {
      const [cA, cB, f] = rampaAlt(altDe(T + (cruz - y)));
      const fb = dia(y), ya = y - desl, linha = ya < 0 ? -1 : ya * W, row = y * W, by = (y & 3) * 4, by2 = ((y + 1) & 3) * 4;
      for (let x = 0; x < W; x++) {
        const alt = BAYER[by + (x & 3)] < f ? cB : cA;
        if (fb >= 1) { px32[row + x] = alt; continue; }
        const am = linha < 0 ? AMANHECER[AMANHECER.length - 1] : c.am[linha + x];
        px32[row + x] = fb > 0 && BAYER[by2 + ((x + 2) & 3)] < fb ? alt : am;
      }
    }
    // 2) as estrelas: aparecem onde o céu já está escuro
    const deriva = calmo ? T * 0.18 : T * 0.18 + e.pos / S * 0.05;   // movimento reduzido: as estrelas não andam com a rolagem
    const calma = clamp(e.pos / (G.vh * 0.6), 0, 1), corte = 1 - 0.55 * calma;
    for (const s of c.estrelas) {
      if (s.l > corte) continue;
      const y = Math.floor(((s.y + deriva * s.v) % H + H) % H), x = s.x, fb = dia(y);
      const visAlt = (altDe(T + (cruz - y)) - 48) / 40;
      let vis = visAlt;
      if (fb < 1) { const ya = y - desl; const u = ya < 0 ? 1 : (c.hz - ya) / (c.hz * 0.9); vis = (u - 0.42) / 0.4 * (1 - fb) + fb * visAlt; }
      if (G.limpos && T === 0) { const sx = x * S - dxTela, sy = y * S + e.y; if (G.limpos.some(r => sx > r.x0 && sx < r.x1 && sy > r.y0 && sy < r.y1)) continue; }
      if (vis > s.l) { const cor = calma > 0.5 && s.l > 0.1 ? ESTRELAS_FRACAS[s.k % ESTRELAS_FRACAS.length] : ESTRELAS_COR[s.k]; px32[y * W + x] = cor; if (s.g && x + 1 < W) px32[y * W + x + 1] = cor; }
    }
    cx.putImageData(imagem, 0, 0);
    // 2b) depois da órbita: os corpos de cada parada passam ao fundo, descendo devagar (a nave continua subindo)
    if (G.corpos && e.pos > 0) {
      // no computador, o corpo fica na margem da direita, fora da coluna do texto (a régua fica na esquerda);
      // no celular, aparece só a beirada, mais apagada, alternando os lados
      const colunaDir = ((vw + Math.min(720, vw)) / 2 + dxTela) / S;
      for (const b of G.corpos) {
        const ww = b.img.width, hh = b.img.height;
        // movimento reduzido: o corpo da parada aparece parado, sem deslizar
        const y = calmo ? (Math.abs(e.y - b.m) < G.vh * 0.45 ? G.vh * 0.36 / S : -9999) : ((e.y - b.m) * 0.62 + G.vh * 0.36) / S;
        if (y < -hh || y > H + hh) continue;
        const visivel = Math.min(ww * 0.4, W * 0.22);
        const x = c.largo ? Math.max(W * 0.86, colunaDir + 3 + ww / 2) : (b.lado > 0 ? W - visivel + ww / 2 : visivel - ww / 2);
        cx.globalAlpha = c.largo ? 1 : 0.3;
        cx.drawImage(b.img, Math.round(x - ww / 2), Math.round(y - hh / 2));
      }
      cx.globalAlpha = 1;
    }
    // 3) a Lua de hoje (só se ela estiver no céu ao amanhecer) e o Sol nascendo atrás das mesas
    if (c.ondeLua.noAmanhecer && e.w < 1) {
      const ang = c.ondeLua.alturaAmanhecer;           // graus acima do horizonte, do lado do Sol
      const lx = Math.round(c.solX - Math.sin(ang * Math.PI / 180) * W * (c.largo ? 0.42 : 0.55));
      const topoLivre = c.largo ? 10 : Math.ceil((G.textoFim + 14) / S), baseLivre = c.hz - 32 - c.lua.height;
      if (baseLivre >= topoLivre) {
        const ly = Math.round(lerp(baseLivre, topoLivre, Math.min(1, ang / 70))) + desl;
        cx.drawImage(c.lua, lx - (c.lua.width >> 1), ly);
      }
    }
    if (e.w < 1) cx.drawImage(c.sol, c.solX - 12, c.hz - 14 + desl);
    // 4) as mesas, os morros e a base (cada camada desce num ritmo: as de longe, mais devagar)
    if (T < 260) {
      cx.drawImage(c.longe, 0, c.hz - 30 + 2 + Math.round(T * 0.6));
      cx.drawImage(c.meio, 0, c.hz - 16 + 9 + Math.round(T * 0.75));
      cx.drawImage(c.perto, 0, c.chao - 30 + 6 + Math.round(T * 0.9));
      cx.drawImage(c.chaoImg, 0, c.chao - c.chaoY0 + Math.round(T));
      cx.drawImage(c.torre, c.fogX - 22, c.plat - 48 + Math.round(T));
      // a fumaça da decolagem
      if (e.pA > 0.03) { const p = Math.min(1, e.pA * 1.3); for (let i = 0; i < 7; i++) { const lado = i % 2 ? 1 : -1, d = 4 + i * 2.6 * p * 2; const rr = Math.round(2 + p * (4 - Math.abs(i - 3) * 0.6)); disc(c.fogX + lado * d, c.plat - 1 + Math.round(T) - (i % 3), rr, i % 3 ? '#b9adc0' : '#e2d8e2', cx); } }
    }
    // 5) o que passa na subida. Nada passa por trás da legenda: a faixa dela fica livre (no celular, a largura toda)
    let furo = null;
    if (legendaAtiva >= 0 && legendas[legendaAtiva]) {
      const r = legendas[legendaAtiva].getBoundingClientRect();
      if (r.height > 0) {
        const largo = r.width > vw * 0.7;
        const x0 = largo ? 0 : Math.floor((r.left + dxTela) / S) - 2, x1 = largo ? W : Math.ceil((r.right + dxTela) / S) + 2;
        furo = [x0, 0, x1 - x0, Math.ceil((r.bottom + 8) / S)];
      }
    }
    if (furo) { cx.save(); cx.beginPath(); cx.rect(0, 0, W, H); cx.rect(furo[0], furo[1], furo[2], furo[3]); cx.clip('evenodd'); }
    for (const o of c.objs) {
      const f = o.f || 1, ys = cruz - (o.t - T * f);
      if (ys < -24 || ys > H + 24) continue;
      const prog = ys / H, dir = o.s > 0.5 ? 1 : -1;      // prog: 0 no alto da tela, 1 embaixo
      let img, x = o.x * (W - 16);
      if (o.k === 'passaro') { const q = Math.floor(T / 5 + o.s * 4) % 2; img = dir < 0 ? OBJ_FLIP.passaro[q] : OBJ.passaro[q]; x = o.x * (W - 8) + (prog - 0.5) * W * 0.4 * dir; }
      else if (o.k === 'aviao') { img = dir > 0 ? OBJ_FLIP.aviao : OBJ.aviao; x = dir > 0 ? lerp(-18, W + 2, prog) : lerp(W + 2, -18, prog); }
      else if (o.k === 'balao') { img = OBJ.balao; x = o.x * (W - 10) + Math.sin(T * 0.05 + o.s * 6) * 2; }
      else if (o.k === 'meteoro') { img = OBJ.meteoro; x = o.x * (W - 8) + 10 - prog * 26; for (let k = 1; k < 4; k++) rect(x + 5 + k * 3, ys - 4 - k * 3, 2, 2, ['#ffd23a', '#ff8a1a', '#d8400e'][k - 1], cx); }
      else if (o.k === 'satelite') { img = OBJ.satelite; x = o.x * (W - 16) + (prog - 0.5) * 24 * dir; }
      else if (o.k === 'lixo') img = OBJ.lixo[Math.floor(o.s * 3)];
      else if (o.k === 'estacao') { img = OBJ.estacao; x = lerp(-18, W + 2, prog); }
      else img = OBJ[o.k];
      if (Math.abs(x + img.width / 2 - c.fogX) < 12 && Math.abs(ys - cruz) < 18 && o.k !== 'nuvemAm') x += x + img.width / 2 < c.fogX ? -16 : 16; // nada encosta na nave
      cx.drawImage(img, Math.round(x), Math.round(ys - img.height / 2));
    }
    if (furo) cx.restore();
    // 6) a Terra lá embaixo, quando chega a órbita (e o Sol nascendo na borda)
    if (T > T_ORBITA - 20) {
      const p = suave(clamp((T - T_ORBITA + 20) / 130, 0, 1));
      const topoT = calmo ? (e.pos < G.vh * 0.5 ? Math.round(H * 0.7) : H + 99) : Math.round(lerp(H + 4, H * 0.7, p) + e.pos / S * 0.6);
      if (topoT < H) { cx.drawImage(c.solOrbita, Math.round(W * 0.8) - 6, topoT - 8); cx.drawImage(c.terra, 0, topoT); }
    }
    // 7) a nave (2x) e a chama
    if (e.fogY > -40) {
      if (e.chama >= 0) { const ch = CHAMA[e.chama]; cx.drawImage(ch, c.fogX - 6, e.fogY + 26, ch.width * 2, ch.height * 2); }
      cx.drawImage(NAVES[0], c.fogX - 16, e.fogY, 32, 32);
    }
    // 8) a faixa com o nome da camada, como no jogo
    if (!espaco && e.pA >= 1) for (const [t0, nome] of NOMES_CAMADAS) {
      if (T > t0 + 4 && T < t0 + 130) { const sc = 2, y = Math.round((G.hudPx + 12) / S) + 2; rect(0, y, W, 5 * sc + 6, '#0e0e0e', cx); rect(0, y, W, 1, '#2a3155', cx); rect(0, y + 5 * sc + 5, W, 1, '#2a3155', cx); txt(nome, Math.round((W - txtW(nome, sc)) / 2), y + 3, '#f2c200', sc, cx); }
    }
  }

  // ---------- a Lua do amanhecer: a fase, numa conta aproximada feita no aparelho ----------
  const SINODICO = 29.530588853;
  function luaHoje(d = new Date()) {
    const jd = d.getTime() / 86400000 + 2440587.5;
    const idade = ((jd - 2451550.1) % SINODICO + SINODICO) % SINODICO;
    const ilum = (1 - Math.cos(2 * Math.PI * idade / SINODICO)) / 2;
    const cresce = idade < SINODICO / 2;
    // ao amanhecer, a Lua minguante está no céu, a uns (360 - elongação) graus do Sol
    const elong = idade / SINODICO * 360;
    return { idade, ilum, noAmanhecer: !cresce && ilum > 0.04 && ilum < 0.97, alturaAmanhecer: clamp(360 - elong, 8, 90) };
  }
  function desenharLua(R, idade, claro, escuro) {
    const t = 2 * Math.PI * idade / SINODICO, n = R * 2 + 2;
    return mk(n, n, x => {
      for (let y = -R; y <= R; y++) for (let i = -R; i <= R; i++) {
        if (i * i + y * y > R * R + R * 0.8) continue;
        const v = y / R, s = Math.sqrt(Math.max(0, 1 - v * v)), u = -(i + 0.5) / R; // espelhado: hemisfério sul
        const aceso = t <= Math.PI ? u > Math.cos(t) * s : u < -Math.cos(t) * s;
        const cor = aceso ? claro : escuro;
        if (!cor) continue;                                   // no céu do amanhecer, o lado escuro some no céu
        rect(R + 1 + i, R + 1 + y, 1, 1, cor, x);
      }
    });
  }

  // =====================================================================
  // O MEDIDOR DA VIAGEM (o painel e a régua). Só números do jogo e da tabela da NASA:
  // parado na parada, no valor certo; entre uma parada e outra, ele corre numa escala que multiplica.
  // =====================================================================
  const ANO_LUZ = 9.4607e12, LUZ_KMS = 300000;   // a luz anda 300.000 km por segundo (aula do jogo)
  const PARADAS = [
    { id: 'orbita', nome: 'ÓRBITA DA TERRA', curto: 'ÓRBITA', rumo: 'ÓRBITA', km: 400, nave: 1, regua: 'ÓRBITA' },
    { id: 'lua', nome: 'LUA', rumo: 'RUMO À LUA', km: 384400, regua: 'LUA' },
    { id: 'sol', nome: 'SOL', rumo: 'RUMO AO SOL', km: 1.5e8, regua: 'SOL' },
    // os planetas: de Mercúrio (57,9 milhões de km do Sol) a Netuno (4.515 milhões de km do Sol), pela tabela da NASA
    { id: 'planetas', nome: 'DE MERCÚRIO A NETUNO', curto: 'PLANETAS', rumo: 'RUMO A MERCÚRIO', km: 1.5e8, kmFim: 4.515e9, planetas: true, nave: 2, naveFim: 3, regua: 'PLANETAS' },
    { id: 'proxima', nome: 'PRÓXIMA CENTAURI', curto: 'PRÓXIMA', rumo: 'RUMO À PRÓXIMA CENTAURI', rumoCurto: 'RUMO À PRÓXIMA', km: 4.2 * ANO_LUZ, nave: 4, regua: 'PRÓXIMA' },
    { id: 'sgra', nome: 'SAGITÁRIO A*', curto: 'SGR A*', rumo: 'RUMO A SAGITÁRIO A*', rumoCurto: 'RUMO A SGR A*', km: 26000 * ANO_LUZ, regua: 'SGR A*' },
    { id: 'magalhaes', nome: 'NUVENS DE MAGALHÃES', curto: 'MAGALHÃES', rumo: 'RUMO ÀS NUVENS DE MAGALHÃES', rumoCurto: 'RUMO A MAGALHÃES', km: 160000 * ANO_LUZ, regua: 'MAGALHÃES' },
    { id: 'andromeda', nome: 'ANDRÔMEDA', rumo: 'RUMO A ANDRÔMEDA', rumoCurto: 'RUMO A ANDRÔMEDA', km: 2.5e6 * ANO_LUZ, nave: 5, regua: 'ANDRÔMEDA' },
    { id: 'borda', nome: 'A LUZ MAIS ANTIGA', curto: 'A BORDA', rumo: 'RUMO À BORDA', km: 13.8e9 * ANO_LUZ, borda: true, regua: 'BORDA' },
  ];
  function medirParadas(topo, vh) {
    G.paradas = [];
    PARADAS.forEach(p => {
      const el = document.getElementById(p.id); if (!el) return;
      // parada = enquanto o conteúdo da seção passa pelo meio da tela; viagem = no vão estrelado entre uma seção e outra
      const t = topo(el) + (parseFloat(getComputedStyle(el).paddingTop) || 0), fimSecao = topo(el) + el.offsetHeight;
      G.paradas.push(Object.assign({}, p, { ini: t - vh * 0.55, fim: Math.max(t - vh * 0.55 + 1, fimSecao - vh * 0.51) }));
    });
    // os pontos do medidor: [rolagem, log10 km]
    G.pontos = [];
    G.paradas.forEach(p => { G.pontos.push([p.ini, Math.log10(p.km), true], [p.fim, Math.log10(p.kmFim || p.km), false]); });
    G.hudPx = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hud')) || 44;
  }
  const fmtN = (v, casas = 0) => v.toLocaleString('pt-BR', { maximumFractionDigits: casas, minimumFractionDigits: 0 });
  const sig = (v, n) => { if (v === 0) return 0; const e = Math.pow(10, n - 1 - Math.floor(Math.log10(Math.abs(v)))); return Math.round(v * e) / e; };
  function distTexto(km, curto, exato) {
    if (km < 0.5) return '0 KM';
    if (km < 1e6) return fmtN(km < 1000 || exato ? Math.round(km) : sig(km, 3)) + ' KM';
    const g = (v, um, muitos, ab) => { const n = sig(v, 3), t = fmtN(n, n < 10 ? 1 : 0); return curto ? `${t} ${ab}` : `${t} ${n < 2 ? um : muitos}`; };
    if (km < 1e9) return g(km / 1e6, 'MILHÃO DE KM', 'MILHÕES DE KM', 'MI KM');
    if (km < 1e12) return g(km / 1e9, 'BILHÃO DE KM', 'BILHÕES DE KM', 'BI KM');
    if (km < 0.8 * ANO_LUZ) return g(km / 1e12, 'TRILHÃO DE KM', 'TRILHÕES DE KM', 'TRI KM');
    const al = km / ANO_LUZ;
    if (al < 1000) return fmtN(sig(al, al < 10 ? 2 : 3), al < 10 ? 1 : 0) + ' ANOS-LUZ';
    if (al < 1e4) return fmtN(sig(al, 3)) + ' ANOS-LUZ';
    if (al < 1e6) return fmtN(sig(al / 1e3, 3)) + ' MIL ANOS-LUZ';
    if (al < 1e9) return g(al / 1e6, 'MILHÃO DE ANOS-LUZ', 'MILHÕES DE ANOS-LUZ', 'MI ANOS-LUZ');
    return g(al / 1e9, 'BILHÃO DE ANOS-LUZ', 'BILHÕES DE ANOS-LUZ', 'BI ANOS-LUZ');
  }
  function luzTexto(km) {
    const s = km / LUZ_KMS;
    if (s < 0.01) return fmtN(s, 3) + ' s';
    if (s < 10) return fmtN(s, 1) + ' s';
    if (s < 60) return fmtN(s) + ' s';
    if (s < 3600) { const m = Math.floor(s / 60), r = Math.round(s % 60); return m >= 10 || r === 0 ? `${m} min` : `${m} min ${r} s`; }
    if (s < 86400) { const h = s / 3600; return h < 3 ? `${Math.floor(h)} h ${Math.round((h % 1) * 60)} min` : `${Math.round(h)} h`; }
    const anos = km / ANO_LUZ;
    if (anos < 1) return fmtN(Math.round(s / 86400)) + ' dias';
    if (anos < 10) return fmtN(sig(anos, 2), 1) + (anos < 2 ? ' ano' : ' anos');
    if (anos < 1e4) return fmtN(sig(anos, 3)) + ' anos';
    if (anos < 1e6) return fmtN(sig(anos / 1e3, 3)) + ' mil anos';
    if (anos < 1e9) { const v = sig(anos / 1e6, 3); return fmtN(v, 1) + (v < 2 ? ' milhão de anos' : ' milhões de anos'); }
    const v = sig(anos / 1e9, 3); return fmtN(v, 1) + (v < 2 ? ' bilhão de anos' : ' bilhões de anos');
  }
  // onde a viagem está: o rótulo, o número, a luz, a nave e a posição na régua
  function leitura(y, T) {
    const P = G.paradas, curto = window.innerWidth < 600;
    if (!P.length || y < G.fimB) {
      if (y < G.fimA * 0.5 && T <= 0) return { rot: 'BASE ASTROKDOK', num: 'ALT 0 KM', luz: '', nave: 0, idx: 0 };
      const alt = Math.min(400, altDe(T));
      let nome = 'DECOLAGEM'; for (const [t0, n] of NOMES_CAMADAS) if (T >= t0 - 10) nome = n;
      if (T >= T_ORBITA - 4) nome = 'ÓRBITA';
      return { rot: nome, num: `ALT ${fmtN(Math.floor(alt))} KM`, luz: '', nave: 0, idx: clamp(T / T_FIM, 0, 1) };
    }
    // o número: interpolado em escala que multiplica (log), parado nas paradas
    const pts = G.pontos;
    let lk = Math.log10(400);
    if (y >= pts[0][0]) {
      lk = pts[pts.length - 1][1];
      for (let j = 0; j < pts.length - 1; j++) if (y < pts[j + 1][0]) { const [y0, a] = pts[j], [y1, b, ehChegada] = pts[j + 1]; let f = clamp((y - y0) / Math.max(1, y1 - y0), 0, 1); if (ehChegada) f = suave(f); lk = lerp(a, b, f); break; }
    }
    const km = Math.pow(10, lk);
    // o rótulo: o nome da parada, ou para onde a nave vai
    let i = -1; P.forEach((p, k) => { if (y >= p.ini) i = k; });
    const p = P[Math.max(0, i)], estaNa = i >= 0 && y <= p.fim, prox = P[i + 1];
    const nomeDe = q => curto ? (q.curto || q.nome) : q.nome;
    // no celular, a caminho de uma parada, o painel mostra só o nome dela, com uma setinha na frente (o "RUMO A" não cabe)
    const viajando = i >= 0 && !estaNa && !!prox;
    const rot = i < 0 ? nomeDe(P[0]) : !viajando ? nomeDe(p) : (curto ? nomeDe(prox) : (prox.rumo || prox.nome));
    let nave = 1; P.forEach(q => { if (q.nave && y >= q.ini) nave = Math.max(nave, q.nave); if (q.naveFim && y > q.fim) nave = Math.max(nave, q.naveFim); });
    let num = distTexto(km, curto, estaNa), luz = curto ? 'luz daqui até a Terra: ' + luzTexto(km) : 'a luz daqui leva ' + luzTexto(km) + ' até a Terra';
    if (estaNa && p.planetas) {
      num = curto ? 'ATÉ 4.515 MI KM' : 'DE 57,9 A 4.515 MILHÕES DE KM';
      luz = curto ? 'até o Sol (NASA): de 57,9 a 4.515 mi km' : 'distância média de cada planeta até o Sol, de Mercúrio a Netuno (NASA)';
    }
    if (estaNa && p.borda) { num = curto ? '13,8 BI ANOS' : '13,8 BILHÕES DE ANOS'; luz = curto ? 'a luz mais antiga: 13,8 bilhões de anos' : 'a luz mais antiga: uns 13,8 bilhões de anos de viagem'; }
    const idx = i < 0 ? 1 : i + 1 + (estaNa || !prox ? 0 : clamp((y - p.fim) / Math.max(1, prox.ini - p.fim), 0, 1));
    return { rot, rumo: curto && viajando, num, luz, nave, idx };
  }

  // ---------- o painel, a legenda da subida e a régua ----------
  const hud = { rot: $('#hud-rotulo'), num: $('#hud-num'), luz: $('#hud-luz'), nave: $('#hud-nave'), pular: $('#hud-pular'), jogar: $('#hud-jogar') };
  const reguaEl = $('#regua'), reguaLista = $('#regua-lista'), reguaNave = $('#regua-nave'), deixa = $('.deixa');
  let naveAtual = -1, jogarGrandeVisivel = true, legendaAtiva = -2;
  const legendas = $$('.subida .etapa').map(e => $('.ficha, .kdok-caixa', e));
  const pintaNave = (cnv, i) => { if (!cnv) return; const x = cnv.getContext('2d'); x.imageSmoothingEnabled = false; x.clearRect(0, 0, 16, 16); x.drawImage(NAVES[i], 0, 0); };
  function atualizarLegenda(y, T) {
    let ativa = -1;
    if (y > G.fimA * 0.75 && y < G.fimB + G.vh * 0.3) G.etapas.forEach((e, k) => { if (T >= e[2] - 0.001) ativa = k; });
    if (ativa !== legendaAtiva) { legendas.forEach((el, k) => { if (el) el.classList.toggle('ativa', k === ativa); }); legendaAtiva = ativa; }
  }
  function atualizarPainel(y, L) {
    if (hud.rot.textContent !== L.rot) hud.rot.textContent = L.rot;
    hud.rot.classList.toggle('rumo', !!L.rumo);
    if (hud.num.textContent !== L.num) hud.num.textContent = L.num;
    if (hud.luz.textContent !== L.luz) hud.luz.textContent = L.luz;
    if (L.nave !== naveAtual) {
      if (naveAtual >= 0 && L.nave > naveAtual && AK.aviso) AK.aviso('NAVE NOVA: ' + NOMES_NAVES[L.nave], 1900);
      naveAtual = L.nave; pintaNave(hud.nave, L.nave); pintaNave(reguaNave, L.nave);
    }
    // a deixa "role para lançar" some quando a nave sai do chão
    if (deixa) deixa.style.opacity = String(clamp(1 - y / (G.fimA * 0.35), 0, 1));
    const naSubida = y > G.fimA * 0.6 && y < G.fimB - G.vh * 0.2;
    hud.pular.hidden = !naSubida;
    hud.jogar.hidden = naSubida || jogarGrandeVisivel;
    // a régua (computador)
    if (reguaEl) {
      reguaEl.classList.toggle('ver', y > G.fimA);
      const itens = reguaItens, alto = G.reguaAlto || 0;   // a altura é medida em medirPagina, não a cada quadro
      if (itens.length && alto) {
        const pos = L.idx, n = itens.length - 1;   // 0 = base, 1 = órbita, 2 = lua...
        const chave = Math.round(pos * 4);
        if (chave !== reguaChave) { reguaChave = chave; itens.forEach((li, j) => { const ordem = n - j; li.classList.toggle('passou', ordem < pos); li.classList.toggle('agora', ordem === Math.round(pos)); }); }
        const top = Math.round(alto - (pos / n) * alto - 16);
        if (top !== reguaTop) { reguaTop = top; reguaNave.style.top = top + 'px'; }
      }
    }
  }
  let reguaItens = [], reguaChave = null, reguaTop = null;
  function montarRegua() {
    if (!reguaLista) return;
    const itens = [{ id: 'base', regua: 'BASE' }, ...PARADAS];
    reguaLista.innerHTML = itens.slice().reverse().map(p => `<li><a href="#${p.id}" data-ir="${p.id}">${p.regua}</a></li>`).join('');
    reguaItens = $$('li', reguaLista);
    reguaLista.addEventListener('click', ev => {
      const a = ev.target.closest('[data-ir]'); if (!a) return;
      ev.preventDefault();
      irPara(a.dataset.ir);
    });
  }
  // ir até uma parada: o começo do conteúdo dela (a placa), não o vão estrelado de antes
  function irPara(id) {
    if (id === 'base') { window.scrollTo({ top: 0, behavior: calmo ? 'auto' : 'smooth' }); return; }
    const sec = document.getElementById(id); if (!sec) return;
    const alvo = $('.placa', sec) || sec;
    alvo.scrollIntoView({ behavior: calmo ? 'auto' : 'smooth', block: 'start' });
  }
  AK.irPara = irPara;

  // ---------- o laço: só desenha quando a pessoa rola ----------
  let pedido = false;
  function pedir() { if (!pedido) { pedido = true; requestAnimationFrame(quadro); } }
  function quadro() {
    pedido = false;
    if (!cena) return;
    const y = window.scrollY;
    if (y !== ultimoY) { rolando = ultimoY >= 0; clearTimeout(paradoTimer); paradoTimer = setTimeout(() => { rolando = false; pedir(); }, 180); }
    ultimoY = y;
    const e = estado(y);
    atualizarLegenda(y, e.T);
    desenhar(e);
    atualizarPainel(y, leitura(y, e.T));
  }
  addEventListener('scroll', pedir, { passive: true });
  let tamTimer; addEventListener('resize', () => { clearTimeout(tamTimer); tamTimer = setTimeout(medir, 120); });

  // os botões do painel
  hud.pular.addEventListener('click', () => {
    irPara('orbita');
    // o PULAR some ao sair da subida: o foco vai para o título da órbita, e não para o começo da página
    const t = document.getElementById('t-orbita');
    if (t) { t.tabIndex = -1; setTimeout(() => t.focus({ preventScroll: true }), calmo ? 0 : 450); }
  });
  // o JOGAR do painel só aparece quando o JOGAR grande sai da tela (e fora da subida, onde fica o PULAR)
  const jogarGrande = $('#jogar');
  if (jogarGrande && 'IntersectionObserver' in window) new IntersectionObserver(([en]) => { jogarGrandeVisivel = en.isIntersecting; pedir(); }).observe(jogarGrande);
  else jogarGrandeVisivel = false;

  // =====================================================================
  // COMEÇO
  // =====================================================================
  montarRegua();
  pintaNave(hud.nave, 0);
  medir();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { medirPagina(); pedir(); });
  addEventListener('load', () => { medirPagina(); pedir(); });
  // os módulos mudam a altura da página quando montam: a viagem se mede de novo
  if ('ResizeObserver' in window) new ResizeObserver(() => { medirPagina(); pedir(); }).observe($('main'));
})();
