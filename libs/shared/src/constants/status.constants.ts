import type { ProductStatus } from '../types/product.types';

export const STATUS_CONFIG: Record<ProductStatus, { label: string; bgClass: string; textClass: string }> = {
  'live': {
    label: 'Live',
    bgClass: 'bg-emerald-50',
    textClass: 'text-emerald-700'
  },
  'beta': {
    label: 'Beta',
    bgClass: 'bg-amber-50',
    textClass: 'text-amber-700'
  },
  'in-progress': {
    label: 'In Progress',
    bgClass: 'bg-blue-50',
    textClass: 'text-blue-700'
  },
  'experiment': {
    label: 'Experiment',
    bgClass: 'bg-purple-50',
    textClass: 'text-purple-700'
  }
};

export const PRODUCT_STATUSES: ProductStatus[] = ['live', 'beta', 'in-progress', 'experiment'];
