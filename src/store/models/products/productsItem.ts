import { CategoryApi, CategoryModel, normalizeCategoryItem } from "./categoryItem";



export interface ProductApi {
    id: number,
    title?: string,
    price?: number,
    description?: string,
    images: string[],
    category: CategoryApi,
}

export interface ProductModel {
    id: number,
    title?: string,
    price?: number,
    description?: string,
    images: string[],
    category?: CategoryModel,
}

export const normalizeProduct = (from: ProductApi): ProductModel => ({
    id: from.id,
    title: from.title,
    price: from.price,
    description: from.description,
    images: from.images,
    category: normalizeCategoryItem(from.category),
})