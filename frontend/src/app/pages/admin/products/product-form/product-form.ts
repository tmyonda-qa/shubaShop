import { Component, inject, input, output, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../../../core/services/product';
import { CategoryService, } from '../../../../core/services/category';
import { Category } from '../../../../core/services/product';

@Component({
  selector: 'app-product-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm implements OnInit {
  product = input<Product | null>(null);
  saved = output<void>();
  cancelled = output<void>();

  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  categories = signal<Category[]>([]);
  loading = signal(false);
  selectedFiles = signal<File[]>([]);

  form = {
    category_id: '',
    name: '',
    article: '',
    description: '',
    price: '',
    fur_type: '',
    hood: '',
    fastener: '',
    length: '',
    type: '',
    is_active: true,
  };

  ngOnInit() {
    this.categoryService.getCategories().subscribe({
      next: (cats) => this.categories.set(cats),
    });

    const p = this.product();
    if (p) {
      this.form = {
        category_id: p.category_id.toString(),
        name: p.name,
        article: p.article,
        description: p.description || '',
        price: p.price.toString(),
        fur_type: p.fur_type || '',
        hood: p.hood || '',
        fastener: p.fastener || '',
        length: p.length?.toString() || '',
        type: p.type || '',
        is_active: p.is_active,
      };
    }
  }

  onFileSelect(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      this.selectedFiles.set(Array.from(files));
    }
  }

  submit() {
    this.loading.set(true);
    const formData = new FormData();

    formData.append('category_id', this.form.category_id);
    formData.append('name', this.form.name);
    formData.append('article', this.form.article);
    formData.append('price', this.form.price);
    formData.append('description', this.form.description);
    formData.append('fur_type', this.form.fur_type);
    formData.append('hood', this.form.hood);
    formData.append('fastener', this.form.fastener);
    formData.append('length', this.form.length);
    formData.append('type', this.form.type);
    formData.append('is_active', this.form.is_active ? '1' : '0');

    this.selectedFiles().forEach((file, index) => {
      formData.append(`images[${index}]`, file);
    });

    const request = this.product()
      ? this.productService.updateProduct(this.product()!.id, formData)
      : this.productService.createProduct(formData);

    request.subscribe({
      next: () => {
        this.loading.set(false);
        this.saved.emit();
      },
      error: () => this.loading.set(false),
    });
  }
}
