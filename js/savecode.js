'use strict';
// Salvar: o jogo guarda sozinho no navegador deste aparelho (localStorage, em engine.js).
// O antigo código de save de 5 letras saiu em 29/10/2026.
A.progressLabel = (S = A.S) => S.m >= A.MISSIONS.length ? `Jogo zerado · ★ ${S.stars}` : `Missão ${S.m + 1} · ${['começando', '1 aula feita', '2 aulas feitas', 'pronto para lançar'][S.step] || ''} · ★ ${S.stars}`;

// cartão por cima de tudo, sem atrapalhar o que está acontecendo no jogo
A.showCard = html => new Promise(res => {
  const card = A.$('#card'), box = A.$('#cardBox'), prev = A.modal;
  box.innerHTML = A.fmt(html) + '<button class="btn" id="cardOk">FECHAR</button>';
  card.hidden = false;
  A.modal = { key: () => true };
  box.querySelector('#cardOk').onclick = () => { A.sfx('blip'); card.hidden = true; A.modal = prev; res(); };
});
// cartão com várias opções (devolve o índice escolhido); o jogo fica pausado enquanto está aberto
A.cardChoice = (html, labels) => new Promise(res => {
  const card = A.$('#card'), box = A.$('#cardBox'), prev = A.modal;
  box.innerHTML = A.fmt(html) + labels.map((l, i) => `<button class="btn${i ? ' alt' : ''}" data-i="${i}">${l}</button>`).join('');
  card.hidden = false;
  A.modal = { key: () => true };
  box.querySelectorAll('[data-i]').forEach(b => b.onclick = () => { A.sfx('blip'); card.hidden = true; A.modal = prev; res(+b.dataset.i); });
});
A.saveCardHtml = () => `<span class="tag">JOGO SALVO</span><h2>Progresso guardado</h2><p><b>${A.progressLabel()}</b></p>
    <p>O jogo salva sozinho neste aparelho. Para não perder: jogue sempre no mesmo navegador, sem aba anônima, e não limpe os dados do navegador.</p>`;
A.manualSave = () => { A.save(); A.sfx('ok'); return A.showCard(A.saveCardHtml()); };
A.$('#saveBtn').onclick = () => { if (A.S && A.S.started && A.$('#card').hidden) A.manualSave(); };

// pede nome, aparência e amigo (quando o jogo começa por ESCOLHER MISSÃO)
A.askNames = async () => {
  await A.askName();
  if (!A.S.look) await A.askLook();
  A.S.rival = await A.askRival();
  A.save();
};

// pede ao navegador para não apagar os dados do jogo
if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
