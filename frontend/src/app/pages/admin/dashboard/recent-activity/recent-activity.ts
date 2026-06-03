import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recent-activity',
  imports: [CommonModule],
  templateUrl: './recent-activity.html',
  styleUrl: './recent-activity.scss',
})
export class RecentActivity {
  activities = input<any[]>([]);

  getActionIcon(action: string): string {
    if (action.includes('створив')) return '➕';
    if (action.includes('редагував')) return '✏️';
    if (action.includes('видалив')) return '🗑️';
    if (action.includes('статус')) return '🔄';
    if (action.includes('взяв')) return '👤';
    return '📝';
  }

  getEntityLabel(type: string): string {
    const labels: Record<string, string> = {
      product: 'товар',
      order: 'замовлення',
    };
    return labels[type] || type;
  }
}
