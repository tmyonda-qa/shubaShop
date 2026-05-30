import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header-catalog',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header-catalog.html',
  styleUrl: './header-catalog.scss',
})
export class HeaderCatalog {
  categories = [
    { label: 'Всі категорії', slug: 'all' },
    { label: 'Шуби', slug: '1' },
    { label: 'Шапки', slug: '2' },
    { label: 'Аксесуари', slug: '3' },
  ];

  getCategoryParams(slug: string) {
    return { category: slug };
  }
}
