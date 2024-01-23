import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import base64ToBytes from './utils/base64ToBytes';

const urlParams = new URLSearchParams(window.location.search);
let translation = {};
try {
  translation = JSON.parse(new TextDecoder().decode(base64ToBytes(urlParams.get('translation') ?? "")));
}
catch (ex) {
  console.error("Error in parsing translation");
}

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
