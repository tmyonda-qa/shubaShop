import { Component, input, output, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductFilters } from '../../../core/services/product';

@Component({
  selector: 'app-catalog-filters',
  imports: [FormsModule],
  templateUrl: './catalog-filters.html',
  styleUrl: './catalog-filters.scss',
})
export class CatalogFilters implements OnInit {
  filters = input<ProductFilters>({});
  filtersChange = output<ProductFilters>();

  open = signal(false);

  hood = signal('');
  furType = signal('');
  type = signal('');
  priceFrom = signal('');
  priceTo = signal('');

  ngOnInit() {
    const f = this.filters();
    this.hood.set(f.hood || '');
    this.furType.set(f.fur_type || '');
    this.type.set(f.type || '');
    this.priceFrom.set(f.price_from?.toString() || '');
    this.priceTo.set(f.price_to?.toString() || '');
  }

  toggle() {
    this.open.set(!this.open());
  }

  apply() {
    const filters: ProductFilters = {};
    if (this.hood()) filters.hood = this.hood();
    if (this.furType()) filters.fur_type = this.furType();
    if (this.type()) filters.type = this.type();
    if (this.priceFrom()) filters.price_from = +this.priceFrom();
    if (this.priceTo()) filters.price_to = +this.priceTo();
    this.filtersChange.emit(filters);
    this.open.set(false);
  }

  reset() {
    this.hood.set('');
    this.furType.set('');
    this.type.set('');
    this.priceFrom.set('');
    this.priceTo.set('');
    this.filtersChange.emit({});
    this.open.set(false);
  }
}
