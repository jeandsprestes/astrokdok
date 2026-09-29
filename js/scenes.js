'use strict';
// Base Astrokdok, escola, menus (Cosmodex, hangar, rádio).
A.CH = {
  teacher: A.makeChar(1, 3, 1), lia: A.makeChar(1, 3, 0), tomas: A.makeChar(0, 1, 0), bia: A.makeChar(2, 1, 0),
  caio: A.makeChar(2, 3, 1), rival: A.makeChar(2, 0, 1), cmd: A.makeChar(3, 0, 0),
  dito: A.makeChar(3, 1, 1), nara: A.makeChar(0, 3, 0), paz: A.makeChar(1, 2, 0),
};
A.curM = () => A.MISSIONS[Math.min(A.S.m, A.MISSIONS.length - 1)];
A.over = () => A.S.m >= A.MISSIONS.length;
A.hudWorld = () => A.hud(A.over() ? 'PILOTO · EPISÓDIO 1 ✓' : `MISSÃO ${A.curM().n} · ${A.curM().name}`, `★ ${A.S.stars}`);
A.objective = () => {
  if (A.over()) return 'Episódio 1 completo! Aguarde novas ordens do Comandante.';
  const M = A.curM();
  if (A.S.step < 2) return `Vá à ESCOLA e sente na cadeira amarela. Aulas feitas: ${A.S.step}/2.`;
  if (A.S.step === 2) return `Fale com o Comandante Julius para viajar até ${M.where}.`;
  return `Fale com o Comandante Julius para tentar a missão ${M.n} de novo.`;
};

// ---------- base ----------
A.baseDef = () => ({
  rows: A.MAPS.base,
  paint(x) { A.txt('ESCOLA', 21, 5, 2, 1, x); A.txt('HANGAR', 117, 5, 2, 1, x); },
  extra(ctx, t) {
    A.drawS(A.SHIPS[A.shipLevel()], 112, 90, 2);
    if (Math.floor(t * 2) % 2) A.rect(127, 88, 2, 2, 2);
  },
  npcs: [
    { x: 6, y: 5, ch: A.CH.cmd, dir: 'down', talk: () => A.talkCmd() },
    { x: 2, y: 5, img: A.KDOK, bob: true, talk: () => A.say({ who: 'KDOK', t: A.over() ? 'Bip! Piloto! Enquanto não chegam novas ordens, que tal revisar o Cosmodex no telescópio?' : A.curM().chat.kdok }) },
  ],
  onStep(x, y, ch) {
    if (ch !== 'e') return null;
    if (x < 5) return () => A.enterSchool();
    return async s => { A.sfx('door'); await A.hangar(); s.pl.y = 3; s.pl.ox = s.pl.x; s.pl.oy = 3; s.pl.dir = 'down'; A.hudWorld(); };
  },
  onFace(x, y, ch) {
    if (ch === 'S') return () => A.cosmodex();
    if (ch === 'R') return () => A.say(`É o ${A.SHIP_NAMES[A.shipLevel()]}. ${A.shipLevel() ? 'Cada missão deixa ele melhor.' : 'Tem fita adesiva em lugares que nem deviam ter lugar.'}`);
    return null;
  },
  onB: () => A.menu(),
});
A.toBase = (x = 4, y = 5, dir = 'down') => A.goMap(A.baseDef(), x, y, dir).then(A.hudWorld);

A.talkCmd = async () => {
  if (A.over()) { await A.say([{ who: 'CMTE. JULIUS', t: 'Piloto Gabriel. Novas missões em breve.' }, { who: 'CMTE. JULIUS', t: 'Enquanto isso, revise o Cosmodex no telescópio e as aulas com a Profª Estela.' }]); return; }
  const M = A.curM();
  if (A.S.step < 2) { await A.say(M.brief); return; }
  if (A.S.step === 2) await A.say(M.ready);
  else await A.say({ who: 'CMTE. JULIUS', t: 'A nave está pronta de novo. Vamos tentar outra vez?' });
  const c = await A.choose(M.go || `Viajar para ${M.where}?`, ['SIM, VAMOS!', 'AINDA NÃO']);
  if (c === 0) await A.runSite(M);
};

// ---------- escola ----------
A.enterSchool = async () => { A.sfx('door'); await A.goMap(A.schoolDef(), 4, 7, 'up'); A.hudWorld(); };
A.schoolDef = () => {
  const M = A.curM(), c = M.chat;
  const kid = (x, y, ch, name, line) => ({ x, y, ch, dir: 'up', talk: () => A.say({ who: name, t: line }) });
  return {
    rows: A.MAPS.school,
    extra() { A.txt(`MISSAO ${M.n}: ${M.name}`, 36, 5, 3); },
    npcs: [
      { x: 2, y: 1, ch: A.CH.teacher, dir: 'down', talk: () => A.talkTeacher() },
      kid(2, 4, A.CH.lia, 'LIA', c.lia), kid(4, 4, A.CH.tomas, 'TOMÁS', c.tomas),
      kid(2, 6, A.CH.rival, '{rival}', c.rival), kid(4, 6, A.CH.bia, 'BIA', c.bia), kid(6, 6, A.CH.caio, 'CAIO', c.caio),
    ],
    onStep(x, y, ch, s) {
      if (ch === 'd') return () => A.toBase(2, 3, 'down');
      if (ch === 'g') return async () => { s.pl.dir = 'up'; await A.runClass(); };
      return null;
    },
    onFace(x, y, ch) { return ch === 'B' ? () => A.say(`Na lousa está escrito: MISSÃO ${M.n}: ${M.name}.`) : null; },
    onB: () => A.menu(),
  };
};
A.talkTeacher = async () => {
  const done = Object.keys(A.S.lessons);
  if (!A.over() && A.S.step < 2) await A.say({ who: 'PROFª ESTELA', t: 'Gabriel! Sente na sua cadeira, a amarela, para começar a aula.' });
  else await A.say({ who: 'PROFª ESTELA', t: A.over() ? 'Sem aulas novas por hoje, piloto. Mas revisar sempre ajuda!' : A.curM().after });
  if (!done.length) return;
  const all = A.MISSIONS.flatMap(M => [...M.lessons, M.site.lesson]).filter(L => done.includes(L.id));
  const c = await A.choose('Quer revisar alguma aula? (Dá para ganhar as estrelas que faltaram.)', [...all.map(L => `${L.subject}: ${L.title} (★ ${A.S.lessons[L.id]}/${L.quiz.length})`), 'NÃO, OBRIGADO']);
  if (c < all.length) { await A.runLesson(all[c]); A.hudWorld(); }
};
A.runClass = async () => {
  if (A.over() || A.S.step >= 2) { await A.say({ who: 'PROFª ESTELA', t: 'As aulas desta missão já acabaram, Gabriel. Fale com o Comandante!' }); return; }
  const M = A.curM();
  if (A.S.step === 0) {
    await A.say({ who: 'PROFª ESTELA', t: M.teacher[0] });
    await A.runLesson(M.lessons[0]);
    A.S.step = 1; A.save(); A.hudWorld();
    const c = await A.choose('Fim da primeira aula! E agora?', ['PRÓXIMA AULA', 'FAZER UM INTERVALO']);
    if (c === 1) { await A.say({ who: 'PROFª ESTELA', t: 'Intervalo! Quando voltar, é só sentar na cadeira amarela.' }); return; }
  }
  await A.say({ who: 'PROFª ESTELA', t: M.teacher[1] });
  await A.runLesson(M.lessons[1]);
  A.S.step = 2; A.save(); A.hudWorld();
  await A.say({ who: 'PROFª ESTELA', t: M.after });
};

// ---------- menus ----------
A.menu = async () => {
  for (;;) {
    const c = await A.choose(`<b>OBJETIVO:</b> ${A.objective()}`, ['COSMODEX', 'NAVE E ITENS', 'RÁDIO DE CASA', 'MISSÕES DE VERDADE', `SOM: ${A.S.mute ? 'DESLIGADO' : 'LIGADO'}`, 'FECHAR']);
    if (c === 0) await A.cosmodex();
    else if (c === 1) await A.hangar();
    else if (c === 2) await A.radio();
    else if (c === 3) await A.reals();
    else if (c === 4) { A.S.mute = !A.S.mute; A.save(); }
    else break;
  }
};
A.cardOf = name => { const M = A.MISSIONS.find(M => M.card.name === name); return M && A.S.cards.includes(M.card.id) ? M.card : null; };
A.cosmodex = () => A.btnWait(`<span class="tag">COSMODEX · ${A.S.cards.length}/${A.COSMODEX.length}</span><h2>Registros do universo</h2>` +
  A.COSMODEX.map((n, i) => { const c = A.cardOf(n); return c ? `<div class="card"><h3>#${String(i + 1).padStart(2, '0')} ${c.name}</h3>${c.lines.join('<br>')}</div>` : `<div class="card lock"><h3>#${String(i + 1).padStart(2, '0')} ???</h3>Ainda não descoberto.</div>`; }).join(''), 'FECHAR');
A.hangar = () => {
  const prev = A.scene, t0 = performance.now(), lv = A.shipLevel();
  A.setScene({ draw() {
    const t = (performance.now() - t0) / 1000;
    A.cls(1);
    for (let i = 0; i < 160; i += 16) A.rect(i, 0, 1, 144, 0);
    A.rect(0, 112, 160, 32, 0); A.rect(0, 112, 160, 2, 2);
    A.drawS(A.SHIPS[lv], 48, 40 + Math.round(Math.sin(t * 2) * 2), 4);
    A.txtC(A.SHIP_NAMES[lv], 124, 2);
  } });
  const owned = A.MISSIONS.map(M => M.reward).filter(r => A.has(r.id));
  const icon = id => A.SHIPS[{ turbo: 1, vela: 2 }[id] || 0].toDataURL();
  return A.btnWait(`<span class="tag">HANGAR</span><h2>${A.SHIP_NAMES[lv]}</h2>` +
    (owned.length ? owned.map(r => `<div class="item"><img src="${icon(r.id)}" style="width:48px;height:48px;image-rendering:pixelated;background:#0e0e0e;border-radius:4px"><div><b>${r.name}</b><br>${r.desc}</div></div>`).join('') : '<p>Nenhum item ainda. Complete missões para melhorar a nave e o traje.</p>'), 'SAIR').then(() => A.setScene(prev));
};
A.radio = () => {
  const got = A.MISSIONS.slice(0, A.S.m);
  return A.btnWait(`<span class="tag">RÁDIO DE CASA</span><h2>Mensagens recebidas</h2>` + (got.length ? got.map(M => `<div class="card"><h3>MISSÃO ${M.n}</h3>"${M.radio}"<br>— Papai</div>`).join('') : '<p>Chiado... Nenhuma mensagem ainda. Complete uma missão!</p>'), 'FECHAR');
};
A.reals = () => {
  const got = A.MISSIONS.slice(0, A.S.m);
  return A.btnWait(`<span class="tag">MISSÕES DE VERDADE</span><h2>Para fazer fora do jogo</h2>` + (got.length ? got.map(M => `<div class="card"><h3>MISSÃO ${M.n} · ${M.name}</h3>${M.real}</div>`).join('') : '<p>Complete uma missão para receber desafios do mundo real.</p>'), 'FECHAR');
};
