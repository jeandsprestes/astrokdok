'use strict';
// MISSÃO 7 — CINTURÃO DE ASTEROIDES · lançamento de Tanegashima (Japão)
A.MISSIONS[6] = {
  n: 7, name: 'ASTEROIDES', goal: 'minerar amostras no Cinturão de Asteroides',
  place: 'JAPÃO', where: 'Tanegashima, Japão', scene: 'japao', game: 'asteroids', body: 'asteroids', room: 'school',

  brief: [
    { who: 'CMTE. JULIUS', t: 'Piloto. Entre Marte e Júpiter existe um cinturão com milhões de rochas espaciais.' },
    { who: 'CMTE. JULIUS', t: 'Missão 7: coletar amostras no CINTURÃO DE ASTEROIDES. Elas guardam segredos de 4,6 bilhões de anos.' },
    { who: 'CMTE. JULIUS', t: 'Escola primeiro. Hoje tem inglês.' },
  ],
  ready: [
    { who: 'CMTE. JULIUS', t: 'Aulas concluídas. O lançamento será no Japão, na ilha de Tanegashima.' },
    { who: 'CMTE. JULIUS', t: 'Os japoneses são especialistas: já trouxeram pedacinhos de asteroides para a Terra.' },
  ],
  teacher: [
    'Good morning! Hoje tem INGLÊS: números e "there is / there are".',
    'Agora, a aula da missão do {nome}: o CINTURÃO DE ASTEROIDES!',
  ],
  after: 'Very good, {nome}! O Comandante espera você.',

  lessons: [{
    id: 'm7a', subject: 'INGLÊS', title: 'Numbers',
    slides: [
      `<div class="calc">1 one      6 six
2 two      7 seven
3 three    8 eight
4 four     9 nine
5 five    10 ten</div><div class="calc">11 eleven   12 twelve
20 twenty   30 thirty
100 one hundred</div>`,
      `<p>Para dizer que algo EXISTE em algum lugar:</p>
       <div class="calc">There IS one Sun.
(Existe um Sol.)

There ARE many asteroids.
(Existem muitos asteroides.)</div><p>Uma coisa: <b>there is</b>. Várias: <b>there are</b>.</p>`,
      `<p>Para perguntar quantos: <b>How many...?</b></p>
       <div class="calc">How many planets are there?
There are eight planets.</div>`,
    ],
    quiz: [
      { q: 'Como se escreve 12 em inglês?', o: ['twelve', 'twenty', 'two', 'ten'], a: 0, why: 'Twelve = 12. Twenty = 20.' },
      { q: '"Twenty" é:', o: ['2', '12', '20', '200'], a: 2, why: 'Twenty = 20.' },
      { q: 'Complete: "There ___ one Sun."', o: ['is', 'are'], a: 0, why: 'Uma coisa só: there is.' },
      { q: 'Complete: "There ___ many asteroids."', o: ['is', 'are'], a: 1, why: 'Várias coisas: there are.' },
      { q: '"How many planets are there?" quer dizer:', o: ['Quantos planetas existem?', 'Onde estão os planetas?', 'Os planetas são grandes?'], a: 0, why: 'How many = quantos.' },
      { q: 'E a resposta certa: "There are ___ planets."', o: ['eight', 'eighteen', 'eighty'], a: 0, why: 'Eight = 8 planetas no Sistema Solar.' },
    ],
  }, {
    id: 'm7b', subject: 'CIÊNCIAS + MATEMÁTICA', title: 'Pedras do começo de tudo',
    slides: [
      `<p>O <b>Cinturão de Asteroides</b> fica <b>entre Marte e Júpiter</b>. São milhões de rochas espaciais, de pedrinhas até montanhas voadoras.</p>
       <p>Elas são <b>restos da formação do Sistema Solar</b>, há 4,6 bilhões de anos.</p>`,
      `<p>Nos filmes, as naves desviam de asteroides grudados uns nos outros. Na vida real, eles ficam <b>muito longe</b> uns dos outros: as sondas passam sem bater em nada!</p>
       <p>O maior objeto do cinturão é <b>Ceres</b>, um planeta-anão de uns 940 km.</p>`,
      `<p>Três nomes para a mesma pedra:</p>
       <div class="calc">ASTEROIDE  → pedra no espaço
METEORO    → risco de luz no céu
METEORITO  → pedra que chega
             ao chão</div><p>Em 2020, a sonda japonesa <b>Hayabusa2</b> trouxe uns 5 gramas do asteroide Ryugu para a Terra.</p>`,
    ],
    quiz: [
      { q: 'Onde fica o Cinturão de Asteroides?', o: ['Entre Marte e Júpiter', 'Entre a Terra e a Lua', 'Depois de Plutão', 'Dentro do Sol'], a: 0, why: 'Entre Marte e Júpiter.' },
      { q: 'Uma rocha espacial que cai e chega até o chão da Terra se chama:', o: ['meteorito', 'cometa', 'satélite', 'planeta'], a: 0, why: 'Chegou ao chão: meteorito.' },
      { q: 'Ceres tem uns 940 km de diâmetro. A Lua tem uns 3.470 km. Quantos km a Lua é maior?', n: 2530, hint: 'Faça 3.470 − 940.', why: '3.470 − 940 = 2.530 km.' },
      { q: 'Na vida real, os asteroides do cinturão:', o: ['ficam muito longe uns dos outros', 'ficam grudados', 'não existem', 'pegam fogo'], a: 0, why: 'Tem muito espaço vazio entre eles.' },
      { q: 'A Hayabusa2 trouxe uns 5 gramas do asteroide Ryugu. Se trouxesse 5 gramas de 12 asteroides, quantos gramas seriam?', n: 60, hint: 'Faça 5 × 12.', why: '5 × 12 = 60 gramas.' },
    ],
  }],

  site: {
    look: [0, 3, 1],
    extra: ['yuki'],
    intro: [
      { who: 'DRA. AKEMI', t: 'Konnichiwa, {nome}! Sou a Dra. Akemi, da agência espacial japonesa. Bem-vindo a Tanegashima!' },
      { who: 'DRA. AKEMI', t: 'Esta é a minha filha, Yuki. Ela vai estudar na sua escola, no Brasil!' },
      { who: 'YUKI', t: 'Prazer! Eu falo português: minha avó mora em São Paulo. Posso ver a sua nave?' },
    ],
    lesson: {
      id: 'm7c', subject: 'GEOGRAFIA · JAPÃO', title: 'A terra do sol nascente',
      slides: [
        `<p>O <b>Japão</b> é um país na Ásia formado por <b>milhares de ilhas</b>. A capital é <b>Tóquio</b>.</p>
         <p>Ele fica bem a leste da Ásia, por isso é chamado de <b>"Terra do Sol Nascente"</b>.</p>`,
        `<p>Lá se fala <b>japonês</b>:</p>
         <div class="calc">KONNICHIWA = olá, boa tarde
ARIGATŌ    = obrigado
HOSHI      = estrela</div><p>O símbolo do Japão, um círculo vermelho na bandeira, é o Sol!</p>`,
        `<p>O <b>Monte Fuji</b>, um vulcão de <b>3.776 m</b>, é a montanha mais alta do Japão.</p>
         <p>E uma curiosidade: o <b>Brasil</b> tem a maior comunidade japonesa fora do Japão, principalmente em São Paulo!</p>`,
      ],
      quiz: [
        { q: 'Qual é a capital do Japão?', o: ['Tóquio', 'Pequim', 'Seul', 'Tanegashima'], a: 0, why: 'Tóquio.' },
        { q: '"Arigatō" quer dizer:', o: ['obrigado', 'olá', 'estrela', 'tchau'], a: 0, why: 'Arigatō = obrigado.' },
        { q: 'Por que o Japão é chamado de "Terra do Sol Nascente"?', o: ['Porque fica bem a leste, onde o Sol nasce', 'Porque é quente', 'Porque tem vulcões', 'Porque não tem noite'], a: 0, why: 'Ele fica no extremo leste da Ásia.' },
        { q: 'Qual país tem a maior comunidade japonesa fora do Japão?', o: ['Brasil', 'Chile', 'Itália', 'Egito'], a: 0, why: 'O Brasil! Principalmente em São Paulo.' },
        { q: 'O Monte Fuji tem 3.776 m. Arredonde para o MILHAR mais próximo.', o: ['3.000', '4.000', '3.700', '3.800'], a: 1, why: '3.776 está mais perto de 4.000.', hint: 'Olhe o algarismo das centenas (o 7).' },
      ],
    },
    outro: [
      { who: 'YUKI', t: 'Ganbatte, {nome}! Quer dizer: boa sorte! A gente se vê na escola.' },
    ],
  },

  gameIntro: [
    { who: 'KDOK', t: 'Bip! Asteroides à frente! Use ◀ ▶ para mover e A para ATIRAR o raio de mineração.' },
    { who: 'KDOK', t: 'Pedras grandes se partem em menores. Quando quebrar, caem CRISTAIS: pegue 15!' },
  ],

  debrief: [
    { who: 'KDOK', t: 'AMOSTRAS COLETADAS! Essas pedras têm 4,6 bilhões de anos. Mais velhas que qualquer rocha da Terra.' },
    { who: 'KDOK', t: 'Viu? Os asteroides ficam longe uns dos outros. Deu pra passar tranquilo... quase sempre.' },
    { who: 'KDOK', t: 'Ceres, o maior deles, é um planeta-anão. Tem até gelo por dentro.' },
    { who: 'KDOK', t: 'Bip! O Zé mandou mensagem: o sinal está mais claro. Ele diz que vem de TODAS as direções.' },
  ],
  card: { id: 'asteroides', name: 'CINTURÃO DE ASTEROIDES', lines: ['Fica entre Marte e Júpiter', 'Milhões de rochas espaciais', 'Maior objeto: Ceres (planeta-anão)', 'Restos da formação do Sistema Solar', 'Hayabusa2 trouxe amostras em 2020'] },
  reward: { id: 'escudo-rad', name: 'ESCUDO DE RADIAÇÃO', desc: 'Protege contra a radiação fortíssima de Júpiter. Vale um escudo a mais na próxima missão.' },
  radio: 'Filho, fiquei sabendo que uma menina japonesa vai estudar na sua escola. Seja legal com ela, tá? Mostra o Capão pra ela. Câmbio!',
  real: 'Procure uma pedra bem diferente no quintal ou na rua. Ela é pesada? Tem brilho? Tem furinhos? Guarde como a sua amostra de asteroide.',

  chat: {
    lia: 'Meteoro é o risco de luz. Meteorito é a pedra no chão. Asteroide é a pedra no espaço. Três nomes pra mesma pedra!',
    tomas: 'There are many pizzas. Viu? Já sei inglês.',
    bia: 'Se eu minerasse asteroides, ia ficar rica. Tem asteroide cheio de metal!',
    caio: 'Um cinturão de asteroides... eu só tenho um cinto. E ele vive caindo.',
    rival: 'Hunf. Asteroide? Eu acerto todos. Pew pew pew.',
    kdok: 'Bip! Vou guardar as amostras com cuidado. Da última vez derrubei uma lasanha no hangar.',
    ze: 'O mais estranho: o sinal é igual em todas as direções do céu. Como se o universo inteiro estivesse cochichando.',
  },
};
