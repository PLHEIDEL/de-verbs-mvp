export type UiLang = "ru" | "en";

export const STRINGS: Record<UiLang, Record<string, string>> = {
  ru: {
    appTitle: "Deutsch Verben — MVP",
    appSubtitle: "картинка → выберите правильный глагол",
    progress: "Прогресс",
    reset: "Сброс",

    chooseTopic: "Выберите тему",
    chooseMode: "Дальше выберите режим: Учить или Повтор ошибок",

    learn: "Учить (новые + повтор)",
    review: "Повтор ошибок",

    totalVerbs: "Всего глаголов",
    seen: "Уже встречались",
    errors: "Ошибки к повтору",

    question: "Вопрос",
    correct: "Правильно",
    mistakes: "Ошибок",

    backHome: "На главную",
    hintAfter: "Подсказка (после ответа)",
    chooseAnswer: "Выберите вариант",
    finish: "Завершить сессию",

    modeLearn: "Учить",
    modeReview: "Повтор",

    noItems: "Нет элементов для сессии (попробуйте другой режим или тему).",
    srs: "SRS: 1д→3д→7д→14д→30д",
  },
  en: {
    appTitle: "German Verbs — MVP",
    appSubtitle: "image → pick the correct verb",
    progress: "Progress",
    reset: "Reset",

    chooseTopic: "Choose a topic",
    chooseMode: "Then choose a mode: Learn or Review",

    learn: "Learn (new + due)",
    review: "Review mistakes",

    totalVerbs: "Total verbs",
    seen: "Seen",
    errors: "Mistakes to review",

    question: "Question",
    correct: "Correct",
    mistakes: "Mistakes",

    backHome: "Home",
    hintAfter: "Hint (after answer)",
    chooseAnswer: "Pick an option",
    finish: "Finish session",

    modeLearn: "Learn",
    modeReview: "Review",

    noItems: "No items for this session (try another mode/topic).",
    srs: "SRS: 1d→3d→7d→14d→30d",
  },
};

export function t(lang: UiLang, key: string) {
  return STRINGS[lang][key] ?? key;
}

const KEY = "ui_lang_v1";

export function loadLang(): UiLang {
  const v = localStorage.getItem(KEY);
  return v === "en" ? "en" : "ru";
}

export function saveLang(lang: UiLang) {
  localStorage.setItem(KEY, lang);
}