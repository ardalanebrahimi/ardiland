import { Route } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'products',
    loadChildren: () => import('./features/products/products.routes'),
  },
  {
    path: 'essays',
    loadChildren: () => import('./features/essays/essays.routes'),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./features/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/contact/contact.component').then(
        (m) => m.ContactComponent
      ),
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes'),
    canActivate: [authGuard],
  },
  {
    path: 'admin/login',
    loadComponent: () =>
      import('./features/admin/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  // Redirect old thinking path to essays
  {
    path: 'thinking',
    redirectTo: 'essays',
    pathMatch: 'prefix',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
