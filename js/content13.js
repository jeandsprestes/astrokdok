'use strict';
// MISSÃO 13: PRÓXIMA CENTAURI · lançamento da Austrália
A.MISSIONS[12] = {
  n: 13, name: 'PRÓXIMA CENTAURI', goal: 'viajar até a estrela mais próxima do Sol',
  place: 'AUSTRÁLIA', where: 'Uluru, Austrália', scene: 'australia', game: 'proxima', body: 'proxima', room: 'patio',

  brief: [
    { who: 'CMTE. DOZINHO', t: '{{Conselheiro|Conselheira}} {nome}. Os planetas acabaram. Agora começam as ESTRELAS.' },
    { who: 'CMTE. DOZINHO', t: 'Missão 13: PRÓXIMA CENTAURI, a estrela mais perto do Sol. A luz leva mais de 4 anos para vir de lá.' },
    { who: 'CMTE. DOZINHO', t: 'A Vela a Laser vai ser empurrada por raios da Terra. Hoje a aula é no PÁTIO, ao ar livre.' },
  ],
  ready: [
    { who: 'CMTE. DOZINHO', t: 'Aulas concluídas. O lançamento será na Austrália, onde o céu do Sul é um dos mais bonitos do mundo.' },
  ],
  teacher: [
    'Todos no pátio! Hoje é HISTÓRIA: vamos montar uma linha do tempo, dos séculos até a República do Brasil.',
    'Agora, a aula de ASTRONOMIA da missão de {nome}: PRÓXIMA CENTAURI, a nossa estrela vizinha! Vamos medir o espaço com a régua da luz: o ano-luz.',
  ],
  after: 'Muito bem, {nome}! O Comandante está esperando.',

  lessons: [{
    id: 'm13a', subject: 'HISTÓRIA', title: 'A linha do tempo',
    slides: [
      `<p>A <b>linha do tempo</b> põe os fatos na ordem em que aconteceram. Para contar períodos longos, a gente usa o <b>século</b>: um bloco de <b>100 anos</b>. Os séculos são escritos em números romanos: I = 1, V = 5, X = 10.</p>
       <div class="calc">século I   → anos 1 a 100
século XV  → anos 1401 a 1500
século XIX → anos 1801 a 1900
século XXI → anos 2001 a 2100</div><p><b>Truque:</b> tire os dois últimos algarismos do ano e some 1. 1822 → 18 + 1 = 19, século XIX. Se o ano terminar em 00, não some nada: 1500 é o último ano do século XV.</p>`,
      `<p>No calendário que a gente usa, o ano 1 marca o nascimento de Jesus Cristo, segundo a tradição. O que veio antes é <b>a.C.</b> (antes de Cristo) e se conta <b>para trás</b>. O que veio depois é <b>d.C.</b> (depois de Cristo), e quase sempre nem se escreve.</p>
       <div class="calc">2500 a.C.  pirâmides do Egito
 600 a.C.  Tales, na Grécia
   1       começo da contagem
1500       portugueses no Brasil
2026       hoje

pirâmides até Tales:
2500 − 600 = 1900 anos</div><p>Em a.C., quanto <b>maior</b> o número, mais <b>antigo</b>. E não existe ano zero: do ano 1 a.C. se pula direto para o ano 1 d.C.</p>`,
      `<p>Os povos indígenas vivem no Brasil há mais de 10 mil anos. Depois que os portugueses chegaram, em 1500, a história do país costuma ser dividida em três grandes períodos:</p>
       <div class="calc">COLÔNIA    1500 a 1822
  Portugal manda no Brasil
  Salvador é a capital
  de 1549 a 1763
IMPÉRIO    1822 a 1889
  o Brasil tem imperador
  1888: Lei Áurea, fim
  da escravidão
REPÚBLICA  1889 até hoje
  presidente no lugar de imperador</div><p>Cada período começa com um fato: em 1822, a <b>Independência</b>; em 1889, a <b>Proclamação da República</b>. Aqui na Bahia, a luta pela independência só terminou em <b>2 de julho de 1823</b>.</p>`,
      `<p>A <b>Lei Áurea</b>, de 1888, acabou oficialmente com a escravidão. Mas a liberdade não veio de presente: veio de mais de 300 anos de <b>luta das pessoas escravizadas</b>.</p>
       <p>Muitas fugiam e formavam <b>quilombos</b>, comunidades livres, como <b>Palmares</b>, de <b>Zumbi</b> e, segundo a tradição, <b>Dandara</b>. Outras se revoltavam, como na <b>Revolta dos Malês</b>, em Salvador, em 1835. E o baiano <b>Luís Gama</b> nasceu livre, foi vendido como escravo aos 10 anos, provou que era livre e passou a defender pessoas escravizadas na Justiça.</p>
       <p>O dia <b>20 de novembro</b>, Dia da Consciência Negra, lembra Zumbi dos Palmares.</p>`,
    ],
    quiz: [
      { q: 'A Independência do Brasil foi em 1822. Esse ano fica em qual século?', o: ['século XVIII', 'século XIX', 'século XX', 'século XXI'], a: 1, hint: 'Tire os dois últimos algarismos (18) e some 1. Depois escreva em romano: X = 10, V = 5, I = 1.', why: '18 + 1 = 19, século XIX: os anos de 1801 a 1900.' },
      { q: 'Qual é a ordem certa dos períodos da história do Brasil, do mais antigo para o mais novo?', o: ['Colônia, Império, República', 'República, Colônia, Império', 'Império, Colônia, República'], a: 0, hint: 'Primeiro o Brasil era de Portugal. Depois teve imperador. Hoje tem presidente.', why: 'Colônia (1500 a 1822), Império (1822 a 1889) e República (de 1889 até hoje).' },
      { q: 'O Império começou com a Independência, em 1822, e acabou com a Proclamação da República, em 1889. Quantos anos durou o Império?', n: 67, calc: '1889 − 1822 = ?', hint: 'Para saber quanto tempo passou entre dois anos, tire o menor do maior: 1889 − 1822.', why: '1889 − 1822 = 67 anos de Império.' },
      { q: 'As grandes pirâmides do Egito foram feitas por volta de 2500 a.C. Por volta de 250 a.C., o grego Aristarco disse que a Terra gira em volta do Sol. Quantos anos separam os dois fatos?', n: 2250, calc: '2500 − 250 = ?', hint: 'Os dois anos são a.C., então se conta para trás. A distância entre eles é o maior menos o menor.', why: '2500 − 250 = 2250 anos. As pirâmides são mais antigas, porque em a.C. o número maior vem antes.' },
      { q: 'Salvador foi a primeira capital do Brasil, de 1549 até 1763, quando a capital passou para o Rio de Janeiro. Por quantos anos Salvador foi a capital?', n: 214, calc: '1763 − 1549 = ?', hint: 'Tire o ano do começo do ano do fim: 1763 − 1549. Faça por partes: 1763 − 1500 e depois tire 49.', why: '1763 − 1549 = 214 anos. Salvador foi a capital por mais de dois séculos.' },
      { q: 'Os portugueses chegaram ao Brasil em 1500. Esse ano fica em qual século?', o: ['século XVI', 'século XIV', 'século XV'], a: 2, hint: 'Cuidado com o ano que termina em 00. O século XV vai de 1401 até 1500, e o XVI só começa em 1501.', why: '1500 é o último ano do século XV. Quando o ano termina em 00, não se soma 1: 15, século XV.' },
    ],
  }, {
    id: 'm13b', subject: 'ASTRONOMIA', title: 'A estrela vizinha',
    slides: [
      `<p>As estrelas ficam tão longe que o quilômetro fica pequeno demais. Por isso existe o <b>ano-luz</b>. Atenção: ano-luz <b>não é tempo</b>, é <b>distância</b>. É o quanto a luz anda em 1 ano.</p>
       <div class="calc">luz: 300.000 km por segundo
1 ano-luz = uns 9,5 trilhões de km

Próxima Centauri: 4,2 anos-luz
= uns 40 trilhões de km</div><p>Próxima Centauri é a estrela mais perto do Sol. A luz dela leva uns 4 anos para chegar aqui: quando você olha para ela, vê como ela era 4 anos atrás. Olhar para o céu é olhar para o passado!</p>`,
      `<p>Próxima é uma <b>anã-vermelha</b>: menor, mais fria e mais fraca que o Sol. Tão fraquinha que só dá para ver com telescópio. Ela tem pelo menos um planeta, o <b>Próxima b</b>, descoberto em 2016.</p>
       <p>Ela faz parte de um trio. As outras duas, <b>Alfa Centauri A e B</b>, são estrelas parecidas com o Sol (a B é um pouco menor e mais alaranjada) e, juntas, aparecem como um ponto só, muito brilhante. No céu do Brasil, Alfa e Beta Centauri são as duas estrelas que apontam para o <b>Cruzeiro do Sul</b>.</p>`,
      `<p>Dá para chegar lá? A sonda <b>Voyager 1</b>, lançada em 1977, é uma das naves mais rápidas já feitas: uns 17 km por segundo. Parece muito, mas perto da luz é quase nada.</p>
       <div class="calc">luz:       300.000 km/s
Voyager 1:      17 km/s

Voyager até a Próxima:
uns 75 mil anos</div><p>Cientistas estudam <b>velas a laser</b>: velas finíssimas, empurradas por raios de luz da Terra, que poderiam chegar lá em uns 20 anos. A regra é simples: metade da velocidade, o dobro do tempo.</p>`,
    ],
    quiz: [
      { q: 'Um ano-luz é:', o: ['um ano muito iluminado', 'o tempo que a Lua leva para dar uma volta', 'a distância que a luz anda em um ano', 'um tipo de estrela'], a: 2, hint: 'A palavra "ano" engana. Pense no que a luz faz durante esse ano inteiro: ela anda.', why: 'Ano-luz é distância: o quanto a luz anda em 1 ano, uns 9,5 trilhões de km.' },
      { q: 'Próxima Centauri é uma anã-vermelha. Isso quer dizer que ela é:', o: ['maior e mais quente que o Sol', 'menor e mais fria que o Sol', 'um planeta vermelho', 'um buraco negro'], a: 1, hint: '"Anã" quer dizer pequena. E a cor vermelha, nas estrelas, mostra que ela é mais fria.', why: 'Anã-vermelha é uma estrela pequena, fria e fraca, tanto que só aparece no telescópio.' },
      { q: 'A luz de Próxima Centauri leva uns 4 anos para chegar aqui. Uma nave com a METADE da velocidade da luz levaria quantos anos?', n: 8, calc: '4 × 2 = ?', hint: 'Mais devagar, mais tempo. Metade da velocidade, o dobro do tempo.', why: '4 × 2 = 8 anos. Andando na metade da velocidade, a viagem demora o dobro.' },
      { q: 'A Voyager 1 levaria uns 75 mil anos para chegar à Próxima. Quantos séculos são? (1 século = 100 anos)', n: 750, calc: '75.000 ÷ 100 = ?', hint: 'Dividir por 100 é cortar dois zeros do fim.', why: '75.000 ÷ 100 = 750 séculos. Toda a história do Brasil desde 1500 tem só uns 5 séculos!' },
      { q: 'A luz de Próxima Centauri leva uns 4 anos para chegar aqui. Se {nome} olhar para ela num telescópio em 2026, vai ver a luz que saiu de lá em que ano?', n: 2022, calc: '2026 − 4 = ?', hint: 'A luz que chega hoje saiu de lá alguns anos atrás. Volte 4 anos a partir de 2026.', why: '2026 − 4 = 2022. A gente vê a estrela como ela era quando a luz saiu de lá.' },
    ],
  }],

  site: {
    look: [0, 3, 1],
    intro: [
      { who: 'DRA. KIRRA', t: 'G\'day, {nome}! Sou a Dra. Kirra, astrônoma. Minha família aborígene olha este céu há milhares de anos.' },
    ],
    lesson: {
      id: 'm13c', subject: 'GEOGRAFIA · AUSTRÁLIA', title: 'O céu do Sul',
      slides: [
        `<p>A <b>Austrália</b> fica na Oceania e é tão grande que é chamada de <b>país-continente</b>. A capital é <b>Canberra</b>, e não Sydney, que é a maior cidade. É a terra dos cangurus e dos coalas.</p>
         <div class="calc">Austrália: uns 7,7 milhões de km²
Brasil:    uns 8,5 milhões de km²</div><p>Como o Brasil, ela fica no <b>hemisfério Sul</b>. Por isso as estações são iguais nos dois: quando é verão aqui, é verão lá. O Natal deles também é no calor!</p>`,
        `<p>Os povos <b>aborígenes</b> vivem na Austrália há mais de 50 mil anos (talvez uns 65 mil): uma das culturas mais antigas do mundo. Eles olham o céu de um jeito próprio.</p>
         <p>Uma das constelações deles é o <b>Emu no Céu</b>. O emu é uma ave grande, parecida com a ema. Ele não é desenhado pelas estrelas, e sim pelas <b>manchas escuras</b> de poeira da Via Láctea. A cabeça fica bem perto do Cruzeiro do Sul.</p>`,
        `<p>O <b>Cruzeiro do Sul</b> só aparece bem no céu do hemisfério Sul. Ele está na bandeira da Austrália e também na <b>bandeira do Brasil</b>.</p>
         <p>Estamos em <b>Uluru</b>, uma rocha enorme, vermelha, no meio do deserto, bem no centro do país. Ela tem 348 m de altura e é um lugar <b>sagrado</b> para o povo aborígene da região, os Anangu.</p>`,
      ],
      quiz: [
        { q: 'Qual é a capital da Austrália?', o: ['Sydney', 'Canberra', 'Melbourne', 'Uluru'], a: 1, hint: 'Não é a maior cidade. É uma cidade planejada para ser a capital, como Brasília.', why: 'Canberra. Sydney é a maior cidade, mas não é a capital.' },
        { q: 'Que constelação aparece na bandeira da Austrália e também na do Brasil?', o: ['Órion', 'Escorpião', 'Ursa Maior', 'Cruzeiro do Sul'], a: 3, hint: 'É uma constelação em forma de cruz, que só se vê bem no céu do Sul.', why: 'O Cruzeiro do Sul, a constelação mais famosa do hemisfério Sul.' },
        { q: 'O "Emu no Céu" dos povos aborígenes é formado:', o: ['por estrelas amarelas', 'por nuvens de chuva', 'pelas manchas escuras da Via Láctea', 'pela Lua'], a: 2, hint: 'Ele é diferente das constelações que a gente conhece. Ele não liga estrelas: usa o escuro entre elas.', why: 'O emu é desenhado pelas manchas escuras de poeira da Via Láctea, entre as estrelas.' },
        { q: 'Em dezembro é verão no Brasil. E na Austrália, em dezembro, é:', o: ['verão também', 'inverno', 'outono'], a: 0, hint: 'Os dois países ficam no mesmo hemisfério, o Sul.', why: 'Brasil e Austrália ficam no hemisfério Sul, então as estações são as mesmas na mesma época.' },
        { q: 'O Brasil tem uns 8,5 milhões de km², e a Austrália, uns 7,7 milhões de km². Quantos MIL km² o Brasil tem a mais?', n: 800, calc: '8.500 mil − 7.700 mil = ? mil', hint: 'Escreva em milhares: 8,5 milhões são 8.500 mil, e 7,7 milhões são 7.700 mil. Agora tire um do outro.', why: '8.500 − 7.700 = 800. O Brasil tem uns 800 mil km² a mais: os dois são gigantes, mas o Brasil é maior.' },
      ],
    },
    outro: [
      { who: 'DRA. KIRRA', t: 'Boa viagem! Quando olhar para trás, procure o Sol: lá de longe, ele vai parecer só mais uma estrelinha.' },
    ],
  },

  gameIntro: [
    { who: 'KDOK', t: 'Bip! Os lasers da Terra vão empurrar a Vela em PULSOS. Cada pulso desce pela faixa.' },
    { who: 'KDOK', t: 'Aperte A quando o pulso passar pela linha amarela. Pulsos com seta: aperte ◀ ou ▶!' },
    { who: 'KDOK', t: 'Acertos aceleram a nave. Enche a barra de velocidade e a gente chega!' },
  ],

  debrief: [
    { who: 'KDOK', t: 'CHEGAMOS A OUTRA ESTRELA! Próxima Centauri, a vizinha do Sol.' },
    { who: 'KDOK', t: 'Ela é pequena, fria e avermelhada. E aquele pontinho ali é o planeta Próxima b.' },
    { who: 'KDOK', t: 'A luz dela leva 4 anos para chegar na Terra. Quem olha pra ela de lá, vê como ela era 4 anos atrás!' },
    { who: 'KDOK', t: 'Bip... o sinal está aqui também. Igualzinho. Ele não pertence a estrela nenhuma.' },
  ],
  card: { id: 'proxima', name: 'PRÓXIMA CENTAURI', lines: ['Estrela mais próxima do Sol', 'Distância: 4,2 anos-luz', 'Tipo: anã-vermelha', 'Tem um planeta: Próxima b', 'Só dá para ver com telescópio'] },
  reward: { id: 'mapa', name: 'MAPA ESTELAR', desc: 'Um mapa das estrelas próximas. Em Órion, dá mais tempo para ligar as estrelas.' },
  radio: 'Aqui é a Astrokdok! História não é só data pra decorar: é a gente entendendo como chegou até aqui. Toda viagem fica melhor quando a gente sabe de onde veio. Câmbio!',
  real: 'Numa noite sem nuvens, procure o Cruzeiro do Sul. Do lado dele, duas estrelas brilhantes apontam para a cruz: uma delas é Alfa Centauri, vizinha da Próxima!',

  chat: {
    yuki: 'No Japão, além dos séculos, os anos também são contados por eras. A era de agora se chama Reiwa e começou em 2019!',
    lia: 'O Cruzeiro do Sul está na bandeira do Brasil. Cada estrela da bandeira representa um estado ou o Distrito Federal!',
    tomas: 'Velocidade da luz? Eu sou a velocidade do lanche.',
    bia: 'A vela a laser é mais fina que um fio de cabelo. {rival} já pediu um pedacinho pra pendurar no quarto.',
    caio: 'Ano-luz não é tempo, é distância. Aprendi isso e depois dormi. Mas aprendi.',
    rival: 'Ei, {nome}! Fiz um cartaz pra torcer por você: PRÓXIMA PARADA, PRÓXIMA CENTAURI. Entendeu o trocadilho? Me conta tudo quando voltar!',
    kdok: 'Bip! 4 anos-luz! Meus parafusos estão tremendo de emoção. Ou de frio.',
    ze: 'Descobrimos mais uma coisa: o sinal é mais velho que as estrelas. Muito, muito mais velho.',
  },
};
