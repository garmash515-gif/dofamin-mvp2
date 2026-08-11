const startButton = document.getElementById('start');
const molecule = document.querySelector('.dopamine');
const moleculeStage = document.querySelector('.molecule-stage');

const journey = { step: 0, choice: null, companion: null, surprise: null };

function renderStepThree() {
  const card = document.querySelector('.journey-card');
  if (!card) return;
  journey.step = 3;
  card.innerHTML = `
    <span class="journey-kicker">ШАГ 03 · СТЕПЕНЬ СЛУЧАЙНОСТИ</span>
    <h2>Насколько можно отпустить контроль?</h2>
    <p>От почти привычного варианта до полного «хрен знает, куда мы идём». Ты выбираешь уровень неожиданности.</p>
    <div class="journey-options">
      <button type="button" data-surprise="мягко">Пусть удивит, но без экстрима <span>↗</span></button>
      <button type="button" data-surprise="смело">Давай что-нибудь неожиданное <span>↗</span></button>
      <button type="button" data-surprise="рандом">Полный рандом. Решай за меня <span>↗</span></button>
    </div>`;
  card.querySelectorAll('[data-surprise]').forEach((button) => {
    button.addEventListener('click', () => {
      card.querySelectorAll('[data-surprise]').forEach((item) => item.classList.remove('selected'));
      button.classList.add('selected');
      journey.surprise = button.dataset.surprise;
    });
  });
  card.classList.remove('is-visible');
  requestAnimationFrame(() => card.classList.add('is-visible'));
}

function renderStepTwo() {
  const card = document.querySelector('.journey-card');
  if (!card) return;
  journey.step = 2;
  card.innerHTML = `
    <span class="journey-kicker">ШАГ 02 · КОМУ С ТОБОЙ?</span>
    <h2>С кем хочется разделить это?</h2>
    <p>Не обязательно искать пару. Здесь можно выбрать человека, с которым хочется прожить это впечатление.</p>
    <div class="journey-options">
      <button type="button" data-next="друг">С другом <span>↗</span></button>
      <button type="button" data-next="партнер">С человеком, который нравится <span>↗</span></button>
      <button type="button" data-next="один">Хочу сам <span>↗</span></button>
    </div>`;
  card.querySelectorAll('[data-next]').forEach((button) => {
    button.addEventListener('click', () => {
      card.querySelectorAll('[data-next]').forEach((item) => item.classList.remove('selected'));
      button.classList.add('selected');
      journey.companion = button.dataset.next;
      setTimeout(renderStepThree, 260);
    });
  });
  card.classList.remove('is-visible');
  requestAnimationFrame(() => card.classList.add('is-visible'));
}

function openJourney() {
  if (document.querySelector('.journey-card')) return;
  journey.step = 1;
  moleculeStage.classList.add('journey-open');
  const card = document.createElement('div');
  card.className = 'journey-card';
  card.innerHTML = `
    <span class="journey-kicker">ШАГ 01 · ВПЕЧАТЛЕНИЕ</span>
    <h2>Что хочется почувствовать?</h2>
    <p>Не ищем «идеальное свидание». Выбираем состояние, ради которого хочется куда-то пойти.</p>
    <div class="journey-options">
      <button type="button" data-choice="новое">Хочу нового <span>↗</span></button>
      <button type="button" data-choice="живое">Хочу живого общения <span>↗</span></button>
      <button type="button" data-choice="неожиданное">Хочу неожиданного <span>↗</span></button>
    </div>`;
  moleculeStage.appendChild(card);
  requestAnimationFrame(() => card.classList.add('is-visible'));
  card.querySelectorAll('[data-choice]').forEach((button) => {
    button.addEventListener('click', () => {
      card.querySelectorAll('[data-choice]').forEach((item) => item.classList.remove('selected'));
      button.classList.add('selected');
      journey.choice = button.dataset.choice;
      setTimeout(renderStepTwo, 260);
    });
  });
}

if (startButton) startButton.addEventListener('click', openJourney);
if (molecule) {
  molecule.style.cursor = 'pointer';
  molecule.addEventListener('click', openJourney);
}

const style = document.createElement('style');
style.textContent = `
  .molecule-stage { position: relative; }
  .molecule-stage.journey-open .molecule-placeholder { transform: scale(.72); opacity: .42; transition: transform .5s ease, opacity .5s ease; }
  .molecule-placeholder { transition: transform .5s ease, opacity .5s ease; }
  .journey-card { position:absolute; z-index:5; right:0; bottom:6%; width:min(430px,88%); padding:28px; border:1px solid rgba(255,255,255,.12); border-radius:28px; background:rgba(10,17,48,.82); backdrop-filter:blur(22px); box-shadow:0 24px 80px rgba(0,0,0,.35); opacity:0; transform:translateY(18px); transition:opacity .45s ease,transform .45s ease; }
  .journey-card.is-visible { opacity:1; transform:translateY(0); }
  .journey-kicker { color:var(--cyan); font-size:10px; font-weight:800; letter-spacing:.18em; }
  .journey-card h2 { margin:12px 0 10px; font-size:clamp(25px,3vw,36px); line-height:1; letter-spacing:-.045em; }
  .journey-card p { margin:0 0 20px; color:var(--muted); font-size:14px; line-height:1.55; }
  .journey-options { display:grid; gap:9px; }
  .journey-options button { width:100%; display:flex; justify-content:space-between; align-items:center; padding:13px 15px; border:1px solid rgba(255,255,255,.10); background:rgba(255,255,255,.045); border-radius:14px; text-align:left; transition:.2s ease; }
  .journey-options button:hover,.journey-options button.selected { border-color:rgba(72,234,220,.55); background:rgba(72,234,220,.10); }
  .journey-options button span { color:var(--cyan); }
  @media(max-width:850px) { .molecule-stage.journey-open .molecule-placeholder { transform:scale(.62); } .journey-card { right:50%; transform:translate(50%,18px); bottom:0; width:min(430px,94%); } .journey-card.is-visible { transform:translate(50%,0); } }
`;
document.head.appendChild(style);
