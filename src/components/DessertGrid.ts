import type { Dessert } from "../types/dessert";
import { DessertCard } from "./DessertCard";
import { ShoppingCart } from "../logic/ShoppingCart";

export function DessertGrid(
  desserts: Dessert[],
  cart: ShoppingCart
): HTMLElement {
  const grid = document.createElement("div");
  grid.className = "grid grid-cols-3 gap-6";

  desserts.forEach(dessert => {
    grid.appendChild(DessertCard(dessert, cart));
  });

  return grid;
}
