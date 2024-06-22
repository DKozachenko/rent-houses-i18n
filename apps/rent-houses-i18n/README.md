# rent-houses-i18n

[Tutorial Project](https://angular.dev/tutorials/first-app) from Angular documentation.

The code in this project is different from the [original](https://goo.gle/42j4NjS).

Here are some changes:

* removing packages for testing using karma, jasmine, protractor, namely:
  * protractor
  * copyfiles
  * karma
  * karma-chrome-launcher
  * karma-coverage
  * karma-jasmine
  * karma-jasmine-html-reporter
  * @types/jasmine
  * jasmine-core
  * jasmine-marbles
  * jasmine-spec-reporter
* changing **typescript** versions from *~4.9.3* to *~5.3.3* to avoid conflicts between versions of other packages
* restructuring the project, adding [barrel](https://basarat.gitbook.io/typescript/main-1/barrel) files

> [!IMPORTANT]  
> The application uses official Angular [package for internalization](https://www.npmjs.com/package/@angular/localize) and uses practises from [official guide](https://angular.dev/guide/i18n).

### Scripts

| Script                                     | Description                                                                                                                |
|--------------------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| npm run start:default:locale               | Running the application with default locale (which is `en`)                                                                |
| npm run start:localize `<LOCALE>`          | Running the application with specific locale (available locales are in `src/locale`)                                       |
| npm run start:localize:all:docker          | Running the application with all available locales in Docker                                                               |
| npm run build:default:locale               | Build the application with default locale (which is `en`)                                                                  |
| npm run build:localize `<LOCALE>`          | Build the application with specific locale (available locales are in `src/locale`)                                         |
| npm run build:localize:all                 | Build the application with all available locales                                                                           |
| npm run generate:lang:file `<LANG>`        | Generate new dictionary file with translations                                                                             |
| npm run check:dictionaries                 | Check translations in dictionaries (which are in folder `src/locale`)                                                      |

### Creating new translation file

* Create copy of `dictionary.en.json` in `src/locale` and rename it according to template: `dictionary.<LANG>.json`
* Fill all translations in file
* Create new index html file in `src/index` and rename it according to template: `index.<LANG>.html`
* Add new locale to `projects.angular.io-example.i18n.locales` in `angular.json`
* Add new configuration to `projects.angular.io-example.architect.build.configurations` in `angular.json`

### Update existing translations

* Run script to update default locale dictionary
```bash
npm run generate:lang:file en
```
* Copy changed lines from `dictionary.en.json` in `src/locale` to other dictionary files and fill translations

### Docker

To run the application with all available locales (available locales are in `src/locale`) run the script:

```bash
npm run start:localize:all:docker
```

Application can be opened at `http://localhost:4200`. By default with `en` locale.
Localized version of application can be opened at `http://localhost:4200/<LOCALE>/`.
