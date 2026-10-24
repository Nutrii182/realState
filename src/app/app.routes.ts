import { Routes } from '@angular/router';

import { adminGuard } from './users/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/components/home-page/home-page.component')
      .then((component) => component.HomePageComponent),
    title: 'Inicio | Real Estate'
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadComponent: () => import('./users/components/admin-home/admin-home.component')
      .then((component) => component.AdminHomeComponent),
    title: 'Administración | Real Estate'
  },
  {
    path: 'users/login',
    loadComponent: () => import('./users/components/login/login.component')
      .then((component) => component.LoginComponent),
    title: 'Iniciar sesión | Real Estate'
  },
  {
    path: 'users/home',
    loadComponent: () => import('./users/components/user-home/user-home.component')
      .then((component) => component.UserHomeComponent),
    title: 'Área de usuario | Real Estate'
  },
  { path: '**', redirectTo: '' }
];
