import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotFound } from './not-found';

describe('NotFound', () => {
  let component: NotFound;
  let fixture: ComponentFixture<NotFound>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFound],
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

  it('tag h2 with text "Page Not Found"', () => {
    const h2 = element.querySelector('h2')!;
    expect(h2.textContent).toEqual('Page Not Found');
  });

  it('tag p  with text "We couldn\'t find what you were looking for."', () => {
    const p = element.querySelector('p')!;
    expect(p.textContent).toEqual('We couldn\'t find what you were looking for.');
  });
});
