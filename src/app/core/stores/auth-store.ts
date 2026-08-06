import { computed, inject } from "@angular/core";
import { AuthSate, AuthStatus, LoginReq, RegisterReq, User } from "../../shared/models/auth-model";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { AuthService } from "../services/auth-service";
import { Router } from "@angular/router";
import { firstValueFrom } from "rxjs";
import { NotificationService } from "../services/notification-service";
import { extractErrorMessage } from "../../shared/utils/error-handler-util";

const initialState: AuthSate = {
    user: null,
    status: 'idle',
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
        router = inject(Router),
        snackBar = inject(NotificationService),
    ) => ({

        /**
         * Runs on application startup (or page refresh)
         */
        async checkSession(): Promise<void> {
            patchState(store, { status: 'loading', });
            try {
                const user = await firstValueFrom(authService.checkSession());
                patchState(store, { user, status: 'authenticated', });
            } catch {
                patchState(store, { user: null, status: 'unauthenticated' });
                router.navigate(['/login']);
            }
        },

        /**
         * Login 
         * @param data
         * @return void
         */
        async login(data: LoginReq): Promise<void> {
            patchState(store, { status: 'loading', });
            try {
                const user = await firstValueFrom(authService.login(data));
                patchState(store, { user, status: 'authenticated', });
                await router.navigate(['/dashboard']);
            } catch (error) {
                const errorMessage: string = extractErrorMessage(error);
                patchState(store, { user: null, status: 'unauthenticated' });
                snackBar.error(errorMessage);
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
                patchState(store, { user: null, status: 'unauthenticated' });
                router.navigate(['/login']);
            }
        }

    }))
);