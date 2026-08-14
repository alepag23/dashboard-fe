import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthStore } from '../../core/stores/auth-store';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, MatButtonModule],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
})
export class NotFound {
  private readonly authStore = inject(AuthStore);

  protected readonly message = computed(() => {
    return this.authStore.isAuth() ? 'Return to the dashboard' : 'Log in to the site';
  });

  protected readonly linkPath = computed(() => {
    return this.authStore.isAuth() ? '/dashboard' : '/login';
  });
}
