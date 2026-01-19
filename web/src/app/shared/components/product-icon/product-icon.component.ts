import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-product-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="flex items-center justify-center font-bold text-white"
      [class]="sizeClasses"
      [style.background-color]="iconColor || defaultColor"
    >
      {{ initials || '?' }}
    </div>
  `,
})
export class ProductIconComponent {
  themeService = inject(ThemeService);

  @Input() initials?: string;
  @Input() iconColor?: string;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  readonly defaultColor = '#6366f1';

  get sizeClasses(): string {
    switch (this.size) {
      case 'sm':
        return 'w-8 h-8 rounded-lg text-xs';
      case 'md':
        return 'w-12 h-12 rounded-xl text-sm';
      case 'lg':
        return 'w-16 h-16 rounded-xl text-lg';
      default:
        return 'w-12 h-12 rounded-xl text-sm';
    }
  }
}
