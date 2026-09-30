'use strict';
// MISSÃO 3 — SOL · lançamento do Deserto do Atacama (Chile)
A.MISSIONS[2] = {
  n: 3, name: 'SOL', goal: 'chegar perto do Sol e coletar vento solar',
  place: 'ATACAMA', where: 'Deserto do Atacama, Chile', scene: 'atacama', game: 'sun', body: 'sun',

  brief: [
    { who: 'CMTE. JULIUS', t: 'Cadete. Pouso lunar aprovado. O Conselho ficou impressionado. Eu também. Um pouco.' },
    { who: 'CMTE. JULIUS', t: 'Missão 3: chegar perto do SOL e coletar partículas do vento solar. A missão mais perigosa até agora.' },
    { who: 'CMTE. JULIUS', t: 'Escola primeiro. Depois, fale comigo.' },
  ],
  ready: [
    { who: 'CMTE. JULIUS', t: 'Aulas concluídas. Desta vez, você vai sair do Brasil.' },
    { who: 'CMTE. JULIUS', t: 'O lançamento será no Deserto do Atacama, no Chile. Seu Traje Térmico já está na mala.' },
  ],
  teacher: [
    'Good morning, class! Hoje tem INGLÊS: as palavras do espaço.',
    'Agora, a aula da missão do {nome}: a nossa estrela, o SOL!',
  ],
  after: 'Very good, {nome}! O Comandante espera você.',

  lessons: [{
    id: 'm3a', subject: 'INGLÊS', title: 'Space words',
    slides: [
      `<p>No espaço, os astronautas do mundo todo conversam em inglês. Vamos aprender as palavras da missão!</p>
       <div class="calc">SUN    = Sol
MOON   = Lua
EARTH  = Terra
STAR   = estrela
PLANET = planeta
ROCKET = foguete</div>`,
      `<div class="calc">YELLOW = amarelo
BLACK  = preto
HOT    = quente
COLD   = frio
BIG    = grande
FAR    = longe</div><p>As cores da Astrokdok são <b>yellow and black</b>!</p>`,
      `<p>Para UMA coisa, usamos <b>IS</b>. Para VÁRIAS, usamos <b>ARE</b>:</p>
       <div class="calc">The Sun IS hot.
(O Sol é quente.)

The stars ARE far.
(As estrelas são distantes.)</div><p>No plural, o inglês ganha um <b>S</b>: one star, two star<b>s</b>.</p>`,
    ],
    quiz: [
      { q: 'Como se diz "foguete" em inglês?', o: ['moon', 'rocket', 'star', 'sun'], a: 1, why: 'ROCKET = foguete.' },
      { q: 'Complete: the colors of Astrokdok are yellow and ___.', o: ['blue', 'black', 'red', 'green'], a: 1, why: 'Yellow and black: amarelo e preto!' },
      { q: 'Complete: The Sun ___ a star.', o: ['is', 'are'], a: 0, why: 'Uma coisa só (the Sun) → IS.' },
      { q: 'Complete: The planets ___ far away.', o: ['is', 'are'], a: 1, why: 'Várias coisas (the planets) → ARE.' },
      { q: 'O que quer dizer "The Moon is cold at night"?', o: ['A Lua é grande de dia', 'A Lua é fria à noite', 'A Lua é quente à noite', 'A Lua está longe'], a: 1, why: 'Moon = Lua, cold = fria, at night = à noite.' },
      { q: 'Como fica "estrela" no plural, em inglês?', o: ['stares', 'stars', 'starz', 'star'], a: 1, why: 'One star, two STARS.' },
    ],
  }, {
    id: 'm3b', subject: 'CIÊNCIAS + MATEMÁTICA', title: 'A nossa estrela',
    slides: [
      `<p>O <b>Sol</b> é uma <b>estrela</b>, a mais perto da Terra. As estrelinhas do céu à noite também são sóis, só que muito, muito mais longe.</p>
       <p>O Sol é gigante: cabem <b>109 Terras</b> enfileiradas de um lado a outro dele. E dentro dele caberiam mais de <b>1 milhão de Terras</b>!</p>`,
      `<p>A superfície do Sol tem uns <b>5.500 °C</b>. O centro passa de <b>15 milhões de graus</b>!</p>
       <p>A luz do Sol é muito rápida, mas ele está tão longe que ela leva cerca de <b>8 minutos</b> para chegar aqui.</p>
       <p><b>ATENÇÃO:</b> NUNCA olhe direto para o Sol, nem de óculos escuros. Pode machucar os olhos para sempre.</p>`,
      `<p>O Sol às vezes solta <b>explosões solares</b> e sopra partículas pelo espaço: o <b>vento solar</b>.</p>
       <p>Quando o vento solar bate no escudo magnético da Terra, perto dos polos, o céu se acende em cores: são as <b>auroras</b>!</p>
       <p>A sonda <b>Parker Solar Probe</b> é o objeto humano que mais chegou perto do Sol, protegida por um escudo de calor.</p>`,
    ],
    quiz: [
      { q: 'O Sol é:', o: ['um planeta', 'uma estrela', 'um cometa', 'uma lua'], a: 1, why: 'O Sol é uma estrela: a mais perto de nós.' },
      { q: 'A luz do Sol leva cerca de 8 minutos para chegar à Terra. Quantos segundos são 8 minutos?', n: 480, hint: '1 minuto = 60 segundos. Faça 8 × 60 (é 8 × 6 com um zero no fim).', why: '8 × 60 = 480 segundos.' },
      { q: 'O diâmetro da Terra é 12.742 km. Arredonde para o MILHAR mais próximo.', o: ['12.000 km', '13.000 km', '12.700 km', '10.000 km'], a: 1, why: '12.742 está mais perto de 13.000 do que de 12.000.', hint: 'Olhe o algarismo das centenas (o 7): se for 5 ou mais, arredonda para cima.' },
      { q: 'Cabem 109 Terras enfileiradas no Sol. Se cada Terra fosse uma bolinha de 2 cm, qual seria a largura do Sol, em centímetros?', n: 218, hint: 'Faça 109 × 2.', why: '109 × 2 = 218 cm. Mais alto que uma porta!' },
      { q: 'O que você NUNCA deve fazer?', o: ['Usar protetor solar', 'Olhar direto para o Sol', 'Ficar na sombra', 'Estudar o Sol em livros'], a: 1, why: 'Nunca olhe direto para o Sol, nem com óculos escuros.' },
      { q: 'As auroras acontecem quando:', o: ['a Lua fica cheia', 'o vento solar encontra o escudo magnético da Terra', 'chove muito', 'um vulcão explode'], a: 1, why: 'Partículas do Sol + escudo magnético da Terra = céu colorido!' },
    ],
  }],

  site: {
    guide: 'DRA. PAZ',
    intro: [
      { who: 'DRA. PAZ', t: '¡Hola, {nome}! Soy la Doctora Paz, astrônoma. Bem-vindo ao Atacama, o melhor céu do mundo!' },
    ],
    lesson: {
      id: 'm3c', subject: 'GEOGRAFIA · CHILE', title: 'O deserto dos telescópios',
      slides: [
        `<p>Estamos no <b>Deserto do Atacama</b>, no <b>Chile</b>. Sua primeira missão fora do Brasil!</p>
         <p>O Chile é um país comprido e fininho: tem mais de <b>4 mil km</b> de norte a sul, entre a <b>Cordilheira dos Andes</b> e o <b>Oceano Pacífico</b>. A capital é <b>Santiago</b>.</p>`,
        `<p>No Chile se fala <b>espanhol</b>. Algumas palavras:</p>
         <div class="calc">HOLA     = oi
GRACIAS  = obrigado
ESTRELLA = estrela
CIELO    = céu
SOL      = sol</div>`,
        `<p>O Atacama é um dos lugares <b>mais secos do mundo</b>: tem cantos onde quase nunca chove. Ar seco, lugar alto e céu sem nuvens: perfeito para telescópios!</p>
         <p>Aqui ficam alguns dos maiores observatórios da Terra, como o <b>ALMA</b>, com <b>66 antenas</b> a 5 mil metros de altura.</p>
         <p>Curiosidade: o Chile <b>não faz fronteira com o Brasil</b>. Na América do Sul, só Chile e Equador não fazem.</p>`,
      ],
      quiz: [
        { q: 'Que língua se fala no Chile?', o: ['português', 'inglês', 'espanhol', 'francês'], a: 2, why: 'Espanhol. ¡Muy bien!' },
        { q: 'O que quer dizer "cielo"?', o: ['céu', 'cinco', 'cidade', 'sol'], a: 0, why: 'Cielo = céu.' },
        { q: 'Por que tantos telescópios ficam no Atacama?', o: ['Porque é perto do mar', 'Porque o ar é seco, é alto e quase não tem nuvens', 'Porque faz calor', 'Porque tem muitas cidades iluminadas'], a: 1, why: 'Céu limpo e seco é o sonho de todo astrônomo.' },
        { q: 'O Chile faz fronteira com o Brasil?', o: ['Sim', 'Não'], a: 1, why: 'Não! Chile e Equador são os únicos países da América do Sul que não fazem fronteira com o Brasil.' },
        { q: 'O ALMA tem 66 antenas. Se forem arrumadas em 6 fileiras iguais, quantas antenas em cada fileira?', n: 11, hint: '6 × 10 = 60. Faltam 6...', why: '66 ÷ 6 = 11 antenas por fileira.' },
      ],
    },
    outro: [
      { who: 'DRA. PAZ', t: '¡Buena suerte! E lembre: nunca olhe direto para o Sol. Nem você, nem o Kdok.' },
    ],
  },

  gameIntro: [
    { who: 'KDOK', t: 'Bip-bop! Estamos perto do Sol! Colete 25 partículas amarelas do vento solar.' },
    { who: 'KDOK', t: 'Quando uma faixa piscar, vem EXPLOSÃO SOLAR! Saia de baixo dela...' },
    { who: 'KDOK', t: '...ou aperte A na hora certa para ligar o escudo de espelho. Ele precisa de um tempinho para recarregar.' },
  ],

  debrief: [
    { who: 'KDOK', t: 'COLETA COMPLETA! 25 amostras de vento solar!' },
    { who: 'KDOK', t: 'Chegamos mais perto do Sol do que qualquer ser humano. Bip... estou suando óleo.' },
    { who: 'KDOK', t: 'Toda a luz e o calor da Terra vêm daqui. Sem o Sol, não haveria plantas, nem chuva, nem você.' },
    { who: 'KDOK', t: 'E o segredo: aquelas estrelinhas do céu à noite são sóis também. Alguns muito maiores que o nosso.' },
    { who: 'KDOK', t: 'Lá longe, eles esperam por nós.' },
  ],
  card: { id: 'sol', name: 'SOL', lines: ['Tipo: estrela', 'Diâmetro: 109 Terras', 'Superfície: 5.500 °C', 'Luz até a Terra: 8 minutos', 'Idade: 4,6 bilhões de anos'] },
  reward: { id: 'vela', name: 'VELA SOLAR', desc: 'Uma vela gigante que usa a luz do Sol para empurrar a nave. Com ela, dá para ir até os outros planetas!' },
  radio: '{nome}, você chegou perto do Sol! Aqui na Terra o dia ficou mais bonito. Mas nunca olhe direto pra ele, combinado? Te amo. Câmbio e desligo.',
  real: 'Com um adulto, faça um relógio de sol: finque um palito na terra num lugar ensolarado e marque a ponta da sombra a cada hora. O que acontece com a sombra?',

  chat: {
    lia: 'Sabia que a luz do Sol é branca? É o nosso ar que deixa ele com cara de amarelo.',
    tomas: 'Se o Sol tem 5.500 graus, dá pra fritar um ovo nele? ... Dá pra fritar TODOS os ovos do mundo, né?',
    bia: 'Um escudo de espelho reflete o calor. Pede pro Kdok instalar um. Ele sabe? ... Ele sabe.',
    caio: 'O Sol ainda vai brilhar por uns 5 bilhões de anos. Dá tempo de eu tirar mais um cochilo.',
    rival: 'Hunf. Pousou na Lua. Grande coisa. Quero ver chegar perto do Sol sem derreter.',
    kdok: 'Bip! Instalei um escudo de espelho na nave. Aperte A na hora certa e ele reflete as explosões!',
  },
};
