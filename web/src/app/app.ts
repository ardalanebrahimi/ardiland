import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  selector: 'app-root',
  template: `
    <div class="min-h-screen bg-white text-gray-900 antialiased flex flex-col">
      <app-header />
      <main class="flex-1">
        <router-outlet />
      </main>
      <app-footer />
    </div>
  `,
})
export class App {}
