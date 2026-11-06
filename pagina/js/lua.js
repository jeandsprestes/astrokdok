// O caderno da Lua de hoje: o módulo "lua" da página do Astrokdok.
// Uma folha de caderno com a Lua desenhada a lápis como ela aparece hoje no céu do Vale do Capão, a fase,
// quanto está acesa, quando nasce, a tarefa da missão 2 com as palavras do jogo (AK.dados), quando dá para ver
// no começo da noite e uma régua para os próximos 30 dias. As contas ficam em js/ceu.js, conferidas em
// ferramentas/teste_lua.js. Sem localização: o lugar é fixo. Com "reduzir movimento", nada se mexe.
// Uso: AK.lua.montar(el). Os textos (AK.lua.textos) não mexem na página e são testados no Node.
// LOOMB, 05/11/2026.
(function (raiz) {
  'use strict';
  const AK = raiz.AK = raiz.AK || {};
  const doc = raiz.document || null;
  const SRC = (doc && doc.currentScript && doc.currentScript.src) || '';
  const PASTA_JS = SRC ? SRC.replace(/[^/]*$/, '') : 'js/';
  const PASTA_PAG = PASTA_JS.replace(/js\/$/, '');

  // ---------------------------------------------------------------- textos (sem DOM)
  const SEM = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
  const SEM3 = ['dom.', 'seg.', 'ter.', 'qua.', 'qui.', 'sex.', 'sáb.'];
  const MES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  const NOMES = ['nova', 'crescente', 'quarto crescente', 'cheia', 'quarto minguante', 'minguante'];
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  // a hora, arredondada para 5 minutos: "por volta das 18h40", "por volta da 1h", "por volta da meia-noite"
  function porVolta(C, jd) {
    const t = C.local(jd + 2.5 / 1440), h = t.h, m = Math.floor(t.m / 5) * 5;
    if (h === 0 && m === 0) return 'por volta da meia-noite';
    if (h === 12 && m === 0) return 'por volta do meio-dia';
    return (h <= 1 ? 'por volta da ' : 'por volta das ') + h + 'h' + (m ? String(m).padStart(2, '0') : '');
  }
  const rosa = az => ['norte', 'nordeste', 'leste', 'sudeste', 'sul', 'sudoeste', 'oeste', 'noroeste'][Math.round((((az % 360) + 360) % 360) / 45) % 8];
  const altura = alt => alt < 20 ? 'baixa, perto do horizonte,' : alt < 60 ? 'a meia altura' : alt < 75 ? 'bem alta' : 'quase em cima da cabeça';
  const formato = k => k < 0.2 ? 'fininha' : k < 0.43 ? 'com menos da metade acesa' : k <= 0.57 ? 'com metade acesa'
    : k < 0.9 ? 'com mais da metade acesa' : k <= 0.97 ? 'quase redonda' : 'redonda';
  const dataLonga = (C, a) => SEM[C.semana(a)] + ', ' + a.dia + ' de ' + MES[a.mes - 1];
  const dataCurta = (C, a) => SEM3[C.semana(a)] + ' ' + a.dia + '/' + a.mes;
  const naData = (C, a) => { const s = C.semana(a); return (s === 0 || s === 6 ? 'no ' : 'na ') + dataLonga(C, a); };
  const NOME_MARCA = { nova: 'Lua nova', cheia: 'Lua cheia', 'quarto crescente': 'Quarto crescente', 'quarto minguante': 'Quarto minguante' };

  // tudo o que o caderno escreve para o dia a (d = quantos dias depois de hoje)
  function textos(C, a, d) {
    const l = C.luaDoDia(a);
    const pct = Math.round(l.k * 100);
    const Q = d === 0 ? 'Hoje' : d === 1 ? 'Amanhã' : cap(naData(C, a)) + ',';
    const ondeNasce = l.nasce ? rosa(C.onde('lua', l.nasce + 2 / 1440).az) : '';
    let conselho = '', alvo = null;
    if (l.tipo === 'noite') {
      conselho = `<b>${Q} dá para ver.</b> ${cap(porVolta(C, l.ref))}, olhe para o ${rosa(l.az)}: ela está ${altura(l.alt)} e ${formato(l.k)}.`;
      alvo = l;
    } else {
      if (l.tipo === 'nova') conselho = `<b>${Q} é Lua nova:</b> ela fica perto do Sol e quase não aparece.`;
      else if (l.tipo === 'poente') conselho = `<b>${Q} ela fica baixinha</b> e se põe logo depois do Sol, no ${rosa(l.az)}.`;
      else {
        const h = C.local(l.nasce).h;
        conselho = h < 6 ? `<b>${Q} ela só nasce de madrugada</b>, ${porVolta(C, l.nasce)}, no ${ondeNasce}.`
          : `<b>${Q} ela nasce mais tarde</b>, ${porVolta(C, l.nasce)}, no ${ondeNasce}.`;
      }
      if (l.manha) conselho += ` De manhã, ${porVolta(C, l.manha.jd)}, ela ainda está no céu claro, no ${rosa(l.manha.az)}.`;
      const p = C.proximaNoite(a);
      if (p) {
        conselho += ` A próxima Lua do começo da noite é <b>${naData(C, p.a)}</b>: ${porVolta(C, p.ref)}, no ${rosa(p.az)}, ${formato(p.k)}.`;
        alvo = p;
      }
    }
    const legenda = l.tipo === 'nova'
      ? 'na Lua nova, a metade acesa fica virada para o Sol, e daqui quase não se vê'
      : `desenhada como aparece no céu do Capão ${porVolta(C, l.ref)}, para quem olha para o ${rosa(l.az)}`;
    const rotulo = l.tipo === 'nova'
      ? 'Desenho a lápis da Lua nova: o disco fica todo do lado escuro'
      : `Desenho a lápis da Lua ${l.nome}, ${pct}% acesa, como aparece no céu do Capão ${porVolta(C, l.ref)}, para quem olha para o ${rosa(l.az)}`;
    return {
      l, pct, conselho, legenda, rotulo, alvo,
      data: dataLonga(C, a),
      carimbo: d === 0 ? 'A Lua de hoje' : d === 1 ? 'A Lua de amanhã' : 'A Lua de ' + a.dia + '/' + a.mes,
      fase: l.nome,
      acesa: pct + '% acesa',
      nasce: l.nasce ? 'nasce ' + porVolta(C, l.nasce) : '',
      saida: d === 0 ? 'hoje' : d === 1 ? 'amanhã' : dataCurta(C, a),
      valor: dataLonga(C, a) + (d === 0 ? ', hoje' : d === 1 ? ', amanhã' : '') + ': Lua ' + l.nome + ', ' + pct + '% acesa',
      lembrete: alvo ? dataCurta(C, alvo.a) + ', ' + porVolta(C, alvo.ref) : '',
    };
  }

  // o cabeçalho da tarefa, tirado dos dados do jogo: "Missão 2 · Lua · base de Alcântara (MA)"
  const UF = { 'Maranhão': 'MA', 'Bahia': 'BA', 'Amazonas': 'AM' };
  const tc = s => s.toLowerCase().replace(/(^|\s)(\S)/g, (_, e, c) => e + c.toUpperCase()).replace(/\s(De|Do|Da|Dos|Das)\s/g, m => m.toLowerCase());
  function cabecalho(m) {
    const estado = String(m.onde || '').split(',').map(s => s.trim())[1] || '';
    const uf = UF[estado] || estado;
    return 'Missão ' + m.n + ' · ' + tc(m.nome) + ' · base de ' + tc(m.base) + (uf ? ' (' + uf + ')' : '');
  }

  // o lembrete no calendário: um arquivo .ics feito no aparelho (RFC 5545)
  function ics(C, alvo, tarefa, agora) {
    const t = C.local(alvo.ref + 2.5 / 1440);
    const inicio = C.jdLocal({ ano: t.ano, mes: t.mes, dia: t.dia }, t.h, Math.floor(t.m / 5) * 5);
    const z = jd => C.dateOf(jd).toISOString().replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z');
    const e = s => String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
    const desc = 'Missão de verdade do Astrokdok (missão 2). No jogo: "' + tarefa + '"\n'
      + cap(porVolta(C, alvo.ref)) + ', olhe para o ' + rosa(alvo.az) + '. Ela vai estar ' + formato(alvo.k) + '.';
    const linhas = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Astrokdok//A Lua de hoje//PT-BR', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
      'BEGIN:VEVENT', 'UID:astrokdok-lua-' + z(inicio) + '@astrokdok', 'DTSTAMP:' + z(C.jdOf(agora || new Date())),
      'DTSTART:' + z(inicio), 'DTEND:' + z(inicio + 30 / 1440),
      'SUMMARY:' + e('Olhar a Lua (Astrokdok, missão 2)'), 'DESCRIPTION:' + e(desc),
      'BEGIN:VALARM', 'TRIGGER:-PT10M', 'ACTION:DISPLAY', 'DESCRIPTION:' + e('Olhar a Lua'), 'END:VALARM',
      'END:VEVENT', 'END:VCALENDAR'];
    const bytes = ch => { const c = ch.codePointAt(0); return c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4; };
    const dobra = s => { let out = '', n = 0; for (const ch of s) { const b = bytes(ch); if (n + b > 75) { out += '\r\n '; n = 1; } out += ch; n += b; } return out; };
    return linhas.map(dobra).join('\r\n') + '\r\n';
  }

  // ---------------------------------------------------------------- o desenho a lápis
  // a borda acesa: theta é o ângulo a partir do "para cima" de quem olha (o zênite), no sentido anti-horário.
  // A metade acesa base fica à direita (+x); a rotação do SVG (sentido horário) leva +x para (-sen theta, -cos theta).
  const rotacao = theta => Math.atan2(-Math.cos(theta * Math.PI / 180), -Math.sin(theta * Math.PI / 180)) * 180 / Math.PI;
  function semente(a) { return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function desenho(l) {
    const r = 92, k = l.k, nova = l.tipo === 'nova' || k < 0.03, rot = rotacao(l.theta).toFixed(1);
    const ex = Math.max(Math.abs(2 * k - 1) * r, 0.01).toFixed(2), sw = 2 * k - 1 > 0 ? 1 : 0;
    const lit = `M0 ${-r}A${r} ${r} 0 0 1 0 ${r}A${ex} ${r} 0 0 ${sw} 0 ${-r}Z`;
    const term = `M0 ${-r}A${ex} ${r} 0 0 ${1 - sw} 0 ${r}`;
    const rnd = semente(7);
    let h1 = '', h2 = '';
    // a hachura fica parada no papel, a 45 graus; só a máscara gira com a Lua
    for (let i = -2 * r; i <= 2 * r; i += 8) { const j = (rnd() - 0.5) * 2.2, k2 = (rnd() - 0.5) * 6; h1 += `M${(i - r - 6 + j).toFixed(1)} ${(r + 6 + k2).toFixed(1)}L${(i + r + 6 + j * 0.5).toFixed(1)} ${(-r - 6 + k2).toFixed(1)}`; }
    for (let i = -2 * r; i <= 2 * r; i += 15) { const j = (rnd() - 0.5) * 3; h2 += `M${(i - r * 0.5 + j).toFixed(1)} ${-r - 8}L${(i + r * 0.62).toFixed(1)} ${r + 8}`; }
    return `<defs>
<filter id="lu-lapis" x="-8%" y="-8%" width="116%" height="116%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2.4" xChannelSelector="R" yChannelSelector="G"/></filter>
<mask id="lu-escuro" maskUnits="userSpaceOnUse" x="-130" y="-130" width="260" height="260"><g transform="rotate(${rot})"><circle r="${r}" fill="#fff"/>${nova ? '' : `<path d="${lit}" fill="#000"/>`}</g></mask>
</defs>
<g transform="translate(120 120)"><g class="lu-hachura" mask="url(#lu-escuro)" filter="url(#lu-lapis)">
<path d="${h1}" fill="none" stroke="#2d2d35" stroke-width="1.25" stroke-opacity="${nova ? '.3' : '.52'}" stroke-linecap="round"/>
<path d="${h2}" fill="none" stroke="#2d2d35" stroke-width=".9" stroke-opacity="${nova ? '.12' : '.2'}" stroke-linecap="round"/>
</g></g>
<g transform="translate(120 120) rotate(${rot})">
${nova ? '' : `<path class="lu-luz" d="${lit}" fill="#fffdf6" fill-opacity=".92"/><path class="lu-term" d="${term}" fill="none" stroke="#2d2d35" stroke-opacity=".42" stroke-width="1.1" filter="url(#lu-lapis)"/>`}
<path class="lu-contorno" d="M0 ${-r}A${r} ${r} 0 0 1 0 ${r}" pathLength="1" fill="none" stroke="#2d2d35" stroke-width="${nova ? 1.3 : 2.2}" stroke-opacity="${nova ? .6 : 1}" stroke-linecap="round" filter="url(#lu-lapis)"/>
<path class="lu-contorno" d="M0 ${r}A${r} ${r} 0 0 1 0 ${-r}" pathLength="1" fill="none" stroke="#2d2d35" stroke-width="1.3" stroke-opacity=".6" stroke-linecap="round" filter="url(#lu-lapis)"/>
<circle class="lu-contorno lu-contorno2" r="${r + 1.8}" cx=".9" cy="-.5" pathLength="1" fill="none" stroke="#2d2d35" stroke-opacity=".2" stroke-width="1" filter="url(#lu-lapis)"/>
</g>`;
  }
  // os ícones das fases na régua (no hemisfério sul, a Lua crescente tem o lado aceso à esquerda)
  function icone(nome) {
    const r = 6.5, c = '#2d2d35', p = '#f3ede1';
    if (nome === 'nova') return `<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="${r}" fill="${c}"/></svg>`;
    if (nome === 'cheia') return `<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="${r}" fill="${p}" stroke="${c}" stroke-width="1.4"/></svg>`;
    const esq = nome === 'quarto crescente';
    return `<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="${r}" fill="${c}"/><path d="M8 ${8 - r}A${r} ${r} 0 0 ${esq ? 0 : 1} 8 ${8 + r}Z" fill="${p}"/><circle cx="8" cy="8" r="${r}" fill="none" stroke="${c}" stroke-width="1.4"/></svg>`;
  }
  const LAPIS = `<svg class="lu-lapis" viewBox="0 0 260 70" aria-hidden="true" focusable="false">
<g transform="rotate(-9 130 35)"><path d="M18 30 L40 22 L40 40 Z" fill="#e9d3a8"/><path d="M18 30 L26 27.2 L26 32.8 Z" fill="#2d2d35"/>
<rect x="40" y="22" width="150" height="18" fill="#e9b949"/><rect x="40" y="22" width="150" height="6" fill="#f3ce6b"/><rect x="40" y="34" width="150" height="6" fill="#d29f33"/>
<rect x="190" y="21" width="16" height="20" rx="2" fill="#b9bec8"/><path d="M194 21v20M200 21v20" stroke="#8e94a0" stroke-width="1.2"/>
<rect x="206" y="22" width="14" height="18" rx="3" fill="#e58c8c"/></g>
<g transform="rotate(7 222 56)"><rect x="196" y="46" width="48" height="20" rx="4" fill="#f7f3ea" stroke="#d9d2c2"/><rect x="196" y="46" width="22" height="20" rx="4" fill="#7fa8d9"/><path d="M218 46v20" stroke="#6b91c2"/></g>
</svg>`;

  // ---------------------------------------------------------------- a página
  function garantirEstilo() {
    if (!doc || !doc.head) return;
    if (!doc.querySelector('link[href*="lua.css"]')) {
      const l = doc.createElement('link'); l.rel = 'stylesheet'; l.href = PASTA_PAG + 'css/lua.css'; doc.head.appendChild(l);
    }
    if (!doc.querySelector('link[href*="family=Caveat"]')) {
      const f = doc.createElement('link'); f.rel = 'stylesheet';
      f.href = 'https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&display=swap'; doc.head.appendChild(f);
    }
  }
  function carregarCeu() {
    if (AK.ceu) return Promise.resolve(AK.ceu);
    return new Promise((ok, falha) => {
      const s = doc.createElement('script'); s.src = PASTA_JS + 'ceu.js';
      s.onload = () => (AK.ceu ? ok(AK.ceu) : falha(new Error('ceu.js sem AK.ceu')));
      s.onerror = () => falha(new Error('não carregou ceu.js'));
      doc.head.appendChild(s);
    });
  }

  let contador = 0;
  function montar(el) {
    if (!el || el.dataset.luMontado) return Promise.resolve();
    el.dataset.luMontado = '1';
    garantirEstilo();
    return carregarCeu().then(C => construir(el, C)).catch(e => { console.error('[lua]', e); });
  }

  function construir(el, C) {
    const id = 'lu' + (++contador);
    const agora = AK.agoraTeste instanceof Date ? AK.agoraTeste : new Date();
    const hoje = C.ancora(agora);
    const jdHoje = C.meioDia(hoje.ano, hoje.mes, hoje.dia);
    const dados = AK.dados || raiz.ASTROKDOK_DADOS || null;
    const m2 = dados && dados.missoes ? dados.missoes.find(m => m.n === 2) : null;
    const reduzido = typeof AK.reduzido === 'boolean' ? AK.reduzido
      : !!(raiz.matchMedia && raiz.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const cartao = m2 && m2.foraDaTela ? `
    <figure class="lu-jogo">
      <span class="lu-fita lu-fita-c" aria-hidden="true"></span>
      <div class="lu-jogo-caixa">
        <div class="lu-jogo-topo"><span class="lu-jogo-tag">MISSÃO DE VERDADE</span><img class="lu-jogo-lua" src="${PASTA_PAG}img/jogo/corpo_lua.png" width="61" height="61" alt="" loading="lazy" decoding="async"></div>
        <p class="lu-jogo-cab">${esc(cabecalho(m2))}</p>
        <blockquote class="lu-jogo-texto"><p>“${esc(m2.foraDaTela)}”</p></blockquote>
      </div>
      <figcaption class="lu-jogo-fonte">a tarefa, com as palavras do jogo</figcaption>
    </figure>` : '';
    el.innerHTML = `
<div class="lu${reduzido ? '' : ' lu-anima'}">
  <article class="lu-caderno" aria-labelledby="${id}-t">
    <span class="lu-fita lu-fita-e" aria-hidden="true"></span><span class="lu-fita lu-fita-d" aria-hidden="true"></span>
    <header class="lu-topo"><h3 class="lu-carimbo" id="${id}-t">A Lua de hoje</h3><p class="lu-data" id="${id}-data"></p></header>
    <div class="lu-lua">
      <svg class="lu-desenho" id="${id}-svg" viewBox="0 0 240 240" role="img" focusable="false"></svg>
      <p class="lu-notas" id="${id}-notas"></p>
    </div>
    <p class="lu-legenda" id="${id}-leg"></p>
    <div class="lu-risco" aria-hidden="true"></div>${cartao}
    <p class="lu-conselho" id="${id}-cons"></p>
    <div class="lu-regua">
      <div class="lu-regua-cab"><label for="${id}-dias">e nos próximos 30 dias</label><output id="${id}-saida" for="${id}-dias">hoje</output></div>
      <input type="range" id="${id}-dias" min="0" max="29" step="1" value="0">
      <div class="lu-marcas" id="${id}-marcas"></div>
    </div>
    <div class="lu-lembrar">
      <button type="button" class="lu-btn" id="${id}-lembrar">Lembrar no calendário<small id="${id}-quando"></small></button>
      <p class="lu-status" id="${id}-status" role="status" aria-live="polite"></p>
    </div>
    <p class="lu-lugar">Contas feitas neste aparelho para o céu do ${esc(C.LUGAR.nome)}, na Bahia, no horário de Brasília, sem pedir a sua localização. Em outras cidades, a fase é a mesma e os horários mudam um pouco. No vale, os morros escondem a Lua por um tempo depois que ela nasce.</p>
    ${LAPIS}
  </article>
</div>`;
    const $ = s => el.querySelector('#' + id + '-' + s);
    const caixa = el.querySelector('.lu'), svg = $('svg'), rg = $('dias'), btn = $('lembrar'), status = $('status');

    // as próximas fases, marcadas na régua (cada marca leva a régua até o dia dela)
    const marcas = $('marcas');
    for (const f of C.fases(jdHoje - 0.5, 30.5)) {
      const t = C.local(f.jd), a = { ano: t.ano, mes: t.mes, dia: t.dia };
      const d = Math.round(C.meioDia(a.ano, a.mes, a.dia) - jdHoje);
      if (d < 0 || d > 29) continue;
      const b = doc.createElement('button');
      b.type = 'button'; b.className = 'lu-marca'; b.style.left = (d / 29 * 100) + '%'; b.dataset.d = String(d);
      b.innerHTML = icone(f.nome) + '<span>' + a.dia + '/' + a.mes + '</span>';
      b.setAttribute('aria-label', NOME_MARCA[f.nome] + ': ' + dataLonga(C, a));
      b.title = NOME_MARCA[f.nome];
      b.addEventListener('click', () => { rg.value = String(d); mostrar(d); });
      marcas.appendChild(b);
    }

    let alvo = null;
    function mostrar(d) {
      const a = C.somaDias(hoje, d), t = textos(C, a, d);
      $('data').textContent = t.data;
      $('t').textContent = t.carimbo;
      svg.innerHTML = desenho(t.l);
      svg.setAttribute('aria-label', t.rotulo);
      $('notas').innerHTML = `<span class="lu-fase">${esc(t.fase)}</span><span class="lu-acesa">${esc(t.acesa)}</span>`
        + (t.nasce ? `<span class="lu-nasce">${esc(t.nasce)}</span>` : '');
      $('leg').textContent = t.legenda;
      $('cons').innerHTML = t.conselho;
      $('saida').textContent = t.saida;
      rg.setAttribute('aria-valuetext', t.valor);
      rg.style.setProperty('--lu-p', (d / 29 * 100) + '%');
      alvo = t.alvo;
      btn.hidden = !alvo;
      $('quando').textContent = t.lembrete;
      status.textContent = '';
      for (const b of marcas.children) b.classList.toggle('lu-marca-aqui', b.dataset.d === String(d));
    }
    let pedido = 0;
    rg.addEventListener('input', () => {
      if (!raiz.requestAnimationFrame) return mostrar(+rg.value);
      raiz.cancelAnimationFrame(pedido);
      pedido = raiz.requestAnimationFrame(() => mostrar(+rg.value));
    });
    btn.addEventListener('click', () => {
      if (!alvo) return;
      const texto = ics(C, alvo, m2 ? m2.foraDaTela : 'Olhe para a Lua e desenhe o formato que você viu.');
      const url = URL.createObjectURL(new Blob([texto], { type: 'text/calendar;charset=utf-8' }));
      const a = doc.createElement('a');
      a.href = url; a.download = 'astrokdok-lua-' + alvo.a.dia + '-' + alvo.a.mes + '.ics';
      doc.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 5000);
      status.textContent = 'Pronto. Abra o arquivo baixado para guardar o lembrete no calendário.';
    });
    mostrar(0);

    // o lápis desenha a Lua quando o caderno aparece na tela (com "reduzir movimento", ela já vem pronta)
    if (!reduzido && 'IntersectionObserver' in raiz) {
      const io = new IntersectionObserver(es => {
        if (es.some(e => e.isIntersecting)) { caixa.classList.add('lu-desenhado'); io.disconnect(); }
      }, { threshold: 0.35 });
      io.observe(svg);
    } else caixa.classList.add('lu-desenhado');
  }

  AK.lua = { montar, textos, ics, porVolta, cabecalho, rotacao, NOMES };
  if (typeof module !== 'undefined' && module.exports) module.exports = AK.lua;
})(typeof window !== 'undefined' ? window : globalThis);
