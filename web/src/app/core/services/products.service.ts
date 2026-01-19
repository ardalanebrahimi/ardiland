import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export type ProductStatus = 'live' | 'beta' | 'in-progress' | 'experiment';

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  status: ProductStatus;
  why: string;
  problem: string;
  currentState: string;
  next: string;
  ctaLabel?: string;
  ctaUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  featured: boolean;
  sortOrder: number;
  iconInitials?: string;
  iconColor?: string;
  image?: string;
  screenshots?: string;
  techStack?: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly apiUrl = `${environment.apiUrl}/api/products`;

  // Signals for state management
  private readonly _products = signal<Product[]>([]);
  private readonly _featuredProducts = signal<Product[]>([]);
  private readonly _selectedProduct = signal<Product | null>(null);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  // Public readonly computed signals
  readonly products = computed(() => this._products());
  readonly featuredProducts = computed(() => this._featuredProducts());
  readonly selectedProduct = computed(() => this._selectedProduct());
  readonly loading = computed(() => this._loading());
  readonly error = computed(() => this._error());

  constructor(private http: HttpClient) {}

  async loadProducts(): Promise<void> {
    this._loading.set(true);
    this._error.set(null);

    try {
      const response = await this.http
        .get<ApiResponse<Product[]>>(this.apiUrl)
        .toPromise();

      if (response?.success) {
        this._products.set(response.data);
      }
    } catch (err) {
      this._error.set('Failed to load products');
      console.error('Error loading products:', err);
    } finally {
      this._loading.set(false);
    }
  }

  async loadFeaturedProducts(): Promise<void> {
    this._loading.set(true);
    this._error.set(null);

    try {
      const response = await this.http
        .get<ApiResponse<Product[]>>(`${this.apiUrl}/featured`)
        .toPromise();

      if (response?.success) {
        this._featuredProducts.set(response.data);
      }
    } catch (err) {
      this._error.set('Failed to load featured products');
      console.error('Error loading featured products:', err);
    } finally {
      this._loading.set(false);
    }
  }

  async loadProductBySlug(slug: string): Promise<void> {
    this._loading.set(true);
    this._error.set(null);

    try {
      const response = await this.http
        .get<ApiResponse<Product>>(`${this.apiUrl}/${slug}`)
        .toPromise();

      if (response?.success) {
        this._selectedProduct.set(response.data);
      }
    } catch (err) {
      this._error.set('Failed to load product');
      console.error('Error loading product:', err);
    } finally {
      this._loading.set(false);
    }
  }

  clearSelectedProduct(): void {
    this._selectedProduct.set(null);
  }
}
