import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface HeroSettings {
  id: number;
  image_path: string | null;
  title: string;
  subtitle: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class HeroSettingsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getSettings() {
    return this.http.get<HeroSettings>(`${this.apiUrl}/hero-settings`);
  }

  updateSettings(data: FormData) {
    return this.http.post<HeroSettings>(`${this.apiUrl}/admin/hero-settings`, data);
  }

  getImageUrl(path: string): string {
    return `http://127.0.0.1:8000/storage/${path}`;
  }
}
