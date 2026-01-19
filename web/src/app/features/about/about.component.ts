import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div
      class="pt-24 pb-16 min-h-screen"
      [class]="themeService.dark() ? 'bg-gray-950' : 'bg-white'"
    >
      <section class="max-w-3xl mx-auto px-6 py-16">
        <h1
          class="text-3xl font-medium mb-8"
          [class]="themeService.dark() ? 'text-white' : 'text-gray-900'"
        >
          About
        </h1>

        <div class="flex flex-col md:flex-row gap-8 mb-12">
          <img
            src="profile-pic.png"
            alt="Ardalan Ebrahimi"
            class="w-32 h-32 rounded-full flex-shrink-0 object-cover"
          />
          <div>
            <h2
              class="text-xl font-medium mb-2"
              [class]="themeService.dark() ? 'text-white' : 'text-gray-900'"
            >
              Ardalan Ebrahimi
            </h2>
            <p
              class="mb-4"
              [class]="themeService.dark() ? 'text-gray-400' : 'text-gray-600'"
            >
              Founder, Ardiland
            </p>
            <p
              class="text-sm"
              [class]="themeService.dark() ? 'text-gray-500' : 'text-gray-500'"
            >
              Currently Head of Engineering at KMS Mobility Solutions GmbH
            </p>
          </div>
        </div>

        <div
          class="space-y-6"
          [class]="themeService.dark() ? 'text-gray-300' : 'text-gray-700'"
        >
          <p>
            I build systems — the kind that power real businesses and the kind that help teams work better.
            At KMS, I lead engineering for vehicle and fleet management technology.
            At Ardiland, I build products and share what I've learned.
          </p>
          <p>
            My work sits at the intersection of architecture, product thinking, and enabling teams.
            I care about clean systems, clear thinking, and building things that last longer than the next hype cycle.
          </p>
          <p>
            Ardiland is where the building happens outside of day-job hours.
            Some of it ships. Some of it teaches. All of it is real work, done in the open.
          </p>
          <p>
            Beyond building, I'm passionate about giving back to the community. I create educational
            content on software engineering — covering architecture patterns, development practices,
            and lessons from production systems. This is part of a broader commitment to coaching
            and enablement, helping other engineers and teams grow their capabilities and ship better software.
          </p>
        </div>

        <div
          class="mt-12 pt-8 border-t"
          [class]="themeService.dark() ? 'border-gray-800' : 'border-gray-100'"
        >
          <a
            routerLink="/contact"
            class="flex items-center gap-1"
            [class]="themeService.dark()
              ? 'text-gray-400 hover:text-white'
              : 'text-gray-600 hover:text-gray-900'"
          >
            Want to work together? Let's talk
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  `,
})
export class AboutComponent {
  themeService = inject(ThemeService);
}

export default AboutComponent;
