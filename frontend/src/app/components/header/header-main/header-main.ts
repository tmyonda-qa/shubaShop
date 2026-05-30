import { Component, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header-main',
  imports: [RouterLink, FormsModule],
  templateUrl: './header-main.html',
  styleUrl: './header-main.scss',
})
export class HeaderMain {
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
