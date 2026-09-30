'use strict';
// MISSÃO 12 — PLUTÃO · lançamento da Estação Comandante Ferraz (Antártida)
A.MISSIONS[11] = {
  n: 12, name: 'PLUTÃO', goal: 'fotografar Plutão de perto',
  place: 'ANTÁRTIDA', where: 'Estação Comandante Ferraz, Antártida', scene: 'antartida', game: 'pluto', body: 'pluto', room: 'lab',
  guest: { who: 'ENG. NARA', look: [0, 3, 0], t: 'Oi, {nome}! Vim de Alcântara só pra ver o piloto que começou com o Calhambeque chegar até Plutão.' },

  brief: [
    { who: 'CMTE. JULIUS', t: 'Capitão. Missão 12: PLUTÃO. Ele não é mais planeta, mas continua lá, no frio, esperando visita.' },
    { who: 'CMTE. JULIUS', t: 'Você vai fotografar Plutão numa passagem rápida. Sem segunda chance: a nave não para.' },
    { who: 'CMTE. JULIUS', t: 'Aula no LABORATÓRIO. Hoje tem gelo.' },
  ],
  ready: [
    { who: 'CMTE. JULIUS', t: 'Aulas concluídas. O lançamento será na Antártida, da estação brasileira Comandante Ferraz. Leve casaco.' },
  ],
  teacher: [
    'Bom dia, turma! Laboratório gelado: hoje é CIÊNCIAS, os estados da água.',
    'Agora, a aula da missão do {nome}: PLUTÃO, o pequeno valente!',
  ],
  after: 'Muito bem, {nome}! O Comandante está esperando.',

  lessons: [{
    id: 'm12a', subject: 'CIÊNCIAS', title: 'Sólido, líquido e gasoso',
    slides: [
      `<p>A água pode estar em três <b>estados</b>:</p>
       <div class="calc">SÓLIDO  → gelo
LÍQUIDO → água
GASOSO  → vapor</div>`,
      `<p>O que muda o estado é a <b>temperatura</b>:</p>
       <div class="calc">  0 °C → a água CONGELA
100 °C → a água FERVE
         (no nível do mar)</div><p>Abaixo de zero, os números ganham um sinal de menos: −5 °C é "cinco graus abaixo de zero".</p>`,
      `<p>Quando a roupa seca no varal, a água <b>evapora</b>: vira vapor e vai para o ar.</p>
       <p>Quando o vapor esfria lá no alto, vira gotinhas: são as <b>nuvens</b>. E elas voltam como chuva. É o <b>ciclo da água</b>.</p>`,
    ],
    quiz: [
      { q: 'A água congela a quantos graus Celsius?', n: 0, why: 'A 0 °C.' },
      { q: 'E ferve, no nível do mar, a quantos graus?', n: 100, why: 'A 100 °C.' },
      { q: 'O gelo é água no estado:', o: ['sólido', 'líquido', 'gasoso'], a: 0, why: 'Gelo é sólido.' },
      { q: 'Numa manhã fazia −5 °C e à tarde fez 7 °C. Quantos graus a temperatura subiu?', n: 12, hint: 'De −5 até 0 são 5 graus. De 0 até 7 são mais 7.', why: '5 + 7 = 12 graus.' },
      { q: 'Quando a água da roupa no varal some, ela:', o: ['evaporou: virou vapor', 'congelou', 'sumiu para sempre', 'virou pedra'], a: 0, why: 'Virou vapor e foi para o ar.' },
    ],
  }, {
    id: 'm12b', subject: 'CIÊNCIAS + MATEMÁTICA', title: 'O pequeno valente',
    slides: [
      `<p><b>Plutão</b> foi descoberto em <b>1930</b> por Clyde Tombaugh, um jovem de 24 anos. Em <b>2006</b>, os astrônomos o classificaram como <b>planeta-anão</b>: ele é menor até que a nossa Lua.</p>`,
      `<p>Em <b>2015</b>, a sonda <b>New Horizons</b> passou por Plutão e mostrou uma surpresa: uma grande planície de gelo com formato de <b>coração</b>!</p>
       <p>Plutão também tem montanhas de gelo e um céu azulado.</p>`,
      `<p>Lá faz uns <b>−230 °C</b>. Plutão leva <b>248 anos</b> para dar a volta no Sol.</p>
       <p>Ele tem 5 luas. A maior, <b>Caronte</b>, tem metade do tamanho dele.</p>`,
    ],
    quiz: [
      { q: 'Desde 2006, Plutão é chamado de:', o: ['planeta-anão', 'estrela', 'lua', 'cometa'], a: 0, why: 'Planeta-anão.' },
      { q: 'Plutão foi descoberto em 1930 e fotografado de perto em 2015. Quantos anos depois?', n: 85, hint: 'Faça 2015 − 1930.', why: '85 anos de espera!' },
      { q: 'O famoso "coração" de Plutão é feito de:', o: ['gelo', 'chocolate', 'lava', 'areia'], a: 0, why: 'Uma planície de gelo.' },
      { q: 'Plutão leva 248 anos para dar a volta no Sol. Quantos séculos COMPLETOS é isso?', n: 2, hint: '1 século = 100 anos.', why: '248 anos = 2 séculos e 48 anos.' },
      { q: 'Plutão é maior ou menor que a nossa Lua?', o: ['menor', 'maior', 'igual'], a: 0, why: 'Menor! Por isso é um planeta-anão.' },
    ],
  }],

  site: {
    look: [0, 1, 0],
    intro: [
      { who: 'TEN. BRUNO', t: 'Olá, {nome}! Sou o tenente Bruno, da Marinha do Brasil. Bem-vindo à Estação Antártica Comandante Ferraz!' },
    ],
    lesson: {
      id: 'm12c', subject: 'GEOGRAFIA · ANTÁRTIDA', title: 'O continente de gelo',
      slides: [
        `<p>A <b>Antártida</b> é um <b>continente</b> coberto de gelo, no Polo Sul. É o lugar mais frio da Terra: já fez <b>−89 °C</b> lá!</p>
         <p>No gelo dela está guardada mais da metade de toda a água doce do mundo.</p>`,
        `<p>A Antártida <b>não pertence a nenhum país</b>. Um acordo entre muitos países diz que ela é só para a <b>paz e a ciência</b>.</p>
         <p>O Brasil tem uma estação de pesquisa lá: a <b>Estação Comandante Ferraz</b>.</p>`,
        `<p>Lá vivem <b>pinguins</b>, focas e baleias. Ursos-polares não: eles vivem no Polo Norte!</p>`,
      ],
      quiz: [
        { q: 'A Antártida é:', o: ['um continente coberto de gelo', 'um país', 'uma ilha do Brasil', 'um deserto de areia'], a: 0, why: 'Um continente inteiro de gelo.' },
        { q: 'Como se chama a estação brasileira na Antártida?', o: ['Comandante Ferraz', 'Alcântara', 'Capão', 'Brasília'], a: 0, why: 'Estação Antártica Comandante Ferraz.' },
        { q: 'O recorde de frio lá foi −89 °C. A água congela a 0 °C. Quantos graus abaixo do congelamento é isso?', n: 89, why: '89 graus abaixo de zero!' },
        { q: 'De quem é a Antártida?', o: ['De nenhum país: é para a paz e a ciência', 'Do Brasil', 'Dos pinguins, oficialmente', 'Da Rússia'], a: 0, why: 'Um continente da paz e da ciência.' },
        { q: 'Qual animal vive na Antártida?', o: ['pinguim', 'urso-polar', 'camelo', 'onça'], a: 0, why: 'Pinguins! Ursos-polares vivem no Norte.' },
      ],
    },
    outro: [
      { who: 'TEN. BRUNO', t: 'Missão liberada! Lá em Plutão faz −230 °C. Aqui é quase verão perto disso.' },
    ],
  },

  gameIntro: [
    { who: 'KDOK', t: 'Bip! Plutão vai passar pela janela uma vez só. Temos 8 fotos no filme.' },
    { who: 'KDOK', t: 'Mova a mira com ▲ ▼ ◀ ▶ e aperte A para fotografar os 4 alvos da lista. Mira bem no meio!' },
  ],

  debrief: [
    { who: 'KDOK', t: 'FOTOS FEITAS! O coração de gelo de Plutão ficou lindo.' },
    { who: 'KDOK', t: 'Plutão tem montanhas de gelo do tamanho das nossas serras e um céu azulado.' },
    { who: 'KDOK', t: 'E Caronte, a lua dele, tem metade do tamanho de Plutão. Eles dançam juntos pelo espaço.' },
    { who: 'KDOK', t: 'Bip... Plutão não é mais planeta. Mas pra mim ele sempre vai ser. Plutão, você é meu favorito.' },
  ],
  card: { id: 'plutao', name: 'PLUTÃO', lines: ['Planeta-anão desde 2006', 'Descoberto em 1930', 'Coração de gelo (visto em 2015)', 'Temperatura: −230 °C', 'Ano: 248 anos da Terra'] },
  reward: { id: 'vela-laser', name: 'VELA A LASER', desc: 'Uma vela finíssima empurrada por raios de laser da Terra. Com ela, dá para ir até outra estrela! A nave virou a VELA-LASER.' },
  radio: 'Filho, você está mais longe de casa do que qualquer pessoa já esteve. Mas a gente continua pertinho: é só olhar pro céu. Câmbio!',
  real: 'Coloque água numa forminha de gelo no congelador. Olhe de hora em hora: quanto tempo leva para ficar sólida? Anote no caderno.',

  chat: {
    yuki: 'No Japão, Plutão é Meiōsei: "estrela do rei do mundo dos mortos". Credo! Prefiro o coração.',
    lia: 'Um pouquinho das cinzas do Clyde Tombaugh voou na New Horizons. Ele foi visitar Plutão, que ele mesmo descobriu!',
    tomas: 'Laboratório de água: finalmente uma experiência que eu posso beber.',
    bia: 'Tenho uma teoria: Plutão é pequeno, mas é valente. Igual o Calhambeque era.',
    caio: 'Um ano em Plutão tem 248 anos. Ninguém faz aniversário lá. Que triste. Que sono.',
    rival: 'Olha... eu fiz um adesivo da Astrokdok pra sua nave. Não é presente. É... sei lá. Pega logo.',
    kdok: 'Bip! Plutão não é mais planeta?! Vou fazer um abaixo-assinado. Assinaturas até agora: 1. A minha.',
    ze: 'Lembrei onde já tinha ouvido o sinal! Na TV velha lá de casa, quando saía do ar... Vou explicar direitinho no fim da jornada.',
  },
};
