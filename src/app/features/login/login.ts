import { Component, inject, signal } from '@angular/core';
import { email, form, FormField, FormRoot, minLength, required } from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthStore } from '../../core/stores/auth-store';
import { LoginReq } from '../../shared/models/auth-model';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, FormField, FormRoot, MatButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly authStore = inject(AuthStore);
  protected loginModel = signal<LoginReq>({
    email: '',
    password: '',
  });

  protected loginForm = form(this.loginModel, (schemaPath) => {
    // Email validation
    required(schemaPath.email, { message: 'Email is required' });
    email(schemaPath.email, { message: 'Enter a valid email' });
    // Password validation
    required(schemaPath.password, { message: 'password is required' });
    minLength(schemaPath.password, 8, { message: 'At least 8 characters' });
  }, {
    submission: {
      action: async (field) => {
        await this.authStore.login(field().value());
      }
    }
  });
}
