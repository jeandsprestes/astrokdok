'use strict';
// MISSÃO 17: GALÁXIA DE ANDRÔMEDA · lançamento de Gizé (Egito)
A.MISSIONS[16] = {
  n: 17, name: 'ANDRÔMEDA', goal: 'atravessar a Galáxia de Andrômeda',
  place: 'EGITO', where: 'Gizé, Egito', scene: 'egito', game: 'andromeda', body: 'andromeda', room: 'biblio', night: true,
  guest: { who: 'SEU DITO', look: [3, 1, 1], t: 'Ô, {nome}! Desci da serra só pra te ver. {{Aquele menino|Aquela menina}} que eu ensinei no Capão... indo pra outra galáxia!' },

  brief: [
    { who: 'CMTE. DOZINHO', t: '{nome}, missão 17: ANDRÔMEDA, a grande galáxia mais próxima. Um trilhão de estrelas.' },
    { who: 'CMTE. DOZINHO', t: 'Lá dentro, as estrelas formam corredores. E há buracos negros vagando por eles. Colete a luz das estrelas e não se deixe pegar.' },
    { who: 'CMTE. DOZINHO', t: 'Aula noturna na BIBLIOTECA. O Seu Dito está aqui na base, desceu da serra para te ver.' },
  ],
  ready: [
    { who: 'CMTE. DOZINHO', t: 'Aulas concluídas. O lançamento será em Gizé, no Egito, ao lado das pirâmides.' },
  ],
  teacher: [
    'Boa noite! Aula na biblioteca à luz de lanterna. Hoje é PORTUGUÊS: FIGURAS DE LINGUAGEM, o jeito poético de falar. Comparação, metáfora, personificação e hipérbole.',
    'Agora, ASTRONOMIA, {nome}: a GALÁXIA DE ANDRÔMEDA, a grande vizinha da Via Láctea. A luz dela que chega hoje saiu de lá há 2,5 milhões de anos!',
  ],
  after: 'Que lindo, {nome}! O Comandante está esperando.',

  lessons: [{
    id: 'm17a', subject: 'PORTUGUÊS', title: 'Figuras de linguagem',
    slides: [
      `<p>Às vezes a gente fala de uma coisa usando outra, para a frase ficar mais bonita, mais forte ou mais clara. Esses jeitos de falar se chamam <b>figuras de linguagem</b>. Poetas usam, cantores usam, e você usa todo dia sem perceber.</p>
       <p>A primeira é a <b>comparação</b>: ela liga duas coisas com uma palavra de ligação, como <b>como</b>, <b>parece</b>, <b>igual a</b> ou <b>feito</b>.</p>
       <div class="calc">A Lua é COMO uma lanterna.
O céu PARECE um mar de estrelas.
A nave é rápida FEITO um raio.</div>`,
      `<p>Na <b>metáfora</b>, a gente diz direto que uma coisa É a outra, sem a palavra de ligação:</p>
       <div class="calc">A Lua é uma lanterna no céu.
A Via Láctea é um rio de luz.</div>
       <p>Na <b>personificação</b>, a gente dá ação ou sentimento de gente a algo que não é gente: um bicho, um objeto, uma estrela.</p>
       <div class="calc">As estrelas piscavam para nós.
O vento cantava no Vale do Capão.</div>`,
      `<p>Na <b>hipérbole</b>, a gente <b>exagera de propósito</b>, para mostrar que algo é muito forte. Ninguém leva ao pé da letra.</p>
       <div class="calc">Já te falei um milhão de vezes!
Morri de rir com o Kdok.</div>
       <p>Resumo para reconhecer: tem "como" ou "parece"? <b>Comparação</b>. Diz que uma coisa É outra? <b>Metáfora</b>. Coisa agindo como gente? <b>Personificação</b>. Exagero? <b>Hipérbole</b>.</p>`,
    ],
    quiz: [
      { q: '"A Lua é como uma lanterna no céu." Que figura de linguagem é essa?', o: ['Metáfora', 'Comparação', 'Hipérbole'], a: 1, hint: 'Procure uma palavra de ligação, como "como" ou "parece".', why: 'Tem a palavra "como" ligando a Lua e a lanterna: é uma comparação.' },
      { q: '"A Via Láctea é um rio de luz." Que figura de linguagem é essa?', o: ['Comparação', 'Personificação', 'Metáfora'], a: 2, hint: 'A frase diz que a Via Láctea É um rio, sem usar "como".', why: 'Diz direto que uma coisa é a outra, sem "como": é uma metáfora.' },
      { q: '"As estrelas piscavam para o Kdok." Que figura de linguagem é essa?', o: ['Personificação', 'Hipérbole', 'Comparação'], a: 0, hint: 'Estrela pisca para alguém como gente faz? Quem pisca de propósito para os outros?', why: 'Piscar para alguém é coisa de gente. A frase dá uma ação humana às estrelas: é personificação.' },
      { q: '"Esperei mil anos por esse lançamento!" Que figura de linguagem é essa?', o: ['Comparação', 'Hipérbole', 'Metáfora'], a: 1, hint: 'Alguém espera mil anos de verdade? A frase está exagerando?', why: 'Ninguém espera mil anos: é um exagero de propósito, para mostrar que a espera pareceu longa. É hipérbole.' },
      { q: 'Qual destas frases tem PERSONIFICAÇÃO?', o: ['A nave é uma flecha de prata.', 'O foguete parece um lápis gigante.', 'A Lua, tímida, se escondeu atrás da serra.', 'Comi umas cem pizzas no jantar.'], a: 2, hint: 'Procure algo que não é gente, mas sente ou age como gente.', why: 'Ficar tímida e se esconder é coisa de gente: a Lua ganhou sentimento humano. As outras são metáfora, comparação e hipérbole.' },
      { q: 'Na frase "Seus olhos são duas estrelas", o que a metáfora quer dizer?', o: ['Que os olhos são feitos de gás quente', 'Que os olhos brilham e são bonitos', 'Que os olhos ficam muito longe'], a: 1, hint: 'A metáfora pega uma qualidade da estrela e passa para os olhos. Qual qualidade da estrela é a mais conhecida?', why: 'A metáfora usa o brilho das estrelas para dizer que os olhos brilham e são bonitos. Ela não fala do gás nem da distância.' },
    ],
  }, {
    id: 'm17b', subject: 'ASTRONOMIA', title: 'A galáxia vizinha',
    slides: [
      `<p><b>Andrômeda</b> é a grande galáxia mais próxima da nossa. Ela é uma espiral, como a Via Láctea, só que maior: tem cerca de <b>1 trilhão de estrelas</b>. Ela fica a <b>2,5 milhões de anos-luz</b> daqui.</p>
       <p>Numa noite bem escura e sem Lua, dá para ver Andrômeda a olho nu, como uma <b>mancha fraquinha</b>. Do Brasil, ela aparece baixa, no lado norte do céu, nas noites de outubro a dezembro. É uma das coisas mais distantes que dá para ver sem telescópio!</p>`,
      `<p>No ano <b>964</b>, o astrônomo persa <b>Al-Sufi</b> anotou Andrômeda no seu livro de estrelas e a chamou de "pequena nuvem".</p>
       <p>Por quase mil anos, ninguém sabia o que ela era. Só nos <b>anos 1920</b>, o astrônomo Edwin Hubble mediu a distância dela e mostrou que Andrômeda fica muito longe, fora da Via Láctea: é <b>outra galáxia</b>. De repente, o universo ficou muito maior!</p>`,
      `<p>Olhar Andrômeda é olhar o passado: a luz que chega hoje saiu de lá há 2,5 milhões de anos, quando os ancestrais bem antigos dos humanos andavam pela África.</p>
       <p>E ela está vindo na nossa direção, a uns <b>110 km por segundo</b>. Pelos cálculos mais conhecidos, as duas galáxias devem se juntar daqui a uns <b>4 a 5 bilhões de anos</b> (estudos novos ainda discutem se o encontro é certo). As estrelas ficam tão longe umas das outras que quase nenhuma vai bater.</p>`,
    ],
    quiz: [
      { q: 'O que é Andrômeda?', o: ['Uma estrela muito brilhante', 'Um planeta do Sistema Solar', 'A grande galáxia mais próxima da nossa'], a: 2, hint: 'Ela tem cerca de 1 trilhão de estrelas. Uma coisa com tantas estrelas é o quê?', why: 'Andrômeda é uma galáxia, com cerca de 1 trilhão de estrelas: a nossa grande vizinha.' },
      { q: 'Numa noite bem escura, como Andrômeda aparece a olho nu?', o: ['Como uma mancha fraquinha', 'Como uma bola grande e colorida', 'Não dá para ver sem telescópio'], a: 0, hint: 'Al-Sufi a chamou de "pequena nuvem". Por quê?', why: 'Ela aparece como uma mancha fraca, parecida com uma nuvenzinha. Por isso Al-Sufi a chamou de "pequena nuvem".' },
      { q: 'O que os astrônomos descobriram sobre Andrômeda nos anos 1920?', o: ['Que ela é uma nuvem de gás dentro da Via Láctea', 'Que ela é outra galáxia, muito longe da nossa', 'Que ela é uma estrela que explodiu'], a: 1, hint: 'Medindo a distância, viram que ela fica fora da Via Láctea.', why: 'Hubble mediu a distância e mostrou que Andrômeda fica muito fora da Via Láctea: é outra galáxia. O universo ficou bem maior.' },
      { q: 'A luz de Andrômeda leva 2,5 milhões de anos para chegar aqui. Quando essa luz saiu de lá, quem vivia na Terra?', o: ['Pessoas com celular', 'Os ancestrais bem antigos dos humanos', 'Os dinossauros'], a: 1, hint: 'Os dinossauros sumiram há uns 66 milhões de anos. E 2,5 milhões de anos é bem menos que isso.', why: 'Há 2,5 milhões de anos os dinossauros já tinham sumido havia muito tempo, e os humanos de hoje ainda não existiam. Viviam os ancestrais antigos dos humanos, na África.' },
      { q: 'Quando Andrômeda e a Via Láctea se juntarem, o que deve acontecer com as estrelas?', o: ['Quase todas vão bater umas nas outras e explodir', 'Todas vão cair dentro do Sol', 'Quase nenhuma vai bater, porque há muito espaço vazio entre elas'], a: 2, hint: 'Pense na distância entre as estrelas. A mais perto do Sol fica a mais de 4 anos-luz dele.', why: 'Entre uma estrela e outra há um espaço vazio enorme. Por isso, quando as galáxias se juntarem, quase nenhuma estrela vai bater: elas só vão mudar de caminho.' },
    ],
  }],

  site: {
    look: [0, 3, 1],
    intro: [
      { who: 'DR. KAMAL', t: 'Ahlan, {nome}! Sou o Dr. Kamal, arqueólogo. {{Bem-vindo|Bem-vinda}} a Gizé, a terra das pirâmides!' },
    ],
    lesson: {
      id: 'm17c', subject: 'HISTÓRIA · EGITO', title: 'Os observadores do Nilo',
      slides: [
        `<p>Ahlan! O <b>Egito</b> fica no norte da África. A capital é o <b>Cairo</b>, e lá se fala <b>árabe</b>. O rio <b>Nilo</b> atravessa o país: com uns 6.600 km, é um dos rios mais compridos do mundo, junto com o nosso Amazonas. Quase todo o povo do Egito vive perto dele, porque em volta é deserto.</p>`,
        `<p>As <b>pirâmides de Gizé</b> foram construídas há uns <b>4.500 anos</b>, como túmulos dos reis, os faraós. Os lados delas apontam quase certinho para os pontos cardeais: norte, sul, leste e oeste. Para isso, os construtores observavam o céu.</p>
         <p>Os antigos egípcios escreviam com desenhos: os <b>hieróglifos</b>.</p>`,
        `<p>Os egípcios criaram um calendário de <b>365 dias</b>: 12 meses de 30 dias, mais 5 dias de festa no fim. O ano novo era marcado pela estrela <b>Sírius</b>: quando ela voltava a aparecer antes do nascer do Sol, as cheias do Nilo estavam chegando.</p>
         <p>E muitos nomes de estrelas que a gente usa vêm da língua <b>árabe</b>: Aldebarã, Rigel, Betelgeuse...</p>`,
      ],
      quiz: [
        { q: 'Qual é a capital do Egito?', o: ['Gizé', 'Cairo', 'Alexandria', 'Nilo'], a: 1, hint: 'Gizé é onde ficam as pirâmides, e Nilo é o nome do rio. A capital é outra cidade.', why: 'A capital do Egito é o Cairo. Gizé fica bem pertinho dela.' },
        { q: 'Como se chama a escrita com desenhos dos antigos egípcios?', o: ['Algarismos romanos', 'Alfabeto', 'Hieróglifos'], a: 2, hint: 'O nome está no slide das pirâmides.', why: 'Hieróglifos: cada desenho podia ser uma ideia ou um som.' },
        { q: 'As pirâmides têm uns 4.500 anos. Quantos séculos é isso?', n: 45, calc: '4.500 ÷ 100 = ?', hint: '1 século = 100 anos. Dividir por 100 é cortar dois zeros.', why: '4.500 ÷ 100 = 45 séculos.' },
        { q: 'O que avisava os egípcios de que as cheias do rio Nilo estavam chegando?', o: ['A estrela Sírius voltando a aparecer antes do nascer do Sol', 'A Lua cheia', 'Os camelos ficando agitados'], a: 0, hint: 'Eles marcavam o ano novo olhando para uma estrela muito brilhante.', why: 'Quando Sírius voltava a aparecer de madrugada, antes do Sol, a cheia do Nilo estava perto. O céu e o rio marcavam o ano.' },
        { q: 'O calendário egípcio tinha 12 meses de 30 dias, mais alguns dias de festa no fim, para completar 365 dias. Quantos dias de festa?', n: 5, calc: '365 − 12 × 30 = ?', hint: 'Primeiro veja quantos dias têm os 12 meses: 12 × 30. Depois veja quanto falta para 365.', why: '12 × 30 = 360 dias. 365 − 360 = 5 dias de festa.' },
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
    { who: 'KDOK', t: 'Ela está vindo na direção da Via Láctea. Daqui a uns 4 a 5 bilhões de anos, as duas devem se abraçar.' },
    { who: 'KDOK', t: 'Quando alguém no Capão olha para Andrômeda, vê a luz que saiu daqui há 2,5 milhões de anos.' },
    { who: 'KDOK', t: 'Bip! O Zé chamou. Ele disse: "Chegou a hora. Volte para o Capão. A última missão começa em casa."' },
  ],
  card: { id: 'andromeda', name: 'GALÁXIA DE ANDRÔMEDA', lines: ['Grande galáxia mais próxima', 'Distância: 2,5 milhões de anos-luz', 'Cerca de 1 trilhão de estrelas', 'Deve se juntar à Via Láctea no futuro', 'Dá para ver a olho nu, como mancha fraca'] },
  reward: { id: 'antena', name: 'ANTENA DO ZÉ', desc: 'O Zé do Rádio montou uma antena especial na nave. Com ela, dá para ouvir o sinal com toda a clareza.' },
  radio: 'Aqui é a Astrokdok! Dizer que o céu do Capão parece um mar de estrelas é fazer uma comparação, e poesia também é conhecimento. A última missão sai daqui do Capão, e a equipe inteira vai estar lá. Câmbio!',
  real: 'Escreva uma metáfora sobre o céu do Capão à noite. Exemplo: "O céu do Capão é um tapete de pipocas brilhantes."',

  chat: {
    yuki: 'Em japonês, Andrômeda é Andoromeda. Às vezes o japonês é fácil!',
    lia: 'Quando Andrômeda e a Via Láctea se juntarem, os cientistas já têm um apelido pra nova galáxia: Láctomeda!',
    tomas: 'Metáfora: minha barriga é um buraco negro. Comparação: minha barriga parece um buraco negro. As duas são verdade.',
    bia: 'Última missão chegando. Revisei a nave três vezes. O parafuso que sempre sobra, eu guardei de lembrança.',
    caio: 'Andrômeda vem pra cá a 110 km por segundo. Ainda bem que demora. Dá tempo de dormir.',
    rival: '{nome}, valeu por me levar junto no buraco negro! Eu gritei o caminho todo, mas foi de alegria. Quase toda. Hoje eu cuido do rádio e torço daqui.',
    kdok: 'Bip! Uma galáxia inteira indo de encontro à outra. É o maior abraço do universo.',
    ze: 'A antena está pronta. Na última missão, você vai ouvir o sinal como eu ouço. Sem chiado de dúvida.',
  },
};
