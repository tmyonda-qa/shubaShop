import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface PageViewStats {
  total: number;
  today: number;
  catalog_clicks: number;
  catalog_clicks_today: number;
  popular_pages: { page: string; count: number }[];
  last_7_days: { date: string; count: number }[];
}

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  track(page: string, event: string = 'view') {
    return this.http.post(`${this.apiUrl}/track`, { page, event }).subscribe();
  }

  getStats() {
    return this.http.get<PageViewStats>(`${this.apiUrl}/admin/page-views`);
  }
}
