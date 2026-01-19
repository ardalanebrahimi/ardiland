export type ProductStatus = 'live' | 'beta' | 'in-progress' | 'experiment';

export interface Product {
  id: string;
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
  featured: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductSummary {
  id: string;
  slug: string;
  name: string;
  description: string;
  status: ProductStatus;
  featured: boolean;
}
