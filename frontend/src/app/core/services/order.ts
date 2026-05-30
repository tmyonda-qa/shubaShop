import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface Order {
  id: number;
  product_id: number;
  phone: string;
  email: string;
  message: string;
  chest: number;
  hips: number;
  product_length: number;
  height: number;
  status: 'new' | 'in_progress' | 'done';
  product: any;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createOrder(data: Partial<Order>) {
    return this.http.post<Order>(`${this.apiUrl}/orders`, data);
  }

  getOrders() {
    return this.http.get<Order[]>(`${this.apiUrl}/admin/orders`);
  }

  updateOrderStatus(id: number, status: string) {
    return this.http.patch(`${this.apiUrl}/admin/orders/${id}`, { status });
  }

  deleteOrder(id: number) {
    return this.http.delete(`${this.apiUrl}/admin/orders/${id}`);
  }
}
