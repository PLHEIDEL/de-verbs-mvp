export type TopicId = "home" | "transport" | "office" | "shopping";

export type VerbItem = {
  id: string;
  topic: TopicId;
  verb: string;
  ru: string;
  example: string;
  mediaDataUri: string; // позже заменим на фото
  distractors: string[];
};

type Bilingual = { ru: string; en: string };

function svgData(svg: string) {
  const encoded = encodeURIComponent(svg)
    .replace(/'/g, "%27")
    .replace(/"/g, "%22");
  return `data:image/svg+xml;charset=UTF-8,${encoded}`;
}

/**
 * Нейтральная “сцена” без текста (чтобы язык интерфейса не ломался).
 */
function sceneSvg(): string {
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

    <path d="M700 160h350" stroke="rgba(0,0,0,0.45)" stroke-width="12" stroke-linecap="round"/>
    <path d="M700 200h240" stroke="rgba(0,0,0,0.35)" stroke-width="10" stroke-linecap="round"/>

    <path d="M700 360h320" stroke="rgba(255,255,255,0.35)" stroke-width="10" stroke-linecap="round"/>
    <path d="M700 400h280" stroke="rgba(255,255,255,0.25)" stroke-width="10" stroke-linecap="round"/>
    <path d="M700 440h300" stroke="rgba(255,255,255,0.20)" stroke-width="10" stroke-linecap="round"/>
  </svg>`;
  return svgData(svg);
}

export const TOPICS: { id: TopicId; title: Bilingual; subtitle: Bilingual }[] = [
  { id: "home", title: { ru: "Дом", en: "Home" }, subtitle: { ru: "рутина, быт, кухня", en: "routine, chores, kitchen" } },
  { id: "transport", title: { ru: "Транспорт", en: "Transport" }, subtitle: { ru: "поездки, метро, поезд", en: "trips, metro, trains" } },
  { id: "office", title: { ru: "Офис", en: "Office" }, subtitle: { ru: "встречи, планы, звонки", en: "meetings, plans, calls" } },
  { id: "shopping", title: { ru: "Покупки", en: "Shopping" }, subtitle: { ru: "магазин, оплата, поиск", en: "store, payment, searching" } },
];

export const VERBS: VerbItem[] = [
  // HOME
  { id: "aufstehen", topic: "home", verb: "aufstehen", ru: "вставать", example: "Ich stehe um 7 Uhr auf.", mediaDataUri: sceneSvg(), distractors: ["schlafen", "kochen", "aufräumen", "öffnen"] },
  { id: "schlafen", topic: "home", verb: "schlafen", ru: "спать", example: "Ich schlafe acht Stunden.", mediaDataUri: sceneSvg(), distractors: ["aufstehen", "kochen", "laufen", "bezahlen"] },
  { id: "kochen", topic: "home", verb: "kochen", ru: "готовить", example: "Ich koche Pasta.", mediaDataUri: sceneSvg(), distractors: ["kaufen", "fahren", "aufräumen", "schreiben"] },
  { id: "aufräumen", topic: "home", verb: "aufräumen", ru: "убираться", example: "Ich räume das Zimmer auf.", mediaDataUri: sceneSvg(), distractors: ["kochen", "schlafen", "fahren", "suchen"] },

  // TRANSPORT
  { id: "fahren", topic: "transport", verb: "fahren", ru: "ехать", example: "Wir fahren nach Berlin.", mediaDataUri: sceneSvg(), distractors: ["gehen", "bezahlen", "öffnen", "planen"] },
  { id: "einsteigen", topic: "transport", verb: "einsteigen", ru: "садиться (в транспорт)", example: "Ich steige in den Bus ein.", mediaDataUri: sceneSvg(), distractors: ["aussteigen", "fahren", "laufen", "kaufen"] },
  { id: "aussteigen", topic: "transport", verb: "aussteigen", ru: "выходить (из транспорта)", example: "Wir steigen an der nächsten Station aus.", mediaDataUri: sceneSvg(), distractors: ["einsteigen", "fahren", "öffnen", "suchen"] },
  { id: "laufen", topic: "transport", verb: "laufen", ru: "бежать/идти (быстро)", example: "Ich laufe zum Zug.", mediaDataUri: sceneSvg(), distractors: ["fahren", "schlafen", "planen", "bezahlen"] },

  // OFFICE
  { id: "planen", topic: "office", verb: "planen", ru: "планировать", example: "Wir planen das Projekt.", mediaDataUri: sceneSvg(), distractors: ["bezahlen", "kochen", "einsteigen", "aufräumen"] },
  { id: "sprechen", topic: "office", verb: "sprechen", ru: "говорить", example: "Ich spreche mit dem Kunden.", mediaDataUri: sceneSvg(), distractors: ["schreiben", "öffnen", "kaufen", "fahren"] },
  { id: "schreiben", topic: "office", verb: "schreiben", ru: "писать", example: "Ich schreibe eine E-Mail.", mediaDataUri: sceneSvg(), distractors: ["sprechen", "planen", "laufen", "bezahlen"] },
  { id: "unterschreiben", topic: "office", verb: "unterschreiben", ru: "подписывать", example: "Bitte unterschreiben Sie hier.", mediaDataUri: sceneSvg(), distractors: ["öffnen", "planen", "kaufen", "aussteigen"] },

  // SHOPPING
  { id: "kaufen", topic: "shopping", verb: "kaufen", ru: "покупать", example: "Ich kaufe Brot.", mediaDataUri: sceneSvg(), distractors: ["bezahlen", "suchen", "öffnen", "kochen"] },
  { id: "bezahlen", topic: "shopping", verb: "bezahlen", ru: "платить", example: "Ich bezahle mit Karte.", mediaDataUri: sceneSvg(), distractors: ["kaufen", "suchen", "fahren", "schlafen"] },
  { id: "suchen", topic: "shopping", verb: "suchen", ru: "искать", example: "Ich suche Milch.", mediaDataUri: sceneSvg(), distractors: ["kaufen", "bezahlen", "öffnen", "planen"] },
  { id: "öffnen", topic: "shopping", verb: "öffnen", ru: "открывать", example: "Ich öffne die Tür.", mediaDataUri: sceneSvg(), distractors: ["schreiben", "laufen", "kaufen", "aufräumen"] },
];