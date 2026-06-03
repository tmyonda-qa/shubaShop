import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminService, Stats } from '../../../core/services/admin';
import { Auth } from '../../../core/services/auth';
import { StatsCards } from './stats-cards/stats-cards';
import { RecentActivity } from './recent-activity/recent-activity';
import { HeroSettingsComponent } from './hero-settings/hero-settings';
import { Analytics } from './analytics/analytics';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, StatsCards, RecentActivity, HeroSettingsComponent, Analytics],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  auth = inject(Auth);
  adminService = inject(AdminService);
  stats = signal<Stats | null>(null);

  ngOnInit() {
    this.adminService.getStats().subscribe({
      next: (stats) => this.stats.set(stats),
    });
  }
}
