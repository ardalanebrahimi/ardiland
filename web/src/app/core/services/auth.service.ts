import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';

interface LoginResponse {
  success: boolean;
  data?: {
    token: string;
    user: { id: string; username: string };
  };
  error?: string;
  message?: string;
}

interface AuthCheckResponse {
  success: boolean;
  data?: { authenticated: boolean };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _isAuthenticated = signal(false);
  private readonly _token = signal<string | null>(null);

  readonly isAuthenticated = computed(() => this._isAuthenticated());

  constructor(private http: HttpClient) {
    // Restore token from localStorage on init
    const savedToken = localStorage.getItem('auth_token');
    if (savedToken) {
      this._token.set(savedToken);
      this._isAuthenticated.set(true);
    }
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http
      .post<LoginResponse>(`${environment.apiUrl}/api/auth/login`, {
        username,
        password,
      })
      .pipe(
        tap((response) => {
          if (response.success && response.data) {
            this._token.set(response.data.token);
            this._isAuthenticated.set(true);
            localStorage.setItem('auth_token', response.data.token);
          }
        }),
        map((response) => response.success)
      );
  }

  logout(): Observable<void> {
    return this.http
      .post<void>(`${environment.apiUrl}/api/auth/logout`, {}, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        tap(() => {
          this.clearAuth();
        }),
        catchError(() => {
          this.clearAuth();
          return of(undefined);
        })
      );
  }

  checkAuth(): Observable<boolean> {
    const token = this._token();
    if (!token) {
      return of(false);
    }

    return this.http
      .get<AuthCheckResponse>(`${environment.apiUrl}/api/auth/me`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        map((response) => response.success && response.data?.authenticated === true),
        tap((isAuthenticated) => {
          if (!isAuthenticated) {
            this.clearAuth();
          }
        }),
        catchError(() => {
          this.clearAuth();
          return of(false);
        })
      );
  }

  getToken(): string | null {
    return this._token();
  }

  getAuthHeaders(): { Authorization: string } {
    return { Authorization: `Bearer ${this._token()}` };
  }

  private clearAuth(): void {
    this._token.set(null);
    this._isAuthenticated.set(false);
    localStorage.removeItem('auth_token');
  }
}
