import type { DessertCategory, DessertId } from "./shared";

export interface Dessert {
  id: DessertId;
  name: string;
  category: DessertCategory;
  price: number;
  image: string;
  description: string;
  inStock: boolean;
}
