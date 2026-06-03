import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface Product {
  id: number;
  category_id: number;
  name: string;
  article: string;
  description: string;
  price: number;
  fur_type: string;
  hood: string;
  fastener: string;
  length: number;
  type: string;
  is_active: boolean;
  images: ProductImage[];
  category: Category;
  createdBy?: { id: number; name: string; email: string; };
  updatedBy?: { id: number; name: string; email: string; };
}

export interface ProductImage {
  id: number;
  product_id: number;
  image_path: string;
  is_main: boolean;
  sort_order: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
}

export interface ProductFilters {
  search?: string;
  category_id?: number;
  fur_type?: string;
  hood?: string;
  fastener?: string;
  type?: string;
  length?: number;
  price_from?: number;
  price_to?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProducts(filters: ProductFilters = {}, page = 1) {
    let params = new HttpParams().set('page', page);
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, value);
      }
    });
    return this.http.get<any>(`${this.apiUrl}/products`, { params });
  }

  getProduct(id: number) {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  createProduct(data: FormData) {
    return this.http.post<Product>(`${this.apiUrl}/admin/products`, data);
  }

  updateProduct(id: number, data: FormData) {
    return this.http.post<Product>(`${this.apiUrl}/admin/products/${id}?_method=PUT`, data);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.apiUrl}/admin/products/${id}`);
  }
}
