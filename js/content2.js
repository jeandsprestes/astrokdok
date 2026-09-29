'use strict';
// MISSÃO 2 — LUA · lançamento de Alcântara (MA)
A.MISSIONS[1] = {
  n: 2, name: 'LUA', goal: 'pousar na Lua sem amassar a nave',
  place: 'ALCÂNTARA', where: 'Alcântara, Maranhão, Brasil', scene: 'alcantara', game: 'lander', body: 'moon',

  brief: [
    { who: 'CMTE. JULIUS', t: 'Cadete. A foto da Terra ficou tremida, mas o Conselho gostou.' },
    { who: 'CMTE. JULIUS', t: 'Missão 2: pousar na LUA. Pouso suave. Nave inteira. Sem desculpas.' },
    { who: 'CMTE. JULIUS', t: 'Escola primeiro. Depois, fale comigo.' },
  ],
  ready: [
    { who: 'CMTE. JULIUS', t: 'Aulas concluídas. Desta vez o lançamento será no Centro de Lançamento de Alcântara, no Maranhão.' },
    { who: 'CMTE. JULIUS', t: 'O Propulsor Turbo já está instalado. Vá.' },
  ],
  teacher: [
    'Bom dia, turma! Aula de MATEMÁTICA: divisão. Hoje vamos dividir até combustível de foguete.',
    'Agora, a aula da missão do Gabriel: a LUA!',
  ],
  after: 'Muito bem, Gabriel! O Comandante está esperando.',

  lessons: [{
    id: 'm2a', subject: 'MATEMÁTICA', title: 'Dividir no espaço',
    slides: [
      `<p>Toda divisão tem nomes para suas partes:</p>
       <div class="calc">125 ÷ 4 = 31  resto 1

125 → dividendo
  4 → divisor
 31 → quociente
  1 → resto</div><p><b>Regra do resto:</b> ele é SEMPRE menor que o divisor. Se sobrar mais que o divisor, a conta ainda não acabou!</p>`,
      `<p>Para conferir se acertou, use a <b>prova real</b>: multiplique de volta e some o resto.</p>
       <div class="calc">31 × 4 = 124
124 + 1 = 125  ✓</div><p>Voltou ao dividendo? Então está certo!</p>`,
      `<p><b>Truque dos zeros:</b> para dividir números redondos, divida sem os zeros e devolva no final.</p>
       <div class="calc">6.000 ÷ 3
→ 6 ÷ 3 = 2
→ 2.000</div><p>Os zeros esperam do lado de fora e voltam para casa no fim.</p>`,
    ],
    quiz: [
      { q: 'A Astrokdok comprou 96 pacotes de comida espacial para 4 astronautas. Quantos pacotes para cada um?', n: 24, hint: '4 × 20 = 80. Faltam 16. E 4 × 4 = 16.', why: '96 ÷ 4 = 24, porque 24 × 4 = 96.' },
      { q: 'Há 125 barrinhas de cereal para 4 dias de viagem, a mesma quantidade por dia. Quantas barrinhas por dia?', n: 31, calc: '125 ÷ 4 = ?', hint: '4 × 30 = 120. Sobram 5. Cabe mais um 4 dentro do 5?', why: '125 ÷ 4 = 31, e sobra 1.' },
      { q: 'E na conta 125 ÷ 4, quanto sobra (o resto)?', n: 1, hint: '31 × 4 = 124. Quanto falta para 125?', why: '125 − 124 = 1. O resto é 1.' },
      { q: 'Um colega fez 47 ÷ 5 = 8, resto 7. Está certo?', o: ['Sim, está certo', 'Não: o resto não pode ser maior que o divisor'], a: 1, why: 'Resto 7 é maior que 5: dava para dar mais um. O certo é 9, resto 2.' },
      { q: 'Prova real: 84 ÷ 6 = 14 está certo?', o: ['Sim, porque 14 × 6 = 84', 'Não, porque 14 × 6 = 74', 'Não dá para saber'], a: 0, why: '14 × 6 = 84. A prova real confirmou!' },
      { q: 'A nave tem 6.000 litros de combustível para 3 motores iguais. Quantos litros para cada motor?', n: 2000, hint: '6 ÷ 3 = 2. Agora devolva os três zeros.', why: '6.000 ÷ 3 = 2.000 litros.' },
    ],
  }, {
    id: 'm2b', subject: 'CIÊNCIAS + MATEMÁTICA', title: 'A Lua',
    slides: [
      `<p>A <b>Lua</b> é o único satélite natural da Terra. Ela fica, em média, a <b>384.400 km</b> daqui. A luz leva pouco mais de <b>1 segundo</b> para vir de lá.</p>
       <p>A Lua <b>não tem luz própria</b>: ela brilha porque <b>reflete a luz do Sol</b>, como um espelho.</p>`,
      `<p>Enquanto a Lua gira em volta da Terra, vemos pedaços diferentes dela iluminados. São as <b>fases</b>:</p>
       <div class="calc">NOVA → CRESCENTE
→ CHEIA → MINGUANTE
→ NOVA de novo</div><p>O ciclo leva cerca de <b>29 dias e meio</b>. E a Lua mostra sempre <b>a mesma face</b> para nós.</p>`,
      `<p>A gravidade na Lua é <b>6 vezes mais fraca</b>. Lá, você pularia muito mais alto!</p>
       <p>Em <b>1969</b>, a missão <b>Apollo 11</b> levou os primeiros humanos à Lua: <b>Neil Armstrong</b> e <b>Buzz Aldrin</b>. A viagem até lá levou uns <b>3 dias</b>.</p>
       <p>Como lá não tem vento nem chuva, as pegadas deles continuam no chão até hoje.</p>`,
    ],
    quiz: [
      { q: 'A Lua brilha no céu porque:', o: ['tem luz própria', 'reflete a luz do Sol', 'é feita de gelo', 'está pegando fogo'], a: 1, why: 'A Lua é como um espelho: reflete a luz do Sol.' },
      { q: 'A Lua fica a cerca de 384.000 km. A Apollo 11 levou uns 3 dias para chegar. Quantos km ela andou por dia, em média?', n: 128000, calc: '384.000 ÷ 3 = ?', hint: 'Faça 384 ÷ 3 primeiro. Depois devolva os três zeros.', why: '384 ÷ 3 = 128. Então 384.000 ÷ 3 = 128.000 km por dia!' },
      { q: 'Na Lua a gravidade é 6 vezes mais fraca. Um astronauta com traje marca 120 kg na balança da Terra. Quanto marcaria na Lua?', n: 20, hint: '12 ÷ 6 = 2. E 120 ÷ 6?', why: '120 ÷ 6 = 20 kg. Levinho!' },
      { q: 'As fases da Lua levam uns 29 dias para se repetir. Quantas semanas COMPLETAS cabem em 29 dias?', n: 4, hint: 'Uma semana tem 7 dias. Quanto é 7 × 4? E 7 × 5?', why: '29 ÷ 7 = 4, resto 1. São 4 semanas e sobra 1 dia.' },
      { q: 'Por que as pegadas da Apollo 11 continuam na Lua até hoje?', o: ['Porque alguém cuida delas', 'Porque na Lua não tem vento nem chuva', 'Porque o chão é de cimento', 'Porque a Lua é fria'], a: 1, why: 'Sem vento e sem chuva, nada apaga as pegadas.' },
      { q: 'Quem foi o primeiro ser humano a pisar na Lua?', o: ['Neil Armstrong', 'Yuri Gagarin', 'Marcos Pontes', 'Buzz Lightyear'], a: 0, why: 'Neil Armstrong, em 1969. Yuri Gagarin foi o primeiro a ir ao espaço, e Marcos Pontes, o primeiro brasileiro. O Buzz Lightyear ainda está treinando.' },
    ],
  }],

  site: {
    guide: 'ENG. NARA',
    intro: [
      { who: 'ENG. NARA', t: 'Olá, cadete! Sou a engenheira Nara, do Centro de Lançamento de Alcântara. Seja bem-vindo ao Maranhão!' },
    ],
    lesson: {
      id: 'm2c', subject: 'GEOGRAFIA · MARANHÃO', title: 'A base perto do Equador',
      slides: [
        `<p>Estamos em <b>Alcântara</b>, no estado do <b>Maranhão</b>, também no Nordeste. Aqui fica o <b>Centro de Lançamento de Alcântara</b>, a base de foguetes do Brasil.</p>
         <p>Por que aqui? Porque fica <b>pertinho da Linha do Equador</b>. Ali a Terra gira mais rápido, e isso dá um empurrão no foguete. Economiza combustível!</p>`,
        `<p>Do outro lado da baía fica <b>São Luís</b>, a capital do Maranhão. Ela foi fundada em <b>1612</b> pelos <b>franceses</b>: é a única capital do Brasil fundada por eles!</p>
         <p>O Maranhão tem os <b>Lençóis Maranhenses</b>: dunas de areia branca com lagoas de <b>água da chuva</b> no meio. Parece outro planeta!</p>`,
        `<p>E tem festa! O <b>Bumba-meu-boi</b> é uma festa popular com música, dança, fantasias coloridas e a história de um boi. Ela é <b>Patrimônio Cultural da Humanidade</b>.</p>`,
      ],
      quiz: [
        { q: 'Por que Alcântara é um ótimo lugar para lançar foguetes?', o: ['Tem muitas montanhas', 'Fica perto da Linha do Equador', 'Faz muito frio', 'Fica no Polo Sul'], a: 1, why: 'Perto do Equador a Terra gira mais rápido e dá um empurrão no foguete.' },
        { q: 'Qual é a capital do Maranhão?', o: ['Belém', 'Fortaleza', 'São Luís', 'Teresina'], a: 2, why: 'São Luís, fundada pelos franceses em 1612.' },
        { q: 'São Luís foi fundada em 1612. Em 2012, ela fez aniversário de quantos anos?', n: 400, calc: '2012 − 1612 = ?', hint: 'Os dois terminam em 12. Então é só fazer 2000 − 1600.', why: '2012 − 1612 = 400 anos!' },
        { q: 'As lagoas dos Lençóis Maranhenses se formam principalmente com:', o: ['água do mar', 'água da chuva', 'neve derretida', 'água de poço'], a: 1, why: 'A chuva enche os buracos entre as dunas.' },
        { q: 'O que é o Bumba-meu-boi?', o: ['Um tipo de foguete', 'Uma festa com música, dança e a história de um boi', 'Uma comida típica', 'Um rio do Maranhão'], a: 1, why: 'Uma festa tão importante que virou Patrimônio da Humanidade.' },
      ],
    },
    outro: [
      { who: 'ENG. NARA', t: 'Contagem liberada! Traga uma pedrinha da Lua pra gente. Brincadeira. Ou não.' },
    ],
  },

  gameIntro: [
    { who: 'KDOK', t: 'Bip-bop! Pouso lunar! A gravidade aqui é fraquinha, mas puxa.' },
    { who: 'KDOK', t: 'SEGURE A para ligar o motor e frear a queda. ◀ ▶ empurram para os lados.' },
    { who: 'KDOK', t: 'Pouse DEVAGAR na plataforma que pisca. Cuidado com o combustível!' },
  ],

  debrief: [
    { who: 'KDOK', t: 'POUSO CONFIRMADO! Bem-vindo à Lua, cadete!' },
    { who: 'KDOK', t: 'Aqui não tem ar. Por isso não tem som, nem vento, e o céu é preto até de dia.' },
    { who: 'KDOK', t: 'O chão é coberto de uma poeira fina chamada regolito. Ela gruda em tudo. Inclusive em mim.' },
    { who: 'KDOK', t: 'Olhe lá em cima: a Terra! Daqui ela fica quase parada, sempre no mesmo lugar do céu.' },
    { who: 'KDOK', t: 'De dia o chão chega a 120 graus. À noite cai para 170 graus abaixo de zero. Ai! Brrr!' },
  ],
  card: { id: 'lua', name: 'LUA', lines: ['Diâmetro: 3.474 km (¼ da Terra)', 'Distância: 384.400 km', 'Gravidade: 6 vezes menor', 'Fases: a cada 29 dias e meio', 'Primeiro pouso humano: 1969'] },
  reward: { id: 'traje', name: 'TRAJE TÉRMICO', desc: 'Um traje que aguenta calor e frio extremos. Na próxima missão, você terá um escudo a mais.' },
  radio: 'Filho, hoje à noite eu vou olhar para a Lua procurando a sua nave. Se eu vir uma luzinha piscando lá, vou saber que é você. Câmbio!',
  real: 'Olhe para a Lua esta noite (ou na próxima noite em que ela aparecer). Ela está cheia, crescente ou minguante? Desenhe no caderno o formato que você viu.',

  chat: {
    lia: 'Sabia que a Lua está se afastando da Terra? Uns 4 centímetros por ano. Devagarzinho, igual lesma.',
    tomas: 'Na Lua eu ia pesar 6 vezes menos. Então posso comer 6 vezes mais, né? Né?',
    bia: 'Já imaginei o pouso do Calhambeque inteirinho. Dica: pouse devagar. Muito devagar. Mais devagar que isso.',
    caio: 'Se a Lua não tem luz própria, quem acende ela? ... Ah, o Sol. Tá. Vou voltar a dormir.',
    rival: 'Hunf. A foto da Terra ficou tremida. Quero ver você pousar na Lua sem amassar nada.',
    kdok: 'Bip! Instalei o Propulsor Turbo com parafusos de verdade. Só sobrou um. Não deve ser importante.',
  },
};
