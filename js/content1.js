'use strict';
// MISSÃO 1: TERRA · lançamento do Vale do Capão
A.MISSIONS = A.MISSIONS || [];
A.MISSIONS[0] = {
  n: 1, name: 'TERRA', goal: 'subir até a órbita e fotografar a Terra',
  place: 'VALE DO CAPÃO', where: 'Vale do Capão, Bahia, Brasil', scene: 'capao', game: 'launch', body: 'earth',
  go: 'Ir para a plataforma de lançamento?',

  brief: [
    { who: 'CMTE. DOZINHO', t: 'Olá, {nome}. Sou o Comandante Dozinho. {{Bem-vindo|Bem-vinda}} à Astrokdok.' },
    { who: 'CMTE. DOZINHO', t: 'Sua primeira missão: subir até a órbita e fotografar a Terra lá de cima.' },
    { who: 'CMTE. DOZINHO', t: 'Mas nesta empresa ninguém voa sem estudar. Vá até a ESCOLA. Duas aulas. Depois, fale comigo.' },
  ],
  ready: [
    { who: 'CMTE. DOZINHO', t: 'Aulas concluídas. Bom trabalho, cadete.' },
    { who: 'CMTE. DOZINHO', t: 'Sua nave é o CALHAMBEQUE-1. Feita de uma caixa-d\'água velha e fita adesiva. É feia, mas voa. Quase sempre.' },
    { who: 'CMTE. DOZINHO', t: 'O lançamento será aqui mesmo, no Vale do Capão. Antes, um guia da Chapada quer falar com você.' },
  ],
  teacher: [
    'Bom dia, turma! Primeira aula: PORTUGUÊS. Vamos ler como detetives: achar o tema, a ideia principal e as pistas escondidas no texto.',
    'Agora, ASTRONOMIA: a aula da missão de {nome}. Vamos conhecer o nosso planeta, a TERRA!',
  ],
  after: 'Parabéns, {nome}! Pode ir falar com o Comandante Dozinho.',

  lessons: [{
    id: 'm1a', subject: 'PORTUGUÊS', title: 'Ler como detetive',
    slides: [
      `<p>Ler bem é entender o que o texto quer dizer. Comece com duas perguntas.</p>
       <p><b>Tema:</b> de que assunto o texto fala? Cabe em poucas palavras.<br><b>Ideia principal:</b> o que o texto diz de mais importante sobre esse assunto? Cabe numa frase.</p>
       <p><i>"A Chapada tem muitas cachoeiras. A mais famosa é a da Fumaça, que atrai turistas do mundo todo."</i></p>
       <div class="calc">Tema:
 as cachoeiras da Chapada
Ideia principal:
 a Chapada tem muitas
 cachoeiras, e a Fumaça
 é a mais famosa</div>`,
      `<p>Nem tudo vem escrito com todas as letras. A <b>informação implícita</b> é aquela que o texto não diz, mas que dá para <b>concluir pelas pistas</b>.</p>
       <p><i>"Seu Dito olhou para o céu cinzento e pegou a capa de chuva antes de sair."</i></p>
       <p>O texto não diz "vai chover". Mas as pistas (céu cinzento, capa de chuva) mostram que Seu Dito achou que ia chover. Isso é implícito.</p>
       <p><b>Cuidado:</b> só vale o que as pistas sustentam. Dizer que Seu Dito estava triste é inventar: nada no texto mostra isso.</p>`,
      `<p>Todo texto é escrito <b>para alguma coisa</b>. Essa é a <b>finalidade</b>. Pergunte: o que o autor quer que o leitor saiba ou faça?</p>
       <div class="calc">notícia    → informar
receita    → ensinar
propaganda → convencer
piada      → divertir
convite    → chamar</div><p>As pistas ajudam. Palavras que dão ordem ou conselho ("venha", "misture", "compre") mostram que o texto quer orientar ou convencer. Fatos, datas e números costumam mostrar que ele quer informar.</p>`,
    ],
    quiz: [
      { q: 'Leia: "A Lua não tem luz própria. Ela brilha porque reflete a luz do Sol, como um espelho." Qual é o TEMA do texto?', o: ['Os espelhos', 'O brilho da Lua', 'As estrelas', 'A noite'], a: 1, hint: 'O tema é o assunto. Pergunte: de que o texto fala do começo ao fim?', why: 'As duas frases falam de por que a Lua brilha. O espelho só aparece numa comparação: ele não é o assunto.' },
      { q: 'Qual é a finalidade de uma receita de bolo?', o: ['Contar uma história', 'Convencer a comprar um bolo', 'Divertir com uma piada', 'Ensinar a fazer o bolo'], a: 3, hint: 'Pense no que você faz com uma receita: lê e depois... faz o quê?', why: 'A receita mostra os ingredientes e os passos para quem quer fazer o bolo. A finalidade dela é ensinar.' },
      { q: 'Leia: "O Calhambeque-1 é feito de caixa-d\'água velha e fita adesiva. Muita gente ri dele. Mas ele já subiu três vezes e voltou inteiro." Qual é a ideia principal?', o: ['A nave é feia, mas funciona', 'Fita adesiva é cara', 'Ninguém gosta da nave', 'A nave nunca voou'], a: 0, hint: 'Procure a palavra que muda o rumo do texto. Depois do "mas" costuma vir o mais importante.', why: 'O texto mostra o lado ruim (feia, gente rindo) e, depois do "mas", o que importa: a nave voa e volta inteira.' },
      { q: 'Leia: "Quando {nome} chegou à escola, o pátio estava cheio de poças e todos fechavam os guarda-chuvas." O que dá para concluir, mesmo sem estar escrito?', o: ['A escola estava fechada', 'Chovia ou tinha acabado de chover', 'Era dia de festa', 'Fazia um calor forte'], a: 1, hint: 'Junte as pistas: poças no chão e gente fechando guarda-chuva. O que causa as duas coisas?', why: 'O texto não diz "choveu", mas as poças e os guarda-chuvas mostram isso. É uma informação implícita.' },
      { q: 'Leia: "Venha para a Astrokdok! Aqui você estuda, viaja pelo espaço e ainda ganha um robô amigo. Inscrições até sexta!" Qual é a finalidade principal desse texto?', o: ['Informar a hora do recreio', 'Ensinar a montar um robô', 'Convencer o leitor a se inscrever', 'Contar a história do Kdok'], a: 2, hint: 'Repare no "Venha!" e nas vantagens que o texto lista. O que ele quer que o leitor FAÇA?', why: 'É uma propaganda: chama o leitor ("Venha!"), mostra vantagens e dá um prazo. Tudo para convencer alguém a se inscrever. A data informa, mas está ali para ajudar o convite.' },
      { q: 'Leia: "Seu Dito foi à feira às 9h e voltou de mãos vazias, reclamando que chegou tarde de novo." Qual conclusão NÃO tem apoio no texto?', o: ['Seu Dito queria comprar alguma coisa', 'Não foi a primeira vez que chegou tarde', 'O que Seu Dito queria já tinha acabado', 'Seu Dito não gosta da feira'], a: 3, hint: 'Teste cada opção: que palavra do texto serve de pista para ela? A opção sem pista nenhuma é a resposta.', why: 'Voltar de mãos vazias e reclamar do atraso mostram que queria algo e que acabou. O "de novo" mostra que já aconteceu antes. Já "não gosta da feira" não tem pista: seria inventar.' },
    ],
  }, {
    id: 'm1b', subject: 'ASTRONOMIA', title: 'O planeta que gira',
    slides: [
      `<p>A Terra nunca fica parada. Ela faz dois movimentos ao mesmo tempo.</p>
       <p><b>ROTAÇÃO:</b> ela gira em volta de si mesma, como um pião. Uma volta leva cerca de <b>24 horas</b>: 1 dia. Enquanto gira, metade da Terra fica de frente para o Sol (é <b>dia</b>) e a outra metade fica de costas (é <b>noite</b>).</p>
       <p><b>TRANSLAÇÃO:</b> ela dá uma volta inteira em torno do Sol. Leva cerca de <b>365 dias</b>: 1 ano.</p>`,
      `<p>A Terra gira de <b>oeste para leste</b>. Por isso o Sol parece <b>nascer no leste</b> e se pôr no oeste. Quem se mexe é a gente, não o Sol!</p>
       <p>Em volta da Terra há uma capa de ar: a <b>atmosfera</b>. De baixo para cima (as alturas são aproximadas):</p>
       <div class="calc">TROPOSFERA · até 12 km
  nuvens, chuva, aviões
ESTRATOSFERA · até 50 km
  camada de ozônio
MESOSFERA · até 80 km
  meteoros queimam aqui
TERMOSFERA · até 600 km
  Estação Espacial</div>`,
      `<p>A <b>Estação Espacial Internacional</b> voa a uns <b>400 km</b> de altura e dá uma volta na Terra a cada <b>90 minutos</b>, mais ou menos. Por isso os astronautas de lá veem o Sol nascer cerca de <b>16 vezes por dia</b>!</p>
       <p>Lá de cima, a Terra parece uma bola azul, só um pouquinho achatada nos polos. De cada 10 partes da superfície, cerca de <b>7 são água</b>. Planeta Terra... ou Planeta Água?</p>`,
    ],
    quiz: [
      { q: 'O movimento da Terra girando em volta de si mesma, que faz o dia e a noite, se chama:', o: ['translação', 'gravidade', 'rotação', 'órbita'], a: 2, hint: 'Pense num pião girando no mesmo lugar. O nome desse movimento parece com "rodar".', why: 'Rotação: a Terra gira em volta de si mesma, uma volta a cada 24 horas. A translação é a volta em torno do Sol, que leva 1 ano.' },
      { q: 'Por que o Sol parece nascer sempre do lado leste?', o: ['Porque a Terra gira de oeste para leste', 'Porque o Sol dá voltas em torno da Terra', 'Porque o vento empurra o Sol', 'Porque é verão'], a: 0, hint: 'Lembre: quem se mexe é a Terra. Para que lado ela gira?', why: 'A Terra gira de oeste para leste, então o lado leste é o primeiro a encontrar o Sol de manhã. Parece que o Sol sobe, mas quem gira somos nós.' },
      { q: 'Em qual camada da atmosfera ficam as nuvens e a chuva?', o: ['termosfera', 'mesosfera', 'estratosfera', 'troposfera'], a: 3, hint: 'As nuvens ficam perto do chão, onde a gente vive. Procure a camada mais baixa.', why: 'Troposfera: a camada mais baixa, até uns 12 km. É onde ficam o ar que respiramos, as nuvens, a chuva e os aviões.' },
      { q: 'Quando é meio-dia no Vale do Capão, que horas são, mais ou menos, no lado oposto da Terra?', o: ['Meio-dia também', 'Por volta da meia-noite', 'Seis da manhã', 'Seis da tarde'], a: 1, hint: 'Ao meio-dia, o Capão está de frente para o Sol. E o lado de trás da Terra, está virado para onde?', why: 'Se um lado está de frente para o Sol, o lado oposto está de costas para ele: lá é noite, por volta da meia-noite. É a rotação que leva o dia e a noite a todos os lugares.' },
      { q: 'A Estação Espacial dá uma volta na Terra a cada 90 minutos. Um dia tem 1.440 minutos. Quantas voltas ela dá em um dia?', n: 16, calc: '1.440 ÷ 90 = ?', hint: 'Corte um zero dos dois números: 144 ÷ 9. Que número vezes 9 dá 144?', why: '1.440 ÷ 90 = 144 ÷ 9 = 16 voltas. A cada volta, o Sol nasce uma vez para os astronautas: 16 vezes por dia!' },
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
         <p>A capital da Bahia é <b>Salvador</b>, a cerca de 450 km daqui. Salvador foi a <b>primeira capital do Brasil</b>, de 1549 a 1763.</p>`,
        `<p>O nome <b>Diamantina</b> vem dos <b>diamantes</b> encontrados na região por volta de 1840, há quase 200 anos. Muita gente veio garimpar, e assim cresceram cidades como Lençóis, Mucugê e Andaraí. Mas muito desse trabalho foi feito por <b>pessoas negras escravizadas</b>, e o garimpo revirou e sujou os <b>rios</b> da região.</p>
         <p>Hoje o tesouro é a natureza. O <b>Parque Nacional da Chapada Diamantina</b>, criado em 1985, protege rios, grutas, morros e cachoeiras.</p>`,
        `<p>E por que "chapada"? Porque muitos morros daqui são altos e têm o <b>topo reto</b>, como uma mesa. Esse tipo de relevo se chama chapada.</p>
         <p>A <b>Cachoeira da Fumaça</b> tem cerca de <b>340 metros</b> de queda. A água cai de tão alto que o vento a espalha em névoa antes de chegar lá embaixo. Parece fumaça!</p>
         <p>E à noite, longe das luzes da cidade, o céu do Capão fica lotado de estrelas. Lugar perfeito para uma base espacial.</p>`,
      ],
      quiz: [
        { q: 'O Vale do Capão fica em qual estado?', o: ['Minas Gerais', 'Pernambuco', 'Bahia', 'Goiás'], a: 2, hint: 'A capital desse estado é Salvador.', why: 'Bahia, na região Nordeste do Brasil.' },
        { q: 'Qual cidade foi a primeira capital do Brasil?', o: ['Salvador', 'Rio de Janeiro', 'Brasília', 'Palmeiras'], a: 0, hint: 'É a capital da Bahia, a uns 450 km do Capão.', why: 'Salvador foi a capital do Brasil de 1549 a 1763. Depois veio o Rio de Janeiro e, a partir de 1960, Brasília.' },
        { q: 'Por que a Cachoeira da Fumaça tem esse nome?', o: ['Porque tem um vulcão perto', 'Porque a água vira névoa antes de chegar embaixo', 'Porque fazem fogueira lá em cima', 'Porque a água é quente'], a: 1, hint: 'Imagine a água caindo de 340 metros, com o vento batendo nela.', why: 'A queda é tão alta que o vento espalha a água em gotinhas. De longe, parece fumaça.' },
        { q: 'De onde vem o nome "Diamantina"?', o: ['De uma rainha chamada Diamantina', 'De uma estrela muito brilhante', 'De um rio da região', 'Dos diamantes achados na região'], a: 3, hint: 'Olhe bem a palavra: Diamantina. Que pedra preciosa está escondida nela?', why: 'Diamantes foram encontrados aqui por volta de 1840 e atraíram muitos garimpeiros.' },
        { q: 'A cachoeira tem cerca de 340 m. Um prédio de 10 andares tem uns 30 m. Quantos prédios inteiros, um em cima do outro, cabem na altura da cachoeira?', n: 11, calc: '340 ÷ 30 = ?', hint: '30 × 10 = 300, e sobram 40 metros. Cabe mais um prédio de 30 nesses 40?', why: '30 × 11 = 330. Cabem 11 prédios e ainda sobram 10 metros. A Fumaça é alta como um prédio de uns 110 andares!' },
      ],
    },
    outro: [
      { who: 'SEU DITO', t: 'Tá {{sabido|sabida}}! Agora sobe. E manda lembrança pras estrelas.' },
    ],
  },

  gameIntro: [
    { who: 'KDOK', t: 'Bip-bop! Vamos atravessar as camadas da atmosfera até a órbita!' },
    { who: 'KDOK', t: 'Desvie de pássaros, aviões, balões e lixo espacial. Use ◀ ▶. Temos 5 escudos.' },
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
  radio: '{nome}, aqui é a Astrokdok! Vimos o risquinho de fumaça subindo do Capão e a sala de controle inteira comemorou. Ler bem é o primeiro passo de qualquer missão: quem lê como detetive não perde pista. Valeu pela dedicação! O espaço é grande, e você só está começando. Câmbio!',
  real: 'Hoje, repare de que lado o Sol se põe. Aquele lado é o OESTE. O leste fica do lado oposto. Mostre para alguém de casa!',

  chat: {
    lia: 'Desenhei o Cruzeiro do Sul no caderno. São 4 estrelas grandes e uma pequenininha chamada Intrometida!',
    tomas: 'Será que astronauta come feijão? Se comer, será que o foguete vai mais rápido?',
    bia: 'Quando eu crescer vou construir um foguete sem fita adesiva. Não é indireta pro Calhambeque. É direta.',
    caio: 'A Terra gira a mais de 1.600 km por hora no Equador e ninguém fica tonto. Eu fico. De sono. Zzz...',
    rival: 'Oi, {nome}! Primeira missão! Já fiz até cartaz: VAI, {nome}! Se precisar de ajuda pra estudar, é só chamar. Se precisar de lanche, também.',
    kdok: 'Bip-bop! Eu sou o KDK-0. Pode me chamar de Kdok. Fui feito de um micro-ondas velho. Ainda esquento pipoca.',
  },
};
