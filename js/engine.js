'use strict';
// Núcleo: tela, paleta, entrada, laço, som, salvamento, caixas de diálogo.
const A = window.A = {};
const $ = s => document.querySelector(s);
A.$ = $;
A.W = 160; A.H = 144;
A.PAL = ['#0e0e0e', '#6b5200', '#f2c200', '#fff4c0']; // 0 preto · 1 escuro · 2 amarelo · 3 claro
A.cv = $('#c');
A.ctx = A.cv.getContext('2d');
A.ctx.imageSmoothingEnabled = false;

// ---------- desenho ----------
A.mk = (w, h, fn) => { const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d'); x.imageSmoothingEnabled = false; if (fn) fn(x, c); return c; };
// sprite a partir de linhas: '0'-'3' = paleta, '.' = transparente; map troca letras por índices
A.spr = (rows, map) => A.mk(rows[0].length, rows.length, x => {
  rows.forEach((r, j) => {
    for (let i = 0; i < r.length; i++) {
      let ch = r[i];
      if (map && ch in map) ch = map[ch];
      if (ch === '.' || ch === ' ' || ch === -1) continue;
      x.fillStyle = A.PAL[+ch]; x.fillRect(i, j, 1, 1);
    }
  });
});
A.flip = c => A.mk(c.width, c.height, x => { x.translate(c.width, 0); x.scale(-1, 1); x.drawImage(c, 0, 0); });
A.rect = (x, y, w, h, p, ctx = A.ctx) => { ctx.fillStyle = A.PAL[p]; ctx.fillRect(Math.round(x), Math.round(y), w, h); };
A.cls = p => A.rect(0, 0, A.W, A.H, p);
A.draw = (img, x, y, ctx = A.ctx) => ctx.drawImage(img, Math.round(x), Math.round(y));
A.drawS = (img, x, y, s, ctx = A.ctx) => ctx.drawImage(img, Math.round(x), Math.round(y), img.width * s, img.height * s);
A.disc = (cx, cy, r, p, ctx = A.ctx) => {
  ctx.fillStyle = A.PAL[p];
  for (let y = -r; y <= r; y++) { const w = Math.floor(Math.sqrt(r * r - y * y + r * 0.8)); ctx.fillRect(Math.round(cx - w), Math.round(cy + y), w * 2 + 1, 1); }
};
A.rnd = (a, b) => a + Math.random() * (b - a);
A.ri = (a, b) => Math.floor(A.rnd(a, b + 1));
A.pick = arr => arr[Math.floor(Math.random() * arr.length)];
A.clamp = (v, a, b) => Math.max(a, Math.min(b, v));
A.wait = ms => new Promise(r => setTimeout(r, ms));
A.hitbox = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;

// ---------- entrada ----------
A.K = {}; A.P = {};
A.modal = null;
function press(k) {
  A.sfxUnlock();
  if (A.modal && A.modal.key && A.modal.key(k)) return;
  A.K[k] = true; A.P[k] = true;
}
function release(k) { A.K[k] = false; }
A.hit = k => { const v = A.P[k]; A.P[k] = false; return !!v; };
A.uiOpen = () => !$('#ui').hidden;
A.locked = () => !!A.modal || A.uiOpen() || A.busy;

const dp = $('#dpad');
let dpId = null, dpDir = null;
function setDir(d) { if (d === dpDir) return; if (dpDir) release(dpDir); dpDir = d; if (d) press(d); dp.dataset.dir = d || ''; }
function dirFrom(e) {
  const r = dp.getBoundingClientRect();
  const x = e.clientX - (r.left + r.width / 2), y = e.clientY - (r.top + r.height / 2);
  if (Math.hypot(x, y) < r.width * 0.1) return dpDir;
  return Math.abs(x) > Math.abs(y) ? (x > 0 ? 'right' : 'left') : (y > 0 ? 'down' : 'up');
}
dp.addEventListener('pointerdown', e => { e.preventDefault(); dpId = e.pointerId; try { dp.setPointerCapture(e.pointerId); } catch (_) {} setDir(dirFrom(e)); });
dp.addEventListener('pointermove', e => { if (e.pointerId === dpId) setDir(dirFrom(e)); });
const dpUp = e => { if (e.pointerId === dpId) { dpId = null; setDir(null); } };
dp.addEventListener('pointerup', dpUp);
dp.addEventListener('pointercancel', dpUp);
document.querySelectorAll('.ab button').forEach(b => {
  const k = b.dataset.k;
  b.addEventListener('pointerdown', e => { e.preventDefault(); b.classList.add('on'); press(k); });
  const up = () => { b.classList.remove('on'); release(k); };
  b.addEventListener('pointerup', up); b.addEventListener('pointercancel', up); b.addEventListener('pointerleave', up);
});
const KM = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right', z: 'a', Z: 'a', x: 'b', X: 'b', ' ': 'a', Enter: 'a', Escape: 'b' };
addEventListener('keydown', e => {
  const k = KM[e.key];
  if (!k || e.repeat) return;
  if (document.activeElement && document.activeElement.tagName === 'INPUT') return;
  if (A.uiOpen() && (k === 'a' || k === 'b')) return; // botões da tela cuidam disso
  e.preventDefault(); press(k);
});
addEventListener('keyup', e => { const k = KM[e.key]; if (k) release(k); });
addEventListener('pointerdown', () => A.sfxUnlock());
document.addEventListener('contextmenu', e => e.preventDefault());

// ---------- laço ----------
A.scene = null;
A.setScene = s => { if (A.scene && A.scene.exit) A.scene.exit(); A.scene = s; A.P = {}; if (s && s.enter) s.enter(); };
let last = 0;
function frame(t) {
  const dt = Math.min(0.05, (t - last) / 1000 || 0); last = t;
  const s = A.scene;
  if (s) { if (s.update) s.update(dt); if (s.draw) s.draw(A.ctx); }
  A.P = {};
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

A.fade = (on, ms = 260) => new Promise(r => { const f = $('#fade'); f.style.transition = `opacity ${ms}ms`; f.style.opacity = on ? 1 : 0; setTimeout(r, ms + 20); });
A.readMode = on => $('#app').classList.toggle('read', !!on);
A.hud = (l, r = '') => { $('#hud').innerHTML = `<span>${l}</span><span>${r}</span>`; };

// ---------- som (bipes estilo Game Boy) ----------
let ac = null;
A.sfxUnlock = () => {
  if (!ac) { try { ac = new (window.AudioContext || window.webkitAudioContext)(); } catch (_) { return; } }
  if (ac.state === 'suspended') ac.resume();
};
function tone(f, d, type = 'square', vol = 0.05, t0 = 0, slide = 0) {
  if (!ac || (A.S && A.S.mute)) return;
  const t = ac.currentTime + t0, o = ac.createOscillator(), g = ac.createGain();
  o.type = type; o.frequency.setValueAtTime(f, t);
  if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, f + slide), t + d);
  g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
  o.connect(g).connect(ac.destination); o.start(t); o.stop(t + d + 0.02);
}
function noise(d, vol = 0.08) {
  if (!ac || (A.S && A.S.mute)) return;
  const n = Math.floor(ac.sampleRate * d), buf = ac.createBuffer(1, n, ac.sampleRate), ch = buf.getChannelData(0);
  for (let i = 0; i < n; i++) ch[i] = (Math.random() * 2 - 1) * (1 - i / n);
  const s = ac.createBufferSource(), g = ac.createGain(); g.gain.value = vol;
  s.buffer = buf; s.connect(g).connect(ac.destination); s.start();
}
const SFX = {
  blip: () => tone(900, 0.025, 'square', 0.02),
  ok: () => { tone(660, 0.08); tone(990, 0.14, 'square', 0.05, 0.08); },
  bad: () => tone(220, 0.22, 'square', 0.05, 0, -90),
  up: () => [523, 659, 784, 1046].forEach((f, i) => tone(f, 0.1, 'square', 0.045, i * 0.09)),
  win: () => [523, 659, 784, 659, 784, 1046].forEach((f, i) => tone(f, 0.15, 'square', 0.045, i * 0.12)),
  boom: () => { noise(0.45, 0.12); tone(90, 0.4, 'triangle', 0.08, 0, -50); },
  hit: () => { noise(0.15, 0.1); tone(140, 0.15, 'square', 0.05, 0, -70); },
  coin: () => { tone(988, 0.05, 'square', 0.04); tone(1319, 0.1, 'square', 0.04, 0.05); },
  step: () => tone(120, 0.02, 'triangle', 0.03),
  thrust: () => noise(0.05, 0.025),
  warn: () => tone(1200, 0.06, 'square', 0.03),
  door: () => { tone(300, 0.06, 'square', 0.04); tone(200, 0.1, 'square', 0.04, 0.06); },
};
A.sfx = n => { if (SFX[n]) SFX[n](); };

// ---------- salvamento ----------
const KEY = 'astrokdok.v1';
A.newSave = () => ({ m: 0, step: 0, stars: 0, items: [], cards: [], rival: 'OTÁVIO', mute: false, lessons: {}, started: false });
A.load = () => {
  try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && typeof s.m === 'number') { A.S = Object.assign(A.newSave(), s); return true; } } catch (_) {}
  A.S = A.newSave(); return false;
};
A.save = () => { try { localStorage.setItem(KEY, JSON.stringify(A.S)); } catch (_) {} };
A.has = id => A.S.items.includes(id);
A.fmt = s => String(s).replace(/\{rival\}/g, A.S ? A.S.rival : 'OTÁVIO');

// ---------- caixa de diálogo (estilo Pokémon) ----------
// lines: texto ou lista; cada item pode ser {who, t}
A.say = (lines, who) => new Promise(done => {
  if (!Array.isArray(lines)) lines = [lines];
  const box = $('#box'), tx = $('#boxText'), more = $('#boxMore');
  const prev = A.modal;
  let i = 0, typing = false, timer = null, sp = null, full = '';
  const show = () => {
    let s = lines[i], name = who;
    if (typeof s === 'object') { name = s.who; s = s.t; }
    full = A.fmt(s);
    box.hidden = false;
    tx.innerHTML = name ? `<b class="who">${A.fmt(name)}:</b>` : '';
    sp = document.createElement('span'); tx.appendChild(sp);
    let n = 0; typing = true; more.style.visibility = 'hidden';
    clearInterval(timer);
    timer = setInterval(() => {
      n += 1; sp.textContent = full.slice(0, n);
      if (n % 3 === 0) A.sfx('blip');
      if (n >= full.length) { clearInterval(timer); typing = false; more.style.visibility = 'visible'; }
    }, 22);
  };
  const adv = () => {
    if (typing) { clearInterval(timer); typing = false; sp.textContent = full; more.style.visibility = 'visible'; return; }
    i++;
    if (i < lines.length) show();
    else { clearInterval(timer); box.hidden = true; box.onclick = null; A.modal = prev; done(); }
  };
  A.modal = { key: k => { if (k === 'a' || k === 'b') { adv(); return true; } return false; } };
  box.onclick = adv;
  show();
});

// ---------- painel de interface ----------
A.ui = html => { const u = $('#ui'); u.innerHTML = html; u.hidden = false; $('#pad').hidden = true; u.scrollTop = 0; return u; };
A.uiClose = () => { const u = $('#ui'); u.hidden = true; u.innerHTML = ''; $('#pad').hidden = false; };
A.choose = (q, opts) => new Promise(res => {
  const u = A.ui(`${q ? `<p class="q">${A.fmt(q)}</p>` : ''}<div class="opts">${opts.map((o, i) => `<button class="opt" data-i="${i}">${A.fmt(o)}</button>`).join('')}</div>`);
  u.querySelectorAll('.opt').forEach(b => b.onclick = () => { A.sfx('blip'); A.uiClose(); res(+b.dataset.i); });
});
A.btnWait = (html, label = 'CONTINUAR ▶') => new Promise(res => {
  const u = A.ui(`${html}<button class="btn" id="go">${label}</button>`);
  u.querySelector('#go').onclick = () => { A.sfx('blip'); A.uiClose(); res(); };
});
