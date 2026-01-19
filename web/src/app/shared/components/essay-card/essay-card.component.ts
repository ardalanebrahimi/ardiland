import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service';
import type { Essay } from '../../../core/services/essays.service';

@Component({
  selector: 'app-essay-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <a
      [routerLink]="['/essays', essay.slug]"
      class="block text-left py-6 border-b -mx-4 px-4 transition-colors group"
      [class]="themeService.dark()
        ? 'border-gray-800 hover:bg-gray-900'
        : 'border-gray-100 hover:bg-gray-50'"
    >
      <h3
        class="font-medium mb-2"
        [class]="themeService.dark()
          ? 'text-white group-hover:text-gray-200'
          : 'text-gray-900 group-hover:text-gray-700'"
      >
        {{ essay.title }}
      </h3>
      <p
        class="text-sm"
        [class]="themeService.dark() ? 'text-gray-400' : 'text-gray-500'"
      >
        {{ essay.summary }}
      </p>
    </a>
  `,
})
export class EssayCardComponent {
  themeService = inject(ThemeService);
  @Input({ required: true }) essay!: Essay;
}
