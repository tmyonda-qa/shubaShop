import { Component, inject, OnInit, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeroSettingsService, HeroSettings } from '../../../../core/services/hero-settings';

@Component({
  selector: 'app-hero-settings',
  imports: [FormsModule],
  templateUrl: './hero-settings.html',
  styleUrl: './hero-settings.scss',
})
export class HeroSettingsComponent implements OnInit {
  private heroService = inject(HeroSettingsService);
  settings = signal<HeroSettings | null>(null);
  loading = signal(false);
  success = signal(false);
  selectedFile = signal<File | null>(null);
  previewUrl = signal<string | null>(null);

  form = { title: '', subtitle: '' };

  ngOnInit() {
    this.heroService.getSettings().subscribe({
      next: (settings) => {
        this.settings.set(settings);
        if (settings) {
          this.form.title = settings.title || '';
          this.form.subtitle = settings.subtitle || '';
        }
      },
    });
  }

  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile.set(file);
      const reader = new FileReader();
      reader.onload = (e) => this.previewUrl.set(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  }

  getImageUrl(path: string): string {
    return this.heroService.getImageUrl(path);
  }

  submit() {
    this.loading.set(true);
    this.success.set(false);
    const formData = new FormData();
    if (this.selectedFile()) {
      formData.append('image', this.selectedFile()!);
    }
    if (this.form.title) formData.append('title', this.form.title);
    if (this.form.subtitle) formData.append('subtitle', this.form.subtitle);

    this.heroService.updateSettings(formData).subscribe({
      next: (settings) => {
        this.settings.set(settings);
        this.loading.set(false);
        this.success.set(true);
        setTimeout(() => this.success.set(false), 3000);
      },
      error: () => this.loading.set(false),
    });
  }
}
