'use strict';
// MISSÃO 12: PLUTÃO · lançamento da Estação Comandante Ferraz (Antártida)
A.MISSIONS[11] = {
  n: 12, name: 'PLUTÃO', goal: 'fotografar Plutão de perto',
  place: 'ANTÁRTIDA', where: 'Estação Comandante Ferraz, Antártida', scene: 'antartida', game: 'pluto', body: 'pluto', room: 'lab',
  guest: { who: 'ENG. NARA', look: [0, 3, 0], t: 'Oi, {nome}! Vim de Alcântara só pra ver quem começou no Calhambeque chegar até Plutão.' },

  brief: [
    { who: 'CMTE. DOZINHO', t: '{{Capitão|Capitã}}. Missão 12: PLUTÃO. Ele não é mais planeta, mas continua lá, no frio, esperando visita.' },
    { who: 'CMTE. DOZINHO', t: 'Você vai fotografar Plutão numa passagem rápida. Sem segunda chance: a nave não para.' },
    { who: 'CMTE. DOZINHO', t: 'Aula no LABORATÓRIO. Hoje tem gelo.' },
  ],
  ready: [
    { who: 'CMTE. DOZINHO', t: 'Aulas concluídas. O lançamento será na Antártida, da estação brasileira Comandante Ferraz. Leve casaco.' },
  ],
  teacher: [
    'Bom dia, turma! Laboratório gelado: hoje é MATEMÁTICA, média, mediana e moda. Três jeitos de resumir um monte de números num só.',
    'Agora, a aula de ASTRONOMIA da missão: PLUTÃO, o pequeno valente lá do fim do Sistema Solar! Atenção, {nome}.',
  ],
  after: 'Muito bem, {nome}! O Comandante está esperando.',

  lessons: [{
    id: 'm12a', subject: 'MATEMÁTICA', title: 'Média, mediana e moda',
    slides: [
      `<p>Na escola, a nota do bimestre é a <b>média</b> das provas. {nome} tirou 6, 8 e 7. Para achar a média, some tudo e divida pela quantidade de notas:</p>
       <div class="calc">6 + 8 + 7 = 21
21 ÷ 3 = 7
média = 7</div><p>A média é um número só que representa o grupo inteiro. É como repartir os pontos por igual entre as três provas: cada uma fica com 7.</p>`,
      `<p>A <b>mediana</b> é o valor do meio. Coloque os números em ordem, do menor para o maior, e ache o que fica bem no centro, com a mesma quantidade de números de cada lado.</p>
       <div class="calc">idades: 12, 15, 11, 13, 14
em ordem: 11 12 13 14 15
                ^^
mediana = 13</div><p>Se a lista tiver quantidade PAR de números, sobram dois no meio: a mediana é a média desses dois. Em 2, 4, 6, 10, o meio é 4 e 6: (4 + 6) ÷ 2 = 5.</p>`,
      `<p>A <b>moda</b> é o valor que mais se repete. Nos tamanhos de tênis da turma, o 37 aparece três vezes: a moda é 37. Uma loja usa a moda para saber qual número comprar mais.</p>
       <div class="calc">36 37 37 38 37 40
37 aparece 3 vezes
moda = 37</div><p>Qual usar? A média reparte por igual (notas, gastos). Mas um valor muito fora puxa a média para longe; aí a mediana mostra melhor o grupo. A moda mostra o mais comum. E a média nem sempre é um número da lista.</p>`,
    ],
    quiz: [
      { q: 'Nas três aulas da semana, {nome} ganhou 3, 5 e 4 estrelas. Qual foi a média de estrelas por aula?', n: 4, calc: '(3 + 5 + 4) ÷ 3 = ?', hint: 'Some as três: 3 + 5 + 4. Depois divida por 3, porque são três aulas.', why: '3 + 5 + 4 = 12 e 12 ÷ 3 = 4 estrelas por aula.' },
      { q: 'Os tamanhos de tênis de seis colegas: 35, 36, 36, 38, 36, 39. Qual é a moda?', o: ['36', '38', '35', '39'], a: 0, hint: 'A moda é o número que aparece mais vezes. Conte quantas vezes aparece cada um.', why: 'O 36 aparece três vezes; os outros, uma vez só. A moda é 36.' },
      { q: 'As alturas de cinco pinguins, em cm: 70, 65, 80, 60, 75. Qual é a mediana?', n: 70, calc: '70  65  80  60  75', hint: 'Primeiro coloque em ordem: 60, 65, 70, 75, 80. A mediana é o valor que fica no meio.', why: 'Em ordem: 60, 65, 70, 75, 80. O do meio é 70 cm. O 80 estava no meio da lista bagunçada, mas a mediana só vale depois de pôr em ordem.' },
      { q: 'Quatro astronautas têm 30, 42, 36 e 48 anos. Qual é a mediana das idades?', o: ['36 anos', '42 anos', '39 anos', '78 anos'], a: 2, hint: 'Coloque em ordem: 30, 36, 42, 48. São quatro números, então sobram dois no meio. A mediana é a média desses dois.', why: 'Em ordem: 30, 36, 42, 48. No meio ficam 36 e 42: (36 + 42) ÷ 2 = 78 ÷ 2 = 39 anos.' },
      { q: '{nome} tirou 6 e 7 nas duas primeiras provas. Quanto precisa tirar na terceira para fechar o bimestre com média 7?', n: 8, calc: '7 × 3 = ?   depois − (6 + 7)', hint: 'Média 7 em três provas quer dizer 7 × 3 = 21 pontos no total. Quanto já tem com 6 + 7? O que falta é a nota da terceira prova.', why: '7 × 3 = 21 pontos no total. Já tem 6 + 7 = 13. Falta 21 − 13 = 8.' },
      { q: 'Numa mesa estão quatro crianças e o pai de uma delas: 12, 13, 12, 14 e 49 anos. Quanto a média é MAIOR que a mediana?', n: 7, calc: 'média − mediana = ?', hint: 'Média: some os cinco (dá 100) e divida por 5. Mediana: coloque em ordem e pegue o do meio. Depois tire a mediana da média.', why: 'Média: 100 ÷ 5 = 20. Em ordem: 12, 12, 13, 14, 49, mediana 13. 20 − 13 = 7. O 49 puxou a média para cima; a mediana nem se mexeu.' },
    ],
  }, {
    id: 'm12b', subject: 'ASTRONOMIA', title: 'O pequeno valente',
    slides: [
      `<p><b>Plutão</b> foi descoberto em <b>1930</b> por <b>Clyde Tombaugh</b>, um jovem de 24 anos que comparava fotos do céu, noite após noite, procurando um pontinho que mudasse de lugar.</p>
       <p>Por 76 anos ele foi chamado de nono planeta. Em <b>2006</b>, os astrônomos o classificaram como <b>planeta-anão</b>: ele é menor que a nossa Lua e divide o caminho em volta do Sol com muitos outros corpos gelados.</p>`,
      `<p>Em <b>2015</b>, depois de mais de 9 anos de viagem, a sonda <b>New Horizons</b> passou por Plutão e trouxe uma surpresa: uma enorme planície de gelo com formato de <b>coração</b>!</p>
       <p>As fotos também mostraram montanhas de gelo e um céu com uma névoa azulada. Plutão não era só uma bolinha sem graça.</p>`,
      `<p>Plutão fica tão longe que lá faz cerca de <b>−230 °C</b>. Um ano em Plutão dura <b>248 anos</b> da Terra.</p>
       <div class="calc">diâmetro aproximado:
Lua      3.474 km
Plutão   2.377 km
Caronte  1.212 km</div><p>Plutão tem 5 luas. A maior, <b>Caronte</b>, tem pouco mais da metade do tamanho dele. Os dois giram juntos, como uma dupla dançando.</p>`,
    ],
    quiz: [
      { q: 'Desde 2006, Plutão é chamado de:', o: ['estrela', 'planeta-anão', 'cometa'], a: 1, hint: 'Lembre da tela 1: em 2006, Plutão ganhou uma classificação nova por ser pequeno.', why: 'Desde 2006, Plutão é um planeta-anão. Ele continua lá, girando em volta do Sol, mas não é mais contado como planeta.' },
      { q: 'Em 2015, a New Horizons fotografou em Plutão uma planície com formato de coração. Ela é feita de:', o: ['lava quente', 'areia', 'gelo'], a: 2, hint: 'Lá faz cerca de −230 °C. O que existe num lugar tão frio?', why: 'É uma planície de gelo. Com −230 °C, não dá para ter lava quente na superfície.' },
      { q: 'Plutão foi descoberto em 1930 e fotografado de perto em 2015. Quantos anos depois?', n: 85, calc: '2015 − 1930 = ?', hint: 'Tire o ano da descoberta do ano das fotos: 2015 − 1930.', why: '2015 − 1930 = 85 anos entre a descoberta e as primeiras fotos de perto.' },
      { q: 'Por que Plutão deixou de ser chamado de planeta?', o: ['Porque é pequeno e divide o caminho em volta do Sol com muitos outros corpos gelados', 'Porque ele explodiu em 2006', 'Porque saiu do Sistema Solar'], a: 0, hint: 'Plutão continua lá, girando em volta do Sol. O que mudou foi a classificação. Releia a tela 1.', why: 'Plutão é menor que a Lua e não domina o próprio caminho: há muitos corpos gelados perto dele. Por isso, desde 2006, é planeta-anão.' },
      { q: 'Plutão foi descoberto em 1930 e leva 248 anos para dar uma volta no Sol. Em que ano ele vai completar a primeira volta inteira desde a descoberta?', n: 2178, calc: '1930 + 248 = ?', hint: 'Some 248 ao ano da descoberta. Comece por 1930 + 200 = 2130 e depois some 48.', why: '1930 + 248 = 2178. Ninguém que viu a descoberta vai ver essa volta terminar!' },
    ],
  }],

  site: {
    look: [0, 1, 0],
    intro: [
      { who: 'TEN. BRUNO', t: 'Olá, {nome}! Sou o tenente Bruno, da Marinha do Brasil. {{Bem-vindo|Bem-vinda}} à Estação Antártica Comandante Ferraz!' },
    ],
    lesson: {
      id: 'm12c', subject: 'GEOGRAFIA · ANTÁRTIDA', title: 'O continente de gelo',
      slides: [
        `<p>A <b>Antártida</b> é um <b>continente</b> no Polo Sul, quase todo coberto de gelo. Em alguns lugares, o gelo tem mais de 4 km de espessura! Ela é maior que o Brasil.</p>
         <div class="calc">mais frio:    −89 °C (1983)
mais quente:  cerca de 18 °C (2020)</div><p>É o lugar mais frio, mais seco e com mais vento da Terra. No gelo dela está guardada mais da metade de toda a água doce do mundo.</p>`,
        `<p>A Antártida <b>não pertence a nenhum país</b>. Pelo <b>Tratado da Antártida</b>, de <b>1959</b>, ela é reservada para a <b>paz e a ciência</b>: lá não pode haver guerra nem base militar.</p>
         <p>O Brasil tem uma base de pesquisa lá desde <b>1984</b>: a <b>Estação Comandante Ferraz</b>, na ilha Rei George. Em 2012, um incêndio destruiu a estação antiga, e uma nova ficou pronta em <b>2020</b>.</p>`,
        `<p>No mar gelado em volta vivem <b>pinguins</b>, focas e baleias. Ursos-polares não: eles vivem no <b>Ártico</b>, perto do Polo Norte.</p>
         <div class="calc">Polo Norte: Ártico, mar congelado
            urso-polar
Polo Sul:   Antártida, continente
            pinguim</div><p>Como a Antártida fica no hemisfério sul, o verão de lá é de dezembro a fevereiro, igual ao do Brasil. É nessa época que mais cientistas vão para lá.</p>`,
      ],
      quiz: [
        { q: 'A Antártida é:', o: ['um país', 'um continente coberto de gelo', 'uma ilha do Brasil'], a: 1, hint: 'Lembre da tela 1: ela é maior que o Brasil e fica no Polo Sul.', why: 'A Antártida é um continente inteiro, quase todo coberto de gelo.' },
        { q: 'Qual destes animais vive na Antártida?', o: ['pinguim', 'urso-polar', 'onça'], a: 0, hint: 'Os ursos-polares vivem no outro polo, o Norte.', why: 'Pinguins vivem na Antártida. Ursos-polares vivem no Ártico, perto do Polo Norte.' },
        { q: 'De quem é a Antártida?', o: ['Do Brasil', 'Dos Estados Unidos', 'De nenhum país: um tratado a reserva para a paz e a ciência'], a: 2, hint: 'Lembre do acordo de 1959, o Tratado da Antártida.', why: 'Pelo Tratado da Antártida, de 1959, nenhum país pode tomar a Antártida para si. Lá vale a pesquisa e a paz, e o Brasil participa com a Estação Comandante Ferraz.' },
        { q: 'A Estação Comandante Ferraz foi inaugurada em 1984. Um incêndio destruiu a estação antiga em 2012. Quantos anos ela funcionou?', n: 28, calc: '2012 − 1984 = ?', hint: 'Tire o ano da inauguração do ano do incêndio: 2012 − 1984.', why: '2012 − 1984 = 28 anos. A estação nova ficou pronta em 2020.' },
        { q: 'O recorde de frio da Antártida é −89 °C, e o de calor, cerca de 18 °C. Quantos graus separam essas duas temperaturas?', n: 107, calc: '18 − (−89) = ?', hint: 'De −89 até 0 são 89 graus. De 0 até 18, mais 18. Some os dois pedaços.', why: '89 + 18 = 107 graus. É o mesmo que 18 − (−89) = 18 + 89 = 107.' },
      ],
    },
    outro: [
      { who: 'TEN. BRUNO', t: 'Missão liberada! Lá em Plutão faz −230 °C. Aqui é quase verão perto disso.' },
    ],
  },

  gameIntro: [
    { who: 'KDOK', t: 'Bip! Plutão vai passar pela janela uma vez só. Temos 12 fotos no filme.' },
    { who: 'KDOK', t: 'Mova a mira com ▲ ▼ ◀ ▶ e aperte A para fotografar os 4 alvos da lista. Mira bem no meio!' },
  ],

  debrief: [
    { who: 'KDOK', t: 'FOTOS FEITAS! O coração de gelo de Plutão ficou lindo.' },
    { who: 'KDOK', t: 'Plutão tem montanhas de gelo do tamanho das nossas serras e um céu azulado.' },
    { who: 'KDOK', t: 'E Caronte, a lua dele, tem pouco mais da metade do tamanho de Plutão. Eles dançam juntos pelo espaço.' },
    { who: 'KDOK', t: 'Bip... Plutão não é mais planeta. Mas pra mim ele sempre vai ser. Plutão, você é meu favorito.' },
  ],
  card: { id: 'plutao', name: 'PLUTÃO', lines: ['Planeta-anão desde 2006', 'Descoberto em 1930', 'Coração de gelo (visto em 2015)', 'Temperatura: −230 °C', 'Ano: 248 anos da Terra'] },
  reward: { id: 'vela-laser', name: 'VELA A LASER', desc: 'Uma vela finíssima empurrada por raios de laser da Terra. Com ela, dá para ir até outra estrela! A nave virou a VELA-LASER.' },
  radio: 'Aqui é a Astrokdok! Média, mediana e moda ajudam a entender um montão de números de uma vez, como os que as sondas mandam lá de longe. Você está indo muito bem. Segue firme! Câmbio!',
  real: 'Coloque água numa forminha de gelo no congelador. Olhe de hora em hora: quanto tempo leva para ficar sólida? Anote no caderno.',

  chat: {
    yuki: 'No Japão, Plutão é Meiōsei: "estrela do rei do mundo dos mortos". Credo! Prefiro o coração.',
    lia: 'Um pouquinho das cinzas do Clyde Tombaugh voou na New Horizons. Ele foi visitar Plutão, que ele mesmo descobriu!',
    tomas: 'Moda é o que mais aparece? Então a moda da minha marmita é arroz com feijão. Todo dia. Finalmente entendi estatística.',
    bia: 'Tenho uma teoria: Plutão é pequeno, mas é valente. Igual o Calhambeque era.',
    caio: 'Um ano em Plutão tem 248 anos da Terra. Ninguém faz aniversário lá. Que triste. Que sono.',
    rival: 'Fiz um adesivo da Astrokdok pra sua nave! Cola do lado da janela, que dá sorte em Plutão. Eu fiz dois: o outro é meu, pra gente ficar combinando.',
    kdok: 'Bip! Plutão não é mais planeta?! Vou fazer um abaixo-assinado. Assinaturas até agora: 1. A minha.',
    ze: 'Lembrei onde já tinha ouvido o sinal! Na TV velha lá de casa, quando saía do ar... Vou explicar direitinho no fim da jornada.',
  },
};
