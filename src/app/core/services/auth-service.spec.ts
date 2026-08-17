import { TestBed } from '@angular/core/testing';
import { LoginReq, RegisterReq, User } from '../../shared/models/auth-model';
import { AuthService } from './auth-service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../environments/envirornment-local';
import { AuthStore } from '../stores/auth-store';
import { provideHttpClient } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const ResponseLoginAndRegister: User = {
    id: 1,
    name: 'Jef',
    surname: 'Azopp',
    email: 'test@test.com',
    createdAt: Date()
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Login', () => {

    const fakeUserLogin: LoginReq = {
      email: 'test@test.com',
      password: '12345678',
    }

    it('posts the credentials to the login endpoint sending cookies', () => {
      service.login(fakeUserLogin).subscribe((res) => {
        expect(res).toEqual(ResponseLoginAndRegister);
      });

      const req = httpMock.expectOne(`${environment.apiPath + environment.apiUrlAuth}/login`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(fakeUserLogin);
      req.flush(ResponseLoginAndRegister);
    });
  });

  describe('Register', () => {

    const fakeUserRegister: RegisterReq = {
      name: 'test',
      surname: 'testTest',
      email: 'test@email.test',
      password: '12345678'
    };

    it('create user with register endpoint', () => {
      service.register(fakeUserRegister).subscribe((res) => {
        expect(res).toEqual(ResponseLoginAndRegister);
      });
      const req = httpMock.expectOne(`${environment.apiPath + environment.apiUrlAuth}/register`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(fakeUserRegister);
      req.flush(ResponseLoginAndRegister);
    });

  })
});
