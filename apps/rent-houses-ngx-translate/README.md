# rent-houses-ngx-translate

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
> The application uses [ngx-translate library](https://www.npmjs.com/package/@ngx-translate/core) and practises from [its docs](https://github.com/ngx-translate/core).

### Scripts

| Script                                     | Description                                                                                                                |
|--------------------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| npm run start                              | Running the application                                                                                                    |
| npm run start:docker                       | Running the application in Docker                                                                                          |
| npm run build:                             | Build the application                                                                                                      |
| npm run check:dictionaries                 | Check translations in dictionaries (which are in folder `src/assets/i18n`)                                                 |

### Creating new translation file

* Create copy of `en.json` in `src/assets/i18n` and rename it according to template: `<LANG>.json`
* Fill all translations in file
* Add new language in `src/main.ts` at `initializeApplication` function

### Update existing translations

* Update translations in default locale dictionary (which is `en.json` in `src/assets/i18n`)
* Copy changed lines from `en.json` in `src/assets/i18n` to other dictionary files and fill translations

### Docker

To run the application run the script:

```bash
npm run start:docker
```

Application can be opened at `http://localhost:4200`. By default with `en` locale.
