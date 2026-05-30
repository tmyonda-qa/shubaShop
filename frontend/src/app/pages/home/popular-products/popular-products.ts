import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../../core/services/product';

@Component({
  selector: 'app-popular-products',
  imports: [RouterLink, CommonModule],
  templateUrl: './popular-products.html',
  styleUrl: './popular-products.scss',
})
export class PopularProducts implements OnInit {
  productService = inject(ProductService);
  products: Product[] = [];
  loading = true;

  ngOnInit() {
    this.productService.getProducts({}, 1).subscribe({
      next: (res) => {
        this.products = res.data.slice(0, 8);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  getMainImage(product: Product): string {
    const main = product.images?.find(img => img.is_main);
    const first = product.images?.[0];
    const image = main || first;
    return image ? `http://127.0.0.1:8000/storage/${image.image_path}` : '';
  }
}
