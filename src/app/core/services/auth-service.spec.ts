import { TestBed } from '@angular/core/testing';
import { LoginReq, LoginRes } from '../../shared/models/auth-model';
import { AuthService } from './auth-service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../environments/envirornment-local';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        //provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {

    const fakeUser: LoginReq = {
      email: 'test@test.com',
      password: '12345678',
    }
    const loginRes: LoginRes = {
      message: 'Login success',
    }

    it('posts the credentials to the login endpoint sending cookies', () => {
      service.login(fakeUser).subscribe();

      const req = httpMock.expectOne(`${environment.apiPath + environment.apiUrlAuth}/login`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(fakeUser);
      expect(req.request.withCredentials).toBe(true);
      req.flush(loginRes);
    });

    it('marks the user as authenticate on success', () => {
      service.login(fakeUser).subscribe();
      httpMock.expectOne(`${environment.apiPath + environment.apiUrlAuth}/login`).flush(loginRes);
      expect(service.isAuthenticated()).toBe(true);
    });

    it('propagates the error and stay unauthenticated when credential are rejected', () => {
      const onError = vi.fn();

      service.login(fakeUser).subscribe({
        next: () => { },
        error: onError,
      });

      httpMock.expectOne(`${environment.apiPath + environment.apiUrlAuth}/login`).flush(
        { message: 'Invalid credentials' },
        {
          status: 401,
          statusText: 'Unauthorized',
        }
      );

      expect(onError).toHaveBeenCalled();
      expect(service.isAuthenticated()).toBe(false);
    });

  })
});
