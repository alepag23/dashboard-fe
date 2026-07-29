export interface RegisterReq {
    name: string;
    surname: string;
    email: string;
    password: string;
}

export type LoginReq = Omit<RegisterReq, 'name' | 'surname'>;

export interface User extends Omit<RegisterReq, 'password'> {
    //id: number;
    //role:string;
    createdAt: string;
}

export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated';

export interface AuthSate {
    user: User | null;
    status: AuthStatus;
    error: string | null;
}

