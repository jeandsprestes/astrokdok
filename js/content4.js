'use strict';
// MISSÃO 4: MERCÚRIO · lançamento de Roma (Itália)
A.MISSIONS[3] = {
  n: 4, name: 'MERCÚRIO', goal: 'atravessar Mercúrio pela linha do crepúsculo',
  place: 'ROMA', where: 'Roma, Itália', scene: 'roma', game: 'mercury', body: 'mercury', room: 'school',

  brief: [
    { who: 'CMTE. DOZINHO', t: 'Piloto {nome}. Temos um mistério.' },
    { who: 'CMTE. DOZINHO', t: 'Os telescópios do Atacama captaram um SINAL estranho vindo do espaço. Ele não para: shhhhhh... Ninguém sabe de onde vem.' },
    { who: 'CMTE. DOZINHO', t: 'A Astrokdok vai procurar a origem, planeta por planeta. Missão 4: MERCÚRIO. Escola primeiro.' },
  ],
  ready: [
    { who: 'CMTE. DOZINHO', t: 'Aulas concluídas. O lançamento será em Roma, na Itália.' },
    { who: 'CMTE. DOZINHO', t: 'Um arqueólogo quer te mostrar de onde vêm os nomes dos planetas.' },
  ],
  teacher: [
    'Bom dia, turma! Sou a professora. Hoje é MATEMÁTICA: porcentagem. Desconto na feira, bateria do celular, promoção... tudo isso é "por cento"!',
    'Agora, a aula da missão de {nome}: MERCÚRIO, o planeta mais perto do Sol, o menor e o mais rápido de todos!',
  ],
  after: 'Muito bem, {nome}! O Comandante está esperando.',

  lessons: [{
    id: 'm4a', subject: 'MATEMÁTICA', title: 'Porcentagem',
    slides: [
      `<p>Quando a bateria do celular está em <b>50%</b>, você já sabe: é a metade. <b>Por cento</b> quer dizer <b>de cada 100</b>. 50% é 50 de cada 100, ou seja, a metade.</p>
       <div class="calc">50% = 50/100 = metade
25% = 25/100 = um quarto
10% = 10/100 = um décimo
 1% =  1/100 = um centésimo</div><p>Porcentagem é uma fração com denominador 100, ou seja, com o 100 embaixo. O inteiro, tudo, é sempre <b>100%</b>.</p>`,
      `<p>Para calcular uma porcentagem de um número, a gente acha primeiro o <b>1%</b>: é só <b>dividir por 100</b>. Depois multiplica pela porcentagem que você quer.</p>
       <div class="calc">30% de 200

1%  → 200 ÷ 100 = 2
30% → 2 × 30 = 60</div><p>Então 30% de 200 é 60. Funciona com qualquer porcentagem: ache o 1% e multiplique.</p>`,
      `<p>Os <b>atalhos</b> das porcentagens mais usadas:</p>
       <div class="calc">50% → divide por 2
25% → divide por 4
10% → divide por 10
 5% → metade dos 10%
 1% → divide por 100</div><p><b>Erro comum:</b> achar que 10% de 50 é 10. Não! 10% é a décima parte: 50 ÷ 10 = <b>5</b>. O "10" diz a parte de cada 100, não a resposta.</p>`,
    ],
    quiz: [
      { q: 'A bateria do seu celular está em 50%. Quanto da bateria ainda tem?', o: ['A metade', 'Um quarto', 'A bateria inteira', 'Quase nada'], a: 0, hint: '50% quer dizer 50 de cada 100. Que parte de 100 é 50?', why: '50% = 50 de cada 100 = a metade.' },
      { q: 'Quanto é 10% de 150?', n: 15, calc: '10% de 150 = ?', hint: '10% é a décima parte. Divida 150 por 10.', why: '150 ÷ 10 = 15.' },
      { q: 'Uma camiseta na feira do Capão custa R$ 40 e está com 25% de desconto. Quantos reais é o desconto?', n: 10, hint: '25% é um quarto. Divida 40 por 4.', why: '40 ÷ 4 = 10. O desconto é R$ 10.' },
      { q: '{rival} ficou na dúvida e te perguntou: "10% de 50 é 10?". O que você responde?', o: ['Sim: 10% é sempre 10', 'Não: 10% de 50 é 5', 'Não: 10% de 50 é 50'], a: 1, hint: '10% é a décima parte. Quanto é 50 ÷ 10?', why: '50 ÷ 10 = 5. O "10" do 10% é a parte de cada 100, não a resposta.' },
      { q: 'Numa escola de 300 alunos, 15% vão de ônibus. Quantos alunos vão de ônibus?', n: 45, hint: '10% de 300 é 30. 5% é a metade disso. Some os dois.', why: '10% = 30 e 5% = 15. Então 15% = 30 + 15 = 45 alunos.' },
      { q: 'A Escola do Capão arrecadou R$ 2.500 na festa junina. 40% vai para a excursão. Quantos reais vão para a excursão?', n: 1000, calc: '40% de 2.500 = ?', hint: '1% de 2.500 é 2.500 ÷ 100 = 25. Multiplique por 40.', why: '2.500 ÷ 100 = 25. 25 × 40 = R$ 1.000.' },
    ],
  }, {
    id: 'm4b', subject: 'ASTRONOMIA', title: 'Mercúrio, o mensageiro',
    slides: [
      `<p><b>Mercúrio</b> é o planeta <b>mais perto do Sol</b> e o <b>menor</b> de todos. Tem 4.879 km de diâmetro: é maior que a nossa Lua (3.474 km), mas bem menor que a Terra (12.742 km).</p>
       <p>Ele também é o <b>mais rápido</b>. Dá a volta completa no Sol em só <b>88 dias</b>. Esse é o <b>ano</b> de Mercúrio! O nosso ano, o da Terra, tem 365 dias.</p>`,
      `<p>Mercúrio quase não tem <b>atmosfera</b>, a camada de ar que envolve um planeta. A atmosfera funciona como um cobertor: guarda o calor. Sem esse cobertor, o calor escapa para o espaço.</p>
       <div class="calc">De dia:   430 °C
À noite: −180 °C</div><p>De dia, o Sol bate forte e esquenta tudo. À noite, o calor foge. É a maior diferença de temperatura entre o dia e a noite de todos os planetas!</p>`,
      `<p>Mercúrio gira bem devagar em torno de si mesmo. Por isso, de um nascer do Sol até o outro passam <b>176 dias</b> da Terra. Isso dá <b>dois anos</b> de Mercúrio: lá, o dia é mais longo que o ano!</p>
       <p>O chão é cheio de <b>crateras</b>, buracos feitos por pedras que caíram do espaço, como na Lua. E Mercúrio não tem <b>nenhuma lua</b>. Daqui da Terra, ele aparece baixinho perto do horizonte, logo depois do pôr do sol ou antes do Sol nascer.</p>`,
    ],
    quiz: [
      { q: 'Qual é o planeta mais perto do Sol?', o: ['Vênus', 'Terra', 'Mercúrio', 'Marte'], a: 2, hint: 'É o primeiro da fila, o planeta desta missão.', why: 'Mercúrio é o primeiro planeta a partir do Sol.' },
      { q: 'Por que Mercúrio fica tão frio à noite, mesmo perto do Sol?', o: ['Porque tem neve', 'Porque quase não tem atmosfera para guardar o calor', 'Porque gira muito rápido', 'Porque fica longe do Sol'], a: 1, hint: 'Pense no cobertor: o que guarda o calor de um planeta?', why: 'Sem atmosfera, que funciona como um cobertor de ar, o calor foge para o espaço quando o Sol se põe.' },
      { q: 'De dia, Mercúrio chega a 430 °C. À noite, cai a 180 °C abaixo de zero. Quantos graus separam as duas temperaturas?', n: 610, calc: '430 − (−180) = ?', hint: 'De −180 até 0 são 180 graus. De 0 até 430 são mais 430. Some os dois.', why: '180 + 430 = 610 graus de diferença!' },
      { q: 'Um ano de Mercúrio dura 88 dias. Quantos anos COMPLETOS de Mercúrio cabem em 1 ano da Terra (365 dias)?', n: 4, hint: '88 × 4 = 352. E 88 × 5, passa de 365?', why: '88 × 4 = 352 e 88 × 5 = 440, que já passa de 365. Então cabem 4 anos completos, e sobram 13 dias.' },
      { q: 'Em Mercúrio, de um nascer do Sol até o outro passam 176 dias da Terra. Quantos anos de Mercúrio (88 dias cada) cabem nesse único dia?', n: 2, calc: '176 ÷ 88 = ?', hint: 'Quantas vezes 88 cabe em 176? Experimente 88 + 88.', why: '88 + 88 = 176. Um dia de Mercúrio dura 2 anos de Mercúrio: lá, o dia é mais longo que o ano!' },
    ],
  }],

  site: {
    look: [1, 1, 1],
    intro: [
      { who: 'PROF. MARCO', t: 'Ciao, {nome}! Sou o professor Marco, arqueólogo. {{Bem-vindo|Bem-vinda}} a Roma, a cidade eterna!' },
    ],
    lesson: {
      id: 'm4c', subject: 'HISTÓRIA · ITÁLIA', title: 'Os deuses do céu',
      slides: [
        `<p>A <b>Itália</b> fica na Europa e tem o formato de uma <b>bota</b>. A capital é <b>Roma</b>. Lá se fala <b>italiano</b>: <i>ciao</i> = oi, <i>grazie</i> = obrigado, <i>stella</i> = estrela.</p>
         <p>Há uns 2 mil anos, Roma era o centro de um império enorme. O <b>Coliseu</b>, um estádio gigante de pedra, recebia mais de 50 mil pessoas!</p>`,
        `<p>Os romanos deram aos planetas nomes de <b>deuses</b>. Os planetas que dá para ver sem telescópio ganharam o nome do deus que combinava com eles:</p>
         <div class="calc">MERCÚRIO → o mensageiro
VÊNUS    → o amor e a beleza
MARTE    → a guerra
JÚPITER  → o rei dos deuses
SATURNO  → as plantações</div><p>Saturno era o pai de Júpiter. Mercúrio, o planeta mais rápido, ganhou o nome do deus que corria levando recados. Marte, vermelho como sangue, ganhou o nome do deus da guerra.</p>`,
        `<p>Os romanos também tinham seus próprios números, os <b>algarismos romanos</b>. Eles aparecem até hoje em relógios e nos séculos (século XXI).</p>
         <div class="calc">I = 1    V = 5    X = 10
L = 50   C = 100

XII = 10 + 1 + 1 = 12
IV  = 5 − 1 = 4
IX  = 10 − 1 = 9</div><p>A regra: letra <b>menor DEPOIS</b> da maior, <b>soma</b>. Letra <b>menor ANTES</b> da maior, <b>subtrai</b>.</p>`,
      ],
      quiz: [
        { q: 'Qual é a capital da Itália?', o: ['Milão', 'Roma', 'Paris', 'Veneza'], a: 1, hint: 'É a cidade onde você está agora, a cidade do Coliseu.', why: 'Roma, a cidade eterna, é a capital da Itália.' },
        { q: 'O planeta Mercúrio tem o nome de qual deus romano?', o: ['O deus da guerra', 'O deus do mar', 'O mensageiro, que corria muito rápido', 'O rei dos deuses'], a: 2, hint: 'Mercúrio é o planeta mais rápido. Qual deus combina com isso?', why: 'Mercúrio era o mensageiro dos deuses. Por isso o planeta mais rápido ganhou o nome dele!' },
        { q: 'Que número é XIX?', n: 19, hint: 'Separe em duas partes: X e IX. Quanto vale cada uma?', why: 'X = 10 e IX = 10 − 1 = 9. Então 10 + 9 = 19.' },
        { q: 'Qual planeta tem o nome do deus romano da guerra?', o: ['Marte', 'Vênus', 'Júpiter', 'Saturno'], a: 0, hint: 'É o planeta vermelho, cor de sangue.', why: 'Marte era o deus da guerra. O planeta vermelho lembrou os romanos do sangue das batalhas.' },
        { q: 'Que número é XLIX?', n: 49, hint: 'Separe em XL e IX. Em XL, o X (10) vem antes do L (50): subtrai.', why: 'XL = 50 − 10 = 40 e IX = 10 − 1 = 9. Então 40 + 9 = 49.' },
      ],
    },
    outro: [
      { who: 'PROF. MARCO', t: 'Arrivederci! Quer dizer: até logo! Cuidado com o calor de Mercúrio.' },
    ],
  },

  gameIntro: [
    { who: 'KDOK', t: 'Bip! Mercúrio: de um lado, calor de derreter chumbo. Do outro, frio de congelar tudo!' },
    { who: 'KDOK', t: 'Fique na FAIXA DO CREPÚSCULO, entre o dia e a noite. Use ◀ ▶ e olhe os termômetros!' },
  ],

  debrief: [
    { who: 'KDOK', t: 'MISSÃO CUMPRIDA! Atravessamos Mercúrio pela linha do crepúsculo.' },
    { who: 'KDOK', t: 'Viu quantas crateras? Mercúrio parece a nossa Lua, só que perto do Sol.' },
    { who: 'KDOK', t: 'Aqui, de um nascer do Sol ao outro passam 176 dias. Mais que um ano inteiro de Mercúrio!' },
    { who: 'KDOK', t: 'Bip... captei o sinal de novo. Mas ele não vem daqui.' },
  ],
  card: { id: 'mercurio', name: 'MERCÚRIO', lines: ['Planeta mais perto do Sol', 'Diâmetro: 4.879 km (o menor planeta)', 'Ano: 88 dias', 'Temperatura: de −180 °C a 430 °C', 'Luas: nenhuma'] },
  reward: { id: 'refletor', name: 'MANTA REFLETORA', desc: 'Uma capa espelhada que devolve o calor do Sol. Em Vênus, vale um escudo a mais.' },
  radio: 'Aqui é a Astrokdok! Porcentagem está em todo canto: na bateria do celular, na promoção da loja, na chance de chuva. Quem entende não cai em pegadinha. Valeu pelo esforço de hoje! Câmbio!',
  real: 'Logo depois do pôr do sol, olhe para o oeste, bem baixinho no horizonte, por uns 15 minutos. Em algumas semanas do ano, dá para ver Mercúrio como um pontinho brilhante.',

  chat: {
    lia: 'Mercúrio não tem lua nenhuma. Coitado. Eu emprestava a nossa por uns dias.',
    tomas: 'Porcentagem? Então eu quero 100% da pizza. A pizza inteira, professora.',
    bia: 'Calculei: o Calhambeque aguenta 430 graus por uns 3 segundos. Não demora lá.',
    caio: 'Um dia em Mercúrio dura 176 dias? Isso sim é um cochilo decente.',
    rival: 'Mercúrio é o menor planeta, mas é o mais rápido. Tamanho não é documento, {nome}! Boa viagem, tô torcendo!',
    kdok: 'Bip! Um sinal estranho? Achei que era meu estômago. Robôs têm estômago? Não. Então é mistério mesmo.',
    ze: 'Prazer, sou o Zé do Rádio. Faz 40 anos que escuto o céu com essa antena. Esse sinal aí... eu já ouvi antes. Só não lembro onde.',
  },
};
