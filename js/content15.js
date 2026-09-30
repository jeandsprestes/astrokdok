'use strict';
// MISSÃO 15 — SAGITÁRIO A* · lançamento de Mauna Kea (Havaí)
A.MISSIONS[14] = {
  n: 15, name: 'SAGITÁRIO A*', goal: 'orbitar o buraco negro do centro da galáxia',
  place: 'HAVAÍ', where: 'Mauna Kea, Havaí, EUA', scene: 'havai', game: 'blackhole', body: 'blackhole', room: 'school',

  brief: [
    { who: 'CMTE. JULIUS', t: 'Conselheiro. Missão 15: o centro da nossa galáxia. Lá mora SAGITÁRIO A*, um buraco negro gigante.' },
    { who: 'CMTE. JULIUS', t: 'É a missão mais perigosa até hoje. Por isso você não vai sozinho: o {rival} vai de copiloto.' },
    { who: 'CMTE. JULIUS', t: 'Ele pediu. Muito. Todo dia. Escola primeiro.' },
  ],
  ready: [
    { who: 'CMTE. JULIUS', t: 'Aulas concluídas. O lançamento será em Mauna Kea, no Havaí, onde ficam telescópios que fotografaram um buraco negro.' },
  ],
  teacher: [
    'Good morning! Hoje é INGLÊS: comparar coisas. Bigger, smaller, the biggest!',
    'Agora, a aula da missão do {nome}: um BURACO NEGRO!',
  ],
  after: 'Muito bem, {nome}! Cuide do {rival} lá em cima, viu?',

  lessons: [{
    id: 'm15a', subject: 'INGLÊS', title: 'Bigger and the biggest',
    slides: [
      `<p>Para comparar DUAS coisas, o inglês usa <b>-er</b> e <b>than</b> (que):</p>
       <div class="calc">big    → bigger    (maior)
small  → smaller   (menor)
fast   → faster    (mais rápido)
dark   → darker    (mais escuro)

Jupiter is BIGGER THAN Earth.</div>`,
      `<p>Para dizer que é o MAIS de todos, usa <b>the</b> e <b>-est</b>:</p>
       <div class="calc">the biggest  (o maior)
the smallest (o menor)
the hottest  (o mais quente)

The Sun is THE BIGGEST object
in the Solar System.</div>`,
      `<p>Palavras curtas que terminam em vogal + consoante dobram a última letra:</p>
       <div class="calc">big → bigger → the biggest
hot → hotter → the hottest</div>`,
    ],
    quiz: [
      { q: 'Complete: "Jupiter is ___ than Earth."', o: ['bigger', 'big', 'biggest'], a: 0, why: 'Comparando dois: bigger than.' },
      { q: 'Complete: "Mercury is the ___ planet."', o: ['smallest', 'smaller', 'small'], a: 0, why: 'O menor de todos: the smallest.' },
      { q: '"Faster" quer dizer:', o: ['mais rápido', 'o mais rápido', 'rápido'], a: 0, why: 'Faster = mais rápido.' },
      { q: 'Qual é o superlativo de "hot"?', o: ['the hottest', 'hotter', 'hot'], a: 0, why: 'The hottest: o mais quente. Com t dobrado!' },
      { q: 'Traduza: "The black hole is darker than the night."', o: ['O buraco negro é mais escuro que a noite.', 'O buraco negro é a noite.', 'A noite é mais escura que o buraco negro.'], a: 0, why: 'Darker than = mais escuro que.' },
    ],
  }, {
    id: 'm15b', subject: 'CIÊNCIAS + MATEMÁTICA', title: 'O buraco negro do centro',
    slides: [
      `<p>Um <b>buraco negro</b> é um lugar onde a gravidade é tão forte que <b>nem a luz consegue escapar</b>. Por isso ele é escuro.</p>
       <p>A borda de onde nada volta se chama <b>horizonte de eventos</b>.</p>`,
      `<p>No centro da Via Láctea mora <b>Sagitário A*</b>: um buraco negro com a massa de <b>4 milhões de Sóis</b>, a uns <b>26 mil anos-luz</b> daqui.</p>
       <p>A primeira foto dele saiu em <b>2022</b>. A de outro buraco negro, o M87*, saiu em <b>2019</b>.</p>`,
      `<p>Perto de um buraco negro, o <b>tempo passa mais devagar</b>. Um astronauta que ficasse um tempo lá perto voltaria mais novo que os amigos!</p>
       <p>A Via Láctea inteira, com centenas de bilhões de estrelas, gira em volta desse centro.</p>`,
    ],
    quiz: [
      { q: 'Um buraco negro é:', o: ['um lugar com gravidade tão forte que nem a luz escapa', 'um buraco no chão do espaço', 'uma estrela muito brilhante', 'um planeta preto'], a: 0, why: 'Nem a luz escapa!' },
      { q: 'Sagitário A* tem a massa de 4 milhões de Sóis. Escreva esse número:', n: 4000000, hint: '4 e mais seis zeros.', why: '4.000.000.' },
      { q: 'A borda de onde nada consegue voltar se chama:', o: ['horizonte de eventos', 'anel de Saturno', 'linha do Equador'], a: 0, why: 'Horizonte de eventos.' },
      { q: 'A foto de Sagitário A* saiu em 2022 e a do M87* em 2019. Quantos anos de diferença?', n: 3, why: '2022 − 2019 = 3 anos.' },
      { q: 'Perto de um buraco negro, o tempo:', o: ['passa mais devagar', 'para de existir', 'passa mais rápido'], a: 0, why: 'A gravidade forte deixa o tempo mais lento.' },
    ],
  }],

  site: {
    look: [0, 2, 0],
    extra: ['rival'],
    intro: [
      { who: 'KAI', t: 'Aloha, {nome}! Sou o Kai, navegador e astrônomo. Bem-vindo ao Mauna Kea, no Havaí!' },
      { who: '{rival}', t: 'Copiloto {rival} pronto! Eu trouxe o manual. E três sanduíches. Por via das dúvidas.' },
    ],
    lesson: {
      id: 'm15c', subject: 'GEOGRAFIA · HAVAÍ', title: 'Navegando pelas estrelas',
      slides: [
        `<p>O <b>Havaí</b> é um grupo de ilhas no meio do Oceano Pacífico. Elas foram formadas por <b>vulcões</b>. Em 1959, o Havaí virou o 50º estado dos Estados Unidos.</p>
         <p><i>Aloha</i> quer dizer olá, tchau e também amor!</p>`,
        `<p>O <b>Mauna Kea</b> é um vulcão de <b>4.207 m</b> acima do mar. Mas ele continua uns <b>6.000 m</b> para baixo, até o fundo do oceano! Contando tudo, é mais alto que o Everest.</p>
         <p>No topo ficam telescópios que ajudaram a fotografar buracos negros.</p>`,
        `<p>Há centenas de anos, os navegadores <b>polinésios</b> atravessavam o oceano sem mapas nem bússola: eles se guiavam pelas <b>estrelas</b>, pelas <b>ondas</b> e pelos <b>pássaros</b>.</p>`,
      ],
      quiz: [
        { q: 'Os navegadores polinésios atravessavam o oceano guiados por:', o: ['estrelas, ondas e pássaros', 'GPS', 'mapas de papel', 'aviões'], a: 0, why: 'Eles liam a natureza.' },
        { q: 'As ilhas do Havaí foram formadas por:', o: ['vulcões', 'geleiras', 'terremotos', 'rios'], a: 0, why: 'Vulcões no fundo do oceano.' },
        { q: 'O Mauna Kea tem 4.207 m acima do mar e uns 6.000 m embaixo d\'água. Qual é a altura total, mais ou menos?', n: 10207, hint: 'Some 4.207 + 6.000.', why: '10.207 m. Mais que o Everest!' },
        { q: '"Aloha" quer dizer:', o: ['olá, tchau e também amor', 'só tchau', 'obrigado'], a: 0, why: 'Aloha é uma palavra cheia de carinho.' },
        { q: 'O Havaí virou estado dos EUA em 1959. Quantos anos antes do pouso na Lua (1969)?', n: 10, why: '1969 − 1959 = 10 anos.' },
      ],
    },
    outro: [
      { who: 'KAI', t: 'Mahalo! Quer dizer: obrigado. Fiquem longe do horizonte de eventos, vocês dois!' },
    ],
  },

  gameIntro: [
    { who: '{rival}', t: 'Copiloto falando: a gravidade puxa a nave para DENTRO o tempo todo!' },
    { who: 'KDOK', t: 'Bip! Segure A para empurrar a nave para FORA. Fique no ANEL SEGURO, nem perto nem longe demais.' },
    { who: 'KDOK', t: 'Pegue 15 pontos de dados que giram no anel. E cuidado com as estrelas que passam voando!' },
  ],

  debrief: [
    { who: 'KDOK', t: 'DADOS COLETADOS! Orbitamos Sagitário A*, o coração da Via Láctea.' },
    { who: 'KDOK', t: 'Ele não brilha: o que brilha é o gás girando em volta, quente como um forno de estrelas.' },
    { who: '{rival}', t: 'Olha o Relógio de Dobra! Ficamos 1 hora aqui perto e na Terra passaram 3 dias! Minha mãe vai me matar.' },
    { who: 'KDOK', t: 'Bip! E o sinal está aqui também. Nem um buraco negro engole ele.' },
  ],
  card: { id: 'sgra', name: 'BURACO NEGRO SAGITÁRIO A*', lines: ['No centro da nossa galáxia', 'Massa: 4 milhões de Sóis', 'Distância: 26 mil anos-luz', 'Nem a luz escapa dele', 'Primeira foto: 2022'] },
  reward: { id: 'astrolabio', name: 'ASTROLÁBIO QUÂNTICO', desc: 'Mede ângulos entre estrelas com precisão total. Dá uma tentativa extra na próxima missão.' },
  radio: 'Filho, o Kdok me contou que perto do buraco negro o tempo passa mais devagar. Então aproveita: aí você fica criança por mais tempo. Câmbio!',
  real: 'Escreva uma frase em inglês comparando duas coisas da sua casa. Exemplo: "My dog is bigger than my cat."',

  chat: {
    yuki: 'No Japão, buraco negro é "burakku hōru". Parece inglês com sotaque japonês!',
    lia: 'O Sol leva uns 230 milhões de anos para dar UMA volta em volta do centro da galáxia!',
    tomas: 'Buraco negro engole tudo? Igual eu no almoço.',
    bia: 'Calibrei o Relógio de Dobra. Ele atrasa certinho com a gravidade.',
    caio: 'Perto do buraco negro o tempo passa devagar. Eu queria um desses no meu travesseiro.',
    rival: 'O Comandante deixou! Vou de copiloto nesta missão. Não conta pra ninguém que eu tô nervoso.',
    kdok: 'Bip! O {rival} vai com a gente. Vou ter que dividir a janela. Tudo bem. Divido a pipoca também.',
    ze: 'A Dra. Paz e eu vamos te contar tudo quando você for até a borda do universo. É lá que está a resposta.',
  },
};
