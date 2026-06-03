import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrderService, Order } from '../../../core/services/order';
import { Auth } from '../../../core/services/auth';
import { OrdersList } from './orders-list/orders-list';

@Component({
  selector: 'app-orders',
  imports: [RouterLink, OrdersList],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class Orders implements OnInit {
  auth = inject(Auth);
  orderService = inject(OrderService);
  orders = signal<Order[]>([]);
  loading = signal(true);
  filter = signal<'all' | 'new' | 'in_progress' | 'done'>('all');

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.loading.set(true);
    this.orderService.getOrders().subscribe({
      next: (orders) => {
        this.orders.set(orders);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  filteredOrders() {
    if (this.filter() === 'all') return this.orders();
    return this.orders().filter(o => o.status === this.filter());
  }

  onStatusChange(data: { id: number; status: string }) {
    this.orderService.updateOrderStatus(data.id, data.status).subscribe({
      next: () => this.loadOrders(),
    });
  }

  onDelete(id: number) {
    this.orderService.deleteOrder(id).subscribe({
      next: () => this.loadOrders(),
    });
  }
}
