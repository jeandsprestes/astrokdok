'use strict';
// MISSÃO 2: LUA · lançamento de Alcântara (MA)
A.MISSIONS[1] = {
  n: 2, name: 'LUA', goal: 'pousar na Lua sem amassar a nave',
  place: 'ALCÂNTARA', where: 'Alcântara, Maranhão, Brasil', scene: 'alcantara', game: 'lander', body: 'moon',

  brief: [
    { who: 'CMTE. DOZINHO', t: 'Cadete. A foto da Terra ficou tremida, mas o Conselho gostou.' },
    { who: 'CMTE. DOZINHO', t: 'Missão 2: pousar na LUA. Pouso suave. Nave inteira. Sem desculpas.' },
    { who: 'CMTE. DOZINHO', t: 'Escola primeiro. Depois, fale comigo.' },
  ],
  ready: [
    { who: 'CMTE. DOZINHO', t: 'Aulas concluídas. Desta vez o lançamento será no Centro de Lançamento de Alcântara, no Maranhão.' },
    { who: 'CMTE. DOZINHO', t: 'O Propulsor Turbo já está instalado. Vá.' },
  ],
  teacher: [
    'Bom dia, turma! Aula de MATEMÁTICA: frações. Hoje a gente vai cortar pizza, chocolate e até o tanque da nave em pedaços.',
    'Agora, ASTRONOMIA: a aula da missão de {nome}. Vamos visitar a nossa vizinha, a LUA!',
  ],
  after: 'Muito bem, {nome}! O Comandante está esperando.',

  lessons: [{
    id: 'm2a', subject: 'MATEMÁTICA', title: 'Frações',
    slides: [
      `<p>Uma barra de chocolate cortada em <b>4 pedaços iguais</b>. Você come 3. Que parte da barra você comeu? Três de quatro: <b>3/4</b>. Isso é uma <b>fração</b>: um pedaço de um inteiro, escrito com dois números.</p>
       <div class="calc"> 3  → numerador
───   (pedaços que peguei)
 4  → denominador
      (em quantos cortei)</div><p>No jogo a gente escreve <b>3/4</b> numa linha só, pra caber na tela. Lê-se "três quartos". Comeu os 4 pedaços? Comeu 4/4: a barra inteira, que é 1.</p>`,
      `<p>Meia barra é <b>1/2</b>. Com 4 pedaços, meia barra são 2: 2/4. Com 8, são 4/8. Mesmo tanto de chocolate, nomes diferentes: <b>frações equivalentes</b>. Para achar uma, multiplique ou divida o de cima e o de baixo pelo <b>mesmo número</b>.</p>
       <div class="calc">1/2 = 2/4 = 4/8
(×2 em cima e embaixo)
6/8 = 3/4
(÷2 em cima e embaixo)</div><p>Para <b>comparar</b> com o mesmo denominador, olhe só o de cima: 5/8 é maior que 3/8. Denominadores diferentes? Deixe os dois iguais: 1/2 = 4/8, e 4/8 é maior que 3/8.</p>`,
      `<p><b>Fração de uma quantidade:</b> o tanque da nave tem <b>20 litros</b> e já gastou <b>3/4</b>. Quantos litros foram? Primeiro divida pelo de baixo (isso acha 1/4), depois multiplique pelo de cima.</p>
       <div class="calc">3/4 de 20
20 ÷ 4 = 5   (1/4 de 20)
 5 × 3 = 15  (3/4 de 20)</div><p><b>Erro comum:</b> achar que 1/8 é maior que 1/4 porque 8 é maior que 4. Quanto mais pedaços, <b>menor</b> fica cada um. 1/8 da pizza é uma fatia bem mais fina que 1/4.</p>`,
    ],
    quiz: [
      { q: 'Uma pizza foi cortada em 8 fatias iguais. Você comeu 3. Que fração da pizza você comeu?', o: ['3/8', '8/3', '3/5', '5/8'], a: 0, hint: 'O de baixo (denominador) é em quantas fatias a pizza foi cortada. O de cima (numerador), quantas você pegou.', why: '3 fatias de 8: 3/8. O 8 é o denominador (as fatias do inteiro) e o 3 é o numerador (as que você comeu).' },
      { q: 'Na fração 5/6, qual é o denominador?', n: 6, hint: 'O denominador é o número de baixo, que no jogo fica depois da barra. Ele diz em quantas partes o inteiro foi dividido.', why: 'Em 5/6, o 6 é o denominador: o inteiro foi dividido em 6 partes. O 5 é o numerador.' },
      { q: 'Qual destas frações é equivalente a 2/3?', o: ['3/4', '2/6', '4/3', '4/6'], a: 3, hint: 'Multiplique o de cima e o de baixo pelo MESMO número. Se só um dos dois mudou, não é equivalente.', why: '2 × 2 = 4 e 3 × 2 = 6. Então 2/3 = 4/6: a mesma parte do inteiro, só que em pedaços menores.' },
      { q: 'A trilha até a cachoeira tem 12 km. Você já andou 2/3 do caminho. Quantos km você já andou?', n: 8, calc: '2/3 de 12 = ?', hint: 'Primeiro divida 12 por 3: isso é 1/3 do caminho. Depois multiplique por 2.', why: '12 ÷ 3 = 4 km (um terço). 4 × 2 = 8 km andados. Faltam só 4!' },
      { q: 'A Lia bebeu 3/4 de uma garrafa de água. O Tomás bebeu 5/8 de uma garrafa igual. Quem bebeu mais?', o: ['O Tomás', 'A Lia', 'Os dois beberam o mesmo tanto'], a: 1, hint: 'Deixe os denominadores iguais: 3/4 vale quantos oitavos? Multiplique o de cima e o de baixo por 2.', why: '3/4 = 6/8, e 6/8 é mais que 5/8. A Lia bebeu mais. Quem olhou só o 5 e o 3 esqueceu que os pedaços têm tamanhos diferentes.' },
      { q: 'A nave sai com 240 litros de combustível. Na decolagem ela gasta 1/4 do total e, na viagem, mais 1/3 do total. Quantos litros sobram?', n: 100, hint: '1/4 de 240 é 240 ÷ 4. 1/3 de 240 é 240 ÷ 3. Some os dois gastos e tire do total.', why: '240 ÷ 4 = 60 e 240 ÷ 3 = 80. Gastou 60 + 80 = 140. Sobram 240 − 140 = 100 litros.' },
    ],
  }, {
    id: 'm2b', subject: 'ASTRONOMIA', title: 'A Lua',
    slides: [
      `<p>A <b>Lua</b> é o único satélite natural da Terra: um astro que gira em volta do nosso planeta. Ela fica, em média, a <b>384.400 km</b> daqui. A luz leva pouco mais de <b>1 segundo</b> para vir de lá.</p>
       <p>A Lua <b>não tem luz própria</b>. Ela brilha porque <b>reflete a luz do Sol</b>, como um espelho. E é bem menor que a Terra: o diâmetro dela, uns 3.474 km, é um pouco mais de 1/4 do nosso.</p>`,
      `<p>O Sol sempre ilumina metade da Lua. Enquanto ela gira em volta da Terra, a gente vê pedaços diferentes dessa metade iluminada. São as <b>fases</b>:</p>
       <div class="calc">NOVA
→ QUARTO CRESCENTE
→ CHEIA
→ QUARTO MINGUANTE
→ NOVA de novo</div><p>O ciclo das fases leva cerca de <b>29 dias e meio</b>. <b>Cuidado:</b> as fases não são a sombra da Terra. A sombra da Terra só cobre a Lua no <b>eclipse lunar</b>, que é bem mais raro. E a Lua mostra sempre <b>a mesma face</b> para nós.</p>`,
      `<p>Na Lua não há ar. Sem ar, não há <b>som</b>, nem <b>vento</b>, nem chuva, e o céu é preto até de dia. O chão vai de uns <b>120 °C</b> de dia a <b>−170 °C</b> à noite. A gravidade é <b>6 vezes mais fraca</b>: lá você pularia muito mais alto!</p>
       <p>Em <b>1969</b>, a missão <b>Apollo 11</b> levou os primeiros humanos a pisar na Lua: <b>Neil Armstrong</b> e <b>Buzz Aldrin</b>. A viagem, da decolagem até o pouso, levou uns <b>4 dias</b>. Sem vento nem chuva, as pegadas deles continuam no chão até hoje.</p>
       <p>As contas dessa viagem tiveram a ajuda de <b>Katherine Johnson</b>, uma matemática negra da NASA que calculava e conferia as rotas das naves. Matemática leva gente até a Lua!</p>`,
    ],
    quiz: [
      { q: 'A Lua brilha no céu porque:', o: ['tem luz própria', 'está pegando fogo', 'reflete a luz do Sol', 'é feita de gelo'], a: 2, hint: 'A Lua é como um espelho. De onde vem a luz que um espelho devolve?', why: 'A Lua não tem luz própria: ela reflete a luz do Sol, como um espelho.' },
      { q: 'Quem foi o primeiro ser humano a pisar na Lua, em 1969?', o: ['Yuri Gagarin', 'Neil Armstrong', 'Marcos Pontes', 'Buzz Lightyear'], a: 1, hint: 'Ele chegou na missão Apollo 11, junto com Buzz Aldrin.', why: 'Neil Armstrong, em 1969. Yuri Gagarin foi o primeiro a ir ao espaço, e Marcos Pontes, o primeiro brasileiro. O Buzz Lightyear ainda está treinando.' },
      { q: 'Por que as pegadas da Apollo 11 continuam na Lua até hoje?', o: ['Porque na Lua não tem vento nem chuva', 'Porque alguém cuida delas', 'Porque o chão é de cimento', 'Porque a Lua é fria'], a: 0, hint: 'Aqui na Terra, o que apaga uma pegada na areia?', why: 'Na Terra, o vento e a chuva apagam as pegadas. Na Lua não há ar, então não há vento nem chuva para apagar nada.' },
      { q: 'O que causa as fases da Lua?', o: ['A sombra da Terra cobrindo a Lua', 'Nuvens passando na frente dela', 'A Lua acende e apaga sozinha', 'A parte iluminada que a gente vê muda enquanto a Lua gira em volta da Terra'], a: 3, hint: 'O Sol sempre ilumina metade da Lua. O que muda é o jeito como a gente enxerga essa metade.', why: 'A Lua gira em volta da Terra, e a cada noite vemos um pedaço diferente da metade iluminada. A sombra da Terra só aparece no eclipse lunar.' },
      { q: 'Na Lua a gravidade é 6 vezes mais fraca. Um astronauta com traje marca 120 kg na balança da Terra. Quanto a balança marcaria na Lua?', n: 20, calc: '120 ÷ 6 = ?', hint: '6 vezes mais fraca: divida por 6. Ajuda lembrar que 12 ÷ 6 = 2.', why: '120 ÷ 6 = 20 kg. A massa do astronauta não muda, mas a Lua puxa bem menos, então o peso que a balança mostra cai. Por isso dá para pular tão alto!' },
    ],
  }],

  site: {
    guide: 'ENG. NARA',
    intro: [
      { who: 'ENG. NARA', t: 'Olá, cadete! Sou a engenheira Nara, do Centro de Lançamento de Alcântara. Seja {{bem-vindo|bem-vinda}} ao Maranhão!' },
    ],
    lesson: {
      id: 'm2c', subject: 'GEOGRAFIA · MARANHÃO', title: 'A base perto do Equador',
      slides: [
        `<p>Estamos em <b>Alcântara</b>, no estado do <b>Maranhão</b>, também no Nordeste. Aqui fica o <b>Centro de Lançamento de Alcântara</b>, a base de foguetes do Brasil.</p>
         <p>Por que aqui? Porque fica <b>pertinho da Linha do Equador</b>, a linha imaginária que divide a Terra em metade norte e metade sul. Ali o chão gira mais rápido, a mais de 1.600 km por hora, e isso dá um empurrão no foguete. Economiza combustível!</p>`,
        `<p>Do outro lado da baía fica <b>São Luís</b>, a capital do Maranhão. Ela foi fundada em <b>1612</b> pelos <b>franceses</b>: é a única capital do Brasil fundada por eles!</p>
         <p>O Maranhão tem os <b>Lençóis Maranhenses</b>: dunas de areia branca com lagoas de <b>água da chuva</b> no meio. As lagoas enchem na época das chuvas, mais ou menos de janeiro a junho. Parece outro planeta!</p>`,
        `<p>Alcântara também é terra de <b>comunidades quilombolas</b>, formadas por descendentes de pessoas escravizadas que viviam ali havia muito tempo. Quando a base foi construída, nos anos 1980, centenas de famílias tiveram que deixar suas terras. Até hoje essas comunidades lutam pelo direito ao território dos seus antepassados.</p>
         <p>E tem festa! O <b>Bumba-meu-boi</b> mistura música, dança, fantasias coloridas e a história de um boi. Ele é <b>Patrimônio Cultural Imaterial da Humanidade</b>, título dado pela Unesco em 2019.</p>`,
      ],
      quiz: [
        { q: 'Qual é a capital do Maranhão?', o: ['Belém', 'São Luís', 'Fortaleza', 'Teresina'], a: 1, hint: 'Ela fica do outro lado da baía, bem em frente a Alcântara, e foi fundada pelos franceses.', why: 'São Luís é a capital do Maranhão. Belém é a do Pará, Fortaleza a do Ceará e Teresina a do Piauí.' },
        { q: 'As lagoas dos Lençóis Maranhenses se formam principalmente com:', o: ['água do mar', 'neve derretida', 'água de poço', 'água da chuva'], a: 3, hint: 'Lembre da época do ano em que as lagoas enchem.', why: 'Na época das chuvas, a água se junta nos buracos entre as dunas e forma as lagoas. Na seca, elas vão baixando.' },
        { q: 'Por que Alcântara é um ótimo lugar para lançar foguetes?', o: ['Fica perto da Linha do Equador', 'Tem muitas montanhas', 'Faz muito frio', 'Fica perto do Polo Sul'], a: 0, hint: 'Pense no empurrão que a Terra dá no foguete. Onde o chão gira mais rápido?', why: 'Perto do Equador, o chão gira mais rápido. Esse empurrão ajuda o foguete a subir e economiza combustível.' },
        { q: 'O que é o Bumba-meu-boi?', o: ['Um tipo de foguete', 'Uma comida típica', 'Uma festa com música, dança e a história de um boi', 'Um rio do Maranhão'], a: 2, hint: 'Lembre das fantasias coloridas e da música.', why: 'É uma festa popular tão importante que virou Patrimônio Cultural Imaterial da Humanidade.' },
        { q: 'São Luís foi fundada pelos franceses em 1612. Quantos anos ela completa em 2026?', n: 414, calc: '2026 − 1612 = ?', hint: 'De 1612 até 2012 são 400 anos. Depois, conte de 2012 até 2026.', why: '2026 − 1612 = 414 anos: 4 séculos (400 anos) e mais 14.' },
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
    { who: 'KDOK', t: 'Você tem 3 escudos: se bater, a nave volta ao começo com o tanque cheio.' },
  ],

  debrief: [
    { who: 'KDOK', t: 'POUSO CONFIRMADO! {{Bem-vindo|Bem-vinda}} à Lua, cadete!' },
    { who: 'KDOK', t: 'Aqui não tem ar. Por isso não tem som, nem vento, e o céu é preto até de dia.' },
    { who: 'KDOK', t: 'O chão é coberto de uma poeira fina chamada regolito. Ela gruda em tudo. Inclusive em mim.' },
    { who: 'KDOK', t: 'Olhe lá em cima: a Terra! Daqui ela fica quase parada, sempre no mesmo lugar do céu.' },
    { who: 'KDOK', t: 'De dia o chão chega a 120 graus. À noite cai para 170 graus abaixo de zero. Ai! Brrr!' },
  ],
  card: { id: 'lua', name: 'LUA', lines: ['Diâmetro: 3.474 km (pouco mais de ¼ da Terra)', 'Distância: 384.400 km', 'Gravidade: 6 vezes menor', 'Fases: a cada 29 dias e meio', 'Primeiro pouso humano: 1969'] },
  reward: { id: 'traje', name: 'TRAJE TÉRMICO', desc: 'Um traje que aguenta calor e frio extremos. Na próxima missão, você terá um escudo a mais.' },
  radio: 'Aqui é a Astrokdok! Fração às vezes parece coisa só de prova, né? Mas ela aparece na receita, na pizza, no mapa e no foguete. Valeu por encarar as contas no papel. Câmbio!',
  real: 'Olhe para a Lua esta noite (ou na próxima noite em que ela aparecer). Ela está cheia, crescente ou minguante? Desenhe no caderno o formato que você viu.',

  chat: {
    lia: 'Sabia que a Lua está se afastando da Terra? Uns 4 centímetros por ano. Devagarzinho, igual lesma.',
    tomas: 'Na Lua eu ia pesar 6 vezes menos. Então posso comer 6 vezes mais, né? Né?',
    bia: 'Já imaginei o pouso do Calhambeque inteirinho. Dica: pouse devagar. Muito devagar. Mais devagar que isso.',
    caio: 'Se a Lua não tem luz própria, quem acende ela? ... Ah, o Sol. Tá. Vou voltar a dormir.',
    rival: '{nome}! Mostrei a foto da Terra pra escola inteira. Tremida? Eu chamo de foto com emoção. Na Lua, pousa devagarinho. Tô aqui torcendo!',
    kdok: 'Bip! Instalei o Propulsor Turbo com parafusos de verdade. Só sobrou um. Não deve ser importante.',
  },
};
