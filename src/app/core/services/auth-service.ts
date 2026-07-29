import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginReq, RegisterReq, User } from '../../shared/models/auth-model';
import { environment } from '../../../environments/envirornment-local';

@Service()
export class AuthService {
    private readonly http = inject(HttpClient);
    baseUrlAuth: string = environment.apiPath + environment.apiUrlAuth;

    register(data: RegisterReq): Observable<User> {
        return this.http.post<User>(`${this.baseUrlAuth}/register`, data);
    }

    login(data: LoginReq): Observable<User> {
        return this.http.post<User>(`${this.baseUrlAuth}/login`, data);
    }

    /**
     * Call used on bootstrap/refresh to check for the httpOnly cookie
     * @returns User
     */
    checkSession(): Observable<User> {
        return this.http.get<User>(`${this.baseUrlAuth}/checkSession`);
    }

    logout(): Observable<void> {
        return this.http.post<void>(`${this.baseUrlAuth}/logout`, {});
    }
}
