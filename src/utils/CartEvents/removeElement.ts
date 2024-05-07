import { ProductModel } from "store/models/products";
import { readProducts } from "./readProducts";

export type Count = {
    count: number
}
export function removeElement(product: (ProductModel & Count)): void {
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
        for (const event of events) {
            if(event.id === product.id) {
                event.count -=1
            }
        }
        const newEvents = JSON.stringify([...events])
        localStorage.setItem("products", newEvents)
    } else {
        const newEvents = JSON.stringify([...events, newEvent])
        localStorage.setItem("products", newEvents)
    }
   
    
}