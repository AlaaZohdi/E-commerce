
// ----- Types -----

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoriesMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;
}

export interface CategoriesResponse {
  results: number;
  metadata: CategoriesMetadata;
  data: Category[];
}


export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubcategoriesResponse {
  results: number;
  data: Subcategory[];
}