'use strict';
// Episódios, patentes e o fim de cada episódio.
A.EPISODES = [
  { n: 1, title: 'Terra, Lua e Sol', upTo: 3, rank: 'PILOTO', end: [
    { who: 'CMTE. DOZINHO', t: 'Cadete {nome}. Três missões, três sucessos.' },
    { who: 'CMTE. DOZINHO', t: 'A partir de hoje, você não é mais cadete. Você é PILOTO da Astrokdok.' },
    { who: '{rival}', t: 'PILOTO! Eu sabia, {nome}! Três missões e eu torcendo em todas. Bora para a próxima!' },
    { who: 'KDOK', t: 'Bip... Comandante, o rádio da base está chiando de um jeito estranho. Shhhhhh...' },
    { who: 'CMTE. DOZINHO', t: 'Vamos investigar. Descanse, piloto. Mercúrio espera por você.' },
  ] },
  { n: 2, title: 'Os vizinhos do Sol', upTo: 7, rank: '{{CAPITÃO|CAPITÃ}}', end: [
    { who: 'CMTE. DOZINHO', t: 'Mercúrio, Vênus, Marte e o Cinturão de Asteroides. Sem um arranhão. Quase.' },
    { who: 'CMTE. DOZINHO', t: 'A partir de hoje, você é {{CAPITÃO|CAPITÃ}} da Astrokdok.' },
    { who: 'ZÉ DO RÁDIO', t: 'E o sinal continua, {{capitão|capitã}}. Mais longe do que qualquer planeta que a gente já visitou.' },
    { who: 'CMTE. DOZINHO', t: 'Então vamos mais longe. Os gigantes esperam: Júpiter, Saturno, Urano, Netuno.' },
  ] },
  { n: 3, title: 'Os gigantes e o gelo', upTo: 12, rank: '{{CONSELHEIRO|CONSELHEIRA}}', end: [
    { who: 'CMTE. DOZINHO', t: '{nome}. Você visitou todos os planetas do Sistema Solar. E ainda deu um oi para Plutão.' },
    { who: 'CMTE. DOZINHO', t: 'Poucos no universo podem dizer isso. A partir de hoje, você faz parte do CONSELHO da Astrokdok.' },
    { who: 'KDOK', t: 'Bip-bop! Próxima parada: as ESTRELAS! Vou precisar de um casaco.' },
  ] },
  { n: 4, title: 'Entre as estrelas', upTo: 15, rank: '{{EXPLORADOR|EXPLORADORA}} ESTELAR', end: [
    { who: 'CMTE. DOZINHO', t: 'Uma estrela vizinha, um berçário de estrelas e o centro da galáxia. Você voltou de todos.' },
    { who: 'CMTE. DOZINHO', t: 'Você agora é {{EXPLORADOR|EXPLORADORA}} ESTELAR.' },
    { who: 'ZÉ DO RÁDIO', t: 'E o sinal... ele vem de fora da nossa galáxia. De muito, muito longe. E de muito, muito tempo atrás.' },
  ] },
  { n: 5, title: 'A borda do universo', upTo: 18, rank: 'COMANDANTE', end: [
    { who: 'CMTE. DOZINHO', t: '{nome}. Você foi do Vale do Capão até a borda do universo observável.' },
    { who: 'CMTE. DOZINHO', t: 'A partir de hoje, você é COMANDANTE da Astrokdok. Como eu.' },
    { who: '{rival}', t: 'Eu falei desde o primeiro dia que você ia longe! Foi a melhor viagem da minha vida, parceria.' },
    { who: 'PROFESSORA', t: 'Parabéns, comandante! E a escola continua amanhã, viu? O universo é enorme e ainda tem muito para aprender.' },
    { who: 'KDOK', t: 'Bip... FIM. Ou melhor: COMEÇO. O universo ainda guarda muitos mistérios. E alguém vai ter que descobrir.' },
  ] },
];
A.rank = () => { let r = 'CADETE'; A.EPISODES.forEach(e => { if (A.S.m >= e.upTo) r = e.rank; }); return A.fmt(r); };
A.epOf = m => A.EPISODES.find(e => m < e.upTo) || A.EPISODES[A.EPISODES.length - 1];

// COSMODEX: toda a jornada até o fim do universo conhecido
A.COSMODEX = ['TERRA', 'LUA', 'SOL', 'MERCÚRIO', 'VÊNUS', 'MARTE', 'CINTURÃO DE ASTEROIDES', 'JÚPITER', 'SATURNO', 'URANO', 'NETUNO', 'PLUTÃO',
  'PRÓXIMA CENTAURI', 'NEBULOSA DE ÓRION', 'BURACO NEGRO SAGITÁRIO A*', 'NUVENS DE MAGALHÃES', 'GALÁXIA DE ANDRÔMEDA', 'BORDA DO UNIVERSO OBSERVÁVEL'];
