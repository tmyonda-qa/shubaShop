import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface User {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
  role: 'super_admin' | 'sub_admin' | 'user';
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = environment.apiUrl;
  currentUser = signal<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    const user = localStorage.getItem('user');
    if (user) {
      this.currentUser.set(JSON.parse(user));
    }
  }

  register(data: { name: string; email: string; password: string; password_confirmation: string }) {
    return this.http.post<{ user: User; token: string }>(`${this.apiUrl}/register`, data).pipe(
      tap(res => this.setSession(res))
    );
  }

  login(data: { email: string; password: string }) {
    return this.http.post<{ user: User; token: string }>(`${this.apiUrl}/login`, data).pipe(
      tap(res => this.setSession(res))
    );
  }

  logout() {
    this.http.post(`${this.apiUrl}/logout`, {}).subscribe();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUser.set(null);
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean {
    const role = this.currentUser()?.role;
    return role === 'super_admin' || role === 'sub_admin';
  }

  isSuperAdmin(): boolean {
    return this.currentUser()?.role === 'super_admin';
  }

  isSubAdmin(): boolean {
    return this.currentUser()?.role === 'sub_admin';
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private setSession(res: { user: User; token: string }) {
    localStorage.setItem('token', res.token);
    localStorage.setItem('user', JSON.stringify(res.user));
    this.currentUser.set(res.user);
  }
}
