import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { CartService } from '../../core/services/cart';
import { OrderService } from '../../core/services/order';
import { Product } from '../../core/services/product';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  cart = inject(CartService);
  private orderService = inject(OrderService);

  submitting = signal(false);
  success = signal(false);

  form = { phone: '', email: '', message: '' };

  getImage(product: Product): string {
    const img = product.images?.find(i => i.is_main) || product.images?.[0];
    return img ? `http://127.0.0.1:8000/storage/${img.image_path}` : '';
  }

  total(): number {
    return this.cart.items().reduce((sum, p) => sum + +p.price, 0);
  }

  submit() {
    if (!this.form.phone || this.cart.items().length === 0) return;
    this.submitting.set(true);

    const requests = this.cart.items().map(p =>
      this.orderService.createOrder({
        product_id: p.id,
        phone: this.form.phone,
        email: this.form.email || undefined,
        message: this.form.message || undefined,
      })
    );

    forkJoin(requests).subscribe({
      next: () => {
        this.cart.clear();
        this.success.set(true);
        this.submitting.set(false);
      },
      error: () => this.submitting.set(false),
    });
  }
}
