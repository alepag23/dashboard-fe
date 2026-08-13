import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../stores/auth-store';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authStore = inject(AuthStore);

  if (authStore.isAuth()) {
    return router.parseUrl('/dashboard');
  }

  return true;
};
