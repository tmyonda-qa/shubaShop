import { Component, inject, OnInit } from '@angular/core';
import { Hero } from './hero/hero';
import { Features } from './features/features';
import { PopularProducts } from './popular-products/popular-products';
import { AnalyticsService } from '../../core/services/analytics';

@Component({
  selector: 'app-home',
  imports: [Hero, Features, PopularProducts],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private analytics = inject(AnalyticsService);

  ngOnInit() {
    this.analytics.track('/', 'view');
  }
}
