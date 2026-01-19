import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EssaysService } from '../../core/services/essays.service';
import { ThemeService } from '../../core/services/theme.service';
import { EssayCardComponent } from '../../shared/components/essay-card/essay-card.component';

@Component({
  selector: 'app-essays-list',
  standalone: true,
  imports: [CommonModule, EssayCardComponent],
  template: `
    <div
      class="pt-24 pb-16 min-h-screen"
      [class]="themeService.dark() ? 'bg-gray-950' : 'bg-white'"
    >
      <section class="max-w-3xl mx-auto px-6 py-16">
        <h1
          class="text-3xl font-medium mb-4"
          [class]="themeService.dark() ? 'text-white' : 'text-gray-900'"
        >
          Essays
        </h1>
        <p
          class="max-w-2xl mb-12"
          [class]="themeService.dark() ? 'text-gray-400' : 'text-gray-600'"
        >
          Positions on software engineering, not tutorials. Concepts that hold up over time, distilled from years of building.
        </p>
        <div>
          @for (essay of essaysService.essays(); track essay.id) {
            <app-essay-card [essay]="essay" />
          }
        </div>
      </section>
    </div>
  `,
})
export class EssaysListComponent implements OnInit {
  essaysService = inject(EssaysService);
  themeService = inject(ThemeService);

  ngOnInit(): void {
    this.essaysService.loadEssays();
  }
}

export default EssaysListComponent;
