const fs = require('fs');
const path = require('path');

const LOCALES_PATH = path.join(__dirname, '..', 'src', 'assets', 'i18n');
const DEFAULT_LOCALE_FILENAME = 'en.json';
const DEFAULT_LOCALE_PATH = path.join(LOCALES_PATH, DEFAULT_LOCALE_FILENAME);

const DEFAULT_LOCALE_DICTIONARY = require(DEFAULT_LOCALE_PATH);

function isDictionariesEqual(dict1, dict2) {
  return Object.keys(dict1.translations).every(key => Object.keys(dict2.translations).includes(key));
}

fs.readdir(LOCALES_PATH, (err, fileNames) => {
  if (err) {
    console.log(err);
    return;
  }

  const dictionaries = fileNames.filter(fileName => fileName !== DEFAULT_LOCALE_FILENAME);

  dictionaries.forEach(fileName => {
    const filePath = path.join(LOCALES_PATH, fileName);
    const localeDictionary = require(filePath);
    if (Object.keys(localeDictionary.translations).length !== Object.keys(DEFAULT_LOCALE_DICTIONARY.translations).length) {
      console.log(`Keys in "translations" of ${filePath} dictionary differ from keys in "translations" of ${DEFAULT_LOCALE_PATH}`);
      process.exit(1);
    }

    if (!isDictionariesEqual(localeDictionary, DEFAULT_LOCALE_DICTIONARY)) {
      console.log(`Keys in "translations" of ${filePath} dictionary differ from keys in "translations" of ${DEFAULT_LOCALE_PATH}`);
      process.exit(1);
    }
  });

  console.log(`Dictionaries are in sync (${Object.keys(DEFAULT_LOCALE_DICTIONARY.translations).length} translations)`);
});
