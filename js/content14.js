'use strict';
// MISSÃO 14: NEBULOSA DE ÓRION · lançamento de Chichén Itzá (México)
A.MISSIONS[13] = {
  n: 14, name: 'ÓRION', goal: 'mapear as estrelas de Órion e entrar na nebulosa',
  place: 'MÉXICO', where: 'Chichén Itzá, México', scene: 'mexico', game: 'orion', body: 'nebula', room: 'patio', night: true,

  brief: [
    { who: 'CMTE. DOZINHO', t: '{{Conselheiro|Conselheira}}. Missão 14: a NEBULOSA DE ÓRION, um berçário onde estrelas estão nascendo agora.' },
    { who: 'CMTE. DOZINHO', t: 'Para chegar lá, você precisa mapear as estrelas de Órion. Ligue os pontos certos.' },
    { who: 'CMTE. DOZINHO', t: 'Hoje a aula é à NOITE, no PÁTIO. Olhe para cima.' },
  ],
  ready: [
    { who: 'CMTE. DOZINHO', t: 'Aulas concluídas. O lançamento será em Chichén Itzá, no México: os maias estudavam o céu há mais de mil anos.' },
  ],
  teacher: [
    'Boa noite, turma! Aula no pátio, debaixo das estrelas. Hoje é MATEMÁTICA: o Teorema de Pitágoras, o segredo do triângulo que tem um canto reto. É a conta que o pedreiro usa para a parede não sair torta.',
    'Agora, a aula de ASTRONOMIA da missão de {nome}: a NEBULOSA DE ÓRION, o berçário de estrelas! Olhem para cima e procurem as Três Marias.',
  ],
  after: 'Muito bem, {nome}! O Comandante está esperando.',

  lessons: [{
    id: 'm14a', subject: 'MATEMÁTICA', title: 'Teorema de Pitágoras',
    slides: [
      `<p>Olhe o canto de uma folha de papel: é um <b>ângulo reto</b>, de 90°. Um triângulo com um canto desses se chama <b>triângulo retângulo</b>. Os dois lados que formam o canto reto são os <b>catetos</b>. O lado maior, na frente do canto reto, é a <b>hipotenusa</b>.</p>
       <p>Uma escada encostada na parede desenha um: parede e chão são os catetos, e a escada é a hipotenusa.</p>
       <div class="calc">TRIÂNGULO RETÂNGULO
catetos → fazem o canto reto
hipotenusa → o lado maior,
   na frente do canto reto</div>`,
      `<p>Há uns 2.500 anos, o grego <b>Pitágoras</b> descobriu um segredo desse triângulo. Lembre: <b>3²</b> (três ao quadrado) é 3 × 3 = 9. O segredo é:</p>
       <div class="calc">cateto² + cateto² = hipotenusa²
a² + b² = c²

catetos 3 e 4:
3² + 4² = 9 + 16 = 25
25 = 5 × 5 → hipotenusa = 5</div>
       <p>O 5 é a <b>raiz quadrada</b> de 25: o número que, vezes ele mesmo, dá 25. O trio 3, 4 e 5 é tão famoso que tem nome: a <b>terna</b> 3-4-5.</p>`,
      `<p>Quando a pergunta dá a hipotenusa e pede um cateto, a conta vira uma subtração:</p>
       <div class="calc">um cateto² =
  hipotenusa² − outro cateto²
hipotenusa 10, cateto 6:
10² − 6² = 100 − 36 = 64
64 = 8 × 8 → cateto = 8</div>
       <p>Ternas que sempre fecham: <b>3-4-5</b>, <b>6-8-10</b> (a primeira em dobro) e <b>5-12-13</b>. Vezes um mesmo número, continuam fechando: 30-40-50.</p>
       <p><b>Erro comum:</b> parar no 64. Isso é o lado ao quadrado; a resposta é a raiz quadrada, 8. O pedreiro usa a terna 3-4-5 para conferir se o canto da parede está reto.</p>`,
    ],
    quiz: [
      { q: 'Num triângulo retângulo, como se chama o lado maior, o que fica na frente do canto reto?', o: ['cateto', 'hipotenusa', 'diâmetro', 'raio'], a: 1, hint: 'Na escada encostada na parede, é a própria escada. Os outros dois, parede e chão, são os catetos.', why: 'Hipotenusa é o lado maior, o que fica na frente do ângulo reto. Os outros dois são os catetos.' },
      { q: 'Os catetos de um triângulo retângulo medem 3 cm e 4 cm. Quanto mede a hipotenusa, em cm?', n: 5, calc: '3² + 4² = c²', hint: '3 × 3 = 9 e 4 × 4 = 16. Some os dois. Que número vezes ele mesmo dá esse total?', why: '9 + 16 = 25, e 5 × 5 = 25. A hipotenusa mede 5 cm: a terna 3-4-5.' },
      { q: 'Um triângulo retângulo tem catetos de 6 m e 8 m. Quanto mede a hipotenusa, em metros?', n: 10, calc: '6² + 8² = c²', hint: '6 × 6 = 36 e 8 × 8 = 64. Some e ache o número que, vezes ele mesmo, dá o total.', why: '36 + 64 = 100, e 10 × 10 = 100. Hipotenusa de 10 m: é a terna 3-4-5 em dobro, 6-8-10.' },
      { q: 'A linha da pipa do Tomás tem 13 m, bem esticada. A pipa está bem acima de um ponto do chão que fica a 5 m do Tomás. A que altura está a pipa, em metros?', n: 12, calc: '13² − 5² = ?²', hint: 'A linha é a hipotenusa e os 5 m são um cateto. 13 × 13 = 169 e 5 × 5 = 25. Tire um do outro e ache o número que, vezes ele mesmo, dá o resultado.', why: '169 − 25 = 144, e 12 × 12 = 144. A pipa está a 12 m de altura: a terna 5-12-13.' },
      { q: 'O pedreiro quer saber se o canto da parede está reto. A partir do canto, ele marca 30 cm numa parede e 40 cm na outra. Se o canto estiver certinho, quantos cm deve dar a distância entre as duas marcas?', n: 50, calc: '30² + 40² = ?²', hint: '30 e 40 são o 3 e o 4 com um zero a mais: lembre da terna 3-4-5. Ou faça 900 + 1.600 e ache a raiz quadrada.', why: '900 + 1.600 = 2.500, e 50 × 50 = 2.500. Deu 50 cm? O canto está reto. É a terna 3-4-5 vezes 10.' },
      { q: 'O Caio fez 9² + 12² = 81 + 144 = 225 e respondeu que a hipotenusa mede 225. O que faltou?', o: ['Nada, a hipotenusa mede 225', 'Somar 9 + 12: a hipotenusa mede 21', 'Achar a raiz quadrada de 225: a hipotenusa mede 15', 'Dividir 225 por 2'], a: 2, hint: '225 é a hipotenusa vezes ela mesma, não a hipotenusa. Que número vezes ele mesmo dá 225? Pense na terna 3-4-5 vezes 3.', why: '225 é o quadrado da hipotenusa. A raiz quadrada de 225 é 15, porque 15 × 15 = 225. É a terna 3-4-5 vezes 3: 9-12-15.' },
    ],
  }, {
    id: 'm14b', subject: 'ASTRONOMIA', title: 'O berçário de estrelas',
    slides: [
      `<p><b>Órion</b>, o caçador, é uma das constelações mais fáceis de achar. No meio dela ficam três estrelas em fila: as <b>Três Marias</b>, o cinturão do caçador.</p>
       <p>Nos cantos ficam estrelas muito brilhantes. <b>Betelgeuse</b> é uma supergigante <b>vermelha</b>: se estivesse no lugar do Sol, passaria da órbita de Marte. <b>Rigel</b> é <b>branco-azulada</b>.</p>
       <div class="calc">a cor conta a temperatura:
vermelha → mais fria
amarela  → como o Sol
azulada  → mais quente</div>`,
      `<p>Bem perto das Três Marias fica a <b>Nebulosa de Órion</b>: uma nuvem enorme de gás e poeira onde <b>estrelas estão nascendo</b> agora. Um berçário de estrelas! Ela fica a uns <b>1.340 anos-luz</b> e dá para ver a olho nu, como uma manchinha.</p>
       <div class="calc">nuvem de gás e poeira
→ a gravidade junta tudo
→ forma uma bola quente
→ a bola acende: estrela!</div><p>No céu do Brasil, Órion aparece de cabeça para baixo. Por isso a "espadinha" com a mancha da nebulosa fica logo <b>ACIMA</b> das Três Marias.</p>`,
      `<p>O nosso <b>Sol</b> também nasceu numa nuvem assim, há uns <b>4,6 bilhões de anos</b>. A Terra e os outros planetas se formaram com as sobras dessa nuvem.</p>
       <p>Boa parte dos átomos do seu corpo, como o carbono e o ferro, foi fabricada dentro de estrelas antigas, que explodiram e espalharam tudo pelo espaço. Nós somos <b>poeira de estrelas</b>!</p>`,
    ],
    quiz: [
      { q: 'As Três Marias fazem parte de qual constelação?', o: ['Cruzeiro do Sul', 'Escorpião', 'Órion', 'Ursa Maior'], a: 2, hint: 'Elas são três estrelas em fila, no cinturão de um caçador.', why: 'As Três Marias são o cinturão de Órion, o caçador.' },
      { q: 'Uma nebulosa como a de Órion é:', o: ['um planeta gigante', 'uma nuvem de gás e poeira onde estrelas nascem', 'um buraco negro'], a: 1, hint: 'Lembre do apelido dela: berçário de estrelas.', why: 'Estrelas nascem de nuvens de gás e poeira, quando a gravidade junta tudo numa bola quente.' },
      { q: 'Olhando do Brasil, onde fica a manchinha da Nebulosa de Órion?', o: ['logo acima das Três Marias', 'logo abaixo das Três Marias', 'em volta da Lua'], a: 0, hint: 'Daqui do hemisfério Sul, Órion aparece de cabeça para baixo.', why: 'No céu do Brasil, Órion fica de cabeça para baixo, e a espadinha com a nebulosa aparece logo acima das Três Marias.' },
      { q: 'A Nebulosa de Órion fica a uns 1.340 anos-luz. Próxima Centauri, a estrela vizinha, fica a uns 4 (arredondando). A nebulosa fica quantas vezes mais longe?', n: 335, calc: '1.340 ÷ 4 = ?', hint: 'Divida por partes: 1.200 ÷ 4 = 300 e 140 ÷ 4 = 35. Depois some.', why: '1.340 ÷ 4 = 335. A nebulosa fica umas 335 vezes mais longe que a estrela vizinha.' },
      { q: 'A luz da nebulosa leva uns 1.340 anos para chegar aqui. Se você olhar para ela em 2026, está vendo a luz que saiu de lá em que ano?', n: 686, calc: '2026 − 1340 = ?', hint: 'A luz saiu de lá 1.340 anos antes de chegar. Faça 2026 − 1340.', why: '2026 − 1340 = 686. A luz que você vê hoje saiu de lá por volta do ano 686, no século VII!' },
    ],
  }],

  site: {
    look: [0, 1, 1],
    intro: [
      { who: 'DON MATEO', t: '¡Buenas noches, {nome}! Sou o Don Mateo, guia de Chichén Itzá. Meus antepassados maias estudavam este céu.' },
    ],
    lesson: {
      id: 'm14c', subject: 'HISTÓRIA · MÉXICO', title: 'Os astrônomos maias',
      slides: [
        `<p>O <b>México</b> fica na América do Norte, logo abaixo dos Estados Unidos. A capital é a <b>Cidade do México</b>, e lá se fala <b>espanhol</b>.</p>
         <p>Os <b>maias</b> são um povo indígena do sul do México e da América Central, que existe até hoje. Há mais de mil anos, eles construíram cidades de pedra, como <b>Chichén Itzá</b>, e eram grandes astrônomos: acompanhavam o Sol, a Lua e o planeta Vênus.</p>`,
        `<p>A pirâmide de <b>Kukulcán</b> é um calendário de pedra: tem 4 escadas de <b>91 degraus</b>, mais <b>1</b> degrau no topo.</p>
         <div class="calc">91 × 4 = 364
364 + 1 = 365: os dias do ano!

calendário sagrado:
13 × 20 = 260 dias</div><p>Os maias usavam dois calendários ao mesmo tempo: um de 365 dias, o do Sol, e um sagrado, de 260. No <b>equinócio</b>, a sombra na escada forma uma <b>serpente</b> descendo a pirâmide!</p>`,
        `<p>Os maias contavam de <b>20 em 20</b>. Num número maia, a casa de baixo são as unidades, e a casa de cima vale <b>20</b> (no nosso, vale 10).</p>
         <div class="calc">1 na casa do 20, 3 nas unidades
= 1 × 20 + 3 = 23

2 na casa do 20, 0 nas unidades
= 2 × 20 + 0 = 40</div><p>Por isso eles precisavam de um símbolo para o <b>zero</b>, desenhado como uma concha. Sem ele, não dava para saber se era 2 ou 40. Ah, e o <b>chocolate</b>, feito de cacau, veio do México antigo!</p>`,
      ],
      quiz: [
        { q: 'Que língua se fala no México?', o: ['inglês', 'português', 'francês', 'espanhol'], a: 3, hint: 'É a mesma língua da Argentina e da Espanha. Lembre do "¡Buenas noches!" do Don Mateo.', why: 'No México se fala espanhol, a língua que os colonizadores espanhóis levaram para lá.' },
        { q: 'No equinócio, a sombra na escada da pirâmide de Kukulcán parece:', o: ['um pássaro voando', 'uma serpente descendo', 'um sol nascendo'], a: 1, hint: 'Kukulcán, o nome da pirâmide, é o deus serpente emplumada dos maias.', why: 'A sombra forma uma serpente que desce a escada: é Kukulcán, a serpente emplumada.' },
        { q: 'A pirâmide de Kukulcán tem 4 escadas de 91 degraus, mais 1 degrau no topo. Quantos degraus no total?', n: 365, calc: '91 × 4 + 1 = ?', hint: 'Primeiro 91 × 4. Depois some o degrau do topo.', why: '91 × 4 = 364, e 364 + 1 = 365: um degrau para cada dia do ano!' },
        { q: 'O calendário sagrado maia tinha 13 números combinados com 20 nomes de dias. Quantos dias tinha esse calendário?', n: 260, calc: '13 × 20 = ?', hint: 'Faça 13 × 2 e ponha um zero no fim.', why: '13 × 20 = 260 dias.' },
        { q: 'Um número maia tem 3 na casa do 20 e a concha do zero nas unidades. Quanto ele vale no nosso jeito de contar?', n: 60, calc: '3 × 20 + 0 = ?', hint: 'A casa de cima vale 20. São 3 grupos de 20, e nada solto nas unidades.', why: '3 × 20 + 0 = 60. Sem a concha do zero, ninguém saberia se o número era 3 ou 60.' },
      ],
    },
    outro: [
      { who: 'DON MATEO', t: '¡Buena suerte! As estrelas guiaram os maias. Agora vão guiar você.' },
    ],
  },

  gameIntro: [
    { who: 'KDOK', t: 'Bip! Para navegar até a nebulosa, precisamos ligar as estrelas das constelações.' },
    { who: 'KDOK', t: 'Mova a mira com ▲ ▼ ◀ ▶ e aperte A na PRÓXIMA estrela, na ordem dos números. Primeiro Órion, depois o Cruzeiro do Sul!' },
  ],

  debrief: [
    { who: 'KDOK', t: 'ESTAMOS DENTRO DA NEBULOSA DE ÓRION! Nuvens de gás e poeira brilhando por todo lado.' },
    { who: 'KDOK', t: 'Aqui estão nascendo estrelas novinhas. O Sol também nasceu numa nuvem assim.' },
    { who: 'KDOK', t: 'Quase tudo o que existe, até você e eu, é feito de poeira de estrelas. Até o meu micro-ondas.' },
    { who: 'KDOK', t: 'Bip! A Dra. Paz confirmou: o sinal é mais antigo que qualquer estrela desta nebulosa.' },
  ],
  card: { id: 'orion', name: 'NEBULOSA DE ÓRION', lines: ['Berçário de estrelas', 'Distância: 1.340 anos-luz', 'Fica na espadinha de Órion, perto das Três Marias', 'Dá para ver a olho nu, como uma mancha', 'Estrelas nascem de gás e poeira'] },
  reward: { id: 'relogio', name: 'RELÓGIO DE DOBRA', desc: 'Um relógio que aguenta a gravidade extrema. Perto do buraco negro, vale um escudo a mais.' },
  radio: 'Aqui é a Astrokdok! Pitágoras viveu há uns 2.500 anos, e a regra do triângulo dele continua funcionando igualzinho. Conhecimento bom não estraga. Gostei de ver! Câmbio!',
  real: 'Procure as Três Marias no céu: três estrelas em fila. Aqui no Brasil, Órion aparece de cabeça para baixo, então a "espadinha", com uma mancha, fica logo ACIMA delas: é a Nebulosa de Órion! Desenhe o que você viu.',

  chat: {
    yuki: 'No Japão, as Três Marias se chamam Mitsuboshi: "três estrelas".',
    lia: 'Betelgeuse pode explodir um dia. Aí vai dar pra ver ela até de dia, por semanas!',
    tomas: 'Os maias tomavam chocolate. Eu seria um ótimo maia.',
    bia: 'Pela primeira vez a professora pediu pra gente olhar pro céu em vez do quadro.',
    caio: 'Aula à noite? Finalmente um horário justo. Tô acordadíssimo.',
    rival: 'Treinei no simulador a semana inteira pra te ajudar, {nome}. Se precisar de copiloto, tô aqui! Só não repara que eu bati a nave duas vezes.',
    kdok: 'Bip! Somos feitos de poeira de estrelas. Eu sou feito de micro-ondas, que também é poeira de estrelas. Tô emocionado.',
    ze: 'Os telescópios mostram que o sinal parece uma foto do universo bebê. Mas quero que você veja com seus próprios olhos.',
  },
};
