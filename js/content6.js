'use strict';
// MISSÃO 6 — MARTE · lançamento da Flórida (EUA)
A.MISSIONS[5] = {
  n: 6, name: 'MARTE', goal: 'dirigir um jipe-robô em Marte e coletar gelo',
  place: 'FLÓRIDA', where: 'Cabo Canaveral, Flórida, EUA', scene: 'florida', game: 'mars', body: 'mars', room: 'lab', night: true,

  brief: [
    { who: 'CMTE. JULIUS', t: 'Boa noite, piloto. Sim, hoje a base trabalha de madrugada: Marte está bem visível no céu.' },
    { who: 'CMTE. JULIUS', t: 'Missão 6: MARTE, o planeta vermelho. Você vai dirigir um jipe-robô e coletar gelo do chão.' },
    { who: 'CMTE. JULIUS', t: 'A aula hoje é no LABORATÓRIO da escola. Vá.' },
  ],
  ready: [
    { who: 'CMTE. JULIUS', t: 'Aulas concluídas. O lançamento será no Cabo Canaveral, na Flórida, de onde saiu a Apollo 11.' },
  ],
  teacher: [
    'Boa noite, turma! Aula noturna no laboratório. Hoje é MATEMÁTICA: números DECIMAIS, com dinheiro de verdade.',
    'Agora, a aula da missão do {nome}: MARTE, o planeta vermelho!',
  ],
  after: 'Excelente, {nome}! O Comandante está esperando.',

  lessons: [{
    id: 'm6a', subject: 'MATEMÁTICA', title: 'Números decimais',
    slides: [
      `<p>Os números <b>decimais</b> têm uma <b>vírgula</b>. Depois dela vêm os pedacinhos do inteiro:</p>
       <div class="calc">0,1  = um décimo    (1/10)
0,01 = um centésimo  (1/100)</div>`,
      `<p>O dinheiro usa decimais! Os centavos são centésimos do real:</p>
       <div class="calc">R$ 2,50 = 2 reais e 50 centavos
R$ 0,75 = 75 centavos
R$ 1,00 = 100 centavos</div>`,
      `<p>Para somar ou subtrair, <b>alinhe as vírgulas</b>:</p>
       <div class="calc">  3,50
+ 1,25
------
  4,75</div><p>Para comparar, olhe primeiro os inteiros, depois os décimos: 0,8 é maior que 0,75!</p>`,
    ],
    quiz: [
      { q: 'Como se escreve "dois reais e cinquenta centavos"?', o: ['R$ 2,50', 'R$ 25,0', 'R$ 2,05', 'R$ 250'], a: 0, why: '2 reais, vírgula, 50 centavos.' },
      { q: 'Quanto é 1,5 + 2,5?', n: 4, hint: 'Some os inteiros (1 + 2) e depois os meios (0,5 + 0,5).', why: '1,5 + 2,5 = 4,0 = 4.' },
      { q: 'Qual número é MAIOR?', o: ['0,8', '0,75', '0,09'], a: 0, why: 'Olhe os décimos: 8 décimos é mais que 7 e mais que 0.' },
      { q: 'Um lanche custa R$ 3,50. Você paga com R$ 5,00. Quantos CENTAVOS de troco?', n: 150, hint: 'O troco é R$ 1,50. Quantos centavos tem 1 real e 50 centavos?', why: 'R$ 1,50 = 150 centavos.' },
      { q: 'A gravidade de Marte é 0,38 da Terra. Isso é mais perto de:', o: ['um terço', 'metade', 'o dobro'], a: 0, why: 'Um terço é mais ou menos 0,33. Bem pertinho de 0,38!' },
    ],
  }, {
    id: 'm6b', subject: 'CIÊNCIAS + MATEMÁTICA', title: 'O planeta vermelho',
    slides: [
      `<p><b>Marte</b> é o quarto planeta. Ele é vermelho porque o chão tem muito <b>óxido de ferro</b>: é ferrugem!</p>
       <p>Um dia em Marte dura <b>24 horas e 37 minutos</b>, quase igual ao nosso. Mas o ano dura <b>687 dias</b>.</p>`,
      `<p>Lá fica o <b>Monte Olimpo</b>, o maior vulcão do Sistema Solar: tem uns <b>22 km</b> de altura. O Everest, a maior montanha da Terra, tem uns 9 km.</p>
       <p>Marte tem duas luazinhas: <b>Fobos</b> e <b>Deimos</b>.</p>`,
      `<p>Nos polos de Marte existe <b>gelo</b>, e há gelo escondido embaixo do chão. Onde tem gelo, um dia pode ter água para astronautas.</p>
       <p>Jipes-robôs como o <b>Curiosity</b> e o <b>Perseverance</b> exploram Marte hoje, controlados da Terra.</p>`,
    ],
    quiz: [
      { q: 'Por que Marte é vermelho?', o: ['O chão tem ferrugem (óxido de ferro)', 'Está pegando fogo', 'É feito de tomate', 'O Sol é vermelho lá'], a: 0, why: 'Ferrugem! O ferro das rochas enferrujou.' },
      { q: 'O Monte Olimpo tem 22 km de altura. O Everest tem uns 9 km. Quantos km o Monte Olimpo é mais alto?', n: 13, hint: 'Faça 22 − 9.', why: '22 − 9 = 13 km a mais!' },
      { q: 'Um ano em Marte dura 687 dias. Arredonde para a CENTENA mais próxima.', o: ['600', '700', '690', '1.000'], a: 1, why: '687 está mais perto de 700 que de 600 (olhe o 8 das dezenas).', hint: 'Olhe o algarismo das dezenas: 5 ou mais, arredonda para cima.' },
      { q: 'Quais são as luas de Marte?', o: ['Fobos e Deimos', 'Io e Europa', 'Titã e Encélado', 'Não tem luas'], a: 0, why: 'Duas luazinhas pequenas e tortas.' },
      { q: 'Um astronauta marca 60 kg na balança da Terra. Em Marte, a balança mostraria mais ou menos 1/3 disso. Quanto?', n: 20, hint: '1/3 de 60: divida 60 por 3.', why: '60 ÷ 3 = 20 kg, mais ou menos.' },
    ],
  }],

  site: {
    look: [2, 3, 0],
    intro: [
      { who: 'ENG. TONY', t: 'Hello, {nome}! Sou o engenheiro Tony. Bem-vindo ao Cabo Canaveral, na Flórida!' },
    ],
    lesson: {
      id: 'm6c', subject: 'GEOGRAFIA · EUA', title: 'A costa dos foguetes',
      slides: [
        `<p>Os <b>Estados Unidos</b> ficam na América do Norte. São <b>50 estados</b>, e a capital é <b>Washington</b> (não é Nova York!).</p>
         <p>Na <b>Flórida</b> fica o Cabo Canaveral, de onde a <b>Apollo 11</b> partiu para a Lua em 1969.</p>`,
        `<p>Lá se fala <b>inglês</b>. Palavras de foguete:</p>
         <div class="calc">LAUNCH    = lançamento
COUNTDOWN = contagem regressiva
ROCKET    = foguete
LIFTOFF   = decolagem</div>`,
        `<p>Frase famosa: <b>"Houston, we have a problem"</b> ("Houston, temos um problema"). Foi dita na Apollo 13, em 1970, quando um tanque explodiu. Os astronautas conseguiram voltar vivos!</p>`,
      ],
      quiz: [
        { q: 'Qual é a capital dos Estados Unidos?', o: ['Nova York', 'Washington', 'Flórida', 'Los Angeles'], a: 1, why: 'Washington. Nova York é a maior cidade, mas não é a capital.' },
        { q: 'Quantos estados têm os Estados Unidos?', n: 50, why: '50 estados: por isso a bandeira tem 50 estrelas.' },
        { q: '"Countdown" quer dizer:', o: ['contagem regressiva', 'lançamento', 'foguete', 'astronauta'], a: 0, why: 'Countdown: 3, 2, 1...' },
        { q: 'De onde partiu a Apollo 11, em 1969?', o: ['Da Flórida, nos EUA', 'De Alcântara', 'Do Cazaquistão', 'Da Lua'], a: 0, why: 'Do Centro Espacial Kennedy, no Cabo Canaveral.' },
        { q: 'Os Estados Unidos ficam em qual continente?', o: ['América', 'Europa', 'Ásia', 'África'], a: 0, why: 'Na América, a parte do norte.' },
      ],
    },
    outro: [
      { who: 'ENG. TONY', t: 'Countdown liberado! Good luck, {nome}!' },
    ],
  },

  gameIntro: [
    { who: 'KDOK', t: 'Bip! Você vai dirigir o jipe-robô pelo chão de Marte.' },
    { who: 'KDOK', t: 'Aperte A para PULAR as pedras e crateras. Pegue 10 cristais de gelo.' },
    { who: 'KDOK', t: 'Cuidado: no fim vem uma tempestade de poeira!' },
  ],

  debrief: [
    { who: 'KDOK', t: 'GELO COLETADO! Pousamos em Marte: céu cor de caramelo e chão vermelho de ferrugem.' },
    { who: 'KDOK', t: 'Sabe o que é mais estranho? Em Marte, o pôr do sol é AZUL. Ao contrário da Terra!' },
    { who: 'KDOK', t: 'O gelo que coletamos pode, um dia, virar água para os primeiros moradores de Marte.' },
    { who: 'KDOK', t: 'Bip! O sinal também está aqui. Ele vem de mais longe. De muito mais longe.' },
  ],
  card: { id: 'marte', name: 'MARTE', lines: ['Quarto planeta: o planeta vermelho', 'Cor vermelha: ferrugem no chão', 'Monte Olimpo: vulcão de 22 km', 'Luas: Fobos e Deimos', 'Dia: 24 h 37 min · Ano: 687 dias'] },
  reward: { id: 'broca', name: 'BROCA DE GELO', desc: 'Fura gelo e rocha para coletar amostras. No Cinturão de Asteroides, vale um escudo a mais.' },
  radio: 'Filho, Marte aparece no céu como uma estrelinha avermelhada que não pisca. Hoje vou olhar pra ela e pensar em você. Câmbio!',
  real: 'Numa noite limpa, com um adulto, procure um ponto avermelhado que NÃO pisca. Pode ser Marte! As estrelas piscam; os planetas quase não piscam.',

  chat: {
    lia: 'Em Marte o pôr do sol é azul! O mundo lá é de ponta-cabeça.',
    tomas: 'Decimais com dinheiro? Finalmente uma matéria útil. R$ 3,50 é um pastel.',
    bia: 'Os robôs de Marte têm nome: Curiosity e Perseverance. O Kdok quer um nome assim também.',
    caio: 'Aula de noite? Um dia em Marte tem 37 minutos a mais. Eu queria esses 37 minutos pra dormir.',
    rival: 'Hunf. Aposto que eu dirigia o jipe melhor. Eu sou ótimo no videogame.',
    kdok: 'Bip! Pode me chamar de Kdok Perseverança. Não? Tá. Kdok mesmo.',
    ze: 'Anotei no caderno: o sinal fica igualzinho de dia e de noite. Então ele não vem do Sol. Hmm.',
  },
};
