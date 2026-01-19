import type { ProductStatus } from '@ardiland/shared';

export interface CreateProductDto {
  slug: string;
  name: string;
  description: string;
  status: ProductStatus;
  why: string;
  problem: string;
  currentState: string;
  next: string;
  ctaLabel?: string;
  ctaUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  sortOrder?: number;
}

export interface UpdateProductDto {
  slug?: string;
  name?: string;
  description?: string;
  status?: ProductStatus;
  why?: string;
  problem?: string;
  currentState?: string;
  next?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  sortOrder?: number;
}
