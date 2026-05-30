import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../core/services/product';
import { OrderService } from '../../core/services/order';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './order.html',
  styleUrl: './order.scss',
})
export class Order implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  private orderService = inject(OrderService);

  product = signal<Product | null>(null);
  loading = signal(true);
  submitting = signal(false);
  success = signal(false);

  form = {
    phone: '',
    email: '',
    message: '',
    chest: '',
    hips: '',
    product_length: '',
    height: '',
  };

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID from route:', id);
    if (id) {
      this.productService.getProduct(+id).subscribe({
        next: (product) => {
          console.log('Product loaded:', product);
          this.product.set(product);
          this.loading.set(false);
        },
        error: (err) => {
          console.log('Error:', err);
          this.loading.set(false);
        },
      });
    } else {
      console.log('No ID found');
      this.loading.set(false);
    }
  }

  submit() {
    if (!this.form.phone) return;
    this.submitting.set(true);

    const data = {
      product_id: this.product()!.id,
      phone: this.form.phone,
      email: this.form.email || undefined,
      message: this.form.message || undefined,
      chest: this.form.chest ? +this.form.chest : undefined,
      hips: this.form.hips ? +this.form.hips : undefined,
      product_length: this.form.product_length ? +this.form.product_length : undefined,
      height: this.form.height ? +this.form.height : undefined,
    };

    this.orderService.createOrder(data).subscribe({
      next: () => {
        this.success.set(true);
        this.submitting.set(false);
      },
      error: () => this.submitting.set(false),
    });
  }
}
