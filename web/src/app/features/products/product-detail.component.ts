import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { ThemeService } from '../../core/services/theme.service';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';
import { ProductIconComponent } from '../../shared/components/product-icon/product-icon.component';
import { ImageSliderComponent } from '../../shared/components/image-slider/image-slider.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, StatusBadgeComponent, ProductIconComponent, ImageSliderComponent],
  template: `
    <div
      class="pt-24 pb-16 min-h-screen"
      [class]="themeService.dark() ? 'bg-gray-950' : 'bg-white'"
    >
      <section class="max-w-3xl mx-auto px-6 py-16">
        <a
          routerLink="/products"
          class="text-sm mb-8 flex items-center gap-1"
          [class]="themeService.dark()
            ? 'text-gray-400 hover:text-white'
            : 'text-gray-500 hover:text-gray-700'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to products
        </a>

        @if (productsService.loading()) {
          <div class="animate-pulse">
            <div
              class="h-8 rounded w-1/3 mb-4"
              [class]="themeService.dark() ? 'bg-gray-800' : 'bg-gray-200'"
            ></div>
            <div
              class="h-4 rounded w-2/3 mb-8"
              [class]="themeService.dark() ? 'bg-gray-800' : 'bg-gray-200'"
            ></div>
          </div>
        } @else if (productsService.selectedProduct(); as product) {
          <!-- Header with Icon -->
          <div class="flex items-start gap-4 mb-6">
            @if (product.iconInitials) {
              <app-product-icon
                [initials]="product.iconInitials"
                [iconColor]="product.iconColor"
                size="lg"
              />
            }
            <div class="flex-1">
              <div class="flex items-start gap-3 mb-2">
                <h1
                  class="text-3xl font-medium"
                  [class]="themeService.dark() ? 'text-white' : 'text-gray-900'"
                >
                  {{ product.name }}
                </h1>
                <app-status-badge [status]="product.status" />
              </div>
              <p
                class="text-lg"
                [class]="themeService.dark() ? 'text-gray-400' : 'text-gray-600'"
              >
                {{ product.description }}
              </p>
            </div>
          </div>

          <!-- Tech Stack -->
          @if (getTechStack(product.techStack); as techStack) {
            @if (techStack.length > 0) {
              <div class="flex flex-wrap gap-2 mb-8">
                @for (tech of techStack; track tech) {
                  <span
                    class="text-xs px-2.5 py-1 rounded-full"
                    [class]="themeService.dark()
                      ? 'bg-gray-800 text-gray-300'
                      : 'bg-gray-100 text-gray-600'"
                  >
                    {{ tech }}
                  </span>
                }
              </div>
            }
          }

          <!-- Screenshots -->
          @if (product.screenshots) {
            <div class="mb-10">
              <app-image-slider [screenshots]="product.screenshots" />
            </div>
          }

          <div class="space-y-8">
            @if (product.why) {
              <div>
                <h2
                  class="text-sm uppercase tracking-wide mb-2"
                  [class]="themeService.dark() ? 'text-gray-500' : 'text-gray-500'"
                >
                  Why it exists
                </h2>
                <p [class]="themeService.dark() ? 'text-gray-300' : 'text-gray-700'">
                  {{ product.why }}
                </p>
              </div>
            }
            @if (product.problem) {
              <div>
                <h2
                  class="text-sm uppercase tracking-wide mb-2"
                  [class]="themeService.dark() ? 'text-gray-500' : 'text-gray-500'"
                >
                  The problem
                </h2>
                <p [class]="themeService.dark() ? 'text-gray-300' : 'text-gray-700'">
                  {{ product.problem }}
                </p>
              </div>
            }
            @if (product.currentState) {
              <div>
                <h2
                  class="text-sm uppercase tracking-wide mb-2"
                  [class]="themeService.dark() ? 'text-gray-500' : 'text-gray-500'"
                >
                  Current state
                </h2>
                <p [class]="themeService.dark() ? 'text-gray-300' : 'text-gray-700'">
                  {{ product.currentState }}
                </p>
              </div>
            }
            @if (product.next) {
              <div>
                <h2
                  class="text-sm uppercase tracking-wide mb-2"
                  [class]="themeService.dark() ? 'text-gray-500' : 'text-gray-500'"
                >
                  What's next
                </h2>
                <p [class]="themeService.dark() ? 'text-gray-300' : 'text-gray-700'">
                  {{ product.next }}
                </p>
              </div>
            }
          </div>

          <div
            class="flex flex-wrap gap-4 mt-12 pt-8 border-t"
            [class]="themeService.dark() ? 'border-gray-800' : 'border-gray-100'"
          >
            @if (product.ctaLabel && product.ctaUrl) {
              <a
                [href]="product.ctaUrl"
                target="_blank"
                rel="noopener"
                class="px-6 py-3 rounded-full transition-colors flex items-center gap-2"
                [class]="themeService.dark()
                  ? 'bg-white text-gray-900 hover:bg-gray-100'
                  : 'bg-gray-900 text-white hover:bg-gray-800'"
              >
                {{ product.ctaLabel }}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            }
            @if (product.demoUrl) {
              <a
                [href]="product.demoUrl"
                target="_blank"
                rel="noopener"
                class="border px-6 py-3 rounded-full transition-colors flex items-center gap-2"
                [class]="themeService.dark()
                  ? 'border-gray-700 text-gray-300 hover:border-gray-600'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Live demo
              </a>
            }
            @if (product.githubUrl) {
              <a
                [href]="product.githubUrl"
                target="_blank"
                rel="noopener"
                class="border px-6 py-3 rounded-full transition-colors flex items-center gap-2"
                [class]="themeService.dark()
                  ? 'border-gray-700 text-gray-300 hover:border-gray-600'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
                View source
              </a>
            }
          </div>
        }
      </section>
    </div>
  `,
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  productsService = inject(ProductsService);
  themeService = inject(ThemeService);

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.productsService.loadProductBySlug(slug);
    }
  }

  ngOnDestroy(): void {
    this.productsService.clearSelectedProduct();
  }

  getTechStack(techStack: string | undefined): string[] {
    if (!techStack) return [];
    try {
      const parsed = JSON.parse(techStack);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
}

export default ProductDetailComponent;
