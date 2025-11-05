export interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
  category: string;
  date: string;
  imageUrl?: string;
  description?: string;
  views?: number;
  isRecommended?: boolean;
  keywords?: string[];
}
