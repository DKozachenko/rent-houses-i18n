import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent, DetailsComponent, HomeComponent } from './components';
import { Routes, provideRouter } from '@angular/router';

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

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routeConfig)],
}).catch((err) => console.error(err));
