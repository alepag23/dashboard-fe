import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthStore } from './core/stores/auth-store';
import { authInterceptor } from './core/interceptors/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(
      withInterceptors([
        authInterceptor, // Enable automatic sending of httpOnly to the backend
      ])),
    // APP INITIALIZER: Initializes the state before mounting the Guards and UI
    provideAppInitializer(() => {
      const authStore = inject(AuthStore);
      return authStore.checkSession();
    }),
    provideRouter(routes),
  ]
};
