import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFound } from './not-found';
import { provideRouter } from '@angular/router';
import { AuthStore } from '../../core/stores/auth-store';
import { User } from '../../shared/models/auth-model';
import { patchState } from '@ngrx/signals';
import { signal } from '@angular/core';

describe('NotFound', () => {
  let component: NotFound;
  let fixture: ComponentFixture<NotFound>;
  let element: HTMLElement;
  const isAuthSignal = signal(false);
  const mockAuthStore = {
    isAuth: isAuthSignal
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFound],
      providers: [
        provideRouter([]),
        { provide: AuthStore, useValue: mockAuthStore }

      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NotFound);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('tag h1 with text "404" ', () => {
    const h1 = element.querySelector('h1')!;
    expect(h1.textContent).toEqual('404');
  });

  it('tag h2 with text "Page not found"', () => {
    const h2 = element.querySelector('h2')!;
    expect(h2.textContent).toEqual('Page not found');
  });

  it('tag p  with text "The page you are looking for does not exist or has been moved."', () => {
    const p = element.querySelector('p')!;
    expect(p.textContent).toEqual('The page you are looking for does not exist or has been moved.');
  });

  describe('tag a', () => {
    describe(' if isAuth === true', () => {

      beforeEach(() => {
        // set the isAuthSignal to true
        isAuthSignal.set(true);
        // Notify the signal change
        fixture.detectChanges();
      })

      it('check message() value is "Return to the dashboard"', () => {
        const a = element.querySelector('a')!;
        expect(a.textContent).toEqual('Return to the dashboard');
      });

      it('check linkPath() value is "/dashboard"', () => {
        const a = element.querySelector('a')!;
        expect(a.getAttribute('href')).toEqual('/dashboard');
      });
    });

    describe('if isAuth === false', () => {
      beforeEach(() => {
        isAuthSignal.set(false); // set the isAuthSignal to false
        fixture.detectChanges(); // Notify the signal change
      });

      it('check message() value is "Log in to the site"', () => {
        const a = element.querySelector('a')!;
        expect(a.textContent).toEqual('Log in to the site');
      });

      it('check linkPath() value is "/login"', () => {
        const a = element.querySelector('a')!;
        expect(a.getAttribute('href')).toEqual('/login');
      });
    })

  })
});
