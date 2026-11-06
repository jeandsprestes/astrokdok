// O céu do Vale do Capão: as contas do Sol e da Lua, feitas no aparelho de quem abre a página (nada sai dele).
// Sol: Jean Meeus, "Astronomical Algorithms", 2ª ed., cap. 25 (baixa precisão, uns 0,01 grau).
// Lua: cap. 47, com os termos das tabelas 47.A e 47.B. Fase, parte acesa e borda acesa: cap. 48.
// Altura e azimute: cap. 13. Ângulo paralático: cap. 14.
// Conferido em ferramentas/teste_lua.js: exemplos do livro e as fases do cap. 49 (outro método), em 2026 e 2027.
// O lugar é fixo, o Vale do Capão, e a hora é a de Brasília (UTC-3, sem horário de verão).
// Os horários saem com erro de um ou dois minutos; a página arredonda e diz "por volta de".
// LOOMB, 05/11/2026.
(function (raiz) {
  'use strict';
  const RAD = Math.PI / 180, DEG = 180 / Math.PI;
  const sin = x => Math.sin(x * RAD), cos = x => Math.cos(x * RAD), tan = x => Math.tan(x * RAD);
  const asin = x => Math.asin(Math.max(-1, Math.min(1, x))) * DEG;
  const atan2 = (y, x) => Math.atan2(y, x) * DEG;
  const n360 = x => ((x % 360) + 360) % 360;
  const jdOf = d => d.getTime() / 86400000 + 2440587.5;
  const dateOf = jd => new Date(Math.round((jd - 2440587.5) * 86400000));

  // o lugar: Caeté-Açu, o Vale do Capão (Palmeiras, Bahia)
  const LUGAR = { lat: -12.60, lon: -41.49, nome: 'Vale do Capão' };
  const FUSO = -3;          // horário de Brasília
  const DT = 69 / 86400;    // tempo dinâmico menos tempo universal: uns 69 segundos nestes anos

  const tOf = jde => (jde - 2451545) / 36525;
  const gmst = jd => { const T = tOf(jd); return n360(280.46061837 + 360.98564736629 * (jd - 2451545) + 0.000387933 * T * T - T * T * T / 38710000); };
  const eclEq = (lam, bet, eps) => ({
    ra: n360(atan2(sin(lam) * cos(eps) - tan(bet) * sin(eps), cos(lam))),
    dec: asin(sin(bet) * cos(eps) + cos(bet) * sin(eps) * sin(lam)),
  });

  // ---------- Sol (cap. 25), em tempo dinâmico
  function solTT(jde) {
    const T = tOf(jde);
    const L0 = n360(280.46646 + 36000.76983 * T + 0.0003032 * T * T);
    const M = n360(357.52911 + 35999.05029 * T - 0.0001537 * T * T);
    const e = 0.016708634 - 0.000042037 * T;
    const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * sin(M) + (0.019993 - 0.000101 * T) * sin(2 * M) + 0.000289 * sin(3 * M);
    const nu = M + C, R = 1.000001018 * (1 - e * e) / (1 + e * cos(nu));
    const Om = 125.04 - 1934.136 * T;
    const lam = n360(L0 + C - 0.00569 - 0.00478 * sin(Om));
    const eps = 23.439291 - 0.0130042 * T + 0.00256 * cos(Om);
    return Object.assign({ lam, R, eps }, eclEq(lam, 0, eps));
  }

  // ---------- Lua (cap. 47), em tempo dinâmico
  // [D, M, M', F, longitude (milionésimos de grau), distância (milésimos de km)]
  const LR = [
    [0,0,1,0,6288774,-20905355],[2,0,-1,0,1274027,-3699111],[2,0,0,0,658314,-2955968],[0,0,2,0,213618,-569925],
    [0,1,0,0,-185116,48888],[0,0,0,2,-114332,-3149],[2,0,-2,0,58793,246158],[2,-1,-1,0,57066,-152138],
    [2,0,1,0,53322,-170733],[2,-1,0,0,45758,-204586],[0,1,-1,0,-40923,-129620],[1,0,0,0,-34720,108743],
    [0,1,1,0,-30383,104755],[2,0,0,-2,15327,10321],[0,0,1,2,-12528,0],[0,0,1,-2,10980,79661],
    [4,0,-1,0,10675,-34782],[0,0,3,0,10034,-23210],[4,0,-2,0,8548,-21636],[2,1,-1,0,-7888,24208],
    [2,1,0,0,-6766,30824],[1,0,-1,0,-5163,-8379],[1,1,0,0,4987,-16675],[2,-1,1,0,4036,-12831],
    [2,0,2,0,3994,-10445],[4,0,0,0,3861,-11650],[2,0,-3,0,3665,14403],[0,1,-2,0,-2689,-7003],
    [2,0,-1,2,-2602,0],[2,-1,-2,0,2390,10056],[1,0,1,0,-2348,6322],[2,-2,0,0,2236,-9884],
    [0,1,2,0,-2120,5751],[0,2,0,0,-2069,0],[2,-2,-1,0,2048,-4950],[2,0,1,-2,-1773,4130],
    [2,0,0,2,-1595,0],[4,-1,-1,0,1215,-3958],[0,0,2,2,-1110,0],[3,0,-1,0,-892,3258],
    [2,1,1,0,-810,2616],[4,-1,-2,0,759,-1897],[0,2,-1,0,-713,-2117],[2,2,-1,0,-700,2354],
    [2,1,-2,0,691,0],[2,-1,0,-2,596,0],[4,0,1,0,549,-1423],[0,0,4,0,537,-1117],
    [4,-1,0,0,520,-1571],[1,0,-2,0,-487,-1739],[2,1,0,-2,-399,0],[0,0,2,-2,-381,-4421],
    [1,1,1,0,351,0],[3,0,-2,0,-340,0],[4,0,-3,0,330,0],[2,-1,2,0,327,0],
    [0,2,1,0,-323,1165],[1,1,-1,0,299,0],[2,0,3,0,294,0],[2,0,-1,-2,0,8752],
  ];
  // [D, M, M', F, latitude (milionésimos de grau)]
  const LB = [
    [0,0,0,1,5128122],[0,0,1,1,280602],[0,0,1,-1,277693],[2,0,0,-1,173237],[2,0,-1,1,55413],[2,0,-1,-1,46271],
    [2,0,0,1,32573],[0,0,2,1,17198],[2,0,1,-1,9266],[0,0,2,-1,8822],[2,-1,0,-1,8216],[2,0,-2,-1,4324],
    [2,0,1,1,4200],[2,1,0,-1,-3359],[2,-1,-1,1,2463],[2,-1,0,1,2211],[2,-1,-1,-1,2065],[0,1,-1,-1,-1870],
    [4,0,-1,-1,1828],[0,1,0,1,-1794],[0,0,0,3,-1749],[0,1,-1,1,-1565],[1,0,0,1,-1491],[0,1,1,1,-1475],
    [0,1,1,-1,-1410],[0,1,0,-1,-1344],[1,0,0,-1,-1335],[0,0,3,1,1107],[4,0,0,-1,1021],[4,0,-1,1,833],
    [0,0,1,-3,777],[4,0,-2,1,671],[2,0,0,-3,607],[2,0,2,-1,596],[2,-1,1,-1,491],[2,0,-2,1,-451],
    [0,0,3,-1,439],[2,0,2,1,422],[2,0,-3,-1,421],[2,1,-1,1,-366],[2,1,0,1,-351],[4,0,0,1,331],
    [2,-1,1,1,315],[2,-2,0,-1,302],[0,0,1,3,-283],[2,1,1,-1,-229],[1,1,0,-1,223],[1,1,0,1,223],
    [0,1,-2,-1,-220],[2,1,-1,-1,-220],[1,0,1,1,-185],[2,-1,-2,-1,181],[0,1,2,1,-177],[4,0,-2,-1,176],
    [4,-1,-1,-1,166],[1,0,1,-1,-164],[4,0,1,-1,132],[1,0,-1,-1,-119],[4,-1,0,-1,115],[2,-2,0,1,107],
  ];
  function luaTT(jde) {
    const T = tOf(jde), T2 = T * T, T3 = T2 * T, T4 = T3 * T;
    const Lp = n360(218.3164477 + 481267.88123421 * T - 0.0015786 * T2 + T3 / 538841 - T4 / 65194000);
    const D = n360(297.8501921 + 445267.1114034 * T - 0.0018819 * T2 + T3 / 545868 - T4 / 113065000);
    const M = n360(357.5291092 + 35999.0502909 * T - 0.0001536 * T2 + T3 / 24490000);
    const Mp = n360(134.9633964 + 477198.8675055 * T + 0.0087414 * T2 + T3 / 69699 - T4 / 14712000);
    const F = n360(93.2720950 + 483202.0175233 * T - 0.0036539 * T2 - T3 / 3526000 + T4 / 863310000);
    const E = 1 - 0.002516 * T - 0.0000074 * T2;
    const A1 = n360(119.75 + 131.849 * T), A2 = n360(53.09 + 479264.290 * T), A3 = n360(313.45 + 481266.484 * T);
    let sl = 0, sr = 0, sb = 0;
    for (const [d, m, mp, f, l, r] of LR) {
      const arg = d * D + m * M + mp * Mp + f * F;
      const ef = Math.abs(m) === 1 ? E : Math.abs(m) === 2 ? E * E : 1;
      sl += l * ef * sin(arg); sr += r * ef * cos(arg);
    }
    for (const [d, m, mp, f, b] of LB) {
      const ef = Math.abs(m) === 1 ? E : Math.abs(m) === 2 ? E * E : 1;
      sb += b * ef * sin(d * D + m * M + mp * Mp + f * F);
    }
    sl += 3958 * sin(A1) + 1962 * sin(Lp - F) + 318 * sin(A2);
    sb += -2235 * sin(Lp) + 382 * sin(A3) + 175 * sin(A1 - F) + 175 * sin(A1 + F) + 127 * sin(Lp - Mp) - 115 * sin(Lp + Mp);
    // nutação em longitude (os termos maiores, cap. 22)
    const Om = 125.04452 - 1934.136261 * T, L0 = 280.4665 + 36000.7698 * T;
    const dpsi = (-17.20 * sin(Om) - 1.32 * sin(2 * L0) - 0.23 * sin(2 * Lp) + 0.21 * sin(2 * Om)) / 3600;
    const lam = n360(Lp + sl / 1e6 + dpsi), bet = sb / 1e6, dist = 385000.56 + sr / 1000;
    const eps = 23.439291 - 0.0130042 * T + 0.00256 * cos(Om);
    return Object.assign({ lam, bet, dist, eps, par: asin(6378.14 / dist) }, eclEq(lam, bet, eps));
  }
  const sol = jd => solTT(jd + DT);
  const lua = jd => luaTT(jd + DT);

  // ---------- fase (cap. 48): parte acesa k (0 a 1), se cresce, e a posição da borda acesa (chi)
  function faseTT(jde) {
    const s = solTT(jde), l = luaTT(jde);
    const psi = Math.acos(Math.max(-1, Math.min(1, cos(l.bet) * cos(l.lam - s.lam)))) * DEG;
    const Rkm = s.R * 149597870.7;
    const i = atan2(Rkm * sin(psi), l.dist - Rkm * cos(psi));
    const k = (1 + cos(i)) / 2;
    const along = n360(l.lam - s.lam); // 0 nova, 90 quarto crescente, 180 cheia, 270 quarto minguante
    const chi = n360(atan2(cos(s.dec) * sin(s.ra - l.ra), sin(s.dec) * cos(l.dec) - cos(s.dec) * sin(l.dec) * cos(s.ra - l.ra)));
    return { k, i, along, cresce: along < 180, chi };
  }
  const fase = jd => faseTT(jd + DT);

  // ---------- do céu para o chão (azimute contado a partir do norte, para o leste)
  const lst = jd => n360(gmst(jd) + LUGAR.lon);
  function altaz(ra, dec, jd) {
    const H = n360(lst(jd) - ra), phi = LUGAR.lat;
    const N = cos(phi) * sin(dec) - sin(phi) * cos(dec) * cos(H);
    const E = -cos(dec) * sin(H);
    const U = sin(phi) * sin(dec) + cos(phi) * cos(dec) * cos(H);
    return { alt: asin(U), az: n360(atan2(E, N)) };
  }
  // ângulo paralático: o ângulo, no centro do astro, entre a direção do polo celeste e a do zênite
  const paralatico = (ra, dec, jd) => { const H = lst(jd) - ra; return atan2(sin(H), tan(LUGAR.lat) * cos(dec) - sin(dec) * cos(H)); };

  // onde está, para quem está no Capão (a Lua já com a paralaxe descontada da altura)
  function onde(corpo, jd) {
    if (corpo === 'sol') { const s = sol(jd); return Object.assign(altaz(s.ra, s.dec, jd), { ra: s.ra, dec: s.dec }); }
    const l = lua(jd), p = altaz(l.ra, l.dec, jd);
    return Object.assign(p, { alt: p.alt - l.par * cos(p.alt), ra: l.ra, dec: l.dec });
  }
  // nascer e pôr: a borda de cima toca o horizonte, com a refração (Sol e Lua, -0,8333 grau)
  const HORIZONTE = -0.8333;

  // quando a altura cruza um valor entre dois instantes (varre de passoMin em passoMin minutos e afina)
  function cruzamentos(corpo, jd0, jd1, alvo = HORIZONTE, passoMin = 10) {
    const out = [], dt = passoMin / 1440;
    const f = jd => onde(corpo, jd).alt - alvo;
    let a = jd0, fa = f(a);
    for (let b = jd0 + dt; b <= jd1 + 1e-9; b += dt) {
      const fb = f(b);
      if ((fa < 0) !== (fb < 0)) {
        let lo = a, hi = b, flo = fa;
        for (let k = 0; k < 16; k++) { const m = (lo + hi) / 2, fm = f(m); if ((fm < 0) === (flo < 0)) { lo = m; flo = fm; } else hi = m; }
        out.push({ jd: (lo + hi) / 2, sobe: fa < 0 });
      }
      a = b; fa = fb;
    }
    return out;
  }
  const primeiro = (lista, sobe) => (lista.find(c => c.sobe === sobe) || {}).jd;

  // ---------- o dia do calendário, no horário de Brasília (a = { ano, mes, dia })
  const meioDia = (ano, mes, dia) => jdOf(new Date(Date.UTC(ano, mes - 1, dia, 12 - FUSO, 0, 0)));
  const local = jd => { const d = dateOf(jd + FUSO / 24); return { ano: d.getUTCFullYear(), mes: d.getUTCMonth() + 1, dia: d.getUTCDate(), h: d.getUTCHours(), m: d.getUTCMinutes(), sem: d.getUTCDay() }; };
  const somaDias = (a, n) => { const t = local(meioDia(a.ano, a.mes, a.dia) + n); return { ano: t.ano, mes: t.mes, dia: t.dia }; };
  const jdLocal = (a, h, m = 0) => meioDia(a.ano, a.mes, a.dia) + (h - 12) / 24 + m / 1440;
  const chave = a => a.ano + '-' + a.mes + '-' + a.dia;
  const semana = a => local(meioDia(a.ano, a.mes, a.dia)).sem;
  // o dia de referência: até as 6h da manhã, ainda vale a noite de ontem
  function ancora(agora) {
    const t = local(jdOf(agora || new Date()));
    const b = t.h < 6 ? somaDias(t, -1) : t;
    return { ano: b.ano, mes: b.mes, dia: b.dia };
  }

  // a noite que começa no dia a: pôr do sol, fim do crepúsculo e o nascer do sol seguinte
  // (no Capão, o Sol se põe entre 17h e 19h e nasce entre 5h e 7h o ano todo: as buscas ficam nessas janelas)
  const cacheNoite = new Map();
  function noite(a) {
    const c = chave(a);
    if (cacheNoite.has(c)) return cacheNoite.get(c);
    const h = x => jdLocal(a, x);
    const tarde = alvo => primeiro(cruzamentos('sol', h(16), h(21.5), alvo, 10), false);
    const manha = alvo => primeiro(cruzamentos('sol', h(26.5), h(31), alvo, 10), true);
    const r = { poeSol: tarde(HORIZONTE), fimCrepCivil: tarde(-6), nasceSol: manha(HORIZONTE) };
    cacheNoite.set(c, r);
    return r;
  }

  // as fases principais entre dois instantes: nova (0), quarto crescente (90), cheia (180) e quarto minguante (270)
  const NOMES_FASE = [[0, 'nova'], [90, 'quarto crescente'], [180, 'cheia'], [270, 'quarto minguante']];
  const dif = (x, alvo) => ((x - alvo + 540) % 360) - 180;
  function fases(jdIni, dias = 30) {
    const out = [], passo = 0.25;
    let prev = fase(jdIni).along;
    for (let j = jdIni + passo; j <= jdIni + dias + 1e-9; j += passo) {
      const at = fase(j).along;
      for (const [alvo, nome] of NOMES_FASE) {
        if (dif(prev, alvo) < 0 && dif(at, alvo) >= 0) {
          let lo = j - passo, hi = j;
          for (let k = 0; k < 20; k++) { const m = (lo + hi) / 2; if (dif(fase(m).along, alvo) < 0) lo = m; else hi = m; }
          out.push({ nome, jd: (lo + hi) / 2 });
        }
      }
      prev = at;
    }
    return out;
  }
  // a fase principal que cai no dia a (do começo ao fim do dia, em Brasília), se cair alguma
  function fasePrincipalDoDia(a) {
    const j0 = jdLocal(a, 0), j1 = jdLocal(a, 24);
    const f0 = fase(j0).along, f1 = fase(j1).along;
    for (const [alvo, nome] of NOMES_FASE) if (dif(f0, alvo) < 0 && dif(f1, alvo) >= 0) return nome;
    return null;
  }
  // o nome que a criança usa no jogo: nova, crescente, quarto crescente, cheia, quarto minguante, minguante
  // (os quartos só no dia em que acontecem; nova e cheia também nos dias em que a Lua parece assim)
  function nomeDaFase(a, f) {
    const p = fasePrincipalDoDia(a);
    if (p) return p;
    if (f.k < 0.03) return 'nova';
    if (f.k > 0.97) return 'cheia';
    return f.cresce ? 'crescente' : 'minguante';
  }

  // ---------- a Lua de um dia: quando nasce, quando e onde olhar, com que cara ela aparece
  // tipo: 'noite' (dá para ver no começo da noite, até as 21h), 'tarde' (nasce depois),
  // 'poente' (fica baixinha e se põe logo depois do Sol), 'nova' (perto do Sol, não aparece)
  const cacheLua = new Map();
  function luaDoDia(a) {
    const c = chave(a);
    if (cacheLua.has(c)) return cacheLua.get(c);
    const n = noite(a), S = n.poeSol;
    // 1. o começo da noite: do fim do crepúsculo até as 21h, a primeira hora em que ela passa de 15 graus
    let ver = null;
    for (let j = n.fimCrepCivil, fim = jdLocal(a, 21); j <= fim + 1e-9; j += 5 / 1440) {
      const p = onde('lua', j);
      if (p.alt >= 15) { ver = { jd: j, p }; break; }
      if (p.alt >= 8 && (!ver || p.alt > ver.p.alt)) ver = { jd: j, p };
    }
    // 2. quando nasce: se já está no céu quando o Sol se põe, o nascer de antes; se não, o próximo
    const noPor = onde('lua', S).alt > HORIZONTE;
    let nasce = null;
    if (noPor) { const sobe = cruzamentos('lua', S - 1.08, S).filter(x => x.sobe); nasce = sobe.length ? sobe[sobe.length - 1].jd : null; }
    else nasce = primeiro(cruzamentos('lua', S, S + 1.08), true) || null;
    // 3. o instante do desenho
    let tipo, ref;
    if (ver) { tipo = 'noite'; ref = ver.jd; }
    else if (noPor) { tipo = 'poente'; ref = S + 15 / 1440; }
    else if (nasce && nasce < n.nasceSol - 20 / 1440) {
      tipo = 'tarde';
      let melhor = null;
      for (let j = nasce + 10 / 1440, fim = n.nasceSol - 20 / 1440; j <= fim; j += 10 / 1440) {
        const p = onde('lua', j);
        if (p.alt >= 15) { melhor = { jd: j, p }; break; }
        if (!melhor || p.alt > melhor.p.alt) melhor = { jd: j, p };
      }
      ref = melhor ? melhor.jd : nasce + 20 / 1440;
    } else { tipo = 'nova'; ref = jdLocal(a, 19); }
    const f = fase(ref);
    const nome = nomeDaFase(a, f);
    if (nome === 'nova') tipo = 'nova';
    const p = onde('lua', ref);
    // a borda acesa vista do Capão: ângulo a partir do zênite (o "para cima" de quem olha), no sentido anti-horário
    const theta = n360(f.chi - paralatico(p.ra, p.dec, ref));
    // de manhã cedo, a Lua minguante ainda fica no céu claro
    let manha = null;
    if (!f.cresce && f.k > 0.3 && tipo !== 'nova') {
      const j7 = jdLocal(somaDias(a, 1), 7), p7 = onde('lua', j7);
      if (p7.alt >= 20) manha = { jd: j7, alt: p7.alt, az: p7.az };
    }
    const r = { a, nome, tipo, k: f.k, cresce: f.cresce, along: f.along, ref, alt: p.alt, az: p.az, theta, nasce, manha, poeSol: S };
    cacheLua.set(c, r);
    return r;
  }
  // a próxima noite em que a Lua aparece no começo da noite, depois do dia a
  function proximaNoite(a, limite = 35) {
    for (let i = 1; i <= limite; i++) {
      const l = luaDoDia(somaDias(a, i));
      if (l.tipo === 'noite' && l.k >= 0.04) return l;
    }
    return null;
  }

  const api = {
    LUGAR, FUSO, DT, HORIZONTE, RAD, DEG, n360, jdOf, dateOf,
    sol, lua, fase, solTT, luaTT, faseTT, altaz, paralatico, onde, lst, cruzamentos, primeiro,
    meioDia, local, somaDias, jdLocal, chave, semana, ancora, noite,
    fases, fasePrincipalDoDia, nomeDaFase, luaDoDia, proximaNoite,
  };
  raiz.AK = raiz.AK || {};
  raiz.AK.ceu = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
