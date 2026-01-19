import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./essays-list.component').then((m) => m.EssaysListComponent),
  },
  {
    path: ':slug',
    loadComponent: () =>
      import('./essay-detail.component').then((m) => m.EssayDetailComponent),
  },
];

export default routes;
