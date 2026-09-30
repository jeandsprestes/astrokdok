'use strict';
// MISSÃO 13 — PRÓXIMA CENTAURI · lançamento da Austrália
A.MISSIONS[12] = {
  n: 13, name: 'PRÓXIMA CENTAURI', goal: 'viajar até a estrela mais próxima do Sol',
  place: 'AUSTRÁLIA', where: 'Uluru, Austrália', scene: 'australia', game: 'proxima', body: 'proxima', room: 'patio',

  brief: [
    { who: 'CMTE. JULIUS', t: 'Conselheiro {nome}. Os planetas acabaram. Agora começam as ESTRELAS.' },
    { who: 'CMTE. JULIUS', t: 'Missão 13: PRÓXIMA CENTAURI, a estrela mais perto do Sol. A luz leva mais de 4 anos para vir de lá.' },
    { who: 'CMTE. JULIUS', t: 'A Vela a Laser vai ser empurrada por raios da Terra. Aula no PÁTIO: hoje tem corrida.' },
  ],
  ready: [
    { who: 'CMTE. JULIUS', t: 'Aulas concluídas. O lançamento será na Austrália, onde o céu do Sul é um dos mais bonitos do mundo.' },
  ],
  teacher: [
    'Todos no pátio! Hoje é MATEMÁTICA: velocidade, distância e tempo. E vamos correr para medir!',
    'Agora, a aula da missão do {nome}: PRÓXIMA CENTAURI, a nossa estrela vizinha!',
  ],
  after: 'Muito bem, {nome}! O Comandante está esperando.',

  lessons: [{
    id: 'm13a', subject: 'MATEMÁTICA', title: 'Velocidade, distância e tempo',
    slides: [
      `<p><b>Velocidade</b> é quanto se anda em cada pedaço de tempo. 15 km/h quer dizer: 15 km em cada hora.</p>
       <div class="calc">distância = velocidade × tempo
15 km/h durante 2 h = 30 km</div>`,
      `<p>Dá para descobrir as outras partes também:</p>
       <div class="calc">velocidade = distância ÷ tempo
tempo      = distância ÷ velocidade

240 km em 3 h → 80 km/h
20 km a 5 km/h → 4 h</div>`,
      `<p>A coisa mais rápida do universo é a <b>luz</b>: <b>300 mil km por segundo</b>! Ela dá mais de 7 voltas na Terra em 1 segundo.</p>`,
    ],
    quiz: [
      { q: 'Uma bicicleta anda a 15 km por hora. Em 3 horas, quantos km?', n: 45, hint: 'distância = velocidade × tempo.', why: '15 × 3 = 45 km.' },
      { q: 'Um carro andou 240 km em 3 horas, sempre na mesma velocidade. Qual era a velocidade, em km/h?', n: 80, hint: 'velocidade = distância ÷ tempo.', why: '240 ÷ 3 = 80 km/h.' },
      { q: 'Andando a 5 km/h, quantas horas para andar 20 km?', n: 4, hint: 'tempo = distância ÷ velocidade.', why: '20 ÷ 5 = 4 horas.' },
      { q: 'A luz anda 300.000 km por segundo. Quantos km em 2 segundos?', n: 600000, hint: '300 × 2 = 600. Agora devolva os três zeros.', why: '600.000 km!' },
      { q: 'O que é mais rápido?', o: ['a luz', 'o som', 'um foguete', 'o vento de Netuno'], a: 0, why: 'Nada é mais rápido que a luz.' },
    ],
  }, {
    id: 'm13b', subject: 'CIÊNCIAS + MATEMÁTICA', title: 'A estrela vizinha',
    slides: [
      `<p>Um <b>ano-luz</b> NÃO é tempo: é <b>distância</b>. É o quanto a luz anda em 1 ano: uns <b>9 trilhões e meio de km</b>!</p>
       <p><b>Próxima Centauri</b> fica a <b>4,2 anos-luz</b>. É a estrela mais perto do Sol.</p>`,
      `<p>Ela é uma <b>anã-vermelha</b>: menor, mais fria e mais fraca que o Sol. Tão fraquinha que só dá para ver com telescópio.</p>
       <p>Ela tem um planeta: o <b>Próxima b</b>, descoberto em 2016.</p>`,
      `<p>A sonda <b>Voyager 1</b>, uma das mais rápidas já lançadas, levaria uns <b>73 mil anos</b> para chegar lá!</p>
       <p>Cientistas estudam <b>velas a laser</b>: velas finíssimas empurradas por raios de luz, que poderiam chegar em uns 20 anos.</p>`,
    ],
    quiz: [
      { q: 'Um ano-luz é:', o: ['a distância que a luz anda em um ano', 'um ano muito iluminado', 'o tempo que a Lua leva para girar', 'um tipo de estrela'], a: 0, why: 'É uma distância, não um tempo!' },
      { q: 'A luz leva uns 4 anos para vir de Próxima Centauri. Uma nave com METADE da velocidade da luz levaria quantos anos?', n: 8, hint: 'Metade da velocidade: o dobro do tempo.', why: '4 × 2 = 8 anos.' },
      { q: 'Próxima Centauri é uma anã-vermelha. Isso quer dizer que ela é:', o: ['menor e mais fria que o Sol', 'maior que o Sol', 'um planeta', 'um buraco negro'], a: 0, why: 'Pequena, fria e avermelhada.' },
      { q: 'A Voyager 1 levaria uns 73 mil anos para chegar lá. Quantos séculos é isso?', n: 730, hint: '1 século = 100 anos. Faça 73.000 ÷ 100.', why: '73.000 ÷ 100 = 730 séculos!' },
      { q: 'Alfa Centauri, vizinha da Próxima, aparece no céu perto de qual constelação?', o: ['Cruzeiro do Sul', 'Órion', 'Ursa Maior', 'Escorpião'], a: 0, why: 'Ela e Beta Centauri apontam para o Cruzeiro do Sul.' },
    ],
  }],

  site: {
    look: [0, 3, 1],
    intro: [
      { who: 'DRA. KIRRA', t: 'G\'day, {nome}! Sou a Dra. Kirra, astrônoma. Minha família aborígene olha este céu há milhares de anos.' },
    ],
    lesson: {
      id: 'm13c', subject: 'GEOGRAFIA · AUSTRÁLIA', title: 'O céu do Sul',
      slides: [
        `<p>A <b>Austrália</b> é um país que ocupa um <b>continente inteiro</b>. A capital é <b>Canberra</b> (não é Sydney!). Lá vivem cangurus e coalas.</p>
         <p>Como o Brasil, ela fica no hemisfério Sul: quando é <b>verão aqui, é verão lá</b> também.</p>`,
        `<p>Os povos <b>aborígenes</b> vivem na Austrália há uns <b>65 mil anos</b>. Eles têm uma constelação diferente: o <b>Emu no Céu</b>, formado pelas <b>manchas escuras</b> da Via Láctea, não pelas estrelas!</p>`,
        `<p>O <b>Cruzeiro do Sul</b> aparece na bandeira da Austrália e também na <b>bandeira do Brasil</b>!</p>
         <p>A rocha <b>Uluru</b>, no meio do deserto, é um lugar sagrado para os aborígenes.</p>`,
      ],
      quiz: [
        { q: 'Qual é a capital da Austrália?', o: ['Sydney', 'Canberra', 'Melbourne', 'Uluru'], a: 1, why: 'Canberra. Sydney é a maior cidade, mas não é a capital.' },
        { q: 'Que constelação aparece na bandeira da Austrália E na do Brasil?', o: ['Cruzeiro do Sul', 'Órion', 'Escorpião', 'Ursa Maior'], a: 0, why: 'O Cruzeiro do Sul!' },
        { q: 'O "Emu no Céu" dos povos aborígenes é formado:', o: ['pelas manchas escuras da Via Láctea', 'por estrelas amarelas', 'por nuvens', 'pela Lua'], a: 0, why: 'Pelas partes escuras, entre as estrelas.' },
        { q: 'Quando é verão no Brasil, na Austrália é:', o: ['verão também', 'inverno', 'outono'], a: 0, why: 'Os dois ficam no hemisfério Sul.' },
        { q: 'Os aborígenes vivem na Austrália há uns 65 mil anos. Quantos milênios? (1 milênio = 1.000 anos)', n: 65, why: '65.000 ÷ 1.000 = 65 milênios.' },
      ],
    },
    outro: [
      { who: 'DRA. KIRRA', t: 'Boa viagem! Quando olhar para trás, procure o Sol: lá de longe, ele vai parecer só mais uma estrelinha.' },
    ],
  },

  gameIntro: [
    { who: 'KDOK', t: 'Bip! Os lasers da Terra vão empurrar a Vela em PULSOS. Cada pulso desce pela faixa.' },
    { who: 'KDOK', t: 'Aperte A quando o pulso passar pela linha amarela. Pulsos com seta: aperte ◀ ou ▶!' },
    { who: 'KDOK', t: 'Acertos aceleram a nave. Enche a barra de velocidade e a gente chega!' },
  ],

  debrief: [
    { who: 'KDOK', t: 'CHEGAMOS A OUTRA ESTRELA! Próxima Centauri, a vizinha do Sol.' },
    { who: 'KDOK', t: 'Ela é pequena, fria e avermelhada. E aquele pontinho ali é o planeta Próxima b.' },
    { who: 'KDOK', t: 'A luz dela leva 4 anos para chegar na Terra. Quem olha pra ela de lá, vê como ela era 4 anos atrás!' },
    { who: 'KDOK', t: 'Bip... o sinal está aqui também. Igualzinho. Ele não pertence a estrela nenhuma.' },
  ],
  card: { id: 'proxima', name: 'PRÓXIMA CENTAURI', lines: ['Estrela mais próxima do Sol', 'Distância: 4,2 anos-luz', 'Tipo: anã-vermelha', 'Tem um planeta: Próxima b', 'Só dá para ver com telescópio'] },
  reward: { id: 'mapa', name: 'MAPA ESTELAR', desc: 'Um mapa das estrelas próximas. Em Órion, dá mais tempo para ligar as estrelas.' },
  radio: 'Filho, se eu mandasse um rádio de verdade até aí, ele levaria 4 anos pra chegar. Então vou adiantar: te amo hoje, amanhã e daqui a 4 anos. Câmbio!',
  real: 'Numa noite sem nuvens, procure o Cruzeiro do Sul. Do lado dele, duas estrelas brilhantes apontam para a cruz: uma delas é Alfa Centauri, vizinha da Próxima!',

  chat: {
    yuki: 'Na aula de corrida eu fiz 100 metros em 20 segundos. Dá 5 metros por segundo!',
    lia: 'O Cruzeiro do Sul está na bandeira do Brasil. Cada estrela da bandeira representa um estado!',
    tomas: 'Velocidade da luz? Eu sou a velocidade do lanche.',
    bia: 'A vela a laser é mais fina que um fio de cabelo. Mais fina que a paciência do {rival}.',
    caio: 'Ano-luz não é tempo, é distância. Aprendi isso e depois dormi. Mas aprendi.',
    rival: 'Ei, {nome}. Quando você voltar... me conta como é outra estrela? Eu também quero ser astronauta.',
    kdok: 'Bip! 4 anos-luz! Meus parafusos estão tremendo de emoção. Ou de frio.',
    ze: 'Descobrimos mais uma coisa: o sinal é mais velho que as estrelas. Muito, muito mais velho.',
  },
};
