import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service';
import { AuthService } from '../../../core/services/auth.service';
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div
      class="min-h-screen"
      [class]="themeService.dark() ? 'bg-gray-950' : 'bg-gray-50'"
    >
      <!-- Header -->
      <header
        class="border-b"
        [class]="themeService.dark()
          ? 'bg-gray-900 border-gray-800'
          : 'bg-white border-gray-200'"
      >
        <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1
            class="text-xl font-semibold"
            [class]="themeService.dark() ? 'text-white' : 'text-gray-900'"
          >
            Admin Dashboard
          </h1>
          <div class="flex items-center gap-4">
            <a
              routerLink="/"
              class="text-sm"
              [class]="themeService.dark()
                ? 'text-gray-400 hover:text-white'
                : 'text-gray-500 hover:text-gray-900'"
            >
              View Site
            </a>
            <button
              (click)="logout()"
              class="text-sm px-3 py-1.5 rounded-lg transition-colors"
              [class]="themeService.dark()
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <!-- Content -->
      <main class="max-w-6xl mx-auto px-6 py-8">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div
            class="p-6 rounded-xl border"
            [class]="themeService.dark()
              ? 'bg-gray-900 border-gray-800'
              : 'bg-white border-gray-200'"
          >
            <p
              class="text-sm mb-1"
              [class]="themeService.dark() ? 'text-gray-400' : 'text-gray-500'"
            >
              Products
            </p>
            <p
              class="text-3xl font-semibold"
              [class]="themeService.dark() ? 'text-white' : 'text-gray-900'"
            >
              {{ productCount() }}
            </p>
          </div>
          <div
            class="p-6 rounded-xl border"
            [class]="themeService.dark()
              ? 'bg-gray-900 border-gray-800'
              : 'bg-white border-gray-200'"
          >
            <p
              class="text-sm mb-1"
              [class]="themeService.dark() ? 'text-gray-400' : 'text-gray-500'"
            >
              Essays
            </p>
            <p
              class="text-3xl font-semibold"
              [class]="themeService.dark() ? 'text-white' : 'text-gray-900'"
            >
              {{ essayCount() }}
            </p>
          </div>
          <div
            class="p-6 rounded-xl border"
            [class]="themeService.dark()
              ? 'bg-gray-900 border-gray-800'
              : 'bg-white border-gray-200'"
          >
            <p
              class="text-sm mb-1"
              [class]="themeService.dark() ? 'text-gray-400' : 'text-gray-500'"
            >
              Unread Messages
            </p>
            <p
              class="text-3xl font-semibold"
              [class]="themeService.dark() ? 'text-white' : 'text-gray-900'"
            >
              {{ unreadCount() }}
            </p>
          </div>
        </div>

        <!-- Navigation Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a
            routerLink="/admin/products"
            class="p-6 rounded-xl border transition-colors"
            [class]="themeService.dark()
              ? 'bg-gray-900 border-gray-800 hover:border-gray-700'
              : 'bg-white border-gray-200 hover:border-gray-300'"
          >
            <h2
              class="text-lg font-medium mb-2"
              [class]="themeService.dark() ? 'text-white' : 'text-gray-900'"
            >
              Manage Products
            </h2>
            <p
              class="text-sm"
              [class]="themeService.dark() ? 'text-gray-400' : 'text-gray-500'"
            >
              Create, edit, and delete products
            </p>
          </a>
          <a
            routerLink="/admin/essays"
            class="p-6 rounded-xl border transition-colors"
            [class]="themeService.dark()
              ? 'bg-gray-900 border-gray-800 hover:border-gray-700'
              : 'bg-white border-gray-200 hover:border-gray-300'"
          >
            <h2
              class="text-lg font-medium mb-2"
              [class]="themeService.dark() ? 'text-white' : 'text-gray-900'"
            >
              Manage Essays
            </h2>
            <p
              class="text-sm"
              [class]="themeService.dark() ? 'text-gray-400' : 'text-gray-500'"
            >
              Create, edit, and delete essays
            </p>
          </a>
          <a
            routerLink="/admin/messages"
            class="p-6 rounded-xl border transition-colors"
            [class]="themeService.dark()
              ? 'bg-gray-900 border-gray-800 hover:border-gray-700'
              : 'bg-white border-gray-200 hover:border-gray-300'"
          >
            <h2
              class="text-lg font-medium mb-2"
              [class]="themeService.dark() ? 'text-white' : 'text-gray-900'"
            >
              View Messages
            </h2>
            <p
              class="text-sm"
              [class]="themeService.dark() ? 'text-gray-400' : 'text-gray-500'"
            >
              Read contact form submissions
            </p>
          </a>
        </div>
      </main>
    </div>
  `,
})
export class DashboardComponent implements OnInit {
  themeService = inject(ThemeService);
  private authService = inject(AuthService);
  private adminService = inject(AdminService);
  private router = inject(Router);

  productCount = signal(0);
  essayCount = signal(0);
  unreadCount = signal(0);

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.adminService.getProducts().subscribe({
      next: (products) => this.productCount.set(products.length),
    });
    this.adminService.getEssays().subscribe({
      next: (essays) => this.essayCount.set(essays.length),
    });
    this.adminService.getMessages().subscribe({
      next: (messages) =>
        this.unreadCount.set(messages.filter((m) => !m.read).length),
    });
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/admin/login']);
    });
  }
}
