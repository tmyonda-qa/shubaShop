import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-catalog-breadcrumbs',
  imports: [RouterLink],
  templateUrl: './catalog-breadcrumbs.html',
  styleUrl: './catalog-breadcrumbs.scss',
})
export class CatalogBreadcrumbs implements OnInit {
  private route = inject(ActivatedRoute);
  categoryName = signal('Всі категорії');

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const category = params['category'];
      const categories: Record<string, string> = {
        '1': 'Шуби',
        '2': 'Шапки',
        '3': 'Аксесуари',
        'all': 'Всі категорії',
      };
      this.categoryName.set(categories[category] || 'Всі категорії');
    });
  }
}
