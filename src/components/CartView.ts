import type { CartItem } from "../types/cart";
import { OrderManager } from "../logic/OrderManager";
import { ShoppingCart } from "../logic/ShoppingCart";

export function OrderConfirmationModal(
  items: CartItem[],
  orderManager: OrderManager,
  cart: ShoppingCart,
  onClose: () => void
): HTMLElement {
  const modal = document.createElement("div");
  modal.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";

  const total = items.reduce((sum, item) => sum + item.dessert.price * item.quantity, 0);

  modal.innerHTML = `
    <div class="bg-white rounded-xl p-6 max-w-md w-full mx-4">
      <div class="text-green-500 text-4xl mb-4">✓</div>
      <h2 class="text-2xl font-bold mb-2">Order Confirmed</h2>
      <p class="text-gray-600 mb-6">We hope you enjoy your food!</p>

      <div class="space-y-3 mb-6">
        ${items.map(item => `
          <div class="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
            <div class="flex items-center gap-3">
              <img src="${item.dessert.image}" class="w-12 h-12 rounded-lg object-cover" />
              <div>
                <p class="font-medium">${item.dessert.name}</p>
                <p class="text-sm text-gray-500">${item.quantity}x @ $${item.dessert.price.toFixed(2)}</p>
              </div>
            </div>
            <span class="font-bold">$${(item.dessert.price * item.quantity).toFixed(2)}</span>
          </div>
        `).join('')}
      </div>

      <div class="border-t pt-4">
        <div class="flex justify-between items-center font-bold text-lg">
          <span>Order Total</span>
          <span>$${total.toFixed(2)}</span>
        </div>
      </div>

      <button class="w-full bg-orange-700 text-white py-3 rounded-full mt-6 font-medium">
        Start New Order
      </button>
    </div>
  `;

  const newOrderBtn = modal.querySelector("button")!;
  newOrderBtn.addEventListener("click", () => {
    // Create the order
    const order = orderManager.createOrder(items);
    orderManager.confirmOrder(order.id);

    // Clear the cart
    cart.clear();

    // Close modal
    onClose();
  });

  // Close modal when clicking outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      onClose();
    }
  });

  return modal;
}