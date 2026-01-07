import { ShoppingCart } from "../logic/ShoppingCart";
import { CartItemView } from "./CartItem";
import { OrderConfirmationModal } from "./CartView";
import { OrderManager } from "../logic/OrderManager";

export function CartPanel(cart: ShoppingCart, orderManager: OrderManager): HTMLElement {
  const panel = document.createElement("aside");
  panel.className = "bg-white rounded-xl p-6 w-80";

  let modal: HTMLElement | null = null;

  const render = () => {
    const items = cart.getItems();
    const isEmpty = items.length === 0;

    panel.innerHTML = `
      <h2 class="text-lg font-bold mb-4 bg-amber-300">
        Your Cart (${items.length})
      </h2>
      ${isEmpty ? `
        <div class="text-center py-8">
          <div class="text-gray-400 text-4xl mb-4">🛒</div>
          <p class="text-gray-500 font-medium">Your added items will appear here</p>
        </div>
      ` : `
        <div class="cart-items space-y-2"></div>
        <div class="mt-4 font-bold">
          Order Total: $${cart.getTotal().toFixed(2)}
        </div>
        <button class="confirm-btn mt-4 w-full bg-orange-700 cursor-pointer hover:bg-orange-800 text-white py-3 rounded-full font-medium">
          Confirm Order
        </button>
      `}
    `;

    if (!isEmpty) {
      const list = panel.querySelector(".cart-items")!;
      items.forEach(item => {
        list.appendChild(CartItemView(item, cart));
      });

      const confirmBtn = panel.querySelector(".confirm-btn")!;
      confirmBtn.addEventListener("click", () => {
        showOrderConfirmation();
      });
    }
  };

  const showOrderConfirmation = () => {
    if (modal) return;

    modal = OrderConfirmationModal(cart.getItems(), orderManager, cart, () => {
      modal?.remove();
      modal = null;
    });

    document.body.appendChild(modal);
  };

  cart.subscribe(render);
  render();

  return panel;
}
