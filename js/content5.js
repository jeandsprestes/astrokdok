'use strict';
// MISSÃO 5 — VÊNUS · lançamento de Manaus (AM)
A.MISSIONS[4] = {
  n: 5, name: 'VÊNUS', goal: 'soltar uma sonda-balão nas nuvens de Vênus',
  place: 'MANAUS', where: 'Manaus, Amazonas, Brasil', scene: 'manaus', game: 'venus', body: 'venus', room: 'biblio',

  brief: [
    { who: 'CMTE. JULIUS', t: 'Piloto. O sinal continua. Mercúrio não era a origem.' },
    { who: 'CMTE. JULIUS', t: 'Missão 5: VÊNUS, o planeta mais quente. Pousar lá é impossível: vamos soltar uma sonda-balão nas nuvens.' },
    { who: 'CMTE. JULIUS', t: 'A aula hoje é na BIBLIOTECA da escola. Depois, fale comigo.' },
  ],
  ready: [
    { who: 'CMTE. JULIUS', t: 'Aulas concluídas. Voltamos ao Brasil: o lançamento será em Manaus, no meio da Floresta Amazônica.' },
  ],
  teacher: [
    'Bem-vindos à biblioteca! Hoje é PORTUGUÊS: os ADJETIVOS, as palavras que dão características.',
    'Agora, a aula da missão do {nome}: VÊNUS, o planeta mais quente de todos!',
  ],
  after: 'Ótimo, {nome}! Pode ir falar com o Comandante.',

  lessons: [{
    id: 'm5a', subject: 'PORTUGUÊS', title: 'Adjetivos',
    slides: [
      `<p><b>Substantivo</b> dá nome às coisas: planeta, nuvem, nave.</p>
       <p><b>Adjetivo</b> diz COMO a coisa é: planeta <b>quente</b>, nuvem <b>amarela</b>, nave <b>veloz</b>.</p>`,
      `<p>O adjetivo combina com o substantivo em <b>gênero</b> (masculino ou feminino) e <b>número</b> (singular ou plural):</p>
       <div class="calc">planeta brilhante
estrelas brilhantes
nuvem amarela
nuvens amarelas</div>`,
      `<p>Muitos adjetivos têm um <b>antônimo</b> (o contrário):</p>
       <div class="calc">quente ↔ frio
grande ↔ pequeno
claro  ↔ escuro
rápido ↔ lento</div>`,
    ],
    quiz: [
      { q: 'Na frase "Vênus é um planeta quente", qual palavra é adjetivo?', o: ['Vênus', 'planeta', 'quente', 'é'], a: 2, why: '"Quente" diz como o planeta é.' },
      { q: 'Qual é o adjetivo em "As nuvens amarelas cobrem Vênus"?', o: ['nuvens', 'amarelas', 'cobrem', 'Vênus'], a: 1, why: '"Amarelas" é a característica das nuvens.' },
      { q: 'Complete: "As estrelas estão ____."', o: ['brilhante', 'brilhantes'], a: 1, why: 'Estrelas é plural, então o adjetivo também vai para o plural.' },
      { q: 'Qual é o antônimo (o contrário) de "quente"?', o: ['frio', 'morno', 'calor', 'fogo'], a: 0, why: 'Quente ↔ frio.' },
      { q: 'Qual frase está certa?', o: ['A nave nova decolou.', 'A nova nave decolou.', 'As duas estão certas.'], a: 2, why: 'Em português, o adjetivo pode vir antes ou depois do substantivo.' },
    ],
  }, {
    id: 'm5b', subject: 'CIÊNCIAS + MATEMÁTICA', title: 'Vênus, o planeta estufa',
    slides: [
      `<p><b>Vênus</b> é o segundo planeta a partir do Sol e quase do mesmo tamanho da Terra. Mas é um lugar terrível:</p>
       <p>O chão chega a <b>465 °C</b>. É o planeta <b>mais quente</b>, mais até que Mercúrio, que fica mais perto do Sol!</p>`,
      `<p>Por quê? O <b>efeito estufa</b>. O ar de Vênus é grosso, cheio de gás carbônico, e <b>prende o calor</b> como um carro fechado no sol.</p>
       <p>As nuvens são de <b>ácido</b>, e a pressão do ar é 90 vezes maior que a da Terra: amassaria uma nave como uma latinha.</p>`,
      `<p>Vênus gira <b>ao contrário</b>: lá o Sol nasce no <b>oeste</b>! E gira tão devagar que o dia (243 dias) é maior que o ano (225 dias).</p>
       <p>A <b>"Estrela d'Alva"</b>, que brilha forte de manhãzinha ou no fim da tarde, na verdade é o planeta Vênus.</p>`,
    ],
    quiz: [
      { q: 'Qual é o planeta MAIS QUENTE do Sistema Solar?', o: ['Mercúrio', 'Vênus', 'Marte', 'Júpiter'], a: 1, why: 'Vênus, por causa do efeito estufa.' },
      { q: 'Vênus leva 243 dias para girar uma vez e 225 dias para dar a volta no Sol. Quantos dias a mais leva o giro?', n: 18, hint: 'Faça 243 − 225.', why: '243 − 225 = 18 dias. O dia é maior que o ano!' },
      { q: 'O que deixa Vênus tão quente?', o: ['Estar mais perto do Sol que Mercúrio', 'O efeito estufa: o ar grosso prende o calor', 'Vulcões de lava', 'Fogueiras'], a: 1, why: 'O ar de Vênus funciona como um cobertor que não deixa o calor sair.' },
      { q: 'Em Vênus, o Sol nasce de que lado?', o: ['leste', 'oeste'], a: 1, why: 'Vênus gira ao contrário da Terra.' },
      { q: 'A "Estrela d\'Alva", que brilha de manhãzinha, na verdade é:', o: ['uma estrela', 'o planeta Vênus', 'um avião', 'a Lua'], a: 1, why: 'É Vênus refletindo a luz do Sol.' },
    ],
  }],

  site: {
    look: [0, 2, 1],
    intro: [
      { who: 'DONA IARA', t: 'Olá, {nome}! Sou a Dona Iara, bióloga da floresta. Bem-vindo a Manaus, no coração da Amazônia!' },
    ],
    lesson: {
      id: 'm5c', subject: 'GEOGRAFIA · AMAZONAS', title: 'A floresta que cuida do clima',
      slides: [
        `<p><b>Manaus</b> é a capital do estado do <b>Amazonas</b>, na região <b>Norte</b>. Ela fica no meio da <b>Floresta Amazônica</b>, a maior floresta tropical do mundo.</p>
         <p>O <b>Teatro Amazonas</b>, com sua cúpula colorida, foi inaugurado em <b>1896</b>, na época da borracha.</p>`,
        `<p>Perto de Manaus acontece o <b>Encontro das Águas</b>: o Rio Negro, escuro, e o Rio Solimões, barrento, correm lado a lado por quilômetros <b>sem se misturar</b>!</p>
         <p>Depois, juntos, formam o grande <b>Rio Amazonas</b>.</p>`,
        `<p>As árvores <b>absorvem gás carbônico</b> do ar para crescer. Assim, a floresta ajuda a controlar o efeito estufa da Terra.</p>
         <p>Vênus é o exemplo do que acontece quando o efeito estufa sai do controle. Cuidar da floresta é cuidar do planeta.</p>`,
      ],
      quiz: [
        { q: 'Manaus é a capital de qual estado?', o: ['Pará', 'Amazonas', 'Acre', 'Roraima'], a: 1, why: 'Amazonas, na região Norte.' },
        { q: 'O que é o Encontro das Águas?', o: ['Dois rios que correm juntos sem se misturar por quilômetros', 'Uma cachoeira', 'Uma festa', 'Um lago'], a: 0, why: 'O Rio Negro e o Solimões, lado a lado!' },
        { q: 'As árvores ajudam a combater o efeito estufa porque:', o: ['absorvem gás carbônico do ar', 'fazem sombra', 'atraem chuva de pedra', 'esfriam os rios'], a: 0, why: 'Elas tiram gás carbônico do ar para crescer.' },
        { q: 'O Teatro Amazonas foi inaugurado em 1896. Quantos anos ele fez em 1996?', n: 100, hint: 'Faça 1996 − 1896.', why: '100 anos: um século!' },
        { q: 'A Floresta Amazônica é:', o: ['a maior floresta tropical do mundo', 'um deserto', 'uma montanha', 'uma cidade'], a: 0, why: 'A maior do mundo, e a maior parte dela fica no Brasil.' },
      ],
    },
    outro: [
      { who: 'DONA IARA', t: 'Boa viagem! E lá de cima, repare como a nossa floresta é verde. Em Vênus não tem nada disso.' },
    ],
  },

  gameIntro: [
    { who: 'KDOK', t: 'Bip! Vamos soltar a sonda-balão nas nuvens de Vênus, a 50 km de altura.' },
    { who: 'KDOK', t: 'SEGURE A para subir. SOLTE para descer. Passe pelas brechas das nuvens de ácido!' },
    { who: 'KDOK', t: 'Pegue os pacotes de dados que brilham. Precisamos de 12.' },
  ],

  debrief: [
    { who: 'KDOK', t: 'DADOS COLETADOS! A sonda flutuou onde o ar de Vênus é quase como o da Terra.' },
    { who: 'KDOK', t: 'Lá embaixo, o chão tem 465 °C e a pressão amassaria a nave como uma latinha.' },
    { who: 'KDOK', t: 'Vênus é quase do tamanho da Terra. Um planeta gêmeo que deu muito errado.' },
    { who: 'KDOK', t: 'Bip! O sinal apareceu de novo. Igualzinho. Ele também não vem daqui.' },
  ],
  card: { id: 'venus', name: 'VÊNUS', lines: ['Segundo planeta a partir do Sol', 'Temperatura: 465 °C (o mais quente)', 'Gira ao contrário: o Sol nasce no oeste', 'O dia (243 dias) é maior que o ano (225)', 'Nuvens de ácido'] },
  reward: { id: 'casco', name: 'CASCO ANTIÁCIDO', desc: 'Uma camada que protege a nave de ácido e poeira. Em Marte, vale um escudo a mais.' },
  radio: 'Filho, amanhã cedo, antes do Sol nascer, vou procurar a Estrela d\'Alva. Agora eu sei que é Vênus, e que você passou por lá. Câmbio!',
  real: 'Deixe dois copos com água no sol, um coberto com plástico transparente e outro não. Depois de 1 hora, coloque o dedo: qual ficou mais quente? Esse é o efeito estufa em miniatura!',

  chat: {
    lia: 'Vênus brilha tanto que já teve gente achando que era disco voador!',
    tomas: 'Nuvens de ácido? Então lá não dá pra fazer piquenique.',
    bia: 'Se a pressão lá é 90 vezes a daqui, o Calhambeque vira panqueca. Vai de balão!',
    caio: 'Em Vênus o dia é maior que o ano. Imagina esperar 243 dias pelo fim de semana.',
    rival: 'Hunf. Vênus é o planeta mais quente. Igual a mim.',
    kdok: 'Bip! Liguei o rádio da base no sinal. Ele faz um chiado: shhhhhh. Muito misterioso.',
    ze: 'O sinal vem do céu inteiro ao mesmo tempo. Nunca vi coisa assim. Quer dizer... acho que já vi.',
  },
};
