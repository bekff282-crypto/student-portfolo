const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  themeToggle.textContent = document.body.classList.contains('light') ? '☾' : '☀';
});

menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));

// Поиск и фильтрация учебных работ
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const workCards = [...document.querySelectorAll('.work-card')];
const emptyState = document.getElementById('emptyState');

function filterWorks() {
  const query = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;
  let visible = 0;
  workCards.forEach(card => {
    const matchesText = card.textContent.toLowerCase().includes(query);
    const matchesCategory = category === 'all' || card.dataset.category === category;
    card.hidden = !(matchesText && matchesCategory);
    if (!card.hidden) visible++;
  });
  emptyState.hidden = visible !== 0;
}
searchInput.addEventListener('input', filterWorks);
categoryFilter.addEventListener('change', filterWorks);

// Модальные окна с описанием работ
const dialog = document.getElementById('detailsDialog');
document.querySelectorAll('.details-btn').forEach(button => {
  button.addEventListener('click', () => {
    document.getElementById('dialogTitle').textContent = button.dataset.title;
    document.getElementById('dialogInfo').textContent = button.dataset.info;
    dialog.showModal();
  });
});
document.getElementById('dialogClose').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});

// Демонстрационная проверка формы. Для записи в базу нужен серверный сервис.
document.getElementById('contactForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const message = document.getElementById('formMessage');
  if (!form.reportValidity()) return;
  message.textContent = 'Проверка пройдена! Форма работает, но запись в базу данных ещё не подключена.';
  message.style.color = 'var(--accent2)';
  form.reset();
});
