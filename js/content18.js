'use strict';
// MISSÃO 18 — BORDA DO UNIVERSO OBSERVÁVEL · lançamento do Vale do Capão, à noite
A.MISSIONS[17] = {
  n: 18, name: 'A BORDA', goal: 'chegar até a luz mais antiga do universo e descobrir o sinal',
  place: 'VALE DO CAPÃO', where: 'Vale do Capão, Bahia, Brasil', scene: 'capaoNoite', game: 'final', body: 'cmb', room: 'school', night: true,
  go: 'Ir para a plataforma para a missão final?',

  brief: [
    { who: 'CMTE. JULIUS', t: 'Explorador {nome}. Esta é a MISSÃO FINAL.' },
    { who: 'CMTE. JULIUS', t: 'Missão 18: a BORDA DO UNIVERSO OBSERVÁVEL. O lugar mais distante que a luz nos deixa ver. É lá que o Zé e a Dra. Paz acham que está a origem do sinal.' },
    { who: 'CMTE. JULIUS', t: 'Antes, a Profª Mari preparou uma PROVA FINAL. Nem eu escapei de prova final. Vá.' },
  ],
  ready: [
    { who: 'CMTE. JULIUS', t: 'Prova final concluída. O lançamento será aqui mesmo, no Vale do Capão, à noite. Onde tudo começou.' },
    { who: 'CMTE. JULIUS', t: 'Tem gente esperando você na plataforma.' },
  ],
  teacher: [
    'Boa noite, turma. Hoje é a PROVA FINAL: um pouquinho de tudo o que aprendemos. Respirem fundo. Vocês sabem muito mais do que imaginam.',
    'E agora, a última aula da missão do {nome}: a história do UNIVERSO inteiro!',
  ],
  after: '{nome}... foi uma honra ser sua professora. Vá lá e descubra o sinal.',

  lessons: [{
    id: 'm18a', subject: 'PROVA FINAL', title: 'Um pouco de tudo',
    slides: [
      `<p>Esta prova tem questões de <b>todas as matérias</b> que você estudou na Astrokdok: português, matemática, inglês, história e ciências.</p>
       <p>Não tenha pressa. Se errar, pense de novo. E lembre: o Kdok pode ajudar uma vez.</p>`,
    ],
    quiz: [
      { q: 'Qual destas palavras é PROPAROXÍTONA?', o: ['planeta', 'Júpiter', 'Plutão', 'estrela'], a: 1, why: 'JÚ-pi-ter: forte na antepenúltima, e por isso tem acento.' },
      { q: 'Quanto é 144 ÷ 12?', n: 12, hint: 'Que número vezes 12 dá 144?', why: '12 × 12 = 144.' },
      { q: 'Quanto é 3/4 de 40?', n: 30, hint: '1/4 de 40 é 10.', why: '10 × 3 = 30.' },
      { q: 'Complete: "The stars ___ beautiful."', o: ['is', 'are'], a: 1, why: 'Várias estrelas: are.' },
      { q: 'Que número é XXI em algarismos romanos?', n: 21, hint: 'X = 10 e I = 1.', why: '10 + 10 + 1 = 21. O nosso século!' },
      { q: 'Quanto é 10% de 500?', n: 50, hint: '10%: divida por 10.', why: '500 ÷ 10 = 50.' },
      { q: '"O universo é um oceano sem fim." Isso é:', o: ['comparação', 'metáfora'], a: 1, why: 'Sem o "como": metáfora.' },
      { q: 'O vapor d\'água é a água no estado:', o: ['sólido', 'líquido', 'gasoso'], a: 2, why: 'Vapor é gasoso.' },
    ],
  }, {
    id: 'm18b', subject: 'CIÊNCIAS + MATEMÁTICA', title: 'A história do universo',
    slides: [
      `<p>O universo tem uns <b>13,8 bilhões de anos</b>. Ele começou muito quente e apertado, e desde então está se <b>expandindo</b>: ficando cada vez maior. Os cientistas chamam esse começo de <b>Big Bang</b>.</p>`,
      `<p>Como a luz demora para viajar, olhar longe é olhar para o <b>passado</b>. Existe um limite: só conseguimos ver até onde a luz teve tempo de chegar até nós. Por isso falamos em universo <b>observável</b>.</p>`,
      `<p>A <b>luz mais antiga</b> que conseguimos ver saiu quando o universo tinha só uns 380 mil anos. Hoje ela é muito fria (uns <b>−270 °C</b>) e vem de <b>todas as direções</b> do céu.</p>
       <p>Ela foi descoberta sem querer, em <b>1964</b>, por dois cientistas com uma antena. Eles acharam que o chiado era... <b>cocô de pombo</b> na antena!</p>`,
    ],
    quiz: [
      { q: 'Quantos anos tem o universo, mais ou menos?', o: ['13,8 bilhões de anos', '2026 anos', '4,6 bilhões de anos', '1 milhão de anos'], a: 0, why: '13,8 bilhões. (4,6 bilhões é a idade do Sol!)' },
      { q: 'O universo está:', o: ['se expandindo, ficando maior', 'encolhendo', 'parado'], a: 0, why: 'Ele cresce desde o começo.' },
      { q: 'A luz mais antiga do universo foi descoberta sem querer, em 1964, com:', o: ['uma antena', 'um microscópio', 'uma luneta de brinquedo'], a: 0, why: 'Uma antena de rádio!' },
      { q: 'Essa luz antiga é muito fria: uns −270 °C. A água congela a 0 °C. Quantos graus abaixo do congelamento?', n: 270, why: '270 graus abaixo de zero!' },
      { q: 'Por que se diz universo OBSERVÁVEL?', o: ['Porque só vemos até onde a luz teve tempo de chegar até nós', 'Porque tem um observatório na borda', 'Porque dá para ver tudo'], a: 0, why: 'Além disso, a luz ainda não teve tempo de chegar.' },
      { q: 'O que os cientistas acharam que era o chiado da antena?', o: ['cocô de pombo na antena', 'um alienígena', 'um rádio ligado'], a: 0, why: 'Eles até limparam a antena! Mas o chiado continuou.' },
    ],
  }],

  site: {
    look: [3, 1, 0],
    extra: ['paz', [0, 1, 0]],
    intro: [
      { who: 'ZÉ DO RÁDIO', t: 'Chegou a hora, {nome}. A Dra. Paz e eu vamos acompanhar tudo daqui, pela antena.' },
      { who: 'PAPAI', t: 'Filho. Eu disse que ia estar na primeira fila. Vai lá. Eu tô aqui.' },
      { who: 'ZÉ DO RÁDIO', t: 'Antes de subir, uma última aula. Sobre o céu daqui de casa.' },
    ],
    lesson: {
      id: 'm18c', subject: 'CIÊNCIAS · CÉU DO CAPÃO', title: 'O céu de casa',
      slides: [
        `<p>O céu do Capão tem tantas estrelas porque aqui tem <b>pouca luz de cidade</b>. As luzes fortes das cidades apagam as estrelas fracas: isso se chama <b>poluição luminosa</b>.</p>`,
        `<p>A <b>bandeira do Brasil</b> mostra o céu do Rio de Janeiro na manhã de <b>15 de novembro de 1889</b>, dia da Proclamação da República.</p>
         <p>Ela tem <b>27 estrelas</b>: uma para cada estado e o Distrito Federal. O Cruzeiro do Sul está lá!</p>`,
        `<p>Em <b>2006</b>, <b>Marcos Pontes</b> foi o primeiro astronauta brasileiro a ir ao espaço. Um dia, pode ser alguém daqui do Capão.</p>`,
      ],
      quiz: [
        { q: 'Por que o céu do Capão tem tantas estrelas visíveis?', o: ['Porque tem pouca luz de cidade (pouca poluição luminosa)', 'Porque é mais perto do espaço', 'Porque as estrelas gostam de lá'], a: 0, why: 'Menos luz artificial, mais estrelas.' },
        { q: 'A bandeira do Brasil mostra o céu do Rio na manhã de 15 de novembro de qual ano?', n: 1889, why: '1889, Proclamação da República.' },
        { q: 'Quantas estrelas tem a bandeira do Brasil?', n: 27, why: '26 estados + o Distrito Federal.' },
        { q: 'Marcos Pontes foi ao espaço em 2006. Quantos anos depois de Gagarin (1961)?', n: 45, hint: 'Faça 2006 − 1961.', why: '45 anos.' },
        { q: 'O que atrapalha a observação do céu nas cidades?', o: ['as luzes da cidade', 'as árvores', 'o silêncio'], a: 0, why: 'A poluição luminosa.' },
      ],
    },
    outro: [
      { who: 'DRA. PAZ', t: '¡Buena suerte, comandante! Quer dizer... quase comandante.' },
    ],
  },

  gameIntro: [
    { who: 'KDOK', t: 'Bip-bop. Missão final. Três etapas.' },
    { who: 'KDOK', t: 'Primeiro, um campo de asteroides. Depois, as luas-guia. E por último, a Antena do Zé: SINTONIZE o sinal girando o botão com ◀ ▶ e aperte A quando o chiado sumir.' },
    { who: 'KDOK', t: 'Tudo o que você aprendeu vai servir agora. Vamos!' },
  ],

  debrief: [
    { who: 'ZÉ DO RÁDIO', t: 'Você está ouvindo? Esse é o SINAL. É a Radiação Cósmica de Fundo: a luz mais antiga do universo.' },
    { who: 'DRA. PAZ', t: 'Ela saiu de todo lugar ao mesmo tempo, quando o universo era um bebê de 380 mil anos. Por isso vem de todas as direções!' },
    { who: 'DRA. PAZ', t: 'E é tão velha e esticada pela expansão do universo que ficou fria: −270 °C. Era a "temperatura" do sinal.' },
    { who: 'ZÉ DO RÁDIO', t: 'E sabe onde eu tinha ouvido antes? No chiado da TV antiga, quando saía do ar. Um pedacinho daquele chiado era essa luz!' },
    { who: 'KDOK', t: 'Bip... então o mistério era o universo dizendo "oi". Desde o começo de tudo.' },
    { who: 'CMTE. JULIUS', t: 'Missão final: cumprida. Volte para casa, {nome}.' },
  ],
  card: { id: 'borda', name: 'BORDA DO UNIVERSO OBSERVÁVEL', lines: ['Idade do universo: 13,8 bilhões de anos', 'A luz mais antiga: Radiação Cósmica de Fundo', 'Temperatura: −270 °C', 'Vem de todas as direções do céu', 'Descoberta em 1964, sem querer'] },
  reward: { id: 'medalha', name: 'MEDALHA ASTROKDOK', desc: 'A maior honra da Astrokdok: para quem foi até a borda do universo e voltou para casa.' },
  radio: 'Filho, você foi até o começo do universo e voltou. Eu sempre soube que você ia longe. Agora vem jantar. Câmbio e desligo.',
  real: 'Última missão de verdade: numa noite escura, deite no chão com alguém de casa e olhe o céu por 10 minutos. Cada pontinho é uma história que você agora conhece.',

  chat: {
    yuki: 'Obrigada por me mostrar o Capão, {nome}. Quando eu voltar pro Japão, vou contar tudo!',
    lia: 'Hoje é a prova final. Desenhei o universo inteiro no caderno pra dar sorte.',
    tomas: 'Prova final? Eu estudei. Principalmente a parte da pizza de frações.',
    bia: 'Revisei a nave mais uma vez. Coloquei o parafuso que sempre sobrava. Agora ela está completa.',
    caio: 'Fiquei acordado a noite inteira estudando. Primeira vez na vida. Tô orgulhoso.',
    rival: 'Boa sorte, {nome}. Vou estar na torre de controle torcendo. Parceiro.',
    kdok: 'Bip-bop... última missão. Meus circuitos estão fazendo um barulho estranho. Acho que é emoção.',
    ze: 'Chegou a hora, {nome}. Vamos ouvir o sinal juntos. Te espero na plataforma.',
  },
};
