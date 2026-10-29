'use strict';
// MISSÃO 8: JÚPITER · lançamento de Kourou (Guiana Francesa)
A.MISSIONS[7] = {
  n: 8, name: 'JÚPITER', goal: 'registrar as 4 luas que Galileu viu',
  place: 'GUIANA FRANCESA', where: 'Kourou, Guiana Francesa', scene: 'guiana', game: 'jupiter', body: 'jupiter', room: 'biblio',

  brief: [
    { who: 'CMTE. DOZINHO', t: '{{Capitão|Capitã}}! Começa uma nova fase: os planetas GIGANTES.' },
    { who: 'CMTE. DOZINHO', t: 'Missão 8: JÚPITER, o maior de todos. Você vai registrar as 4 luas que Galileu descobriu em 1610.' },
    { who: 'CMTE. DOZINHO', t: 'E temos uma aluna nova na escola. Seja {{um bom anfitrião|uma boa anfitriã}}. Aula na BIBLIOTECA.' },
  ],
  ready: [
    { who: 'CMTE. DOZINHO', t: 'Aulas concluídas. O lançamento será em Kourou, na Guiana Francesa, a base de foguetes da Europa.' },
    { who: 'CMTE. DOZINHO', t: 'É logo ali, vizinha do Amapá. Leve o Escudo de Radiação: Júpiter não perdoa.' },
  ],
  teacher: [
    'Bom dia! Temos uma aluna nova: a Yuki, que veio do Japão! Hoje é MATEMÁTICA: equações do 1º grau. Pensem numa balança de dois pratos.',
    'Agora, a aula de ASTRONOMIA da sua missão, {nome}: JÚPITER, o rei dos planetas!',
  ],
  after: 'Muito bem, {nome}! O Comandante está esperando.',

  lessons: [{
    id: 'm8a', subject: 'MATEMÁTICA', title: 'Equações do 1º grau',
    slides: [
      `<p>Uma <b>equação</b> é uma igualdade com um número escondido. Pense numa <b>balança</b> de dois pratos, equilibrada: o que a gente faz num prato, faz no outro, e ela continua equilibrada.</p>
       <p><b>Júpiter</b> tem <b>diâmetro</b> (a largura de ponta a ponta) de cerca de <b>143.000 km</b>: uns <b>11 vezes</b> o da Terra. Chamando o diâmetro da Terra de d:</p>
       <div class="calc">11d = 143.000
d = 143.000 ÷ 11
d ≈ 13.000 km (o valor real é uns 12.700 km)</div><p>Para sumir com o 11 que multiplica, a gente divide os dois pratos por 11.</p>`,
      `<p>Em 2023, Júpiter chegou a <b>95 luas</b> conhecidas. A Yuki já decorou 5 e decora 9 por dia. Em quantos dias ela decora todas? Chamando os dias de x: <b>9x + 5 = 95</b>.</p>
       <div class="calc">9x + 5 = 95
9x = 95 − 5
9x = 90
x = 90 ÷ 9
x = 10 dias</div><p>Primeiro a gente tira o 5 dos dois pratos. Depois divide os dois por 9. Sempre nessa ordem: primeiro o que soma, depois o que multiplica.</p>`,
      `<p>Toda equação dá para <b>conferir</b>: troque a letra pelo número achado e veja se a balança fecha. Com x = 10: 9 × 10 + 5 = 95. Fechou!</p>
       <p>Quando o número está <b>subtraindo</b>, a gente faz o contrário: soma nos dois pratos.</p>
       <div class="calc">3x − 4 = 20
3x = 20 + 4
3x = 24
x = 24 ÷ 3 = 8
Confere: 3 × 8 − 4 = 20 ✓</div><p><b>Erro comum:</b> mexer só num prato. Se você soma 4 de um lado, tem de somar 4 do outro.</p>`,
    ],
    quiz: [
      { q: 'Em 2023, Júpiter tinha 95 luas conhecidas. Galileu viu 4 delas em 1610. Quantas foram descobertas depois? Resolva x + 4 = 95.', n: 91, calc: 'x + 4 = 95', hint: 'Tire 4 dos dois pratos: 95 − 4.', why: 'x = 95 − 4 = 91 luas. Confere: 91 + 4 = 95.' },
      { q: 'Um dia em Júpiter dura cerca de 10 horas. Quantos dias de Júpiter cabem em 120 horas? Resolva 10x = 120.', n: 12, calc: '10x = 120', hint: 'O 10 está multiplicando. Divida os dois lados por 10.', why: 'x = 120 ÷ 10 = 12 dias de Júpiter. Confere: 10 × 12 = 120.' },
      { q: 'O Kdok já registrou 7 luas no Cosmodex e registra 8 por hora. Em quantas horas ele chega às 95? Resolva 8x + 7 = 95.', n: 11, calc: '8x + 7 = 95', hint: 'Primeiro tire 7 dos dois lados: 95 − 7 = 88. Depois divida por 8.', why: '8x = 88, então x = 88 ÷ 8 = 11 horas. Confere: 8 × 11 + 7 = 95.' },
      { q: 'Na equação 4x + 6 = 30, qual é o primeiro passo para achar o x?', o: ['Dividir só o 30 por 4', 'Somar 6 nos dois lados', 'Tirar 4 dos dois lados', 'Tirar 6 dos dois lados'], a: 3, hint: 'O 6 está somando no prato do x. Para ele sumir, faça o contrário de somar, nos dois pratos.', why: 'Tirando 6 dos dois lados fica 4x = 24. Depois, dividindo por 4, x = 6.' },
      { q: 'O Kdok ficou ligado por 54 horas: x dias de Júpiter (10 horas cada) e mais 4 horas. Monte a equação e descubra quantos dias de Júpiter foram.', n: 5, hint: 'Cada dia de Júpiter tem 10 h: 10x + 4 = 54. Tire o 4 dos dois lados e divida por 10.', why: '10x + 4 = 54 → 10x = 50 → x = 5 dias de Júpiter. Confere: 10 × 5 + 4 = 54.' },
      { q: 'A Lia resolveu 6x − 8 = 40 e achou x = 7. Confira: ela acertou?', o: ['Sim: 6 × 7 − 8 = 40', 'Não: o certo é x = 6', 'Não: 6 × 7 − 8 dá 34. O certo é x = 8', 'Não dá para conferir'], a: 2, hint: 'Troque o x por 7: 6 × 7 − 8 dá 40? Se não der, resolva: 6x = 40 + 8.', why: '6 × 7 − 8 = 34, não 40. O certo: 6x = 48, x = 8. Confere: 6 × 8 − 8 = 40.' },
    ],
  }, {
    id: 'm8b', subject: 'ASTRONOMIA', title: 'O rei dos planetas',
    slides: [
      `<p><b>Júpiter</b> é o quinto planeta a partir do Sol e o <b>maior</b> de todos: caberiam umas <b>1.300 Terras</b> dentro dele! Ele é feito quase todo de gás (hidrogênio e hélio) e <b>não tem chão</b> firme para pousar.</p>
       <p>E gira rápido: um dia em Júpiter dura só umas <b>10 horas</b>. Já o ano de Júpiter, a volta completa em torno do Sol, leva quase <b>12 anos</b> da Terra.</p>`,
      `<p>A <b>Grande Mancha Vermelha</b> é uma tempestade maior que a Terra inteira, com ventos de centenas de km por hora. Os astrônomos a observam há quase 200 anos!</p>
       <p>Júpiter tem mais de <b>90 luas</b>. As quatro maiores foram vistas por <b>Galileu Galilei</b> em 1610, com uma luneta. Foi uma descoberta enorme: ela mostrou que <b>nem tudo no céu gira em volta da Terra</b>, como muita gente pensava.</p>`,
      `<div class="calc">IO        → cheia de vulcões
EUROPA    → oceano escondido
            embaixo do gelo
GANIMEDES → a maior lua do
            Sistema Solar
CALISTO   → coberta de crateras</div><p>Ganimedes é maior até que o planeta Mercúrio! No céu do Capão, Júpiter aparece como um ponto brilhante que quase não pisca. Com um binóculo, dá para ver essas 4 luas como pontinhos do lado dele.</p>`,
    ],
    quiz: [
      { q: 'Júpiter é:', o: ['o menor planeta', 'uma estrela', 'o maior planeta do Sistema Solar', 'uma lua de Saturno'], a: 2, hint: 'Lembre quantas Terras caberiam dentro dele.', why: 'Júpiter é o maior planeta: caberiam umas 1.300 Terras dentro dele.' },
      { q: 'Qual lua de Júpiter é a mais famosa por ter um oceano escondido embaixo do gelo, onde os cientistas procuram vida?', o: ['Io', 'Europa', 'Ganimedes', 'Calisto'], a: 1, hint: 'Io tem vulcões, Ganimedes é a maior e Calisto tem crateras.', why: 'Europa tem um oceano embaixo do gelo. Talvez um dia a gente encontre vida lá.' },
      { q: 'A Grande Mancha Vermelha de Júpiter é:', o: ['um vulcão', 'um lago de lava', 'uma cidade', 'uma tempestade maior que a Terra'], a: 3, hint: 'Júpiter é feito de gás e não tem chão. O que pode girar sem parar nas nuvens dele?', why: 'É uma tempestade gigante, maior que a Terra, observada há quase 200 anos.' },
      { q: 'Júpiter gira em cerca de 10 horas. Quantos dias COMPLETOS de Júpiter cabem em 1 dia da Terra (24 horas)?', n: 2, calc: '24 ÷ 10 = ?', hint: 'Quantas vezes 10 horas cabem em 24 sem passar? 10 × 2 = 20 e 10 × 3 = 30.', why: '10 × 2 = 20 cabe em 24, mas 10 × 3 = 30 passa. São 2 dias completos de Júpiter, e sobram 4 horas.' },
      { q: 'Por que foi tão importante Galileu ver 4 luas girando em volta de Júpiter, em 1610?', o: ['Mostrou que nem tudo no céu gira em volta da Terra', 'Mostrou que Júpiter é uma estrela', 'Mostrou que Júpiter tem chão', 'Mostrou que a Lua é maior que Júpiter'], a: 0, hint: 'Naquela época, muita gente achava que tudo no céu girava em volta de um lugar só. Que lugar?', why: 'As luas giravam em volta de Júpiter, e não da Terra. Isso mostrou que a Terra não é o centro de tudo.' },
    ],
  }],

  site: {
    look: [1, 3, 0],
    intro: [
      { who: 'ENG. LÉA', t: 'Bonjour, {nome}! Sou a engenheira Léa. {{Bem-vindo|Bem-vinda}} ao Centro Espacial da Guiana!' },
    ],
    lesson: {
      id: 'm8c', subject: 'GEOGRAFIA · GUIANA FRANCESA', title: 'A França na América do Sul',
      slides: [
        `<p>A <b>Guiana Francesa</b> fica no norte da América do Sul, mas é um <b>território da França</b>, um país da Europa! Ela foi colônia francesa e hoje é um <b>departamento ultramarino</b>: uma parte da França do outro lado do mar (ultramarino quer dizer "além do mar"). Ela faz fronteira com o Brasil, no estado do <b>Amapá</b>.</p>
         <p>O rio <b>Oiapoque</b> separa os dois países. Por isso a expressão <b>"do Oiapoque ao Chuí"</b> quer dizer "de uma ponta à outra do Brasil": o Chuí fica no extremo sul, no Rio Grande do Sul. (Hoje se sabe que o ponto mais ao norte do Brasil é o Monte Caburaí, em Roraima, mas a expressão ficou.)</p>`,
        `<p>Como é um pedaço da França do outro lado do Oceano Atlântico, lá se fala <b>francês</b> e se paga em <b>euro</b>:</p>
         <div class="calc">BONJOUR = bom dia
MERCI   = obrigado
ÉTOILE  = estrela</div>`,
        `<p>Em Kourou fica o <b>Centro Espacial da Guiana</b>, a base de foguetes da Europa. Como Alcântara, ela fica perto da <b>Linha do Equador</b>. Ali a Terra gira mais rápido (o chão anda mais de 1.600 km por hora) e dá um empurrão extra no foguete: ele gasta menos combustível.</p>
         <p>Daqui partiu, em <b>2023</b>, a sonda <b>JUICE</b>, que vai estudar as luas de Júpiter. Ela deve chegar lá em <b>2031</b>.</p>`,
      ],
      quiz: [
        { q: 'A Guiana Francesa é um território de qual país?', o: ['Brasil', 'Suriname', 'França', 'Portugal'], a: 2, hint: 'O nome já dá uma pista. E lá se fala francês.', why: 'É um território da França, mesmo ficando na América do Sul: um departamento ultramarino.' },
        { q: '"Merci" quer dizer:', o: ['obrigado', 'bom dia', 'estrela', 'tchau'], a: 0, hint: 'Bom dia é bonjour, e estrela é étoile.', why: 'Merci = obrigado.' },
        { q: 'O rio Oiapoque separa o Brasil da Guiana Francesa, e o Chuí fica no extremo sul do Brasil. O que quer dizer "do Oiapoque ao Chuí"?', o: ['Do mar à montanha', 'Da manhã à noite', 'De Júpiter a Saturno', 'De uma ponta à outra do Brasil'], a: 3, hint: 'Um fica lá no norte e o outro lá no sul.', why: 'O Oiapoque fica no norte e o Chuí no sul: a expressão quer dizer o Brasil inteiro.' },
        { q: 'A sonda JUICE saiu de Kourou em 2023 e deve chegar a Júpiter em 2031. Quantos anos de viagem?', n: 8, calc: '2031 − 2023 = ?', hint: 'Faça 2031 − 2023. Pode contar nos dedos a partir de 2023.', why: '2031 − 2023 = 8 anos de viagem!' },
        { q: 'Por que a Europa lança foguetes da Guiana Francesa, tão longe da França?', o: ['Porque lá é mais frio', 'Porque perto do Equador a Terra gira mais rápido e dá um empurrão extra no foguete', 'Porque lá não tem vento', 'Porque fica mais perto da Lua'], a: 1, hint: 'Kourou fica perto de uma linha imaginária muito famosa. O que acontece ali com o giro da Terra?', why: 'Perto do Equador, o chão gira mais rápido. O foguete já sai com esse empurrão e gasta menos combustível.' },
      ],
    },
    outro: [
      { who: 'ENG. LÉA', t: 'Bon voyage! Dê um oi para Europa por mim.' },
    ],
  },

  gameIntro: [
    { who: 'KDOK', t: 'Bip! As quatro luas vão piscar numa sequência. Cada uma fica numa direção.' },
    { who: 'KDOK', t: 'Repita a sequência com ▲ ▶ ▼ ◀. IO em cima, EUROPA à direita, GANIMEDES embaixo, CALISTO à esquerda.' },
  ],

  debrief: [
    { who: 'KDOK', t: 'LUAS REGISTRADAS! Júpiter é listrado de nuvens, com tempestades do tamanho de planetas.' },
    { who: 'KDOK', t: 'Io, Europa, Ganimedes e Calisto: as mesmas luas que Galileu viu em 1610, com uma lunetinha.' },
    { who: 'KDOK', t: 'Europa tem um oceano embaixo do gelo. Talvez um dia a gente encontre vida lá.' },
    { who: 'KDOK', t: 'Bip! O Escudo de Radiação salvou meus circuitos. E o sinal continua: fraquinho, de todos os lados.' },
  ],
  card: { id: 'jupiter', name: 'JÚPITER', lines: ['O maior planeta: caberiam 1.300 Terras', 'Planeta de gás, sem chão', 'Grande Mancha Vermelha: tempestade gigante', 'Mais de 90 luas', 'Dia: só 10 horas'] },
  reward: { id: 'radar', name: 'RADAR DE ANÉIS', desc: 'Mostra as brechas entre os pedaços de gelo. Nos anéis de Saturno, vale um escudo a mais.' },
  radio: 'Aqui é a Astrokdok! Equação parece bicho de sete cabeças, mas é só uma balança: o que você faz de um lado, faz do outro. Você mostrou que dá conta. Câmbio!',
  real: 'Monte uma linha do tempo num papel comprido: 1500 (portugueses no Brasil), 1610 (Galileu), 1969 (pessoas na Lua) e o ano em que você nasceu.',

  chat: {
    yuki: 'Oi! Sou a Yuki. No Japão, Júpiter se chama Mokusei: "estrela da madeira".',
    lia: 'Júpiter tem mais de 90 luas. Imagina ter que dar nome pra todas.',
    tomas: 'Um dia em Júpiter tem 10 horas. Então lá o almoço chega mais rápido?',
    bia: 'Eu desenhei o Escudo de Radiação. O Kdok só apertou os parafusos. E sobrou um. De novo.',
    caio: 'Galileu ficava acordado de noite olhando o céu. Meu tipo de gente... só que acordado.',
    rival: 'A Yuki sabe tudo de Júpiter! Já pedi pra ela estudar com a gente. Com nós três juntos, essa missão tá no papo.',
    kdok: 'Bip! Io, Europa, Ganimedes, Calisto. Decorei com uma música: I-E-G-C, iô-iê-guê-cê!',
    ze: 'Fiz as contas: se o sinal viesse de uma estrela, ele sumiria quando ela se põe. Ele não some nunca.',
  },
};
