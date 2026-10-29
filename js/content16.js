'use strict';
// MISSÃO 16: NUVENS DE MAGALHÃES · lançamento de Lisboa (Portugal)
A.MISSIONS[15] = {
  n: 16, name: 'MAGALHÃES', goal: 'sair da Via Láctea e chegar às Nuvens de Magalhães',
  place: 'PORTUGAL', where: 'Lisboa, Portugal', scene: 'lisboa', game: 'magellan', body: 'galaxy', room: 'biblio',

  brief: [
    { who: 'CMTE. DOZINHO', t: '{nome}, hoje você vai fazer algo que ninguém fez: SAIR da nossa galáxia.' },
    { who: 'CMTE. DOZINHO', t: 'Missão 16: as NUVENS DE MAGALHÃES, duas galáxias pequenas que giram em volta da Via Láctea.' },
    { who: 'CMTE. DOZINHO', t: 'Lá fora não tem placa nem estrada. Você vai navegar pelos ângulos das estrelas, como os navegadores antigos. Aula na BIBLIOTECA.' },
  ],
  ready: [
    { who: 'CMTE. DOZINHO', t: 'Aulas concluídas. O lançamento será em Lisboa, Portugal, de onde partiram as caravelas das Grandes Navegações.' },
  ],
  teacher: [
    'Bem-vindos à biblioteca! Hoje é MATEMÁTICA: FUNÇÃO AFIM. Uma regra que liga dois números, como os quilômetros e o preço do mototáxi. Vamos lá.',
    'Agora, ASTRONOMIA, {nome}: as NUVENS DE MAGALHÃES, duas galáxias vizinhas da nossa. E a gente tem sorte: elas aparecem melhor justamente no céu do Sul!',
  ],
  after: 'Muito bem, {nome}! O Comandante está esperando.',

  lessons: [{
    id: 'm16a', subject: 'MATEMÁTICA', title: 'Função afim',
    slides: [
      `<p>Uma <b>função</b> é como uma máquina: entra um número, sai outro, sempre pela mesma regra. O mototáxi do Capão cobra R$ 4 só para sair, mais R$ 2 por km rodado. Entra a distância, sai o preço:</p>
       <div class="calc">km (x)       1   2   3   5
preço (y)    6   8  10  14

y = 2·x + 4</div><p>Essa regra escrita com letras é a <b>lei</b> da função: x é o número que entra, y é o que sai. Quando a lei tem a forma "número vezes x, mais número", ela se chama <b>função afim</b>.</p>`,
      `<p>Na forma geral, <b>y = a·x + b</b>, cada letra tem um papel. O <b>a</b> multiplica o x: é quanto y muda quando x aumenta 1. O <b>b</b> fica sozinho: é o y quando x = 0, o ponto de partida.</p>
       <div class="calc">y = 2·x + 4
a = 2 → cada km, R$ 2 a mais
b = 4 → o preço de saída

7 km: y = 2 × 7 + 4 = 18</div><p>Para usar a lei, troque o x pelo número e faça a conta: primeiro vezes, depois mais. Uma corrida de 7 km custa R$ 18.</p>`,
      `<p>Num <b>gráfico</b> (x para o lado, y para cima), os pontos da função afim formam sempre uma <b>linha reta</b>. O b diz onde a reta começa (em x = 0); o a diz se ela sobe ou desce.</p>
       <div class="calc">y = 2·x + 4    a = 2  → sobe
y = −5·x + 50  a = −5 → desce
y = 3          a = 0  → deitada</div><p>A do meio é o tanque da nave: 50 litros, gastando 5 por hora. Erro comum: em y = 2·x + 4 com x = 3, fazer 2 × 7. Primeiro vezes, depois mais: 2 × 3 + 4 = 10.</p>`,
    ],
    quiz: [
      { q: 'O mototáxi do Capão cobra y = 2·x + 4, com x em km e y em reais. Quanto custa uma corrida de 5 km, em reais?', n: 14, calc: 'y = 2 × 5 + 4', hint: 'Troque o x por 5: primeiro 2 × 5, depois some 4.', why: '2 × 5 = 10, e 10 + 4 = 14. A corrida custa R$ 14.' },
      { q: 'Na lei y = 3·x + 7, quem é o a e quem é o b?', o: ['a = 3 e b = 7', 'a = 7 e b = 3', 'a = 3 e b = 10'], a: 0, hint: 'O a é o número que multiplica o x. O b é o número que fica sozinho.', why: 'a = 3, porque multiplica o x. b = 7, o número sozinho: o valor de y quando x = 0.' },
      { q: 'O tanque da nave segue y = −5·x + 50: x é o tempo em horas e y são os litros que sobram. Quantos litros sobram depois de 4 horas?', n: 30, calc: 'y = −5 × 4 + 50', hint: 'Em 4 horas a nave gasta 4 × 5 = 20 litros. Tire isso dos 50.', why: '−5 × 4 = −20, e −20 + 50 = 30 litros.' },
      { q: 'Em qual destas funções a reta do gráfico DESCE?', o: ['y = 4·x + 1', 'y = −2·x + 9', 'y = 6'], a: 1, hint: 'Olhe o sinal do a, o número que multiplica o x. A reta desce quando o a é negativo.', why: 'Em y = −2·x + 9, a = −2: a cada 1 que x cresce, y perde 2. A reta desce. Em y = 6, a = 0: a reta fica deitada.' },
      { q: 'O mototáxi cobra y = 2·x + 4. {nome} pagou R$ 20 por uma corrida. Quantos km a corrida teve?', n: 8, calc: '2·x + 4 = 20', hint: 'Primeiro tire os R$ 4 de saída: 20 − 4 = 16. Esses R$ 16 são de km a R$ 2 cada um.', why: '20 − 4 = 16, e 16 ÷ 2 = 8 km. Confira: 2 × 8 + 4 = 20.' },
      { q: 'Dois mototáxis: o da Dona Nina cobra y = 2·x + 4 e o do Seu Tião cobra y = 3·x + 1 (x em km). Para uma corrida de 2 km, qual sai mais barato?', o: ['O da Dona Nina', 'Custam o mesmo', 'O do Seu Tião'], a: 2, hint: 'Calcule as duas com x = 2: 2 × 2 + 4 e 3 × 2 + 1. Depois compare.', why: 'Dona Nina: 2 × 2 + 4 = 8. Seu Tião: 3 × 2 + 1 = 7. R$ 7 é mais barato: o do Seu Tião.' },
    ],
  }, {
    id: 'm16b', subject: 'ASTRONOMIA', title: 'As galáxias vizinhas',
    slides: [
      `<p>Uma <b>galáxia</b> é uma cidade gigante de estrelas, gás e poeira. A nossa é a <b>Via Láctea</b>, com centenas de bilhões de estrelas. Bem pertinho dela, do lado de fora, giram duas galáxias pequenas: as <b>Nuvens de Magalhães</b>. Por serem pequenas, elas se chamam <b>galáxias-anãs</b>.</p>
       <p>Elas ficam perto do polo sul do céu. Por isso aparecem melhor no <b>hemisfério Sul</b>, onde fica o Brasil. Numa noite escura e sem Lua, dá para ver as duas a olho nu, como pedacinhos soltos da Via Láctea.</p>`,
      `<p>Elas parecem nuvens porque são bilhões de estrelas tão longe que a luz delas se mistura numa mancha. A distância se mede em <b>anos-luz</b>: o caminho que a luz faz em 1 ano, uns 9,5 trilhões de km.</p>
       <div class="calc">Via Láctea: uns 100 mil anos-luz de largura
GRANDE NUVEM  → 160 mil anos-luz daqui
PEQUENA NUVEM → 200 mil anos-luz daqui</div><p>Em <b>1987</b>, uma estrela explodiu na Grande Nuvem: uma <b>supernova</b>. Deu para ver sem telescópio! A luz da explosão viajou uns 160 mil anos até chegar aqui: a estrela explodiu muito antes de 1987, e a gente só viu quando a luz chegou.</p>`,
      `<p>Os povos do hemisfério Sul conhecem essas duas manchas de luz há milhares de anos, e cada povo tem a sua história para elas. Os navegantes portugueses chamavam as duas de "Nuvens do Cabo".</p>
       <p>O nome "Magalhães" veio da expedição de <b>Fernão de Magalhães</b> (1519 a 1522), a primeira a <b>dar a volta ao mundo</b>. Um dos viajantes, Antonio Pigafetta, anotou as duas nuvens no seu diário, e o nome ficou.</p>`,
    ],
    quiz: [
      { q: 'O que são as Nuvens de Magalhães?', o: ['Nuvens de chuva muito altas', 'Duas galáxias pequenas, vizinhas da Via Láctea', 'Dois cometas'], a: 1, hint: 'Elas são feitas de bilhões de estrelas e ficam fora da Via Láctea.', why: 'São duas galáxias-anãs, cheias de estrelas, que giram em volta da Via Láctea.' },
      { q: 'Em que parte da Terra as Nuvens de Magalhães aparecem melhor no céu?', o: ['No hemisfério Norte', 'No hemisfério Sul', 'Só no Polo Norte'], a: 1, hint: 'Elas ficam perto do polo sul do céu. E o Brasil fica em qual hemisfério?', why: 'Elas ficam perto do polo sul do céu, então aparecem melhor no hemisfério Sul. O Brasil tem sorte!' },
      { q: 'A Grande Nuvem fica a 160 mil anos-luz e a Pequena, a 200 mil. Quantos anos-luz a Pequena fica mais longe que a Grande?', n: 40000, calc: '200.000 − 160.000 = ?', hint: 'Faça 200 − 160 = 40 e depois ponha os três zeros do "mil".', why: '200.000 − 160.000 = 40.000 anos-luz.' },
      { q: 'Por que as Nuvens de Magalhães parecem manchas de nuvem, e não pontinhos de estrela?', o: ['Porque são bilhões de estrelas tão longe que a luz delas se mistura', 'Porque são feitas de vapor d\'água', 'Porque estão dentro da atmosfera da Terra'], a: 0, hint: 'Pense na Via Láctea: de longe, as estrelas dela também viram uma faixa de luz.', why: 'Cada Nuvem tem bilhões de estrelas. Elas estão tão longe que o olho não separa uma da outra: vê só uma mancha clara.' },
      { q: 'A supernova da Grande Nuvem foi vista em 1987. A luz dela viajou uns 160 mil anos até a Terra. Quando a estrela explodiu de verdade?', o: ['Em 1987, no mesmo dia em que foi vista', 'Uns 1.987 anos atrás', 'Uns 160 mil anos antes de 1987'], a: 2, hint: 'A luz demora para viajar. A gente só vê a explosão quando a luz dela chega aqui.', why: 'A luz levou uns 160 mil anos no caminho. Então a estrela explodiu uns 160 mil anos antes de 1987: olhar para o céu é olhar para o passado.' },
    ],
  }],

  site: {
    look: [1, 0, 1],
    intro: [
      { who: 'CAPITÃ INÊS', t: 'Olá, {nome}! Sou a capitã Inês, historiadora do mar. {{Bem-vindo|Bem-vinda}} a Lisboa, a cidade das caravelas!' },
    ],
    lesson: {
      id: 'm16c', subject: 'HISTÓRIA · PORTUGAL', title: 'As Grandes Navegações',
      slides: [
        `<p><b>Portugal</b> fica na Europa, na ponta oeste, de frente para o oceano Atlântico. A capital é <b>Lisboa</b>, na beira do rio Tejo.</p>
         <p>O português é língua oficial em <b>9 países</b>, em 4 continentes: Brasil, Portugal, Angola, Moçambique, Cabo Verde, Guiné-Bissau, São Tomé e Príncipe, Timor-Leste e Guiné Equatorial.</p>`,
        `<p>Há uns 500 anos, os portugueses cruzaram os oceanos em <b>caravelas</b>, barcos leves com velas grandes: foram as <b>Grandes Navegações</b>.</p>
         <p>A frota de <b>Pedro Álvares Cabral</b> saiu de Lisboa em 9 de março de <b>1500</b> e chegou ao litoral da Bahia em 22 de abril. Mas a terra não estava vazia: muitos <b>povos indígenas</b>, como os Tupiniquim, já viviam aqui havia milhares de anos.</p>`,
        `<p>Em alto-mar não há placas. Os navegadores usavam o <b>astrolábio</b>: um instrumento para medir o <b>ângulo</b> do Sol e das estrelas acima do horizonte. Com esse ângulo, eles sabiam o quanto estavam ao norte ou ao sul.</p>
         <p>Foi assim que <b>Fernão de Magalhães</b>, um navegador português, saiu da Espanha em 1519 para dar a volta ao mundo. Ele morreu no caminho, mas um dos seus navios voltou em 1522.</p>`,
      ],
      quiz: [
        { q: 'Qual é a capital de Portugal?', o: ['Porto', 'Madri', 'Lisboa', 'Belém'], a: 2, hint: 'É a cidade na beira do rio Tejo, onde a capitã Inês está agora.', why: 'Lisboa é a capital de Portugal. Madri é a capital da Espanha.' },
        { q: 'Como se chamavam os barcos leves das Grandes Navegações?', o: ['Caravelas', 'Canoas', 'Submarinos', 'Balsas'], a: 0, hint: 'O nome está no slide: barcos leves com velas grandes.', why: 'Caravelas: barcos leves e rápidos, com velas grandes, que aguentavam o mar aberto.' },
        { q: 'Para que servia o astrolábio?', o: ['Para pescar em alto-mar', 'Para medir o ângulo do Sol e das estrelas e saber onde o navio estava', 'Para medir a velocidade do vento'], a: 1, hint: 'Em alto-mar não há placas. Os navegadores olhavam para o céu.', why: 'O astrolábio mede o ângulo do Sol ou de uma estrela acima do horizonte. Com ele, dava para saber o quanto o navio estava ao norte ou ao sul.' },
        { q: 'Quando a frota de Cabral chegou em 1500, quem já vivia na terra que hoje é o Brasil?', o: ['Ninguém: a terra estava vazia', 'Só animais', 'Muitos povos indígenas, havia milhares de anos'], a: 2, hint: 'Os portugueses chegaram, mas não foram os primeiros a morar aqui.', why: 'Milhões de indígenas, de muitos povos diferentes, já viviam aqui havia milhares de anos. Por isso muitos historiadores preferem dizer "chegada" e não "descobrimento".' },
        { q: 'A frota de Cabral saiu de Lisboa em 9 de março de 1500 e chegou à Bahia em 22 de abril. Quantos dias durou a viagem? (Março tem 31 dias.)', n: 44, calc: '(31 − 9) + 22 = ?', hint: 'Primeiro conte os dias que faltavam em março depois do dia 9: 31 − 9. Depois some os 22 dias de abril.', why: 'De 9 a 31 de março são 31 − 9 = 22 dias. Mais 22 dias de abril: 22 + 22 = 44 dias de viagem.' },
      ],
    },
    outro: [
      { who: 'CAPITÃ INÊS', t: 'Boa viagem! Os navegadores iam até o fim do mar. Você vai até o fim da galáxia.' },
    ],
  },

  gameIntro: [
    { who: 'KDOK', t: 'Bip! Para navegar fora da galáxia, medimos o ângulo das estrelas-guia, como no astrolábio.' },
    { who: 'KDOK', t: 'Gire o ponteiro com ◀ ▶ até ficar em cima da estrela e aperte A. Acerte 3 medições. A nave balança, então capricha!' },
  ],

  debrief: [
    { who: 'KDOK', t: 'SAÍMOS DA VIA LÁCTEA! Olhe para trás: a nossa galáxia inteira, um redemoinho de centenas de bilhões de estrelas.' },
    { who: 'KDOK', t: 'E ali estão as Nuvens de Magalhães, galáxias pequenas girando em volta da nossa.' },
    { who: 'KDOK', t: 'Em algum lugar desse redemoinho está o Sol, a Terra e o Capão. Daqui, não dá nem pra ver.' },
    { who: 'KDOK', t: 'Bip! Longe de tudo, o sinal continua igual. Ele está no universo inteiro.' },
  ],
  card: { id: 'magalhaes', name: 'NUVENS DE MAGALHÃES', lines: ['Duas galáxias-anãs vizinhas', 'Grande Nuvem: 160 mil anos-luz', 'Pequena Nuvem: 200 mil anos-luz', 'Aparecem melhor no céu do Sul', 'Supernova vista em 1987'] },
  reward: { id: 'dobra', name: 'MOTOR DE DOBRA', desc: 'Dobra o espaço para ir a outras galáxias. É ficção: ninguém inventou isso... ainda! A nave virou a DOBRA-1.' },
  radio: 'Aqui é a Astrokdok! Você saiu da nossa galáxia! E a função afim está em tudo que muda sempre do mesmo jeito: a corrida do mototáxi, o tanque da nave. A equipe inteira está orgulhosa de você. Câmbio!',
  real: 'Numa noite escura e sem Lua, entre novembro e março, olhe para o lado sul do céu, longe das luzes. Procure duas manchinhas claras, como pedaços soltos da Via Láctea: são as Nuvens de Magalhães, outras galáxias!',

  chat: {
    yuki: 'Em Portugal eles dizem "pequeno-almoço" para o café da manhã. O português tem jeitos diferentes no mundo todo!',
    lia: 'Os Guarani chamam a Via Láctea de Caminho da Anta. Acho mais bonito que "láctea".',
    tomas: 'Descobri a minha função: fome = 3·x + 10. O x é o número de aulas. E o 10 é a fome que eu já trago de casa.',
    bia: 'Motor de dobra é ficção, eu sei. Mas muita invenção começou assim: primeiro na imaginação.',
    caio: 'A biblioteca é o lugar mais silencioso da escola. Perfeito pra... estudar. Claro. Estudar.',
    rival: '{nome}, ainda tô tremendo do buraco negro, mas valeu demais ir junto com você! Hoje eu fico na torre torcendo. Se achar um alienígena lá fora, manda um oi meu.',
    kdok: 'Bip! Magalhães deu a volta ao mundo. Eu dei a volta no hangar e me perdi.',
    ze: 'Estamos quase lá. Depois das Nuvens vem Andrômeda. E depois... a borda de tudo.',
  },
};
