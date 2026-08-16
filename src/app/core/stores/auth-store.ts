import { computed, inject } from "@angular/core";
import { AuthSate, LoginReq, RegisterReq } from "../../shared/models/auth-model";
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { AuthService } from "../services/auth-service";
import { Router } from "@angular/router";
import { exhaustMap, firstValueFrom, pipe, switchMap, tap } from "rxjs";
import { NotificationService } from "../services/notification-service";
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from "@angular/common/http";

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
        checkSession: rxMethod<void>(
            pipe(
                tap(() => patchState(store, { status: "loading" })),
                exhaustMap(() => (
                    authService.checkSession().pipe(
                        tapResponse({
                            next: (res) => {
                                if (res.authenticated && res.user) {
                                    patchState(store, { user: res.user, status: 'authenticated' });
                                } else {
                                    patchState(store, { user: null, status: 'authenticated' });
                                }

                            },
                            error: () => {
                                patchState(store, { user: null, status: 'unauthenticated' });
                            }
                        })
                    )
                ))
            )
        ),
        login: rxMethod<LoginReq>(
            pipe(
                // 1. set the state 
                tap(() => patchState(store, { status: 'loading' })),
                exhaustMap((data) => (
                    authService.login(data).pipe(
                        tapResponse({
                            next: (user) => {
                                patchState(store, { user, status: 'authenticated' });
                                router.navigate(['/dashboard']);
                                snackBar.success('Login success');
                            },
                            error: () => {
                                patchState(store, { user: null, status: 'unauthenticated' });
                            }
                        }),
                    )
                )),
            )
        ),
        register: rxMethod<RegisterReq>(
            pipe(
                // 1. Set the state to "loading" at the start of the invocation.
                tap(() => patchState(store, { status: 'loading' })),
                // 2. to prevent spam calls 
                exhaustMap((data) => (
                    authService.register(data).pipe(
                        tapResponse({
                            next: (user) => {
                                patchState(store, { user, status: 'authenticated' });
                                router.navigate(['/dashboard']);
                                snackBar.success('Account created successfully!');
                            },
                            error: () => {
                                patchState(store, { user: null, status: 'unauthenticated' });
                            },
                        })
                    )
                )),
            )
        ),
        logout: rxMethod<void>(
            pipe(
                exhaustMap(() => (
                    authService.logout().pipe(
                        tapResponse({
                            next: () => {
                                patchState(store, { user: null, status: 'unauthenticated' });
                                router.navigate(['/login']);
                            },
                            error: () => {
                            }
                        })
                    )
                ))
            )
        )
    })),
    withHooks({
        onInit(store) {
            store.checkSession();
        },
    }),

);