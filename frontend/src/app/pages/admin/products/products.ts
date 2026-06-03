import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService, Product } from '../../../core/services/product';
import { Auth } from '../../../core/services/auth';
import { ProductsList } from './products-list/products-list';
import { ProductForm } from './product-form/product-form';

@Component({
  selector: 'app-products',
  imports: [RouterLink, ProductsList, ProductForm],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit {
  auth = inject(Auth);
  productService = inject(ProductService);
  products = signal<Product[]>([]);
  loading = signal(true);
  showForm = signal(false);
  editProduct = signal<Product | null>(null);

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.loading.set(true);
    this.productService.getProducts({}, 1).subscribe({
      next: (res) => {
        this.products.set(res.data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  onEdit(product: Product) {
    this.editProduct.set(product);
    this.showForm.set(true);
  }

  onDelete(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: () => this.loadProducts(),
    });
  }

  onFormSave() {
    this.showForm.set(false);
    this.editProduct.set(null);
    this.loadProducts();
  }

  onFormCancel() {
    this.showForm.set(false);
    this.editProduct.set(null);
  }
}
