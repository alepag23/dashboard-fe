import { Component, inject, OnInit } from '@angular/core';
import { AuthStore } from '../../core/stores/auth-store';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  private readonly authStore = inject(AuthStore);



  ngOnInit(): void {
    this.testLogin();
  }

  async testLogin() {
    await this.authStore.login({
      email: 'test@test.com',
      password: '12345678',
    });
  }
}
