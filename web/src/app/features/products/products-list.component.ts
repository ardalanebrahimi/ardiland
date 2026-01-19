import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../core/services/products.service';
import { ThemeService } from '../../core/services/theme.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  template: `
    <div
      class="pt-24 pb-16 min-h-screen"
      [class]="themeService.dark() ? 'bg-gray-950' : 'bg-white'"
    >
      <section class="max-w-5xl mx-auto px-6 py-16">
        <h1
          class="text-3xl font-medium mb-4"
          [class]="themeService.dark() ? 'text-white' : 'text-gray-900'"
        >
          Products
        </h1>
        <p
          class="max-w-2xl mb-12"
          [class]="themeService.dark() ? 'text-gray-400' : 'text-gray-600'"
        >
          Real products at different stages. Some are live, some in testing, some still taking shape. All are built with intent.
        </p>
        <div class="grid md:grid-cols-2 gap-4">
          @for (product of productsService.products(); track product.id) {
            <app-product-card [product]="product" />
          }
        </div>
      </section>
    </div>
  `,
})
export class ProductsListComponent implements OnInit {
  productsService = inject(ProductsService);
  themeService = inject(ThemeService);

  ngOnInit(): void {
    this.productsService.loadProducts();
  }
}

export default ProductsListComponent;
