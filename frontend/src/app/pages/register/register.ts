import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private auth = inject(Auth);
  private router = inject(Router);

  form = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  };
  error = signal('');
  loading = signal(false);

  submit() {
    if (!this.form.name || !this.form.email || !this.form.password) return;
    if (this.form.password !== this.form.password_confirmation) {
      this.error.set('Паролі не співпадають');
      return;
    }
    this.loading.set(true);
    this.error.set('');

    this.auth.register(this.form).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => {
        this.error.set('Помилка реєстрації. Можливо email вже використовується.');
        this.loading.set(false);
      },
    });
  }
}
