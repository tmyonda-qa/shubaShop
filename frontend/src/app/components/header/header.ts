import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderTop } from './header-top/header-top';
import { HeaderMain } from './header-main/header-main';
import { HeaderCatalog } from './header-catalog/header-catalog';

@Component({
  selector: 'app-header',
  imports: [HeaderTop, HeaderMain, HeaderCatalog],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  constructor(private router: Router) {}

  onSearch(query: string) {
    this.router.navigate(['/catalog'], { queryParams: { search: query } });
  }
}
