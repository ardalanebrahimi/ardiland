import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service';
import { AdminService, ContactMessage } from '../../../core/services/admin.service';

@Component({
  selector: 'app-admin-messages',
  standalone: true,
  imports: [CommonModule, RouterLink],
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
        <div class="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
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
            Messages
          </h1>
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
            @for (message of messages(); track message.id) {
              <div
                class="p-4 rounded-xl border"
                [class]="themeService.dark()
                  ? 'bg-gray-900 border-gray-800'
                  : 'bg-white border-gray-200'"
              >
                <div class="flex items-start justify-between mb-3">
                  <div>
                    <div class="flex items-center gap-2">
                      <h3
                        class="font-medium"
                        [class]="themeService.dark() ? 'text-white' : 'text-gray-900'"
                      >
                        {{ message.name }}
                      </h3>
                      @if (!message.read) {
                        <span
                          class="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700"
                        >
                          New
                        </span>
                      }
                    </div>
                    <p
                      class="text-sm"
                      [class]="themeService.dark() ? 'text-gray-400' : 'text-gray-500'"
                    >
                      {{ message.email }}
                    </p>
                  </div>
                  <div class="flex items-center gap-2">
                    @if (!message.read) {
                      <button
                        (click)="markAsRead(message.id)"
                        class="px-3 py-1.5 rounded-lg text-sm transition-colors"
                        [class]="themeService.dark()
                          ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
                      >
                        Mark Read
                      </button>
                    }
                    <button
                      (click)="deleteMessage(message.id)"
                      class="px-3 py-1.5 rounded-lg text-sm text-red-600 transition-colors"
                      [class]="themeService.dark()
                        ? 'bg-red-900/20 hover:bg-red-900/40'
                        : 'bg-red-50 hover:bg-red-100'"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p
                  class="text-sm whitespace-pre-wrap"
                  [class]="themeService.dark() ? 'text-gray-300' : 'text-gray-700'"
                >
                  {{ message.message }}
                </p>
                <p
                  class="text-xs mt-3"
                  [class]="themeService.dark() ? 'text-gray-500' : 'text-gray-400'"
                >
                  {{ formatDate(message.createdAt) }}
                </p>
              </div>
            } @empty {
              <p [class]="themeService.dark() ? 'text-gray-400' : 'text-gray-500'">
                No messages yet.
              </p>
            }
          </div>
        }
      </main>
    </div>
  `,
})
export class AdminMessagesComponent implements OnInit {
  themeService = inject(ThemeService);
  private adminService = inject(AdminService);

  messages = signal<ContactMessage[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.loading.set(true);
    this.adminService.getMessages().subscribe({
      next: (messages) => {
        this.messages.set(messages);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  markAsRead(id: string): void {
    this.adminService.markMessageAsRead(id).subscribe({
      next: () => this.loadMessages(),
    });
  }

  deleteMessage(id: string): void {
    if (!confirm('Are you sure you want to delete this message?')) return;

    this.adminService.deleteMessage(id).subscribe({
      next: () => this.loadMessages(),
    });
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString();
  }
}
