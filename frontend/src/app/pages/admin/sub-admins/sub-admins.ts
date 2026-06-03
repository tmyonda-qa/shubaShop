import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminService, SubAdmin } from '../../../core/services/admin';

@Component({
  selector: 'app-sub-admins',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './sub-admins.html',
  styleUrl: './sub-admins.scss',
})
export class SubAdmins implements OnInit {
  adminService = inject(AdminService);
  admins = signal<SubAdmin[]>([]);
  loading = signal(true);
  showForm = signal(false);

  form = { name: '', email: '', password: '' };
  formLoading = signal(false);
  formError = signal('');

  ngOnInit() {
    this.loadAdmins();
  }

  loadAdmins() {
    this.loading.set(true);
    this.adminService.getSubAdmins().subscribe({
      next: (admins) => {
        this.admins.set(admins);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  submit() {
    if (!this.form.name || !this.form.email || !this.form.password) return;
    this.formLoading.set(true);
    this.formError.set('');

    this.adminService.createSubAdmin(this.form).subscribe({
      next: () => {
        this.showForm.set(false);
        this.form = { name: '', email: '', password: '' };
        this.formLoading.set(false);
        this.loadAdmins();
      },
      error: () => {
        this.formError.set('Помилка. Можливо email вже використовується.');
        this.formLoading.set(false);
      },
    });
  }

  confirmDelete(id: number) {
    if (confirm('Видалити адміна?')) {
      this.adminService.deleteSubAdmin(id).subscribe({
        next: () => this.loadAdmins(),
      });
    }
  }

  getRoleLabel(role: string): string {
    const labels: Record<string, string> = {
      super_admin: 'Super Admin',
      sub_admin: 'Менеджер',
    };
    return labels[role] || role;
  }
}
