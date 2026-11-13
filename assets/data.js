/* Единый источник данных о каталоге.
   Карточки на главной и страницы автомобилей строятся из этого массива. */
window.AURUM_CARS = [
  {
    id: "maybach-s680",
    cat: "sedan",
    catLabel: "Седан",
    brand: "Mercedes-Maybach",
    model: "S 680",
    trim: "2024",
    price: 28900000,
    badge: "В наличии",
    image: "img/maybach.jpg",
    power: 612,
    accel: "4.5",
    engine: "V12 4.0",
    drive: "4MATIC",
    tagline: "Тишина, которая быстрее слов",
    description:
      "Флагманский седан с удлинённой базой и задним Executive-салоном. Шумоизоляция уровня библиотеки, пневмоподвеска E-ACTIVE BODY CONTROL и отделка кожей наппа с ручной прострочкой.",
    features: [
      "Задние сиденья Executive с массажем и подогревом",
      "Аудиосистема Burmester 4D, 31 динамик",
      "Пневмоподвеска с сканированием дороги",
      "Двухцветная окраска вручную"
    ],
    credit: {
      author: "Alexander Migl",
      license: "CC BY-SA 4.0",
      url: "https://commons.wikimedia.org/wiki/File:Mercedes-Maybach_Z223_680_1X7A5830.jpg"
    }
  },
  {
    id: "bentley-continental-gt",
    cat: "coupe",
    catLabel: "Купе",
    brand: "Bentley",
    model: "Continental GT",
    trim: "Speed · 2024",
    price: 32500000,
    badge: "Новинка",
    image: "img/bentley.jpg",
    power: 659,
    accel: "3.6",
    engine: "W12 6.0",
    drive: "AWD",
    tagline: "Гран-туризмо без компромиссов",
    description:
      "Самый мощный Continental GT в истории: 659 л.с., полный привод и активная подвеска Bentley Dynamic Ride. Купе, которое одинаково уверенно едет на трек и в оперу.",
    features: [
      "Ротационные часы Bentley на приборной панели",
      "Активные стабилизаторы Dynamic Ride",
      "Керамические тормоза",
      "Отделка шпоном и кожей по спецификации клиента"
    ],
    credit: {
      author: "Alexander Migl",
      license: "CC BY-SA 4.0",
      url: "https://commons.wikimedia.org/wiki/File:Bentley_Continental_GT_Speed_(3rd_gen.)_IMG_0014.jpg"
    }
  },
  {
    id: "porsche-911-turbo-s",
    cat: "coupe",
    catLabel: "Купе",
    brand: "Porsche",
    model: "911",
    trim: "Turbo S · 2023",
    price: 24700000,
    badge: "1 владелец",
    image: "img/porsche.jpg",
    power: 650,
    accel: "2.7",
    engine: "Flat-6 3.8",
    drive: "AWD",
    tagline: "Эталон ежедневного суперкара",
    description:
      "911 Turbo S разгоняется до сотни за 2,7 секунды и при этом остаётся комфортным в городе. Полный привод, PDK и полный пакет опций — от спортивного выхлопа до карбона.",
    features: [
      "Пакет Sport Chrono",
      "Керамические тормоза PCCB",
      "Адаптивные спортивные сиденья",
      "Спортивный выхлоп с переключаемой заслонкой"
    ],
    credit: {
      author: "Alexander Migl",
      license: "CC BY-SA 4.0",
      url: "https://commons.wikimedia.org/wiki/File:Porsche_992_Turbo_S_1X7A0413.jpg"
    }
  },
  {
    id: "range-rover-autobiography",
    cat: "suv",
    catLabel: "SUV",
    brand: "Range Rover",
    model: "Autobiography",
    trim: "2018",
    price: 9800000,
    badge: "В наличии",
    image: "img/range-rover.jpg",
    power: 510,
    accel: "5.5",
    engine: "V8 5.0",
    drive: "AWD",
    tagline: "Комфорт, которому не нужен асфальт",
    description:
      "Полноразмерный внедорожник с пневмоподвеской и отделкой Autobiography. Один владелец, полная сервисная история, проверен по 120 пунктам.",
    features: [
      "Пневмоподвеска с изменяемым клиренсом",
      "Панорамная крыша",
      "Meridian Signature, 29 динамиков",
      "Полный внедорожный пакет"
    ],
    credit: {
      author: "DeFacto",
      license: "CC BY-SA 4.0",
      url: "https://commons.wikimedia.org/wiki/File:Land_Rover_Range_Rover_Autobiography_2016.jpg"
    }
  },
  {
    id: "rolls-royce-ghost",
    cat: "sedan",
    catLabel: "Седан",
    brand: "Rolls-Royce",
    model: "Ghost",
    trim: "Extended · 2023",
    price: 41200000,
    badge: "Гарантия 2 года",
    image: "img/ghost.jpg",
    power: 571,
    accel: "4.8",
    engine: "V12 6.75",
    drive: "AWD",
    tagline: "Самая тихая роскошь в мире",
    description:
      "Ghost нового поколения с планшетом управления, звёздным потолком и индивидуальной отделкой. Автомобиль, в котором пассажир важнее водителя.",
    features: [
      "Звёздное небо на потолке, 1340 волокон",
      "Задний подлокотник с холодильником",
      "Двери с электроприводом и доводчиком",
      "Индивидуальная программа Bespoke"
    ],
    credit: {
      author: "Liam Walker",
      license: "CC BY-SA 4.0",
      url: "https://commons.wikimedia.org/wiki/File:2020_Rolls-Royce_Ghost_V12_4X4_Automatic_6.75.jpg"
    }
  },
  {
    id: "audi-rs-etron-gt",
    cat: "ev",
    catLabel: "Электро",
    brand: "Audi",
    model: "RS e-tron GT",
    trim: "Performance · 2024",
    price: 14900000,
    badge: "Электро",
    image: "img/audi.jpg",
    power: 646,
    accel: "3.3",
    engine: "2 × электро",
    drive: "quattro",
    tagline: "Тишина на 646 лошадиных сил",
    description:
      "Электрический гран-туризмо с запасом хода 488 км и зарядкой 270 кВт. Разгон 3,3 с — без единого литра бензина и почти без звука.",
    features: [
      "Батарея 93 кВт·ч, запас хода 488 км",
      "Зарядка 5–80% за 23 минуты",
      "Пневмоподвеска и управляемые задние колёса",
      "Матричные фары Laser"
    ],
    credit: {
      author: "Alexander-93",
      license: "CC BY-SA 4.0",
      url: "https://commons.wikimedia.org/wiki/File:Audi_RS_e-tron_GT_1X7A1875.jpg"
    }
  }
];
