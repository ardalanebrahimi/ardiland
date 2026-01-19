import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  status: string;
  why: string;
  problem: string;
  currentState: string;
  next: string;
  ctaLabel?: string;
  ctaUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  featured: boolean;
  sortOrder: number;
  iconInitials?: string;
  iconColor?: string;
  image?: string;
  screenshots?: string;
  techStack?: string;
  createdAt: string;
  updatedAt: string;
}

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

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  message?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private get headers() {
    return this.authService.getAuthHeaders();
  }

  // Products
  getProducts(): Observable<Product[]> {
    return this.http
      .get<ApiResponse<Product[]>>(`${environment.apiUrl}/api/admin/products`, {
        headers: this.headers,
      })
      .pipe(map((r) => r.data));
  }

  createProduct(product: Partial<Product>): Observable<Product> {
    return this.http
      .post<ApiResponse<Product>>(`${environment.apiUrl}/api/admin/products`, product, {
        headers: this.headers,
      })
      .pipe(map((r) => r.data));
  }

  updateProduct(id: string, product: Partial<Product>): Observable<Product> {
    return this.http
      .put<ApiResponse<Product>>(`${environment.apiUrl}/api/admin/products/${id}`, product, {
        headers: this.headers,
      })
      .pipe(map((r) => r.data));
  }

  deleteProduct(id: string): Observable<void> {
    return this.http
      .delete<ApiResponse<void>>(`${environment.apiUrl}/api/admin/products/${id}`, {
        headers: this.headers,
      })
      .pipe(map(() => undefined));
  }

  // Essays
  getEssays(): Observable<Essay[]> {
    return this.http
      .get<ApiResponse<Essay[]>>(`${environment.apiUrl}/api/admin/essays`, {
        headers: this.headers,
      })
      .pipe(map((r) => r.data));
  }

  createEssay(essay: Partial<Essay>): Observable<Essay> {
    return this.http
      .post<ApiResponse<Essay>>(`${environment.apiUrl}/api/admin/essays`, essay, {
        headers: this.headers,
      })
      .pipe(map((r) => r.data));
  }

  updateEssay(id: string, essay: Partial<Essay>): Observable<Essay> {
    return this.http
      .put<ApiResponse<Essay>>(`${environment.apiUrl}/api/admin/essays/${id}`, essay, {
        headers: this.headers,
      })
      .pipe(map((r) => r.data));
  }

  deleteEssay(id: string): Observable<void> {
    return this.http
      .delete<ApiResponse<void>>(`${environment.apiUrl}/api/admin/essays/${id}`, {
        headers: this.headers,
      })
      .pipe(map(() => undefined));
  }

  // Messages
  getMessages(): Observable<ContactMessage[]> {
    return this.http
      .get<ApiResponse<ContactMessage[]>>(`${environment.apiUrl}/api/admin/messages`, {
        headers: this.headers,
      })
      .pipe(map((r) => r.data));
  }

  markMessageAsRead(id: string): Observable<ContactMessage> {
    return this.http
      .put<ApiResponse<ContactMessage>>(
        `${environment.apiUrl}/api/admin/messages/${id}/read`,
        {},
        { headers: this.headers }
      )
      .pipe(map((r) => r.data));
  }

  deleteMessage(id: string): Observable<void> {
    return this.http
      .delete<ApiResponse<void>>(`${environment.apiUrl}/api/admin/messages/${id}`, {
        headers: this.headers,
      })
      .pipe(map(() => undefined));
  }
}
