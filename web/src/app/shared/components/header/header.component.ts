import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav
      class="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-sm"
      [class]="
        themeService.dark()
          ? 'bg-gray-900/95 border-gray-800'
          : 'bg-white/95 border-gray-100'
      "
    >
      <div
        class="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between"
      >
        <a routerLink="/" class="flex items-center">
          <img
            [src]="
              themeService.dark()
                ? 'ardiland-logo-w-f-t.png'
                : 'ardiland-logo-b-f-t.png'
            "
            alt="Ardiland Studio"
            class="h-14"
          />
        </a>

        <!-- Desktop Nav -->
        <div class="hidden md:flex items-center gap-6">
          @for (link of links; track link.path) {
            <a
              [routerLink]="link.path"
              routerLinkActive="active-link"
              [routerLinkActiveOptions]="{ exact: link.path === '/' }"
              class="text-sm transition-colors"
              [class]="
                themeService.dark()
                  ? 'text-gray-400 hover:text-white'
                  : 'text-gray-500 hover:text-gray-900'
              "
            >
              {{ link.label }}
            </a>
          }
          <!-- Theme Toggle -->
          <button
            (click)="themeService.toggle()"
            class="p-2 rounded-full transition-colors"
            [class]="
              themeService.dark() ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
            "
            [attr.aria-label]="
              themeService.dark()
                ? 'Switch to light mode'
                : 'Switch to dark mode'
            "
          >
            @if (themeService.dark()) {
              <!-- Sun icon -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-[18px] w-[18px] text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            } @else {
              <!-- Moon icon -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-[18px] w-[18px] text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            }
          </button>
        </div>

        <!-- Mobile Controls -->
        <div class="flex md:hidden items-center gap-2">
          <button
            (click)="themeService.toggle()"
            class="p-2"
            [attr.aria-label]="
              themeService.dark()
                ? 'Switch to light mode'
                : 'Switch to dark mode'
            "
          >
            @if (themeService.dark()) {
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-[18px] w-[18px] text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            } @else {
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-[18px] w-[18px] text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            }
          </button>
          <button
            class="p-2"
            (click)="toggleMobile()"
            [attr.aria-label]="mobileOpen() ? 'Close menu' : 'Open menu'"
          >
            @if (mobileOpen()) {
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                [class]="themeService.dark() ? 'text-white' : ''"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            } @else {
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                [class]="themeService.dark() ? 'text-white' : ''"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            }
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      @if (mobileOpen()) {
        <div
          class="md:hidden border-b px-6 py-4"
          [class]="
            themeService.dark()
              ? 'bg-gray-900 border-gray-800'
              : 'bg-white border-gray-100'
          "
        >
          @for (link of links; track link.path) {
            <a
              [routerLink]="link.path"
              (click)="closeMobile()"
              class="block w-full text-left py-2"
              [class]="
                themeService.dark()
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
              "
            >
              {{ link.label }}
            </a>
          }
        </div>
      }
    </nav>
  `,
  styles: [
    `
      .active-link {
        color: var(--active-color, #111827);
      }
      :host-context(.dark) .active-link {
        color: #fff;
      }
    `,
  ],
})
export class HeaderComponent {
  themeService = inject(ThemeService);
  mobileOpen = signal(false);

  // "Thinking" renamed to "Essays", "Let's talk" is now a regular link
  links = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Products' },
    { path: '/essays', label: 'Essays' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: "Let's talk" },
  ];

  toggleMobile(): void {
    this.mobileOpen.update((v) => !v);
  }

  closeMobile(): void {
    this.mobileOpen.set(false);
  }
}
