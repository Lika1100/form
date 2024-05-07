import { ProductModel } from "store/models/products";
type Count = {
    count: number
}
export function readProducts(): (ProductModel & Count)[] {
    const json = localStorage.getItem("products");
    if (json === null) {
      const initialEvent = JSON.stringify([])
      localStorage.setItem("products", initialEvent)
      return []
    }
  
    return JSON.parse(json);
  }