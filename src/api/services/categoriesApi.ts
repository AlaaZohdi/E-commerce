// ----- Types -----

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
export interface SubcategoryResponse {
  data: Subcategory;
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

// ----- API calls -----

export async function fetShopcategories(): Promise<Category[]> {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories`,
      { next: { revalidate: 3600 } }
    );
    if (!response.ok) throw new Error("Api Error");
    const payload: CategoriesResponse = await response.json();
    return payload.data;
  } catch (error) {
    throw new Error("Api Error");
  }
}

export async function fetCategoryById(id: string): Promise<Category> {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
      { next: { revalidate: 3600 } }
    );
    if (!response.ok) throw new Error("Api Error");
    const payload: { data: Category } = await response.json();
    return payload.data;
  } catch (error) {
    throw new Error("Api Error");
  }
}

export async function fetSubcategories(
  categoryId: string
): Promise<Subcategory[]> {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`,
      { next: { revalidate: 3600 } }
    );
    if (!response.ok) throw new Error("Api Error");
    const payload: SubcategoriesResponse = await response.json();
    return payload.data;
  } catch (error) {
    throw new Error("Api Error");
  }
}

export interface SubcategoryResponse {
  data: Subcategory;
}

export async function fetSubcategoryById(
  id: string
): Promise<Subcategory> {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/subcategories/${id}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error("Api Error");
    }

    const payload: SubcategoryResponse = await response.json();

    return payload.data;
  } catch (error) {
    throw new Error("Api Error");
  }
}

