import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../../core/services/product';
import { CartService } from '../../../core/services/cart';

@Component({
  selector: 'app-product-info',
  imports: [RouterLink, CommonModule],
  templateUrl: './product-info.html',
  styleUrl: './product-info.scss',
})
export class ProductInfo {
  cart = inject(CartService);
  product = input.required<Product>();

  addToCart() {
    this.cart.add(this.product());
  }
}
