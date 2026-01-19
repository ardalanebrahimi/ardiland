import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EssaysService } from '../../core/services/essays.service';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-essay-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div
      class="pt-24 pb-16 min-h-screen"
      [class]="themeService.dark() ? 'bg-gray-950' : 'bg-white'"
    >
      <article class="max-w-3xl mx-auto px-6 py-16">
        <a
          routerLink="/essays"
          class="text-sm mb-8 flex items-center gap-1"
          [class]="themeService.dark()
            ? 'text-gray-400 hover:text-white'
            : 'text-gray-500 hover:text-gray-700'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to essays
        </a>

        @if (essaysService.loading()) {
          <div class="animate-pulse">
            <div
              class="h-8 rounded w-2/3 mb-6"
              [class]="themeService.dark() ? 'bg-gray-800' : 'bg-gray-200'"
            ></div>
            <div
              class="h-4 rounded w-full mb-2"
              [class]="themeService.dark() ? 'bg-gray-800' : 'bg-gray-200'"
            ></div>
            <div
              class="h-4 rounded w-full mb-2"
              [class]="themeService.dark() ? 'bg-gray-800' : 'bg-gray-200'"
            ></div>
            <div
              class="h-4 rounded w-3/4 mb-8"
              [class]="themeService.dark() ? 'bg-gray-800' : 'bg-gray-200'"
            ></div>
          </div>
        } @else if (essaysService.selectedEssay(); as essay) {
          <h1
            class="text-3xl font-medium mb-6"
            [class]="themeService.dark() ? 'text-white' : 'text-gray-900'"
          >
            {{ essay.title }}
          </h1>
          <div class="max-w-none">
            <p
              class="text-lg mb-8"
              [class]="themeService.dark() ? 'text-gray-400' : 'text-gray-600'"
            >
              {{ essay.summary }}
            </p>
            <div
              class="space-y-4"
              [class]="themeService.dark() ? 'text-gray-300' : 'text-gray-700'"
            >
              @for (paragraph of getContentParagraphs(essay.content); track $index) {
                <p>{{ paragraph }}</p>
              }
            </div>
          </div>
        }
      </article>
    </div>
  `,
})
export class EssayDetailComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  essaysService = inject(EssaysService);
  themeService = inject(ThemeService);

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.essaysService.loadEssayBySlug(slug);
    }
  }

  ngOnDestroy(): void {
    this.essaysService.clearSelectedEssay();
  }

  getContentParagraphs(content: string): string[] {
    return content.split('\n\n').filter((p) => p.trim());
  }
}

export default EssayDetailComponent;
