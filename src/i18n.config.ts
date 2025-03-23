import { Languages } from "./components/constants/enums";

export type LanguageType = Languages.ARABIC | Languages.ENGLISH;

type i18nType = {
  defaultLocale: LanguageType;
  locales: LanguageType[];
};

export const i18n: i18nType = {
    defaultLocale: Languages.ARABIC, // "ar"
    locales: [Languages.ARABIC, Languages.ENGLISH], // ["ar", "en"]
  };
  

export type Locale = (typeof i18n)['locales'][number];