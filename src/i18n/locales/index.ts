const locales = ["en", "ru", "de"] as const;

const localesLabels = {
  en: "English",
  ru: "Русский",
  de: "Deutsch",
};

type LocaleType = (typeof locales)[number];

export { locales, type LocaleType, localesLabels };
