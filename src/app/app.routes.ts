import { Routes } from '@angular/router';
import { AuthGuard } from './authguard.service';
import { MyBookingsComponent } from './components/pages/my-bookings/my-bookings.component';

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
    path: 'my-listings',
    loadComponent: () => import('./components/pages/my-listings/my-listings.component').then(m => m.MyListingsComponent),
    canActivate: [AuthGuard]
  },
  { path: 'my-bookings', component: MyBookingsComponent }, // Guest
  {
    path: '**',
    redirectTo: 'home'
  }
];
