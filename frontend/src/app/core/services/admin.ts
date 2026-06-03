import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface SubAdmin {
  id: number;
  name: string;
  email: string;
  role: string;
  activity_logs_count: number;
  created_at: string;
}

export interface Stats {
  total_products: number;
  total_orders: number;
  new_orders: number;
  in_progress_orders: number;
  done_orders: number;
  total_admins: number;
  recent_activities: any[];
}

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getStats() {
    return this.http.get<Stats>(`${this.apiUrl}/admin/stats`);
  }

  getSubAdmins() {
    return this.http.get<SubAdmin[]>(`${this.apiUrl}/admin/sub-admins`);
  }

  createSubAdmin(data: { name: string; email: string; password: string }) {
    return this.http.post<SubAdmin>(`${this.apiUrl}/admin/sub-admins`, data);
  }

  updateSubAdmin(id: number, data: Partial<SubAdmin>) {
    return this.http.put<SubAdmin>(`${this.apiUrl}/admin/sub-admins/${id}`, data);
  }

  deleteSubAdmin(id: number) {
    return this.http.delete(`${this.apiUrl}/admin/sub-admins/${id}`);
  }
}
