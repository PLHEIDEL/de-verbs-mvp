export type TopicId = "home" | "transport" | "office" | "shopping";

export type VerbItem = {
  id: string;
  topic: TopicId;
  verb: string;
  ru: string;
  example: string;
  mediaDataUri: string;
  distractors: string[];
};

function svgData(svg: string) {
  const encoded = encodeURIComponent(svg)
    .replace(/'/g, "%27")
    .replace(/"/g, "%22");
  return `data:image/svg+xml;charset=UTF-8,${encoded}`;
}

function sceneSvg(title: string, hint: string) {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="700" viewBox="0 0 1200 700">
    <defs>
      <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stop-color="rgba(120,120,255,0.90)"/>
        <stop offset="1" stop-color="rgba(120,255,220,0.75)"/>
      </linearGradient>
      <filter id="s" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="18" stdDeviation="18" flood-color="rgba(0,0,0,0.35)"/>
      </filter>
    </defs>

    <rect width="1200" height="700" rx="42" fill="rgba(255,255,255,0.06)"/>
    <rect x="48" y="48" width="1104" height="604" rx="36" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)"/>

    <rect x="92" y="92" width="520" height="516" rx="28" fill="rgba(0,0,0,0.18)" stroke="rgba(255,255,255,0.14)"/>
    <rect x="640" y="92" width="468" height="160" rx="28" fill="url(#g)" filter="url(#s)"/>
    <rect x="640" y="274" width="468" height="334" rx="28" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)"/>

    <circle cx="352" cy="260" r="84" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.18)"/>
    <path d="M290 360c30 28 65 42 106 42s76-14 106-42" fill="none" stroke="rgba(255,255,255,0.45)" stroke-width="18" stroke-linecap="round"/>
    <path d="M270 230c20-40 50-60 82-60s62 20 82 60" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="18" stroke-linecap="round"/>

    <text x="682" y="170" font-size="44" font-family="ui-sans-serif, system-ui" fill="rgba(0,0,0,0.78)" font-weight="800">${title}</text>
    <text x="682" y="212" font-size="22" font-family="ui-sans-serif, system-ui" fill="rgba(0,0,0,0.68)">${hint}</text>

    <text x="686" y="352" font-size="26" font-family="ui-sans-serif, system-ui" fill="rgba(255,255,255,0.85)" font-weight="700">Выберите глагол</text>
    <text x="686" y="392" font-size="18" font-family="ui-sans-serif, system-ui" fill="rgba(255,255,255,0.65)">Подсказка: смотрите на сцену слева</text>
  </svg>`;
  return svgData(svg);
}

export const TOPICS: { id: TopicId; title: string; subtitle: string }[] = [
  { id: "home", title: "Дом", subtitle: "рутина, быт, кухня" },
  { id: "transport", title: "Транспорт", subtitle: "поездки, метро, поезд" },
  { id: "office", title: "Офис", subtitle: "встречи, планы, звонки" },
  { id: "shopping", title: "Покупки", subtitle: "магазин, оплата, поиск" },
];

export const VERBS: VerbItem[] = [
  { id: "aufstehen", topic: "home", verb: "aufstehen", ru: "вставать", example: "Ich stehe um 7 Uhr auf.", mediaDataUri: sceneSvg("Утро", "человек встаёт с кровати"), distractors: ["schlafen", "kochen", "aufräumen", "öffnen"] },
  { id: "schlafen", topic: "home", verb: "schlafen", ru: "спать", example: "Ich schlafe acht Stunden.", mediaDataUri: sceneSvg("Ночь", "человек спит"), distractors: ["aufstehen", "kochen", "laufen", "bezahlen"] },
  { id: "kochen", topic: "home", verb: "kochen", ru: "готовить", example: "Ich koche Pasta.", mediaDataUri: sceneSvg("Кухня", "готовка еды"), distractors: ["kaufen", "fahren", "aufräumen", "schreiben"] },
  { id: "aufräumen", topic: "home", verb: "aufräumen", ru: "убираться", example: "Ich räume das Zimmer auf.", mediaDataUri: sceneSvg("Комната", "наводить порядок"), distractors: ["kochen", "schlafen", "fahren", "suchen"] },

  { id: "fahren", topic: "transport", verb: "fahren", ru: "ехать", example: "Wir fahren nach Berlin.", mediaDataUri: sceneSvg("Поездка", "движение транспортом"), distractors: ["gehen", "bezahlen", "öffnen", "planen"] },
  { id: "einsteigen", topic: "transport", verb: "einsteigen", ru: "садиться (в транспорт)", example: "Ich steige in den Bus ein.", mediaDataUri: sceneSvg("Остановка", "вход в автобус/поезд"), distractors: ["aussteigen", "fahren", "laufen", "kaufen"] },
  { id: "aussteigen", topic: "transport", verb: "aussteigen", ru: "выходить (из транспорта)", example: "Wir steigen an der nächsten Station aus.", mediaDataUri: sceneSvg("Станция", "выход из метро/поезда"), distractors: ["einsteigen", "fahren", "öffnen", "suchen"] },
  { id: "laufen", topic: "transport", verb: "laufen", ru: "бежать/идти (быстро)", example: "Ich laufe zum Zug.", mediaDataUri: sceneSvg("Спешка", "человек бежит"), distractors: ["fahren", "schlafen", "planen", "bezahlen"] },

  { id: "planen", topic: "office", verb: "planen", ru: "планировать", example: "Wir planen das Projekt.", mediaDataUri: sceneSvg("Встреча", "план проекта"), distractors: ["bezahlen", "kochen", "einsteigen", "aufräumen"] },
  { id: "sprechen", topic: "office", verb: "sprechen", ru: "говорить", example: "Ich spreche mit dem Kunden.", mediaDataUri: sceneSvg("Разговор", "обсуждение"), distractors: ["schreiben", "öffnen", "kaufen", "fahren"] },
  { id: "schreiben", topic: "office", verb: "schreiben", ru: "писать", example: "Ich schreibe eine E-Mail.", mediaDataUri: sceneSvg("Письмо", "написание сообщения"), distractors: ["sprechen", "planen", "laufen", "bezahlen"] },
  { id: "unterschreiben", topic: "office", verb: "unterschreiben", ru: "подписывать", example: "Bitte unterschreiben Sie hier.", mediaDataUri: sceneSvg("Документ", "подпись"), distractors: ["öffnen", "planen", "kaufen", "aussteigen"] },

  { id: "kaufen", topic: "shopping", verb: "kaufen", ru: "покупать", example: "Ich kaufe Brot.", mediaDataUri: sceneSvg("Магазин", "выбор товара"), distractors: ["bezahlen", "suchen", "öffnen", "kochen"] },
  { id: "bezahlen", topic: "shopping", verb: "bezahlen", ru: "платить", example: "Ich bezahle mit Karte.", mediaDataUri: sceneSvg("Касса", "оплата"), distractors: ["kaufen", "suchen", "fahren", "schlafen"] },
  { id: "suchen", topic: "shopping", verb: "suchen", ru: "искать", example: "Ich suche Milch.", mediaDataUri: sceneSvg("Поиск", "поиск товара на полке"), distractors: ["kaufen", "bezahlen", "öffnen", "planen"] },
  { id: "öffnen", topic: "shopping", verb: "öffnen", ru: "открывать", example: "Ich öffne die Tür.", mediaDataUri: sceneSvg("Дверь", "открыть дверь/упаковку"), distractors: ["schreiben", "laufen", "kaufen", "aufräumen"] },
];