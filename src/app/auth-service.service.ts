import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";
import { environment } from '../environments/environment';
import { jwtDecode, JwtPayload } from "jwt-decode";
@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  register(data: { name: string; email: string; password: string }) {
    return this.http.post<{ token: string; user?: any }>(`${this.api}/register`, data).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
        if (response.user) {
          localStorage.setItem('user', JSON.stringify(response.user));
        }
      })
    );
  }

  login(data: { email: string; password: string }) {
    return this.http.post<{ token: string; user: any }>(`${this.api}/login`, data).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
      })
    );
  }


  private isTokenExpired(token: string): boolean {
    try {
      const { exp } = jwtDecode<JwtPayload>(token);
      if (typeof exp === 'undefined') {
        return true; // treat tokens without exp as expired
      }
      return Date.now() >= exp * 1000;
    } catch {
      return true; // if invalid token → treat as expired
    }
  }

  logout() {
    localStorage.clear();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

   isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    return !this.isTokenExpired(token);
  }

  // Get the user's first role (e.g., "guest" or "host")
  getRole(): string | null {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      if (user.roles && Array.isArray(user.roles) && user.roles.length > 0) {
        return user.roles;
      }
    }
    return null;
  }

  // Optionally, set the user's roles array
  setRoles(roles: string[]) {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      user.roles = roles;
      localStorage.setItem('user', JSON.stringify(user));
    }
  }
}