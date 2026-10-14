'use strict';
// Paletas de cor. Cada uma tem 4 tons, do mais escuro (0) ao mais claro (3), como no Game Boy Color.
// Amarelo e preto ficam só para a Astrokdok (a empresa): logo, prédios, uniformes, barra de informações.
// Uso: A.usePal('grama') e depois desenhar com índices 0-3; ou passar uma cor direta ('#3b6fd6') no lugar do índice.
A.PALS = {
  brand:    ['#0e0e0e', '#6b5200', '#f2c200', '#fff4c0'], // Astrokdok
  ui:       ['#0e0e0e', '#3a3f5c', '#f2c200', '#ffffff'], // barras e textos por cima do jogo
  // natureza e lugares
  grama:    ['#0f3d1e', '#2f8f3a', '#7ccf5a', '#c9f29b'],
  terra:    ['#2e1c0c', '#7a4f24', '#c8924e', '#f2d6a2'],
  areia:    ['#4a3410', '#b88a3a', '#e8c47a', '#fbefcf'],
  pedra:    ['#1e1e24', '#5b5d6b', '#9a9cab', '#dcdde6'],
  madeira:  ['#2b1a0e', '#7a4a24', '#c58a4a', '#f1d3a1'],
  parede:   ['#1c2340', '#3d5a99', '#8fb1e8', '#e6efff'],
  telhado:  ['#2a0b0b', '#8c1f1f', '#d94a3a', '#f7b2a5'],
  ceu:      ['#0b1e4a', '#2f6fd6', '#7fb8ff', '#dff0ff'],
  mar:      ['#06223d', '#0f5e9c', '#3fa2e0', '#bfe6ff'],
  floresta: ['#07230f', '#1d5e2a', '#3f9a45', '#9fd88a'],
  gelo:     ['#12304a', '#5c8fb8', '#a9d4f2', '#f2fbff'],
  noite:    ['#05060f', '#1b2350', '#4f5fae', '#e8ecff'],
  // espaço e corpos celestes
  espaco:   ['#05060f', '#2a2f5a', '#8a90c8', '#ffffff'],
  terra_pl: ['#0a1030', '#1e5bd8', '#3fae4b', '#ffffff'],
  lua:      ['#141414', '#555555', '#9a9a9a', '#dcdcdc'],
  sol:      ['#5a1500', '#e0560e', '#ffb020', '#fff3a0'],
  mercurio: ['#1a1a1a', '#5e5a57', '#9b958f', '#d6d1cc'],
  venus:    ['#3a2a10', '#b07b2c', '#e8c27a', '#fbeec9'],
  marte:    ['#2a0c05', '#8f2f14', '#d4602f', '#f3a77c'],
  asteroide:['#141210', '#4d4640', '#8a8178', '#c9c1b8'],
  jupiter:  ['#2b1a0e', '#8c5a33', '#d9a273', '#f6e3c9'],
  saturno:  ['#2b220e', '#9c7f3c', '#e0c27a', '#f8ecc8'],
  urano:    ['#0b2a2e', '#2f8f9a', '#7fd6dc', '#d9f7f8'],
  netuno:   ['#06143d', '#1f4fc4', '#4f8cff', '#cfe0ff'],
  plutao:   ['#2a1d14', '#8a6a52', '#d2b49a', '#f6ede4'],
  ana_verm: ['#3a0505', '#a3201a', '#ff5a36', '#ffd2b8'],
  nebulosa: ['#140620', '#6b2a8c', '#e0569b', '#ffd1f0'],
  buraco:   ['#000000', '#5a2a00', '#ff8c1a', '#fff2c0'],
  galaxia:  ['#05060f', '#3a3f8f', '#a7b6ff', '#ffffff'],
  fundo:    ['#0a0a40', '#1e4fd8', '#f0a020', '#d02020'], // radiação cósmica de fundo
  fogo:     ['#3a0a00', '#d0300a', '#ff9a1a', '#fff27a'],
};
// cores soltas (pele, cabelo, roupa e destaques)
A.C = {
  branco: '#ffffff', preto: '#141414', cinza: '#8a8f99',
  pele: ['#f6d2b0', '#e0a878', '#b9784a', '#7a4a2a'],
  cabelo: ['#1b1b1b', '#5a3417', '#d8b04a', '#e8e8e8', '#a8401e'],
  vermelho: '#e04848', laranja: '#f08a2c', amarelo: '#f2c200', verde: '#3aa655', azul: '#3b6fd6',
  roxo: '#8e5bd6', rosa: '#e86ab0', ciano: '#3fc6d6', marrom: '#7a4a24', jeans: '#2e4f8c',
};
A.usePal = name => { A.PAL = Array.isArray(name) ? name : (A.PALS[name] || A.PALS.brand); };
A.withPal = (name, fn) => { const old = A.PAL; A.usePal(name); try { return fn(); } finally { A.PAL = old; } };
