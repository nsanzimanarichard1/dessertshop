import type { Dessert } from "../types/dessert";
import { ShoppingCart } from "../logic/ShoppingCart";

export function DessertCard(
  dessert: Dessert,
  cart: ShoppingCart
): HTMLElement {
  const card = document.createElement("div");
  card.className = "bg-white rounded-xl shadow p-4";

  card.innerHTML = `
    <img src="${dessert.image}" class="rounded-lg mb-3" />
    <p class="text-sm text-gray-500">${dessert.category}</p>
    <h3 class="font-semibold">${dessert.name}</h3>
    <p class="text-orange-700 font-bold">$${dessert.price.toFixed(2)}</p>
    <button class="add-btn mt-3 cursor-pointer w-full border rounded-full py-2 text-sm hover:bg-gray-200">
      🛒 Add to Cart
    </button>
  `;

  const btn = card.querySelector(".add-btn") as HTMLButtonElement;

  btn.addEventListener("click", () => {
    cart.addItem(dessert, 1);
  });

  return card;
}
