import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { adminGuard } from './core/guards/admin-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home').then(m => m.Home),
  },
  {
    path: 'catalog',
    loadComponent: () =>
      import('./pages/catalog/catalog').then(m => m.Catalog),
  },
  {
    path: 'catalog/:id',
    loadComponent: () =>
      import('./pages/product-detail/product-detail').then(m => m.ProductDetail),
  },
  {
    path: 'order/:id',
    loadComponent: () =>
      import('./pages/order/order').then(m => m.Order),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login').then(m => m.Login),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register').then(m => m.Register),
  },
  {
    path: 'admin',
    canActivate: [authGuard, adminGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/admin/dashboard/dashboard').then(m => m.Dashboard),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/admin/products/products').then(m => m.Products),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./pages/admin/orders/orders').then(m => m.Orders),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
