'use strict';
// MISSÃO 8 — JÚPITER · lançamento de Kourou (Guiana Francesa)
A.MISSIONS[7] = {
  n: 8, name: 'JÚPITER', goal: 'registrar as 4 luas que Galileu viu',
  place: 'GUIANA FRANCESA', where: 'Kourou, Guiana Francesa', scene: 'guiana', game: 'jupiter', body: 'jupiter', room: 'biblio',

  brief: [
    { who: 'CMTE. JULIUS', t: 'Capitão {nome}. Começa uma nova fase: os planetas GIGANTES.' },
    { who: 'CMTE. JULIUS', t: 'Missão 8: JÚPITER, o maior de todos. Você vai registrar as 4 luas que Galileu descobriu em 1610.' },
    { who: 'CMTE. JULIUS', t: 'E temos uma aluna nova na escola. Seja um bom anfitrião. Aula na BIBLIOTECA.' },
  ],
  ready: [
    { who: 'CMTE. JULIUS', t: 'Aulas concluídas. O lançamento será em Kourou, na Guiana Francesa, a base de foguetes da Europa.' },
    { who: 'CMTE. JULIUS', t: 'É logo ali, vizinha do Amapá. Leve o Escudo de Radiação: Júpiter não perdoa.' },
  ],
  teacher: [
    'Bom dia! Temos uma aluna nova: a Yuki, que veio do Japão! Hoje é HISTÓRIA: séculos e linha do tempo.',
    'Agora, a aula da missão do {nome}: JÚPITER, o gigante!',
  ],
  after: 'Muito bem, {nome}! O Comandante está esperando.',

  lessons: [{
    id: 'm8a', subject: 'HISTÓRIA', title: 'Séculos e linha do tempo',
    slides: [
      `<p>Um <b>século</b> tem <b>100 anos</b>. Os séculos são escritos em <b>algarismos romanos</b>:</p>
       <div class="calc">1901 a 2000 → século XX  (20)
2001 a 2100 → século XXI (21)</div><p>Nós estamos no século <b>XXI</b>!</p>`,
      `<p><b>Truque para achar o século:</b> tire os dois últimos algarismos e some 1.</p>
       <div class="calc">1610 → 16 + 1 = 17 → século XVII
1969 → 19 + 1 = 20 → século XX</div><p><b>Cuidado:</b> se o ano termina em 00, NÃO soma 1. O ano 1500 é o último do século XV.</p>`,
      `<p>Uma <b>linha do tempo</b> coloca os fatos em ordem:</p>
       <div class="calc">1500 → portugueses chegam
       ao Brasil
1610 → Galileu vê as luas
       de Júpiter
1969 → pessoas pisam
       na Lua</div>`,
    ],
    quiz: [
      { q: 'Um século tem quantos anos?', n: 100, why: '100 anos.' },
      { q: 'Estamos no século:', o: ['XX', 'XXI', 'XIX', 'XII'], a: 1, why: 'De 2001 a 2100: século XXI (21).' },
      { q: 'Galileu viu as luas de Júpiter em 1610. Isso foi no século:', o: ['XVI', 'XVII', 'XV', 'XX'], a: 1, hint: 'Tire o 10 e some 1 ao 16.', why: '16 + 1 = 17: século XVII.' },
      { q: 'Os portugueses chegaram ao Brasil em 1500. Em que século?', o: ['XV', 'XVI', 'XIV', 'XVII'], a: 0, hint: 'Lembre da regra do 00!', why: 'Termina em 00: não soma 1. 1500 é o último ano do século XV.' },
      { q: 'Quantos anos se passaram de 1610 (Galileu) até 1969 (pessoas na Lua)?', n: 359, hint: 'Faça 1969 − 1610.', why: '1969 − 1610 = 359 anos.' },
    ],
  }, {
    id: 'm8b', subject: 'CIÊNCIAS + MATEMÁTICA', title: 'O rei dos planetas',
    slides: [
      `<p><b>Júpiter</b> é o maior planeta: caberiam umas <b>1.300 Terras</b> dentro dele! Ele é feito de gás e <b>não tem chão</b> para pousar.</p>
       <p>E gira rápido: um dia em Júpiter dura só <b>10 horas</b>.</p>`,
      `<p>A <b>Grande Mancha Vermelha</b> é uma tempestade maior que a Terra inteira. Os astrônomos a observam há quase 200 anos!</p>
       <p>Júpiter tem mais de <b>90 luas</b>. As quatro maiores foram vistas por <b>Galileu Galilei</b> em 1610, com uma luneta.</p>`,
      `<div class="calc">IO        → cheia de vulcões
EUROPA    → oceano escondido
            embaixo do gelo
GANIMEDES → a maior lua do
            Sistema Solar
CALISTO   → coberta de crateras</div><p>Ganimedes é maior até que o planeta Mercúrio!</p>`,
    ],
    quiz: [
      { q: 'Júpiter é:', o: ['o maior planeta do Sistema Solar', 'o menor planeta', 'uma estrela', 'uma lua'], a: 0, why: 'O gigante: caberiam 1.300 Terras dentro dele.' },
      { q: 'Júpiter gira em 10 horas. Quantos dias COMPLETOS de Júpiter cabem em 1 dia da Terra (24 h)?', n: 2, hint: '10 × 2 = 20. E 10 × 3?', why: '24 ÷ 10 = 2, e sobram 4 horas.' },
      { q: 'Qual lua de Júpiter tem um oceano escondido embaixo do gelo?', o: ['Io', 'Europa', 'Ganimedes', 'Calisto'], a: 1, why: 'Europa! Talvez um dia a gente encontre vida lá.' },
      { q: 'A Grande Mancha Vermelha é:', o: ['uma tempestade maior que a Terra', 'um vulcão', 'um lago de lava', 'uma cidade'], a: 0, why: 'Uma tempestade gigante, observada há quase 200 anos.' },
      { q: 'Ganimedes é a maior lua do Sistema Solar. Ela é maior até que:', o: ['o planeta Mercúrio', 'o Sol', 'Júpiter', 'a Terra'], a: 0, why: 'Ganimedes é maior que Mercúrio!' },
    ],
  }],

  site: {
    look: [1, 3, 0],
    intro: [
      { who: 'ENG. LÉA', t: 'Bonjour, {nome}! Sou a engenheira Léa. Bem-vindo ao Centro Espacial da Guiana!' },
    ],
    lesson: {
      id: 'm8c', subject: 'GEOGRAFIA · GUIANA FRANCESA', title: 'A França na América do Sul',
      slides: [
        `<p>A <b>Guiana Francesa</b> fica na América do Sul, mas pertence à <b>França</b>! Ela faz fronteira com o Brasil, no estado do <b>Amapá</b>.</p>
         <p>O rio <b>Oiapoque</b> separa os dois. Por isso a expressão <b>"do Oiapoque ao Chuí"</b> quer dizer "de uma ponta à outra do Brasil".</p>`,
        `<p>Lá se fala <b>francês</b> e se usa o <b>euro</b>:</p>
         <div class="calc">BONJOUR = bom dia
MERCI   = obrigado
ÉTOILE  = estrela</div>`,
        `<p>Em Kourou fica o <b>Centro Espacial da Guiana</b>, a base de foguetes da Europa. Como Alcântara, ela fica perto da <b>Linha do Equador</b>.</p>
         <p>Daqui partiu, em <b>2023</b>, a sonda <b>JUICE</b>, que vai estudar as luas de Júpiter. Ela deve chegar lá em <b>2031</b>.</p>`,
      ],
      quiz: [
        { q: 'A Guiana Francesa pertence a qual país?', o: ['França', 'Brasil', 'Suriname', 'Portugal'], a: 0, why: 'À França, mesmo ficando na América do Sul.' },
        { q: 'Qual rio separa o Brasil da Guiana Francesa?', o: ['Oiapoque', 'Amazonas', 'São Francisco', 'Chuí'], a: 0, why: 'O rio Oiapoque, no Amapá.' },
        { q: '"Merci" quer dizer:', o: ['obrigado', 'bom dia', 'estrela', 'tchau'], a: 0, why: 'Merci = obrigado.' },
        { q: 'A sonda JUICE saiu daqui em 2023 e deve chegar a Júpiter em 2031. Quantos anos de viagem?', n: 8, hint: 'Faça 2031 − 2023.', why: '8 anos de viagem!' },
        { q: 'O que quer dizer "do Oiapoque ao Chuí"?', o: ['De uma ponta à outra do Brasil', 'Do mar à montanha', 'Da manhã à noite', 'De Júpiter a Saturno'], a: 0, why: 'O Oiapoque fica no norte e o Chuí no sul do Brasil.' },
      ],
    },
    outro: [
      { who: 'ENG. LÉA', t: 'Bon voyage! Dê um oi para Europa por mim.' },
    ],
  },

  gameIntro: [
    { who: 'KDOK', t: 'Bip! As quatro luas vão piscar numa sequência. Cada uma fica numa direção.' },
    { who: 'KDOK', t: 'Repita a sequência com ▲ ▶ ▼ ◀. IO em cima, EUROPA à direita, GANIMEDES embaixo, CALISTO à esquerda.' },
  ],

  debrief: [
    { who: 'KDOK', t: 'LUAS REGISTRADAS! Júpiter é listrado de nuvens, com tempestades do tamanho de planetas.' },
    { who: 'KDOK', t: 'Io, Europa, Ganimedes e Calisto: as mesmas luas que Galileu viu em 1610, com uma lunetinha.' },
    { who: 'KDOK', t: 'Europa tem um oceano embaixo do gelo. Talvez um dia a gente encontre vida lá.' },
    { who: 'KDOK', t: 'Bip! O Escudo de Radiação salvou meus circuitos. E o sinal continua: fraquinho, de todos os lados.' },
  ],
  card: { id: 'jupiter', name: 'JÚPITER', lines: ['O maior planeta: caberiam 1.300 Terras', 'Planeta de gás, sem chão', 'Grande Mancha Vermelha: tempestade gigante', 'Mais de 90 luas', 'Dia: só 10 horas'] },
  reward: { id: 'radar', name: 'RADAR DE ANÉIS', desc: 'Mostra as brechas entre os pedaços de gelo. Nos anéis de Saturno, vale um escudo a mais.' },
  radio: 'Filho, com um binóculo dá pra ver as luas de Júpiter como pontinhos do lado dele. Igual o Galileu viu! Vamos tentar juntos? Câmbio!',
  real: 'Monte uma linha do tempo num papel comprido: 1500 (portugueses no Brasil), 1610 (Galileu), 1969 (pessoas na Lua) e o ano em que você nasceu.',

  chat: {
    yuki: 'Oi! Sou a Yuki. No Japão, Júpiter se chama Mokusei: "estrela da madeira".',
    lia: 'Júpiter tem mais de 90 luas. Imagina ter que dar nome pra todas.',
    tomas: 'Um dia em Júpiter tem 10 horas. Então lá o almoço chega mais rápido?',
    bia: 'Eu desenhei o Escudo de Radiação. O Kdok só apertou os parafusos. E sobrou um. De novo.',
    caio: 'Galileu ficava acordado de noite olhando o céu. Meu tipo de gente... só que acordado.',
    rival: 'Hunf. A Yuki sabe mais de Júpiter que você. Agora são dois para eu vencer.',
    kdok: 'Bip! Io, Europa, Ganimedes, Calisto. Decorei com uma música: I-E-G-C, iô-iê-guê-cê!',
    ze: 'Fiz as contas: se o sinal viesse de uma estrela, ele sumiria quando ela se põe. Ele não some nunca.',
  },
};
