import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
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
          Let's talk
        </h1>
        <p
          class="max-w-xl mb-12"
          [class]="themeService.dark() ? 'text-gray-400' : 'text-gray-600'"
        >
          Whether it's about a product, a potential collaboration, or just an interesting engineering problem — I'm happy to have a conversation.
        </p>

        <div class="grid md:grid-cols-2 gap-6 mb-12">
          <a
            href="#"
            class="p-6 border rounded-xl transition-all group"
            [class]="themeService.dark()
              ? 'border-gray-800 hover:border-gray-700 bg-gray-900'
              : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 mb-4"
              [class]="themeService.dark() ? 'text-gray-500' : 'text-gray-400'"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3
              class="font-medium mb-2"
              [class]="themeService.dark() ? 'text-white' : 'text-gray-900'"
            >
              Book a call
            </h3>
            <p
              class="text-sm"
              [class]="themeService.dark() ? 'text-gray-400' : 'text-gray-500'"
            >
              30 minutes to explore what's possible
            </p>
          </a>
          <a
            href="mailto:hello@ardiland.com"
            class="p-6 border rounded-xl transition-all group"
            [class]="themeService.dark()
              ? 'border-gray-800 hover:border-gray-700 bg-gray-900'
              : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 mb-4"
              [class]="themeService.dark() ? 'text-gray-500' : 'text-gray-400'"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h3
              class="font-medium mb-2"
              [class]="themeService.dark() ? 'text-white' : 'text-gray-900'"
            >
              Send an email
            </h3>
            <p
              class="text-sm"
              [class]="themeService.dark() ? 'text-gray-400' : 'text-gray-500'"
            >
              hello&#64;ardiland.com
            </p>
          </a>
        </div>

        <p
          class="text-sm"
          [class]="themeService.dark() ? 'text-gray-500' : 'text-gray-500'"
        >
          No sales pitches. No service packages. Just a conversation to see if there's something worth building together.
        </p>
      </section>
    </div>
  `,
})
export class ContactComponent {
  themeService = inject(ThemeService);
}

export default ContactComponent;
