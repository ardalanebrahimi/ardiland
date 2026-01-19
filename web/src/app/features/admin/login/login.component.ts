import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div
      class="min-h-screen flex items-center justify-center px-4"
      [class]="themeService.dark() ? 'bg-gray-950' : 'bg-gray-50'"
    >
      <div
        class="w-full max-w-sm p-8 rounded-xl border"
        [class]="themeService.dark()
          ? 'bg-gray-900 border-gray-800'
          : 'bg-white border-gray-200'"
      >
        <h1
          class="text-2xl font-semibold text-center mb-8"
          [class]="themeService.dark() ? 'text-white' : 'text-gray-900'"
        >
          Admin Login
        </h1>

        @if (error()) {
          <div class="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm">
            {{ error() }}
          </div>
        }

        <form (ngSubmit)="onSubmit()" class="space-y-4">
          <div>
            <label
              for="username"
              class="block text-sm font-medium mb-1"
              [class]="themeService.dark() ? 'text-gray-300' : 'text-gray-700'"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              [(ngModel)]="username"
              name="username"
              class="w-full px-3 py-2 rounded-lg border transition-colors"
              [class]="themeService.dark()
                ? 'bg-gray-800 border-gray-700 text-white focus:border-gray-500'
                : 'bg-white border-gray-300 text-gray-900 focus:border-gray-500'"
              required
            />
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium mb-1"
              [class]="themeService.dark() ? 'text-gray-300' : 'text-gray-700'"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              [(ngModel)]="password"
              name="password"
              class="w-full px-3 py-2 rounded-lg border transition-colors"
              [class]="themeService.dark()
                ? 'bg-gray-800 border-gray-700 text-white focus:border-gray-500'
                : 'bg-white border-gray-300 text-gray-900 focus:border-gray-500'"
              required
            />
          </div>

          <button
            type="submit"
            [disabled]="loading()"
            class="w-full py-2 px-4 rounded-lg font-medium transition-colors disabled:opacity-50"
            [class]="themeService.dark()
              ? 'bg-white text-gray-900 hover:bg-gray-100'
              : 'bg-gray-900 text-white hover:bg-gray-800'"
          >
            {{ loading() ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>
      </div>
    </div>
  `,
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  themeService = inject(ThemeService);

  username = '';
  password = '';
  loading = signal(false);
  error = signal<string | null>(null);

  onSubmit(): void {
    if (!this.username || !this.password) {
      this.error.set('Please enter username and password');
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.authService.login(this.username, this.password).subscribe({
      next: (success) => {
        this.loading.set(false);
        if (success) {
          this.router.navigate(['/admin']);
        } else {
          this.error.set('Invalid credentials');
        }
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Login failed. Please try again.');
      },
    });
  }
}
