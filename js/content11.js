'use strict';
// MISSÃO 11: NETUNO · lançamento de Sriharikota (Índia)
A.MISSIONS[10] = {
  n: 11, name: 'NETUNO', goal: 'voar contra os ventos mais rápidos do Sistema Solar',
  place: 'ÍNDIA', where: 'Sriharikota, Índia', scene: 'india', game: 'neptune', body: 'neptune', room: 'lab', night: true,
  guest: { who: 'DRA. PAZ', look: [1, 2, 0], t: 'O Zé e eu temos um palpite sobre o sinal. Mas palpite não é ciência. Precisamos de provas, {nome}.' },

  brief: [
    { who: 'CMTE. DOZINHO', t: '{{Capitão|Capitã}}. Missão 11: NETUNO, o último planeta. Lá venta a 2.000 km por hora.' },
    { who: 'CMTE. DOZINHO', t: 'Netuno foi descoberto no papel, com matemática, antes de alguém ver ele no telescópio. Hoje você vai entender como.' },
    { who: 'CMTE. DOZINHO', t: 'Aula noturna no LABORATÓRIO.' },
  ],
  ready: [
    { who: 'CMTE. DOZINHO', t: 'Aulas concluídas. O lançamento será em Sriharikota, na Índia, o país que ajudou a inventar o zero.' },
  ],
  teacher: [
    'Boa noite, turma! Hoje é PORTUGUÊS: concordância. O verbo e as palavras da frase precisam combinar, como uma boa equipe.',
    'Agora, a aula de ASTRONOMIA da missão: NETUNO, o planeta achado com papel e lápis! Vamos lá, {nome}.',
  ],
  after: 'Muito bem, {nome}! O Comandante está esperando.',

  lessons: [{
    id: 'm11a', subject: 'PORTUGUÊS', title: 'Concordância verbal e nominal',
    slides: [
      `<p>Numa frase, as palavras trabalham em equipe. Na <b>concordância verbal</b>, o <b>verbo</b> combina com o <b>sujeito</b>: se o sujeito é um só, o verbo fica no singular; se são vários, vai para o plural.</p>
       <div class="calc">O planeta gira.     (um: singular)
Os planetas giram.  (vários: plural)
Eu observo.  Nós observamos.</div><p>Para achar o sujeito, pergunte ao verbo: <b>quem</b> gira? <b>O que</b> gira? A resposta é o sujeito.</p>`,
      `<p>Três casos que confundem muita gente:</p>
       <div class="calc">1. Dois sujeitos juntos: plural
   Urano e Netuno SÃO azuis.

2. Sujeito depois do verbo:
   CHEGARAM as fotos de Netuno.
   (o que chegou? as fotos)

3. Haver no sentido de existir:
   singular, sempre
   HAVIA nuvens no céu.</div><p><b>Erro comum:</b> "Faltou dois alunos". Pergunte: quem faltou? Dois alunos. O certo é "Fal<b>taram</b> dois alunos".</p>`,
      `<p>Na <b>concordância nominal</b>, o artigo, o adjetivo e o numeral combinam com o <b>substantivo</b> em <b>gênero</b> (masculino ou feminino) e <b>número</b> (singular ou plural).</p>
       <div class="calc">o planeta gelado
a lua gelada
os anéis finos
as luas geladas</div><p>Algumas palavras não mudam: <b>menos</b> é sempre menos (nunca "menas"). <b>Meio</b> antes de adjetivo quer dizer "um pouco" e fica igual: "ela ficou meio cansada". Mas quando é metade, combina: "meio-dia e <b>meia</b>" (meia hora).</p>`,
    ],
    quiz: [
      { q: 'Complete: "Os ventos de Netuno ___ a 2.000 km/h."', o: ['chega', 'chegam', 'chegou'], a: 1, hint: 'Pergunte ao verbo: o que chega? Os ventos. É um ou são vários?', why: 'O sujeito é "os ventos", no plural. Então o verbo vai para o plural: os ventos chegam.' },
      { q: 'Complete: "Netuno tem anéis ___."', o: ['fino e escuro', 'finas e escuras', 'finos e escuros'], a: 2, hint: '"Anéis" é masculino e está no plural. Os adjetivos precisam combinar com ele.', why: 'Anéis é masculino plural, então os adjetivos também: anéis finos e escuros.' },
      { q: 'Complete: "Urano e Netuno ___ gigantes de gelo."', o: ['é', 'são', 'era'], a: 1, hint: 'Quantos planetas são o sujeito da frase? Dois sujeitos juntos pedem o verbo no plural.', why: 'O sujeito tem dois planetas, Urano e Netuno. Sujeito composto pede plural: são.' },
      { q: 'Qual frase está de acordo com a norma-padrão?', o: ['Chegaram as fotos de Netuno.', 'Chegou as fotos de Netuno.', 'Chegaram a foto de Netuno.'], a: 0, hint: 'O sujeito está depois do verbo. Pergunte: o que chegou? Depois veja se o verbo combina com a resposta.', why: 'O que chegou? As fotos, no plural. Mesmo vindo depois do verbo, o sujeito manda: chegaram as fotos.' },
      { q: 'Qual frase está de acordo com a norma-padrão?', o: ['Haviam muitas nuvens brancas em Netuno.', 'Havia muitas nuvens brancas em Netuno.', 'Havia muitas nuvem branca em Netuno.'], a: 1, hint: 'Aqui "haver" quer dizer existir. Nesse sentido, ele fica sempre no singular. E o substantivo "nuvens" combina com "brancas".', why: 'Haver no sentido de existir não vai para o plural: havia. E muitas nuvens brancas, tudo no plural. Netuno tem mesmo nuvens brancas de gelo de metano.' },
      { q: 'Qual frase está de acordo com a norma-padrão?', o: ['Ontem tinha menas estrelas no céu.', 'A Dra. Priya ficou meia cansada.', 'Era meio-dia e meia quando a nave partiu.'], a: 2, hint: '"Menos" nunca muda. "Meio" antes de adjetivo quer dizer "um pouco" e não muda. Mas "meia hora" é metade de uma hora.', why: '"Meio-dia e meia" está certo: é meio-dia e meia hora. "Menas" não existe (é menos), e "meia cansada" deveria ser "meio cansada", porque ali meio quer dizer um pouco.' },
    ],
  }, {
    id: 'm11b', subject: 'ASTRONOMIA', title: 'O planeta achado no papel',
    slides: [
      `<p><b>Netuno</b> é o oitavo planeta e, desde que Plutão virou planeta-anão, o <b>mais distante</b> do Sol. Ele não aparece a olho nu, e foi descoberto de um jeito incrível.</p>
       <p>Urano não seguia o caminho que as contas previam: alguma coisa o puxava. O matemático francês <b>Le Verrier</b> calculou onde devia estar um planeta escondido. Em <b>1846</b>, o astrônomo <b>Galle</b> apontou o telescópio para lá e achou Netuno, pertinho do lugar previsto!</p>`,
      `<p>Netuno é um gigante de gelo, azul por causa do gás <b>metano</b>, como Urano. Lá sopram os <b>ventos mais rápidos</b> do Sistema Solar: até uns <b>2.000 km/h</b>. Também aparecem manchas escuras, que são tempestades enormes.</p>
       <div class="calc">distância do Sol: 30 vezes a da Terra
luz do Sol: 8 min até a Terra
            4 h até Netuno
ano: 165 anos da Terra</div><p>Desde 1846, Netuno só deu <b>uma</b> volta completa no Sol: ela terminou em 2011.</p>`,
      `<p><b>Tritão</b>, a maior lua de Netuno, é especial: ela dá a volta no planeta <b>ao contrário</b>, no sentido oposto ao giro de Netuno. E é tão estranha que tem <b>gêiseres</b>, jatos que soltam gás e poeira escura.</p>
       <p>Só uma nave visitou Netuno: a <b>Voyager 2</b>, em <b>1989</b>. Foi ela que fotografou os gêiseres de Tritão e uma tempestade escura do tamanho da Terra, a <b>Grande Mancha Escura</b>.</p>`,
    ],
    quiz: [
      { q: 'Como Netuno foi descoberto, em 1846?', o: ['Por acaso, olhando o céu a olho nu', 'Por cálculos de matemática, antes de ser visto', 'Uma nave tirou uma foto dele'], a: 1, hint: 'Lembre da tela 1: Urano estava sendo puxado por alguma coisa. O que Le Verrier fez com isso?', why: 'Le Verrier calculou onde o planeta devia estar, e Galle o achou lá. Netuno foi descoberto primeiro no papel. A olho nu ele nem aparece.' },
      { q: 'Qual é o planeta mais distante do Sol?', o: ['Urano', 'Plutão', 'Netuno', 'Saturno'], a: 2, hint: 'Cuidado com Plutão: desde 2006 ele é planeta-anão, não planeta.', why: 'Netuno é o oitavo e o mais distante dos planetas. Plutão costuma ficar mais longe, mas é um planeta-anão.' },
      { q: 'Netuno foi descoberto em 1846 e leva 165 anos para dar uma volta no Sol. Em que ano ele completou a primeira volta desde a descoberta?', n: 2011, calc: '1846 + 165 = ?', hint: 'Some o tempo de uma volta ao ano da descoberta.', why: '1846 + 165 = 2011. Só em 2011 Netuno completou a primeira volta desde que foi descoberto.' },
      { q: 'Os ventos de Netuno chegam a 2.000 km/h. Um carro na estrada anda a 100 km/h. Quantas vezes o vento é mais rápido que o carro?', n: 20, calc: '2.000 ÷ 100 = ?', hint: 'Quantos 100 cabem em 2.000? Corte dois zeros dos dois números.', why: '2.000 ÷ 100 = 20. O vento de Netuno é 20 vezes mais rápido que o carro.' },
      { q: 'A luz do Sol leva 8 minutos para chegar à Terra e cerca de 4 horas para chegar a Netuno. Quantas vezes Netuno está mais longe do Sol que a Terra?', n: 30, calc: '4 h = ? min\ndepois ÷ 8', hint: 'Passe 4 horas para minutos (cada hora tem 60). Depois veja quantas vezes 8 cabe nesse número.', why: '4 × 60 = 240 minutos, e 240 ÷ 8 = 30. A luz anda sempre na mesma velocidade, então Netuno está cerca de 30 vezes mais longe do Sol que a Terra.' },
    ],
  }],

  site: {
    look: [0, 2, 1],
    intro: [
      { who: 'DRA. PRIYA', t: 'Namastê, {nome}! Sou a Dra. Priya, da agência espacial da Índia. {{Bem-vindo|Bem-vinda}} a Sriharikota!' },
    ],
    lesson: {
      id: 'm11c', subject: 'HISTÓRIA · ÍNDIA', title: 'O país do zero',
      slides: [
        `<p>Namastê! É um cumprimento em <b>hindi</b>, uma das muitas línguas da <b>Índia</b>. O país fica na Ásia e, desde 2023, é o que tem <b>mais gente</b> no mundo: cerca de 1,4 bilhão de pessoas. A capital é <b>Nova Délhi</b>.</p>
         <p>Estamos em <b>Sriharikota</b>, uma ilha na costa leste, onde fica a base de foguetes do país.</p>`,
        `<p>Os números que a gente usa (0, 1, 2, 3...) se chamam <b>indo-arábicos</b>: nasceram na Índia e foram levados para a Europa pelos árabes. Antes, os europeus usavam os números romanos, que não têm zero.</p>
         <div class="calc">romano:       MMXXIII
indo-arábico:    2023</div><p>Os sábios indianos transformaram o <b>zero</b> num número de verdade. <b>Brahmagupta</b> escreveu regras para fazer contas com ele no ano <b>628</b>.</p>`,
        `<p>Por quase 200 anos, a Índia foi dominada pelo <b>Reino Unido</b>, o país da missão passada. <b>Gandhi</b> liderou a luta pela liberdade com <b>protestos pacíficos</b>, sem armas, como a famosa Marcha do Sal, em 1930. A independência veio em <b>1947</b>.</p>
         <p>Hoje a Índia tem uma agência espacial forte. Em <b>2023</b>, a sonda <b>Chandrayaan-3</b> foi a primeira a pousar perto do <b>polo sul da Lua</b>.</p>`,
      ],
      quiz: [
        { q: 'Qual é a capital da Índia?', o: ['Mumbai', 'Sriharikota', 'Nova Délhi'], a: 2, hint: 'Volte à tela 1. Sriharikota é a ilha da base de foguetes, não a capital.', why: 'A capital da Índia é Nova Délhi. Mumbai é uma cidade enorme do litoral, e Sriharikota é a ilha dos foguetes.' },
        { q: 'Os números que usamos (0, 1, 2, 3...) se chamam:', o: ['romanos', 'indo-arábicos', 'gregos'], a: 1, hint: 'O nome junta o país onde eles nasceram e o povo que os levou para a Europa.', why: 'Indo-arábicos: nasceram na Índia e chegaram à Europa pelos árabes.' },
        { q: 'Até 1947, a Índia foi dominada por qual país?', o: ['Reino Unido', 'França', 'Espanha'], a: 0, hint: 'É o país da missão passada, onde fica Greenwich.', why: 'O Reino Unido dominou a Índia por quase 200 anos. A independência veio em 1947.' },
        { q: 'Como Gandhi liderou a luta pela independência da Índia?', o: ['Com um grande exército', 'Fugindo para outro país', 'Com protestos pacíficos, sem armas'], a: 2, hint: 'Lembre da Marcha do Sal: o povo caminhou junto, sem armas.', why: 'Gandhi usou protestos pacíficos, como marchas e greves, sem violência. Essa ideia inspirou lutas pelo mundo todo.' },
        { q: 'Brahmagupta escreveu as regras do zero em 628. A Chandrayaan-3 pousou na Lua em 2023. Quantos anos separam os dois feitos?', n: 1395, calc: '2023 − 628 = ?', hint: 'Faça 2023 − 628. Se ajudar: 2028 − 628 = 1.400, e 2023 é 5 a menos que 2028.', why: '2023 − 628 = 1.395 anos. Do zero no papel até a Lua!' },
      ],
    },
    outro: [
      { who: 'DRA. PRIYA', t: 'Boa viagem! Segure firme: os ventos de Netuno não brincam.' },
    ],
  },

  gameIntro: [
    { who: 'KDOK', t: 'Bip! Rajadas de vento vão empurrar a nave para os lados. As SETAS no topo avisam para onde vem o vento.' },
    { who: 'KDOK', t: 'Use ◀ ▶ contra o vento e passe pelos ANÉIS de medição. Fuja das manchas escuras: são tempestades!' },
  ],

  debrief: [
    { who: 'KDOK', t: 'MEDIÇÕES FEITAS! Chegamos a Netuno, o último planeta.' },
    { who: 'KDOK', t: 'Ele foi encontrado primeiro no papel, com matemática, e só depois no telescópio.' },
    { who: 'KDOK', t: 'Daqui, o Sol parece só uma estrela muito brilhante.' },
    { who: 'KDOK', t: 'Bip! O Zé e a Dra. Paz fizeram um mapa do sinal: ele vem do céu inteiro, igualzinho. Eles têm uma ideia...' },
  ],
  card: { id: 'netuno', name: 'NETUNO', lines: ['Oitavo planeta, o mais distante', 'Descoberto com matemática em 1846', 'Ventos de 2.000 km/h', 'Ano: 165 anos da Terra', 'Tritão: lua que gira ao contrário'] },
  reward: { id: 'camera', name: 'CÂMERA DE LONGO ALCANCE', desc: 'Fotografa detalhes a milhares de km. Perfeita para Plutão: vale um filme extra.' },
  radio: 'Aqui é a Astrokdok! Concordância parece regra chata, mas é ela que faz a mensagem chegar sem confusão, igual rádio bem sintonizado. Orgulho de ver você encarando cada desafio. Câmbio!',
  real: 'Pegue um livro ou uma notícia e ache três frases com o verbo no plural. Sublinhe o sujeito de cada uma e confira: o verbo combina com ele?',

  chat: {
    yuki: 'Netuno em japonês é Kaiōsei: "estrela do rei do mar". Combina com o deus do mar!',
    lia: 'Netuno só completou UMA volta no Sol desde que foi descoberto. A segunda termina em 2176!',
    tomas: '"Os feijão tá bom"? Errado! OS FEIJÕES ESTÃO BONS. Concordância até na marmita.',
    bia: 'Vento de 2.000 km por hora! Reforcei tudo. Até o parafuso que sobra.',
    caio: 'Aula de noite no laboratório. O microscópio é ótimo para ver o meu sono de perto.',
    rival: 'Netuno é o planeta mais longe de todos! Vou ficar aqui torcendo o tempo inteiro. Segura firme nesse vento, {nome}!',
    kdok: 'Bip! Um bilhão tem 9 zeros. Eu tenho só 1 zero: o do KDK-0!',
    ze: 'Eu e a Dra. Paz temos um palpite. Mas palpite não é ciência. Continue explorando, {nome}.',
  },
};
