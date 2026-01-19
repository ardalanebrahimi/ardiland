import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, catchError, of } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuth().pipe(
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true;
      }
      router.navigate(['/admin/login']);
      return false;
    }),
    catchError(() => {
      router.navigate(['/admin/login']);
      return of(false);
    })
  );
};
