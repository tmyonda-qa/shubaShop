import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../../../core/services/order';

@Component({
  selector: 'app-orders-list',
  imports: [CommonModule],
  templateUrl: './orders-list.html',
  styleUrl: './orders-list.scss',
})
export class OrdersList {
  orders = input<Order[]>([]);
  loading = input<boolean>(false);
  isSuperAdmin = input<boolean>(false);
  statusChange = output<{ id: number; status: string }>();
  deleteOrder = output<number>();

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      new: 'Новий',
      in_progress: 'В обробці',
      done: 'Виконано',
    };
    return labels[status] || status;
  }

  getStatusClass(status: string): string {
    const classes: Record<string, string> = {
      new: 'status--new',
      in_progress: 'status--progress',
      done: 'status--done',
    };
    return classes[status] || '';
  }

  onStatusChange(id: number, event: Event) {
    const status = (event.target as HTMLSelectElement).value;
    this.statusChange.emit({ id, status });
  }

  confirmDelete(id: number) {
    if (confirm('Видалити замовлення?')) {
      this.deleteOrder.emit(id);
    }
  }
}
