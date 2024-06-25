/// <reference types="@angular/localize" />

import '@angular/common/locales/global/en';
import '@angular/common/locales/global/ru';
import '@angular/common/locales/global/es';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent, DetailsComponent, HomeComponent } from './components';
import { Routes, provideRouter } from '@angular/router';

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: $localize `:@@home-page-title:Home page`,
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: $localize `:@@home-details-title:Home details`,
  },
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routeConfig)],
}).catch((err) => console.error(err));
