import { Routes } from '@angular/router';
import { AuthGuard } from './authguard.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./components/pages/home/home.component').then(m => m.HomeComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./components/pages/login-page/login-page.component').then(m => m.LoginPageComponent)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
