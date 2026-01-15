import type  { CartItem } from "../types/cart";
import { ShoppingCart } from "../logic/ShoppingCart";

export function CartItemView(
  item: CartItem,
  cart: ShoppingCart
): HTMLElement {
  const el = document.createElement("div");
  el.className = "flex justify-between items-center border-b py-2";

  const render = () => {
    el.innerHTML = `
      <div class="flex-1">
        <p class="font-medium">${item.dessert.name}</p>
        <div class="flex items-center gap-2 mt-1">
          <button class="decrement-btn w-6 h-6 rounded-full border border-orange-700 text-orange-700 flex items-center justify-center text-sm font-bold hover:bg-orange-700 hover:text-white transition-colors">-</button>
          <span class="quantity font-bold text-orange-700">${item.quantity}</span>
          <button class="increment-btn w-6 h-6 rounded-full border border-orange-700 text-orange-700 flex items-center justify-center text-sm font-bold hover:bg-orange-700 hover:text-white transition-colors">+</button>
          <span class="text-sm text-gray-500 ml-2">$${item.dessert.price.toFixed(2)}</span>
        </div>
      </div>
      <div class="text-right">
        <p class="font-bold">$${(item.dessert.price * item.quantity).toFixed(2)}</p>
        <button class="remove-btn text-gray-400 hover:text-red-500 mt-1">✕</button>
      </div>
    `;

    // Add event listeners
    el.querySelector(".decrement-btn")!.addEventListener("click", () => {
      if (item.quantity > 1) {
        cart.updateQuantity(item.dessert.id, item.quantity - 1);
      } else {
        cart.removeItem(item.dessert.id);
      }
    });

    el.querySelector(".increment-btn")!.addEventListener("click", () => {
      cart.updateQuantity(item.dessert.id, item.quantity + 1);
    });

    el.querySelector(".remove-btn")!.addEventListener("click", () => {
      cart.removeItem(item.dessert.id);
    });
  };

  render();

  // Subscribe to cart changes to re-render this item
  // const unsubscribe = cart.subscribe((event) => {
  //   if (event.dessertId === item.dessert.id) {
  //     // Update the item reference and re-render
  //     const updatedItem = cart.getItem(event.dessertId);
  //     if (updatedItem) {
  //       item = updatedItem;
  //       render();
  //     }
  //   }
  // });

  return el;
}
