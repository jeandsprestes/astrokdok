/* Astrokdok · a sala das missões (o módulo "missoes" da página).
   AK.missoes.montar(el) monta dentro de el:
   - a faixa dos destinos, separada pelos episódios, com a patente de cada episódio (setas e teclado);
   - o filtro "A matéria que a escola está dando";
   - o cartão da missão escolhida, no papel do jogo, com as abas AULAS, MINIJOGO, COSMODEX e DE VERDADE.
   Tudo vem do jogo: AK.dados (window.ASTROKDOK_DADOS). Os desafios só carregam quando a pessoa pede um
   (AK.carregarDesafios() ou, sem ele, js/desafios.js injetado daqui). Nenhum número escrito à mão.
   O endereço #missao-N abre a missão N; escolher uma missão troca o endereço sem pular a página.
   Toda arte do jogo em escala inteira (1x ou 2x), com image-rendering: pixelated. LOOMB, 05/11/2026. */
(function () {
  'use strict';
  var AK = window.AK = window.AK || {};

  // a pasta da página (a de cima de js/), tirada do endereço deste arquivo: serve à página e às páginas de prova
  var RAIZ = '';
  try { var eu = document.currentScript; if (eu && eu.src) RAIZ = new URL('../', eu.src).href; } catch (e) { RAIZ = ''; }
  var arte = function (f) { return RAIZ + 'img/jogo/' + f; };

  // a arte de cada missão em img/jogo (tamanhos de img/jogo/assets.json):
  // [corpo celeste, largura, altura, foco x, foco y (o ponto que a escotilha mostra, em 1x), base de lançamento]
  var ARTE = [
    ['terra', 89, 89, 44, 44, 'capao'],
    ['lua', 61, 61, 30, 30, 'alcantara'],
    ['sol', 113, 113, 56, 56, 'atacama'],
    ['mercurio', 101, 101, 50, 50, 'roma'],
    ['venus', 101, 101, 50, 50, 'manaus'],
    ['marte_superficie', 160, 144, 112, 88, 'cabo_canaveral'],
    ['asteroides', 160, 128, 86, 59, 'tanegashima'],
    ['jupiter', 141, 111, 70, 55, 'kourou'],
    ['saturno', 141, 86, 70, 43, 'baikonur'],
    ['urano', 81, 113, 40, 56, 'greenwich'],
    ['netuno', 109, 91, 45, 46, 'sriharikota'],
    ['plutao', 117, 97, 47, 51, 'antartida'],
    ['proxima_centauri', 116, 102, 67, 47, 'uluru'],
    ['nebulosa_orion', 160, 144, 80, 72, 'chichen_itza'],
    ['sagitario_a', 125, 49, 62, 24, 'mauna_kea'],
    ['via_lactea_magalhaes', 137, 114, 63, 56, 'lisboa'],
    ['andromeda', 109, 57, 54, 28, 'gize'],
    ['radiacao_fundo', 154, 101, 76, 50, 'capao_noite']
  ];
  var TELA_L = 160, TELA_A = 144; // a tela do jogo
  var ORDEM_MATERIAS = ['MATEMÁTICA', 'PORTUGUÊS', 'INGLÊS', 'CIÊNCIAS', 'GEOGRAFIA', 'HISTÓRIA', 'ASTRONOMIA'];
  var NAO_E_MATERIA = ['PROVA FINAL']; // a prova final da missão 18 mistura todas
  var POR_EXTENSO = ['Nenhuma', 'Uma', 'Duas', 'Três', 'Quatro', 'Cinco', 'Seis'];
  var ABAS = [['aulas', 'AULAS'], ['minijogo', 'MINIJOGO'], ['cosmodex', 'COSMODEX'], ['real', 'DE VERDADE']];

  var pad2 = function (n) { return (n < 10 ? '0' : '') + n; };
  var esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  var materiaDe = function (L) { return String((L && L.materia) || '').split(' · ')[0].trim(); };
  var fmtN = function (n) { try { return Number(n).toLocaleString('pt-BR'); } catch (e) { return String(n); } };
  var miudas = { de: 1, do: 1, da: 1, dos: 1, das: 1, e: 1, o: 1, a: 1, ou: 1 };
  var bonito = function (s) { // "NUVENS DE MAGALHÃES" -> "Nuvens de Magalhães" (para leitor de tela e texto alternativo)
    return String(s || '').toLowerCase().split(' ').map(function (p, i) {
      return i && miudas[p] ? p : p.charAt(0).toUpperCase() + p.slice(1);
    }).join(' ');
  };
  var plural = function (n, um, varios) { return n + ' ' + (n === 1 ? um : varios); };
  // "CONSELHEIRO ou CONSELHEIRA" -> "CONSELHEIRO/A" (só na faixa; o leitor de tela ouve as duas palavras inteiras)
  var patenteCurta = function (p) {
    return String(p || '').toUpperCase().replace(/^(\S+) OU (\S+)/, function (_, a, b) {
      var i = 0; while (i < a.length && i < b.length && a.charAt(i) === b.charAt(i)) i++;
      var resto = b.slice(i);
      return resto && i >= a.length - 1 ? a + '/' + resto : a + '/' + b;
    });
  };
  var embaralha = function (n) {
    var o = []; for (var i = 0; i < n; i++) o.push(i);
    for (var j = n - 1; j > 0; j--) { var k = Math.floor(Math.random() * (j + 1)), t = o[j]; o[j] = o[k]; o[k] = t; }
    return o;
  };

  // um triângulo de pixels (5x9), para as setas
  function seta(dir) {
    var r = '';
    for (var k = 0; k < 9; k++) { var w = 5 - Math.abs(k - 4); r += '<rect x="' + (dir < 0 ? 5 - w : 0) + '" y="' + k + '" width="' + w + '" height="1"/>'; }
    return '<svg viewBox="0 0 5 9" width="10" height="18" aria-hidden="true" focusable="false" shape-rendering="crispEdges" fill="currentColor">' + r + '</svg>';
  }
  // a divisa da patente: duas setas para cima, em pixel
  var DIVISA = '<svg class="mi-divisa" viewBox="0 0 7 6" width="14" height="12" aria-hidden="true" focusable="false" shape-rendering="crispEdges" fill="currentColor">' +
    '<path d="M3 0h1v1H3zM2 1h1v1H2zM4 1h1v1H4zM1 2h1v1H1zM5 2h1v1H5zM3 3h1v1H3zM2 4h1v1H2zM4 4h1v1H4zM1 5h1v1H1zM5 5h1v1H5z"/></svg>';

  // céu de pixels (160x144, sempre o mesmo) e a listra amarela e preta da agência, pintados com os tokens da página
  function cor(el, nome, reserva) {
    try { var v = getComputedStyle(el).getPropertyValue(nome).trim(); return v || reserva; } catch (e) { return reserva; }
  }
  function pintaCeu(el) {
    try {
      var c = document.createElement('canvas'); c.width = TELA_L; c.height = TELA_A;
      var x = c.getContext('2d'); if (!x) return '';
      var cores = [cor(el, '--texto', '#E6E8F0'), cor(el, '--portal', '#9DA9FF'), cor(el, '--apagado', '#8A90A6'), cor(el, '--linha2', '#2A2F4A')];
      var s = 20261105, r = function () { s = (s * 16807) % 2147483647; return s / 2147483647; };
      for (var i = 0; i < 64; i++) {
        x.fillStyle = cores[i < 8 ? 0 : i < 18 ? 1 : i < 40 ? 2 : 3];
        x.fillRect(Math.floor(r() * TELA_L), Math.floor(r() * TELA_A), 1, 1);
      }
      for (var k = 0; k < 3; k++) {
        var px = 6 + Math.floor(r() * (TELA_L - 12)), py = 6 + Math.floor(r() * (TELA_A - 12));
        x.fillStyle = cores[1]; x.fillRect(px - 1, py, 3, 1); x.fillRect(px, py - 1, 1, 3);
        x.fillStyle = cores[0]; x.fillRect(px, py, 1, 1);
      }
      return c.toDataURL('image/png');
    } catch (e) { return ''; }
  }
  function pintaListra(el) {
    try {
      var c = document.createElement('canvas'); c.width = 8; c.height = 8;
      var x = c.getContext('2d'); if (!x) return '';
      var a = cor(el, '--amarelo', '#f2c200'), p = cor(el, '--preto', '#0e0e0e');
      for (var y = 0; y < 8; y++) for (var i = 0; i < 8; i++) { x.fillStyle = (i + y) % 8 < 4 ? a : p; x.fillRect(i, y, 1, 1); }
      return c.toDataURL('image/png');
    } catch (e) { return ''; }
  }

  // os desafios: só quando a pessoa pede (AK.carregarDesafios, ou js/desafios.js injetado uma vez)
  var promessa = null;
  function carregarDesafios() {
    if (window.ASTROKDOK_DESAFIOS) return Promise.resolve(window.ASTROKDOK_DESAFIOS);
    if (typeof AK.carregarDesafios === 'function') {
      try {
        return Promise.resolve(AK.carregarDesafios()).then(function (d) {
          d = d || window.ASTROKDOK_DESAFIOS; if (!d) throw new Error('sem desafios'); return d;
        });
      } catch (e) { /* segue para o plano B */ }
    }
    if (!promessa) {
      promessa = new Promise(function (ok, falha) {
        var s = document.createElement('script');
        s.src = RAIZ + 'js/desafios.js'; s.async = true;
        s.onload = function () { if (window.ASTROKDOK_DESAFIOS) ok(window.ASTROKDOK_DESAFIOS); else { promessa = null; falha(new Error('vazio')); } };
        s.onerror = function () { promessa = null; if (s.parentNode) s.parentNode.removeChild(s); falha(new Error('rede')); };
        document.head.appendChild(s);
      });
    }
    return promessa;
  }

  var contador = 0;

  function montar(el) {
    if (!el || el.__miMontada) return;
    el.__miMontada = true;
    var D = AK.dados || window.ASTROKDOK_DADOS;
    if (!D || !D.missoes || !D.missoes.length) {
      el.innerHTML = '<p class="mi-vazio">As missões não carregaram. Recarregue a página para tentar de novo.</p>';
      return;
    }
    var id = 'mi' + (++contador) + '-';
    var MS = D.missoes, EPS = D.episodios || [], TOTAL = MS.length;
    var reduzido = function () {
      if (AK.reduzido === true) return true;
      try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; }
    };
    var epDe = function (n) {
      for (var k = 0; k < EPS.length; k++) if (n <= EPS[k].ateMissao) return EPS[k];
      return EPS[EPS.length - 1] || null;
    };
    var temMateria = function (M, nome) { return M.aulas.some(function (L) { return materiaDe(L) === nome; }); };
    var aulaDaMateria = function (M, nome) {
      if (!nome) return 0;
      for (var j = 0; j < M.aulas.length; j++) if (materiaDe(M.aulas[j]) === nome) return j;
      return 0;
    };

    // as matérias que existem nos dados, na ordem da escola
    var MATS = [];
    MS.forEach(function (M) {
      M.aulas.forEach(function (L) { var b = materiaDe(L); if (b && NAO_E_MATERIA.indexOf(b) < 0 && MATS.indexOf(b) < 0) MATS.push(b); });
    });
    var pos = function (m) { var k = ORDEM_MATERIAS.indexOf(m); return k < 0 ? 99 : k; };
    MATS.sort(function (a, b) { return pos(a) - pos(b); });

    var st = { i: 0, aba: 'aulas', materia: null, aulaJ: 0, modo: false, carga: 'nada', des: null };
    var TODOS = null; // os desafios, quando carregados
    var cacheAula = {};

    // ---------- o esqueleto ----------
    var grupos = [];
    MS.forEach(function (M, i) {
      var E = epDe(M.n), g = grupos[grupos.length - 1];
      if (!g || g.E !== E) grupos.push(g = { E: E, itens: [] });
      g.itens.push(i);
    });
    var htmlFaixa = grupos.map(function (g) {
      var E = g.E, cab = '', rot = '';
      if (E) {
        cab = '<p class="mi-ep-cab" aria-hidden="true"><span class="mi-ep-n">EPISÓDIO ' + E.n + '</span>' +
          '<span class="mi-ep-pat">' + DIVISA + '<span>' + esc(patenteCurta(E.patente)) + '</span></span></p>';
        rot = ' aria-label="' + esc('Episódio ' + E.n + ' de ' + EPS.length + ': ' + E.titulo + '. No fim dele, a patente de ' + String(E.patente).toLowerCase() + '.') + '"';
      }
      return '<div class="mi-ep" role="group"' + rot + '>' + cab + '<div class="mi-ep-lista">' + g.itens.map(function (i) {
        var M = MS[i], A = ARTE[i], nome = bonito(M.nome);
        var img = A ? '<img src="' + arte('corpo_' + A[0] + '.png') + '" width="' + A[1] + '" height="' + A[2] + '" alt="" loading="lazy" decoding="async" style="--fx:' + A[3] + 'px;--fy:' + A[4] + 'px">' : '';
        return '<button type="button" class="mi-dest" data-i="' + i + '" tabindex="-1" title="Missão ' + M.n + ' · ' + esc(nome) + '">' +
          '<span class="mi-esc" style="--bx:' + ((M.n * 37) % TELA_L) + ';--by:' + ((M.n * 23) % TELA_A) + '">' + img + '</span>' +
          '<span class="mi-dest-n" aria-hidden="true">' + pad2(M.n) + '</span><span class="mi-sr">Missão ' + M.n + ': ' + esc(nome) + '</span></button>';
      }).join('') + '</div></div>';
    }).join('');

    var htmlMats = ['TODAS'].concat(MATS).map(function (m) {
      return '<button type="button" class="mi-mat" data-materia="' + esc(m === 'TODAS' ? '' : m) + '" aria-pressed="' + (m === 'TODAS') + '">' + esc(m) + '</button>';
    }).join('');

    var htmlAbas = ABAS.map(function (a, k) {
      return '<button type="button" class="mi-aba" role="tab" id="' + id + 'aba-' + a[0] + '" data-aba="' + a[0] + '" aria-controls="' + id + 'painel" aria-selected="' + (k === 0) + '" tabindex="' + (k === 0 ? 0 : -1) + '">' + a[1] + '</button>';
    }).join('');

    el.innerHTML =
      '<div class="mi" id="' + id + 'raiz">' +
        '<div class="mi-console">' +
          '<div class="mi-barra">' +
            '<span class="mi-barra-tit">ESCOLHER MISSÃO</span>' +
            '<div class="mi-nav">' +
              '<button type="button" class="mi-seta" data-passo="-1" aria-label="Missão anterior">' + seta(-1) + '</button>' +
              '<span class="mi-cont" aria-hidden="true"></span>' +
              '<button type="button" class="mi-seta" data-passo="1" aria-label="Próxima missão">' + seta(1) + '</button>' +
            '</div>' +
          '</div>' +
          '<div class="mi-listra" aria-hidden="true"></div>' +
          '<div class="mi-faixa"><div class="mi-trilho" role="group" aria-label="' + esc('As ' + TOTAL + ' missões, por episódio. Use as setas do teclado para trocar.') + '"><div class="mi-trilho-in">' + htmlFaixa + '</div></div></div>' +
        '</div>' +
        '<div class="mi-filtro">' +
          '<span class="mi-filtro-rot" id="' + id + 'rot">A MATÉRIA QUE A ESCOLA ESTÁ DANDO</span>' +
          '<div class="mi-mats" role="group" aria-labelledby="' + id + 'rot">' + htmlMats + '</div>' +
          '<div class="mi-achado" hidden></div>' +
        '</div>' +
        '<article class="mi-cartao" aria-labelledby="' + id + 'obj">' +
          '<div class="mi-c-id"></div>' +
          '<div class="mi-c-ct">' +
            '<div class="mi-abas" role="tablist" aria-label="Partes da missão">' + htmlAbas + '</div>' +
            '<div class="mi-painel" id="' + id + 'painel" role="tabpanel" aria-labelledby="' + id + 'aba-aulas"></div>' +
          '</div>' +
        '</article>' +
        '<p class="mi-sr" aria-live="polite"></p>' +
      '</div>';

    var raiz = el.querySelector('.mi');
    var trilho = raiz.querySelector('.mi-trilho');
    var achado = raiz.querySelector('.mi-achado');
    var cId = raiz.querySelector('.mi-c-id');
    var painel = raiz.querySelector('.mi-painel');
    var abasEl = raiz.querySelector('.mi-abas');
    var falaSr = raiz.querySelector('.mi-sr[aria-live]');
    var ceu = pintaCeu(raiz), listra = pintaListra(raiz);
    if (ceu) raiz.style.setProperty('--mi-ceu', 'url("' + ceu + '")');
    if (listra) raiz.style.setProperty('--mi-listra', 'url("' + listra + '")');
    var anunciar = function (t) { falaSr.textContent = ''; setTimeout(function () { falaSr.textContent = t; }, 30); };

    // ---------- a faixa ----------
    function pintarFaixa(foco) {
      var M = MS[st.i];
      raiz.querySelector('.mi-cont').innerHTML = '<b>' + pad2(M.n) + '</b>/' + pad2(TOTAL);
      var setas = raiz.querySelectorAll('.mi-seta');
      setas[0].setAttribute('aria-disabled', String(st.i === 0));
      setas[1].setAttribute('aria-disabled', String(st.i === TOTAL - 1));
      var atual = null;
      Array.prototype.forEach.call(raiz.querySelectorAll('.mi-dest'), function (b) {
        var i = +b.getAttribute('data-i'), M2 = MS[i], este = i === st.i;
        var tem = !!st.materia && temMateria(M2, st.materia), fora = !!st.materia && !tem;
        b.setAttribute('aria-current', String(este));
        b.tabIndex = este ? 0 : -1;
        b.classList.toggle('is-tem', tem);
        b.classList.toggle('is-fora', fora);
        b.querySelector('.mi-sr').textContent = 'Missão ' + M2.n + ': ' + bonito(M2.nome) + (fora ? ', sem aula de ' + bonito(st.materia) : '');
        if (este) atual = b;
      });
      Array.prototype.forEach.call(achado.querySelectorAll('.mi-achou'), function (b) {
        b.setAttribute('aria-current', String(+b.getAttribute('data-i') === st.i));
      });
      if (!atual) return;
      if (foco) { try { atual.focus({ preventScroll: true }); } catch (e) { atual.focus(); } }
      centrar(trilho, atual);
    }
    function centrar(caixa, item) {
      var r = item.getBoundingClientRect(), c = caixa.getBoundingClientRect();
      if (!c.width) return;
      var alvo = caixa.scrollLeft + (r.left - c.left) - (c.width - r.width) / 2;
      try { caixa.scrollTo({ left: alvo, behavior: reduzido() ? 'auto' : 'smooth' }); } catch (e) { caixa.scrollLeft = alvo; }
    }

    // ---------- o cartão ----------
    function pintarIdentidade() {
      var M = MS[st.i], A = ARTE[st.i], E = epDe(M.n), carta = M.carta || { nome: M.nome, linhas: [] };
      var janela = '<div class="mi-janela">' + (A ? '<img src="' + arte('corpo_' + A[0] + '.png') + '" width="' + A[1] + '" height="' + A[2] +
        '" alt="' + esc(bonito(carta.nome) + ', como aparece no jogo') + '" loading="lazy" decoding="async" style="--w:' + A[1] + ';--h:' + A[2] +
        ';--l:' + Math.floor((TELA_L - A[1]) / 2) + ';--t:' + Math.floor((TELA_A - A[2]) / 2) + '">' : '') + '</div>';
      cId.innerHTML =
        '<div class="mi-etq"><span class="mi-tag">MISSÃO ' + M.n + ' DE ' + TOTAL + '</span>' +
          (M.baseReal ? '<span class="mi-selo is-verdade">BASE DE VERDADE</span>' : '<span class="mi-selo is-jogo">BASE DO JOGO</span>') + '</div>' +
        '<h3 class="mi-obj" id="' + id + 'obj">' + esc(M.objetivo) + '</h3>' +
        '<div class="mi-rota">' + janela +
          '<dl class="mi-info">' +
            '<div><dt>SAI DE</dt><dd>' + esc(M.onde) + '</dd></div>' +
            '<div><dt>DESTINO</dt><dd>' + esc(carta.nome) + '</dd></div>' +
            (E ? '<div><dt>EPISÓDIO ' + E.n + ' DE ' + EPS.length + '</dt><dd>' + esc(E.titulo) + '</dd></div>' : '') +
          '</dl>' +
          '<div class="mi-acoes"><button type="button" class="mi-btn" data-acao="mandar">MANDAR ESTA MISSÃO</button><p class="mi-msg" aria-live="polite"></p></div>' +
        '</div>';
    }

    function pintarAbas() {
      Array.prototype.forEach.call(abasEl.querySelectorAll('.mi-aba'), function (b) {
        var on = b.getAttribute('data-aba') === st.aba;
        b.setAttribute('aria-selected', String(on));
        b.tabIndex = on ? 0 : -1;
      });
      painel.setAttribute('aria-labelledby', id + 'aba-' + st.aba);
    }

    function pintarPainel() {
      var M = MS[st.i];
      if (st.aba === 'aulas') {
        var aviso = st.materia && !temMateria(M, st.materia) ? '<p class="mi-aviso">ESTA MISSÃO NÃO TEM AULA DE ' + esc(st.materia) + '.</p>' : '';
        painel.innerHTML = aviso +
          '<p class="mi-nota">' + (POR_EXTENSO[M.aulas.length] || M.aulas.length) + ' aulas antes da viagem:</p>' +
          '<ul class="mi-aulas">' + M.aulas.map(function (L, j) {
            return '<li><button type="button" class="mi-aula" data-j="' + j + '" aria-pressed="' + (j === st.aulaJ) + '">' +
              '<span class="mi-aula-mat">' + esc(L.materia) + '</span><span class="mi-aula-tit">' + esc(L.titulo) + '</span>' +
              '<span class="mi-aula-qtd">' + plural(L.desafios, 'DESAFIO', 'DESAFIOS') + '</span></button></li>';
          }).join('') + '</ul>' +
          '<div class="mi-desafio"></div>';
        pintarDesafio();
      } else if (st.aba === 'minijogo') {
        var A = ARTE[st.i], falas = [], quem = '';
        (M.instrucoes || []).forEach(function (f) {
          // o dado traz só o texto; a fala que começa com "Bip" é do KDOK, e as seguintes continuam com ele
          var t = typeof f === 'string' ? f : (f && f.t) || '', q = f && f.quem ? f.quem : (/^bip/i.test(t) ? 'KDOK' : '');
          falas.push('<p class="mi-fala">' + (q && q !== quem ? '<b class="mi-quem">' + esc(q) + ':</b> ' : '') + esc(t) + '</p>');
          if (q) quem = q;
        });
        var tela = function (arq, alt, cls) {
          return '<img class="mi-tela ' + (cls || '') + '" src="' + arte(arq) + '" width="' + TELA_L + '" height="' + TELA_A + '" alt="' + esc(alt) + '" loading="lazy" decoding="async">';
        };
        painel.innerHTML = '<div class="mi-mini">' +
          (A ? '<figure class="mi-fig mi-fig-mini">' + tela('mini_' + pad2(M.n) + '_' + M.minijogo + '.png', 'Tela do minijogo da missão ' + M.n + ', no jogo: ' + M.objetivo + '.', 'mi-tela-g') +
            '<figcaption>O MINIJOGO DA MISSÃO ' + M.n + '</figcaption></figure>' : '') +
          '<div class="mi-falas"><img class="mi-kdok" src="' + arte('personagem_kdok.png') + '" width="16" height="16" alt="KDOK, o robô da Astrokdok" loading="lazy" decoding="async"><div>' + falas.join('') + '</div></div>' +
          (A ? '<figure class="mi-fig mi-fig-base">' + tela('base_' + pad2(M.n) + '_' + A[5] + '.png', 'A base de lançamento da missão ' + M.n + ', no jogo: ' + M.onde + '.', 'mi-tela-b') +
            '<figcaption><span class="mi-fig-rot">A BASE DE LANÇAMENTO</span> ' + esc(M.onde) + (M.baseReal ? '. Ela existe de verdade.' : '. Esta base só existe no jogo.') + '</figcaption></figure>' : '') +
          '</div>';
      } else if (st.aba === 'cosmodex') {
        var A2 = ARTE[st.i], C = M.carta || { nome: M.nome, linhas: [] };
        painel.innerHTML = '<div class="mi-carta">' +
          '<div class="mi-carta-topo"><span>COSMODEX</span><span>REGISTRO ' + M.n + ' DE ' + TOTAL + '</span></div>' +
          '<div class="mi-carta-cab">' + (A2 ? '<span class="mi-esc mi-esc-carta" style="--bx:' + ((M.n * 37) % TELA_L) + ';--by:' + ((M.n * 23) % TELA_A) + '"><img src="' + arte('corpo_' + A2[0] + '.png') + '" width="' + A2[1] + '" height="' + A2[2] + '" alt="" loading="lazy" decoding="async" style="--fx:' + A2[3] + 'px;--fy:' + A2[4] + 'px"></span>' : '') +
          '<h4>' + esc(C.nome) + '</h4></div>' +
          '<ul>' + (C.linhas || []).map(function (l) { return '<li>' + esc(l) + '</li>'; }).join('') + '</ul></div>' +
          '<p class="mi-nota">No jogo, esta carta entra no Cosmodex no fim da missão ' + M.n + '.</p>';
      } else {
        painel.innerHTML = '<span class="mi-tag mi-tag-agencia">MISSÃO DE VERDADE</span>' +
          '<h4 class="mi-h4">PARA FAZER FORA DO JOGO</h4>' +
          '<blockquote class="mi-real"><p>"' + esc(M.foraDaTela) + '"</p></blockquote>' +
          '<p class="mi-nota">Texto do jogo. A tarefa aparece no fim da missão ' + M.n + ' e fica guardada no menu, em MISSÕES DE VERDADE.</p>';
      }
    }

    // ---------- o desafio (só na aba AULAS) ----------
    function listaDaAula(M, L) {
      var chave = M.n + '|' + L.materia + '|' + L.titulo;
      if (cacheAula[chave]) return cacheAula[chave];
      var l = TODOS.filter(function (d) { return d.m === M.n && d.materia === L.materia && d.aula === L.titulo; });
      if (!l.length) l = TODOS.filter(function (d) { return d.m === M.n && d.materia === L.materia; });
      if (!l.length) l = TODOS.filter(function (d) { return d.m === M.n; });
      return (cacheAula[chave] = l);
    }
    function desafioAtual() {
      var M = MS[st.i], L = M.aulas[st.aulaJ] || M.aulas[0];
      if (!L || !TODOS) return null;
      var chave = M.n + '|' + st.aulaJ;
      if (!st.des || st.des.chave !== chave) {
        var lista = listaDaAula(M, L);
        st.des = { chave: chave, lista: lista, ordem: embaralha(lista.length), pos: 0, erros: 0, fim: false, certo: false, riscadas: [], fb: '' };
      }
      return st.des.lista.length ? st.des.lista[st.des.ordem[st.des.pos % st.des.ordem.length]] : null;
    }
    function pintarDesafio(focar) {
      var caixa = painel.querySelector('.mi-desafio');
      if (!caixa) return;
      if (!st.modo) {
        caixa.innerHTML = '<button type="button" class="mi-btn is-prim mi-largo" data-acao="desafio">TENTAR UM DESAFIO DESTA AULA ▶</button>';
        return;
      }
      if (st.carga === 'carregando' || st.carga === 'nada') { caixa.innerHTML = '<p class="mi-carregando" role="status">CARREGANDO OS DESAFIOS DO JOGO...</p>'; return; }
      if (st.carga === 'erro') {
        caixa.innerHTML = '<p class="mi-retorno is-no" role="status">Não deu para carregar os desafios agora.</p>' +
          '<button type="button" class="mi-btn mi-largo" data-acao="desafio">TENTAR DE NOVO</button>';
        return;
      }
      var d = desafioAtual(), S = st.des;
      if (!d) { caixa.innerHTML = '<p class="mi-nota">Esta aula ainda não tem desafio.</p>'; return; }
      var k = S.lista.indexOf(d) + 1, h = '';
      h += '<span class="mi-tag">' + esc(d.materia) + ' · DESAFIO ' + k + ' DE ' + S.lista.length + '</span>';
      h += '<p class="mi-perg" tabindex="-1">' + esc(d.p) + '</p>';
      if (d.tipo === 'numero' && d.conta) h += '<p class="mi-conta"><span class="mi-sr">Conta de apoio: </span>' + esc(d.conta) + '</p>';
      if (d.tipo === 'opcoes') {
        h += '<div class="mi-opcs" role="group" aria-label="Respostas">' + d.o.map(function (o, n) {
          var certa = S.fim && S.certo && n === d.a, riscada = S.riscadas.indexOf(n) >= 0;
          return '<button type="button" class="mi-opc' + (certa ? ' is-certa' : '') + '" data-op="' + n + '"' + ((S.fim && !certa) || riscada ? ' aria-disabled="true"' : '') + '>' + esc(o) + '</button>';
        }).join('') + '</div>';
      } else {
        var trava = S.fim ? ' aria-disabled="true" readonly' : '';
        h += '<form class="mi-num" novalidate><label class="mi-sr" for="' + id + 'num">Sua resposta, em número</label>' +
          '<input id="' + id + 'num" type="text" inputmode="numeric" autocomplete="off" enterkeyhint="done" placeholder="?"' + trava + (S.fim ? ' value="' + esc(fmtN(d.n)) + '"' : '') + '>' +
          '<button type="submit" class="mi-ok"' + (S.fim ? ' aria-disabled="true"' : '') + '>OK</button></form>';
      }
      h += '<div class="mi-fb" aria-live="polite">' + S.fb + '</div>';
      h += '<div class="mi-linha"><button type="button" class="mi-btn' + (S.fim ? ' is-prim' : '') + '" data-acao="outro">OUTRO DESAFIO ▶</button></div>';
      caixa.innerHTML = h;
      if (focar) { var p = caixa.querySelector('.mi-perg'); if (p) try { p.focus({ preventScroll: true }); } catch (e) { p.focus(); } }
    }
    function pedirDesafio() {
      st.modo = true;
      if (st.carga === 'ok') { pintarDesafio(true); return; }
      if (st.carga === 'carregando') return;
      st.carga = 'carregando'; pintarDesafio();
      carregarDesafios().then(function (lista) {
        TODOS = lista; st.carga = 'ok'; st.des = null;
        if (st.aba === 'aulas') pintarDesafio(true);
      }, function () {
        st.carga = 'erro';
        if (st.aba === 'aulas') pintarDesafio();
      });
    }
    function responder(n, botao) {
      var d = desafioAtual(), S = st.des;
      if (!d || S.fim || S.riscadas.indexOf(n) >= 0) return;
      var fb = painel.querySelector('.mi-fb');
      if (n === d.a) {
        S.fim = true; S.certo = true;
        S.fb = '<p class="mi-retorno is-ok"><b>CERTO.</b> ' + esc(d.porque) + '</p>';
        botao.classList.add('is-certa');
        Array.prototype.forEach.call(painel.querySelectorAll('.mi-opc'), function (b) { if (b !== botao) b.setAttribute('aria-disabled', 'true'); });
        var outro = painel.querySelector('[data-acao="outro"]'); if (outro) outro.classList.add('is-prim');
      } else {
        S.riscadas.push(n); S.erros++;
        S.fb = '<p class="mi-retorno is-no"><b>Ainda não.</b> ' + esc(d.dica || 'Pense de novo com calma.') + '</p>';
        botao.setAttribute('aria-disabled', 'true');
      }
      fb.innerHTML = S.fb;
    }
    function responderNumero(campo) {
      var d = desafioAtual(), S = st.des;
      if (!d || S.fim) return;
      var v = String(campo.value || '').replace(/\D/g, '');
      if (!v) { campo.focus(); return; }
      if (parseInt(v, 10) === Number(d.n)) {
        S.fim = true; S.certo = true;
        S.fb = '<p class="mi-retorno is-ok"><b>CERTO.</b> ' + esc(d.porque) + '</p>';
      } else {
        S.erros++;
        if (S.erros >= 3) { // como no jogo: na terceira tentativa, a resposta aparece com o porquê
          S.fim = true;
          S.fb = '<p class="mi-retorno is-ok"><b>A resposta é ' + esc(fmtN(d.n)) + '.</b> ' + esc(d.porque) + '</p>';
        } else {
          S.fb = '<p class="mi-retorno is-no"><b>Ainda não.</b> ' + esc(d.dica || 'Faça a conta devagar.') + '</p>';
          campo.value = '';
          painel.querySelector('.mi-fb').innerHTML = S.fb;
          campo.focus();
          return;
        }
      }
      pintarDesafio();
      var ok = painel.querySelector('[data-acao="outro"]'); if (ok) ok.focus({ preventScroll: true });
    }

    // ---------- escolher ----------
    function escolher(i, op) {
      op = op || {};
      var novo = Math.max(0, Math.min(TOTAL - 1, i)), mudou = novo !== st.i;
      st.i = novo;
      if (op.aba) st.aba = op.aba;
      st.aulaJ = op.aula != null ? op.aula : aulaDaMateria(MS[st.i], st.materia);
      if (mudou || op.aula != null) st.des = null;
      if (op.endereco !== false) { try { history.replaceState(history.state, '', '#missao-' + MS[st.i].n); } catch (e) { /* sem histórico, segue */ } }
      pintarFaixa(op.foco);
      pintarIdentidade();
      pintarAbas();
      pintarPainel();
      if (op.anunciar) anunciar('Missão ' + MS[st.i].n + ' de ' + TOTAL + ', ' + bonito(MS[st.i].nome) + ': ' + MS[st.i].objetivo + '.');
    }
    function mudarAba(nome, foco) {
      st.aba = nome;
      pintarAbas();
      pintarPainel();
      if (foco) { var b = raiz.querySelector('#' + id + 'aba-' + nome); if (b) b.focus(); }
    }
    function filtrar(nome) {
      st.materia = nome || null;
      Array.prototype.forEach.call(raiz.querySelectorAll('.mi-mat'), function (b) {
        b.setAttribute('aria-pressed', String((b.getAttribute('data-materia') || null) === st.materia));
      });
      if (!st.materia) {
        achado.hidden = true; achado.innerHTML = '';
        escolher(st.i, { endereco: false });
        anunciar('Todas as matérias.');
        return;
      }
      var lista = [], missoes = {};
      MS.forEach(function (M, i) {
        M.aulas.forEach(function (L, j) { if (materiaDe(L) === st.materia) { lista.push({ i: i, j: j, M: M, L: L }); missoes[i] = 1; } });
      });
      var nm = Object.keys(missoes).length;
      achado.hidden = false;
      achado.innerHTML = '<p class="mi-achado-txt">' + esc(st.materia) + ' EM ' + plural(nm, 'MISSÃO', 'MISSÕES') + ':</p>' +
        '<div class="mi-achado-lista">' + lista.map(function (x) {
          return '<button type="button" class="mi-achou" data-i="' + x.i + '" data-j="' + x.j + '" aria-label="' + esc('Missão ' + x.M.n + ', aula ' + x.L.titulo) + '"><b>' + pad2(x.M.n) + '</b> ' + esc(x.L.titulo) + '</button>';
        }).join('') + '</div>';
      var M = MS[st.i], alvo = st.i;
      if (!temMateria(M, st.materia) && lista.length) alvo = lista[0].i;
      escolher(alvo, { aba: 'aulas', endereco: alvo !== st.i });
      anunciar(bonito(st.materia) + ': ' + plural(nm, 'missão', 'missões') + ' com aula dessa matéria.');
      var at = achado.querySelector('.mi-achou[aria-current="true"]'); if (at) centrar(achado.querySelector('.mi-achado-lista'), at);
    }

    // ---------- mandar a missão ----------
    function textoMissao(M) {
      var aulas = M.aulas.map(function (L) { return L.titulo + ' (' + materiaDe(L).toLowerCase() + ')'; });
      var lista = aulas.length > 1 ? aulas.slice(0, -1).join(', ') + ' e ' + aulas[aulas.length - 1] : (aulas[0] || '');
      return 'Missão ' + M.n + ' do Astrokdok: ' + M.objetivo + '. Base de lançamento: ' + M.onde + '. As aulas: ' + lista +
        '. É um jogo educativo feito no Vale do Capão, para crianças de 8 a 12 anos, sem anúncio e sem cadastro:';
    }
    function mandar() {
      var M = MS[st.i], msg = raiz.querySelector('.mi-msg');
      var base = (AK.config && AK.config.enderecoFinal) || String(location.href).split('#')[0];
      var url = base + '#missao-' + M.n, texto = textoMissao(M);
      if (typeof AK.compartilhar === 'function') {
        try {
          msg.textContent = '';
          var p = AK.compartilhar({ titulo: 'Astrokdok, missão ' + M.n, texto: texto, url: url });
          if (p && typeof p.then === 'function') p.then(null, function () { /* a pessoa desistiu: tudo bem */ });
          return;
        } catch (e) { /* segue para o WhatsApp */ }
      }
      var wa = 'https://wa.me/?text=' + encodeURIComponent(texto + ' ' + url);
      try { window.open(wa, '_blank', 'noopener'); } catch (e) { /* o link abaixo resolve */ }
      msg.innerHTML = 'Se o WhatsApp não abriu, <a href="' + esc(wa) + '" target="_blank" rel="noopener">abra por aqui</a>.';
    }

    // ---------- eventos ----------
    raiz.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('button') : null;
      if (!b || !raiz.contains(b)) return;
      if (b.getAttribute('aria-disabled') === 'true') return;
      var acao = b.getAttribute('data-acao');
      if (b.hasAttribute('data-passo')) { escolher(st.i + +b.getAttribute('data-passo'), { anunciar: true }); return; }
      if (b.classList.contains('mi-dest')) { escolher(+b.getAttribute('data-i'), {}); return; }
      if (b.classList.contains('mi-mat')) { filtrar(b.getAttribute('data-materia')); return; }
      if (b.classList.contains('mi-achou')) { escolher(+b.getAttribute('data-i'), { aba: 'aulas', aula: +b.getAttribute('data-j'), anunciar: true }); return; }
      if (b.classList.contains('mi-aba')) { mudarAba(b.getAttribute('data-aba')); return; }
      if (b.classList.contains('mi-aula')) {
        var j = +b.getAttribute('data-j');
        if (j !== st.aulaJ) { st.aulaJ = j; st.des = null; }
        Array.prototype.forEach.call(painel.querySelectorAll('.mi-aula'), function (x) { x.setAttribute('aria-pressed', String(+x.getAttribute('data-j') === st.aulaJ)); });
        pedirDesafio();
        return;
      }
      if (b.classList.contains('mi-opc')) { responder(+b.getAttribute('data-op'), b); return; }
      if (acao === 'desafio') { pedirDesafio(); return; }
      if (acao === 'outro') {
        if (st.des) { st.des.pos++; st.des.erros = 0; st.des.fim = false; st.des.certo = false; st.des.riscadas = []; st.des.fb = ''; }
        pintarDesafio(true);
        return;
      }
      if (acao === 'mandar') mandar();
    });
    raiz.addEventListener('submit', function (e) {
      var f = e.target;
      if (!f.classList || !f.classList.contains('mi-num')) return;
      e.preventDefault();
      responderNumero(f.querySelector('input'));
    });
    trilho.addEventListener('keydown', function (e) {
      var d = { ArrowLeft: -1, ArrowRight: 1, Home: -TOTAL, End: TOTAL }[e.key];
      if (!d || !e.target.classList.contains('mi-dest')) return;
      e.preventDefault();
      escolher(+e.target.getAttribute('data-i') + d, { foco: true, anunciar: true });
    });
    abasEl.addEventListener('keydown', function (e) {
      var ordem = ABAS.map(function (a) { return a[0]; }), k = ordem.indexOf(e.target.getAttribute('data-aba') || st.aba);
      if (k < 0) k = ordem.indexOf(st.aba);
      var n = { ArrowLeft: k - 1, ArrowRight: k + 1, Home: 0, End: ordem.length - 1 }[e.key];
      if (n == null) return;
      e.preventDefault();
      mudarAba(ordem[(n + ordem.length) % ordem.length], true);
    });

    // ---------- o endereço #missao-N ----------
    var lerEndereco = function () {
      var m = /^#missao-(\d{1,3})$/.exec(location.hash || '');
      if (!m) return 0;
      var n = +m[1];
      for (var k = 0; k < TOTAL; k++) if (MS[k].n === n) return k + 1;
      return 0;
    };
    var mostrarSala = function () {
      var r = raiz.getBoundingClientRect(), h = window.innerHeight || 800;
      if (r.top < 0 || r.top > h * 0.6) { try { raiz.scrollIntoView({ block: 'start', behavior: reduzido() ? 'auto' : 'smooth' }); } catch (e) { raiz.scrollIntoView(); } }
    };
    window.addEventListener('hashchange', function () {
      var k = lerEndereco();
      if (!k) return;
      if (k - 1 !== st.i) escolher(k - 1, { endereco: false });
      mostrarSala();
    });

    var inicial = lerEndereco();
    escolher(inicial ? inicial - 1 : 0, { endereco: false });
    if (inicial) requestAnimationFrame(function () { requestAnimationFrame(mostrarSala); });
  }

  AK.missoes = { montar: montar };
})();
