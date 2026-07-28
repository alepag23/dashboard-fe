import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('dashboard-fe');
  private readonly authService = inject(AuthService);

  isLogged$ = this.authService.login({
    email: 'test@test.com',
    password: '12345678',
  }).subscribe();

  ngOnInit(): void {
    console.log(this.isLogged$);

  }

}
