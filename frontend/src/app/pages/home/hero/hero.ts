import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeroSettingsService, HeroSettings } from '../../../core/services/hero-settings';
import { AnalyticsService } from '../../../core/services/analytics';

@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero implements OnInit {
  private heroService = inject(HeroSettingsService);
  private analytics = inject(AnalyticsService);
  settings = signal<HeroSettings | null>(null);

  ngOnInit() {
    this.heroService.getSettings().subscribe({
      next: (settings) => this.settings.set(settings),
    });
  }

  trackCatalogClick() {
    this.analytics.track('/catalog', 'catalog_click');
  }

  getImageUrl(path: string): string {
    return this.heroService.getImageUrl(path);
  }
}
