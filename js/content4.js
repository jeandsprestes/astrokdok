'use strict';
// MISSÃO 4 — MERCÚRIO · lançamento de Roma (Itália)
A.MISSIONS[3] = {
  n: 4, name: 'MERCÚRIO', goal: 'atravessar Mercúrio pela linha do crepúsculo',
  place: 'ROMA', where: 'Roma, Itália', scene: 'roma', game: 'mercury', body: 'mercury', room: 'school',

  brief: [
    { who: 'CMTE. JULIUS', t: 'Piloto {nome}. Temos um mistério.' },
    { who: 'CMTE. JULIUS', t: 'Os telescópios do Atacama captaram um SINAL estranho vindo do espaço. Ele não para: shhhhhh... Ninguém sabe de onde vem.' },
    { who: 'CMTE. JULIUS', t: 'A Astrokdok vai procurar a origem, planeta por planeta. Missão 4: MERCÚRIO. Escola primeiro.' },
  ],
  ready: [
    { who: 'CMTE. JULIUS', t: 'Aulas concluídas. O lançamento será em Roma, na Itália.' },
    { who: 'CMTE. JULIUS', t: 'Um arqueólogo quer te mostrar de onde vêm os nomes dos planetas.' },
  ],
  teacher: [
    'Bom dia, turma! Sou a Profª Mari. Hoje é MATEMÁTICA: frações. Vamos repartir pizza... de planeta.',
    'Agora, a aula da missão do {nome}: MERCÚRIO, o planeta mais rápido!',
  ],
  after: 'Muito bem, {nome}! O Comandante está esperando.',

  lessons: [{
    id: 'm4a', subject: 'MATEMÁTICA', title: 'Frações',
    slides: [
      `<p>Uma <b>fração</b> mostra PARTES de um inteiro dividido em pedaços iguais.</p>
       <div class="calc">3   ← numerador (partes que pegamos)
─
8   ← denominador (partes no total)</div><p>Pizza em 8 pedaços, você comeu 3: comeu <b>3/8</b> (três oitavos).</p>`,
      `<p>Com o mesmo denominador, é fácil comparar: ganha quem tem o <b>maior numerador</b>.</p>
       <div class="calc">1/4 < 2/4 < 3/4 < 4/4
4/4 = a pizza inteira!</div><p>E metade é sempre 1/2, 2/4, 4/8... várias frações podem valer o mesmo.</p>`,
      `<p>Para achar uma fração de uma quantidade: <b>divida pelo denominador</b> e <b>multiplique pelo numerador</b>.</p>
       <div class="calc">3/4 de 20
20 ÷ 4 = 5
5 × 3 = 15</div>`,
    ],
    quiz: [
      { q: 'Uma pizza foi cortada em 8 pedaços iguais. Você comeu 3. Que fração você comeu?', o: ['3/8', '8/3', '3/5', '5/8'], a: 0, why: '3 pedaços de 8: três oitavos.' },
      { q: 'Qual fração é MAIOR?', o: ['2/7', '5/7', '3/7', '1/7'], a: 1, why: 'Mesmo denominador: ganha o maior numerador.' },
      { q: 'Quanto é 1/4 de 20?', n: 5, hint: 'Divida 20 em 4 partes iguais.', why: '20 ÷ 4 = 5.' },
      { q: 'Quanto é 3/4 de 20?', n: 15, hint: '1/4 de 20 é 5. Então 3/4 é 3 vezes isso.', why: '5 × 3 = 15.' },
      { q: 'Na fração 3/8, o 8 se chama:', o: ['numerador', 'denominador', 'quociente'], a: 1, why: 'O de baixo é o denominador: em quantas partes o inteiro foi dividido.' },
    ],
  }, {
    id: 'm4b', subject: 'CIÊNCIAS + MATEMÁTICA', title: 'Mercúrio, o mensageiro',
    slides: [
      `<p><b>Mercúrio</b> é o planeta <b>mais perto do Sol</b> e o <b>menor</b> de todos. Tem 4.879 km de diâmetro, pouco maior que a nossa Lua.</p>
       <p>Ele é o mais rápido: dá a volta no Sol em só <b>88 dias</b>. Esse é o ano de Mercúrio!</p>`,
      `<p>Mercúrio quase não tem <b>atmosfera</b> (camada de ar). Sem esse cobertor, o calor escapa.</p>
       <div class="calc">De dia:   430 °C
À noite: −180 °C</div><p>É o planeta com a maior diferença de temperatura entre o dia e a noite!</p>`,
      `<p>Ele gira devagar: de um nascer do Sol até o outro passam <b>176 dias</b> da Terra. Um dia de Mercúrio é mais longo que o ano dele!</p>
       <p>O chão é cheio de <b>crateras</b>, parecido com o da Lua. E ele não tem nenhuma lua.</p>`,
    ],
    quiz: [
      { q: 'Qual é o planeta mais perto do Sol?', o: ['Vênus', 'Mercúrio', 'Marte', 'Terra'], a: 1, why: 'Mercúrio, o primeiro da fila.' },
      { q: 'Um ano de Mercúrio dura 88 dias. Isso é mais ou menos que fração do nosso ano (365 dias)?', o: ['1/2', '1/4', '3/4', '1/10'], a: 1, why: '88 × 4 = 352, quase 365. Então é mais ou menos 1/4.', hint: 'Quantas vezes 88 cabe em 365? Experimente 88 × 4.' },
      { q: 'De dia, Mercúrio chega a 430 °C. À noite, cai a 180 °C abaixo de zero. Qual é a diferença entre as duas temperaturas?', n: 610, hint: 'De −180 até 0 são 180 graus. De 0 até 430 são mais 430. Some os dois.', why: '180 + 430 = 610 graus de diferença!' },
      { q: 'Quantos anos COMPLETOS de Mercúrio (88 dias) cabem em 1 ano da Terra (365 dias)?', n: 4, hint: '88 × 4 = 352. E 88 × 5?', why: '365 ÷ 88 = 4, e sobram 13 dias.' },
      { q: 'Por que Mercúrio fica tão frio à noite, mesmo perto do Sol?', o: ['Porque quase não tem atmosfera para guardar o calor', 'Porque tem neve', 'Porque gira rápido', 'Porque fica longe'], a: 0, why: 'Sem cobertor de ar, o calor foge para o espaço.' },
    ],
  }],

  site: {
    look: [1, 1, 1],
    intro: [
      { who: 'PROF. MARCO', t: 'Ciao, {nome}! Sou o professor Marco, arqueólogo. Bem-vindo a Roma, a cidade eterna!' },
    ],
    lesson: {
      id: 'm4c', subject: 'HISTÓRIA · ITÁLIA', title: 'Os deuses do céu',
      slides: [
        `<p>A <b>Itália</b> fica na Europa e tem o formato de uma <b>bota</b>. A capital é <b>Roma</b>. Lá se fala <b>italiano</b>: <i>ciao</i> = oi, <i>grazie</i> = obrigado, <i>stella</i> = estrela.</p>
         <p>Há uns 2 mil anos, Roma era o centro de um império enorme. O <b>Coliseu</b>, um estádio gigante, recebia mais de 50 mil pessoas!</p>`,
        `<p>Os romanos deram nomes de <b>deuses</b> aos planetas:</p>
         <div class="calc">MERCÚRIO → o mensageiro
VÊNUS    → deusa do amor
MARTE    → deus da guerra
JÚPITER  → rei dos deuses
SATURNO  → deus do tempo</div>`,
        `<p>Os romanos também tinham seus próprios números, os <b>algarismos romanos</b>:</p>
         <div class="calc">I = 1    V = 5    X = 10
L = 50   C = 100

XII = 10 + 1 + 1 = 12
IV  = 5 − 1 = 4</div><p>Letra menor ANTES da maior: subtrai. DEPOIS: soma.</p>`,
      ],
      quiz: [
        { q: 'Qual é a capital da Itália?', o: ['Roma', 'Milão', 'Paris', 'Veneza'], a: 0, why: 'Roma, a cidade eterna.' },
        { q: 'Que número é XII?', n: 12, hint: 'X = 10, I = 1. Some tudo.', why: '10 + 1 + 1 = 12.' },
        { q: 'Os planetas têm nomes de:', o: ['deuses romanos', 'cidades', 'reis de Portugal', 'cientistas'], a: 0, why: 'Mercúrio, Vênus, Marte, Júpiter, Saturno: todos deuses romanos.' },
        { q: 'Mercúrio era o deus:', o: ['mensageiro, que corria muito rápido', 'da guerra', 'do mar', 'do amor'], a: 0, why: 'Por isso o planeta mais rápido ganhou o nome dele!' },
        { q: 'Como se escreve 15 em algarismos romanos?', o: ['XV', 'VX', 'XIIIII', 'IL'], a: 0, why: 'X (10) + V (5) = 15.' },
      ],
    },
    outro: [
      { who: 'PROF. MARCO', t: 'Arrivederci! Quer dizer: até logo! Cuidado com o calor de Mercúrio.' },
    ],
  },

  gameIntro: [
    { who: 'KDOK', t: 'Bip! Mercúrio: de um lado, calor de derreter chumbo. Do outro, frio de congelar tudo!' },
    { who: 'KDOK', t: 'Fique na FAIXA DO CREPÚSCULO, entre o dia e a noite. Use ◀ ▶ e olhe os termômetros!' },
  ],

  debrief: [
    { who: 'KDOK', t: 'MISSÃO CUMPRIDA! Atravessamos Mercúrio pela linha do crepúsculo.' },
    { who: 'KDOK', t: 'Viu quantas crateras? Mercúrio parece a nossa Lua, só que perto do Sol.' },
    { who: 'KDOK', t: 'Aqui, de um nascer do Sol ao outro passam 176 dias. Mais que um ano inteiro de Mercúrio!' },
    { who: 'KDOK', t: 'Bip... captei o sinal de novo. Mas ele não vem daqui.' },
  ],
  card: { id: 'mercurio', name: 'MERCÚRIO', lines: ['Planeta mais perto do Sol', 'Diâmetro: 4.879 km (o menor planeta)', 'Ano: 88 dias', 'Temperatura: de −180 °C a 430 °C', 'Luas: nenhuma'] },
  reward: { id: 'refletor', name: 'MANTA REFLETORA', desc: 'Uma capa espelhada que devolve o calor do Sol. Em Vênus, vale um escudo a mais.' },
  radio: 'Filho, sabia que dá pra ver Mercúrio daqui? Ele aparece baixinho, perto do horizonte, logo depois do pôr do sol. Vou procurar hoje. Câmbio!',
  real: 'Desenhe uma pizza dividida em 8 pedaços. Pinte 3/8 de amarelo e 5/8 de preto: as cores da Astrokdok!',

  chat: {
    lia: 'Mercúrio não tem lua nenhuma. Coitado. Eu emprestava a nossa por uns dias.',
    tomas: 'Pizza de frações? Eu quero 8/8. A pizza inteira, professora.',
    bia: 'Calculei: o Calhambeque aguenta 430 graus por uns 3 segundos. Não demora lá.',
    caio: 'Um dia em Mercúrio dura 176 dias? Isso sim é um cochilo decente.',
    rival: 'Hunf. Mercúrio é o menor planeta. Até eu chegava lá.',
    kdok: 'Bip! Um sinal estranho? Achei que era meu estômago. Robôs têm estômago? Não. Então é mistério mesmo.',
    ze: 'Prazer, sou o Zé do Rádio. Faz 40 anos que escuto o céu com essa antena. Esse sinal aí... eu já ouvi antes. Só não lembro onde.',
  },
};
