import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi, { HttpBackendOptions } from "i18next-http-backend";
// import client from "./axios";

// const loadResources = async (lang: string, namespace: string) => {
//   return await client.get(
//     `https://pokemon-locales.pages.dev/${lang}/${namespace}.json`
//   );
// };

const backendOptions: HttpBackendOptions = {
  loadPath: "https://pokemon-locales.pages.dev/{{lng}}/{{ns}}.json",
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
