import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Stats } from '../../../../core/services/admin';

@Component({
  selector: 'app-stats-cards',
  imports: [RouterLink],
  templateUrl: './stats-cards.html',
  styleUrl: './stats-cards.scss',
})
export class StatsCards {
  stats = input.required<Stats>();
}
