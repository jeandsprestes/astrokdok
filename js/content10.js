'use strict';
// MISSÃO 10 — URANO · lançamento de Greenwich, Londres (Reino Unido)
A.MISSIONS[9] = {
  n: 10, name: 'URANO', goal: 'atravessar o labirinto de gelo de Urano',
  place: 'LONDRES', where: 'Greenwich, Londres, Reino Unido', scene: 'londres', game: 'uranus', body: 'uranus', room: 'school',

  brief: [
    { who: 'CMTE. JULIUS', t: 'Capitão. O sinal está esquentando a cabeça do Zé e da Dra. Paz. Eles dizem que ele é "frio". Eu não entendi. Ainda.' },
    { who: 'CMTE. JULIUS', t: 'Missão 10: URANO, o gigante de gelo que gira deitado. Lá, o gelo desliza. Você vai precisar pensar antes de andar.' },
    { who: 'CMTE. JULIUS', t: 'Escola primeiro.' },
  ],
  ready: [
    { who: 'CMTE. JULIUS', t: 'Aulas concluídas. O lançamento será em Greenwich, em Londres: o lugar onde começa a contagem das horas do mundo.' },
  ],
  teacher: [
    'Bom dia! Hoje é PORTUGUÊS: os tempos do verbo. Passado, presente e futuro.',
    'Agora, a aula da missão do {nome}: URANO, o planeta deitado!',
  ],
  after: 'Muito bem, {nome}! O Comandante está esperando.',

  lessons: [{
    id: 'm10a', subject: 'PORTUGUÊS', title: 'Passado, presente e futuro',
    slides: [
      `<p>O <b>verbo</b> indica uma ação. Ele muda conforme o <b>tempo</b> em que ela acontece:</p>
       <div class="calc">PASSADO  → Herschel DESCOBRIU
           Urano.
PRESENTE → Urano GIRA deitado.
FUTURO   → A nave CHEGARÁ
           amanhã.</div>`,
      `<p>O mesmo verbo nos três tempos:</p>
       <div class="calc">eu estudei   (passado)
eu estudo    (presente)
eu estudarei (futuro)</div><p>O futuro também pode ser dito assim: <b>eu vou estudar</b>.</p>`,
      `<p>Dicas de tempo nas frases:</p>
       <div class="calc">ontem, ano passado → passado
hoje, agora        → presente
amanhã, um dia     → futuro</div>`,
    ],
    quiz: [
      { q: '"Herschel DESCOBRIU Urano em 1781." O verbo está no:', o: ['passado', 'presente', 'futuro'], a: 0, why: 'Descobriu: já aconteceu.' },
      { q: '"Urano GIRA deitado." O verbo está no:', o: ['passado', 'presente', 'futuro'], a: 1, why: 'Gira: acontece agora.' },
      { q: '"A nave CHEGARÁ amanhã." O verbo está no:', o: ['passado', 'presente', 'futuro'], a: 2, why: 'Chegará: ainda vai acontecer.' },
      { q: 'Passe para o passado: "Eu estudo astronomia."', o: ['Eu estudei astronomia.', 'Eu estudarei astronomia.', 'Eu estudando astronomia.'], a: 0, why: 'Estudei: passado.' },
      { q: 'Qual frase está no futuro?', o: ['Vamos visitar Netuno.', 'Visitamos Netuno ontem.', 'Visitávamos Netuno.'], a: 0, why: '"Vamos visitar" é futuro.' },
    ],
  }, {
    id: 'm10b', subject: 'CIÊNCIAS + MATEMÁTICA', title: 'O gigante deitado',
    slides: [
      `<p><b>Urano</b> é o sétimo planeta. Ele foi o <b>primeiro planeta descoberto com um telescópio</b>, por <b>William Herschel</b>, em <b>1781</b>. Os outros até Saturno já eram vistos a olho nu.</p>`,
      `<p>Urano <b>gira deitado</b>, de lado, como uma bola rolando. Os cientistas acham que, há muito tempo, algo enorme bateu nele.</p>
       <p>Ele leva <b>84 anos</b> para dar a volta no Sol. Por estar deitado, cada polo fica <b>42 anos no claro</b> e <b>42 anos no escuro</b>!</p>`,
      `<p>Urano é um <b>gigante de gelo</b>, de cor azul-esverdeada por causa do gás <b>metano</b>. Sua atmosfera chega a <b>−224 °C</b>.</p>
       <p>Só uma sonda visitou Urano: a <b>Voyager 2</b>, em <b>1986</b>. Suas luas têm nomes de personagens de teatro: Miranda, Titânia, Oberon...</p>`,
    ],
    quiz: [
      { q: 'O que Urano tem de muito estranho?', o: ['Ele gira deitado, de lado', 'Ele é quadrado', 'Ele não tem cor', 'Ele fica parado'], a: 0, why: 'Ele rola pelo espaço, de lado.' },
      { q: 'Urano leva 84 anos para dar a volta no Sol. Cada polo fica metade desse tempo no escuro. Quantos anos de noite?', n: 42, hint: 'Metade de 84.', why: '84 ÷ 2 = 42 anos de noite!' },
      { q: 'Quem descobriu Urano, em 1781?', o: ['William Herschel', 'Galileu', 'Neil Armstrong', 'Yuri Gagarin'], a: 0, why: 'William Herschel, com um telescópio.' },
      { q: 'Quantos anos se passaram de 1781 (descoberta) até 1986 (visita da Voyager 2)?', n: 205, hint: 'Faça 1986 − 1781.', why: '205 anos.' },
      { q: 'Por que Urano é azul-esverdeado?', o: ['Por causa do gás metano', 'Tem oceanos', 'Tem florestas', 'Está com frio'], a: 0, why: 'O metano deixa a luz azul-esverdeada.' },
    ],
  }],

  site: {
    look: [2, 1, 0],
    intro: [
      { who: 'PROF. OLIVER', t: 'Hello, {nome}! Sou o professor Oliver. Bem-vindo a Greenwich, em Londres!' },
    ],
    lesson: {
      id: 'm10c', subject: 'GEOGRAFIA · REINO UNIDO', title: 'Onde começam as horas',
      slides: [
        `<p>O <b>Reino Unido</b> fica na Europa. A capital é <b>Londres</b>, cortada pelo rio <b>Tâmisa</b>. <b>Big Ben</b> é o nome do grande sino da torre do relógio.</p>
         <p>William Herschel descobriu Urano morando na Inglaterra.</p>`,
        `<p>Em Greenwich passa o <b>Meridiano de Greenwich</b>: a linha imaginária da <b>longitude 0°</b>. É dela que se contam as longitudes a leste e a oeste.</p>`,
        `<p>Como a Terra gira, é dia de um lado e noite do outro. Por isso o mundo tem <b>24 fusos horários</b>.</p>
         <div class="calc">Londres (inverno de lá): 12 h
Brasília:            9 h
(3 horas a menos)</div>`,
      ],
      quiz: [
        { q: 'Qual é a capital do Reino Unido?', o: ['Londres', 'Paris', 'Dublin', 'Greenwich'], a: 0, why: 'Londres.' },
        { q: 'O Meridiano de Greenwich marca a longitude:', o: ['0°', '90°', '180°', '45°'], a: 0, why: 'Zero grau: é o ponto de partida.' },
        { q: 'O mundo é dividido em quantos fusos horários principais?', n: 24, hint: 'Quantas horas tem um dia?', why: '24, um para cada hora do dia.' },
        { q: 'Quando é meio-dia (12 h) em Londres, no inverno de lá, em Brasília são 3 horas a menos. Que horas são em Brasília?', n: 9, why: '12 − 3 = 9 horas da manhã.' },
        { q: 'Big Ben é o nome:', o: ['do sino da torre do relógio', 'de um rei', 'de um rio', 'de um planeta'], a: 0, why: 'É o sino grande da torre.' },
      ],
    },
    outro: [
      { who: 'PROF. OLIVER', t: 'Good luck! E acerte o relógio: em Urano, a noite dura 42 anos.' },
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
  radio: 'Filho, quando é noite em Urano, é noite por 42 anos! Aqui em casa a noite só dura até você dormir. Boa noite, astronauta. Câmbio!',
  real: 'Descubra: que horas são agora no Japão, onde mora a família da Yuki? Dica: o Japão está 12 horas à frente de Brasília.',

  chat: {
    yuki: 'No Japão, Urano se chama Tennōsei: "estrela do rei do céu".',
    lia: 'Urano foi o primeiro planeta descoberto com telescópio. Os outros, o povo antigo já via a olho nu!',
    tomas: 'Passado: eu comi. Presente: eu como. Futuro: eu comerei. Muito. Sempre.',
    bia: 'Motor iônico: gasta pouquinho e aguenta anos ligado. Perfeito para ir longe.',
    caio: 'Em Urano a noite dura 42 anos. Finalmente um lugar que me entende.',
    rival: 'Hunf. Urano gira deitado. Igual o Caio.',
    kdok: 'Bip! Deslizar no gelo: meu esporte favorito. Eu só não sei frear.',
    ze: 'O sinal não fica mais forte quando a gente chega perto de nada. Isso quer dizer que ele está... em todo lugar.',
  },
};
