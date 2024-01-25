import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

export const initializeI18n = (translation) =>
  i18next
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources: {
        en: {
          translation
        },
      },
      lng: "en",
      defaultNS: 'translation',
    });
