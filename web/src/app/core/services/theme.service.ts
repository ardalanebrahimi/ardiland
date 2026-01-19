import { Injectable, signal, computed, effect } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly _dark = signal(false);

  readonly dark = computed(() => this._dark());

  constructor() {
    // Check system preference on init
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
      this._dark.set(savedTheme === 'dark');
    } else {
      this._dark.set(prefersDark);
    }

    // Apply theme class to document
    effect(() => {
      const isDark = this._dark();
      document.documentElement.classList.toggle('dark', isDark);
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this._dark.set(e.matches);
      }
    });
  }

  toggle(): void {
    this._dark.update((v) => !v);
  }

  setDark(dark: boolean): void {
    this._dark.set(dark);
  }
}
