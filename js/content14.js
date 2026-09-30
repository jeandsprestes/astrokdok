'use strict';
// MISSÃO 14 — NEBULOSA DE ÓRION · lançamento de Chichén Itzá (México)
A.MISSIONS[13] = {
  n: 14, name: 'ÓRION', goal: 'mapear as estrelas de Órion e entrar na nebulosa',
  place: 'MÉXICO', where: 'Chichén Itzá, México', scene: 'mexico', game: 'orion', body: 'nebula', room: 'patio', night: true,

  brief: [
    { who: 'CMTE. JULIUS', t: 'Conselheiro. Missão 14: a NEBULOSA DE ÓRION, um berçário onde estrelas estão nascendo agora.' },
    { who: 'CMTE. JULIUS', t: 'Para chegar lá, você precisa mapear as estrelas de Órion. Ligue os pontos certos.' },
    { who: 'CMTE. JULIUS', t: 'Hoje a aula é à NOITE, no PÁTIO. Olhe para cima.' },
  ],
  ready: [
    { who: 'CMTE. JULIUS', t: 'Aulas concluídas. O lançamento será em Chichén Itzá, no México: os maias estudavam o céu há mais de mil anos.' },
  ],
  teacher: [
    'Boa noite, turma! Aula no pátio, debaixo das estrelas. Hoje é PORTUGUÊS: vamos ler um MITO sobre Órion.',
    'Agora, a aula da missão do {nome}: a NEBULOSA DE ÓRION, o berçário de estrelas!',
  ],
  after: 'Muito bem, {nome}! O Comandante está esperando.',

  lessons: [{
    id: 'm14a', subject: 'PORTUGUÊS', title: 'O mito de Órion',
    slides: [
      `<p>Um <b>mito</b> é uma história muito antiga que tenta explicar algo da natureza. Os gregos criaram mitos para as constelações.</p>
       <p>Leia com atenção o mito da próxima tela.</p>`,
      `<p><i>Órion era um caçador gigante e muito orgulhoso. Um dia, disse que caçaria todos os animais da Terra. A deusa Gaia ficou furiosa e mandou um escorpião enfrentá-lo. Os dois brigaram sem parar. Então Zeus colocou os dois no céu, mas em lados opostos, para que nunca mais se encontrassem. Por isso, quando o Escorpião aparece no céu, Órion se esconde.</i></p>`,
      `<p>Toda história tem partes:</p>
       <div class="calc">PERSONAGENS → quem participa
PROBLEMA    → o que dá errado
FINAL       → como se resolve</div><p>O mito explica um fato real: Órion e Escorpião ficam em lados opostos do céu e quase nunca aparecem juntos.</p>`,
    ],
    quiz: [
      { q: 'Quem é o personagem principal do mito?', o: ['Órion', 'o escorpião', 'Zeus', 'Gaia'], a: 0, why: 'Órion, o caçador gigante.' },
      { q: 'Qual é o PROBLEMA da história?', o: ['Órion e o escorpião brigavam sem parar', 'Órion perdeu o sapato', 'O céu caiu'], a: 0, why: 'A briga entre os dois.' },
      { q: 'O que o mito tenta explicar?', o: ['Por que Órion e Escorpião nunca aparecem juntos no céu', 'Por que chove', 'Por que o mar é salgado'], a: 0, why: 'Eles ficam em lados opostos do céu.' },
      { q: 'Um mito e uma notícia de jornal são:', o: ['textos diferentes: o mito é uma história antiga; a notícia conta um fato real', 'a mesma coisa'], a: 0, why: 'Cada texto tem um jeito e um objetivo.' },
      { q: 'Na frase "Órion era um caçador gigante", qual é o adjetivo?', o: ['Órion', 'caçador', 'gigante', 'era'], a: 2, why: '"Gigante" diz como era o caçador. Lembra dos adjetivos?' },
    ],
  }, {
    id: 'm14b', subject: 'CIÊNCIAS + MATEMÁTICA', title: 'O berçário de estrelas',
    slides: [
      `<p><b>Órion</b> é uma das constelações mais fáceis de achar. No meio dela ficam três estrelas em fila: as <b>Três Marias</b>, o cinturão do caçador.</p>
       <p>No ombro está <b>Betelgeuse</b>, uma supergigante <b>vermelha</b>. No pé, <b>Rigel</b>, branco-azulada.</p>`,
      `<p>Logo abaixo das Três Marias fica a <b>Nebulosa de Órion</b>: uma nuvem enorme de gás e poeira onde <b>estrelas estão nascendo</b>. Um berçário de estrelas!</p>
       <p>Ela fica a uns <b>1.340 anos-luz</b> e dá para ver a olho nu, como uma manchinha.</p>`,
      `<p>O nosso Sol também nasceu numa nuvem assim, há 4,6 bilhões de anos.</p>
       <p>Tudo o que existe na Terra, até você, é feito de átomos que vieram das estrelas. Nós somos <b>poeira de estrelas</b>!</p>`,
    ],
    quiz: [
      { q: 'As Três Marias fazem parte de qual constelação?', o: ['Órion', 'Cruzeiro do Sul', 'Escorpião'], a: 0, why: 'São o cinturão de Órion.' },
      { q: 'Uma nebulosa como a de Órion é:', o: ['um berçário: uma nuvem onde estrelas nascem', 'um planeta', 'um buraco negro'], a: 0, why: 'Estrelas nascem de nuvens de gás e poeira.' },
      { q: 'A Nebulosa de Órion fica a uns 1.340 anos-luz. Próxima Centauri fica a 4. Quantas vezes mais longe? (1.340 ÷ 4)', n: 335, hint: 'Divida por partes: 1.200 ÷ 4 = 300 e 140 ÷ 4 = 35.', why: '1.340 ÷ 4 = 335 vezes mais longe!' },
      { q: 'Betelgeuse, o ombro de Órion, é uma estrela:', o: ['vermelha e gigante', 'azul e pequena', 'que já apagou'], a: 0, why: 'Uma supergigante vermelha.' },
      { q: 'A luz da nebulosa leva 1.340 anos para chegar aqui. Se estamos em 2026, em que ano essa luz saiu de lá?', n: 686, hint: 'Faça 2026 − 1.340.', why: '2026 − 1340 = 686. A luz que você vê hoje saiu de lá no ano 686!' },
    ],
  }],

  site: {
    look: [0, 1, 1],
    intro: [
      { who: 'DON MATEO', t: '¡Buenas noches, {nome}! Sou o Don Mateo, guia de Chichén Itzá. Meus antepassados maias estudavam este céu.' },
    ],
    lesson: {
      id: 'm14c', subject: 'HISTÓRIA · MÉXICO', title: 'Os astrônomos maias',
      slides: [
        `<p>O <b>México</b> fica na América do Norte. A capital é a <b>Cidade do México</b> e lá se fala <b>espanhol</b>.</p>
         <p>Os <b>maias</b> construíram cidades como <b>Chichén Itzá</b> e eram grandes astrônomos. Eles também usavam um símbolo para o <b>zero</b>!</p>`,
        `<p>A pirâmide de <b>Kukulcán</b> é um calendário de pedra: tem <b>91 degraus</b> em cada um dos <b>4 lados</b>, mais <b>1 no topo</b>.</p>
         <p>No <b>equinócio</b>, a sombra na escada forma uma <b>serpente</b> descendo a pirâmide!</p>`,
        `<p>E uma delícia que veio dos povos do México antigo: o <b>chocolate</b>! Os maias faziam uma bebida com <b>cacau</b>.</p>`,
      ],
      quiz: [
        { q: 'A pirâmide de Kukulcán tem 91 degraus em cada um dos 4 lados, mais 1 no topo. Quantos degraus no total?', n: 365, hint: 'Faça 91 × 4 e depois some 1.', why: '91 × 4 = 364, mais 1 = 365!' },
        { q: 'Por que 365 é um número especial?', o: ['São os dias de um ano', 'São os dias de um mês', 'É a idade da pirâmide'], a: 0, why: 'A pirâmide é um calendário!' },
        { q: 'No equinócio, a sombra na escada da pirâmide parece:', o: ['uma serpente descendo', 'um pássaro', 'um sol'], a: 0, why: 'A serpente Kukulcán!' },
        { q: 'Os maias também usavam um símbolo para:', o: ['o zero', 'o infinito', 'o pi'], a: 0, why: 'O zero, assim como os indianos!' },
        { q: 'Que delícia veio dos povos do México antigo?', o: ['o chocolate (cacau)', 'a pizza', 'o sushi'], a: 0, why: 'O chocolate!' },
      ],
    },
    outro: [
      { who: 'DON MATEO', t: '¡Buena suerte! As estrelas guiaram os maias. Agora vão guiar você.' },
    ],
  },

  gameIntro: [
    { who: 'KDOK', t: 'Bip! Para navegar até a nebulosa, precisamos ligar as estrelas das constelações.' },
    { who: 'KDOK', t: 'Mova a mira com ▲ ▼ ◀ ▶ e aperte A na PRÓXIMA estrela, na ordem dos números. Primeiro Órion, depois o Cruzeiro do Sul!' },
  ],

  debrief: [
    { who: 'KDOK', t: 'ESTAMOS DENTRO DA NEBULOSA DE ÓRION! Nuvens de gás e poeira brilhando por todo lado.' },
    { who: 'KDOK', t: 'Aqui estão nascendo estrelas novinhas. O Sol também nasceu numa nuvem assim.' },
    { who: 'KDOK', t: 'Tudo o que existe, até você e eu, é feito de poeira de estrelas. Até o meu micro-ondas.' },
    { who: 'KDOK', t: 'Bip! A Dra. Paz confirmou: o sinal é mais antigo que qualquer estrela desta nebulosa.' },
  ],
  card: { id: 'orion', name: 'NEBULOSA DE ÓRION', lines: ['Berçário de estrelas', 'Distância: 1.340 anos-luz', 'Fica abaixo das Três Marias', 'Dá para ver a olho nu, como uma mancha', 'Estrelas nascem de gás e poeira'] },
  reward: { id: 'relogio', name: 'RELÓGIO DE DOBRA', desc: 'Um relógio que aguenta a gravidade extrema. Perto do buraco negro, vale um escudo a mais.' },
  radio: 'Filho, hoje à noite achei as Três Marias e a manchinha da nebulosa embaixo delas. Pensei: meu filho está lá dentro! Câmbio!',
  real: 'Procure as Três Marias no céu: três estrelas em fila. Logo abaixo tem uma "espadinha" com uma mancha: é a Nebulosa de Órion! Desenhe o que você viu.',

  chat: {
    yuki: 'No Japão, as Três Marias se chamam Mitsuboshi: "três estrelas".',
    lia: 'Betelgeuse pode explodir um dia. Aí vai dar pra ver ela até de dia, por semanas!',
    tomas: 'Os maias tomavam chocolate. Eu seria um ótimo maia.',
    bia: 'Pela primeira vez a professora pediu pra gente olhar pro céu em vez do quadro.',
    caio: 'Aula à noite? Finalmente um horário justo. Tô acordadíssimo.',
    rival: 'Treinei no simulador a semana inteira. Se precisar de copiloto... tô aqui.',
    kdok: 'Bip! Somos feitos de poeira de estrelas. Eu sou feito de micro-ondas, que também é poeira de estrelas. Tô emocionado.',
    ze: 'Os telescópios mostram que o sinal parece uma foto do universo bebê. Mas quero que você veja com seus próprios olhos.',
  },
};
