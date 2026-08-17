import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/envirornment-local';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const baseUrlAuth: string = environment.apiPath + environment.apiUrlAuth;
  const authReq = req.clone({
    withCredentials: true,
  });

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {

      if (error.status === 401 && !req.url.includes(`${baseUrlAuth}/checkSession`)) {
        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
};
