import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product, ProductFilters } from '../../core/services/product';
import { CatalogFilters } from './catalog-filters/catalog-filters';
import { CatalogGrid } from './catalog-grid/catalog-grid';
import { CatalogBreadcrumbs } from './catalog-breadcrumbs/catalog-breadcrumbs';

@Component({
  selector: 'app-catalog',
  imports: [CatalogFilters, CatalogGrid, CatalogBreadcrumbs],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
})
export class Catalog implements OnInit {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  products = signal<Product[]>([]);
  loading = signal(true);
  currentPage = signal(1);
  totalPages = signal(1);
  filters = signal<ProductFilters>({});

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const filters: ProductFilters = {};
      if (params['category'] && params['category'] !== 'all') filters.category_id = +params['category'];
      if (params['search']) filters.search = params['search'];
      if (params['fur_type']) filters.fur_type = params['fur_type'];
      if (params['hood']) filters.hood = params['hood'];
      if (params['fastener']) filters.fastener = params['fastener'];
      if (params['type']) filters.type = params['type'];
      if (params['length']) filters.length = +params['length'];
      if (params['price_from']) filters.price_from = +params['price_from'];
      if (params['price_to']) filters.price_to = +params['price_to'];
      this.filters.set(filters);
      this.loadProducts();
    });
  }

  loadProducts() {
    this.loading.set(true);
    this.productService.getProducts(this.filters(), this.currentPage()).subscribe({
      next: (res) => {
        this.products.set(res.data);
        this.totalPages.set(res.last_page);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  onFiltersChange(filters: ProductFilters) {
    this.router.navigate([], {
      queryParams: filters,
      queryParamsHandling: 'merge',
    });
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.loadProducts();
  }
}
