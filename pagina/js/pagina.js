// pagina.js: o núcleo da página do Astrokdok (LOOMB, 05/11/2026).
// Os ajudantes AK que os módulos usam, o carregador de módulos, o topo (jogar, chapéu, pôr no celular, a janela das bases),
// o chapéu digital com Pix, o vídeo, quem faz, as missões de verdade e a folha da geladeira, o celular desenhado,
// as novidades e o compartilhar. O céu, a subida, o painel e a régua moram em js/viagem.js.
'use strict';
(() => {
  const AK = window.AK = window.AK || {};
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const titulo = s => String(s).toLowerCase().split(' ').map((p, i) => (i > 0 && p.length <= 2 && !p.includes('*')) ? p : p.charAt(0).toUpperCase() + p.slice(1)).join(' ').replace(/ a\*$/i, ' A*');
  const pad = n => String(n).padStart(2, '0');

  // =====================================================================
  // OS AJUDANTES (AK). Os módulos usam estes; se faltarem, eles têm uma saída simples.
  // =====================================================================
  AK.dados = window.ASTROKDOK_DADOS || AK.dados || null;
  AK.config = window.ASTROKDOK_CONFIG || AK.config || {};
  const CFG = AK.config;
  const D = AK.dados || { totais: {}, missoes: [], episodios: [], naves: [] };
  D.missoes = D.missoes || []; D.totais = D.totais || {};
  AK.reduzido = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const JOGO_NO_AR = CFG.jogo || 'https://jeandsprestes.github.io/astrokdok/';
  // a prévia do PC serve a pasta do jogo na porta 8736: ali o jogo é /index.html
  const PREVIA = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname) && location.port === '8736';
  AK.jogoURL = () => window.ASTROKDOK_JOGO_LOCAL || (PREVIA ? '/index.html' : JOGO_NO_AR);

  function carregarScript(src) {
    return new Promise((ok, falha) => {
      const s = document.createElement('script');
      s.src = src; s.async = true;
      s.onload = () => ok();
      s.onerror = () => { s.remove(); falha(new Error('não carregou: ' + src)); };
      document.head.appendChild(s);
    });
  }
  // os 292 desafios só vêm quando alguém pede (js/desafios.js tem uns 128 KB)
  let promDesafios = null;
  AK.carregarDesafios = () => {
    if (window.ASTROKDOK_DESAFIOS) return Promise.resolve(window.ASTROKDOK_DESAFIOS);
    if (!promDesafios) {
      promDesafios = carregarScript('js/desafios.js').then(() => window.ASTROKDOK_DESAFIOS || Promise.reject(new Error('js/desafios.js veio vazio')));
      promDesafios.catch(() => { promDesafios = null; });
    }
    return promDesafios;
  };
  // o gerador de QR (qrcode-generator 1.4.4, do cdnjs) também só vem quando precisa
  let promQR = null;
  AK.carregarQR = () => {
    if (window.qrcode) return Promise.resolve(window.qrcode);
    if (!promQR) {
      promQR = carregarScript('https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js').then(() => window.qrcode || Promise.reject(new Error('sem qrcode')));
      promQR.catch(() => { promQR = null; });
    }
    return promQR;
  };
  const enderecoPagina = () => String(CFG.enderecoFinal || '').trim() || (location.origin + location.pathname);
  const TEXTO_COMPARTILHAR = 'Achei um jogo educativo de viagens espaciais, feito no Vale do Capão, para crianças de 8 a 12 anos. Sem anúncio e sem cadastro:';
  AK.compartilhar = async ({ titulo: t = 'Astrokdok', texto = TEXTO_COMPARTILHAR, url = enderecoPagina() } = {}) => {
    if (navigator.share) {
      try { await navigator.share({ title: t, text: texto, url }); return 'share'; }
      catch (e) { if (e && e.name === 'AbortError') return 'cancelado'; }
    }
    window.open('https://wa.me/?text=' + encodeURIComponent(texto + ' ' + url), '_blank', 'noopener');
    return 'whatsapp';
  };
  let avisoT = 0;
  AK.aviso = (texto, ms = 2200) => {
    const el = $('#hud-aviso'), hud = $('#hud'), luz = $('#hud-luz'); if (!el || !hud) return;
    // com a linha da luz à vista, o aviso entra no lugar dela (dentro do painel); sem ela, aparece logo abaixo do painel
    hud.classList.toggle('aviso-na-linha', !!(luz && luz.textContent.trim()));
    el.textContent = texto; el.classList.add('ver'); hud.classList.add('avisando');
    clearTimeout(avisoT); avisoT = setTimeout(() => { el.classList.remove('ver'); hud.classList.remove('avisando'); }, ms);
  };

  // =====================================================================
  // OS DADOS DO JOGO NA PÁGINA (nada copiado à mão: tudo sai de ASTROKDOK_DADOS)
  // =====================================================================
  const missao = nome => D.missoes.find(m => m.nome === nome);
  $$('[data-jogo]').forEach(a => { a.href = AK.jogoURL(); });
  $$('[data-codigo]').forEach(a => { if (CFG.codigo) a.href = CFG.codigo; });
  $$('[data-total]').forEach(el => { const v = D.totais[el.dataset.total]; if (v != null) el.textContent = v; });
  $$('[data-missao]').forEach(el => { const m = missao(el.dataset.missao); if (m) el.textContent = 'MISSÃO ' + m.n; });
  $$('[data-missoes]').forEach(el => { const [a, b] = el.dataset.missoes.split(' ').map(missao); if (a && b) el.textContent = `MISSÕES ${a.n} A ${b.n}`; });
  if (Array.isArray(D.naves)) $$('#naves li b').forEach((b, k) => { if (D.naves[k]) b.textContent = D.naves[k]; });
  $$('[data-reserva-real]').forEach(el => { const m = D.missoes[+el.dataset.reservaReal - 1]; if (m) el.innerHTML = `Missão de verdade ${m.n}, no jogo: “${esc(m.foraDaTela)}”`; });
  (() => { // a sala das missões, simples, para o caso de o módulo não vir
    const ol = $('#reserva-missoes'); if (!ol) return;
    ol.innerHTML = D.missoes.map(m => `<li><b>${pad(m.n)}</b>${esc(titulo(m.nome))} · base: ${esc(m.onde)}</li>`).join('');
  })();
  (() => { const p = $('#real-final'), m = D.missoes[D.missoes.length - 1]; if (p && m && m.foraDaTela) p.textContent = `“${m.foraDaTela}”`; })();

  // a prévia do link com endereço completo, quando houver endereço final (o comentário do index.html explica o resto)
  (() => {
    const base = String(CFG.enderecoFinal || '').trim(); if (!base) return;
    let u; try { u = new URL(base); } catch (_) { return; }
    const meta = (attr, nome, valor) => { let m = document.head.querySelector(`meta[${attr}="${nome}"]`); if (!m) { m = document.createElement('meta'); m.setAttribute(attr, nome); document.head.appendChild(m); } m.setAttribute('content', valor); };
    const img = new URL('og.png', u).href;
    meta('property', 'og:image', img); meta('name', 'twitter:image', img); meta('property', 'og:url', u.href);
  })();

  // =====================================================================
  // O CHAPÉU DIGITAL: um componente só (a folha do topo e as Nuvens de Magalhães)
  // =====================================================================
  const ROTULOS = [
    { nome: 'Jogar sem pagar', desc: 'quando não dá, tudo bem' },
    { nome: 'Possível', desc: 'para quando o mês aperta' },
    { nome: 'Justo', desc: 'o do meio' },
    { nome: 'Generoso', desc: 'e outra família joga também' },
  ];
  const VALORES = (Array.isArray(CFG.valores) && CFG.valores.length ? CFG.valores : [0, 5.03, 15.03, 30.03]).map(Number).filter(v => isFinite(v) && v >= 0).slice(0, 4);
  const PADRAO = VALORES.length > 2 ? VALORES[2] : VALORES[VALORES.length - 1];   // o justo vem marcado
  const centavos = v => Math.round(v * 100) % 100;
  const mostraValor = v => (centavos(v) === 0 || centavos(v) === 3) ? String(Math.floor(v)) : v.toFixed(2).replace('.', ',');
  const reais = v => 'R$ ' + v.toFixed(2).replace('.', ',');
  // Pix copia e cola estático (BR Code do Banco Central): campos ID + tamanho + valor, e o CRC16 no fim (o mesmo do esboço de 02/11)
  const campo = (id, v) => id + String(v.length).padStart(2, '0') + v;
  const semAcento = (s, n) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^A-Za-z0-9 ]/g, '').toUpperCase().trim().slice(0, n);
  function crc16(s) {
    let crc = 0xFFFF;
    for (let i = 0; i < s.length; i++) {
      crc ^= s.charCodeAt(i) << 8;
      for (let j = 0; j < 8; j++) crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) & 0xFFFF : (crc << 1) & 0xFFFF;
    }
    return crc.toString(16).toUpperCase().padStart(4, '0');
  }
  function brcode(valor) {   // valor 0 = a pessoa digita o valor no banco
    const P = CFG.pix || {};
    const conta = campo('00', 'br.gov.bcb.pix') + campo('01', String(P.chave || '').trim());
    const s = campo('00', '01') + campo('26', conta) + campo('52', '0000') + campo('53', '986') +
      (valor > 0 ? campo('54', valor.toFixed(2)) : '') + campo('58', 'BR') + campo('59', semAcento(P.nome, 25)) +
      campo('60', semAcento(P.cidade, 15)) + campo('62', campo('05', semAcento(P.txid, 25).replace(/ /g, '') || '***')) + '6304';
    return s + crc16(s);
  }
  AK.brcode = brcode;   // para conferir no console, se precisar
  const pixPronto = () => { const P = CFG.pix || {}; return !!(String(P.chave || '').trim() && semAcento(P.nome, 25) && semAcento(P.cidade, 15)); };
  const ICONE_COPIAR = '<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><rect x="5" y="5" width="9" height="9" rx="2" fill="none" stroke="#fff" stroke-width="1.6"/><path d="M11 3.5V3a1.5 1.5 0 0 0-1.5-1.5H3A1.5 1.5 0 0 0 1.5 3v6.5A1.5 1.5 0 0 0 3 11h.5" fill="none" stroke="#fff" stroke-width="1.6"/></svg>';

  function desenharQR(el, texto, escala) {
    AK.carregarQR().then(() => {
      const q = window.qrcode(0, 'M'); q.addData(texto); q.make();
      el.innerHTML = q.createImgTag(escala || 4, 0, '');
      const img = $('img', el); if (img) { img.removeAttribute('width'); img.removeAttribute('height'); img.alt = ''; }
    }).catch(() => { el.innerHTML = `<span class="qr-texto qr-espera">${esc(texto.length > 60 ? 'O QR não carregou. Use o código ao lado.' : texto)}</span>`; });
  }
  async function copiar(texto, msg) {
    try { await navigator.clipboard.writeText(texto); msg.textContent = 'Copiado. Agora é só colar no app do banco.'; }
    catch (_) { msg.textContent = 'Não deu para copiar sozinho: segure o código e copie.'; }
  }
  function montarChapeu(alvo) {
    if (!alvo) return;
    const temMarca = VALORES.some(v => centavos(v) === 3);
    alvo.innerHTML = `<div class="valores" role="group" aria-label="Quanto passar no chapéu">${VALORES.map((v, i) => {
        const r = ROTULOS[i] || ROTULOS[ROTULOS.length - 1];
        return `<button class="valor" type="button" data-v="${v}" aria-pressed="false"><span class="nome">${esc(r.nome)}</span><span class="preco"><small>R$</small>${mostraValor(v)}</span><span class="desc">${esc(r.desc)}</span></button>`;
      }).join('')}</div>
      <button class="outro-valor" type="button" data-v="-1" aria-pressed="false">Prefiro escolher outro valor</button>
      <div class="pagar"></div>
      <p class="chapeu-zero" hidden>Pode jogar o quanto quiser, pelo tempo que o jogo estiver no ar. Se um dia der, o chapéu continua aqui.</p>
      ${temMarca ? '<p class="nota chapeu-nota">Os 3 centavos a mais marcam no extrato que o Pix veio do Astrokdok.</p>' : ''}`;
    const pagar = $('.pagar', alvo), zero = $('.chapeu-zero', alvo), nota = $('.chapeu-nota', alvo);
    const escolher = v => {
      $$('[data-v]', alvo).forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.v === v)));
      const ehZero = v === 0;
      pagar.hidden = ehZero; zero.hidden = !ehZero; if (nota) nota.hidden = v <= 0;
      if (ehZero) return;
      if (!pixPronto()) { pagar.innerHTML = '<div class="falta" data-falta="a chave Pix, o nome e a cidade de quem recebe (js/config.js, pix)"></div>'; return; }
      const codigo = brcode(v > 0 ? v : 0);
      pagar.innerHTML = `<div class="qr" role="img" aria-label="Código QR do Pix ${v > 0 ? 'de ' + reais(v) : 'sem valor marcado'}"><span class="qr-espera">QR do Pix</span></div>
        <div class="copia"><p class="nota">${v > 0 ? `Pix de <b class="mono">${reais(v)}</b>. Aponte a câmera do app do banco para o QR ou copie o código.` : 'Pix sem valor marcado: você digita o valor no app do banco.'}</p>
        <code>${esc(codigo)}</code><button type="button" class="copiar">${ICONE_COPIAR}Copiar o código Pix</button><p class="nota aviso-copia" aria-live="polite"></p></div>`;
      desenharQR($('.qr', pagar), codigo, 4);
      $('.copiar', pagar).addEventListener('click', () => copiar(codigo, $('.aviso-copia', pagar)));
    };
    $$('[data-v]', alvo).forEach(b => b.addEventListener('click', () => escolher(+b.dataset.v)));
    escolher(PADRAO);
  }
  montarChapeu($('#chapeu-folha'));
  montarChapeu($('#chapeu-pagina'));
  (() => {
    const folha = $('#folha-chapeu'), abrir = $('#abrir-chapeu');
    if (!abrir) return;
    abrir.addEventListener('click', () => {
      if (folha && typeof folha.showModal === 'function') { folha.showModal(); const x = folha.querySelector('.fechar, [data-fechar]'); if (x) x.focus({ preventScroll: true }); }
      else { const m = $('#magalhaes'); if (m) m.scrollIntoView(); }
    });
    if (!folha) return;
    $$('[data-fechar]', folha).forEach(b => b.addEventListener('click', () => folha.close()));
    folha.addEventListener('click', ev => { if (ev.target === folha) folha.close(); });
  })();

  // =====================================================================
  // PÔR NO CELULAR: a gaveta, com o aparelho de quem abre na frente
  // =====================================================================
  function qrDoJogo() {
    const el = $('#qr-jogo'); if (!el || el.dataset.feito) return;
    el.dataset.feito = '1';
    desenharQR(el, JOGO_NO_AR, 4);   // o QR leva sempre ao jogo no ar: o endereço da prévia não abre no celular
  }
  (() => {
    const det = $('#celular'); if (!det) return;
    const ua = navigator.userAgent;
    const ios = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const android = /Android/.test(ua);
    const pc = !ios && !android && matchMedia('(pointer: fine)').matches;
    const primeiro = ios ? 'iphone' : android ? 'android' : pc ? 'pc' : 'android';
    const lista = $('.abas', det);
    const b0 = $(`[data-aba="${primeiro}"]`, lista); if (b0) lista.prepend(b0);
    let atual = primeiro;
    const escolhe = (id, foco) => {
      atual = id;
      $$('[role="tab"]', lista).forEach(b => { const sim = b.dataset.aba === id; b.setAttribute('aria-selected', String(sim)); b.tabIndex = sim ? 0 : -1; if (sim && foco) b.focus(); });
      $$('.aba', det).forEach(p => { p.hidden = p.dataset.aba !== id; });
      if (id === 'pc' && det.open) qrDoJogo();
    };
    lista.addEventListener('click', ev => { const b = ev.target.closest('[role="tab"]'); if (b) escolhe(b.dataset.aba); });
    lista.addEventListener('keydown', ev => {
      if (!/^(ArrowLeft|ArrowRight|Home|End)$/.test(ev.key)) return;
      const bs = $$('[role="tab"]', lista);
      let i = bs.findIndex(b => b.getAttribute('aria-selected') === 'true');
      i = ev.key === 'Home' ? 0 : ev.key === 'End' ? bs.length - 1 : (i + (ev.key === 'ArrowRight' ? 1 : -1) + bs.length) % bs.length;
      ev.preventDefault(); escolhe(bs[i].dataset.aba, true);
    });
    det.addEventListener('toggle', () => { if (det.open && atual === 'pc') qrDoJogo(); });
    escolhe(primeiro);
  })();

  // =====================================================================
  // A JANELA DO JOGO no topo (computador): as 18 bases de lançamento, uma por vez, só quando a pessoa passa
  // =====================================================================
  (() => {
    const jan = $('#janela'); if (!jan || !D.missoes.length) return;
    const ARQ = ['base_01_capao', 'base_02_alcantara', 'base_03_atacama', 'base_04_roma', 'base_05_manaus', 'base_06_cabo_canaveral',
      'base_07_tanegashima', 'base_08_kourou', 'base_09_baikonur', 'base_10_greenwich', 'base_11_sriharikota', 'base_12_antartida',
      'base_13_uluru', 'base_14_chichen_itza', 'base_15_mauna_kea', 'base_16_lisboa', 'base_17_gize', 'base_18_capao_noite'];
    const img = $('#janela-img'), rot = $('#janela-missao'), conta = $('#janela-conta'), texto = $('#janela-texto');
    const total = Math.min(ARQ.length, D.missoes.length);
    let i = 0;
    const mostra = k => {
      i = (k + total) % total;
      const m = D.missoes[i];
      img.src = `img/jogo/${ARQ[i]}.png`;
      img.alt = `A base de lançamento da missão ${m.n}: ${m.onde}, como aparece no jogo`;
      rot.textContent = `MISSÃO ${m.n} · ${m.nome}`;
      conta.textContent = `${i + 1}/${total}`;
      const obj = String(m.objetivo || '');
      texto.innerHTML = `<span class="quem">${esc(m.onde)}</span><br>${esc(obj.charAt(0).toUpperCase() + obj.slice(1))}.`;
      // a próxima já fica pronta (são imagens de poucos KB)
      if (img.offsetParent) { const prox = new Image(); prox.src = `img/jogo/${ARQ[(i + 1) % total]}.png`; }   // no celular a janela fica escondida: nada de baixar à toa
    };
    $('#janela-ant').addEventListener('click', () => mostra(i - 1));
    $('#janela-prox').addEventListener('click', () => mostra(i + 1));
    mostra(0);
  })();

  // =====================================================================
  // ÓRBITA: o vídeo (nunca toca sozinho)
  // =====================================================================
  (() => {
    const v = $('#video'); if (!v) return;
    const u = String(CFG.video || '').trim();
    if (!u) { v.innerHTML = '<div class="falta" data-falta="o vídeo vertical do jogo (js/config.js, video): o link do YouTube não listado ou um arquivo .mp4"></div>'; return; }
    if (/\.(mp4|webm|mov)($|[?#])/i.test(u)) { v.innerHTML = `<video src="${esc(u)}" controls preload="none" playsinline></video>`; return; }
    const id = (u.match(/(?:shorts\/|embed\/|v=|youtu\.be\/)([\w-]{11})/) || [])[1];
    if (!id) { v.innerHTML = '<div class="falta" data-falta="o link do vídeo em js/config.js não foi reconhecido (use o link do YouTube ou um .mp4)"></div>'; return; }
    v.innerHTML = '<button class="video-botao" type="button"><span><svg width="18" height="20" viewBox="0 0 7 8" shape-rendering="crispEdges" aria-hidden="true"><path fill="#fff" d="M0 0h2v8H0zM2 1h2v6H2zM4 2h2v4H4zM6 3h1v2H6z"/></svg></span>Ver o vídeo do jogo</button>';
    $('button', v).addEventListener('click', () => {
      v.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1" title="O vídeo do Astrokdok" allow="autoplay; encrypted-media; picture-in-picture; fullscreen"></iframe>`;
      const fv = $('iframe', v); if (fv) fv.focus();
    });
  })();

  // =====================================================================
  // SOL: as missões de verdade e a folha da geladeira
  // =====================================================================
  (() => {
    const ol = $('#lista-real'); if (!ol || !D.missoes.length) return;
    const ult = D.missoes.length - 1, sempre = new Set([0, 2, ult]);
    ol.innerHTML = D.missoes.map((m, i) => `<li class="${i === ult ? 'ultima' : ''}${sempre.has(i) ? '' : ' oculta'}"><span class="num" aria-hidden="true">${pad(m.n)}</span><div><b>MISSÃO ${m.n} · ${esc(m.nome)}</b>${esc(m.foraDaTela)}</div></li>`).join('');
    const bt = $('#ver-todas');
    if (bt) bt.addEventListener('click', () => {
      const toda = ol.classList.toggle('toda');
      bt.setAttribute('aria-expanded', String(toda));
      bt.textContent = toda ? 'Ver menos' : `Ver as ${D.missoes.length}`;
      if (!toda) bt.scrollIntoView({ block: 'nearest' });
    });
    const folha = $('#para-imprimir');
    if (folha) {
      const marca = $('.topo .marca-pixel');
      const jogo = JOGO_NO_AR.replace(/^https?:\/\//, '').replace(/\/$/, '');
      folha.innerHTML = `<div class="imp"><div class="imp-topo"><div>${marca ? marca.outerHTML : ''}<h1>Missões de verdade</h1>
        <p class="imp-sub">Uma para cada missão do jogo, para fazer longe da tela. Marque quando fizer.</p></div><p class="imp-cadete">Cadete: ______________</p></div>
        <ol>${D.missoes.map((m, i) => `<li class="${i === ult ? 'ultima' : ''}"><span class="quadro"></span><div><b>Missão ${m.n} · ${esc(titulo(m.nome))}</b>${esc(m.foraDaTela)}</div></li>`).join('')}</ol>
        <div class="imp-pe"><span>Astrokdok, jogo educativo de viagens espaciais. Feito no Vale do Capão, Chapada Diamantina.</span><span>${esc(jogo)}</span></div></div>`;
    }
    const imp = $('#imprimir'); if (imp) imp.addEventListener('click', () => window.print());
  })();

  // =====================================================================
  // PRÓXIMA CENTAURI: o celular desenhado, com as telas reais, e o jogo só no clique
  // =====================================================================
  (() => {
    const img = $('#tela-img'); if (!img) return;
    const TELAS = [
      { arq: 'celular_aparencia', alt: 'A tela de montar o cadete, com as opções de cabelo, pele e roupa', fala: 'Primeiro, a criança monta o cadete: cabelo, pele e roupa.' },
      { arq: 'celular_dialogo', alt: 'A base da Astrokdok no Vale do Capão, com o Comandante Dozinho apresentando a nave', fala: 'Na base do Vale do Capão, o Comandante Dozinho apresenta a nave.' },
      { arq: 'celular_escola', alt: 'A sala da Escola do Capão, com a professora abrindo a aula de português', fala: 'Cada missão começa na Escola do Capão, com uma aula curta.' },
      { arq: 'celular_aula', alt: 'Um slide da aula de astronomia sobre a Lua', fala: 'Depois vem a aula de astronomia. Esta é a da Lua.' },
      { arq: 'celular_desafio', alt: 'Um desafio da aula da Lua, com quatro opções e o botão de chamar o KDOK', fala: 'No fim da aula vêm os desafios. Se a criança travar, pode me chamar uma vez por aula para uma dica.' },
      { arq: 'celular_cosmodex', alt: 'A carta de Saturno no Cosmodex, com o planeta e os dados dele', fala: 'Na volta de cada viagem, entra uma carta nova no Cosmodex. Esta é a de Saturno.' },
    ];
    const fala = $('#tela-fala'), conta = $('#tela-conta'), tela = $('#aparelho-tela');
    let i = 0, carregado = false;
    const mostra = k => {
      if (carregado) return;
      i = (k + TELAS.length) % TELAS.length;
      const t = TELAS[i];
      img.src = `img/telas/${t.arq}.webp`; img.alt = t.alt;
      fala.textContent = t.fala; conta.textContent = `TELA ${i + 1}/${TELAS.length}`;
    };
    $('#tela-ant').addEventListener('click', () => mostra(i - 1));
    $('#tela-prox').addEventListener('click', () => mostra(i + 1));
    // deslizar o dedo na tela do desenho também passa
    let x0 = null, y0 = 0;
    tela.addEventListener('touchstart', ev => { const t = ev.touches[0]; x0 = t.clientX; y0 = t.clientY; }, { passive: true });
    tela.addEventListener('touchend', ev => {
      if (x0 == null) return;
      const t = ev.changedTouches[0], dx = t.clientX - x0, dy = t.clientY - y0; x0 = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) mostra(i + (dx < 0 ? 1 : -1));
    }, { passive: true });
    const bt = $('#carregar-jogo');
    if (bt) bt.addEventListener('click', () => {
      carregado = true;
      tela.innerHTML = `<iframe src="${esc(AK.jogoURL())}" title="O jogo Astrokdok, dentro do celular desenhado" allow="fullscreen; autoplay"></iframe>`;
      $('#tela-controles').hidden = true;
      fala.textContent = 'O jogo está aqui dentro. Use as setas e os botões A e B da tela.';
      bt.hidden = true;
      const fj = $('iframe', tela);
      const ajustar = () => {
        const s = Math.min(1, tela.clientWidth / 360);
        Object.assign(fj.style, { width: tela.clientWidth / s + 'px', height: tela.clientHeight / s + 'px', transform: `scale(${s})`, transformOrigin: '0 0', right: 'auto', bottom: 'auto' });
      };
      ajustar(); addEventListener('resize', ajustar);
      fj.focus();
    });
  })();

  // =====================================================================
  // NUVENS DE MAGALHÃES: a transparência e quem faz
  // =====================================================================
  (() => {
    const t = $('#transparencia'); if (!t) return;
    const T = CFG.transparencia;
    if (!T) { t.innerHTML = '<div class="falta" data-falta="quanto entrou e para onde foi (js/config.js, transparencia), quando houver números"></div>'; return; }
    const foi = Array.isArray(T.foi) ? T.foi : [];
    t.innerHTML = `<div class="cartao transparencia"><p class="mono" style="margin:0">${esc(T.quando ? T.quando + ': ' : '')}entrou ${esc(T.entrou || '')}</p>${foi.length ? `<ul>${foi.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}</div>`;
  })();
  (() => {
    const f = $('#foto-jean');
    const semFoto = () => { f.innerHTML = ''; f.classList.add('falta'); f.dataset.falta = 'a foto do Jean (js/config.js, foto)'; };
    if (f) {
      const src = String(CFG.foto || '').trim();
      if (!src) semFoto();
      else {
        f.innerHTML = `<img src="${esc(src)}" width="112" height="112" alt="Jean, rindo, ao ar livre entre as árvores" loading="lazy" decoding="async">`;
        $('img', f).addEventListener('error', semFoto);
      }
    }
    const z = $('#falar-jean'); if (!z) return;
    const n = String(CFG.whatsappJean || '').replace(/\D/g, '');
    if (n) z.href = 'https://wa.me/' + n + '?text=' + encodeURIComponent('Oi, Jean. Vim pela página do Astrokdok.');
    else { z.removeAttribute('href'); z.classList.add('falta'); z.dataset.falta = 'o WhatsApp do Jean (js/config.js, whatsappJean)'; }
  })();

  // =====================================================================
  // ANDRÔMEDA: novidades por e-mail (o formulário do esboço de 02/11, com a isca "site")
  // =====================================================================
  (() => {
    const f = $('#novidades'); if (!f) return;
    const msg = $('#form-msg');
    // o recebedor só aceita a página publicada e a prévia do PC; fora disso, nem tenta
    const origemAceita = location.hostname === 'jeandsprestes.github.io' || PREVIA;
    f.addEventListener('submit', async ev => {
      ev.preventDefault();
      if (!f.email.value.trim() || !f.email.checkValidity()) { msg.textContent = 'Confira o e-mail.'; f.email.focus(); return; }
      if (!f.aceite.checked) { msg.textContent = 'Marque a caixa de aceite para entrar na lista.'; f.aceite.focus(); return; }
      if (!origemAceita || !CFG.novidades) { msg.textContent = 'Por aqui a inscrição não passa: a lista só aceita pela página publicada do Astrokdok. Nada foi enviado.'; return; }
      const dados = { nome: f.nome.value.trim(), email: f.email.value.trim(), cidade: f.cidade.value.trim(), origem: f.origem.value, aceite: true, site: f.site.value };
      const b = $('button[type="submit"]', f); b.disabled = true; msg.textContent = 'Enviando...';
      try {
        const r = await fetch(CFG.novidades, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dados) });
        if (!r.ok) throw new Error(String(r.status));
        f.reset(); msg.textContent = 'Pronto. Você vai receber as novidades do Astrokdok.';
      } catch (_) { msg.textContent = 'Não foi agora. Tente de novo daqui a pouco.'; }
      b.disabled = false;
    });
  })();

  // =====================================================================
  // A BORDA: voltar para a base e mandar para alguém
  // =====================================================================
  (() => {
    const v = $('#voltar-base');
    if (v) v.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: AK.reduzido ? 'auto' : 'smooth' });
      const j = $('#jogar'); if (j) setTimeout(() => j.focus({ preventScroll: true }), AK.reduzido ? 0 : 900);
    });
    const m = $('#mandar'); if (m) m.addEventListener('click', () => AK.compartilhar());
  })();

  // =====================================================================
  // O CARREGADOR DE MÓDULOS: cada [data-modulo] monta quando chega perto da tela.
  // Módulo que falha ou não veio não derruba nada: o conteúdo simples de reserva fica no lugar.
  // =====================================================================
  const montados = new WeakSet();
  function montarModulo(el, opcoes) {
    if (montados.has(el)) return true;
    const nome = el.dataset.modulo, mod = AK[nome];
    if (!mod || typeof mod.montar !== 'function') return false;
    montados.add(el);
    const reserva = el.innerHTML;
    const falhou = erro => { el.innerHTML = reserva; el.classList.remove('montado'); console.error(`[Astrokdok] o módulo "${nome}" não montou:`, erro); };
    el.innerHTML = ''; el.classList.add('montado');
    try { const r = mod.montar(el, opcoes || {}); if (r && typeof r.then === 'function') r.then(null, falhou); }
    catch (erro) { falhou(erro); }
    return true;
  }
  AK.montarModulos = () => $$('[data-modulo]').forEach(el => montarModulo(el));
  let iniciado = false;
  function iniciarModulos() {
    if (iniciado) return; iniciado = true;
    const els = $$('[data-modulo]');
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(entradas => entradas.forEach(en => { if (en.isIntersecting && montarModulo(en.target)) io.unobserve(en.target); }), { rootMargin: '200px 0px' });
      els.forEach(el => io.observe(el));
    } else els.forEach(el => montarModulo(el));
    // #missao-N: abre a sala das missões direto na missão N
    const irParaMissao = () => {
      const r = /^#missao-(\d{1,2})$/.exec(location.hash); if (!r) return;
      const el = $('[data-modulo="missoes"]'); if (!el) return;
      montarModulo(el, { missao: +r[1] });
      requestAnimationFrame(() => requestAnimationFrame(() => (document.getElementById('missao-' + r[1]) || el).scrollIntoView({ block: 'start' })));
    };
    irParaMissao();
    addEventListener('hashchange', irParaMissao);
  }
  // os módulos (js/lua.js, js/missoes.js...) vêm depois deste arquivo: o carregador começa quando todos já se registraram
  document.addEventListener('DOMContentLoaded', iniciarModulos, { once: true });
  addEventListener('load', iniciarModulos, { once: true });
})();
