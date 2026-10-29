'use strict';
// MISSÃO 9: SATURNO · lançamento de Baikonur (Cazaquistão)
A.MISSIONS[8] = {
  n: 9, name: 'SATURNO', goal: 'atravessar os anéis de Saturno',
  place: 'BAIKONUR', where: 'Baikonur, Cazaquistão', scene: 'baikonur', game: 'saturn', body: 'saturn', room: 'patio',
  guest: { who: 'DRA. PAZ', look: [1, 2, 0], t: '¡Hola, {nome}! Vim do Chile ajudar o Zé com o sinal. Os telescópios do Atacama também escutam ele, dia e noite.' },

  brief: [
    { who: 'CMTE. DOZINHO', t: '{{Capitão|Capitã}}. A Dra. Paz veio do Chile para estudar o sinal com o Zé. Fale com ela, está lá fora.' },
    { who: 'CMTE. DOZINHO', t: 'Missão 9: SATURNO. Você vai atravessar os anéis. Sem arranhar a pintura.' },
    { who: 'CMTE. DOZINHO', t: 'Hoje a aula é no PÁTIO da escola.' },
  ],
  ready: [
    { who: 'CMTE. DOZINHO', t: 'Aulas concluídas. O lançamento será em Baikonur, no Cazaquistão: o centro de lançamentos espaciais mais antigo do mundo.' },
  ],
  teacher: [
    'Aula no pátio! Hoje é GEOGRAFIA: pontos cardeais, latitude e longitude. Vamos achar o norte usando o Sol!',
    'Agora, a aula de ASTRONOMIA da sua missão, {nome}: SATURNO, o senhor dos anéis!',
  ],
  after: 'Muito bem, {nome}! Pode ir falar com o Comandante.',

  lessons: [{
    id: 'm9a', subject: 'GEOGRAFIA', title: 'Onde fica cada lugar',
    slides: [
      `<p>Para se localizar, a gente usa os <b>pontos cardeais</b>: <b>norte</b> (N), <b>sul</b> (S), <b>leste</b> (L) e <b>oeste</b> (O). Entre eles ficam os <b>colaterais</b>: nordeste, sudeste, sudoeste e noroeste.</p>
       <div class="calc">         N
    NO       NE
 O               L
    SO       SE
         S</div><p>O Sol nasce mais ou menos do lado <b>leste</b> e se põe do lado <b>oeste</b>. Truque: aponte o braço direito para onde o Sol nasce. Na sua frente fica o <b>norte</b>, nas costas o <b>sul</b>, e o braço esquerdo aponta o <b>oeste</b>.</p>`,
      `<p>A <b>Linha do Equador</b> é uma linha imaginária que dá a volta na Terra pelo meio. Ela divide o planeta em <b>Hemisfério Norte</b> e <b>Hemisfério Sul</b>.</p>
       <p>A <b>latitude</b> diz quantos graus um lugar está ao norte ou ao sul do Equador, de 0° até 90° (os polos). Algumas linhas têm nome:</p>
       <div class="calc">Trópico de Câncer      23° N
Linha do Equador        0°
Trópico de Capricórnio 23° S</div><p>Entre os dois trópicos fica a <b>zona tropical</b>, a parte mais quente da Terra. O Equador passa em Macapá, no Amapá, e o Trópico de Capricórnio passa perto da cidade de São Paulo. A maior parte do Brasil, com a Bahia e o Capão, fica na zona tropical.</p>`,
      `<p>A <b>longitude</b> diz quantos graus um lugar está a leste ou a oeste do <b>Meridiano de Greenwich</b>, uma linha imaginária que vai de um polo ao outro e passa por Londres, na Inglaterra. Ela vai de 0° até 180°, para leste (L) ou para oeste (O).</p>
       <p>Juntando latitude e longitude, a gente tem as <b>coordenadas</b>: o endereço de qualquer lugar da Terra.</p>
       <div class="calc">Vale do Capão  cerca de 13° S, 41° O
Baikonur       cerca de 46° N, 63° L</div><p><b>Erro comum:</b> trocar as duas. Latitude é norte ou sul (medida a partir do Equador). Longitude é leste ou oeste (medida a partir de Greenwich).</p>`,
    ],
    quiz: [
      { q: 'O Sol nasce, mais ou menos, de qual lado?', o: ['oeste', 'norte', 'leste', 'sul'], a: 2, hint: 'É o mesmo lado que dá o apelido ao Japão: a Terra do Sol Nascente.', why: 'O Sol nasce do lado leste e se põe do lado oeste.' },
      { q: 'Qual linha imaginária divide a Terra em Hemisfério Norte e Hemisfério Sul?', o: ['Linha do Equador', 'Meridiano de Greenwich', 'Trópico de Câncer', 'Trópico de Capricórnio'], a: 0, hint: 'É a linha de 0° de latitude, que passa bem no meio do planeta.', why: 'A Linha do Equador divide a Terra em norte e sul. Greenwich divide em leste e oeste.' },
      { q: 'De manhã, no pátio, {rival} apontou o braço direito para onde o Sol nasceu. Para que lado {rival} está de frente?', o: ['sul', 'norte', 'oeste', 'leste'], a: 1, hint: 'O braço direito aponta o leste. Use o truque da aula.', why: 'Com o braço direito no leste, a frente fica no norte, as costas no sul e o braço esquerdo no oeste.' },
      { q: 'O Trópico de Câncer fica a cerca de 23° ao norte do Equador, e o de Capricórnio, a 23° ao sul. Quantos graus de latitude separam os dois trópicos?', n: 46, calc: '23 + 23 = ?', hint: 'Um está ao norte e o outro ao sul. Do primeiro até o Equador são 23°, e do Equador até o segundo, mais 23°.', why: '23 + 23 = 46°. Essa faixa entre os dois é a zona tropical.' },
      { q: 'O Vale do Capão fica a cerca de 13° S e 41° O. Qual destas frases está certa?', o: ['O Capão fica no Hemisfério Norte, a leste de Greenwich', 'O Capão fica ao norte do Trópico de Câncer', 'O Capão fica em cima da Linha do Equador', 'O Capão fica no Hemisfério Sul, a oeste de Greenwich, entre o Equador e o Trópico de Capricórnio'], a: 3, hint: 'S quer dizer sul e O quer dizer oeste. E 13° está entre 0° (Equador) e 23° (Trópico de Capricórnio).', why: '13° S é Hemisfério Sul, 41° O é a oeste de Greenwich, e 13° fica entre o Equador e o Trópico de Capricórnio.' },
      { q: 'Baikonur fica a cerca de 46° N, e o Capão, a cerca de 13° S. Quantos graus de latitude separam os dois lugares?', n: 59, calc: '46 + 13 = ?', hint: 'Um está no norte e o outro no sul: o caminho passa pelo Equador. Some a distância de cada um até o Equador.', why: 'De Baikonur até o Equador são 46°, e do Equador até o Capão, mais 13°: 46 + 13 = 59°.' },
    ],
  }, {
    id: 'm9b', subject: 'ASTRONOMIA', title: 'O senhor dos anéis',
    slides: [
      `<p><b>Saturno</b> é o sexto planeta a partir do Sol e o segundo maior, com uns <b>120.000 km</b> de diâmetro. Seus <b>anéis</b> são feitos de bilhões de <b>pedaços de gelo e rocha</b>, de grãozinhos até blocos do tamanho de uma casa.</p>
       <p>Os anéis são enormes de largura, mas finíssimos: em muitos lugares têm só uns <b>10 metros</b> de espessura. Quando a Terra fica alinhada com eles, como em março de 2025, a gente vê os anéis bem de lado, e eles quase <b>somem</b> no telescópio.</p>`,
      `<p>Saturno é um gigante de gás tão pouco denso que <b>boiaria</b> na água, se existisse uma banheira maior que ele!</p>
       <p>Um dia em Saturno dura umas 10 horas e meia. Mas a volta em torno do Sol é lenta: leva uns <b>29 anos</b>. E ele tem mais de <b>200 luas</b> conhecidas.</p>`,
      `<p><b>Titã</b>, a maior lua de Saturno, é maior que o planeta Mercúrio. Ela tem ar grosso, chuva, rios e lagos. Mas não de água: de <b>metano líquido</b>, porque lá faz um frio de uns −180 °C!</p>
       <p>A sonda <b>Cassini</b> estudou Saturno de <b>2004 a 2017</b>. Ela soltou um robozinho, a Huygens, que pousou em Titã em 2005. No fim, a Cassini mergulhou em Saturno.</p>`,
    ],
    quiz: [
      { q: 'Do que são feitos os anéis de Saturno?', o: ['ouro', 'fumaça', 'pedaços de gelo e rocha', 'arco-íris'], a: 2, hint: 'São bilhões de pedacinhos, de grãos até blocos do tamanho de uma casa.', why: 'Os anéis são bilhões de pedaços de gelo e rocha girando em volta do planeta.' },
      { q: 'Titã, a maior lua de Saturno, tem:', o: ['florestas', 'lagos de metano líquido', 'cidades', 'oceanos de lava'], a: 1, hint: 'Lá faz um frio enorme. Os lagos não são de água.', why: 'Titã tem rios e lagos de metano líquido.' },
      { q: 'Se existisse uma banheira gigante cheia de água, maior que Saturno, o planeta:', o: ['afundaria rápido', 'derreteria', 'voaria para longe', 'boiaria'], a: 3, hint: 'Saturno é muito pouco denso: é mais leve que a mesma quantidade de água.', why: 'Saturno é menos denso que a água, então boiaria.' },
      { q: 'Saturno leva uns 29 anos para dar a volta no Sol. Quantas voltas ele dá em 87 anos?', n: 3, calc: '87 ÷ 29 = ?', hint: 'Quantas vezes 29 cabe em 87? Experimente 29 + 29 + 29.', why: '29 × 3 = 87, então são 3 voltas.' },
      { q: 'Em março de 2025, a Terra ficou alinhada com os anéis de Saturno e a gente os viu bem de lado. O que aconteceu?', o: ['Ficaram mais brilhantes', 'Viraram um círculo completo', 'Quase sumiram, porque são finíssimos', 'Mudaram de cor'], a: 2, hint: 'Os anéis são largos, mas têm só uns 10 metros de espessura em muitos lugares. Como fica uma folha de papel vista de lado?', why: 'Vistos de lado, os anéis viram uma linha fininha e quase somem no telescópio.' },
    ],
  }],

  site: {
    look: [0, 0, 1],
    intro: [
      { who: 'CEL. ALIYA', t: 'Sálem, {nome}! Sou a coronel Aliya, cosmonauta. {{Bem-vindo|Bem-vinda}} a Baikonur, no Cazaquistão!' },
    ],
    lesson: {
      id: 'm9c', subject: 'HISTÓRIA · CAZAQUISTÃO', title: 'Onde a corrida espacial começou',
      slides: [
        `<p>O <b>Cazaquistão</b> fica na Ásia Central. É o <b>maior país do mundo sem saída para o mar</b>. A capital é <b>Astana</b>.</p>
         <p>Lá existem estepes enormes: planícies de grama a perder de vista, com cavalos e camelos. Até 1991, o Cazaquistão fazia parte da <b>União Soviética</b>, um país enorme que tinha a Rússia no centro. Quando a União Soviética acabou, ele ficou independente.</p>`,
        `<p>Nos anos 1950, a União Soviética construiu em <b>Baikonur</b> a base de foguetes mais antiga do mundo. Ela disputava com os Estados Unidos a <b>corrida espacial</b>: quem chegava primeiro ao espaço. Daqui partiram:</p>
         <div class="calc">1957 → Sputnik, o primeiro
       satélite artificial
1961 → Yuri Gagarin, o primeiro
       ser humano no espaço</div>`,
        `<p>Na decolagem, Gagarin gritou: <b>"Poyekhali!"</b>, que quer dizer <b>"Vamos!"</b>. Lá de cima, ele disse que a Terra era azul e muito bonita.</p>
         <p>Hoje a base fica no Cazaquistão, mas quem a usa é a Rússia, que aluga Baikonur do país.</p>`,
      ],
      quiz: [
        { q: 'Quem foi o primeiro ser humano no espaço, em 1961?', o: ['Neil Armstrong', 'Yuri Gagarin', 'Marcos Pontes', 'Galileu'], a: 1, hint: 'Foi um cosmonauta que saiu de Baikonur e gritou "Poyekhali!".', why: 'Yuri Gagarin, saindo de Baikonur. Neil Armstrong foi o primeiro a pisar na Lua, em 1969.' },
        { q: 'Na decolagem, Gagarin gritou "Poyekhali!". O que isso quer dizer?', o: ['"Houston, temos um problema"', '"Olá, Lua!"', '"Vamos!"', '"Cadê meu lanche?"'], a: 2, hint: 'Releia a tela 3: é o que Gagarin gritou quando a viagem ia começar.', why: 'Poyekhali quer dizer "Vamos!".' },
        { q: 'O Sputnik subiu em 1957 e Gagarin em 1961. Quantos anos de diferença?', n: 4, calc: '1961 − 1957 = ?', hint: 'Faça 1961 − 1957, ou conte nos dedos a partir de 1957.', why: '1961 − 1957 = 4 anos.' },
        { q: 'O Cazaquistão é o maior país do mundo que:', o: ['tem mais praias', 'tem mais vulcões', 'fica na América', 'não tem saída para o mar'], a: 3, hint: 'Ele fica no meio da Ásia, todo cercado de terra.', why: 'É o maior país sem saída para o mar: todo cercado de terra.' },
        { q: 'Quando o Sputnik e Gagarin partiram de Baikonur, o Cazaquistão fazia parte de qual país?', o: ['União Soviética', 'Estados Unidos', 'Japão', 'China'], a: 0, hint: 'Era o país que disputava a corrida espacial com os Estados Unidos, e que acabou em 1991.', why: 'O Cazaquistão fez parte da União Soviética até 1991. Foi ela que construiu Baikonur.' },
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
  radio: 'Aqui é a Astrokdok! Latitude e longitude são o endereço de qualquer lugar da Terra. Até o Capão tem o dele. Mandou bem, {nome}! Câmbio!',
  real: 'Amanhã cedo, veja de que lado o Sol nasce na sua casa: ali é o leste. Aponte o braço direito para lá. Na sua frente fica o norte, e nas suas costas, o sul. Marque os quatro lados com pedrinhas no quintal!',

  chat: {
    yuki: 'No Japão, Saturno é Dosei: "estrela da terra". Cada planeta tem um elemento!',
    lia: 'Os anéis de Saturno estão caindo no planeta aos pouquinhos. Chuva de anel!',
    tomas: 'Se Saturno boia na água, eu quero uma banheira desse tamanho.',
    bia: 'O Aquecedor de Íons é ideia minha também. O Kdok queria usar uma sanduicheira.',
    caio: 'Aula no pátio! Aqui na sombra da mangueira dá pra aprender deitado.',
    rival: 'Atravessar os anéis? Bora! Eu fico no rádio contando as brechas pra você: três, dois, um... vai!',
    kdok: 'Bip! Um ano em Saturno dura 29 anos da Terra. Se eu morasse lá, teria 0 anos. Sou um bebê robô!',
    ze: 'Descobri uma coisa: o sinal é fraquinho e muito frio. Como o calor que sobra de uma fogueira apagada há muito tempo.',
  },
};
