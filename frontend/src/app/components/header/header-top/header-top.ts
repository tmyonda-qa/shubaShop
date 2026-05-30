import { Component, inject, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-header-top',
  imports: [RouterLink],
  templateUrl: './header-top.html',
  styleUrl: './header-top.scss',
})
export class HeaderTop {
  auth = inject(Auth);

  logout() {
    this.auth.logout();
  }
}
