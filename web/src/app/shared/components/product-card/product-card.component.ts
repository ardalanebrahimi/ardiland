import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StatusBadgeComponent } from '../status-badge/status-badge.component';
import { ProductIconComponent } from '../product-icon/product-icon.component';
import { ThemeService } from '../../../core/services/theme.service';
import type { Product } from '../../../core/services/products.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink, StatusBadgeComponent, ProductIconComponent],
  template: `
    <a
      [routerLink]="['/products', product.slug]"
      class="block text-left rounded-xl overflow-hidden border transition-all group"
      [class]="themeService.dark()
        ? 'border-gray-800 hover:border-gray-700 bg-gray-900'
        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm bg-white'"
    >
      <!-- Cover Image -->
      @if (product.image) {
        <div class="aspect-video overflow-hidden">
          <img
            [src]="product.image"
            [alt]="product.name"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      }

      <div class="p-6">
        <div class="flex items-start gap-3 mb-3">
          @if (product.iconInitials) {
            <app-product-icon
              [initials]="product.iconInitials"
              [iconColor]="product.iconColor"
              size="sm"
            />
          }
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-2">
              <h3
                class="font-medium truncate"
                [class]="themeService.dark()
                  ? 'text-white group-hover:text-gray-200'
                  : 'text-gray-900 group-hover:text-gray-700'"
              >
                {{ product.name }}
              </h3>
              <app-status-badge [status]="product.status" />
            </div>
          </div>
        </div>
        <p
          class="text-sm mb-4 line-clamp-2"
          [class]="themeService.dark() ? 'text-gray-400' : 'text-gray-600'"
        >
          {{ product.description }}
        </p>
        <span
          class="text-sm flex items-center gap-1"
          [class]="themeService.dark()
            ? 'text-gray-500 group-hover:text-gray-300'
            : 'text-gray-500 group-hover:text-gray-700'"
        >
          Learn more
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </a>
  `,
})
export class ProductCardComponent {
  themeService = inject(ThemeService);
  @Input({ required: true }) product!: Product;
}
