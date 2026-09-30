'use strict';
// MISSÃO 16 — NUVENS DE MAGALHÃES · lançamento de Lisboa (Portugal)
A.MISSIONS[15] = {
  n: 16, name: 'MAGALHÃES', goal: 'sair da Via Láctea e chegar às Nuvens de Magalhães',
  place: 'PORTUGAL', where: 'Lisboa, Portugal', scene: 'lisboa', game: 'magellan', body: 'galaxy', room: 'biblio',

  brief: [
    { who: 'CMTE. JULIUS', t: 'Explorador {nome}. Hoje você vai fazer algo que ninguém fez: SAIR da nossa galáxia.' },
    { who: 'CMTE. JULIUS', t: 'Missão 16: as NUVENS DE MAGALHÃES, duas galáxias pequenas que giram em volta da Via Láctea.' },
    { who: 'CMTE. JULIUS', t: 'Lá fora não tem placa nem estrada. Você vai navegar pelos ângulos das estrelas, como os navegadores antigos. Aula na BIBLIOTECA.' },
  ],
  ready: [
    { who: 'CMTE. JULIUS', t: 'Aulas concluídas. O lançamento será em Lisboa, Portugal, de onde partiram as caravelas das Grandes Navegações.' },
  ],
  teacher: [
    'Bem-vindos à biblioteca! Hoje é MATEMÁTICA: PORCENTAGEM. 100% de atenção, por favor.',
    'Agora, a aula da missão do {nome}: as NUVENS DE MAGALHÃES, galáxias vizinhas!',
  ],
  after: 'Muito bem, {nome}! O Comandante está esperando.',

  lessons: [{
    id: 'm16a', subject: 'MATEMÁTICA', title: 'Porcentagem',
    slides: [
      `<p><b>Porcentagem</b> quer dizer "de cada 100". O símbolo é <b>%</b>.</p>
       <div class="calc">100% = tudo
 50% = metade
 25% = um quarto
 10% = um décimo</div>`,
      `<p>Truques para calcular:</p>
       <div class="calc">50% de 80 → metade → 40
25% de 80 → 80 ÷ 4  → 20
10% de 80 → 80 ÷ 10 → 8</div>`,
      `<p>As partes sempre somam 100%:</p>
       <div class="calc">Gastou 75% do combustível
Sobrou 100% − 75% = 25%</div>`,
    ],
    quiz: [
      { q: 'Quanto é 50% de 80?', n: 40, hint: '50% é a metade.', why: 'A metade de 80 é 40.' },
      { q: 'Quanto é 25% de 80?', n: 20, hint: '25% é um quarto: divida por 4.', why: '80 ÷ 4 = 20.' },
      { q: 'Quanto é 10% de 350?', n: 35, hint: '10%: divida por 10.', why: '350 ÷ 10 = 35.' },
      { q: 'Qual é o mesmo que 50%?', o: ['metade', 'um quarto', 'o dobro', 'um décimo'], a: 0, why: '50% = metade.' },
      { q: 'A nave gastou 75% do combustível. Quanto sobrou?', o: ['25%', '75%', '50%', '100%'], a: 0, why: '100% − 75% = 25%.' },
    ],
  }, {
    id: 'm16b', subject: 'CIÊNCIAS + MATEMÁTICA', title: 'As galáxias vizinhas',
    slides: [
      `<p>As <b>Nuvens de Magalhães</b> são duas <b>galáxias-anãs</b> que giram em volta da Via Láctea. Do hemisfério Sul, dá para ver as duas a olho nu, como pedacinhos soltos da Via Láctea.</p>`,
      `<div class="calc">GRANDE NUVEM  → 160 mil anos-luz
PEQUENA NUVEM → 200 mil anos-luz</div><p>Em <b>1987</b>, uma estrela explodiu na Grande Nuvem: uma <b>supernova</b> tão forte que deu para ver sem telescópio!</p>`,
      `<p>Os povos do Sul já conheciam essas nuvens de luz há milhares de anos. O nome "Magalhães" veio da expedição de <b>Fernão de Magalhães</b> (1519 a 1522), a primeira a <b>dar a volta ao mundo</b>.</p>`,
    ],
    quiz: [
      { q: 'As Nuvens de Magalhães são:', o: ['pequenas galáxias vizinhas da Via Láctea', 'nuvens de chuva', 'planetas', 'cometas'], a: 0, why: 'Duas galáxias-anãs.' },
      { q: 'A Grande Nuvem fica a 160 mil anos-luz e a Pequena a 200 mil. Qual é a diferença?', n: 40000, hint: '200.000 − 160.000.', why: '40.000 anos-luz.' },
      { q: 'Elas só aparecem no céu do hemisfério:', o: ['Sul', 'Norte'], a: 0, why: 'Do Sul. O Brasil tem sorte!' },
      { q: 'A expedição de Magalhães (1519 a 1522) foi a primeira a:', o: ['dar a volta ao mundo', 'ir à Lua', 'descobrir Netuno'], a: 0, why: 'A primeira volta ao mundo.' },
      { q: 'Em 1987, uma estrela explodiu na Grande Nuvem. Uma explosão de estrela se chama:', o: ['supernova', 'eclipse', 'cometa', 'aurora'], a: 0, why: 'Supernova!' },
    ],
  }],

  site: {
    look: [1, 0, 1],
    intro: [
      { who: 'CAPITÃ INÊS', t: 'Olá, {nome}! Sou a capitã Inês, historiadora do mar. Bem-vindo a Lisboa, a cidade das caravelas!' },
    ],
    lesson: {
      id: 'm16c', subject: 'HISTÓRIA · PORTUGAL', title: 'As Grandes Navegações',
      slides: [
        `<p><b>Portugal</b> fica na Europa. A capital é <b>Lisboa</b>. O português é falado em <b>9 países</b>, entre eles Brasil, Portugal, Angola e Moçambique.</p>`,
        `<p>Há uns 500 anos, os portugueses cruzaram os oceanos em <b>caravelas</b>: as <b>Grandes Navegações</b>.</p>
         <p>Em <b>1500</b>, a frota de <b>Pedro Álvares Cabral</b> chegou ao Brasil, onde os povos indígenas já viviam há milhares de anos.</p>`,
        `<p>Em alto-mar não há placas. Os navegadores usavam o <b>astrolábio</b> para medir o <b>ângulo</b> do Sol e das estrelas acima do horizonte. Com esse ângulo, sabiam o quanto estavam ao norte ou ao sul.</p>`,
      ],
      quiz: [
        { q: 'Em que ano a frota de Cabral chegou ao Brasil?', n: 1500, why: 'Em 1500.' },
        { q: 'Para que servia o astrolábio?', o: ['Medir o ângulo do Sol e das estrelas para saber onde o navio estava', 'Pescar', 'Ver as horas', 'Cozinhar'], a: 0, why: 'Um instrumento de medir ângulos no céu.' },
        { q: 'Em quantos países o português é língua oficial?', n: 9, why: '9 países, em 4 continentes!' },
        { q: 'Qual é a capital de Portugal?', o: ['Lisboa', 'Porto', 'Madri', 'Belém'], a: 0, why: 'Lisboa.' },
        { q: 'Os barcos das Grandes Navegações se chamavam:', o: ['caravelas', 'canoas', 'submarinos', 'balsas'], a: 0, why: 'Caravelas, com velas enormes.' },
      ],
    },
    outro: [
      { who: 'CAPITÃ INÊS', t: 'Boa viagem! Os navegadores iam até o fim do mar. Você vai até o fim da galáxia.' },
    ],
  },

  gameIntro: [
    { who: 'KDOK', t: 'Bip! Para navegar fora da galáxia, medimos o ângulo das estrelas-guia, como no astrolábio.' },
    { who: 'KDOK', t: 'Gire o ponteiro com ◀ ▶ até ficar em cima da estrela e aperte A. Acerte 5 medições. A nave balança, então capricha!' },
  ],

  debrief: [
    { who: 'KDOK', t: 'SAÍMOS DA VIA LÁCTEA! Olhe para trás: a nossa galáxia inteira, um redemoinho de centenas de bilhões de estrelas.' },
    { who: 'KDOK', t: 'E ali estão as Nuvens de Magalhães, galáxias pequenas girando em volta da nossa.' },
    { who: 'KDOK', t: 'Em algum lugar desse redemoinho está o Sol, a Terra e o Capão. Daqui, não dá nem pra ver.' },
    { who: 'KDOK', t: 'Bip! Longe de tudo, o sinal continua igual. Ele está no universo inteiro.' },
  ],
  card: { id: 'magalhaes', name: 'NUVENS DE MAGALHÃES', lines: ['Duas galáxias-anãs vizinhas', 'Grande Nuvem: 160 mil anos-luz', 'Pequena Nuvem: 200 mil anos-luz', 'Só aparecem no céu do Sul', 'Supernova vista em 1987'] },
  reward: { id: 'dobra', name: 'MOTOR DE DOBRA', desc: 'Dobra o espaço para ir a outras galáxias. É ficção: ninguém inventou isso... ainda! A nave virou a DOBRA-1.' },
  radio: 'Filho, você saiu da nossa galáxia! Nem sei o que dizer. Só que eu tô aqui, orgulhoso, olhando pro céu do Capão. Câmbio!',
  real: 'No mercado, procure uma etiqueta de desconto com porcentagem (tipo 10% ou 50%). Calcule quanto fica o preço com o desconto.',

  chat: {
    yuki: 'Em Portugal eles dizem "pequeno-almoço" para o café da manhã. O português tem jeitos diferentes no mundo todo!',
    lia: 'Os Guarani chamam a Via Láctea de Caminho da Anta. Acho mais bonito que "láctea".',
    tomas: 'Porcentagem: se eu como 100% da pizza, sobra 0% pro Kdok.',
    bia: 'Motor de dobra é ficção, eu sei. Mas muita invenção começou assim: primeiro na imaginação.',
    caio: 'A biblioteca é o lugar mais silencioso da escola. Perfeito pra... estudar. Claro. Estudar.',
    rival: 'Copiloto de novo não deu... mas o Comandante disse que eu mandei bem no buraco negro!',
    kdok: 'Bip! Magalhães deu a volta ao mundo. Eu dei a volta no hangar e me perdi.',
    ze: 'Estamos quase lá. Depois das Nuvens vem Andrômeda. E depois... a borda de tudo.',
  },
};
