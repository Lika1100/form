export interface CategoryApi {
    id: number,
    name: string,
    image: string,
    creationAt: string,
    updatedAt: string
}

export interface CategoryModel {
    id: number,
    name: string,
    image: string,
    creationAt: Date,
    updatedAt: Date
}

export const normalizeCategoryItem = (from: CategoryApi) : CategoryModel => ({
    id: from.id,
    name: from.name,
    image: from.image,
    creationAt: new Date(from.creationAt),
    updatedAt: new Date(from.updatedAt)
})