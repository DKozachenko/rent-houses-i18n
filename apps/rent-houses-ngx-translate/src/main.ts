import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent, DetailsComponent, HomeComponent } from './components';
import { Routes, provideRouter } from '@angular/router';
import { APP_INITIALIZER, importProvidersFrom, inject } from '@angular/core';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { of } from 'rxjs';

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page',
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Home details',
  },
];

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function initializeApplication() {
  const translateService = inject(TranslateService);
  return () => {
    translateService.setDefaultLang('en');
    translateService.addLangs(['es', 'ru']);
    return of(null);
  };
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routeConfig),
    provideHttpClient(),
    importProvidersFrom([
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient],
        },
      }),
    ]),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApplication,
      multi: true,
    },
  ],
}).catch((err) => console.error(err));
