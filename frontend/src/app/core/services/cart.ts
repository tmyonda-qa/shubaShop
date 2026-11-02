import { Injectable, signal, computed } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items = signal<Product[]>(this.load());

  count = computed(() => this.items().length);

  add(product: Product) {
    if (this.items().some(p => p.id === product.id)) return;
    this.items.set([...this.items(), product]);
    this.save();
  }

  remove(id: number) {
    this.items.set(this.items().filter(p => p.id !== id));
    this.save();
  }

  clear() {
    this.items.set([]);
    this.save();
  }

  has(id: number): boolean {
    return this.items().some(p => p.id === id);
  }

  private save() {
    try { localStorage.setItem('cart', JSON.stringify(this.items())); } catch {}
  }

  private load(): Product[] {
    try { return JSON.parse(localStorage.getItem('cart') || '[]'); } catch { return []; }
  }
}
