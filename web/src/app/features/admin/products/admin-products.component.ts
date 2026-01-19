import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service';
import { AdminService, Product } from '../../../core/services/admin.service';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div
      class="min-h-screen"
      [class]="themeService.dark() ? 'bg-gray-950' : 'bg-gray-50'"
    >
      <!-- Header -->
      <header
        class="border-b"
        [class]="themeService.dark()
          ? 'bg-gray-900 border-gray-800'
          : 'bg-white border-gray-200'"
      >
        <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div class="flex items-center gap-4">
            <a
              routerLink="/admin"
              class="text-sm"
              [class]="themeService.dark()
                ? 'text-gray-400 hover:text-white'
                : 'text-gray-500 hover:text-gray-900'"
            >
              &larr; Back
            </a>
            <h1
              class="text-xl font-semibold"
              [class]="themeService.dark() ? 'text-white' : 'text-gray-900'"
            >
              Products
            </h1>
          </div>
          <button
            (click)="openCreate()"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            [class]="themeService.dark()
              ? 'bg-white text-gray-900 hover:bg-gray-100'
              : 'bg-gray-900 text-white hover:bg-gray-800'"
          >
            Add Product
          </button>
        </div>
      </header>

      <!-- Content -->
      <main class="max-w-6xl mx-auto px-6 py-8">
        @if (loading()) {
          <p [class]="themeService.dark() ? 'text-gray-400' : 'text-gray-500'">
            Loading...
          </p>
        } @else {
          <div class="space-y-4">
            @for (product of products(); track product.id) {
              <div
                class="p-4 rounded-xl border flex items-center justify-between"
                [class]="themeService.dark()
                  ? 'bg-gray-900 border-gray-800'
                  : 'bg-white border-gray-200'"
              >
                <div class="flex items-center gap-4">
                  @if (product.iconInitials) {
                    <div
                      class="w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                      [style.background-color]="product.iconColor || '#6366f1'"
                    >
                      {{ product.iconInitials }}
                    </div>
                  }
                  <div>
                    <h3
                      class="font-medium"
                      [class]="themeService.dark() ? 'text-white' : 'text-gray-900'"
                    >
                      {{ product.name }}
                    </h3>
                    <p
                      class="text-sm"
                      [class]="themeService.dark() ? 'text-gray-400' : 'text-gray-500'"
                    >
                      {{ product.status }} &middot; {{ product.slug }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <button
                    (click)="openEdit(product)"
                    class="px-3 py-1.5 rounded-lg text-sm transition-colors"
                    [class]="themeService.dark()
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
                  >
                    Edit
                  </button>
                  <button
                    (click)="deleteProduct(product.id)"
                    class="px-3 py-1.5 rounded-lg text-sm text-red-600 transition-colors"
                    [class]="themeService.dark()
                      ? 'bg-red-900/20 hover:bg-red-900/40'
                      : 'bg-red-50 hover:bg-red-100'"
                  >
                    Delete
                  </button>
                </div>
              </div>
            } @empty {
              <p [class]="themeService.dark() ? 'text-gray-400' : 'text-gray-500'">
                No products yet.
              </p>
            }
          </div>
        }
      </main>

      <!-- Modal -->
      @if (showModal()) {
        <div
          class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          (click)="closeModal()"
        >
          <div
            class="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl p-6"
            [class]="themeService.dark() ? 'bg-gray-900' : 'bg-white'"
            (click)="$event.stopPropagation()"
          >
            <h2
              class="text-lg font-semibold mb-4"
              [class]="themeService.dark() ? 'text-white' : 'text-gray-900'"
            >
              {{ editingProduct() ? 'Edit Product' : 'Create Product' }}
            </h2>

            <form (ngSubmit)="saveProduct()" class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium mb-1"
                    [class]="themeService.dark() ? 'text-gray-300' : 'text-gray-700'">
                    Name *
                  </label>
                  <input
                    type="text"
                    [(ngModel)]="form.name"
                    name="name"
                    class="w-full px-3 py-2 rounded-lg border"
                    [class]="themeService.dark()
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'"
                    required
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1"
                    [class]="themeService.dark() ? 'text-gray-300' : 'text-gray-700'">
                    Slug
                  </label>
                  <input
                    type="text"
                    [(ngModel)]="form.slug"
                    name="slug"
                    class="w-full px-3 py-2 rounded-lg border"
                    [class]="themeService.dark()
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium mb-1"
                  [class]="themeService.dark() ? 'text-gray-300' : 'text-gray-700'">
                  Description *
                </label>
                <textarea
                  [(ngModel)]="form.description"
                  name="description"
                  rows="2"
                  class="w-full px-3 py-2 rounded-lg border"
                  [class]="themeService.dark()
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-300 text-gray-900'"
                  required
                ></textarea>
              </div>

              <div class="grid grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-medium mb-1"
                    [class]="themeService.dark() ? 'text-gray-300' : 'text-gray-700'">
                    Status
                  </label>
                  <select
                    [(ngModel)]="form.status"
                    name="status"
                    class="w-full px-3 py-2 rounded-lg border"
                    [class]="themeService.dark()
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'"
                  >
                    <option value="experiment">Experiment</option>
                    <option value="in-progress">In Progress</option>
                    <option value="beta">Beta</option>
                    <option value="live">Live</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1"
                    [class]="themeService.dark() ? 'text-gray-300' : 'text-gray-700'">
                    Icon Initials
                  </label>
                  <input
                    type="text"
                    [(ngModel)]="form.iconInitials"
                    name="iconInitials"
                    maxlength="2"
                    class="w-full px-3 py-2 rounded-lg border"
                    [class]="themeService.dark()
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1"
                    [class]="themeService.dark() ? 'text-gray-300' : 'text-gray-700'">
                    Icon Color
                  </label>
                  <input
                    type="color"
                    [(ngModel)]="form.iconColor"
                    name="iconColor"
                    class="w-full h-10 rounded-lg border cursor-pointer"
                    [class]="themeService.dark()
                      ? 'bg-gray-800 border-gray-700'
                      : 'bg-white border-gray-300'"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium mb-1"
                  [class]="themeService.dark() ? 'text-gray-300' : 'text-gray-700'">
                  Why (motivation)
                </label>
                <textarea
                  [(ngModel)]="form.why"
                  name="why"
                  rows="2"
                  class="w-full px-3 py-2 rounded-lg border"
                  [class]="themeService.dark()
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-300 text-gray-900'"
                ></textarea>
              </div>

              <div>
                <label class="block text-sm font-medium mb-1"
                  [class]="themeService.dark() ? 'text-gray-300' : 'text-gray-700'">
                  Problem
                </label>
                <textarea
                  [(ngModel)]="form.problem"
                  name="problem"
                  rows="2"
                  class="w-full px-3 py-2 rounded-lg border"
                  [class]="themeService.dark()
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-300 text-gray-900'"
                ></textarea>
              </div>

              <div>
                <label class="block text-sm font-medium mb-1"
                  [class]="themeService.dark() ? 'text-gray-300' : 'text-gray-700'">
                  Current State
                </label>
                <textarea
                  [(ngModel)]="form.currentState"
                  name="currentState"
                  rows="2"
                  class="w-full px-3 py-2 rounded-lg border"
                  [class]="themeService.dark()
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-300 text-gray-900'"
                ></textarea>
              </div>

              <div>
                <label class="block text-sm font-medium mb-1"
                  [class]="themeService.dark() ? 'text-gray-300' : 'text-gray-700'">
                  Next Steps
                </label>
                <textarea
                  [(ngModel)]="form.next"
                  name="next"
                  rows="2"
                  class="w-full px-3 py-2 rounded-lg border"
                  [class]="themeService.dark()
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-300 text-gray-900'"
                ></textarea>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium mb-1"
                    [class]="themeService.dark() ? 'text-gray-300' : 'text-gray-700'">
                    CTA Label
                  </label>
                  <input
                    type="text"
                    [(ngModel)]="form.ctaLabel"
                    name="ctaLabel"
                    class="w-full px-3 py-2 rounded-lg border"
                    [class]="themeService.dark()
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1"
                    [class]="themeService.dark() ? 'text-gray-300' : 'text-gray-700'">
                    CTA URL
                  </label>
                  <input
                    type="text"
                    [(ngModel)]="form.ctaUrl"
                    name="ctaUrl"
                    class="w-full px-3 py-2 rounded-lg border"
                    [class]="themeService.dark()
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'"
                  />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium mb-1"
                    [class]="themeService.dark() ? 'text-gray-300' : 'text-gray-700'">
                    GitHub URL
                  </label>
                  <input
                    type="text"
                    [(ngModel)]="form.githubUrl"
                    name="githubUrl"
                    class="w-full px-3 py-2 rounded-lg border"
                    [class]="themeService.dark()
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1"
                    [class]="themeService.dark() ? 'text-gray-300' : 'text-gray-700'">
                    Demo URL
                  </label>
                  <input
                    type="text"
                    [(ngModel)]="form.demoUrl"
                    name="demoUrl"
                    class="w-full px-3 py-2 rounded-lg border"
                    [class]="themeService.dark()
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'"
                  />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium mb-1"
                    [class]="themeService.dark() ? 'text-gray-300' : 'text-gray-700'">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    [(ngModel)]="form.sortOrder"
                    name="sortOrder"
                    class="w-full px-3 py-2 rounded-lg border"
                    [class]="themeService.dark()
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'"
                  />
                </div>
                <div class="flex items-center">
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      [(ngModel)]="form.featured"
                      name="featured"
                      class="w-4 h-4"
                    />
                    <span
                      [class]="themeService.dark() ? 'text-gray-300' : 'text-gray-700'"
                    >
                      Featured
                    </span>
                  </label>
                </div>
              </div>

              <div class="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  (click)="closeModal()"
                  class="px-4 py-2 rounded-lg text-sm transition-colors"
                  [class]="themeService.dark()
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  [disabled]="saving()"
                  class="px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                  [class]="themeService.dark()
                    ? 'bg-white text-gray-900 hover:bg-gray-100'
                    : 'bg-gray-900 text-white hover:bg-gray-800'"
                >
                  {{ saving() ? 'Saving...' : 'Save' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      }
    </div>
  `,
})
export class AdminProductsComponent implements OnInit {
  themeService = inject(ThemeService);
  private adminService = inject(AdminService);

  products = signal<Product[]>([]);
  loading = signal(true);
  showModal = signal(false);
  editingProduct = signal<Product | null>(null);
  saving = signal(false);

  form = {
    name: '',
    slug: '',
    description: '',
    status: 'experiment',
    why: '',
    problem: '',
    currentState: '',
    next: '',
    ctaLabel: '',
    ctaUrl: '',
    githubUrl: '',
    demoUrl: '',
    iconInitials: '',
    iconColor: '#6366f1',
    sortOrder: 0,
    featured: false,
  };

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading.set(true);
    this.adminService.getProducts().subscribe({
      next: (products) => {
        this.products.set(products);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  openCreate(): void {
    this.resetForm();
    this.editingProduct.set(null);
    this.showModal.set(true);
  }

  openEdit(product: Product): void {
    this.editingProduct.set(product);
    this.form = {
      name: product.name,
      slug: product.slug,
      description: product.description,
      status: product.status,
      why: product.why || '',
      problem: product.problem || '',
      currentState: product.currentState || '',
      next: product.next || '',
      ctaLabel: product.ctaLabel || '',
      ctaUrl: product.ctaUrl || '',
      githubUrl: product.githubUrl || '',
      demoUrl: product.demoUrl || '',
      iconInitials: product.iconInitials || '',
      iconColor: product.iconColor || '#6366f1',
      sortOrder: product.sortOrder,
      featured: product.featured,
    };
    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
    this.editingProduct.set(null);
    this.resetForm();
  }

  resetForm(): void {
    this.form = {
      name: '',
      slug: '',
      description: '',
      status: 'experiment',
      why: '',
      problem: '',
      currentState: '',
      next: '',
      ctaLabel: '',
      ctaUrl: '',
      githubUrl: '',
      demoUrl: '',
      iconInitials: '',
      iconColor: '#6366f1',
      sortOrder: 0,
      featured: false,
    };
  }

  saveProduct(): void {
    if (!this.form.name || !this.form.description) return;

    this.saving.set(true);
    const editing = this.editingProduct();

    const data = { ...this.form };

    if (editing) {
      this.adminService.updateProduct(editing.id, data).subscribe({
        next: () => {
          this.saving.set(false);
          this.closeModal();
          this.loadProducts();
        },
        error: () => {
          this.saving.set(false);
        },
      });
    } else {
      this.adminService.createProduct(data).subscribe({
        next: () => {
          this.saving.set(false);
          this.closeModal();
          this.loadProducts();
        },
        error: () => {
          this.saving.set(false);
        },
      });
    }
  }

  deleteProduct(id: string): void {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.adminService.deleteProduct(id).subscribe({
      next: () => this.loadProducts(),
    });
  }
}
