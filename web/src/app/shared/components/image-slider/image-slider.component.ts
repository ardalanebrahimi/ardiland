import { Component, Input, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-image-slider',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (images().length > 0) {
      <div class="relative">
        <!-- Main Image -->
        <div
          class="relative aspect-video rounded-xl overflow-hidden border"
          [class]="themeService.dark() ? 'border-gray-800 bg-gray-800' : 'border-gray-200 bg-gray-100'"
        >
          <img
            [src]="images()[currentIndex()]"
            [alt]="'Screenshot ' + (currentIndex() + 1)"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Navigation Arrows -->
        @if (images().length > 1) {
          <button
            (click)="prev()"
            class="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            [class]="themeService.dark()
              ? 'bg-gray-900/80 text-white hover:bg-gray-900'
              : 'bg-white/80 text-gray-900 hover:bg-white'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            (click)="next()"
            class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            [class]="themeService.dark()
              ? 'bg-gray-900/80 text-white hover:bg-gray-900'
              : 'bg-white/80 text-gray-900 hover:bg-white'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        }

        <!-- Dots Indicator -->
        @if (images().length > 1) {
          <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            @for (image of images(); track $index; let i = $index) {
              <button
                (click)="goTo(i)"
                class="w-2 h-2 rounded-full transition-colors"
                [class]="i === currentIndex()
                  ? (themeService.dark() ? 'bg-white' : 'bg-gray-900')
                  : (themeService.dark() ? 'bg-white/40' : 'bg-gray-900/40')"
              ></button>
            }
          </div>
        }
      </div>

      <!-- Thumbnails -->
      @if (images().length > 1 && showThumbnails) {
        <div class="flex gap-2 mt-3 overflow-x-auto pb-2">
          @for (image of images(); track $index; let i = $index) {
            <button
              (click)="goTo(i)"
              class="flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-colors"
              [class]="i === currentIndex()
                ? (themeService.dark() ? 'border-white' : 'border-gray-900')
                : (themeService.dark() ? 'border-gray-700 hover:border-gray-600' : 'border-gray-200 hover:border-gray-300')"
            >
              <img
                [src]="image"
                [alt]="'Thumbnail ' + (i + 1)"
                class="w-full h-full object-cover"
              />
            </button>
          }
        </div>
      }
    }
  `,
})
export class ImageSliderComponent {
  themeService = inject(ThemeService);

  @Input() set screenshots(value: string | string[] | undefined) {
    if (!value) {
      this._images.set([]);
      return;
    }
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value);
        this._images.set(Array.isArray(parsed) ? parsed : [value]);
      } catch {
        this._images.set([value]);
      }
    } else {
      this._images.set(value);
    }
  }

  @Input() showThumbnails = true;

  private _images = signal<string[]>([]);
  currentIndex = signal(0);

  images = this._images.asReadonly();

  prev(): void {
    const len = this._images().length;
    this.currentIndex.update((i) => (i - 1 + len) % len);
  }

  next(): void {
    const len = this._images().length;
    this.currentIndex.update((i) => (i + 1) % len);
  }

  goTo(index: number): void {
    this.currentIndex.set(index);
  }
}
