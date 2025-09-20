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
  _id: string; // Assuming _id is always a string from the API
  title: string;
  content: string;
  category: string;
  date: string;
  imageUrl?: string;
  description?: string;
  views?: number;
  isRecommended?: boolean;
  keywords?: string[];
}
