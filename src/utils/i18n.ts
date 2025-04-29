import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi, { HttpBackendOptions } from "i18next-http-backend";

const backendOptions: HttpBackendOptions = {
  loadPath: "https://locales.pokemonle.com/{{lng}}/{{ns}}.json",
};

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .init<HttpBackendOptions>({
    lng: "zh-Hans",
    fallbackLng: "en",
    backend: backendOptions,
    supportedLngs: [
      "en",
      "zh-Hans",
      "zh-Hant",
      "ja",
      "kr",
      "es",
      "fr",
      "de",
      "it",
    ],
    debug: true,
  });

export default i18n;
