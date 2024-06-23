const fs = require('fs');
const path = require('path');

const LOCALES_PATH = path.join(__dirname, '..', 'src', 'assets', 'i18n');
const DEFAULT_LOCALE_FILENAME = 'en.json';

function isDictionariesEqual(dict1, dict2) {
  return Object.keys(dict1).every(key => Object.keys(dict2).includes(key));
}

function isDirectory(filename) {
  return filename.split('.').length === 1;
}

function checkFolderDictionaries(dir) {
  fs.readdir(dir, (err, fileNames) => {
    if (err) {
      console.log(err);
      return;
    }

    const defaultLocalePath = path.join(dir, DEFAULT_LOCALE_FILENAME);
    const defaultLocaleDictionary = require(defaultLocalePath);

    const files = fileNames.filter(fileName => fileName !== DEFAULT_LOCALE_FILENAME);

    files.forEach((fileName, index) => {
      if (isDirectory(fileName)) {
        checkFolderDictionaries(path.join(LOCALES_PATH, fileName));
        return;
      }

      const filePath = path.join(dir, fileName);
      const localeDictionary = require(filePath);
      if (Object.keys(localeDictionary).length !== Object.keys(defaultLocaleDictionary).length) {
        console.log(`Keys in "translations" of ${filePath} dictionary differ from keys in "translations" of ${defaultLocalePath}`);
        process.exit(1);
      }

      if (!isDictionariesEqual(localeDictionary, defaultLocaleDictionary)) {
        console.log(`Keys in "translations" of ${filePath} dictionary differ from keys in "translations" of ${defaultLocalePath}`);
        process.exit(1);
      }

      if (index === files.length - 1) {
        console.log(`Dictionaries in ${dir} are in sync (${Object.keys(defaultLocaleDictionary).length} translations)`);
      }
    });
  });
}

checkFolderDictionaries(LOCALES_PATH);
