import { Component, inject, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../core/services/cart';

@Component({
  selector: 'app-header-main',
  imports: [RouterLink, FormsModule],
  templateUrl: './header-main.html',
  styleUrl: './header-main.scss',
})
export class HeaderMain {
  cart = inject(CartService);
  searchQuery = '';
  searched = output<string>();

  onSearch() {
    if (this.searchQuery.trim()) {
      this.searched.emit(this.searchQuery.trim());
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  }
}
