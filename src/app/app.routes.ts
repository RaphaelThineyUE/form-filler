import { Routes } from '@angular/router';
import { AppShellComponent } from './layouts/app-shell/app-shell.component';
import { HomeComponent } from './features/home/home.component';
import { AboutComponent } from './features/about/about.component';
import { NotFoundComponent } from './features/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: AppShellComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        title: 'form-filler - Home',
      },
      {
        path: 'about',
        component: AboutComponent,
        title: 'form-filler - About',
      },
      {
        path: '**',
        component: NotFoundComponent,
        title: '404 - Page Not Found',
      },
    ],
  },
];
