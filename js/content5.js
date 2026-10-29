'use strict';
// MISSÃO 5: VÊNUS · lançamento de Manaus (AM)
A.MISSIONS[4] = {
  n: 5, name: 'VÊNUS', goal: 'soltar uma sonda-balão nas nuvens de Vênus',
  place: 'MANAUS', where: 'Manaus, Amazonas, Brasil', scene: 'manaus', game: 'venus', body: 'venus', room: 'biblio',

  brief: [
    { who: 'CMTE. DOZINHO', t: 'Piloto. O sinal continua. Mercúrio não era a origem.' },
    { who: 'CMTE. DOZINHO', t: 'Missão 5: VÊNUS, o planeta mais quente. Pousar lá é impossível: vamos soltar uma sonda-balão nas nuvens.' },
    { who: 'CMTE. DOZINHO', t: 'A aula hoje é na BIBLIOTECA da escola. Depois, fale comigo.' },
  ],
  ready: [
    { who: 'CMTE. DOZINHO', t: 'Aulas concluídas. Voltamos ao Brasil: o lançamento será em Manaus, no meio da Floresta Amazônica.' },
  ],
  teacher: [
    'Boas-vindas à biblioteca, turma! Hoje é PORTUGUÊS: as CLASSES DE PALAVRAS. Substantivo, adjetivo, verbo e advérbio: cada palavra tem um trabalho na frase.',
    'Agora, a aula da missão de {nome}: VÊNUS, o planeta mais quente de todos!',
  ],
  after: 'Ótimo, {nome}! Pode ir falar com o Comandante.',

  lessons: [{
    id: 'm5a', subject: 'PORTUGUÊS', title: 'Classes de palavras',
    slides: [
      `<p>Numa frase, cada palavra tem um <b>trabalho</b>. Palavras com o mesmo trabalho formam uma <b>classe</b>. Vamos ver quatro delas.</p>
       <p><b>Substantivo</b> é a palavra que dá <b>nome</b>: a pessoas, bichos, coisas, lugares e sentimentos. Exemplos: <i>planeta, nave, saudade, Vênus, Manaus</i>. Nome de um lugar ou pessoa específica, como <i>Vênus</i>, é substantivo <b>próprio</b> e começa com letra maiúscula. Os outros são <b>comuns</b>.</p>
       <p><b>Adjetivo</b> é a palavra que dá uma <b>característica</b> ao substantivo: <i>planeta <b>quente</b>, nave <b>rápida</b>, floresta <b>verde</b></i>.</p>`,
      `<p><b>Verbo</b> é a palavra da <b>ação</b> (correr, brilhar, girar), do <b>estado</b> (ser, estar, ficar) ou de um <b>fenômeno da natureza</b> (chover, ventar). O verbo muda com o tempo:</p>
       <div class="calc">ontem:  a nave brilhou
hoje:   a nave brilha
amanhã: a nave brilhará</div><p><b>Advérbio</b> é a palavra que muda o sentido do <b>verbo</b>, de um adjetivo ou de outro advérbio. Ele diz <b>quando</b> (hoje, ontem), <b>onde</b> (aqui, lá), <b>como</b> (devagar, rapidamente), <b>quanto</b> (muito, pouco) ou nega (não).</p>`,
      `<p>Veja todas juntas numa frase:</p>
       <div class="calc">"A sonda pequena desceu devagar."

sonda   → substantivo
pequena → adjetivo
desceu  → verbo
devagar → advérbio</div><p><b>Truque:</b> o adjetivo anda junto do substantivo e diz <b>como ele é</b>. O advérbio anda junto do verbo e diz <b>como, quando ou onde a ação aconteceu</b>.</p>
       <p><b>Erro comum:</b> em "Vênus é <b>muito</b> quente", a palavra <i>quente</i> é adjetivo (característica de Vênus) e <i>muito</i> é advérbio: ela aumenta a força do adjetivo.</p>`,
    ],
    quiz: [
      { q: 'Na frase "Vênus brilha no céu", qual palavra é um VERBO?', o: ['Vênus', 'céu', 'brilha'], a: 2, hint: 'Procure a palavra que diz a AÇÃO, o que Vênus faz.', why: '"Brilha" é a ação: é o verbo. "Vênus" e "céu" dão nome às coisas: são substantivos.' },
      { q: 'Qual destas palavras é um ADJETIVO?', o: ['planeta', 'quente', 'girar', 'ontem'], a: 1, hint: 'O adjetivo dá uma característica. Qual palavra diz como uma coisa é?', why: '"Quente" é característica: planeta quente. "Planeta" é substantivo, "girar" é verbo e "ontem" é advérbio.' },
      { q: 'Na frase "As nuvens amarelas cobrem Vênus", qual palavra é um ADJETIVO?', o: ['nuvens', 'cobrem', 'Vênus', 'amarelas'], a: 3, hint: 'Qual palavra diz COMO são as nuvens?', why: '"Amarelas" é a característica das nuvens: é adjetivo. "Nuvens" e "Vênus" são substantivos, e "cobrem" é verbo.' },
      { q: 'Na frase "A sonda desceu lentamente", a palavra "lentamente" é:', o: ['advérbio', 'adjetivo', 'substantivo', 'verbo'], a: 0, hint: 'Ela diz COMO a sonda desceu. Ela está ligada ao verbo ou ao substantivo?', why: '"Lentamente" diz como foi a ação de descer: muda o sentido do verbo. É advérbio de modo.' },
      { q: 'Na frase "Hoje a nave voou muito", as palavras "hoje" e "muito" são:', o: ['adjetivos', 'substantivos', 'advérbios', 'verbos'], a: 2, hint: '"Hoje" diz QUANDO a nave voou. "Muito" diz QUANTO. Que classe faz esse trabalho?', why: '"Hoje" é advérbio de tempo e "muito" é advérbio de intensidade. Os dois mudam o sentido da ação de voar.' },
      { q: 'Em qual frase a palavra "rápido" é um ADVÉRBIO?', o: ['O foguete rápido decolou.', 'Mercúrio é um planeta rápido.', 'A sonda desceu rápido.'], a: 2, hint: 'Quando "rápido" diz como é uma coisa, é adjetivo. Quando diz como a ação aconteceu, é advérbio. Em qual frase ele está ligado ao verbo?', why: 'Em "a sonda desceu rápido", a palavra diz como ela desceu: é o mesmo que "rapidamente", um advérbio. Nas outras, "rápido" é característica do foguete e do planeta: adjetivo.' },
    ],
  }, {
    id: 'm5b', subject: 'ASTRONOMIA', title: 'Vênus, o planeta estufa',
    slides: [
      `<p><b>Vênus</b> é o segundo planeta a partir do Sol e é quase do mesmo tamanho da Terra. Por isso é chamado de <b>gêmeo da Terra</b>. Mas é um lugar terrível!</p>
       <p>O chão chega a <b>465 °C</b>, quente o bastante para derreter chumbo. É o planeta <b>mais quente</b> do Sistema Solar, mais até que Mercúrio, que fica mais perto do Sol.</p>`,
      `<p>Por que tão quente? Por causa do <b>efeito estufa</b>. O ar de Vênus é muito grosso e cheio de <b>gás carbônico</b>. A luz do Sol entra, esquenta o chão, e o calor não consegue sair: fica preso, como dentro de um carro fechado no sol.</p>
       <p>As nuvens de Vênus são de <b>ácido</b>, e o ar pesa tanto que a pressão lá embaixo é umas <b>90 vezes</b> a da Terra: amassaria uma nave como uma latinha.</p>`,
      `<p>Vênus gira <b>ao contrário</b> da Terra: lá o Sol nasce no <b>oeste</b> e se põe no leste! E gira muito devagar: leva <b>243 dias</b> para dar um giro completo em torno de si mesmo. A volta no Sol, o ano dele, leva <b>225 dias</b>. O giro demora mais que o ano!</p>
       <p>Depois do Sol e da Lua, Vênus é o ponto mais brilhante do céu. A <b>"Estrela d'Alva"</b>, que brilha forte de manhãzinha ou no fim da tarde, não é uma estrela: é o planeta Vênus, refletindo a luz do Sol.</p>`,
    ],
    quiz: [
      { q: 'Qual é o planeta MAIS QUENTE do Sistema Solar?', o: ['Mercúrio', 'Marte', 'Vênus', 'Júpiter'], a: 2, hint: 'Não é o mais perto do Sol. É o planeta desta missão, o do efeito estufa.', why: 'Vênus chega a 465 °C, por causa do efeito estufa. Mercúrio fica mais perto do Sol, mas chega "só" a 430 °C.' },
      { q: 'A "Estrela d\'Alva", que brilha forte de manhãzinha, na verdade é:', o: ['uma estrela gigante', 'o planeta Vênus', 'um satélite', 'a Lua'], a: 1, hint: 'Ela não tem luz própria: reflete a luz do Sol. É um planeta vizinho da Terra.', why: 'É Vênus, refletindo a luz do Sol. Depois do Sol e da Lua, é o ponto mais brilhante do céu.' },
      { q: 'O que deixa Vênus tão quente?', o: ['Estar mais perto do Sol que Mercúrio', 'Vulcões de lava em todo lugar', 'Ter muitas luas', 'O efeito estufa: o ar grosso prende o calor'], a: 3, hint: 'Lembre do carro fechado no sol. O que acontece com o calor?', why: 'O ar de Vênus, cheio de gás carbônico, funciona como um cobertor que não deixa o calor sair. Vênus nem é o planeta mais perto do Sol.' },
      { q: 'Em Vênus, o Sol nasce de que lado?', o: ['No leste, como na Terra', 'No oeste, porque Vênus gira ao contrário', 'Não nasce: Vênus não gira'], a: 1, hint: 'Na Terra, o Sol nasce no leste. Vênus gira para o lado oposto.', why: 'Vênus gira ao contrário da Terra, então lá o Sol nasce no oeste e se põe no leste.' },
      { q: 'Vênus leva 243 dias para dar um giro completo em torno de si mesmo e 225 dias para dar a volta no Sol. Quantos dias o giro demora A MAIS que o ano?', n: 18, calc: '243 − 225 = ?', hint: 'O giro é o número maior. Tire o ano do giro: 243 − 225.', why: '243 − 225 = 18 dias. Em Vênus, um giro demora mais que o ano inteiro!' },
    ],
  }],

  site: {
    look: [0, 2, 1],
    intro: [
      { who: 'DONA IARA', t: 'Olá, {nome}! Sou a Dona Iara, bióloga da floresta. {{Bem-vindo|Bem-vinda}} a Manaus, no coração da Amazônia!' },
    ],
    lesson: {
      id: 'm5c', subject: 'GEOGRAFIA · AMAZONAS', title: 'A floresta que cuida do clima',
      slides: [
        `<p><b>Manaus</b> é a capital do estado do <b>Amazonas</b>, na região <b>Norte</b> do Brasil. Ela fica no meio da <b>Floresta Amazônica</b>, a maior floresta tropical do mundo. A maior parte dela fica no Brasil.</p>
         <p>O <b>Teatro Amazonas</b>, com sua cúpula colorida, foi inaugurado em <b>1896</b>, na época em que a região ficou rica vendendo borracha.</p>
         <p>Aqui o relógio é diferente: Manaus fica <b>1 hora atrás</b> de Brasília. Quando em Brasília são 10 h, em Manaus são 9 h.</p>`,
        `<p>Perto de Manaus acontece o <b>Encontro das Águas</b>: o <b>Rio Negro</b>, de água escura, e o <b>Rio Solimões</b>, de água barrenta, correm lado a lado por quilômetros <b>sem se misturar</b>!</p>
         <p>Isso acontece porque as águas têm temperatura, velocidade e peso diferentes. Depois, juntas, elas formam o grande <b>Rio Amazonas</b>.</p>`,
        `<p>As árvores <b>absorvem gás carbônico</b> do ar para crescer e guardam o carbono no tronco, nos galhos e nas folhas. Assim, a floresta ajuda a controlar o <b>efeito estufa</b> da Terra.</p>
         <p>Quando a floresta é derrubada ou queimada, esse gás volta para o ar e o planeta esquenta mais. Vênus é o exemplo do que acontece quando o efeito estufa sai do controle. Cuidar da floresta é cuidar do planeta.</p>`,
      ],
      quiz: [
        { q: 'Manaus é a capital de qual estado?', o: ['Pará', 'Acre', 'Amazonas', 'Roraima'], a: 2, hint: 'O estado tem o mesmo nome do grande rio e da floresta.', why: 'Manaus é a capital do Amazonas, na região Norte.' },
        { q: 'A Floresta Amazônica é:', o: ['um deserto', 'a maior floresta tropical do mundo', 'uma cadeia de montanhas', 'uma floresta pequena'], a: 1, hint: 'Ela é famosa no mundo inteiro pelo tamanho.', why: 'É a maior floresta tropical do mundo, e a maior parte dela fica no Brasil.' },
        { q: 'O que é o Encontro das Águas?', o: ['Uma cachoeira', 'Uma festa do rio', 'Um lago sem saída', 'Dois rios que correm juntos sem se misturar por quilômetros'], a: 3, hint: 'Lembre das cores: um rio escuro e outro barrento, lado a lado.', why: 'O Rio Negro e o Solimões correm lado a lado sem se misturar, porque as águas são diferentes. Depois formam o Rio Amazonas.' },
        { q: 'As árvores ajudam a combater o efeito estufa porque:', o: ['fazem sombra', 'esfriam os rios', 'absorvem gás carbônico do ar', 'atraem chuva de pedra'], a: 2, hint: 'Que gás deixa Vênus tão quente? As árvores usam esse gás para crescer.', why: 'Elas tiram gás carbônico do ar para crescer e guardam o carbono no corpo delas. Menos gás no ar, menos calor preso.' },
        { q: 'Um avião sai de Brasília às 10 h, na hora de Brasília, e voa 3 horas até Manaus. Que horas são em Manaus quando ele pousa?', n: 12, hint: 'Primeiro some a viagem: 10 + 3 dá a hora em Brasília. Depois lembre que Manaus fica 1 hora atrás.', why: '10 + 3 = 13 h em Brasília. Manaus está 1 hora atrás: 13 − 1 = 12 h.' },
      ],
    },
    outro: [
      { who: 'DONA IARA', t: 'Boa viagem! E lá de cima, repare como a nossa floresta é verde. Em Vênus não tem nada disso.' },
    ],
  },

  gameIntro: [
    { who: 'KDOK', t: 'Bip! Vamos soltar a sonda-balão nas nuvens de Vênus, a 50 km de altura.' },
    { who: 'KDOK', t: 'SEGURE A para subir. SOLTE para descer. Passe pelas brechas das nuvens de ácido!' },
    { who: 'KDOK', t: 'Pegue os pacotes de dados que brilham. Precisamos de 8.' },
  ],

  debrief: [
    { who: 'KDOK', t: 'DADOS COLETADOS! A sonda flutuou onde a pressão e a temperatura de Vênus são quase como as da Terra.' },
    { who: 'KDOK', t: 'Lá embaixo, o chão tem 465 °C e a pressão amassaria a nave como uma latinha.' },
    { who: 'KDOK', t: 'Vênus é quase do tamanho da Terra. Um planeta gêmeo que deu muito errado.' },
    { who: 'KDOK', t: 'Bip! O sinal apareceu de novo. Igualzinho. Ele também não vem daqui.' },
  ],
  card: { id: 'venus', name: 'VÊNUS', lines: ['Segundo planeta a partir do Sol', 'Temperatura: 465 °C (o mais quente)', 'Gira ao contrário: o Sol nasce no oeste', 'Um giro (243 dias) demora mais que o ano (225)', 'Nuvens de ácido'] },
  reward: { id: 'casco', name: 'CASCO ANTIÁCIDO', desc: 'Uma camada que protege a nave de ácido e poeira. Em Marte, vale um escudo a mais.' },
  radio: 'Aqui é a Astrokdok! Substantivo, adjetivo, verbo... parece lista de decorar, né? Mas é com elas que a gente descreve um planeta inteiro em poucas palavras. Dá uma chance, que vale a pena. Câmbio!',
  real: 'Deixe dois copos com água no sol, um coberto com plástico transparente e outro não. Depois de 1 hora, coloque o dedo: qual ficou mais quente? Esse é o efeito estufa em miniatura!',

  chat: {
    lia: 'Vênus brilha tanto que já teve gente achando que era disco voador!',
    tomas: 'Nuvens de ácido? Então lá não dá pra fazer piquenique.',
    bia: 'Se a pressão lá é 90 vezes a daqui, o Calhambeque vira panqueca. Vai de balão!',
    caio: 'Em Vênus um giro demora mais que o ano. Imagina esperar 243 dias pelo fim de semana.',
    rival: 'Vênus tem 465 graus? Leva protetor solar fator um milhão, {nome}! Eu fico aqui torcendo e guardando o seu lugar na biblioteca.',
    kdok: 'Bip! Liguei o rádio da base no sinal. Ele faz um chiado: shhhhhh. Muito misterioso.',
    ze: 'O sinal vem do céu inteiro ao mesmo tempo. Nunca vi coisa assim. Quer dizer... acho que já vi.',
  },
};
