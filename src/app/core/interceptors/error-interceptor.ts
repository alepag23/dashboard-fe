import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NotificationService } from '../services/notification-service';
import { catchError, throwError } from 'rxjs';
import { ApiErrorResponse } from '../../shared/models/api-error-model';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const apiError = error.error as ApiErrorResponse;
      snackBar.error(apiError.message);
      return throwError(() => error);
    })
  );
};
