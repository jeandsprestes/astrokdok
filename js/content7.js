'use strict';
// MISSÃO 7: CINTURÃO DE ASTEROIDES · lançamento de Tanegashima (Japão)
A.MISSIONS[6] = {
  n: 7, name: 'ASTEROIDES', goal: 'minerar amostras no Cinturão de Asteroides',
  place: 'JAPÃO', where: 'Tanegashima, Japão', scene: 'japao', game: 'asteroids', body: 'asteroids', room: 'school',

  brief: [
    { who: 'CMTE. DOZINHO', t: 'Piloto. Entre Marte e Júpiter existe um cinturão com milhões de rochas espaciais.' },
    { who: 'CMTE. DOZINHO', t: 'Missão 7: coletar amostras no CINTURÃO DE ASTEROIDES. Elas guardam segredos de 4,6 bilhões de anos.' },
    { who: 'CMTE. DOZINHO', t: 'Escola primeiro. Hoje tem ciências.' },
  ],
  ready: [
    { who: 'CMTE. DOZINHO', t: 'Aulas concluídas. O lançamento será no Japão, na ilha de Tanegashima.' },
    { who: 'CMTE. DOZINHO', t: 'Os japoneses são especialistas: já trouxeram pedacinhos de asteroides para a Terra.' },
  ],
  teacher: [
    'Bom dia, turma! Hoje tem CIÊNCIAS: os estados físicos da matéria. Gelo, água e vapor: é tudo a mesma água!',
    'Agora, a aula de ASTRONOMIA da sua missão, {nome}: o CINTURÃO DE ASTEROIDES, as pedras do começo de tudo!',
  ],
  after: 'Muito bem, {nome}! O Comandante espera você.',

  lessons: [{
    id: 'm7a', subject: 'CIÊNCIAS', title: 'Os estados da matéria',
    slides: [
      `<p>Tudo o que tem massa e ocupa espaço é <b>matéria</b>: a pedra, a água do rio, o ar que você respira. A matéria é feita de partículas minúsculas, e o jeito como elas se arrumam decide o <b>estado físico</b>.</p>
       <div class="calc">SÓLIDO  → forma e volume fixos
          partículas presas,
          só tremem no lugar
LÍQUIDO → volume fixo, pega a
          forma do recipiente
          partículas deslizam
GASOSO  → sem forma nem volume
          fixos, ocupa tudo
          partículas soltas</div><p>A mesma água pode estar nos três estados: gelo, água e vapor.</p>`,
      `<p>Quando a matéria <b>recebe calor</b>, as partículas se agitam mais e se soltam. Quando <b>perde calor</b>, elas se acalmam e se juntam. Cada mudança de estado tem nome:</p>
       <div class="calc">FUSÃO          sólido → líquido
VAPORIZAÇÃO    líquido → gasoso
CONDENSAÇÃO    gasoso → líquido
SOLIDIFICAÇÃO  líquido → sólido
SUBLIMAÇÃO     sólido → gasoso
               (sem virar líquido)</div><p>A vaporização pode ser lenta, a <b>evaporação</b> (a roupa secando no varal), ou rápida e com bolhas, a <b>ebulição</b> (a água fervendo na panela). A neblina das manhãs do Capão e o orvalho na grama são <b>condensação</b>: o vapor do ar esfriou e virou gotinhas.</p>`,
      `<p>Cada substância muda de estado em temperaturas certas. A água pura, ao nível do mar:</p>
       <div class="calc">derrete (fusão)    a   0 °C
ferve (ebulição)   a 100 °C</div><p>No alto das montanhas, o ar é mais fino e a água ferve <b>abaixo</b> de 100 °C. Por isso o feijão demora mais para cozinhar lá em cima.</p>
       <p>No espaço também tem mudança de estado. Um <b>cometa</b> é uma bola de gelo e poeira. Quando ele chega perto do Sol, o gelo vira gás direto, por <b>sublimação</b>, e forma a cauda brilhante. Aqui na Terra, o gelo-seco das festas faz o mesmo: some sem deixar poça, porque vira gás direto.</p>`,
    ],
    quiz: [
      { q: 'A água do copo tem volume fixo, mas pega a forma do copo. Ela está em qual estado físico?', o: ['sólido', 'gasoso', 'líquido'], a: 2, hint: 'Ela escorre e se ajeita no formato do recipiente, mas não se espalha para encher a sala toda.', why: 'Líquido: volume fixo e a forma do recipiente. Um gás encheria a sala toda, e um sólido teria forma própria.' },
      { q: 'O picolé derretendo na sua mão passa de sólido para líquido. Como se chama essa mudança?', o: ['solidificação', 'fusão', 'condensação', 'sublimação'], a: 1, hint: 'É a mudança que acontece quando o gelo recebe calor e vira água.', why: 'Fusão é a passagem do sólido para o líquido. A solidificação é o caminho contrário, do líquido para o sólido.' },
      { q: 'De manhã cedo, aparecem gotinhas de água na grama do Capão: o orvalho. O vapor de água do ar esfriou e virou líquido. Que mudança é essa?', o: ['condensação', 'vaporização', 'fusão', 'sublimação'], a: 0, hint: 'O vapor é gás, e ele virou líquido. Qual nome vai do gasoso para o líquido?', why: 'Condensação: do gasoso para o líquido. É o mesmo que deixa molhado, por fora, um copo de água gelada.' },
      { q: 'A água do pote está a 25 °C. Ao nível do mar, quantos graus ela ainda precisa esquentar para começar a ferver?', n: 75, calc: '100 − 25 = ?', hint: 'Ao nível do mar, a água ferve a 100 °C. Quanto falta do 25 até chegar no 100?', why: '100 − 25 = 75 graus a mais. Aí começa a ebulição.' },
      { q: 'Um cometa é uma bola de gelo e poeira. Perto do Sol, o gelo dele vira gás direto, sem virar água antes, e forma a cauda. Que mudança é essa?', o: ['fusão', 'vaporização', 'solidificação', 'sublimação'], a: 3, hint: 'Fusão e vaporização passam pelo líquido. Qual mudança pula o líquido e vai do sólido direto para o gás?', why: 'Sublimação: do sólido direto para o gasoso. O gelo-seco faz o mesmo aqui na Terra.' },
      { q: 'No alto de uma montanha bem alta, o ar é mais fino. Lá, a água ferve:', o: ['acima de 100 °C', 'exatamente a 100 °C', 'abaixo de 100 °C', 'nunca'], a: 2, hint: 'Lembre do feijão que demora mais para cozinhar lá em cima: a água ferve antes de ficar tão quente.', why: 'Com o ar mais fino, a água ferve abaixo de 100 °C. Em La Paz, na Bolívia, a uns 3.600 m de altitude, ela ferve perto de 88 °C.' },
    ],
  }, {
    id: 'm7b', subject: 'ASTRONOMIA', title: 'Pedras do começo de tudo',
    slides: [
      `<p>O <b>Cinturão de Asteroides</b> fica <b>entre Marte e Júpiter</b>. São milhões de rochas espaciais girando em volta do Sol, de pedrinhas até montanhas voadoras. Os astrônomos já catalogaram mais de 1 milhão delas.</p>
       <p>Elas são <b>restos da formação do Sistema Solar</b>, há 4,6 bilhões de anos: pedaços que nunca se juntaram para formar um planeta. A gravidade fortíssima de Júpiter, ali do lado, não deixou.</p>`,
      `<p>Nos filmes, as naves desviam de asteroides grudados uns nos outros. Na vida real, eles ficam <b>muito longe</b> uns dos outros: as sondas passam sem bater em nada! E, somando todos, eles têm bem menos massa que a nossa Lua.</p>
       <p>O maior objeto do cinturão é <b>Ceres</b>, um <b>planeta-anão</b> de uns 940 km de diâmetro, com gelo por dentro. A Lua tem uns 3.470 km.</p>`,
      `<p>A mesma pedra muda de nome conforme o lugar onde está:</p>
       <div class="calc">ASTEROIDE  → rocha no espaço
             (as bem pequenas se
             chamam meteoroides)
METEORO    → o risco de luz no céu,
             quando ela entra no ar
             e esquenta
METEORITO  → o pedaço que chega
             ao chão</div><p>A "estrela cadente" é um meteoro. O maior meteorito do Brasil, o <b>Bendegó</b>, com mais de 5 toneladas, foi achado na Bahia em 1784. E em 2020 a sonda japonesa <b>Hayabusa2</b> trouxe uns 5 gramas do asteroide Ryugu para a Terra.</p>`,
    ],
    quiz: [
      { q: 'Onde fica o Cinturão de Asteroides?', o: ['Entre a Terra e a Lua', 'Depois de Plutão', 'Entre Marte e Júpiter', 'Dentro do Sol'], a: 2, hint: 'Ele fica entre dois planetas: o planeta vermelho e o maior de todos.', why: 'O cinturão fica entre Marte e Júpiter.' },
      { q: 'Uma rocha espacial que cruza o céu e chega até o chão da Terra se chama:', o: ['cometa', 'meteorito', 'satélite', 'planeta'], a: 1, hint: 'Procure o nome que a pedra ganha quando já está no chão.', why: 'O pedaço que chega ao chão é um meteorito, como o Bendegó, achado na Bahia.' },
      { q: 'Ceres tem uns 940 km de diâmetro. A Lua tem uns 3.470 km. Quantos km a Lua tem a mais?', n: 2530, calc: '3.470 − 940 = ?', hint: 'Faça 3.470 − 940. Dica: 3.470 − 1.000 = 2.470, e depois devolva 60.', why: '3.470 − 940 = 2.530 km. Ceres é o maior do cinturão, mas é bem menor que a nossa Lua.' },
      { q: 'Na vida real, os asteroides do cinturão:', o: ['ficam grudados uns nos outros', 'pegam fogo no espaço', 'não existem de verdade', 'ficam muito longe uns dos outros'], a: 3, hint: 'Lembre das sondas que atravessam o cinturão sem bater em nada.', why: 'Tem muito espaço vazio entre eles. Os asteroides grudados são coisa de filme.' },
      { q: 'Uma rocha vaga no espaço, entra no ar da Terra fazendo um risco de luz, e um pedaço cai no quintal. Na ordem certa, os nomes dela são:', o: ['meteoro, asteroide, meteorito', 'asteroide, meteoro, meteorito', 'meteorito, meteoro, asteroide', 'asteroide, meteorito, meteoro'], a: 1, hint: 'Primeiro ela está no espaço, depois vira luz no céu, e por último está no chão.', why: 'No espaço é asteroide, o risco de luz é o meteoro, e o pedaço no chão é o meteorito.' },
    ],
  }],

  site: {
    look: [0, 3, 1],
    extra: ['yuki'],
    intro: [
      { who: 'DRA. AKEMI', t: 'Konnichiwa, {nome}! Sou a Dra. Akemi, da agência espacial japonesa. {{Bem-vindo|Bem-vinda}} a Tanegashima!' },
      { who: 'DRA. AKEMI', t: 'Esta é a minha filha, Yuki. Ela vai estudar na sua escola, no Brasil!' },
      { who: 'YUKI', t: 'Prazer! Eu falo português: minha avó mora em São Paulo. Posso ver a sua nave?' },
    ],
    lesson: {
      id: 'm7c', subject: 'GEOGRAFIA · JAPÃO', title: 'A terra do sol nascente',
      slides: [
        `<p>O <b>Japão</b> é um país da Ásia formado por <b>milhares de ilhas</b>. A capital é <b>Tóquio</b>.</p>
         <p>Ele fica bem a leste da Ásia, do lado onde o Sol nasce. Por isso é chamado de <b>"Terra do Sol Nascente"</b>. O dia começa lá bem antes daqui: Tóquio está <b>12 horas à frente</b> de Brasília. Quando é meio-dia no Brasil, é meia-noite no Japão.</p>`,
        `<p>Lá se fala <b>japonês</b>:</p>
         <div class="calc">KONNICHIWA = olá, boa tarde
ARIGATŌ    = obrigado
HOSHI      = estrela</div><p>O círculo vermelho da bandeira do Japão é o Sol! E o <b>Brasil</b> tem a maior comunidade japonesa fora do Japão, principalmente em São Paulo, onde mora a avó da Yuki.</p>`,
        `<p>O Japão fica em cima do encontro de <b>placas tectônicas</b>, os pedaços enormes da casca da Terra, numa região chamada <b>Anel de Fogo do Pacífico</b>. Quando as placas se mexem, o chão treme. Por isso lá tem muitos <b>terremotos e vulcões</b>.</p>
         <p>O mais famoso é o <b>Monte Fuji</b>, um vulcão de <b>3.776 m</b>, a montanha mais alta do Japão.</p>`,
      ],
      quiz: [
        { q: '"Arigatō" quer dizer:', o: ['olá', 'obrigado', 'estrela', 'tchau'], a: 1, hint: 'É a palavra que a gente diz depois de ganhar um presente.', why: 'Arigatō = obrigado. Olá é konnichiwa, e estrela é hoshi.' },
        { q: 'Qual é a capital do Japão?', o: ['Pequim', 'Seul', 'Tanegashima', 'Tóquio'], a: 3, hint: 'Pequim é da China e Seul é da Coreia do Sul. Tanegashima é a ilha da base de foguetes.', why: 'A capital do Japão é Tóquio.' },
        { q: 'Por que o Japão é chamado de "Terra do Sol Nascente"?', o: ['Porque fica bem a leste da Ásia, do lado onde o Sol nasce', 'Porque é um país muito quente', 'Porque tem muitos vulcões', 'Porque lá não tem noite'], a: 0, hint: 'O Sol nasce de qual lado? E o Japão fica de qual lado da Ásia?', why: 'O Sol nasce no leste, e o Japão fica no extremo leste da Ásia.' },
        { q: 'Tóquio está 12 horas à frente de Brasília. Quando são 8 horas da manhã em Brasília, que horas são em Tóquio? Use o relógio de 24 horas.', n: 20, calc: '8 + 12 = ?', hint: 'Estar à frente quer dizer que lá o relógio já andou mais. Some 12 horas.', why: '8 + 12 = 20 horas, ou seja, 8 da noite em Tóquio.' },
        { q: 'Por que o Japão tem tantos terremotos e vulcões?', o: ['Porque fica perto do Polo Norte', 'Porque tem muitas cidades grandes', 'Porque fica no encontro de placas tectônicas, no Anel de Fogo do Pacífico', 'Porque fica em cima da Linha do Equador'], a: 2, hint: 'Pense no que faz o chão tremer: os pedaços da casca da Terra se mexendo.', why: 'O Japão fica onde placas tectônicas se encontram. Quando elas se mexem, vêm terremotos, e por ali o magma sobe e forma vulcões.' },
      ],
    },
    outro: [
      { who: 'YUKI', t: 'Ganbatte, {nome}! Quer dizer: boa sorte! A gente se vê na escola.' },
    ],
  },

  gameIntro: [
    { who: 'KDOK', t: 'Bip! Asteroides à frente! Use ◀ ▶ para mover e A para ATIRAR o raio de mineração.' },
    { who: 'KDOK', t: 'Pedras grandes se partem em menores. Quando quebrar, caem CRISTAIS: pegue 10!' },
  ],

  debrief: [
    { who: 'KDOK', t: 'AMOSTRAS COLETADAS! Essas pedras têm 4,6 bilhões de anos. Mais velhas que qualquer rocha da Terra.' },
    { who: 'KDOK', t: 'Viu? Os asteroides ficam longe uns dos outros. Deu pra passar tranquilo... quase sempre.' },
    { who: 'KDOK', t: 'Ceres, o maior deles, é um planeta-anão. Tem até gelo por dentro.' },
    { who: 'KDOK', t: 'Bip! O Zé mandou mensagem: o sinal está mais claro. Ele diz que vem de TODAS as direções.' },
  ],
  card: { id: 'asteroides', name: 'CINTURÃO DE ASTEROIDES', lines: ['Fica entre Marte e Júpiter', 'Milhões de rochas espaciais', 'Maior objeto: Ceres (planeta-anão)', 'Restos da formação do Sistema Solar', 'Hayabusa2 trouxe amostras em 2020'] },
  reward: { id: 'escudo-rad', name: 'ESCUDO DE RADIAÇÃO', desc: 'Protege contra a radiação fortíssima de Júpiter. Vale um escudo a mais na próxima missão.' },
  radio: 'Aqui é a Astrokdok! Gelo, água e vapor: a mesma coisa mudando de jeito. O universo inteiro é assim, cheio de transformações. E fica a dica: seja legal com quem chega de longe na sua escola. Continue {{curioso|curiosa}}! Câmbio!',
  real: 'Procure uma pedra bem diferente no quintal ou na rua. Ela é pesada? Tem brilho? Tem furinhos? Guarde como a sua amostra de asteroide.',

  chat: {
    lia: 'Meteoro é o risco de luz. Meteorito é a pedra no chão. Asteroide é a pedra no espaço. Três nomes pra mesma pedra!',
    tomas: 'Meu sorvete fez fusão antes de eu dar a primeira mordida. A ciência é cruel.',
    bia: 'Se eu minerasse asteroides, ia ficar rica. Tem asteroide cheio de metal!',
    caio: 'Um cinturão de asteroides... eu só tenho um cinto. E ele vive caindo.',
    rival: 'Asteroide à vista! Você mira, eu torço daqui de baixo. Pew pew pew! Traz uma pedrinha pra mim?',
    kdok: 'Bip! Vou guardar as amostras com cuidado. Da última vez derrubei uma lasanha no hangar.',
    ze: 'O mais estranho: o sinal é igual em todas as direções do céu. Como se o universo inteiro estivesse cochichando.',
  },
};
