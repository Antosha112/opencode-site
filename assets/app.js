/* Общая логика: шапка, меню, каталог, фильтры, калькулятор, форма. */

const CARS = window.AURUM_CARS || [];

/* ---------- Форматирование ---------- */
const money = (value) =>
  new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(Math.round(value)) + " ₽";

/* Аннуитетный платёж: та же формула, что в банках. */
function monthlyPayment(price, downPercent, months, annualRate = 6.9) {
  const amount = price * (1 - downPercent / 100);
  const r = annualRate / 100 / 12;
  if (r === 0) return amount / months;
  return (amount * r) / (1 - Math.pow(1 + r, -months));
}

/* ---------- Карточка автомобиля ---------- */
function carCard(car) {
  const lease = monthlyPayment(car.price, 20, 60);
  return `
    <article class="car reveal" data-cat="${car.cat}">
      <div class="car-media">
        <span class="car-badge">${car.badge}</span>
        <button class="fav" type="button" aria-label="В избранное" aria-pressed="false" data-id="${car.id}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-4.6-9.3-8.6C1 9 2.6 5.5 6 5.5c2 0 3.2 1 4 2.2.8-1.2 2-2.2 4-2.2 3.4 0 5 3.5 3.3 6.9C19 16.4 12 21 12 21z"/></svg>
        </button>
        <img src="${car.image}" alt="${car.brand} ${car.model}" loading="lazy" width="1280" height="853" />
      </div>
      <div class="car-body">
        <h3><a href="car.html?id=${car.id}">${car.brand}</a></h3>
        <div class="trim">${car.model} · ${car.trim}</div>
        <div class="specs">
          <div><b>${car.power}</b><span>л.с.</span></div>
          <div><b>${car.accel} с</b><span>0–100</span></div>
          <div><b>${car.engine}</b><span>двигатель</span></div>
        </div>
        <div class="price-row">
          <div class="price">${money(car.price)}<small>лизинг от ${money(lease)}/мес</small></div>
          <a class="more" href="car.html?id=${car.id}">Подробнее</a>
        </div>
      </div>
    </article>`;
}

function renderCars(container, list) {
  container.innerHTML = list.map(carCard).join("");
}

/* ---------- Избранное ---------- */
const FAV_KEY = "aurum_favorites";

function readFavs() {
  try {
    return JSON.parse(localStorage.getItem(FAV_KEY)) || [];
  } catch {
    return [];
  }
}

function wireFavorites() {
  const favs = new Set(readFavs());
  document.querySelectorAll(".fav").forEach((btn) => {
    const id = btn.dataset.id;
    if (favs.has(id)) {
      btn.classList.add("on");
      btn.setAttribute("aria-pressed", "true");
    }
    btn.addEventListener("click", () => {
      const on = btn.classList.toggle("on");
      btn.setAttribute("aria-pressed", String(on));
      const set = new Set(readFavs());
      on ? set.add(id) : set.delete(id);
      localStorage.setItem(FAV_KEY, JSON.stringify([...set]));
    });
  });
}

/* ---------- Наблюдатель появления ---------- */
function watchReveal(root = document) {
  const items = root.querySelectorAll(".reveal:not(.visible), .feature:not(.visible)");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("visible");
        io.unobserve(e.target);
      });
    },
    { threshold: 0.1 }
  );
  items.forEach((el) => io.observe(el));
}

/* ---------- Шапка и меню ---------- */
function initHeader() {
  const header = document.getElementById("header");
  const burger = document.getElementById("burger");
  const menu = document.getElementById("menu");

  if (header) {
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  if (burger && menu) {
    burger.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", String(open));
    });
    menu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        menu.classList.remove("open");
        burger.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      })
    );
  }
}

/* ---------- Каталог ---------- */
function initCatalog() {
  const wrap = document.getElementById("cars");
  if (!wrap) return;

  renderCars(wrap, CARS);

  const filters = document.querySelectorAll(".filter");
  const empty = document.createElement("p");
  empty.className = "cars-empty";
  empty.textContent = "В этой категории пока нет автомобилей.";

  const applyFilter = (f) => {
    let shown = 0;
    wrap.querySelectorAll(".car").forEach((card) => {
      const show = f === "all" || card.dataset.cat === f;
      card.classList.toggle("hidden", !show);
      if (show) {
        shown++;
        card.classList.remove("visible");
        requestAnimationFrame(() => requestAnimationFrame(() => card.classList.add("visible")));
      }
    });
    if (shown === 0) wrap.appendChild(empty);
    else empty.remove();
  };

  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      filters.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      applyFilter(btn.dataset.filter);
    });
  });

  wireFavorites();
  watchReveal(wrap);
}

/* ---------- Счётчики ---------- */
function initCounters() {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;

  if (!("IntersectionObserver" in window)) {
    counters.forEach((el) => (el.textContent = el.dataset.count + (el.dataset.suffix || "")));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = Number(el.dataset.count);
        const suffix = el.dataset.suffix || "";
        const start = performance.now();
        const dur = 1200;
        const step = (now) => {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        io.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((c) => io.observe(c));
}

/* ---------- Калькулятор лизинга ---------- */
function initCalculator() {
  const select = document.getElementById("calc-car");
  if (!select) return;

  const down = document.getElementById("calc-down");
  const term = document.getElementById("calc-term");
  const outMonthly = document.getElementById("calc-monthly");
  const outAmount = document.getElementById("calc-amount");
  const outTotal = document.getElementById("calc-total");
  const outOver = document.getElementById("calc-over");
  const downLabel = document.getElementById("calc-down-value");
  const termLabel = document.getElementById("calc-term-value");

  select.innerHTML = CARS.map((c) => `<option value="${c.id}">${c.brand} ${c.model}</option>`).join("");

  const update = () => {
    const car = CARS.find((c) => c.id === select.value) || CARS[0];
    const downPercent = Number(down.value);
    const months = Number(term.value);

    const monthly = monthlyPayment(car.price, downPercent, months);
    const amount = car.price * (1 - downPercent / 100);
    const total = monthly * months;

    outMonthly.textContent = money(monthly) + "/мес";
    outAmount.textContent = money(amount);
    outTotal.textContent = money(total);
    outOver.textContent = money(total - amount);
    downLabel.textContent = downPercent + "% · " + money(car.price * (downPercent / 100));
    termLabel.textContent = months + " мес.";
  };

  select.addEventListener("change", update);
  down.addEventListener("input", update);
  term.addEventListener("input", update);
  update();
}

/* ---------- Форма заявки ---------- */
function initForm() {
  const form = document.getElementById("lead-form");
  if (!form) return;

  const carSelect = document.getElementById("car");
  const toast = document.getElementById("toast");

  if (carSelect) {
    carSelect.innerHTML =
      CARS.map((c) => `<option value="${c.id}">${c.brand} ${c.model}</option>`).join("") +
      `<option value="help">Помогите с выбором</option>`;

    // Подставляем модель из адреса: index.html?model=audi-rs-etron-gt#booking
    const wanted = new URLSearchParams(location.search).get("model");
    if (wanted && [...carSelect.options].some((o) => o.value === wanted)) {
      carSelect.value = wanted;
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // form.elements надёжнее, чем form.name: у самой формы тоже есть свойство name.
    const name = form.elements.namedItem("name").value.trim();
    const phone = form.elements.namedItem("phone").value.trim();
    const car = carSelect && carSelect.selectedIndex >= 0 ? carSelect.options[carSelect.selectedIndex].text : "";

    // Демо-хранилище: заявки остаются в браузере. Для реальной отправки
    // подключите Formspree/свой API и замените этот блок на fetch().
    try {
      const key = "aurum_leads";
      const leads = JSON.parse(localStorage.getItem(key)) || [];
      leads.push({ name, phone, car, at: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(leads));
    } catch {
      /* приватный режим — просто пропускаем сохранение */
    }

    toast.textContent = `Спасибо, ${name}! Заявка на ${car} сохранена (демо). Менеджер свяжется с вами.`;
    toast.classList.add("show");
    form.reset();
    setTimeout(() => toast.classList.remove("show"), 7000);
  });
}

/* ---------- Старт ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initCatalog();
  initCounters();
  initCalculator();
  initForm();
  watchReveal();
});
