'use strict';
// MISSÃO 10: URANO · lançamento de Greenwich, Londres (Reino Unido)
A.MISSIONS[9] = {
  n: 10, name: 'URANO', goal: 'atravessar o labirinto de gelo de Urano',
  place: 'LONDRES', where: 'Greenwich, Londres, Reino Unido', scene: 'londres', game: 'uranus', body: 'uranus', room: 'school',

  brief: [
    { who: 'CMTE. DOZINHO', t: '{{Capitão|Capitã}}. O sinal está esquentando a cabeça do Zé e da Dra. Paz. Eles dizem que ele é "frio". Eu não entendi. Ainda.' },
    { who: 'CMTE. DOZINHO', t: 'Missão 10: URANO, o gigante de gelo que gira deitado. Lá, o gelo desliza. Você vai precisar pensar antes de andar.' },
    { who: 'CMTE. DOZINHO', t: 'Escola primeiro.' },
  ],
  ready: [
    { who: 'CMTE. DOZINHO', t: 'Aulas concluídas. O lançamento será em Greenwich, em Londres: o lugar onde começa a contagem das horas do mundo.' },
  ],
  teacher: [
    'Bom dia, turma! Hoje é MATEMÁTICA: potências e raízes. Um jeito curto de escrever multiplicações repetidas, e o caminho de volta.',
    'Agora, a aula de ASTRONOMIA da missão: URANO, o gigante de gelo que gira deitado! Preste atenção, {nome}.',
  ],
  after: 'Muito bem, {nome}! O Comandante está esperando.',

  lessons: [{
    id: 'm10a', subject: 'MATEMÁTICA', title: 'Potências e raízes',
    slides: [
      `<p>Somar o mesmo número várias vezes vira multiplicação: 3 + 3 + 3 + 3 = 4 × 3. Multiplicar o mesmo número várias vezes também tem um jeito curto: a <b>potência</b>.</p>
       <div class="calc">2 × 2 × 2 = 2³ = 8

2 → base (o número repetido)
3 → expoente (quantas vezes)
8 → potência (o resultado)</div><p>Lê-se "2 elevado a 3". Um bloco de gelo se parte em 2, cada pedaço se parte em 2, e de novo: 2³ = 8 pedaços.</p>`,
      `<p>O expoente 2 tem nome: <b>ao quadrado</b>. 5² = 5 × 5 = 25. Resultados assim (1, 4, 9, 16, 25, 36...) são os <b>quadrados perfeitos</b>.</p>
       <p>A <b>raiz quadrada</b> (símbolo √) faz o caminho de volta. √25 pergunta: qual número vezes ele mesmo dá 25? É o 5.</p>
       <div class="calc">5 × 5 = 25  →  √25 = 5
7 × 7 = 49  →  √49 = 7
9 × 9 = 81  →  √81 = 9</div><p><b>Erro comum:</b> 5² não é 5 × 2 = 10. O expoente diz quantas vezes a base se repete.</p>`,
      `<p>Com a base 10 tem um truque: o <b>expoente conta os zeros</b>. 10³ = 10 × 10 × 10 = 1.000, e 1.000 tem 3 zeros.</p>
       <div class="calc">10¹ = 10
10² = 100
10³ = 1.000
10⁴ = 10.000
10⁶ = 1.000.000
10⁹ = 1.000.000.000</div><p>10⁶ é um milhão e 10⁹ é um bilhão. Então 3 × 10⁴ é 3 seguido de 4 zeros: 30.000. É assim que os cientistas escrevem as distâncias gigantes do espaço.</p>`,
    ],
    quiz: [
      { q: 'Um bloco de gelo se parte em 2 pedaços. Cada pedaço se parte em 2 de novo, e isso acontece 4 vezes seguidas. Quantos pedaços ficam no fim? Calcule 2⁴.', n: 16, calc: '2 × 2 × 2 × 2 = ?', hint: 'Vá dobrando: 2, depois 4, depois 8... até multiplicar por 2 quatro vezes.', why: '2⁴ = 2 × 2 × 2 × 2 = 16 pedaços.' },
      { q: 'Quanto é 5²?', o: ['10', '25', '7', '52'], a: 1, hint: 'Ao quadrado quer dizer o número vezes ele mesmo. Não é 5 × 2.', why: '5² = 5 × 5 = 25. O expoente 2 manda repetir o 5 duas vezes.' },
      { q: 'A sala de amostras da nave é um quadrado com 64 m² de área. Quanto mede cada lado, em metros? (É a raiz quadrada de 64.)', n: 8, calc: '√64 = ?', hint: 'Qual número vezes ele mesmo dá 64? Teste 7 × 7 e 8 × 8.', why: '8 × 8 = 64, então √64 = 8. Cada lado mede 8 m.' },
      { q: 'Para sair da Terra, a nave gasta 3 × 10⁴ litros de combustível. Quantos litros é isso?', n: 30000, calc: '3 × 10⁴ = ?', hint: '10⁴ é 1 seguido de 4 zeros: 10.000. Agora multiplique por 3.', why: '10⁴ = 10.000, e 3 × 10.000 = 30.000 litros.' },
      { q: '{rival} ficou na dúvida e perguntou se 2³ e 3² dão o mesmo resultado. Qual é a resposta certa?', o: ['Sim: 2³ = 6 e 3² = 6', 'Não: 2³ = 9 e 3² = 8', 'Não: 2³ = 8 e 3² = 9'], a: 2, hint: '2³ = 2 × 2 × 2. 3² = 3 × 3. Faça as duas contas antes de responder.', why: '2³ = 8 e 3² = 9. Trocar a base pelo expoente muda o resultado. Quem achou 6 e 6 multiplicou a base pelo expoente, que é o erro comum.' },
      { q: 'Um milhão é 10⁶ e um bilhão é 10⁹. Um bilhão é quantas vezes um milhão?', n: 1000, calc: '1 bilhão ÷ 1 milhão = ?', hint: 'Um bilhão tem 9 zeros e um milhão tem 6. Corte 6 zeros dos dois: quantos zeros sobram no bilhão?', why: '9 − 6 = 3 zeros sobram: 10³ = 1.000. Um bilhão são mil milhões.' },
    ],
  }, {
    id: 'm10b', subject: 'ASTRONOMIA', title: 'O gigante deitado',
    slides: [
      `<p><b>Urano</b> é o sétimo planeta a partir do Sol. Os planetas até Saturno são conhecidos desde a Antiguidade, porque dá para vê-los a olho nu. Urano foi o <b>primeiro planeta descoberto com um telescópio</b>, por <b>William Herschel</b>, em <b>1781</b>, na Inglaterra.</p>
       <p>No começo, Herschel achou que tinha visto um cometa! Só depois os astrônomos perceberam que era um planeta novo. O Sistema Solar ficou maior de uma hora para outra.</p>`,
      `<p>Urano <b>gira deitado</b>, de lado, como uma bola rolando pelo caminho em volta do Sol. Os cientistas acham que, há muito tempo, algo enorme bateu nele e o derrubou.</p>
       <div class="calc">uma volta no Sol: 84 anos
84 ÷ 2 = 42

no polo: 42 anos de dia
         42 anos de noite</div><p>Por estar deitado, cada <b>polo</b> passa metade do ano de Urano virado para o Sol e a outra metade virado para o escuro. Longe dos polos, o dia e a noite se revezam bem mais rápido.</p>`,
      `<p>Urano é um <b>gigante de gelo</b>, quatro vezes mais largo que a Terra. A cor azul-esverdeada vem do gás <b>metano</b>: ele absorve a luz vermelha do Sol e devolve o azul. A atmosfera chega a <b>−224 °C</b>, a mais fria entre os planetas.</p>
       <p>Só uma nave visitou Urano: a <b>Voyager 2</b>, em <b>1986</b>. Ele tem anéis finos e escuros, e as luas têm nomes de personagens de histórias inglesas, a maioria das peças de teatro de Shakespeare: Miranda, Titânia, Oberon...</p>`,
    ],
    quiz: [
      { q: 'Urano tem um jeito muito estranho de girar. Qual é?', o: ['Ele nunca gira', 'Ele é quadrado e rola aos pulos', 'Ele gira deitado, de lado'], a: 2, hint: 'Lembre da tela 2: Urano parece uma bola rolando pelo caminho em volta do Sol.', why: 'Urano gira deitado, com o eixo quase na horizontal. Os cientistas acham que uma batida enorme, há muito tempo, o derrubou de lado.' },
      { q: 'Urano foi o primeiro planeta descoberto com telescópio, em 1781. Quem o descobriu?', o: ['Galileu Galilei', 'William Herschel', 'Isaac Newton'], a: 1, hint: 'Foi um astrônomo que morava na Inglaterra e construía os próprios telescópios.', why: 'William Herschel achou Urano em 1781 e, no começo, pensou que fosse um cometa. Galileu viveu bem antes, e Newton ficou famoso estudando a gravidade.' },
      { q: 'Urano leva 84 anos para dar uma volta no Sol. Em cada polo, metade desse tempo é de dia sem parar e a outra metade é de noite sem parar. Quantos anos dura a noite no polo?', n: 42, calc: '84 ÷ 2 = ?', hint: 'O ano de Urano tem 84 anos da Terra. A noite do polo é a metade disso.', why: '84 ÷ 2 = 42. No polo de Urano, são cerca de 42 anos de dia seguidos e 42 anos de noite seguidos.' },
      { q: 'Por que Urano tem cor azul-esverdeada?', o: ['Por causa do gás metano da atmosfera', 'Por causa de oceanos de água', 'Por causa de florestas geladas'], a: 0, hint: 'Volte à tela 3: um gás no ar de Urano segura a luz vermelha e deixa voltar o azul.', why: 'O metano absorve a luz vermelha do Sol. O que volta para os nossos olhos é o azul-esverdeado. Urano não tem oceanos nem florestas.' },
      { q: 'Urano foi descoberto em 1781, e a Voyager 2 passou por ele em 1986. Nesse tempo, quantas voltas COMPLETAS Urano deu em volta do Sol? Cada volta leva 84 anos.', n: 2, calc: '1986 − 1781 = ?\nquantos 84 cabem?', hint: 'Primeiro ache quantos anos passaram: 1986 − 1781. Depois teste 84 × 2 e 84 × 3.', why: '1986 − 1781 = 205 anos. 84 × 2 = 168 cabe em 205, mas 84 × 3 = 252 passa. Foram 2 voltas completas.' },
    ],
  }],

  site: {
    look: [2, 1, 0],
    intro: [
      { who: 'PROF. OLIVER', t: 'Hello, {nome}! Sou o professor Oliver. {{Bem-vindo|Bem-vinda}} a Greenwich, em Londres!' },
    ],
    lesson: {
      id: 'm10c', subject: 'GEOGRAFIA · REINO UNIDO', title: 'Onde começam as horas',
      slides: [
        `<p>O <b>Reino Unido</b> fica na Europa e junta quatro países: <b>Inglaterra</b>, <b>Escócia</b>, <b>País de Gales</b> e <b>Irlanda do Norte</b>. A capital é <b>Londres</b>, cortada pelo rio <b>Tâmisa</b>.</p>
         <p><b>Big Ben</b> é o apelido do grande sino da torre do relógio de Londres. E foi na Inglaterra que William Herschel descobriu Urano, em 1781.</p>`,
        `<p>Para achar qualquer lugar no mapa, a Terra ganhou linhas imaginárias. Os <b>meridianos</b> vão de um polo ao outro. O mais famoso passa aqui, no Observatório Real de Greenwich: é o <b>Meridiano de Greenwich</b>, a <b>longitude 0°</b>.</p>
         <div class="calc">  OESTE  |  LESTE
  Brasil |  Japão
         0°
     Greenwich</div><p>Desde 1884, um acordo entre vários países usa essa linha como ponto de partida. O que fica à esquerda dela no mapa está a <b>oeste</b>; o que fica à direita, a <b>leste</b>.</p>`,
        `<p>A Terra gira 360 graus em 24 horas. Por isso o mundo tem <b>24 fusos horários</b>, e cada um tem 15 graus de largura (360 ÷ 24 = 15). Greenwich marca a hora de referência do mundo.</p>
         <div class="calc">Londres (inverno de lá): 12 h
Brasília:                 9 h
3 horas a menos</div><p>Brasília fica a oeste, então o relógio daqui está <b>atrasado</b>. Cuidado: no verão de Londres, os relógios de lá são adiantados 1 hora, e a diferença vira <b>4 horas</b>.</p>`,
      ],
      quiz: [
        { q: 'Qual é a capital do Reino Unido?', o: ['Paris', 'Londres', 'Dublin'], a: 1, hint: 'É a cidade cortada pelo rio Tâmisa, onde fica Greenwich.', why: 'Londres é a capital do Reino Unido. Paris é a capital da França, e Dublin, da Irlanda.' },
        { q: 'O Meridiano de Greenwich marca a longitude:', o: ['90°', '180°', '0°'], a: 2, hint: 'Greenwich é o ponto de partida das longitudes. Por qual número começa uma contagem?', why: 'O Meridiano de Greenwich é a longitude 0°. A partir dele se contam os graus para leste e para oeste.' },
        { q: 'É meio-dia (12 h) em Londres, no inverno de lá. Brasília está 3 horas atrás. Que horas são em Brasília?', n: 9, calc: '12 − 3 = ?', hint: 'Brasília fica a oeste, então o relógio daqui está atrasado: tire 3 de 12.', why: '12 − 3 = 9. São 9 h da manhã em Brasília.' },
        { q: 'A Terra gira 360 graus em 24 horas. Quantos graus ela gira em 1 hora? Essa é a largura de cada fuso horário.', n: 15, calc: '360 ÷ 24 = ?', hint: '24 × 10 = 240 e 24 × 5 = 120. Juntando, 240 + 120 = 360. Quanto é 10 + 5?', why: '360 ÷ 24 = 15. Cada fuso horário tem 15 graus de largura.' },
        { q: 'No verão de Londres, os relógios de lá são adiantados 1 hora, e a diferença para Brasília passa a ser de 4 horas. Em julho, um jogo de futebol começa às 20 h em Londres. Que horas são em Brasília?', n: 16, calc: '20 − 4 = ?', hint: 'Julho é verão em Londres: use a diferença de 4 horas, não de 3. Brasília continua atrás.', why: 'No verão de lá, a diferença é de 4 horas. 20 − 4 = 16. O jogo começa às 16 h em Brasília.' },
      ],
    },
    outro: [
      { who: 'PROF. OLIVER', t: 'Good luck! E acerte o relógio: nos polos de Urano, a noite dura 42 anos.' },
    ],
  },

  gameIntro: [
    { who: 'KDOK', t: 'Bip! O chão de Urano é gelo puro. Quando você anda, DESLIZA até bater em uma pedra.' },
    { who: 'KDOK', t: 'Chegue na saída amarela. Pense antes de andar! Se ficar preso, aperte B para recomeçar a sala.' },
  ],

  debrief: [
    { who: 'KDOK', t: 'LABIRINTO VENCIDO! Chegamos a Urano, o gigante de gelo que gira deitado.' },
    { who: 'KDOK', t: 'Os cientistas acham que, há muito tempo, algo enorme bateu nele e o derrubou de lado.' },
    { who: 'KDOK', t: 'Suas luas têm nomes de personagens de teatro. Eu queria uma lua chamada Kdok.' },
    { who: 'KDOK', t: 'Bip! O Zé mandou: "o sinal tem a mesma força aqui e na Terra". Não estamos chegando mais perto dele.' },
  ],
  card: { id: 'urano', name: 'URANO', lines: ['Sétimo planeta, gigante de gelo', 'Gira deitado, de lado', 'Ano: 84 anos da Terra', 'Descoberto em 1781 por Herschel', 'Temperatura: até −224 °C'] },
  reward: { id: 'ionico', name: 'MOTOR IÔNICO', desc: 'Um motor que empurra devagarinho, mas nunca cansa. A nave virou a NAVE IÔNICA!' },
  radio: 'Aqui é a Astrokdok! Tem dia que estudar cansa, a gente sabe. Mas olha onde você chegou: Urano! Potência é a matemática das coisas enormes, e o espaço é enorme. Descansa e volta com tudo. Câmbio!',
  real: 'Descubra: que horas são agora no Japão, onde mora a família da Yuki? Dica: o Japão está 12 horas à frente de Brasília.',

  chat: {
    yuki: 'No Japão, Urano se chama Tennōsei: "estrela do rei do céu".',
    lia: 'Urano foi o primeiro planeta descoberto com telescópio. Os planetas até Saturno, o povo antigo já via a olho nu!',
    tomas: 'Potência é multiplicar o mesmo número várias vezes? Então 2 ao cubo dá 8 marmitas. Eu entendi a aula toda.',
    bia: 'Motor iônico: gasta pouquinho e aguenta anos ligado. Perfeito para ir longe.',
    caio: 'No polo de Urano a noite dura 42 anos. Finalmente um lugar que me entende.',
    rival: 'Urano gira deitado, igual eu no domingo! {nome}, vai com calma nesse gelo. Eu fico aqui torcendo. Se escorregar, levanta e tenta de novo!',
    kdok: 'Bip! Deslizar no gelo: meu esporte favorito. Eu só não sei frear.',
    ze: 'O sinal não fica mais forte quando a gente chega perto de nada. Isso quer dizer que ele está... em todo lugar.',
  },
};
