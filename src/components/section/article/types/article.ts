// Article 데이터에 대한 단일하고 정확한 타입을 정의합니다.
export interface Article {
  id: string | number;
  title: string;
  content: string;
  category: string;
  date: string;
  slug: string;
  imageUrl?: string;
  description?: string;
  views?: number;
  isRecommended?: boolean;
  keywords?: string[];
}

export interface ArticleFromAPI {
  id: string | number;
  title: string;
  content: string;
  category: string;
  date: string;
  slug: string;
  imageUrl?: string;
  description?: string;
  views?: number;
  isRecommended?: boolean;
  keywords?: string[];
}
