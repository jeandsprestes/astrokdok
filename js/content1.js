'use strict';
// MISSÃO 1 — TERRA · lançamento do Vale do Capão
A.MISSIONS = A.MISSIONS || [];
A.MISSIONS[0] = {
  n: 1, name: 'TERRA', goal: 'subir até a órbita e fotografar a Terra',
  place: 'VALE DO CAPÃO', where: 'Vale do Capão, Bahia, Brasil', scene: 'capao', game: 'launch', body: 'earth',
  go: 'Ir para a plataforma de lançamento?',

  brief: [
    { who: 'CMTE. JULIUS', t: 'Cadete Gabriel Rosa. Sou o Comandante Julius. Bem-vindo à Astrokdok.' },
    { who: 'CMTE. JULIUS', t: 'Sua primeira missão: subir até a órbita e fotografar a Terra lá de cima.' },
    { who: 'CMTE. JULIUS', t: 'Mas nesta empresa ninguém voa sem estudar. Vá até a ESCOLA. Duas aulas. Depois, fale comigo.' },
  ],
  ready: [
    { who: 'CMTE. JULIUS', t: 'Aulas concluídas. Bom trabalho, cadete.' },
    { who: 'CMTE. JULIUS', t: 'Sua nave é o CALHAMBEQUE-1. Feita de uma caixa-d\'água velha e fita adesiva. É feia, mas voa. Quase sempre.' },
    { who: 'CMTE. JULIUS', t: 'O lançamento será aqui mesmo, no Vale do Capão. Antes, um guia da Chapada quer falar com você.' },
  ],
  teacher: [
    'Bom dia, turma! Primeira aula: PORTUGUÊS. Vamos descobrir qual sílaba manda na palavra.',
    'Agora, a aula da missão do Gabriel: o nosso planeta, a TERRA!',
  ],
  after: 'Parabéns, Gabriel! Pode ir falar com o Comandante Julius.',

  lessons: [{
    id: 'm1a', subject: 'PORTUGUÊS', title: 'A sílaba que manda',
    slides: [
      `<p>Toda palavra tem uma sílaba que a gente fala <b>mais forte</b>. Ela se chama <b>sílaba tônica</b>.</p>
       <div class="calc">fo - GUE - te
pla - NE - ta
es - TRE - la</div><p>Fale em voz alta: fo-GUE-te. Sentiu a voz pular no GUE?</p>`,
      `<p>Para dar nome, conte as sílabas <b>de trás para frente</b>:</p>
       <div class="calc">so - LAR
 → forte na última
 = OXÍTONA

co - ME - ta
 → forte na penúltima
 = PAROXÍTONA

ÓR - bi - ta
 → forte na antepenúltima
 = PROPAROXÍTONA</div>`,
      `<p><b>Regra de ouro:</b> toda proparoxítona leva acento. Sem exceção!</p>
       <div class="calc">JÚ-pi-ter    ÓR-bi-ta
sa-TÉ-li-te  LÂM-pa-da
mag-NÉ-ti-co</div><p>Se a sílaba forte é a antepenúltima, pode colocar o acento sem medo.</p>`,
    ],
    quiz: [
      { q: 'Qual é a sílaba tônica de PLANETA?', o: ['PLA', 'NE', 'TA'], a: 1, why: 'pla-NE-ta. A força está no NE.', hint: 'Fale a palavra devagar, como se chamasse alguém de longe.' },
      { q: 'A palavra ÓRBITA é:', o: ['oxítona', 'paroxítona', 'proparoxítona'], a: 2, why: 'ÓR-bi-ta: a forte é a antepenúltima. Por isso tem acento!', hint: 'Conte de trás para frente: ta (1), bi (2), ÓR (3).' },
      { q: 'Qual destas palavras é OXÍTONA (forte na última sílaba)?', o: ['cometa', 'lua', 'solar', 'estrela'], a: 2, why: 'so-LAR. A força está no fim.', hint: 'Fale cada uma e veja onde a voz pula.' },
      { q: 'Uma destas palavras está escrita ERRADA. Qual?', o: ['Júpiter', 'satelite', 'órbita', 'cometa'], a: 1, why: 'sa-TÉ-li-te é proparoxítona. Precisa de acento: satélite.', hint: 'Procure uma proparoxítona sem acento.' },
      { q: 'Complete: toda palavra proparoxítona...', o: ['nunca tem acento', 'sempre tem acento', 'só tem acento às vezes'], a: 1, why: 'Regra de ouro: proparoxítona sempre leva acento.' },
    ],
  }, {
    id: 'm1b', subject: 'CIÊNCIAS + MATEMÁTICA', title: 'O planeta que gira',
    slides: [
      `<p>A Terra nunca fica parada. Ela faz dois movimentos:</p>
       <p><b>ROTAÇÃO:</b> gira em volta de si mesma, como um pião. Uma volta leva <b>24 horas</b>, ou seja, 1 dia. É por isso que existe dia e noite.</p>
       <p><b>TRANSLAÇÃO:</b> dá uma volta inteira em torno do Sol. Leva <b>365 dias</b>, ou seja, 1 ano.</p>`,
      `<p>A Terra gira de <b>oeste para leste</b>. Por isso o Sol parece <b>nascer no leste</b> e se pôr no oeste. Quem se mexe é a gente!</p>
       <p>Em volta da Terra existe uma camada de ar: a <b>atmosfera</b>. De baixo para cima:</p>
       <div class="calc">TROPOSFERA · até 12 km
  nuvens, chuva, aviões
ESTRATOSFERA · até 50 km
  camada de ozônio
MESOSFERA · até 80 km
  meteoros queimam aqui
TERMOSFERA · até 600 km
  Estação Espacial</div>`,
      `<p>A <b>Estação Espacial Internacional</b> voa a 400 km de altura e dá uma volta na Terra a cada <b>90 minutos</b>. Os astronautas de lá veem o Sol nascer <b>16 vezes por dia</b>!</p>
       <p>E lá de cima: de cada 10 partes da Terra, cerca de <b>7 são água</b>. Planeta Terra... ou Planeta Água?</p>`,
    ],
    quiz: [
      { q: 'O movimento da Terra girando em volta de si mesma, que faz o dia e a noite, é a:', o: ['translação', 'rotação', 'gravidade', 'órbita'], a: 1, why: 'Rotação: uma volta a cada 24 horas.' },
      { q: 'Quantas horas há em 3 dias?', n: 72, hint: 'Cada dia tem 24 horas. Faça 24 × 3, ou 24 + 24 + 24.', why: '24 × 3 = 72 horas.' },
      { q: 'A Estação dá uma volta na Terra a cada 90 minutos. Um dia tem 1.440 minutos. Quantas voltas ela dá em um dia?', n: 16, calc: '1440 ÷ 90 = ?', hint: 'Corte um zero dos dois números: 144 ÷ 9. Que número vezes 9 dá 144?', why: '1440 ÷ 90 = 144 ÷ 9 = 16 voltas.' },
      { q: 'Se de cada 10 partes da Terra 7 são água, quantas partes são terra firme?', o: ['3 de 10', '7 de 10', '10 de 10', '1 de 10'], a: 0, why: '10 − 7 = 3. Só 3 de cada 10 partes são terra!' },
      { q: 'Em qual camada da atmosfera ficam as nuvens e a chuva?', o: ['termosfera', 'mesosfera', 'troposfera', 'estratosfera'], a: 2, why: 'Troposfera: a camada mais baixa, onde a gente vive.' },
      { q: 'Por que o Sol parece nascer no leste?', o: ['Porque o Sol dá a volta na Terra', 'Porque a Terra gira de oeste para leste', 'Porque o vento empurra o Sol', 'Porque é verão'], a: 1, why: 'Quem se mexe é a Terra! Ela gira, e o Sol aparece do lado leste.' },
    ],
  }],

  site: {
    guide: 'SEU DITO',
    intro: [
      { who: 'SEU DITO', t: 'Ô, cadete! Sou o Seu Dito, guia da Chapada há 40 anos. Antes de subir, você precisa conhecer o chão de onde vai sair.' },
    ],
    lesson: {
      id: 'm1c', subject: 'GEOGRAFIA · VALE DO CAPÃO', title: 'O vale da base',
      slides: [
        `<p>O <b>Vale do Capão</b> fica no município de <b>Palmeiras</b>, dentro da <b>Chapada Diamantina</b>, no estado da <b>Bahia</b>, região <b>Nordeste</b> do Brasil.</p>
         <p>A capital da Bahia é <b>Salvador</b>, a cerca de 450 km daqui. Salvador foi a <b>primeira capital do Brasil</b>!</p>`,
        `<p>O nome <b>Diamantina</b> vem dos <b>diamantes</b> achados aqui há quase 200 anos. Muita gente veio garimpar.</p>
         <p>Hoje o tesouro é a natureza: o <b>Parque Nacional da Chapada Diamantina</b> protege rios, grutas, morros e cachoeiras.</p>`,
        `<p>A <b>Cachoeira da Fumaça</b> tem cerca de <b>340 metros</b> de queda. A água cai de tão alto que o vento a espalha em névoa antes de chegar lá embaixo. Parece fumaça!</p>
         <p>E à noite, longe das luzes da cidade, o céu do Capão fica lotado de estrelas. Lugar perfeito para uma base espacial.</p>`,
      ],
      quiz: [
        { q: 'O Vale do Capão fica em qual estado?', o: ['Minas Gerais', 'Bahia', 'Pernambuco', 'Goiás'], a: 1, why: 'Bahia, na região Nordeste.' },
        { q: 'Qual é a capital da Bahia?', o: ['Salvador', 'Recife', 'Palmeiras', 'Lençóis'], a: 0, why: 'Salvador, a primeira capital do Brasil!' },
        { q: 'Por que a Cachoeira da Fumaça tem esse nome?', o: ['Porque tem um vulcão perto', 'Porque a água vira névoa antes de chegar embaixo', 'Porque fazem fogueira lá', 'Porque a água é quente'], a: 1, why: 'O vento espalha a água em gotinhas. Parece fumaça.' },
        { q: 'A cachoeira tem cerca de 340 m. Um prédio de 10 andares tem uns 30 m. Quantos prédios inteiros, um em cima do outro, cabem na altura da cachoeira?', n: 11, calc: '340 ÷ 30 = ?', hint: '30 × 10 = 300. Sobram 40. Cabe mais um prédio de 30 nesses 40?', why: '30 × 11 = 330. Cabem 11 prédios e sobram 10 metros.' },
        { q: 'De onde vem o nome "Diamantina"?', o: ['De uma rainha chamada Diamantina', 'Dos diamantes achados na região', 'De uma estrela', 'De um rio'], a: 1, why: 'Dos diamantes que atraíram garimpeiros há quase 200 anos.' },
      ],
    },
    outro: [
      { who: 'SEU DITO', t: 'Tá sabido! Agora sobe. E manda lembrança pras estrelas.' },
    ],
  },

  gameIntro: [
    { who: 'KDOK', t: 'Bip-bop! Vamos atravessar as camadas da atmosfera até a órbita!' },
    { who: 'KDOK', t: 'Desvie de pássaros, aviões, balões e lixo espacial. Use ◀ ▶. Temos 3 escudos.' },
  ],

  debrief: [
    { who: 'KDOK', t: 'ÓRBITA ALCANÇADA! 400 km de altura. Estamos na termosfera, junto da Estação Espacial.' },
    { who: 'KDOK', t: 'Olhe a Terra: quase uma bola perfeita, só um pouquinho achatada nos polos.' },
    { who: 'KDOK', t: 'Aquela linha fininha brilhando na borda é a atmosfera. É ela que guarda o ar que a gente respira.' },
    { who: 'KDOK', t: 'Metade da Terra está de dia e metade de noite. É a rotação acontecendo na nossa frente!' },
    { who: 'KDOK', t: 'Foto tirada! Bip! Ficou um pouco tremida. Mas é a Terra.' },
  ],
  card: { id: 'terra', name: 'TERRA', lines: ['Diâmetro: 12.742 km', 'Dia: 24 horas', 'Ano: 365 dias', 'Luas: 1', 'Água: 7 de cada 10 partes', 'Único lugar conhecido com vida'] },
  reward: { id: 'turbo', name: 'PROPULSOR TURBO', desc: 'A nave ganha mais força e mais combustível. Vai ajudar muito no pouso da próxima missão.' },
  radio: 'Gabriel, aqui é o papai. Vi um risquinho de fumaça subindo lá do Capão e sabia que era você. Tô orgulhoso, filho. Câmbio!',
  real: 'Hoje, repare de que lado o Sol se põe. Aquele lado é o OESTE. O leste fica do lado oposto. Mostre para alguém de casa!',

  chat: {
    lia: 'Desenhei o Cruzeiro do Sul no caderno. São 4 estrelas grandes e uma pequenininha chamada Intrometida!',
    tomas: 'Será que astronauta come feijão? Se comer, será que o foguete vai mais rápido?',
    bia: 'Quando eu crescer vou construir um foguete sem fita adesiva. Não é indireta pro Calhambeque. É direta.',
    caio: 'A Terra gira a mais de 1.600 km por hora no Equador e ninguém fica tonto. Eu fico. De sono. Zzz...',
    rival: 'Hunf. Eu já sei tudo de astronomia. Aposto que você nem sabe o que é proparoxítona.',
    kdok: 'Bip-bop! Eu sou o KDK-0. Pode me chamar de Kdok. Fui feito de um micro-ondas velho. Ainda esquento pipoca.',
  },
};
