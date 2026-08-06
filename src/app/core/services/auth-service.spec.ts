import { TestBed } from '@angular/core/testing';
import { LoginReq, User } from '../../shared/models/auth-model';
import { AuthService } from './auth-service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../environments/envirornment-local';
import { AuthStore } from '../stores/auth-store';

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
    //authStore = TestBed.inject(AuthStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {

    const fakeUser: LoginReq = {
      email: 'test@test.com',
      password: '12345678',
    }
    const loginRes: User = {
      //id: 1,
      name: 'Jef',
      surname: 'Azopp',
      email: 'test@test.com',
      createdAt: Date()
    }

    it('posts the credentials to the login endpoint sending cookies', () => {
      service.login(fakeUser).subscribe();

      const req = httpMock.expectOne(`${environment.apiPath + environment.apiUrlAuth}/login`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(fakeUser);
      expect(req.request.withCredentials).toBe(true);
      req.flush(loginRes);
    });

    it('');
  })
});
