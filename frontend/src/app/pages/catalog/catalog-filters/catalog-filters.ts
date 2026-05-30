import { Component, input, output, signal, OnInit, effect } from '@angular/core';
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

  hood = signal('');
  fastener = signal('');
  furType = signal('');
  type = signal('');
  length = signal('');
  priceFrom = signal('');
  priceTo = signal('');

  ngOnInit() {
    const f = this.filters();
    this.hood.set(f.hood || '');
    this.fastener.set(f.fastener || '');
    this.furType.set(f.fur_type || '');
    this.type.set(f.type || '');
    this.length.set(f.length?.toString() || '');
    this.priceFrom.set(f.price_from?.toString() || '');
    this.priceTo.set(f.price_to?.toString() || '');
  }

  apply() {
    const filters: ProductFilters = {};
    if (this.hood()) filters.hood = this.hood();
    if (this.fastener()) filters.fastener = this.fastener();
    if (this.furType()) filters.fur_type = this.furType();
    if (this.type()) filters.type = this.type();
    if (this.length()) filters.length = +this.length();
    if (this.priceFrom()) filters.price_from = +this.priceFrom();
    if (this.priceTo()) filters.price_to = +this.priceTo();
    this.filtersChange.emit(filters);
  }

  reset() {
    this.hood.set('');
    this.fastener.set('');
    this.furType.set('');
    this.type.set('');
    this.length.set('');
    this.priceFrom.set('');
    this.priceTo.set('');
    this.filtersChange.emit({});
  }
}
