import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Auth } from '../../../core/services/auth';
import { CartService } from '../../../core/services/cart';
import { AdminService } from '../../../core/services/admin';

@Component({
  selector: 'app-header-top',
  imports: [RouterLink],
  templateUrl: './header-top.html',
  styleUrl: './header-top.scss',
})
export class HeaderTop implements OnInit {
  auth = inject(Auth);
  cart = inject(CartService);
  adminService = inject(AdminService);

  ngOnInit() {
    if (this.auth.isLoggedIn() && this.auth.isAdmin()) {
      this.adminService.refreshNewOrders();
      setInterval(() => this.adminService.refreshNewOrders(), 30000);
    }
  }

  logout() {
    this.auth.logout();
  }
}
