import type { CartItem } from "../types/cart";
import  type { Dessert } from "../types/dessert";

export function addToCart(
  cart: CartItem[],
  dessert: Dessert,
  quantity: number
): CartItem[] {
  if (quantity <= 0) return cart;

  const existing = cart.find(c => c.dessert.id === dessert.id);

  if (existing) {
    return cart.map(item =>
      item.dessert.id === dessert.id
        ? { ...item, quantity: item.quantity + quantity }
        : item
    );
  }

  return [
    ...cart,
    { dessert, quantity, addedAt: new Date() }
  ];
}


//removeFromCart.ts --- IGNORE ---
export function removeFromCart(
  cart: CartItem[],
  dessertId: string
): CartItem[] {
  return cart.filter(item => item.dessert.id !== dessertId);
}
//updateCartItem.ts --- IGNORE ---
export function updateQuantity(
  cart: CartItem[],
  dessertId: string,
  newQuantity: number
): CartItem[] {
  if (newQuantity <= 0) {
    return removeFromCart(cart, dessertId);
  }

  return cart.map(item =>
    item.dessert.id === dessertId
      ? { ...item, quantity: newQuantity }
      : item
  );
}
//calculateTotal.ts --- IGNORE ---
export function calculateTotal(cart: CartItem[]): number {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.dessert.price * item.quantity,
    0
  );

  const tax = subtotal * 0.1;
  return Number((subtotal + tax).toFixed(2));
}
//clearCart.ts --- IGNORE ---
export function clearCart(): CartItem[] {
  return [];
}