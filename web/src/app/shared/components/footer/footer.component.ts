import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer
      class="border-t py-8"
      [class]="themeService.dark()
        ? 'border-gray-800 bg-gray-950'
        : 'border-gray-100 bg-white'"
    >
      <div
        class="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm"
        [class]="themeService.dark() ? 'text-gray-500' : 'text-gray-500'"
      >
        <p>&copy; {{ currentYear }} Ardiland. Building in the open.</p>
        <div class="flex gap-6">
          <a
            href="https://github.com/ardiland"
            target="_blank"
            rel="noopener"
            [class]="themeService.dark() ? 'hover:text-gray-300' : 'hover:text-gray-700'"
          >
            GitHub
          </a>
          <a
            href="https://youtube.com/@ardiland"
            target="_blank"
            rel="noopener"
            [class]="themeService.dark() ? 'hover:text-gray-300' : 'hover:text-gray-700'"
          >
            YouTube
          </a>
          <a
            href="https://linkedin.com/company/ardiland"
            target="_blank"
            rel="noopener"
            [class]="themeService.dark() ? 'hover:text-gray-300' : 'hover:text-gray-700'"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  themeService = inject(ThemeService);
  currentYear = new Date().getFullYear();
}
