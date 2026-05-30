import { Component, input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductImage } from '../../../core/services/product';

@Component({
  selector: 'app-product-gallery',
  imports: [CommonModule],
  templateUrl: './product-gallery.html',
  styleUrl: './product-gallery.scss',
})
export class ProductGallery {
  images = input<ProductImage[]>([]);
  currentIndex = signal(0);

  currentImage = computed(() => this.images()[this.currentIndex()]);

  getImageUrl(path: string): string {
    return `http://127.0.0.1:8000/storage/${path}`;
  }

  prev() {
    if (this.currentIndex() > 0) {
      this.currentIndex.set(this.currentIndex() - 1);
    }
  }

  next() {
    if (this.currentIndex() < this.images().length - 1) {
      this.currentIndex.set(this.currentIndex() + 1);
    }
  }

  selectImage(index: number) {
    this.currentIndex.set(index);
  }
}
