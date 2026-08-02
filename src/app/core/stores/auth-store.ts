import { computed, inject } from "@angular/core";
import { AuthSate, AuthStatus, LoginReq, RegisterReq, User } from "../../shared/models/auth-model";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { AuthService } from "../services/auth-service";
import { Router } from "@angular/router";
import { firstValueFrom } from "rxjs";


const initialState: AuthSate = {
    user: null,
    status: 'idle',
    error: null,
}

export const AuthStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),

    withComputed((store) => ({
        isAuth: computed(() => store.status() === 'authenticated'),
        isLoading: computed(() => store.status() === 'loading'),
        currentUser: computed(() => store.user()),
    })),

    withMethods((
        store,
        authService = inject(AuthService),
        router = inject(Router)
    ) => ({

        /**
         * Runs on application startup (or page refresh)
         */
        async checkSession(): Promise<void> {
            patchState(store, { status: 'loading', error: null });
            try {
                const user = await firstValueFrom(authService.checkSession());
                patchState(store, { user, status: 'authenticated', error: null });
            } catch {
                patchState(store, { user: null, status: 'unauthenticated' })
            }
        },

        /**
         * Login 
         * @param data
         * @return boolean
         */
        async login(data: LoginReq): Promise<void> {
            patchState(store, { status: 'loading', error: null });
            try {
                const user = await firstValueFrom(authService.login(data));
                patchState(store, { user, status: 'authenticated', error: null });
                await router.navigate(['/dashboard']);
            } catch {
                patchState(store, { user: null, status: 'unauthenticated', error: 'Credential invalid' });
                // add snackbar for manage error message
            }
        },

        /**
         * Register
         * @param data 
         * @return boolean
         */
        async register(data: RegisterReq): Promise<void> {
            //TODO
        },

        /**
         * Logout
         */
        async logout(): Promise<void> {
            try {
                await firstValueFrom(authService.logout());
            } catch {
                // We ignore the HTTP error and reset the client-side state anyway
            } finally {
                patchState(store, { user: null, status: 'unauthenticated', error: null });
            }
        }

    }))
);