import { Route } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./products/admin-products.component').then(
        (m) => m.AdminProductsComponent
      ),
  },
  {
    path: 'essays',
    loadComponent: () =>
      import('./essays/admin-essays.component').then(
        (m) => m.AdminEssaysComponent
      ),
  },
  {
    path: 'messages',
    loadComponent: () =>
      import('./messages/admin-messages.component').then(
        (m) => m.AdminMessagesComponent
      ),
  },
] as Route[];
