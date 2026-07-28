import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./features/login/login').then(c => c.Login),
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard').then(c => c.Dashboard),
        canActivate: [authGuard],
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
    }
];
