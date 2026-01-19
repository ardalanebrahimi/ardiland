import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./products-list.component').then((m) => m.ProductsListComponent),
  },
  {
    path: ':slug',
    loadComponent: () =>
      import('./product-detail.component').then((m) => m.ProductDetailComponent),
  },
];

export default routes;
