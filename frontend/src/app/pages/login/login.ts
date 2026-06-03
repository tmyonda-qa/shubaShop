import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private auth = inject(Auth);
  private router = inject(Router);

  form = { email: '', password: '' };
  error = signal('');
  loading = signal(false);

  submit() {
    if (!this.form.email || !this.form.password) return;
    this.loading.set(true);
    this.error.set('');

    this.auth.login(this.form).subscribe({
      next: () => {
        if (this.auth.isAdmin()) {
          this.router.navigate(['/admin/orders']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: () => {
        this.error.set('Невірний email або пароль');
        this.loading.set(false);
      },
    });
  }
}
