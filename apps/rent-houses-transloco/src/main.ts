import { bootstrapApplication } from '@angular/platform-browser';
import { Routes, provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { isDevMode } from '@angular/core';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from './loaders';
import { AppComponent, DetailsComponent, HomeComponent } from './components';

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: '...',
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: '...',
  },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routeConfig),
    provideHttpClient(),
    provideTransloco({
      config: {
        availableLangs: ['en', 'es', 'ru'],
        defaultLang: 'en',
        fallbackLang: 'en',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
  ],
}).catch((err) => console.error(err));
