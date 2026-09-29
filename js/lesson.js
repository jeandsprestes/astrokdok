'use strict';
// Aula: telas de explicação + desafios (múltipla escolha ou número).
// L = { id, subject, title, who, slides:[html], quiz:[{q, o:[..], a, why, hint} | {q, n, why, hint, calc}] }

const fmtN = v => v === '' ? '&nbsp;' : Number(v).toLocaleString('pt-BR');

function slides(L) {
  return new Promise(res => {
    let i = 0;
    const show = () => {
      const last = i === L.slides.length - 1;
      const u = A.ui(`<span class="tag">${L.subject} · ${i + 1}/${L.slides.length}</span><h2>${L.title}</h2>${A.fmt(L.slides[i])}
        <div class="row">${i > 0 ? '<button class="btn alt" id="bk">◀ VOLTAR</button>' : ''}<button class="btn" id="nx">${last ? 'DESAFIOS ▶' : 'PRÓXIMO ▶'}</button></div>`);
      u.querySelector('#nx').onclick = () => { A.sfx('blip'); if (last) { A.uiClose(); res(); } else { i++; show(); } };
      const bk = u.querySelector('#bk');
      if (bk) bk.onclick = () => { A.sfx('blip'); i--; show(); };
    };
    show();
  });
}

function askQ(L, q, idx, kd) {
  return new Promise(res => {
    let tries = 0, helped = false, val = '', over = false;
    const head = `<span class="tag">${L.subject} · DESAFIO ${idx + 1}/${L.quiz.length}</span><p class="q">${A.fmt(q.q)}</p>${q.calc ? `<div class="calc">${q.calc}</div>` : ''}`;
    const body = q.o
      ? `<div class="opts">${q.o.map((o, i) => `<button class="opt" data-i="${i}">${o}</button>`).join('')}</div>`
      : `<div class="num" id="nv">&nbsp;</div><div class="keys">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => `<button data-n="${n}">${n}</button>`).join('')}<button data-n="del">⌫</button><button data-n="0">0</button><button data-n="ok" class="ok">OK</button></div>`;
    const u = A.ui(head + body + `<div id="fb"></div>${kd.left ? '<button class="btn alt" id="kd">CHAMAR O KDOK (1 por aula)</button>' : ''}`);
    const fb = u.querySelector('#fb');
    const kbtn = u.querySelector('#kd');
    const toBottom = () => setTimeout(() => { u.scrollTop = u.scrollHeight; }, 30);

    const finish = (msg) => {
      over = true;
      u.querySelectorAll('.opt,.keys button').forEach(b => b.disabled = !b.classList.contains('good'));
      if (kbtn) kbtn.remove();
      const star = tries === 0 && !helped;
      fb.innerHTML = `<div class="fb ok"><b>${msg || (star ? 'CERTO! +★' : 'CERTO!')}</b> ${q.why || ''}</div><button class="btn" id="go">CONTINUAR ▶</button>`;
      u.querySelector('#go').onclick = () => { A.sfx('blip'); A.uiClose(); res(star); };
      toBottom();
    };
    const wrong = () => {
      tries++; A.sfx('bad');
      if (!q.o && tries >= 3) { finish(`A resposta é ${fmtN(q.n)}.`); return; }
      fb.innerHTML = `<div class="fb no"><b>Ainda não.</b> ${q.hint || 'Pense de novo com calma.'}</div>`;
      toBottom();
    };

    if (q.o) {
      u.querySelectorAll('.opt').forEach(b => b.onclick = () => {
        if (over) return;
        if (+b.dataset.i === q.a) { b.classList.add('good'); A.sfx('ok'); finish(); }
        else { b.disabled = true; wrong(); }
      });
    } else {
      const nv = u.querySelector('#nv');
      u.querySelectorAll('.keys button').forEach(b => b.onclick = () => {
        if (over) return;
        const k = b.dataset.n;
        A.sfx('blip');
        if (k === 'del') val = val.slice(0, -1);
        else if (k === 'ok') { if (val === '') return; if (+val === q.n) { A.sfx('ok'); nv.innerHTML = fmtN(val); finish(); } else { wrong(); val = ''; } }
        else if (val.length < 8) val = (val + k).replace(/^0+(?=\d)/, '');
        nv.innerHTML = fmtN(val);
      });
    }
    if (kbtn) kbtn.onclick = () => {
      kd.left = false; helped = true; kbtn.remove(); A.sfx('coin');
      if (q.o) {
        const bad = [...u.querySelectorAll('.opt')].filter(b => +b.dataset.i !== q.a && !b.disabled);
        if (bad.length) A.pick(bad).disabled = true;
        fb.innerHTML = `<div class="fb no"><b>KDOK:</b> Bip-bop! Apaguei uma resposta errada pra você.</div>`;
      } else fb.innerHTML = `<div class="fb no"><b>KDOK:</b> Bip-bop! ${q.hint || 'Faça a conta devagar.'}</div>`;
      toBottom();
    };
  });
}

A.runLesson = async L => {
  A.readMode(true);
  A.hud(L.subject, `★ 0/${L.quiz.length}`);
  await slides(L);
  let got = 0;
  const kd = { left: true };
  for (let i = 0; i < L.quiz.length; i++) {
    if (await askQ(L, L.quiz[i], i, kd)) got++;
    A.hud(L.subject, `★ ${got}/${L.quiz.length}`);
  }
  A.S.lessons[L.id] = Math.max(A.S.lessons[L.id] || 0, got);
  A.S.stars = Object.values(A.S.lessons).reduce((a, b) => a + b, 0);
  A.save();
  A.readMode(false);
  return got;
};
