export interface User {
    id: number;
    name: string;
    surname: string;
    //role:string;
}

export interface RegisterReq {
    name: string;
    surname: string;
    email: string;
    password: string;
}

export type LoginReq = Omit<RegisterReq, 'name' | 'surname'>;

export interface LoginRes {
    message: string;
}

export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated';

export interface AuthSate {
    user: User | null;
    status: AuthStatus;
    error: string | null;
}

