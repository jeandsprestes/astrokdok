'use strict';
// MISSÃO 6: MARTE · lançamento da Flórida (EUA)
A.MISSIONS[5] = {
  n: 6, name: 'MARTE', goal: 'dirigir um jipe-robô em Marte e coletar gelo',
  place: 'FLÓRIDA', where: 'Cabo Canaveral, Flórida, EUA', scene: 'florida', game: 'mars', body: 'mars', room: 'lab', night: true,

  brief: [
    { who: 'CMTE. DOZINHO', t: 'Boa noite, piloto. Sim, hoje a base trabalha de madrugada: Marte está bem visível no céu.' },
    { who: 'CMTE. DOZINHO', t: 'Missão 6: MARTE, o planeta vermelho. Você vai dirigir um jipe-robô e coletar gelo do chão.' },
    { who: 'CMTE. DOZINHO', t: 'A aula hoje é no LABORATÓRIO da escola. Vá.' },
  ],
  ready: [
    { who: 'CMTE. DOZINHO', t: 'Aulas concluídas. O lançamento será no Cabo Canaveral, na Flórida, de onde saiu a Apollo 11.' },
  ],
  teacher: [
    'Boa noite, turma! Aula noturna no laboratório. Hoje é MATEMÁTICA: RAZÃO e PROPORÇÃO, o jeito de comparar duas quantidades.',
    'Agora, a aula da missão de {nome}: MARTE, o planeta vermelho!',
  ],
  after: 'Excelente, {nome}! O Comandante está esperando.',

  lessons: [{
    id: 'm6a', subject: 'MATEMÁTICA', title: 'Razão e proporção',
    slides: [
      `<p>Para fazer suco, a gente mistura <b>1 copo de polpa</b> com <b>3 copos de água</b>. Comparar duas quantidades dividindo uma pela outra é fazer uma <b>razão</b>.</p>
       <div class="calc">razão = 1 ÷ 3 = 1/3
lê-se: "1 para 3"</div><p>Dobrou tudo? 2 copos de polpa e 6 de água. A razão 2/6 vale o mesmo que 1/3, e o gosto não muda. Razões de mesmo valor são <b>equivalentes</b>.</p>`,
      `<p>Uma <b>proporção</b> é uma igualdade entre duas razões. Na nave, 2 tanques dão 6 horas de voo. Quantas horas dão 5 tanques? Chame o que a gente não sabe de <b>x</b>:</p>
       <div class="calc">2/6 = 5/x
2 × x = 6 × 5   (em cruz)
2 × x = 30
x = 30 ÷ 2 = 15 horas</div><p>Essa é a <b>propriedade fundamental</b>: numa proporção, multiplicar em cruz dá o mesmo resultado dos dois lados. É assim que a gente acha o número que falta.</p>`,
      `<p>A <b>escala</b> de um mapa também é uma razão: desenho para real. Escala 1:100.000 quer dizer que 1 cm no mapa vale 100.000 cm de verdade, ou seja, 1 km.</p>
       <div class="calc">escala 1:100.000
1 cm no mapa = 100.000 cm
100.000 cm = 1.000 m = 1 km
4 cm no mapa = 4 km</div><p><b>Erro comum:</b> trocar a ordem. A razão "3 para 4" é 3/4, não 4/3. O primeiro número que a frase diz fica em cima.</p>`,
    ],
    quiz: [
      { q: 'No laboratório há 6 meninas e 9 meninos. A razão entre meninas e meninos, escrita como fração, é:', o: ['6/9', '9/6', '6/15'], a: 0, hint: 'O primeiro que a frase diz fica em cima: meninas para meninos.', why: 'Meninas para meninos: 6/9, que vale o mesmo que 2/3.' },
      { q: 'O jipe-robô andou 20 metros em 4 minutos. Quantos metros ele anda por minuto?', n: 5, calc: '20 ÷ 4 = ?', hint: 'Razão é uma divisão: os metros divididos pelos minutos.', why: '20 ÷ 4 = 5 metros por minuto.' },
      { q: '{rival} vai fazer suco para a turma toda com 4 copos de polpa. Na receita, 1 copo de polpa pede 3 copos de água. Quantos copos de água vão no suco?', n: 12, calc: '1/3 = 4/x', hint: 'Multiplique em cruz: 1 × x = 3 × 4.', why: '1 × x = 3 × 4 = 12. São 12 copos de água.' },
      { q: 'Qual razão é equivalente a 2/5?', o: ['4/7', '4/10', '2/10', '5/2'], a: 1, hint: 'Multiplique o de cima E o de baixo pelo mesmo número: 2 × 2 e 5 × 2.', why: '2 × 2 = 4 e 5 × 2 = 10. Então 4/10 vale o mesmo que 2/5.' },
      { q: 'Num mapa de escala 1:50.000, a trilha até a cachoeira mede 6 cm. Quantos km tem a trilha de verdade?', n: 3, calc: 'escala 1:50.000 · 6 cm = ? km', hint: '1 cm no mapa vale 50.000 cm, que são 500 m. Faça 6 × 500 e depois passe os metros para km.', why: '6 × 500 = 3.000 m = 3 km.' },
      { q: 'A nave gasta 30 litros de combustível a cada 100 km. Quantos litros ela gasta em 450 km?', n: 135, calc: '30/100 = x/450', hint: 'Multiplique em cruz: 100 × x = 30 × 450. Depois divida por 100.', why: '30 × 450 = 13.500. 13.500 ÷ 100 = 135 litros.' },
    ],
  }, {
    id: 'm6b', subject: 'ASTRONOMIA', title: 'O planeta vermelho',
    slides: [
      `<p><b>Marte</b> é o quarto planeta a partir do Sol. Ele é vermelho porque o chão tem muito <b>óxido de ferro</b>: é <b>ferrugem</b>! A poeira vermelha sobe e deixa até o céu cor de caramelo.</p>
       <p>Um dia em Marte dura <b>24 horas e 37 minutos</b>, quase igual ao nosso. Mas Marte fica mais longe do Sol e anda mais devagar: a volta no Sol, o <b>ano</b> de Marte, dura <b>687 dias</b> da Terra.</p>`,
      `<p>Lá fica o <b>Monte Olimpo</b>, o maior vulcão do Sistema Solar: tem uns <b>22 km</b> de altura. O Everest, a montanha mais alta da Terra, tem uns <b>9 km</b>.</p>
       <p>Marte tem duas luazinhas tortas, parecidas com batatas: <b>Fobos</b> e <b>Deimos</b>. E a gravidade de lá é fraca: puxa só uns <b>38%</b> do que a Terra puxa.</p>`,
      `<p>Nos polos de Marte existe <b>gelo</b>, e há mais gelo escondido embaixo do chão. Gelo derretido vira <b>água</b>, e água é o que futuros astronautas vão precisar para beber e plantar.</p>
       <p>Jipes-robôs como o <b>Curiosity</b> e o <b>Perseverance</b> exploram Marte hoje, controlados da Terra. Eles procuram sinais de que Marte já teve rios e, quem sabe, vida pequenininha.</p>`,
    ],
    quiz: [
      { q: 'Por que Marte é vermelho?', o: ['Porque está pegando fogo', 'Porque o chão tem ferrugem (óxido de ferro)', 'Porque o Sol é vermelho lá', 'Porque é coberto de lava'], a: 1, hint: 'Pense num prego velho, esquecido na chuva. Que cor ele fica?', why: 'O ferro das rochas e da poeira enferrujou. Ferrugem é vermelha!' },
      { q: 'Quais são as luas de Marte?', o: ['Io e Europa', 'Titã e Encélado', 'Não tem luas', 'Fobos e Deimos'], a: 3, hint: 'São duas luazinhas tortas, parecidas com batatas.', why: 'Fobos e Deimos. Io e Europa são luas de Júpiter, e Titã e Encélado são luas de Saturno.' },
      { q: 'O Monte Olimpo, em Marte, tem uns 22 km de altura. O Everest tem uns 9 km. Quantos km o Monte Olimpo é mais alto?', n: 13, calc: '22 − 9 = ?', hint: 'Tire a altura do Everest da altura do Monte Olimpo.', why: '22 − 9 = 13 km a mais. O maior vulcão do Sistema Solar!' },
      { q: 'Por que os cientistas ficam tão animados quando acham gelo em Marte?', o: ['Porque o gelo deixa Marte mais quente', 'Porque gelo derretido vira água, e os astronautas vão precisar de água', 'Porque o gelo é vermelho', 'Porque o gelo faz Marte girar'], a: 1, hint: 'O que acontece com o gelo quando ele derrete? E do que todo ser vivo precisa?', why: 'Gelo derretido vira água, para beber e plantar. E onde já houve água, pode ter existido vida.' },
      { q: 'Um ano de Marte dura 687 dias. Imagine que você tem 14 anos da Terra, uns 5.110 dias. Quantos aniversários COMPLETOS de Marte você já teria feito?', n: 7, hint: 'Veja quantas vezes 687 cabe em 5.110. Experimente: 687 × 7 = 4.809 e 687 × 8 = 5.496.', why: '687 × 7 = 4.809, que cabe em 5.110. 687 × 8 = 5.496, que já passa. Então são 7 aniversários de Marte. Como o ano de lá é mais longo, a idade em Marte é bem menor!' },
    ],
  }],

  site: {
    look: [2, 3, 0],
    intro: [
      { who: 'ENG. TONY', t: 'Hello, {nome}! Sou o engenheiro Tony. {{Bem-vindo|Bem-vinda}} ao Cabo Canaveral, na Flórida!' },
    ],
    lesson: {
      id: 'm6c', subject: 'GEOGRAFIA · EUA', title: 'A costa dos foguetes',
      slides: [
        `<p>Os <b>Estados Unidos</b> ficam na <b>América do Norte</b>. São <b>50 estados</b>, por isso a bandeira tem 50 estrelas. A capital é <b>Washington</b> (não é Nova York!).</p>
         <p>Na <b>Flórida</b>, no sul do país, fica o Cabo Canaveral. Do Centro Espacial Kennedy, aqui do lado, a <b>Apollo 11</b> partiu para a Lua em <b>1969</b>.</p>`,
        `<p>Lá se fala <b>inglês</b>. Palavras de foguete:</p>
         <div class="calc">ROCKET    = foguete
COUNTDOWN = contagem regressiva
LIFTOFF   = decolagem
LAUNCH    = lançamento</div><p>Num lançamento, primeiro vem o <b>countdown</b>: <i>three, two, one</i> (três, dois, um)... e então o <b>liftoff</b>, quando o foguete sai do chão!</p>`,
        `<p>Em <b>1970</b>, na <b>Apollo 13</b>, um tanque de oxigênio explodiu no caminho para a Lua. O astronauta avisou o controle da missão, que fica na cidade de Houston: <b>"Houston, we've had a problem"</b> ("Houston, tivemos um problema").</p>
         <p>Um filme famoso mudou a frase para <i>"Houston, we have a problem"</i>. A missão não pousou na Lua, mas, com muita conta e criatividade, os três astronautas voltaram vivos para a Terra!</p>`,
      ],
      quiz: [
        { q: 'Qual é a capital dos Estados Unidos?', o: ['Nova York', 'Los Angeles', 'Washington', 'Flórida'], a: 2, hint: 'Cuidado: não é a maior cidade do país.', why: 'Washington. Nova York é a maior cidade, mas não é a capital. E Flórida é um estado.' },
        { q: 'Os Estados Unidos ficam em qual continente?', o: ['Europa', 'América', 'Ásia', 'África'], a: 1, hint: 'É o mesmo continente do Brasil, só que na parte de cima.', why: 'Na América, na parte do norte. O Brasil fica na América do Sul.' },
        { q: 'Quantos estados têm os Estados Unidos?', n: 50, hint: 'Conte as estrelas da bandeira: uma para cada estado.', why: '50 estados: por isso a bandeira tem 50 estrelas.' },
        { q: '"Countdown" quer dizer:', o: ['lançamento', 'foguete', 'astronauta', 'contagem regressiva'], a: 3, hint: 'É o que todo mundo grita antes de o foguete subir: três, dois, um...', why: 'Countdown é a contagem regressiva: three, two, one...' },
        { q: 'Num lançamento de foguete, o que acontece primeiro?', o: ['O LIFTOFF, e depois o COUNTDOWN', 'O COUNTDOWN, e depois o LIFTOFF', 'Os dois ao mesmo tempo'], a: 1, hint: 'Traduza as duas palavras. Primeiro a gente conta, ou primeiro o foguete sai do chão?', why: 'Primeiro o countdown, a contagem regressiva (três, dois, um), e depois o liftoff, a decolagem.' },
      ],
    },
    outro: [
      { who: 'ENG. TONY', t: 'Countdown liberado! Good luck, {nome}!' },
    ],
  },

  gameIntro: [
    { who: 'KDOK', t: 'Bip! Você vai dirigir o jipe-robô pelo chão de Marte.' },
    { who: 'KDOK', t: 'Aperte A para PULAR as pedras e crateras. Pegue 8 cristais de gelo.' },
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
  radio: 'Aqui é a Astrokdok! Sabia que todo mapa usa proporção? É ela que faz um planeta inteiro caber numa folha de papel. Valeu por não desistir nas contas mais difíceis. Câmbio!',
  real: 'Numa noite limpa, com um adulto, procure um ponto avermelhado que NÃO pisca. Pode ser Marte! As estrelas piscam; os planetas quase não piscam.',

  chat: {
    lia: 'Em Marte o pôr do sol é azul! O mundo lá é de ponta-cabeça.',
    tomas: 'Razão e proporção? Se 1 pastel custa R$ 3,50, com R$ 14 eu levo 4. Finalmente uma matéria útil.',
    bia: 'Os robôs de Marte têm nome: Curiosity e Perseverance. O Kdok quer um nome assim também.',
    caio: 'Aula de noite? Um dia em Marte tem 37 minutos a mais. Eu queria esses 37 minutos pra dormir.',
    rival: 'Se o jipe atolar na poeira de Marte, me chama pelo rádio que eu empurro daqui da Terra! Brincadeira. Você dirige muito bem, {nome}. Vai dar certo!',
    kdok: 'Bip! Pode me chamar de Kdok Perseverança. Não? Tá. Kdok mesmo.',
    ze: 'Anotei no caderno: o sinal fica igualzinho de dia e de noite. Então ele não vem do Sol. Hmm.',
  },
};
