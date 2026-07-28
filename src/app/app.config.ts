import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { credentialsInterceptor } from './core/interceptors/credentials-interceptor';
import { AuthService } from './core/services/auth-service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(
      withInterceptors([
        credentialsInterceptor, // Enable automatic sending of httpOnly to the backend

      ])),
    //provideAppInitializer(() => inject(AuthService).chec),
    provideRouter(routes)
  ]
};
