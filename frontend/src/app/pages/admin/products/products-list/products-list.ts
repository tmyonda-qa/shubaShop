import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../core/services/product';

@Component({
  selector: 'app-products-list',
  imports: [CommonModule],
  templateUrl: './products-list.html',
  styleUrl: './products-list.scss',
})
export class ProductsList {
  products = input<Product[]>([]);
  loading = input<boolean>(false);
  editProduct = output<Product>();
  deleteProduct = output<number>();

  getMainImage(product: Product): string {
    const main = product.images?.find(img => img.is_main);
    const first = product.images?.[0];
    const image = main || first;
    return image ? `http://127.0.0.1:8000/storage/${image.image_path}` : '';
  }

  confirmDelete(id: number) {
    if (confirm('Видалити товар?')) {
      this.deleteProduct.emit(id);
    }
  }
}
