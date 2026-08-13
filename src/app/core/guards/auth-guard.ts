import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../stores/auth-store';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, take } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  if (authStore.isAuth()) {
    return true;
  }

  if (authStore.status() === 'idle') {
    console.log('idle');

    authStore.checkSession();
  }

  return toObservable(authStore.status).pipe(
    filter((status) => status !== 'idle' && status !== 'loading'),
    take(1),
    map((status) => {
      if (status === 'authenticated') {
        return true;
      }
      return router.parseUrl('/login');
    })
  )
};
