// A CONFIGURAÇÃO da página do Astrokdok. Só dados: o Jean preenche o que está marcado com [FALTA].
// Campo vazio = a página mostra o espaço tracejado em âmbar, com o nome do que entra ali.
// Depois de preencher, é só salvar e publicar de novo (veja o LEIA.md).
window.ASTROKDOK_CONFIG = {
  // O jogo no ar. Na prévia do PC (porta 8736) a página usa o jogo local sozinha.
  jogo: 'https://jeandsprestes.github.io/astrokdok/',

  // O código aberto do jogo.
  codigo: 'https://github.com/jeandsprestes/astrokdok',

  // [FALTA] O endereço desta página quando ela for publicada, com a barra no fim
  // (exemplo: 'https://jeandsprestes.github.io/astrokdok/pagina/').
  // Serve para o "Mandar para alguém" e para a prévia do link no WhatsApp
  // (veja também o comentário no começo do index.html).
  enderecoFinal: 'https://jeandsprestes.github.io/astrokdok/pagina/',   // publicada no GitHub em 06/11/2026

  // [FALTA] O vídeo vertical do jogo: o link do YouTube (não listado)
  // ou o caminho de um arquivo .mp4 (exemplo: 'video/astrokdok.mp4'). Ele nunca toca sozinho.
  video: 'video/astrokdok-video.mp4',   // a edição do Jean de 06/11/2026 (10min01), versão leve: 720x1280, 83 MB. O original (606 MB) está em Marketing/video/trilha/ASTROKDOK Divulgação.mp4

  // A foto do Jean na parte "quem faz" (quadrada; aparece num círculo pequeno).
  foto: 'img/jean/jean_1_280.jpg',   // 280x280; o original, 800x800, é o jean_1.jpg

  // [FALTA] O Pix do chapéu digital.
  //   chave: e-mail, celular com +55, CPF ou CNPJ só com números, ou a chave aleatória
  //   nome: o nome do recebedor como está no banco (até 25 letras, sem acento)
  //   cidade: a cidade do recebedor (até 15 letras, sem acento)
  //   txid: a marca que aparece no extrato (deixe ASTROKDOK)
  pix: { chave: 'b78d884b-b122-4d58-826f-7e89fb7af716', nome: 'JEAN PRESTES', cidade: 'PALMEIRAS', txid: 'ASTROKDOK' },   // chave aleatória do Jean (06/11/2026); nome e cidade são campos obrigatórios do padrão do Pix, o banco de quem paga mostra o nome do titular da chave

  // Os valores sugeridos: R$ 0, 5, 15 e 30 (decididos pelo Jean em 30/10/2026).
  // Os 3 centavos marcam no extrato que o Pix veio do Astrokdok.
  valores: [0, 5.03, 15.03, 30.03],

  // O botão "Falar com o Jean" (WhatsApp): só números, com o 55 do Brasil e o DDD.
  whatsappJean: '5577981116584',

  // O recebedor das inscrições de novidades (só aceita a página publicada e a prévia 8736).
  novidades: 'https://astrokdok-novidades.pages.dev/api/inscrever',

  // [FALTA] A transparência, quando houver números. Exemplo:
  // transparencia: { quando: 'até 30/11/2026', entrou: 'R$ 0,00', foi: ['R$ 0,00 para a brigada de incêndio do Capão'] },
  transparencia: null,
};
