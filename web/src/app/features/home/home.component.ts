import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { EssaysService } from '../../core/services/essays.service';
import { ThemeService } from '../../core/services/theme.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { EssayCardComponent } from '../../shared/components/essay-card/essay-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCardComponent, EssayCardComponent],
  template: `
    <div
      class="pt-24 pb-16 min-h-screen"
      [class]="themeService.dark() ? 'bg-gray-950' : 'bg-white'"
    >
      <!-- Hero -->
      <section class="max-w-5xl mx-auto px-6 py-20">
        <h1
          class="text-4xl md:text-5xl font-medium leading-tight mb-6 max-w-3xl"
          [class]="themeService.dark() ? 'text-white' : 'text-gray-900'"
        >
          Building systems and products — and the practices that enable others to build.
        </h1>
        <p
          class="text-lg max-w-2xl mb-8"
          [class]="themeService.dark() ? 'text-gray-400' : 'text-gray-600'"
        >
          Ardiland is an engineering studio that ships real products, designs serious systems, and shares what we learn along the way.
        </p>
        <div class="flex flex-wrap gap-4">
          <a
            routerLink="/contact"
            class="px-6 py-3 rounded-full flex items-center gap-2 transition-colors"
            [class]="themeService.dark()
              ? 'bg-white text-gray-900 hover:bg-gray-100'
              : 'bg-gray-900 text-white hover:bg-gray-800'"
          >
            Let's talk
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
          <a
            routerLink="/products"
            class="px-6 py-3 rounded-full border transition-colors"
            [class]="themeService.dark()
              ? 'border-gray-700 text-gray-300 hover:border-gray-600'
              : 'border-gray-300 text-gray-700 hover:border-gray-400'"
          >
            See what we're building
          </a>
        </div>
      </section>

      <!-- Products Preview -->
      <section class="max-w-5xl mx-auto px-6 py-16">
        <div class="flex items-center justify-between mb-8">
          <h2
            class="text-2xl font-medium"
            [class]="themeService.dark() ? 'text-white' : 'text-gray-900'"
          >
            What we build
          </h2>
          <a
            routerLink="/products"
            class="text-sm flex items-center gap-1"
            [class]="themeService.dark()
              ? 'text-gray-400 hover:text-white'
              : 'text-gray-500 hover:text-gray-700'"
          >
            All products
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
        <div class="grid md:grid-cols-2 gap-4">
          @for (product of productsService.featuredProducts(); track product.id) {
            <app-product-card [product]="product" />
          }
        </div>
      </section>

      <!-- Essays Preview -->
      <section class="max-w-5xl mx-auto px-6 py-16">
        <div class="flex items-center justify-between mb-8">
          <h2
            class="text-2xl font-medium"
            [class]="themeService.dark() ? 'text-white' : 'text-gray-900'"
          >
            How we think
          </h2>
          <a
            routerLink="/essays"
            class="text-sm flex items-center gap-1"
            [class]="themeService.dark()
              ? 'text-gray-400 hover:text-white'
              : 'text-gray-500 hover:text-gray-700'"
          >
            All essays
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
        <div class="max-w-2xl">
          @for (essay of essaysService.featuredEssays(); track essay.id) {
            <app-essay-card [essay]="essay" />
          }
        </div>
      </section>

      <!-- Founder Context -->
      <section class="max-w-5xl mx-auto px-6 py-16">
        <div
          class="rounded-2xl p-8 md:p-12"
          [class]="themeService.dark() ? 'bg-gray-900' : 'bg-gray-50'"
        >
          <p
            class="mb-4 text-sm uppercase tracking-wide"
            [class]="themeService.dark() ? 'text-gray-500' : 'text-gray-600'"
          >
            Behind Ardiland
          </p>
          <p
            class="text-lg max-w-2xl mb-6"
            [class]="themeService.dark() ? 'text-gray-300' : 'text-gray-700'"
          >
            Currently founder-led by Ardalan Ebrahimi, who spends his days as Head of Engineering at KMS Mobility Solutions — and builds Ardiland products in the space between.
          </p>
          <a
            routerLink="/about"
            class="flex items-center gap-1 text-sm"
            [class]="themeService.dark()
              ? 'text-gray-400 hover:text-white'
              : 'text-gray-600 hover:text-gray-900'"
          >
            More about the founder
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  `,
})
export class HomeComponent implements OnInit {
  productsService = inject(ProductsService);
  essaysService = inject(EssaysService);
  themeService = inject(ThemeService);

  ngOnInit(): void {
    this.productsService.loadFeaturedProducts();
    this.essaysService.loadFeaturedEssays();
  }
}

export default HomeComponent;
