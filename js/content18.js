'use strict';
// MISSÃO 18: BORDA DO UNIVERSO OBSERVÁVEL · lançamento do Vale do Capão, à noite
A.MISSIONS[17] = {
  n: 18, name: 'A BORDA', goal: 'chegar até a luz mais antiga do universo e descobrir o sinal',
  place: 'VALE DO CAPÃO', where: 'Vale do Capão, Bahia, Brasil', scene: 'capaoNoite', game: 'final', body: 'cmb', room: 'school', night: true,
  go: 'Ir para a plataforma para a missão final?',

  brief: [
    { who: 'CMTE. DOZINHO', t: '{nome}, esta é a MISSÃO FINAL.' },
    { who: 'CMTE. DOZINHO', t: 'Missão 18: a BORDA DO UNIVERSO OBSERVÁVEL. O lugar mais distante que a luz nos deixa ver. É lá que o Zé e a Dra. Paz acham que está a origem do sinal.' },
    { who: 'CMTE. DOZINHO', t: 'Antes, a professora preparou uma PROVA FINAL. Nem eu escapei de prova final. Vá.' },
  ],
  ready: [
    { who: 'CMTE. DOZINHO', t: 'Prova final concluída. O lançamento será aqui mesmo, no Vale do Capão, à noite. Onde tudo começou.' },
    { who: 'CMTE. DOZINHO', t: 'Tem gente esperando você na plataforma.' },
  ],
  teacher: [
    'Boa noite, turma. Hoje é a PROVA FINAL: um pouquinho de tudo o que aprendemos, de matemática, português, inglês, ciências, história e geografia. Respirem fundo. Vocês sabem muito mais do que imaginam.',
    'E agora, {nome}, a última aula de ASTRONOMIA: a história do UNIVERSO inteiro, do começo de tudo até hoje!',
  ],
  after: '{nome}... foi uma honra ser sua professora. Vá lá e descubra o sinal.',

  lessons: [{
    id: 'm18a', subject: 'PROVA FINAL', title: 'Um pouco de tudo',
    slides: [
      `<p>Chegou a <b>PROVA FINAL</b>, {nome}. São 10 desafios sobre tudo o que a gente estudou nas missões: 4 de matemática, 2 de português, 1 de inglês, 1 de ciências, 1 de história e 1 de geografia.</p>
       <p>Não tenha pressa. Leia cada pergunta duas vezes, faça a conta no papel e, se errar, leia a dica com calma. O Kdok pode ajudar uma vez. Você sabe muito mais do que imagina.</p>`,
    ],
    quiz: [
      { q: 'A viagem até a borda do universo tem 50 etapas, e {nome} já fez 3/5 delas. Quantas etapas já foram?', n: 30, calc: '3/5 de 50 = ?', hint: 'Primeiro 1/5 de 50: divida 50 por 5. Depois multiplique por 3.', why: '50 ÷ 5 = 10, e 10 × 3 = 30 etapas.' },
      { q: 'Na frase "A nave azul pousou devagar.", qual palavra é um ADJETIVO?', o: ['nave', 'azul', 'pousou', 'devagar'], a: 1, hint: 'O adjetivo dá uma característica ao substantivo: ele diz como a coisa é.', why: '"Azul" diz como é a nave: é adjetivo. "Nave" é substantivo, "pousou" é verbo e "devagar" é advérbio (diz como ela pousou).' },
      { q: 'O Vale do Capão fica a uns 12° ao sul da linha do Equador. Em que hemisfério ele está?', o: ['No hemisfério Norte', 'No hemisfério Sul', 'Exatamente em cima do Equador'], a: 1, hint: 'A linha do Equador divide a Terra em duas metades. "Ao sul do Equador" fica em qual metade?', why: 'Quem fica ao sul do Equador está no hemisfério Sul. A latitude do Capão é de uns 12° Sul.' },
      { q: 'Uma luneta custava R$ 80 e teve 25% de desconto. Por quanto ela ficou, em reais?', n: 60, calc: '80 − 25% de 80 = ?', hint: '25% é a quarta parte: 80 ÷ 4 é o desconto. Depois tire o desconto do preço.', why: '80 ÷ 4 = 20 reais de desconto. 80 − 20 = 60 reais.' },
      { q: 'Complete: "Jupiter is ___ than Earth."', o: ['big', 'the biggest', 'bigger'], a: 2, hint: 'Comparando duas coisas com "than", o adjetivo curto ganha -er no fim.', why: 'Comparando dois planetas, usa-se "bigger than": "Júpiter é maior que a Terra". O big dobra o g: bigger.' },
      { q: 'Quando o gelo derrete e vira água líquida, como se chama essa mudança de estado?', o: ['Evaporação', 'Fusão', 'Condensação', 'Solidificação'], a: 1, hint: 'É a passagem do estado sólido para o estado líquido.', why: 'Do sólido para o líquido é fusão. Do líquido para o gasoso é vaporização; do gasoso para o líquido, condensação; do líquido para o sólido, solidificação.' },
      { q: 'O Kdok pensou num número, multiplicou por 3 e somou 7. Deu 25. Resolva a equação e descubra o número.', n: 6, calc: '3x + 7 = 25', hint: 'Tire 7 dos dois lados: 3x = 18. Depois divida os dois lados por 3.', why: '3x = 25 − 7 = 18, e x = 18 ÷ 3 = 6. Conferindo: 3 × 6 + 7 = 25.' },
      { q: 'A frota de Cabral chegou à Bahia em 1500. Esse ano pertence a qual século?', o: ['Século XIV', 'Século XV', 'Século XVI'], a: 1, hint: 'O século XV vai do ano 1401 até o ano 1500. O ano terminado em 00 é o último do seu século.', why: 'O século XV começa em 1401 e termina em 1500. Por isso 1500 ainda é século XV; o século XVI só começa em 1501.' },
      { q: 'Qual destas frases segue a norma-padrão da concordância?', o: ['Os astronauta chegaram cansados.', 'Faltam dois minutos para o lançamento.', 'Falta duas peças na nave.', 'As estrelas brilha muito.'], a: 1, hint: 'O verbo concorda com o sujeito. Em "falta" ou "faltam", o sujeito vem depois do verbo: o que é que falta?', why: 'Quem falta são "dois minutos", no plural, então o verbo vai para o plural: faltam. As outras deviam ser: os astronautas chegaram, faltam duas peças, as estrelas brilham.' },
      { q: 'Uma rampa de lançamento sobe 5 m de altura e avança 12 m no chão. Quanto mede a rampa (a hipotenusa), em metros?', n: 13, calc: '5² + 12² = c²', hint: '5 × 5 = 25 e 12 × 12 = 144. Some os dois e procure o número que, vezes ele mesmo, dá essa soma.', why: '25 + 144 = 169, e 13 × 13 = 169. A rampa mede 13 m.' },
    ],
  }, {
    id: 'm18b', subject: 'ASTRONOMIA', title: 'A história do universo',
    slides: [
      `<p>O universo tem uns <b>13,8 bilhões de anos</b>. No começo, tudo estava muito quente e apertado. Desde então, o espaço está se <b>expandindo</b>: esticando, ficando maior, e as galáxias se afastam umas das outras. Esse começo se chama <b>Big Bang</b>. Cuidado: não foi uma explosão num lugar só. Foi o espaço inteiro começando a crescer.</p>
       <div class="calc">13,8 bilhões de anos atrás → o começo
380 mil anos depois → a luz mais antiga
4,6 bilhões de anos atrás → nasce o Sol
hoje → você, no Capão</div>`,
      `<p>A luz demora para viajar. A luz de Andrômeda leva 2,5 milhões de anos para chegar aqui. Então, quanto mais longe a gente olha, mais <b>antigo</b> é o que a gente vê: olhar longe é olhar o <b>passado</b>.</p>
       <p>Mas existe um limite: só conseguimos ver até onde a luz teve tempo de chegar até nós desde o começo do universo. Por isso falamos em universo <b>observável</b>. Pode existir muito mais além dele, mas a luz de lá ainda não chegou.</p>`,
      `<p>A <b>luz mais antiga</b> que conseguimos ver saiu quando o universo tinha só uns 380 mil anos. Ela se chama <b>Radiação Cósmica de Fundo</b>. Hoje ela é muito fria (uns <b>−270 °C</b>) e vem de <b>todas as direções</b> do céu.</p>
       <p>Ela foi descoberta sem querer, em <b>1964</b>, por dois cientistas dos Estados Unidos, Arno Penzias e Robert Wilson, com uma antena gigante. Eles ouviam um chiado e acharam que era... <b>cocô de pombo</b> na antena! Limparam tudo, e o chiado continuou. Em 1978 eles ganharam o Prêmio Nobel.</p>`,
    ],
    quiz: [
      { q: 'Quantos anos tem o universo, mais ou menos?', o: ['2.026 anos', '4,6 bilhões de anos', '13,8 bilhões de anos', '1 milhão de anos'], a: 2, hint: 'Cuidado: 4,6 bilhões de anos é a idade do Sol, e o universo é bem mais velho que ele.', why: 'O universo tem uns 13,8 bilhões de anos. O Sol, uns 4,6 bilhões: ele nasceu bem depois.' },
      { q: 'A luz mais antiga do universo foi descoberta sem querer, em 1964. Com qual aparelho?', o: ['Uma antena', 'Um microscópio', 'Uma luneta de brinquedo'], a: 0, hint: 'Os cientistas ouviam um chiado que não parava.', why: 'Foi com uma antena gigante. O chiado que os cientistas ouviam era a luz mais antiga do universo.' },
      { q: 'Por que se diz universo OBSERVÁVEL?', o: ['Porque tem um observatório na borda dele', 'Porque só vemos até onde a luz teve tempo de chegar até nós', 'Porque dá para ver tudo o que existe'], a: 1, hint: 'A luz demora para viajar, e o universo tem uma idade.', why: 'Desde o começo do universo, a luz só teve tempo de vir de uma certa distância. O que está além disso ainda não dá para ver.' },
      { q: 'A luz mais antiga é muito fria: uns −270 °C. A água congela a 0 °C. Quantos graus ela está abaixo do ponto de congelamento da água?', n: 270, calc: '0 − (−270) = ?', hint: 'Na reta numérica, do −270 até o 0 há quantas casas?', why: 'De −270 até 0 são 270 graus. Ela está 270 graus abaixo do congelamento da água.' },
      { q: 'O universo tem uns 13,8 bilhões de anos, e o Sol, uns 4,6 bilhões. Quantos MILHÕES de anos o universo já tinha quando o Sol nasceu?', n: 9200, calc: '13.800 − 4.600 = ?', hint: 'Passe para milhões: 13,8 bilhões = 13.800 milhões e 4,6 bilhões = 4.600 milhões. Depois subtraia.', why: '13.800 − 4.600 = 9.200 milhões de anos (9,2 bilhões). O universo já era bem velho quando o Sol nasceu.' },
    ],
  }],

  site: {
    look: [3, 1, 0],
    extra: ['paz', [0, 1, 0]],
    intro: [
      { who: 'ZÉ DO RÁDIO', t: 'Chegou a hora, {nome}. A Dra. Paz e eu vamos acompanhar tudo daqui, pela antena.' },
      { who: '{rival}', t: 'Daqui a pouco eu subo pra torre de controle pra te ver decolar, {nome}. Vai lá. A gente torce por você!' },
      { who: 'ZÉ DO RÁDIO', t: 'Antes de subir, uma última aula. Sobre o céu daqui de casa.' },
    ],
    lesson: {
      id: 'm18c', subject: 'CIÊNCIAS · CÉU DO CAPÃO', title: 'O céu de casa',
      slides: [
        `<p>O céu do Capão tem tantas estrelas porque aqui, no meio da Chapada Diamantina, tem <b>pouca luz de cidade</b>. As luzes fortes das cidades clareiam o céu e apagam as estrelas fracas: isso se chama <b>poluição luminosa</b>.</p>
         <p>Numa cidade grande, dá para ver umas poucas dezenas de estrelas. Num lugar escuro como o Capão, milhares, e até a faixa da Via Láctea.</p>`,
        `<p>A <b>bandeira do Brasil</b> mostra o céu do Rio de Janeiro na manhã de <b>15 de novembro de 1889</b>, dia da Proclamação da República.</p>
         <p>Ela tem <b>27 estrelas</b>: uma para cada um dos 26 estados e uma para o Distrito Federal. O <b>Cruzeiro do Sul</b> está lá, e também está no céu do Capão.</p>`,
        `<p>Em <b>1961</b>, o russo <b>Yuri Gagarin</b> foi o primeiro ser humano a ir ao espaço. Em <b>2006</b>, <b>Marcos Pontes</b> foi o primeiro astronauta brasileiro a ir ao espaço: ele passou uns dias na Estação Espacial Internacional. Em <b>1992</b>, a médica <b>Mae Jemison</b>, dos Estados Unidos, foi a primeira mulher negra a ir ao espaço. E aqui no Brasil, a física <b>Sonia Guimarães</b> foi a primeira mulher negra doutora em física do país e virou professora do <b>ITA</b>, uma escola que forma engenheiros de aviões e foguetes.</p>
         <p>Um dia, pode ser alguém daqui do Capão.</p>`,
      ],
      quiz: [
        { q: 'Por que o céu do Capão tem tantas estrelas visíveis?', o: ['Porque o Capão fica mais perto do espaço', 'Porque tem pouca luz de cidade (pouca poluição luminosa)', 'Porque as estrelas gostam de lá'], a: 1, hint: 'Pense no que apaga as estrelas fracas nas cidades grandes.', why: 'Com menos luz artificial, o céu fica mais escuro e as estrelas fracas aparecem.' },
        { q: 'Qual grupo de estrelas aparece na bandeira do Brasil e também no céu do Capão?', o: ['Cruzeiro do Sul', 'Ursa Maior', 'Cassiopeia'], a: 0, hint: 'O nome dele já diz de que lado do céu ele fica.', why: 'O Cruzeiro do Sul está na bandeira e brilha no céu do Capão. Ele ajuda a achar o sul.' },
        { q: 'Quantas estrelas tem a bandeira do Brasil?', n: 27, calc: '26 + 1 = ?', hint: 'Uma para cada estado (são 26) e mais uma para o Distrito Federal.', why: '26 estados + 1 Distrito Federal = 27 estrelas.' },
        { q: 'A bandeira do Brasil mostra o céu do Rio na manhã de 15 de novembro de qual ano?', n: 1889, hint: 'É o ano da Proclamação da República.', why: 'Em 1889, no dia da Proclamação da República.' },
        { q: 'Marcos Pontes foi ao espaço em 2006. Yuri Gagarin, o primeiro ser humano no espaço, foi em 1961. Quantos anos depois de Gagarin foi o primeiro brasileiro?', n: 45, calc: '2006 − 1961 = ?', hint: 'Faça 2006 − 1961. Dica: de 1961 até 2001 são 40 anos.', why: 'De 1961 até 2001 são 40 anos, e de 2001 até 2006, mais 5. 40 + 5 = 45 anos.' },
      ],
    },
    outro: [
      { who: 'DRA. PAZ', t: '¡Buena suerte, comandante! Quer dizer... quase comandante.' },
    ],
  },

  gameIntro: [
    { who: 'KDOK', t: 'Bip-bop. Missão final. Três etapas.' },
    { who: 'KDOK', t: 'Primeiro, um campo de asteroides. Depois, as luas-guia. E por último, a Antena do Zé: SINTONIZE o sinal girando o botão com ◀ ▶ e aperte A quando o chiado sumir.' },
    { who: 'KDOK', t: 'Tudo o que você aprendeu vai servir agora. Vamos!' },
  ],

  debrief: [
    { who: 'ZÉ DO RÁDIO', t: 'Você está ouvindo? Esse é o SINAL. É a Radiação Cósmica de Fundo: a luz mais antiga do universo.' },
    { who: 'DRA. PAZ', t: 'Ela saiu de todo lugar ao mesmo tempo, quando o universo era um bebê de 380 mil anos. Por isso vem de todas as direções!' },
    { who: 'DRA. PAZ', t: 'E é tão velha e esticada pela expansão do universo que ficou fria: −270 °C. Era a "temperatura" do sinal.' },
    { who: 'ZÉ DO RÁDIO', t: 'E sabe onde eu tinha ouvido antes? No chiado da TV antiga, quando saía do ar. Um pedacinho daquele chiado era essa luz!' },
    { who: 'KDOK', t: 'Bip... então o mistério era o universo dizendo "oi". Desde o começo de tudo.' },
    { who: 'CMTE. DOZINHO', t: 'Missão final: cumprida. Volte para casa, {nome}.' },
  ],
  card: { id: 'borda', name: 'BORDA DO UNIVERSO OBSERVÁVEL', lines: ['Idade do universo: 13,8 bilhões de anos', 'A luz mais antiga: Radiação Cósmica de Fundo', 'Temperatura: −270 °C', 'Vem de todas as direções do céu', 'Descoberta em 1964, sem querer'] },
  reward: { id: 'medalha', name: 'MEDALHA ASTROKDOK', desc: 'A maior honra da Astrokdok: para quem foi até a borda do universo e voltou para casa.' },
  radio: 'Aqui é a Astrokdok! Você foi até o começo do universo e voltou. Valeu por cada aula, cada conta no papel e cada vez que tentou de novo. Nem todo assunto vai parecer legal de cara, mas sempre tem alguma coisa boa pra aprender: é só dar uma chance pro conhecimento. Agora vai jantar! Câmbio e desligo.',
  real: 'Última missão de verdade: numa noite escura, deite no chão com alguém de casa e olhe o céu por 10 minutos. Cada pontinho é uma história que você agora conhece.',

  chat: {
    yuki: 'Obrigada por me mostrar o Capão, {nome}. Quando eu voltar pro Japão, vou contar tudo!',
    lia: 'Hoje é a prova final. Desenhei o universo inteiro no caderno pra dar sorte.',
    tomas: 'Prova final? Eu estudei. Principalmente a parte da pizza de frações.',
    bia: 'Revisei a nave mais uma vez. Coloquei o parafuso que sempre sobrava. Agora ela está completa.',
    caio: 'Fiquei acordado a noite inteira estudando. Primeira vez na vida. Tô orgulhoso.',
    rival: '{nome}, vou estar na torre de controle torcendo mais alto que o barulho do foguete. Se der frio na barriga, olha pra torre: eu vou estar acenando com as duas mãos!',
    kdok: 'Bip-bop... última missão. Meus circuitos estão fazendo um barulho estranho. Acho que é emoção.',
    ze: 'Chegou a hora, {nome}. Vamos ouvir o sinal juntos. Te espero na plataforma.',
  },
};
