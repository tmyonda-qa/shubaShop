import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface ActivityLog {
  id: number;
  user_id: number;
  action: string;
  entity_type: string;
  entity_id: number;
  details: any;
  created_at: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ActivityLogService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getLogs(filters: { user_id?: number; entity_type?: string; action?: string } = {}) {
    let params = new HttpParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params = params.set(key, value);
    });
    return this.http.get<any>(`${this.apiUrl}/admin/activity-logs`, { params });
  }
}
