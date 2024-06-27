const fs = require('fs');
const path = require('path');

const LOCALES_PATH = path.join(__dirname, '..', 'src', 'assets', 'i18n');
const DEFAULT_LOCALE_FILENAME = 'en.json';
const DEFAULT_LOCALE_PATH = path.join(LOCALES_PATH, DEFAULT_LOCALE_FILENAME);

const DEFAULT_LOCALE_DICTIONARY = require(DEFAULT_LOCALE_PATH);
const FLATTEN_DEFAULT_LOCALE_DICTIONARY = flatten(DEFAULT_LOCALE_DICTIONARY);

function isDictionariesEqual(dict1, dict2) {
  return Object.keys(dict1).every(key => Object.keys(dict2).includes(key));
}

function traverseAndFlatten(currentNode, target, flattenedKey) {
  for (const key in currentNode) {
    if (currentNode.hasOwnProperty(key)) {
      let newKey;
      if (flattenedKey === undefined) {
        newKey = key;
      } else {
        newKey = flattenedKey + '.' + key;
      }

      const value = currentNode[key];
      if (typeof value === 'object') {
        traverseAndFlatten(value, target, newKey);
      } else {
        target[newKey] = value;
      }
    }
  }
}

// https://stackoverflow.com/a/34514143
function flatten(obj) {
  let flattenedObject = {};
  traverseAndFlatten(obj, flattenedObject);
  return flattenedObject;
}

function checkFolderDictionaries(dir) {
  fs.readdir(dir, (err, fileNames) => {
    if (err) {
      console.log(err);
      return;
    }

    const dictionaries = fileNames.filter(fileName => fileName !== DEFAULT_LOCALE_FILENAME);

    dictionaries.forEach(fileName => {
      const filePath = path.join(LOCALES_PATH, fileName);
      const localeDictionary = require(filePath);
      const flattenLocaleDictionary = flatten(localeDictionary);
      if (Object.keys(flattenLocaleDictionary).length !== Object.keys(FLATTEN_DEFAULT_LOCALE_DICTIONARY).length) {
        console.log(`Keys in ${filePath} dictionary differ from keys in ${DEFAULT_LOCALE_PATH}`);
        process.exit(1);
      }

      if (!isDictionariesEqual(flattenLocaleDictionary, FLATTEN_DEFAULT_LOCALE_DICTIONARY)) {
        console.log(`Keys in ${filePath} dictionary differ from keys in ${DEFAULT_LOCALE_PATH}`);
        process.exit(1);
      }
    });

    console.log(`Dictionaries are in sync (${Object.keys(FLATTEN_DEFAULT_LOCALE_DICTIONARY).length} translations)`);
  });
}

checkFolderDictionaries(LOCALES_PATH);
