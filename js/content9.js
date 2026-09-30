'use strict';
// MISSÃO 9 — SATURNO · lançamento de Baikonur (Cazaquistão)
A.MISSIONS[8] = {
  n: 9, name: 'SATURNO', goal: 'atravessar os anéis de Saturno',
  place: 'BAIKONUR', where: 'Baikonur, Cazaquistão', scene: 'baikonur', game: 'saturn', body: 'saturn', room: 'patio',
  guest: { who: 'DRA. PAZ', look: [1, 2, 0], t: '¡Hola, {nome}! Vim do Chile ajudar o Zé com o sinal. Os telescópios do Atacama também escutam ele, dia e noite.' },

  brief: [
    { who: 'CMTE. JULIUS', t: 'Capitão. A Dra. Paz veio do Chile para estudar o sinal com o Zé. Fale com ela, está lá fora.' },
    { who: 'CMTE. JULIUS', t: 'Missão 9: SATURNO. Você vai atravessar os anéis. Sem arranhar a pintura.' },
    { who: 'CMTE. JULIUS', t: 'Hoje a aula é no PÁTIO da escola.' },
  ],
  ready: [
    { who: 'CMTE. JULIUS', t: 'Aulas concluídas. O lançamento será em Baikonur, no Cazaquistão: a base de foguetes mais antiga do mundo.' },
  ],
  teacher: [
    'Aula no pátio! Hoje é MATEMÁTICA: geometria. Trouxe giz para desenhar círculos no chão.',
    'Agora, a aula da missão do {nome}: SATURNO, o senhor dos anéis!',
  ],
  after: 'Muito bem, {nome}! Pode ir falar com o Comandante.',

  lessons: [{
    id: 'm9a', subject: 'MATEMÁTICA', title: 'Círculos e figuras',
    slides: [
      `<p>Todo <b>círculo</b> tem um <b>centro</b>. A distância do centro até a borda é o <b>raio</b>.</p>
       <p>O <b>diâmetro</b> atravessa o círculo inteiro, passando pelo centro. Ele vale <b>2 raios</b>:</p>
       <div class="calc">diâmetro = 2 × raio
raio     = diâmetro ÷ 2</div>`,
      `<p>Figuras com lados retos:</p>
       <div class="calc">TRIÂNGULO  → 3 lados
QUADRADO   → 4 lados iguais
RETÂNGULO  → 4 lados, 2 a 2
             iguais</div><p>O círculo é a única que <b>não tem lados retos</b>.</p>`,
      `<p><b>Perímetro</b> é a medida da volta toda: some todos os lados.</p>
       <div class="calc">Quadrado de lado 5:
5 + 5 + 5 + 5 = 20
(ou 4 × 5 = 20)</div>`,
    ],
    quiz: [
      { q: 'Um anel tem raio de 5 cm. Qual é o diâmetro?', n: 10, hint: 'Diâmetro = 2 × raio.', why: '2 × 5 = 10 cm.' },
      { q: 'Um círculo tem diâmetro de 18 cm. Qual é o raio?', n: 9, hint: 'Raio = diâmetro ÷ 2.', why: '18 ÷ 2 = 9 cm.' },
      { q: 'Um quadrado tem lados de 7 cm. Qual é o perímetro?', n: 28, hint: 'São 4 lados iguais.', why: '4 × 7 = 28 cm.' },
      { q: 'Qual figura NÃO tem lados retos?', o: ['círculo', 'triângulo', 'quadrado', 'retângulo'], a: 0, why: 'O círculo é todo curvo.' },
      { q: 'Um triângulo tem lados de 5, 6 e 7 cm. Qual é o perímetro?', n: 18, hint: 'Some os três lados.', why: '5 + 6 + 7 = 18 cm.' },
    ],
  }, {
    id: 'm9b', subject: 'CIÊNCIAS + MATEMÁTICA', title: 'O senhor dos anéis',
    slides: [
      `<p><b>Saturno</b> é o sexto planeta e o segundo maior. Seus <b>anéis</b> são feitos de bilhões de <b>pedaços de gelo e rocha</b>, de grãozinhos até blocos do tamanho de uma casa.</p>
       <p>Os anéis são enormes de largura, mas finíssimos: em muitos lugares têm só uns <b>10 metros</b> de espessura.</p>`,
      `<p>Saturno é um gigante de gás tão pouco denso que <b>boiaria</b> numa banheira gigante cheia de água!</p>
       <p>Ele leva uns <b>29 anos</b> para dar a volta no Sol, e tem mais de <b>200 luas</b> conhecidas.</p>`,
      `<p><b>Titã</b>, a maior lua de Saturno, tem ar grosso, rios e lagos. Mas não de água: de <b>metano líquido</b>!</p>
       <p>A sonda <b>Cassini</b> estudou Saturno de <b>2004 a 2017</b>.</p>`,
    ],
    quiz: [
      { q: 'Do que são feitos os anéis de Saturno?', o: ['Pedaços de gelo e rocha', 'Ouro', 'Fumaça', 'Arco-íris'], a: 0, why: 'Bilhões de pedacinhos de gelo e rocha.' },
      { q: 'Saturno é tão pouco denso que:', o: ['boiaria numa banheira gigante', 'voaria', 'afundaria rápido', 'derreteria'], a: 0, why: 'Ele é menos denso que a água!' },
      { q: 'Saturno leva uns 29 anos para dar a volta no Sol. Quantas voltas ele dá em 87 anos?', n: 3, hint: 'Quantas vezes 29 cabe em 87? Experimente 29 × 3.', why: '87 ÷ 29 = 3 voltas.' },
      { q: 'Titã, a maior lua de Saturno, tem:', o: ['lagos de metano líquido', 'florestas', 'cidades', 'oceanos de lava'], a: 0, why: 'Rios e lagos de metano.' },
      { q: 'A Cassini estudou Saturno de 2004 até 2017. Quantos anos?', n: 13, hint: 'Faça 2017 − 2004.', why: '13 anos de estudo!' },
    ],
  }],

  site: {
    look: [0, 0, 1],
    intro: [
      { who: 'CEL. ALIYA', t: 'Sálem, {nome}! Sou a coronel Aliya, cosmonauta. Bem-vindo a Baikonur, no Cazaquistão!' },
    ],
    lesson: {
      id: 'm9c', subject: 'HISTÓRIA · CAZAQUISTÃO', title: 'Onde a corrida espacial começou',
      slides: [
        `<p>O <b>Cazaquistão</b> fica na Ásia Central. É o <b>maior país do mundo sem saída para o mar</b>. A capital é <b>Astana</b>.</p>
         <p>Lá existem estepes enormes: planícies de grama a perder de vista, com cavalos e camelos.</p>`,
        `<p>Em <b>Baikonur</b> fica a base de foguetes mais antiga do mundo. Daqui partiram:</p>
         <div class="calc">1957 → Sputnik, o primeiro
       satélite artificial
1961 → Yuri Gagarin, o primeiro
       ser humano no espaço</div>`,
        `<p>Na decolagem, Gagarin gritou: <b>"Poyekhali!"</b>, que quer dizer <b>"Vamos!"</b>.</p>
         <p>Lá de cima, ele disse que a Terra era azul e muito bonita.</p>`,
      ],
      quiz: [
        { q: 'Quem foi o primeiro ser humano no espaço, em 1961?', o: ['Yuri Gagarin', 'Neil Armstrong', 'Marcos Pontes', 'Galileu'], a: 0, why: 'Yuri Gagarin, saindo de Baikonur.' },
        { q: 'O Sputnik subiu em 1957 e Gagarin em 1961. Quantos anos de diferença?', n: 4, hint: 'Faça 1961 − 1957.', why: '4 anos.' },
        { q: 'O Cazaquistão é o maior país do mundo que:', o: ['não tem saída para o mar', 'tem mais praias', 'tem mais vulcões', 'fica na América'], a: 0, why: 'Todo cercado de terra.' },
        { q: 'Qual é a capital do Cazaquistão?', o: ['Astana', 'Moscou', 'Baikonur', 'Tóquio'], a: 0, why: 'Astana.' },
        { q: 'O que Gagarin disse na decolagem?', o: ['"Vamos!" (Poyekhali!)', '"Houston, temos um problema"', '"Olá, Lua!"', '"Cadê meu lanche?"'], a: 0, why: 'Poyekhali: vamos!' },
      ],
    },
    outro: [
      { who: 'CEL. ALIYA', t: 'Poyekhali, {nome}! Vamos!' },
    ],
  },

  gameIntro: [
    { who: 'KDOK', t: 'Bip! Os anéis são faixas de gelo girando em velocidades diferentes.' },
    { who: 'KDOK', t: 'Use ▲ ▼ ◀ ▶ para passar pelas brechas e chegar até o topo. Precisamos atravessar 3 vezes!' },
  ],

  debrief: [
    { who: 'KDOK', t: 'ANÉIS ATRAVESSADOS! São bilhões de pedaços de gelo girando juntos, como uma dança.' },
    { who: 'KDOK', t: 'Os cientistas acham que os anéis estão caindo aos pouquinhos no planeta. Daqui a milhões de anos, podem sumir.' },
    { who: 'KDOK', t: 'Titã, a lua gigante, tem rios e lagos. De metano! Nada de nadar lá.' },
    { who: 'KDOK', t: 'Bip... o sinal. O Zé diz que ele tem uma "temperatura". Sinal com temperatura? Que coisa.' },
  ],
  card: { id: 'saturno', name: 'SATURNO', lines: ['Sexto planeta', 'Anéis de gelo e rocha', 'Boiaria na água: é pouco denso', 'Mais de 200 luas conhecidas', 'Titã: lua com lagos de metano'] },
  reward: { id: 'aquecedor', name: 'AQUECEDOR DE ÍONS', desc: 'Mantém a nave quentinha no frio extremo. Urano e Netuno que se cuidem!' },
  radio: 'Filho, Saturno dá pra ver daqui a olho nu, como uma estrela amarelada. Os anéis, só com telescópio. Um dia a gente vai num observatório. Câmbio!',
  real: 'Pegue um prato e uma régua. Meça o diâmetro do prato (a maior medida, passando pelo meio). Agora divida por 2: esse é o raio!',

  chat: {
    yuki: 'No Japão, Saturno é Dosei: "estrela da terra". Cada planeta tem um elemento!',
    lia: 'Os anéis de Saturno estão caindo no planeta aos pouquinhos. Chuva de anel!',
    tomas: 'Se Saturno boia na água, eu quero uma banheira desse tamanho.',
    bia: 'O Aquecedor de Íons é ideia minha também. O Kdok queria usar uma sanduicheira.',
    caio: 'Aula no pátio! Aqui na sombra da mangueira dá pra aprender deitado.',
    rival: 'Hunf. Atravessar anéis? Eu jogava isso quando tinha 5 anos.',
    kdok: 'Bip! Um ano em Saturno dura 29 anos. Se eu morasse lá, teria 0 anos. Sou um bebê robô!',
    ze: 'Descobri uma coisa: o sinal é fraquinho e muito frio. Como o calor que sobra de uma fogueira apagada há muito tempo.',
  },
};
