import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService, PageViewStats } from '../../../../core/services/analytics';

@Component({
  selector: 'app-analytics',
  imports: [CommonModule],
  templateUrl: './analytics.html',
  styleUrl: './analytics.scss',
})
export class Analytics implements OnInit {
  private analyticsService = inject(AnalyticsService);
  stats = signal<PageViewStats | null>(null);

  ngOnInit() {
    this.analyticsService.getStats().subscribe({
      next: (stats) => this.stats.set(stats),
    });
  }

  getPageLabel(page: string): string {
    const labels: Record<string, string> = {
      '/': 'Головна',
      '/catalog': 'Каталог',
      '/login': 'Вхід',
      '/register': 'Реєстрація',
    };
    return labels[page] || page;
  }

  getMaxCount(): number {
    if (!this.stats()?.last_7_days.length) return 1;
    return Math.max(...this.stats()!.last_7_days.map(d => d.count));
  }

  getBarHeight(count: number): number {
    return Math.round((count / this.getMaxCount()) * 100);
  }
}
