import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service';
import { AdminService, Essay } from '../../../core/services/admin.service';

@Component({
  selector: 'app-admin-essays',
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
              Essays
            </h1>
          </div>
          <button
            (click)="openCreate()"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            [class]="themeService.dark()
              ? 'bg-white text-gray-900 hover:bg-gray-100'
              : 'bg-gray-900 text-white hover:bg-gray-800'"
          >
            Add Essay
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
            @for (essay of essays(); track essay.id) {
              <div
                class="p-4 rounded-xl border flex items-center justify-between"
                [class]="themeService.dark()
                  ? 'bg-gray-900 border-gray-800'
                  : 'bg-white border-gray-200'"
              >
                <div>
                  <h3
                    class="font-medium"
                    [class]="themeService.dark() ? 'text-white' : 'text-gray-900'"
                  >
                    {{ essay.title }}
                  </h3>
                  <p
                    class="text-sm"
                    [class]="themeService.dark() ? 'text-gray-400' : 'text-gray-500'"
                  >
                    {{ essay.slug }}
                    @if (essay.featured) {
                      &middot; <span class="text-amber-500">Featured</span>
                    }
                  </p>
                </div>
                <div class="flex items-center gap-2">
                  <button
                    (click)="openEdit(essay)"
                    class="px-3 py-1.5 rounded-lg text-sm transition-colors"
                    [class]="themeService.dark()
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
                  >
                    Edit
                  </button>
                  <button
                    (click)="deleteEssay(essay.id)"
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
                No essays yet.
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
              {{ editingEssay() ? 'Edit Essay' : 'Create Essay' }}
            </h2>

            <form (ngSubmit)="saveEssay()" class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium mb-1"
                    [class]="themeService.dark() ? 'text-gray-300' : 'text-gray-700'">
                    Title *
                  </label>
                  <input
                    type="text"
                    [(ngModel)]="form.title"
                    name="title"
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
                  Summary *
                </label>
                <textarea
                  [(ngModel)]="form.summary"
                  name="summary"
                  rows="2"
                  class="w-full px-3 py-2 rounded-lg border"
                  [class]="themeService.dark()
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-300 text-gray-900'"
                  required
                ></textarea>
              </div>

              <div>
                <label class="block text-sm font-medium mb-1"
                  [class]="themeService.dark() ? 'text-gray-300' : 'text-gray-700'">
                  Content * (Markdown supported)
                </label>
                <textarea
                  [(ngModel)]="form.content"
                  name="content"
                  rows="12"
                  class="w-full px-3 py-2 rounded-lg border font-mono text-sm"
                  [class]="themeService.dark()
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-300 text-gray-900'"
                  required
                ></textarea>
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
export class AdminEssaysComponent implements OnInit {
  themeService = inject(ThemeService);
  private adminService = inject(AdminService);

  essays = signal<Essay[]>([]);
  loading = signal(true);
  showModal = signal(false);
  editingEssay = signal<Essay | null>(null);
  saving = signal(false);

  form = {
    title: '',
    slug: '',
    summary: '',
    content: '',
    sortOrder: 0,
    featured: false,
  };

  ngOnInit(): void {
    this.loadEssays();
  }

  loadEssays(): void {
    this.loading.set(true);
    this.adminService.getEssays().subscribe({
      next: (essays) => {
        this.essays.set(essays);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  openCreate(): void {
    this.resetForm();
    this.editingEssay.set(null);
    this.showModal.set(true);
  }

  openEdit(essay: Essay): void {
    this.editingEssay.set(essay);
    this.form = {
      title: essay.title,
      slug: essay.slug,
      summary: essay.summary,
      content: essay.content,
      sortOrder: essay.sortOrder,
      featured: essay.featured,
    };
    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
    this.editingEssay.set(null);
    this.resetForm();
  }

  resetForm(): void {
    this.form = {
      title: '',
      slug: '',
      summary: '',
      content: '',
      sortOrder: 0,
      featured: false,
    };
  }

  saveEssay(): void {
    if (!this.form.title || !this.form.summary || !this.form.content) return;

    this.saving.set(true);
    const editing = this.editingEssay();

    if (editing) {
      this.adminService.updateEssay(editing.id, this.form).subscribe({
        next: () => {
          this.saving.set(false);
          this.closeModal();
          this.loadEssays();
        },
        error: () => {
          this.saving.set(false);
        },
      });
    } else {
      this.adminService.createEssay(this.form).subscribe({
        next: () => {
          this.saving.set(false);
          this.closeModal();
          this.loadEssays();
        },
        error: () => {
          this.saving.set(false);
        },
      });
    }
  }

  deleteEssay(id: string): void {
    if (!confirm('Are you sure you want to delete this essay?')) return;

    this.adminService.deleteEssay(id).subscribe({
      next: () => this.loadEssays(),
    });
  }
}
