import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../../core/services/product';

@Component({
  selector: 'app-catalog-grid',
  imports: [RouterLink, CommonModule],
  templateUrl: './catalog-grid.html',
  styleUrl: './catalog-grid.scss',
})
export class CatalogGrid {
  products = input<Product[]>([]);
  loading = input<boolean>(false);
  currentPage = input<number>(1);
  totalPages = input<number>(1);
  pageChange = output<number>();

  getMainImage(product: Product): string {
    const main = product.images?.find(img => img.is_main);
    const first = product.images?.[0];
    const image = main || first;
    return image ? `http://127.0.0.1:8000/storage/${image.image_path}` : '';
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  }
}
