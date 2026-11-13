/* Страница автомобиля: берём id из адреса и заполняем шаблон. */

(() => {
  const CARS = window.AURUM_CARS || [];

  const specRow = (label, value) => `<div><span>${label}</span><b>${value}</b></div>`;

  function initDetail() {
    const root = document.getElementById("detail-root");
    if (!root) return;

    const id = new URLSearchParams(location.search).get("id");
    const car = CARS.find((c) => c.id === id);

    if (!car) {
      root.innerHTML = `
        <div class="wrap" style="padding: 60px 0;">
          <h1>Автомобиль не найден</h1>
          <p style="color:#8b93a7; margin: 12px 0 24px;">Возможно, ссылка устарела или модель убрали из каталога.</p>
          <a class="btn btn-gold" href="index.html#catalog">Вернуться в каталог</a>
        </div>`;
      return;
    }

    document.title = `${car.brand} ${car.model} — AURUM Motors`;

    document.getElementById("crumb-model").textContent = `${car.brand} ${car.model}`;
    const image = document.getElementById("detail-image");
    image.src = car.image;
    image.alt = `${car.brand} ${car.model}`;
    document.getElementById("detail-badge").textContent = car.badge;
    document.getElementById("detail-title").textContent = `${car.brand} ${car.model}`;
    document.getElementById("detail-trim").textContent = `${car.trim} · ${car.catLabel}`;
    document.getElementById("detail-tagline").textContent = car.tagline;
    document.getElementById("detail-price").innerHTML =
      `${new Intl.NumberFormat("ru-RU").format(car.price)} ₽` +
      `<small>или в лизинг от ${new Intl.NumberFormat("ru-RU").format(Math.round(monthlyPayment(car.price, 20, 60)))} ₽/мес</small>`;
    document.getElementById("detail-desc").textContent = car.description;
    document.getElementById("detail-booking").href = `index.html?model=${car.id}#booking`;

    document.getElementById("detail-specs").innerHTML = [
      specRow("Кузов", car.catLabel),
      specRow("Двигатель", car.engine),
      specRow("Мощность", car.power + " л.с."),
      specRow("Разгон 0–100", car.accel + " с"),
      specRow("Привод", car.drive),
      specRow("Год", car.trim)
    ].join("");

    document.getElementById("detail-features").innerHTML = car.features
      .map(
        (f) =>
          `<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>${f}</li>`
      )
      .join("");

    document.getElementById("detail-credit").innerHTML =
      `Фото: <a href="${car.credit.url}" target="_blank" rel="noopener noreferrer">${car.credit.author}</a>, ` +
      `${car.credit.license} (Wikimedia Commons).`;

    // Похожие: сначала та же категория, потом остальные, без текущей модели.
    const sameCat = CARS.filter((c) => c.id !== car.id && c.cat === car.cat);
    const others = CARS.filter((c) => c.id !== car.id && c.cat !== car.cat);
    const related = [...sameCat, ...others].slice(0, 3);
    const wrap = document.getElementById("related");
    if (wrap) {
      renderCars(wrap, related);
      watchReveal(wrap);
    }
  }

  document.addEventListener("DOMContentLoaded", initDetail);
})();
