'use strict';
// MISSÃO 17 — GALÁXIA DE ANDRÔMEDA · lançamento de Gizé (Egito)
A.MISSIONS[16] = {
  n: 17, name: 'ANDRÔMEDA', goal: 'atravessar a Galáxia de Andrômeda',
  place: 'EGITO', where: 'Gizé, Egito', scene: 'egito', game: 'andromeda', body: 'andromeda', room: 'biblio', night: true,
  guest: { who: 'SEU DITO', look: [3, 1, 1], t: 'Ô, {nome}! Desci da serra só pra te ver. Aquele menino que eu ensinei no Capão... indo pra outra galáxia!' },

  brief: [
    { who: 'CMTE. JULIUS', t: 'Explorador. Missão 17: ANDRÔMEDA, a grande galáxia mais próxima. Um trilhão de estrelas.' },
    { who: 'CMTE. JULIUS', t: 'Lá dentro, as estrelas formam corredores. E há buracos negros vagando por eles. Colete a luz das estrelas e não se deixe pegar.' },
    { who: 'CMTE. JULIUS', t: 'Aula noturna na BIBLIOTECA. O Seu Dito está aqui na base, desceu da serra para te ver.' },
  ],
  ready: [
    { who: 'CMTE. JULIUS', t: 'Aulas concluídas. O lançamento será em Gizé, no Egito, ao lado das pirâmides.' },
  ],
  teacher: [
    'Boa noite! Aula na biblioteca à luz de lanterna. Hoje é PORTUGUÊS: COMPARAÇÃO e METÁFORA, o jeito poético de falar.',
    'Agora, a aula da missão do {nome}: a GALÁXIA DE ANDRÔMEDA!',
  ],
  after: 'Que lindo, {nome}! O Comandante está esperando.',

  lessons: [{
    id: 'm17a', subject: 'PORTUGUÊS', title: 'Comparação e metáfora',
    slides: [
      `<p>Às vezes a gente diz uma coisa usando outra, para ficar mais bonito ou mais claro.</p>
       <p>Na <b>comparação</b>, aparece uma palavra que liga as duas coisas: <b>como</b>, <b>parece</b>, <b>igual a</b>.</p>
       <div class="calc">A Lua é COMO uma lanterna.
O céu PARECE um mar de estrelas.</div>`,
      `<p>Na <b>metáfora</b>, a gente diz direto que uma coisa É a outra, sem o "como":</p>
       <div class="calc">A Lua é uma lanterna no céu.
A Via Láctea é um rio de luz.</div>`,
      `<p>Poetas e cientistas usam as duas! "Poeira de estrelas" é uma metáfora bonita para dizer que somos feitos de átomos que vieram das estrelas.</p>`,
    ],
    quiz: [
      { q: '"A Lua é como uma lanterna no céu." Isso é:', o: ['comparação', 'metáfora'], a: 0, why: 'Tem o "como": comparação.' },
      { q: '"A Via Láctea é um rio de luz." Isso é:', o: ['comparação', 'metáfora'], a: 1, why: 'Sem o "como": metáfora.' },
      { q: 'Qual palavra quase sempre aparece na comparação?', o: ['como', 'não', 'muito'], a: 0, why: '"Como", ou "parece".' },
      { q: 'Complete com uma comparação: "Os olhos do Kdok brilham ___."', o: ['como faróis', 'amarelo', 'muito'], a: 0, why: 'Brilham como faróis!' },
      { q: 'Qual frase é uma metáfora?', o: ['O Sol é uma fogueira gigante.', 'O Sol parece uma fogueira.', 'O Sol é quente.'], a: 0, why: 'Diz que o Sol É uma fogueira, sem "como".' },
    ],
  }, {
    id: 'm17b', subject: 'CIÊNCIAS + MATEMÁTICA', title: 'A galáxia vizinha',
    slides: [
      `<p><b>Andrômeda</b> é a grande galáxia mais próxima da nossa. Ela fica a <b>2,5 milhões de anos-luz</b> e tem cerca de <b>1 trilhão de estrelas</b>.</p>
       <p>Numa noite bem escura, dá para ver Andrômeda a olho nu, como uma mancha fraquinha. É uma das coisas mais distantes que dá para ver sem telescópio!</p>`,
      `<p>No ano <b>964</b>, o astrônomo persa <b>Al-Sufi</b> registrou Andrômeda como uma "pequena nuvem".</p>
       <p>Só nos anos 1920 os astrônomos descobriram que ela é <b>outra galáxia</b>. De repente, o universo ficou muito maior!</p>`,
      `<p>Andrômeda está vindo na nossa direção. Daqui a uns <b>4 bilhões e meio de anos</b>, ela e a Via Láctea vão se juntar numa galáxia só.</p>
       <p>As estrelas ficam tão longe umas das outras que quase nenhuma vai bater.</p>`,
    ],
    quiz: [
      { q: 'Andrômeda é:', o: ['a grande galáxia mais próxima da nossa', 'uma estrela', 'um planeta', 'uma nuvem de chuva'], a: 0, why: 'Nossa grande vizinha.' },
      { q: 'A luz de Andrômeda leva 2,5 milhões de anos para chegar aqui. Quando essa luz saiu de lá, na Terra viviam:', o: ['os ancestrais bem antigos dos humanos', 'pessoas com celulares', 'dinossauros'], a: 0, why: 'Os dinossauros já tinham sumido há muito tempo, e os humanos de hoje ainda não existiam.' },
      { q: 'Como se escreve 4 bilhões e meio?', o: ['4.500.000.000', '4.500.000', '450.000.000'], a: 0, why: '4 bilhões e 500 milhões.' },
      { q: 'Quem registrou Andrômeda no ano 964, chamando-a de "pequena nuvem"?', o: ['o astrônomo persa Al-Sufi', 'Galileu', 'Neil Armstrong'], a: 0, why: 'Al-Sufi, mais de mil anos atrás.' },
      { q: 'Andrômeda tem uns 1 trilhão de estrelas. A Via Láctea tem uns 400 bilhões. Andrômeda tem mais ou menos quantas vezes mais?', o: ['umas 2 vezes e meia', '10 vezes', 'o mesmo tanto'], a: 0, why: '1.000 ÷ 400 = 2,5.' },
    ],
  }],

  site: {
    look: [0, 3, 1],
    intro: [
      { who: 'DR. KAMAL', t: 'Ahlan, {nome}! Sou o Dr. Kamal, arqueólogo. Bem-vindo a Gizé, a terra das pirâmides!' },
    ],
    lesson: {
      id: 'm17c', subject: 'HISTÓRIA · EGITO', title: 'Os observadores do Nilo',
      slides: [
        `<p>O <b>Egito</b> fica no norte da África. A capital é o <b>Cairo</b> e lá se fala <b>árabe</b>. O rio <b>Nilo</b> atravessa o país: é um dos maiores rios do mundo, junto com o nosso Amazonas.</p>`,
        `<p>As <b>pirâmides de Gizé</b> foram construídas há uns <b>4.500 anos</b>, alinhadas com os pontos cardeais.</p>
         <p>Os antigos egípcios escreviam com desenhos: os <b>hieróglifos</b>.</p>`,
        `<p>Eles criaram um calendário de <b>365 dias</b> observando a estrela <b>Sírius</b> e as cheias do rio Nilo.</p>
         <p>E muitos nomes de estrelas vêm da língua <b>árabe</b>: Aldebarã, Rigel, Betelgeuse...</p>`,
      ],
      quiz: [
        { q: 'Qual é a capital do Egito?', o: ['Cairo', 'Gizé', 'Alexandria', 'Nilo'], a: 0, why: 'O Cairo.' },
        { q: 'As pirâmides têm uns 4.500 anos. Quantos séculos é isso?', n: 45, hint: '1 século = 100 anos.', why: '4.500 ÷ 100 = 45 séculos.' },
        { q: 'Os egípcios criaram um calendário de 365 dias observando:', o: ['a estrela Sírius e as cheias do rio Nilo', 'só a Lua cheia', 'os camelos'], a: 0, why: 'O céu e o rio marcavam o ano.' },
        { q: 'Muitos nomes de estrelas, como Aldebarã e Rigel, vêm da língua:', o: ['árabe', 'japonesa', 'inglesa', 'tupi'], a: 0, why: 'Os astrônomos árabes deram nome a muitas estrelas.' },
        { q: 'A escrita com desenhos dos antigos egípcios se chama:', o: ['hieróglifos', 'algarismos romanos', 'alfabeto'], a: 0, why: 'Hieróglifos.' },
      ],
    },
    outro: [
      { who: 'DR. KAMAL', t: 'Ma\'a salama! Quer dizer: vá em paz. As pirâmides esperaram 4.500 anos. Andrômeda espera você.' },
    ],
  },

  gameIntro: [
    { who: 'KDOK', t: 'Bip! Dentro de Andrômeda, as estrelas formam corredores. Recolha a luz de TODAS as estrelinhas.' },
    { who: 'KDOK', t: 'Ande com ▲ ▼ ◀ ▶. Os dois buracos negros vagam pelos corredores: não deixe eles te pegarem!' },
  ],

  debrief: [
    { who: 'KDOK', t: 'ATRAVESSAMOS ANDRÔMEDA! Um trilhão de estrelas girando num redemoinho gigante.' },
    { who: 'KDOK', t: 'Ela está vindo na direção da Via Láctea. Daqui a 4,5 bilhões de anos, as duas vão se abraçar.' },
    { who: 'KDOK', t: 'Quando alguém no Capão olha para Andrômeda, vê a luz que saiu daqui há 2,5 milhões de anos.' },
    { who: 'KDOK', t: 'Bip! O Zé chamou. Ele disse: "Chegou a hora. Volte para o Capão. A última missão começa em casa."' },
  ],
  card: { id: 'andromeda', name: 'GALÁXIA DE ANDRÔMEDA', lines: ['Grande galáxia mais próxima', 'Distância: 2,5 milhões de anos-luz', 'Cerca de 1 trilhão de estrelas', 'Vai se juntar à Via Láctea no futuro', 'Dá para ver a olho nu, como mancha fraca'] },
  reward: { id: 'antena', name: 'ANTENA DO ZÉ', desc: 'O Zé do Rádio montou uma antena especial na nave. Com ela, dá para ouvir o sinal com toda a clareza.' },
  radio: 'Filho, a última missão sai daqui do Capão. Vou estar lá na plataforma, na primeira fila. Câmbio!',
  real: 'Escreva uma metáfora sobre o céu do Capão à noite. Exemplo: "O céu do Capão é um tapete de pipocas brilhantes."',

  chat: {
    yuki: 'Em japonês, Andrômeda é Andoromeda. Às vezes o japonês é fácil!',
    lia: 'Quando Andrômeda e a Via Láctea se juntarem, os cientistas já têm um apelido pra nova galáxia: Láctomeda!',
    tomas: 'Metáfora: minha barriga é um buraco negro. Comparação: minha barriga parece um buraco negro. As duas são verdade.',
    bia: 'Última missão chegando. Revisei a nave três vezes. O parafuso que sempre sobra, eu guardei de lembrança.',
    caio: 'Andrômeda vem pra cá a 110 km por segundo. Ainda bem que demora. Dá tempo de dormir.',
    rival: '{nome}... obrigado por me deixar ir junto no buraco negro. Você é o melhor piloto da Astrokdok. Pronto, falei.',
    kdok: 'Bip! Uma galáxia inteira indo de encontro à outra. É o maior abraço do universo.',
    ze: 'A antena está pronta. Na última missão, você vai ouvir o sinal como eu ouço. Sem chiado de dúvida.',
  },
};
