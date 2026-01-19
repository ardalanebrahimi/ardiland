export interface Essay {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  featured: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface EssaySummary {
  id: string;
  slug: string;
  title: string;
  summary: string;
  featured: boolean;
}
