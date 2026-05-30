import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService, Product } from '../../core/services/product';
import { ProductGallery } from './product-gallery/product-gallery';
import { ProductInfo } from './product-info/product-info';
import { CatalogBreadcrumbs } from '../catalog/catalog-breadcrumbs/catalog-breadcrumbs';

@Component({
  selector: 'app-product-detail',
  imports: [ProductGallery, ProductInfo, CatalogBreadcrumbs],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  product = signal<Product | null>(null);
  loading = signal(true);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProduct(+id).subscribe({
        next: (product) => {
          this.product.set(product);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      });
    }
  }
}
