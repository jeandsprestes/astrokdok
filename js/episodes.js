'use strict';
// Episódios, patentes e o fim de cada episódio.
A.EPISODES = [
  { n: 1, title: 'Terra, Lua e Sol', upTo: 3, rank: 'PILOTO', end: [
    { who: 'CMTE. JULIUS', t: 'Cadete {nome}. Três missões, três sucessos.' },
    { who: 'CMTE. JULIUS', t: 'A partir de hoje, você não é mais cadete. Você é PILOTO da Astrokdok.' },
    { who: '{rival}', t: 'Hunf... tá bom. Você é bom. Mas só um pouquinho.' },
    { who: 'KDOK', t: 'Bip... Comandante, o rádio da base está chiando de um jeito estranho. Shhhhhh...' },
    { who: 'CMTE. JULIUS', t: 'Vamos investigar. Descanse, piloto. Mercúrio espera por você.' },
  ] },
  { n: 2, title: 'Os vizinhos do Sol', upTo: 7, rank: 'CAPITÃO', end: [
    { who: 'CMTE. JULIUS', t: 'Mercúrio, Vênus, Marte e o Cinturão de Asteroides. Sem um arranhão. Quase.' },
    { who: 'CMTE. JULIUS', t: 'A partir de hoje, você é CAPITÃO da Astrokdok.' },
    { who: 'ZÉ DO RÁDIO', t: 'E o sinal continua, capitão. Mais longe do que qualquer planeta que a gente já visitou.' },
    { who: 'CMTE. JULIUS', t: 'Então vamos mais longe. Os gigantes esperam: Júpiter, Saturno, Urano, Netuno.' },
  ] },
  { n: 3, title: 'Os gigantes e o gelo', upTo: 12, rank: 'CONSELHEIRO', end: [
    { who: 'CMTE. JULIUS', t: '{nome}. Você visitou todos os planetas do Sistema Solar. E ainda deu um oi para Plutão.' },
    { who: 'CMTE. JULIUS', t: 'Poucos no universo podem dizer isso. A partir de hoje, você faz parte do CONSELHO da Astrokdok.' },
    { who: 'KDOK', t: 'Bip-bop! Próxima parada: as ESTRELAS! Vou precisar de um casaco.' },
  ] },
  { n: 4, title: 'Entre as estrelas', upTo: 15, rank: 'EXPLORADOR ESTELAR', end: [
    { who: 'CMTE. JULIUS', t: 'Uma estrela vizinha, um berçário de estrelas e o centro da galáxia. Você voltou de todos.' },
    { who: 'CMTE. JULIUS', t: 'Você agora é EXPLORADOR ESTELAR.' },
    { who: 'ZÉ DO RÁDIO', t: 'E o sinal... ele vem de fora da nossa galáxia. De muito, muito longe. E de muito, muito tempo atrás.' },
  ] },
  { n: 5, title: 'A borda do universo', upTo: 18, rank: 'COMANDANTE', end: [
    { who: 'CMTE. JULIUS', t: '{nome}. Você foi do Vale do Capão até a borda do universo observável.' },
    { who: 'CMTE. JULIUS', t: 'A partir de hoje, você é COMANDANTE da Astrokdok. Como eu.' },
    { who: '{rival}', t: 'Comandante {nome}... soa bem. Mas um dia eu te alcanço, viu?' },
    { who: 'PROFª MARI', t: 'Parabéns, comandante! E a escola continua amanhã, viu? O universo é enorme e ainda tem muito para aprender.' },
    { who: 'KDOK', t: 'Bip... FIM. Ou melhor: COMEÇO. O universo ainda guarda muitos mistérios. E alguém vai ter que descobrir.' },
  ] },
];
A.rank = () => { let r = 'CADETE'; A.EPISODES.forEach(e => { if (A.S.m >= e.upTo) r = e.rank; }); return r; };
A.epOf = m => A.EPISODES.find(e => m < e.upTo) || A.EPISODES[A.EPISODES.length - 1];

// COSMODEX: toda a jornada até o fim do universo conhecido
A.COSMODEX = ['TERRA', 'LUA', 'SOL', 'MERCÚRIO', 'VÊNUS', 'MARTE', 'CINTURÃO DE ASTEROIDES', 'JÚPITER', 'SATURNO', 'URANO', 'NETUNO', 'PLUTÃO',
  'PRÓXIMA CENTAURI', 'NEBULOSA DE ÓRION', 'BURACO NEGRO SAGITÁRIO A*', 'NUVENS DE MAGALHÃES', 'GALÁXIA DE ANDRÔMEDA', 'BORDA DO UNIVERSO OBSERVÁVEL'];
