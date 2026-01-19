import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface Essay {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  featured: boolean;
  sortOrder: number;
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
export class EssaysService {
  private readonly apiUrl = `${environment.apiUrl}/api/essays`;

  // Signals for state management
  private readonly _essays = signal<Essay[]>([]);
  private readonly _featuredEssays = signal<Essay[]>([]);
  private readonly _selectedEssay = signal<Essay | null>(null);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  // Public readonly computed signals
  readonly essays = computed(() => this._essays());
  readonly featuredEssays = computed(() => this._featuredEssays());
  readonly selectedEssay = computed(() => this._selectedEssay());
  readonly loading = computed(() => this._loading());
  readonly error = computed(() => this._error());

  constructor(private http: HttpClient) {}

  async loadEssays(): Promise<void> {
    this._loading.set(true);
    this._error.set(null);

    try {
      const response = await this.http
        .get<ApiResponse<Essay[]>>(this.apiUrl)
        .toPromise();

      if (response?.success) {
        this._essays.set(response.data);
      }
    } catch (err) {
      this._error.set('Failed to load essays');
      console.error('Error loading essays:', err);
    } finally {
      this._loading.set(false);
    }
  }

  async loadFeaturedEssays(): Promise<void> {
    this._loading.set(true);
    this._error.set(null);

    try {
      const response = await this.http
        .get<ApiResponse<Essay[]>>(`${this.apiUrl}/featured`)
        .toPromise();

      if (response?.success) {
        this._featuredEssays.set(response.data);
      }
    } catch (err) {
      this._error.set('Failed to load featured essays');
      console.error('Error loading featured essays:', err);
    } finally {
      this._loading.set(false);
    }
  }

  async loadEssayBySlug(slug: string): Promise<void> {
    this._loading.set(true);
    this._error.set(null);

    try {
      const response = await this.http
        .get<ApiResponse<Essay>>(`${this.apiUrl}/${slug}`)
        .toPromise();

      if (response?.success) {
        this._selectedEssay.set(response.data);
      }
    } catch (err) {
      this._error.set('Failed to load essay');
      console.error('Error loading essay:', err);
    } finally {
      this._loading.set(false);
    }
  }

  clearSelectedEssay(): void {
    this._selectedEssay.set(null);
  }
}
