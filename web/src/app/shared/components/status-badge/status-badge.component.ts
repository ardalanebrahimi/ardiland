import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { ProductStatus } from '../../../core/services/products.service';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      class="text-xs px-2 py-1 rounded-full font-medium"
      [ngClass]="getStatusClasses()"
    >
      {{ getStatusLabel() }}
    </span>
  `,
})
export class StatusBadgeComponent {
  @Input({ required: true }) status!: ProductStatus;

  private readonly statusConfig: Record<ProductStatus, { label: string; classes: string }> = {
    'live': {
      label: 'Live',
      classes: 'bg-emerald-50 text-emerald-700',
    },
    'beta': {
      label: 'Beta',
      classes: 'bg-amber-50 text-amber-700',
    },
    'in-progress': {
      label: 'In Progress',
      classes: 'bg-blue-50 text-blue-700',
    },
    'experiment': {
      label: 'Experiment',
      classes: 'bg-purple-50 text-purple-700',
    },
  };

  getStatusClasses(): string {
    return this.statusConfig[this.status]?.classes || '';
  }

  getStatusLabel(): string {
    return this.statusConfig[this.status]?.label || this.status;
  }
}
