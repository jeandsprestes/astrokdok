'use strict';
// MISSÃO 11 — NETUNO · lançamento de Sriharikota (Índia)
A.MISSIONS[10] = {
  n: 11, name: 'NETUNO', goal: 'voar contra os ventos mais rápidos do Sistema Solar',
  place: 'ÍNDIA', where: 'Sriharikota, Índia', scene: 'india', game: 'neptune', body: 'neptune', room: 'lab', night: true,
  guest: { who: 'DRA. PAZ', look: [1, 2, 0], t: 'O Zé e eu temos um palpite sobre o sinal. Mas palpite não é ciência. Precisamos de provas, {nome}.' },

  brief: [
    { who: 'CMTE. JULIUS', t: 'Capitão. Missão 11: NETUNO, o último planeta. Lá venta a 2.000 km por hora.' },
    { who: 'CMTE. JULIUS', t: 'Netuno foi descoberto no papel, com matemática, antes de alguém ver ele no telescópio. Hoje você vai entender como.' },
    { who: 'CMTE. JULIUS', t: 'Aula noturna no LABORATÓRIO.' },
  ],
  ready: [
    { who: 'CMTE. JULIUS', t: 'Aulas concluídas. O lançamento será em Sriharikota, na Índia, o país que ajudou a inventar o zero.' },
  ],
  teacher: [
    'Boa noite! Hoje é MATEMÁTICA: números GIGANTES. Milhões e bilhões.',
    'Agora, a aula da missão do {nome}: NETUNO, o planeta dos ventos!',
  ],
  after: 'Muito bem, {nome}! O Comandante está esperando.',

  lessons: [{
    id: 'm11a', subject: 'MATEMÁTICA', title: 'Milhões e bilhões',
    slides: [
      `<p>Os números são lidos em <b>classes</b> de 3 algarismos, da direita para a esquerda:</p>
       <div class="calc">4.500.000.000
│   │   │   └ unidades
│   │   └ milhares
│   └ milhões
└ bilhões</div><p>Leia: quatro bilhões e quinhentos milhões.</p>`,
      `<div class="calc">1 mil     =         1.000
1 milhão  =     1.000.000
1 bilhão  = 1.000.000.000</div><p>1 milhão = mil milhares. 1 bilhão = mil milhões!</p>`,
      `<p>No espaço, as distâncias são gigantes:</p>
       <div class="calc">Sol → Terra:   150 milhões de km
Sol → Netuno:  4,5 bilhões de km</div><p>"4,5 bilhões" é o mesmo que 4.500 milhões.</p>`,
    ],
    quiz: [
      { q: 'Como se lê 4.500.000?', o: ['quatro milhões e quinhentos mil', 'quatro mil e quinhentos', 'quatrocentos e cinquenta mil', 'quarenta e cinco milhões'], a: 0, why: '4 milhões, 500 mil.' },
      { q: 'Quantos zeros tem 1 milhão?', n: 6, why: '1.000.000: seis zeros.' },
      { q: 'Quantos milhares cabem em 1 milhão?', n: 1000, hint: '1.000.000 ÷ 1.000.', why: 'Mil milhares!' },
      { q: 'Qual é maior?', o: ['2 bilhões', '900 milhões'], a: 0, why: '1 bilhão já é mil milhões. 2 bilhões ganha fácil.' },
      { q: 'Netuno fica a 4.500 milhões de km do Sol. Isso é o mesmo que:', o: ['4,5 bilhões de km', '45 milhões de km', '450 mil km'], a: 0, why: '4.500 milhões = 4,5 bilhões.' },
    ],
  }, {
    id: 'm11b', subject: 'CIÊNCIAS + MATEMÁTICA', title: 'O planeta encontrado no papel',
    slides: [
      `<p><b>Netuno</b> é o oitavo planeta, o <b>mais distante</b> do Sol. Ele foi descoberto em <b>1846</b> de um jeito incrível:</p>
       <p>A órbita de Urano tinha umas "puxadas" estranhas. Um matemático calculou onde deveria estar outro planeta puxando Urano... e acharam Netuno bem ali!</p>`,
      `<p>Netuno tem os <b>ventos mais rápidos</b> do Sistema Solar: até <b>2.000 km/h</b>.</p>
       <p>Ele é azul por causa do metano e leva <b>165 anos</b> para dar a volta no Sol. A luz do Sol demora umas <b>4 horas</b> para chegar lá.</p>`,
      `<p><b>Tritão</b>, a maior lua de Netuno, gira <b>ao contrário</b> e solta <b>gêiseres</b> de gelo.</p>
       <p>Só a <b>Voyager 2</b> visitou Netuno, em 1989.</p>`,
    ],
    quiz: [
      { q: 'Como Netuno foi descoberto, em 1846?', o: ['Por cálculos de matemática, antes de ser visto', 'Por acaso', 'Um astronauta foi lá', 'Ele caiu na Terra'], a: 0, why: 'A matemática mostrou onde procurar!' },
      { q: 'Netuno leva 165 anos para dar a volta no Sol. Foi descoberto em 1846. Em que ano completou a primeira volta desde a descoberta?', n: 2011, hint: 'Faça 1846 + 165.', why: '1846 + 165 = 2011.' },
      { q: 'Os ventos de Netuno chegam a 2.000 km/h. Um carro rápido anda a 100 km/h. Quantas vezes mais rápido é o vento?', n: 20, hint: '2.000 ÷ 100.', why: '20 vezes mais rápido!' },
      { q: 'A luz do Sol leva umas 4 horas para chegar a Netuno. Quantos minutos são 4 horas?', n: 240, hint: '1 hora = 60 minutos.', why: '4 × 60 = 240 minutos.' },
      { q: 'Tritão, a maior lua de Netuno, tem algo raro:', o: ['gira ao contrário e solta gêiseres', 'é quadrada', 'tem praias', 'é maior que o Sol'], a: 0, why: 'Uma lua rebelde e gelada.' },
    ],
  }],

  site: {
    look: [0, 2, 1],
    intro: [
      { who: 'DRA. PRIYA', t: 'Namastê, {nome}! Sou a Dra. Priya, da agência espacial da Índia. Bem-vindo a Sriharikota!' },
    ],
    lesson: {
      id: 'm11c', subject: 'HISTÓRIA · ÍNDIA', title: 'O país do zero',
      slides: [
        `<p>A <b>Índia</b> fica na Ásia. É o país com <b>mais gente</b> do mundo. A capital é <b>Nova Délhi</b>. Um dos idiomas é o hindi: <i>namastê</i> = olá.</p>`,
        `<p>Os nossos números (0, 1, 2, 3...) se chamam <b>indo-arábicos</b>: foram criados na Índia e levados à Europa pelos árabes.</p>
         <p>Os matemáticos indianos ajudaram a transformar o <b>zero</b> num número de verdade. <b>Brahmagupta</b> escreveu regras para o zero no ano <b>628</b>.</p>`,
        `<p>Em <b>2023</b>, a sonda indiana <b>Chandrayaan-3</b> foi a primeira a pousar perto do <b>polo sul da Lua</b>!</p>`,
      ],
      quiz: [
        { q: 'Nossos números (0, 1, 2, 3...) se chamam:', o: ['indo-arábicos', 'romanos', 'chineses', 'gregos'], a: 0, why: 'Criados na Índia, levados pelos árabes.' },
        { q: 'Que número importante os matemáticos da Índia ajudaram a criar?', o: ['o zero', 'o mil', 'o pi', 'o infinito'], a: 0, why: 'O zero!' },
        { q: 'Qual é a capital da Índia?', o: ['Nova Délhi', 'Mumbai', 'Tóquio', 'Sriharikota'], a: 0, why: 'Nova Délhi.' },
        { q: 'Em 2023, a Índia foi a primeira a pousar perto do polo sul da:', o: ['Lua', 'Marte', 'Vênus', 'Terra'], a: 0, why: 'Da Lua, com a Chandrayaan-3.' },
        { q: 'Brahmagupta escreveu sobre o zero em 628. Quantos anos se passaram até 2028?', n: 1400, hint: 'Faça 2028 − 628.', why: '1.400 anos!' },
      ],
    },
    outro: [
      { who: 'DRA. PRIYA', t: 'Boa viagem! Segure firme: os ventos de Netuno não brincam.' },
    ],
  },

  gameIntro: [
    { who: 'KDOK', t: 'Bip! Rajadas de vento vão empurrar a nave para os lados. As SETAS no topo avisam para onde vem o vento.' },
    { who: 'KDOK', t: 'Use ◀ ▶ contra o vento e passe pelos ANÉIS de medição. Fuja das manchas escuras: são tempestades!' },
  ],

  debrief: [
    { who: 'KDOK', t: 'MEDIÇÕES FEITAS! Chegamos a Netuno, o último planeta.' },
    { who: 'KDOK', t: 'Ele foi encontrado primeiro no papel, com matemática, e só depois no telescópio.' },
    { who: 'KDOK', t: 'Daqui, o Sol parece só uma estrela muito brilhante.' },
    { who: 'KDOK', t: 'Bip! O Zé e a Dra. Paz fizeram um mapa do sinal: ele vem do céu inteiro, igualzinho. Eles têm uma ideia...' },
  ],
  card: { id: 'netuno', name: 'NETUNO', lines: ['Oitavo planeta, o mais distante', 'Descoberto com matemática em 1846', 'Ventos de 2.000 km/h', 'Ano: 165 anos da Terra', 'Tritão: lua que gira ao contrário'] },
  reward: { id: 'camera', name: 'CÂMERA DE LONGO ALCANCE', desc: 'Fotografa detalhes a milhares de km. Perfeita para Plutão: vale um filme extra.' },
  radio: 'Filho, Netuno é tão longe que uma mensagem de rádio leva 4 horas pra chegar. Então este recado eu mandei de manhã! Te amo mesmo assim, com atraso. Câmbio!',
  real: 'Peça para alguém de casa ditar um número de milhões (por exemplo, 3.250.000). Escreva com os pontos no lugar certo e leia em voz alta.',

  chat: {
    yuki: 'Netuno em japonês é Kaiōsei: "estrela do rei do mar". Combina com o deus do mar!',
    lia: 'Netuno só completou UMA volta no Sol desde que foi descoberto. A segunda termina em 2176!',
    tomas: 'Um bilhão de feijões. Eu contaria até cansar. Ou até a janta.',
    bia: 'Vento de 2.000 km por hora! Reforcei tudo. Até o parafuso que sobra.',
    caio: 'Aula de noite no laboratório. O microscópio é ótimo para ver o meu sono de perto.',
    rival: 'Hunf. Netuno é longe demais. Mas... toma cuidado lá, tá?',
    kdok: 'Bip! Um bilhão tem 9 zeros. Eu tenho só 1 zero: o do KDK-0!',
    ze: 'Eu e a Dra. Paz temos um palpite. Mas palpite não é ciência. Continue explorando, {nome}.',
  },
};
