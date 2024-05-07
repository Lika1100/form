import { ProductModel } from "store/models/products";
import { readProducts } from "./readProducts";

export type Count = {
    count: number
}
export function deleteElement(product: (ProductModel & Count)): void {
    const events = readProducts();
    const newEvent: ProductModel & Count = {
      id: product.id,
      title: product.title,
      price: product.price,
      images: product.images,
      count: 1
    };
    const ids = events.map((x) => x.id)
    if (ids.includes(product.id)) {
        const filterEvents = events.filter((x) => x.id !== product.id)
        const newEvents = JSON.stringify([...filterEvents])
        localStorage.setItem("products", newEvents)
    } else {
        const newEvents = JSON.stringify([...events, newEvent])
        localStorage.setItem("products", newEvents)
    }
   
    
}