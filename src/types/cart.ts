import type { Dessert } from "./dessert";

export interface CartItem {
  dessert: Dessert;
  quantity: number;
  addedAt: Date;
}
