'use strict';
// MISSÃO 3: SOL · lançamento do Deserto do Atacama (Chile)
A.MISSIONS[2] = {
  n: 3, name: 'SOL', goal: 'chegar perto do Sol e coletar vento solar',
  place: 'ATACAMA', where: 'Deserto do Atacama, Chile', scene: 'atacama', game: 'sun', body: 'sun',

  brief: [
    { who: 'CMTE. DOZINHO', t: 'Cadete. Pouso lunar aprovado. O Conselho ficou impressionado. Eu também. Um pouco.' },
    { who: 'CMTE. DOZINHO', t: 'Missão 3: chegar perto do SOL e coletar partículas do vento solar. A missão mais perigosa até agora.' },
    { who: 'CMTE. DOZINHO', t: 'Escola primeiro. Depois, fale comigo.' },
  ],
  ready: [
    { who: 'CMTE. DOZINHO', t: 'Aulas concluídas. Desta vez, você vai sair do Brasil.' },
    { who: 'CMTE. DOZINHO', t: 'O lançamento será no Deserto do Atacama, no Chile. Seu Traje Térmico já está na mala.' },
  ],
  teacher: [
    'Good morning, class! Hoje tem INGLÊS: as palavras do espaço, o verbo to be e o presente simples.',
    'Agora, ASTRONOMIA: a aula da missão de {nome}. Vamos conhecer a nossa estrela, o SOL!',
  ],
  after: 'Very good, {nome}! O Comandante espera você.',

  lessons: [{
    id: 'm3a', subject: 'INGLÊS', title: 'Space words',
    slides: [
      `<p>No espaço, astronautas de vários países conversam em <b>inglês</b>. Vamos aprender as palavras da missão!</p>
       <div class="calc">SUN    = Sol
MOON   = Lua
EARTH  = Terra
STAR   = estrela
PLANET = planeta
ROCKET = foguete
SKY    = céu</div><p>E algumas palavras para descrever: <b>hot</b> (quente), <b>cold</b> (frio), <b>big</b> (grande), <b>far away</b> (longe). As cores da Astrokdok são <b>yellow and black</b>: amarelo e preto.</p>`,
      `<p>O verbo <b>to be</b> quer dizer <b>ser</b> ou <b>estar</b>. Ele muda conforme a pessoa:</p>
       <div class="calc">I am      eu sou
you are   você é
he is     ele é
she is    ela é
it is     é (uma coisa)
we are    nós somos
they are  eles/elas são</div><p>Dica: para UMA coisa, use <b>is</b>. Para VÁRIAS, use <b>are</b>. (Com <b>I</b> use <b>am</b>; com <b>you</b> use <b>are</b>.)<br><i>The Sun is hot.</i> (O Sol é quente.)<br><i>The stars are far away.</i> (As estrelas estão longe.)</p>`,
      `<p>O <b>presente simples</b> fala do que é sempre verdade ou do que acontece todo dia.</p>
       <div class="calc">I study every day.
(Eu estudo todo dia.)
The Earth turns.
(A Terra gira.)</div><p><b>Regra de ouro:</b> com <b>he</b>, <b>she</b> e <b>it</b> (ou com um nome só, como Kdok), o verbo ganha <b>S</b>: I like popcorn, mas <b>Kdok likes</b> popcorn.</p>
       <p>E o plural das palavras também costuma ganhar S: one star, two star<b>s</b>.</p>`,
    ],
    quiz: [
      { q: 'Como se diz "foguete" em inglês?', o: ['moon', 'star', 'rocket', 'sun'], a: 2, hint: 'MOON é Lua, STAR é estrela, SUN é Sol. Sobrou qual?', why: 'ROCKET = foguete.' },
      { q: 'Complete: The Sun ___ a star.', o: ['are', 'is', 'am'], a: 1, hint: 'The Sun é UMA coisa só. Para uma coisa, usamos is ou are?', why: 'Uma coisa só (the Sun) pede IS: The Sun is a star. O Sol é uma estrela.' },
      { q: 'Complete: The planets ___ round.', o: ['is', 'am', 'are'], a: 2, hint: 'Planets termina com S: são vários planetas. Para várias coisas, usamos...', why: 'Várias coisas (the planets) pedem ARE: The planets are round. Os planetas são redondos.' },
      { q: 'O que quer dizer "The Moon is cold at night"?', o: ['A Lua é fria à noite', 'A Lua é grande de dia', 'A Lua está longe', 'A Lua é quente à noite'], a: 0, hint: 'Moon = Lua, cold = frio, night = noite.', why: 'The Moon (a Lua) is (é) cold (fria) at night (à noite). E é mesmo: a noite da Lua chega a 170 graus abaixo de zero!' },
      { q: 'Complete: Kdok ___ popcorn every day. (O verbo é to make: fazer.)', o: ['make', 'makes', 'are make', 'making'], a: 1, hint: 'Kdok é um só: é como dizer he (ele). Com he, she e it, o verbo do presente simples ganha...', why: 'Com um só (he, she, it ou um nome como Kdok), o verbo ganha S: Kdok makes popcorn every day. O Kdok faz pipoca todo dia.' },
      { q: 'Qual destas frases está CORRETA?', o: ['The Earth turn around the Sun.', 'I is a cadet.', 'The stars is far away.', 'The Earth turns around the Sun.'], a: 3, hint: 'Confira: I pede am; uma coisa pede is; várias pedem are; e com he, she, it o verbo ganha S.', why: 'The Earth é uma coisa só, então o verbo ganha S: turns. As outras erram: o certo é I am a cadet e The stars are far away.' },
    ],
  }, {
    id: 'm3b', subject: 'ASTRONOMIA', title: 'A nossa estrela',
    slides: [
      `<p>O <b>Sol</b> é uma <b>estrela</b>: uma bola gigante de gás muito quente, que produz a própria luz. É a estrela mais perto da Terra, a uns <b>150 milhões de km</b>. As estrelinhas do céu à noite também são sóis, só que muito, muito mais longe. Por isso parecem pontinhos.</p>
       <p>O Sol é enorme: cabem <b>109 Terras</b> enfileiradas de um lado a outro dele. E dentro dele caberiam mais de <b>1 milhão de Terras</b>!</p>`,
      `<p>A superfície do Sol tem uns <b>5.500 °C</b>. O centro passa de <b>15 milhões de graus</b>! É lá no centro que ele produz a energia que vira luz e calor.</p>
       <p>A luz é a coisa mais rápida que existe, mas o Sol está tão longe que ela leva cerca de <b>8 minutos</b> (8 min e 20 s) para chegar aqui.</p>
       <p><b>ATENÇÃO:</b> NUNCA olhe direto para o Sol, nem de óculos escuros. Pode machucar os olhos para sempre.</p>`,
      `<p>Às vezes o Sol solta <b>explosões solares</b>. E ele sopra partículas pelo espaço o tempo todo: é o <b>vento solar</b>.</p>
       <p>A Terra tem um escudo invisível, o <b>campo magnético</b>. Ele guia as partículas do vento solar até perto dos polos, onde elas esbarram no ar e o céu se acende em cores: são as <b>auroras</b>!</p>
       <p>A sonda <b>Parker Solar Probe</b> é o objeto feito por humanos que mais chegou perto do Sol, protegida por um escudo de calor.</p>`,
    ],
    quiz: [
      { q: 'O Sol é:', o: ['um planeta', 'uma lua', 'uma estrela', 'um cometa'], a: 2, hint: 'Ele produz a própria luz, como as estrelinhas do céu à noite.', why: 'O Sol é uma estrela: a mais perto de nós. Planetas e luas não têm luz própria.' },
      { q: 'O que você NUNCA deve fazer?', o: ['Olhar direto para o Sol', 'Usar protetor solar', 'Ficar na sombra', 'Estudar o Sol em livros'], a: 0, hint: 'Uma dessas coisas pode machucar os olhos para sempre.', why: 'Nunca olhe direto para o Sol, nem de óculos escuros: a luz forte pode ferir os olhos para sempre.' },
      { q: 'Se as estrelas do céu à noite também são sóis, por que elas parecem só pontinhos?', o: ['Porque são muito pequenas', 'Porque estão muito mais longe que o Sol', 'Porque só acendem à noite', 'Porque são feitas de gelo'], a: 1, hint: 'Pense no farol de um carro: de perto é grande; lá longe na estrada, vira um pontinho.', why: 'Elas são sóis, algumas até maiores que o nosso, mas estão tão longe que parecem pontinhos. De dia não aparecem porque a luz do Sol as esconde.' },
      { q: 'As auroras acontecem quando:', o: ['a Lua fica cheia', 'chove muito', 'um vulcão explode', 'as partículas do vento solar chegam ao ar perto dos polos'], a: 3, hint: 'As auroras aparecem perto dos polos e têm a ver com as partículas que o Sol sopra.', why: 'As partículas do vento solar, guiadas pelo campo magnético, esbarram no ar perto dos polos, e o céu se acende em cores.' },
      { q: 'A luz do Sol leva 8 minutos e 20 segundos para chegar à Terra. Quantos segundos são?', n: 500, calc: '8 × 60 + 20 = ?', hint: 'Cada minuto tem 60 segundos. Faça 8 × 60 e depois some os 20 segundos.', why: '8 × 60 = 480 segundos, e 480 + 20 = 500 segundos. A luz que bate na sua pele agora saiu do Sol há 500 segundos!' },
    ],
  }],

  site: {
    guide: 'DRA. PAZ',
    intro: [
      { who: 'DRA. PAZ', t: '¡Hola, {nome}! Soy la Doctora Paz, astrônoma. {{Bem-vindo|Bem-vinda}} ao Atacama, o melhor céu do mundo!' },
    ],
    lesson: {
      id: 'm3c', subject: 'GEOGRAFIA · CHILE', title: 'O deserto dos telescópios',
      slides: [
        `<p>Estamos no <b>Deserto do Atacama</b>, no <b>Chile</b>. É a primeira missão fora do Brasil!</p>
         <p>O Chile é um país comprido e fininho: tem mais de <b>4 mil km</b> de norte a sul, entre a <b>Cordilheira dos Andes</b> (montanhas altíssimas, a leste) e o <b>Oceano Pacífico</b> (a oeste). A capital é <b>Santiago</b>.</p>`,
        `<p>No Chile se fala <b>espanhol</b>. Algumas palavras:</p>
         <div class="calc">HOLA     = oi
GRACIAS  = obrigado
ESTRELLA = estrela
CIELO    = céu
LUNA     = lua
SOL      = sol</div><p>Muitas se parecem com o português. Isso ajuda muito!</p>`,
        `<p>O Atacama é um dos lugares <b>mais secos do mundo</b>: tem cantos onde quase nunca chove. Ar seco, lugar alto e céu sem nuvens: perfeito para telescópios!</p>
         <p>Aqui ficam alguns dos maiores observatórios da Terra, como o <b>ALMA</b>, com <b>66 antenas</b> a 5 mil metros de altura.</p>
         <p>Curiosidade: o Chile <b>não faz fronteira com o Brasil</b>. Na América do Sul, só Chile e Equador não fazem.</p>`,
      ],
      quiz: [
        { q: 'Que língua se fala no Chile?', o: ['português', 'espanhol', 'inglês', 'francês'], a: 1, hint: 'A Dra. Paz disse "¡Hola!" e "Soy la Doctora".', why: 'No Chile se fala espanhol, como na maior parte dos países da América do Sul. O Brasil é o grande país do continente que fala português.' },
        { q: 'O que quer dizer "cielo"?', o: ['cinco', 'cidade', 'sol', 'céu'], a: 3, hint: 'É onde ficam as estrelas que os telescópios observam.', why: 'Cielo = céu. Parecido com o português, não é?' },
        { q: 'Por que tantos telescópios ficam no Atacama?', o: ['Porque o ar é seco, o lugar é alto e quase não tem nuvens', 'Porque é perto do mar', 'Porque faz muito calor', 'Porque tem muitas cidades iluminadas'], a: 0, hint: 'O que atrapalha quem quer ver as estrelas? Pense em nuvens e em luzes.', why: 'Céu sem nuvens, ar seco e lugar alto: a luz das estrelas chega mais limpa. É o sonho de todo astrônomo.' },
        { q: 'O Chile fica entre a Cordilheira dos Andes e qual oceano?', o: ['Atlântico', 'Índico', 'Pacífico', 'Ártico'], a: 2, hint: 'O Brasil é banhado pelo Atlântico. O Chile fica do outro lado da América do Sul.', why: 'O Oceano Pacífico banha todo o lado oeste do Chile. O Atlântico fica do lado do Brasil.' },
        { q: 'Quais são os dois únicos países da América do Sul que NÃO fazem fronteira com o Brasil?', o: ['Peru e Equador', 'Chile e Equador', 'Chile e Argentina', 'Uruguai e Paraguai'], a: 1, hint: 'Um deles é o país onde estamos agora. O outro tem o nome da linha que divide a Terra em norte e sul.', why: 'Chile e Equador. Todos os outros países da América do Sul encostam no Brasil em algum ponto.' },
      ],
    },
    outro: [
      { who: 'DRA. PAZ', t: '¡Buena suerte! E lembre: nunca olhe direto para o Sol. Nem você, nem o Kdok.' },
    ],
  },

  gameIntro: [
    { who: 'KDOK', t: 'Bip-bop! Estamos perto do Sol! Colete 15 partículas amarelas do vento solar.' },
    { who: 'KDOK', t: 'Quando uma faixa piscar, vem EXPLOSÃO SOLAR! Saia de baixo dela...' },
    { who: 'KDOK', t: '...ou aperte A na hora certa para ligar o escudo de espelho. Ele precisa de um tempinho para recarregar.' },
  ],

  debrief: [
    { who: 'KDOK', t: 'COLETA COMPLETA! 15 amostras de vento solar!' },
    { who: 'KDOK', t: 'Chegamos mais perto do Sol do que qualquer ser humano. Bip... estou suando óleo.' },
    { who: 'KDOK', t: 'Toda a luz e o calor da Terra vêm daqui. Sem o Sol, não haveria plantas, nem chuva, nem você.' },
    { who: 'KDOK', t: 'E o segredo: aquelas estrelinhas do céu à noite são sóis também. Alguns muito maiores que o nosso.' },
    { who: 'KDOK', t: 'Lá longe, eles esperam por nós.' },
  ],
  card: { id: 'sol', name: 'SOL', lines: ['Tipo: estrela', 'Diâmetro: 109 Terras', 'Superfície: 5.500 °C', 'Luz até a Terra: 8 minutos', 'Idade: 4,6 bilhões de anos'] },
  reward: { id: 'vela', name: 'VELA SOLAR', desc: 'Uma vela gigante que usa a luz do Sol para empurrar a nave. Com ela, dá para ir até os outros planetas!' },
  radio: 'Aqui é a Astrokdok! Inglês pode parecer difícil no começo, mas é uma das línguas que os astronautas usam na Estação Espacial. Cada palavra nova é uma porta. E lembra: nunca olhe direto pro Sol, combinado? Câmbio!',
  real: 'Com um adulto, faça um relógio de sol: finque um palito na terra num lugar ensolarado e marque a ponta da sombra a cada hora. O que acontece com a sombra?',

  chat: {
    lia: 'Sabia que a luz do Sol é branca? É o nosso ar que deixa ele com cara de amarelo.',
    tomas: 'Se o Sol tem 5.500 graus, dá pra fritar um ovo nele? ... Dá pra fritar TODOS os ovos do mundo, né?',
    bia: 'Um escudo de espelho reflete o calor. Pede pro Kdok instalar um. Ele sabe? ... Ele sabe.',
    caio: 'O Sol ainda vai brilhar por uns 5 bilhões de anos. Dá tempo de eu tirar mais um cochilo.',
    rival: 'Você pousou na Lua, {nome}! Pulei tanto de alegria que o vizinho achou que era terremoto. Agora é o Sol: leva protetor solar. Muito protetor solar.',
    kdok: 'Bip! Instalei um escudo de espelho na nave. Aperte A na hora certa e ele reflete as explosões!',
  },
};
