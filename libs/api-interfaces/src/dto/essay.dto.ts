export interface CreateEssayDto {
  slug: string;
  title: string;
  summary: string;
  content: string;
  featured?: boolean;
  sortOrder?: number;
}

export interface UpdateEssayDto {
  slug?: string;
  title?: string;
  summary?: string;
  content?: string;
  featured?: boolean;
  sortOrder?: number;
}
