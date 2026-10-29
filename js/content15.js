'use strict';
// MISSÃO 15: SAGITÁRIO A* · lançamento de Mauna Kea (Havaí)
A.MISSIONS[14] = {
  n: 15, name: 'SAGITÁRIO A*', goal: 'orbitar o buraco negro do centro da galáxia',
  place: 'HAVAÍ', where: 'Mauna Kea, Havaí, EUA', scene: 'havai', game: 'blackhole', body: 'blackhole', room: 'school',

  brief: [
    { who: 'CMTE. DOZINHO', t: '{{Conselheiro|Conselheira}}. Missão 15: o centro da nossa galáxia. Lá mora SAGITÁRIO A*, um buraco negro gigante.' },
    { who: 'CMTE. DOZINHO', t: 'É a missão mais perigosa até hoje. Por isso você não vai {{sozinho|sozinha}}: {rival} vai de copiloto.' },
    { who: 'CMTE. DOZINHO', t: '{rival} pediu para ir com você. Muito. Todo dia. Escola primeiro.' },
  ],
  ready: [
    { who: 'CMTE. DOZINHO', t: 'Aulas concluídas. O lançamento será em Mauna Kea, no Havaí, onde ficam telescópios que fotografaram um buraco negro.' },
  ],
  teacher: [
    'Good morning, turma! Hoje é INGLÊS: vamos comparar coisas do espaço. Bigger, smaller, the biggest!',
    'Agora, a aula de ASTRONOMIA da missão de {nome}: um BURACO NEGRO, o lugar de onde nem a luz escapa!',
  ],
  after: 'Muito bem, {nome}! Lá em cima, você e {rival} cuidam um do outro, viu?',

  lessons: [{
    id: 'm15a', subject: 'INGLÊS', title: 'Bigger and the biggest',
    slides: [
      `<p>Para comparar <b>duas</b> coisas, o inglês põe <b>-er</b> no fim da palavra e usa <b>than</b>, que quer dizer "que" (do que).</p>
       <div class="calc">small → smaller  (menor)
fast  → faster   (mais rápido)
dark  → darker   (mais escuro)

Mars is SMALLER THAN Earth.
(Marte é menor que a Terra.)</div><p>Palavra curta que termina em vogal + consoante, como <b>big</b> e <b>hot</b>, dobra a última letra: big → <b>bigger</b>, hot → <b>hotter</b>. E a que termina em y troca o y por i: easy → <b>easier</b>.</p>`,
      `<p>Para dizer que uma coisa é a <b>mais</b> de todas, o inglês usa <b>the</b> antes e <b>-est</b> no fim. É o <b>superlativo</b>.</p>
       <div class="calc">small → the smallest (o menor)
big   → the biggest  (o maior)
hot   → the hottest  (o mais quente)

Jupiter is THE BIGGEST planet.
(Júpiter é o maior planeta.)</div><p>Repare: o comparativo junta <b>duas</b> coisas (com than); o superlativo escolhe <b>uma</b> entre todas (com the).</p>`,
      `<p>Palavras <b>longas</b> não ganham -er nem -est. Elas usam <b>more</b> (mais) e <b>the most</b> (o mais):</p>
       <div class="calc">dangerous → more dangerous
          → the most dangerous
beautiful → more beautiful
          → the most beautiful

A black hole is MORE DANGEROUS
than a comet.</div><p>Algumas palavras mudam inteiras: good → <b>better</b> → <b>the best</b> (bom, melhor, o melhor) e bad → <b>worse</b> → <b>the worst</b> (ruim, pior, o pior). <b>Erro comum:</b> dizer "gooder". Não existe!</p>`,
    ],
    quiz: [
      { q: 'Complete: "Jupiter is ___ than Earth." (Júpiter é maior que a Terra.)', o: ['big', 'biggest', 'bigger'], a: 2, hint: 'Estamos comparando DUAS coisas, e a frase tem "than". Lembre que big dobra o g.', why: 'Comparando dois: bigger than. Júpiter é bem maior que a Terra.' },
      { q: '"The smallest planet" quer dizer:', o: ['um planeta pequeno', 'o menor planeta', 'um planeta maior'], a: 1, hint: 'Repare no "the" antes e no "-est" no fim: é o mais de todos.', why: 'The smallest = o menor de todos. No Sistema Solar, é Mercúrio.' },
      { q: 'Qual é o superlativo de "hot" (quente)?', o: ['the hottest', 'the hotest', 'hotter', 'the most hot'], a: 0, hint: 'Hot é curta e termina em vogal + consoante (o + t). Então o t dobra antes do -est.', why: 'The hottest: o mais quente, com t dobrado. Hotter é o comparativo (mais quente que).' },
      { q: 'Complete: "A black hole is ___ than a comet." (Um buraco negro é mais perigoso que um cometa.)', o: ['dangerouser', 'more dangerous', 'the most dangerous'], a: 1, hint: '"Dangerous" é uma palavra longa. E a frase compara duas coisas, com "than".', why: 'Palavra longa usa more: more dangerous than, mais perigoso que.' },
      { q: 'Qual destas frases está CERTA?', o: ['Mercury is the most small planet.', 'The Sun is gooder than a candle.', 'Earth is smaller than Jupiter.', 'Saturn is the bigger planet of all.'], a: 2, hint: 'Confira cada uma: palavra curta usa -er e -est; good muda para better; e "o mais de todos" pede the + -est.', why: '"Earth is smaller than Jupiter" está certa. O certo nas outras seria the smallest, better e the biggest (e o maior planeta é Júpiter, não Saturno).' },
      { q: 'Traduza: "Mauna Kea has some of the best telescopes in the world."', o: ['O Mauna Kea tem telescópios melhores que o mundo.', 'O Mauna Kea tem alguns telescópios bons.', 'O Mauna Kea tem os piores telescópios do mundo.', 'O Mauna Kea tem alguns dos melhores telescópios do mundo.'], a: 3, hint: '"The best" é o superlativo de good: o melhor, os melhores. "Some of" quer dizer "alguns dos".', why: 'The best = os melhores. A frase diz que o Mauna Kea tem alguns dos melhores telescópios do mundo, e é verdade.' },
    ],
  }, {
    id: 'm15b', subject: 'ASTRONOMIA', title: 'O buraco negro do centro',
    slides: [
      `<p>Um <b>buraco negro</b> é um lugar onde a gravidade é tão forte que <b>nem a luz consegue escapar</b>. Por isso ele é escuro. Alguns nascem quando uma estrela muito grande morre e desaba sobre ela mesma.</p>
       <p>A borda de onde nada consegue voltar se chama <b>horizonte de eventos</b>. Do lado de fora, ainda dá para fugir. Passou dela, não volta mais.</p>`,
      `<p>No centro da Via Láctea mora <b>Sagitário A*</b> (lê-se "Sagitário A estrela"), um buraco negro gigante.</p>
       <div class="calc">massa: uns 4 milhões de Sóis
distância: uns 26 mil anos-luz
horizonte: uns 12 milhões de km
do centro</div><p>A primeira foto dele saiu em <b>2022</b>, feita por uma rede de telescópios espalhados pelo mundo, alguns aqui no Havaí. A de outro buraco negro, o M87*, saiu em <b>2019</b>. O que aparece na foto é o gás quente brilhando em volta da sombra escura.</p>`,
      `<p>Perto de um buraco negro, o <b>tempo passa mais devagar</b>. Um astronauta que ficasse um tempo lá perto voltaria mais novo que os amigos que ficaram na Terra!</p>
       <p>A Via Láctea inteira, com centenas de bilhões de estrelas, gira em volta desse centro. O Sol também: ele leva uns <b>230 milhões de anos</b> para dar uma volta completa.</p>`,
    ],
    quiz: [
      { q: 'Um buraco negro é:', o: ['um buraco no chão do espaço', 'uma estrela muito brilhante', 'um planeta preto', 'um lugar com gravidade tão forte que nem a luz escapa'], a: 3, hint: 'Pense no porquê de ele ser "negro", escuro: a luz não consegue sair.', why: 'A gravidade é tão forte que nem a luz escapa. Sem luz saindo, ele fica escuro.' },
      { q: 'A borda de onde nada consegue voltar se chama:', o: ['anel de Saturno', 'horizonte de eventos', 'linha do Equador'], a: 1, hint: 'É um "horizonte": uma linha que separa o que dá para ver do que não dá.', why: 'Horizonte de eventos. Em Sagitário A*, ele fica a uns 12 milhões de km do centro.' },
      { q: 'Sagitário A* tem a massa de 4 milhões de Sóis. Escreva esse número só com algarismos:', n: 4000000, hint: 'Um milhão é 1 seguido de seis zeros. Então 4 milhões é 4 e mais seis zeros.', why: '4.000.000: quatro milhões de Sóis num lugar só.' },
      { q: 'Na missão, o Relógio de Dobra vai mostrar que 1 hora perto do buraco negro valeu 3 dias na Terra. Quantas HORAS passaram na Terra?', n: 72, calc: '3 × 24 = ?', hint: 'Cada dia tem 24 horas. Multiplique por 3.', why: '3 × 24 = 72 horas na Terra, enquanto na nave passou só 1 hora.' },
      { q: 'O Sol leva uns 230 milhões de anos para dar uma volta em torno do centro da galáxia. Ele tem uns 4,6 bilhões de anos, ou seja, 4.600 milhões. Quantas voltas ele já deu, mais ou menos?', n: 20, calc: '4.600 ÷ 230 = ?', hint: 'Corte um zero dos dois números: 460 ÷ 23. Pense: 23 × 2 = 46.', why: '4.600 ÷ 230 = 20 voltas. Em toda a vida do Sol, só umas 20 voltas na galáxia!' },
    ],
  }],

  site: {
    look: [0, 2, 0],
    extra: ['rival'],
    intro: [
      { who: 'KAI', t: 'Aloha, {nome}! Sou o Kai, navegador e astrônomo. Bem-vindos ao Mauna Kea, no Havaí!' },
      { who: '{rival}', t: 'Copiloto {rival} a postos pra te ajudar, {nome}! Eu trouxe o manual. E três sanduíches. Por via das dúvidas.' },
    ],
    lesson: {
      id: 'm15c', subject: 'GEOGRAFIA · HAVAÍ', title: 'Navegando pelas estrelas',
      slides: [
        `<p>O <b>Havaí</b> é um grupo de ilhas no meio do Oceano Pacífico, a uns 4.000 km da costa da Califórnia. As ilhas foram formadas por <b>vulcões</b> que nasceram no fundo do mar. Em <b>1959</b>, o Havaí virou o 50º estado dos Estados Unidos.</p>
         <p><i>Aloha</i> quer dizer olá, tchau e também amor!</p>`,
        `<p>O <b>Mauna Kea</b> é um vulcão de <b>4.207 m</b> acima do mar. Mas ele continua uns <b>6.000 m</b> para baixo, até o fundo do oceano.</p>
         <div class="calc">acima do mar:     4.207 m
embaixo d'água:   6.000 m
Everest:          8.849 m</div><p>Contando da base, no fundo do mar, ele é mais alto que o Everest! No topo ficam telescópios que ajudaram a fotografar buracos negros. Para o povo nativo do Havaí, a montanha é sagrada.</p>`,
        `<p>Há centenas de anos, os navegadores <b>polinésios</b> cruzavam o oceano sem mapa nem bússola, guiados pelas <b>estrelas</b>, pelas <b>ondas</b> e pelos <b>pássaros</b>.</p>
         <p>A <b>Estrela Polar</b> fica quase parada no céu do Norte. A altura dela acima do horizonte, em graus, é igual à <b>latitude</b> do lugar:</p>
         <div class="calc">Havaí (20° N) → Polar a 20°
Equador (0°)  → no horizonte
Capão (12° S) → não aparece
1 grau de latitude = uns 111 km</div>`,
      ],
      quiz: [
        { q: 'Os navegadores polinésios atravessavam o oceano guiados por:', o: ['GPS e celular', 'estrelas, ondas e pássaros', 'mapas de papel', 'aviões'], a: 1, hint: 'Faz centenas de anos: não existia nenhuma máquina. Eles liam a natureza.', why: 'Eles se guiavam pelas estrelas, pelas ondas e pelos pássaros.' },
        { q: 'As ilhas do Havaí foram formadas por:', o: ['geleiras', 'terremotos', 'rios', 'vulcões'], a: 3, hint: 'O Mauna Kea, onde estamos, é um deles.', why: 'Vulcões nasceram no fundo do mar e foram crescendo até sair da água.' },
        { q: 'O Mauna Kea tem 4.207 m acima do mar e uns 6.000 m embaixo d\'água. Qual é a altura total, da base até o topo, em metros? (Use os números dados.)', n: 10207, calc: '4.207 + 6.000 = ?', hint: 'Some a parte de cima com a parte de baixo: 4.207 + 6.000.', why: '4.207 + 6.000 = 10.207 m. O Everest tem 8.849 m: o Mauna Kea é mais alto, contando da base!' },
        { q: 'Do alto do Mauna Kea, a Estrela Polar aparece a uns 20° acima do horizonte. Então a latitude do Havaí é de cerca de:', o: ['70° norte', '20° sul', '20° norte'], a: 2, hint: 'A altura da Estrela Polar, em graus, é a própria latitude. E a Polar só aparece para quem está ao norte do Equador.', why: 'Polar a 20° de altura = latitude de uns 20° norte.' },
        { q: 'O Havaí fica a uns 20° de latitude norte, e cada grau vale uns 111 km. Quantos km, mais ou menos, separam o Havaí da linha do Equador?', n: 2220, calc: '20 × 111 = ?', hint: 'Do Equador (0°) até 20° são 20 graus. Multiplique 20 por 111: faça 2 × 111 e ponha um zero no fim.', why: '20 × 111 = 2.220 km até o Equador.' },
      ],
    },
    outro: [
      { who: 'KAI', t: 'Mahalo! Quer dizer: obrigado. Fiquem longe do horizonte de eventos, vocês dois!' },
    ],
  },

  gameIntro: [
    { who: '{rival}', t: 'Copiloto falando: a gravidade puxa a nave para DENTRO o tempo todo! Relaxa, eu fico de olho no radar com você.' },
    { who: 'KDOK', t: 'Bip! Segure A para empurrar a nave para FORA. Fique no ANEL SEGURO, nem perto nem longe demais.' },
    { who: 'KDOK', t: 'Pegue 10 pontos de dados que giram no anel. E cuidado com as estrelas que passam voando!' },
  ],

  debrief: [
    { who: 'KDOK', t: 'DADOS COLETADOS! Orbitamos Sagitário A*, o coração da Via Láctea.' },
    { who: 'KDOK', t: 'Ele não brilha: o que brilha é o gás girando em volta, quente como um forno de estrelas.' },
    { who: '{rival}', t: 'Olha o Relógio de Dobra! Ficamos 1 hora aqui perto e na Terra passaram 3 dias! Minha mãe vai achar que eu fugi de casa.' },
    { who: 'KDOK', t: 'Bip! E o sinal está aqui também. Nem um buraco negro engole ele.' },
  ],
  card: { id: 'sgra', name: 'BURACO NEGRO SAGITÁRIO A*', lines: ['No centro da nossa galáxia', 'Massa: 4 milhões de Sóis', 'Distância: 26 mil anos-luz', 'Nem a luz escapa dele', 'Primeira foto: 2022'] },
  reward: { id: 'astrolabio', name: 'ASTROLÁBIO QUÂNTICO', desc: 'Mede ângulos entre estrelas com precisão total. Dá uma tentativa extra na próxima missão.' },
  radio: 'Aqui é a Astrokdok! Bigger, faster, the best... Tem assunto que parece chato até a gente achar o lado legal dele. Com o inglês, dá pra conversar com gente do mundo inteiro. Câmbio!',
  real: 'Escreva uma frase em inglês comparando duas coisas da sua casa. Exemplo: "My dog is bigger than my cat." (Meu cachorro é maior que meu gato.)',

  chat: {
    yuki: 'No Japão, buraco negro é "burakku hōru". Parece inglês com sotaque japonês!',
    lia: 'O Sol leva uns 230 milhões de anos para dar UMA volta em volta do centro da galáxia!',
    tomas: 'Buraco negro engole tudo? Igual eu no almoço.',
    bia: 'Calibrei o Relógio de Dobra. Ele atrasa certinho com a gravidade.',
    caio: 'Perto do buraco negro o tempo passa devagar. Eu queria um desses no meu travesseiro.',
    rival: 'O Comandante deixou! Vou de copiloto com você, {nome}. Juntos a gente dá conta. Só não conta pra ninguém que me deu um frio na barriga.',
    kdok: 'Bip! {rival} vai com a gente. Vou ter que dividir a janela. Tudo bem. Divido a pipoca também.',
    ze: 'A Dra. Paz e eu vamos te contar tudo quando você for até a borda do universo. É lá que está a resposta.',
  },
};
