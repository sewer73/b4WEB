export interface Travel {
  id: string;
  title: string;
  location: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  duration: string;
  group_size: string;
  activity: string;
  likes: number;
  isLiked: boolean;
  imgUrl: string;
}

export enum ActivityType {
  ADVENTURE = "adventure",
  CULTURAL = "cultural",
  RELAXATION = "relaxation",
  NATURE = "nature",
  URBAN = "urban",
}

export enum SortOption {
  BEST_RATED = "Best rated",
  LOWEST_PRICE = "Lowest price",
  HIGHEST_PRICE = "Highest price",
}