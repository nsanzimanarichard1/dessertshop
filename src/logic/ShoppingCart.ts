import  type { CartItem } from "../types/cart";
import type { Dessert } from "../types/dessert";

//Cart Event System
export type CartEvent =
  | { type: "add"; dessertId: string }
  | { type: "remove"; dessertId: string }
  | { type: "update"; dessertId: string };


export class ShoppingCart {
  private items = new Map<string, CartItem>();
  private listeners = new Set<(event: CartEvent) => void>();

  addItem(dessert: Dessert, quantity = 1) {
    if (quantity <= 0) return;

    const existing = this.items.get(dessert.id);

    this.items.set(dessert.id, {
      dessert,
      quantity: (existing?.quantity ?? 0) + quantity,
      addedAt: existing?.addedAt ?? new Date(),
    });

    this.emit({ type: "add", dessertId: dessert.id });
  }

  removeItem(id: string) {
    this.items.delete(id);
    this.emit({ type: "remove", dessertId: id });
  }

  updateQuantity(id: string, qty: number) {
    if (qty <= 0) return this.removeItem(id);
    const item = this.items.get(id);
    if (!item) return;

    this.items.set(id, { ...item, quantity: qty });
    this.emit({ type: "update", dessertId: id });
  }

  getItems() {
    return [...this.items.values()];
  }

  getTotal() {
    return this.getItems()
      .reduce((s, i) => s + i.quantity * i.dessert.price, 0);
  }

  getItemCount() {
    return this.getItems().reduce((sum, item) => sum + item.quantity, 0);
  }

  clear() {
    this.items.clear();
    // Emit remove events for all items
    for (const item of this.getItems()) {
      this.emit({ type: "remove", dessertId: item.dessert.id });
    }
  }

  get isEmpty() {
    return this.items.size === 0;
  }

  hasItem(id: string) {
    return this.items.has(id);
  }

  getItem(id: string) {
    return this.items.get(id);
  }

  subscribe(cb: (e: CartEvent) => void) {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  private emit(event: CartEvent) {
    this.listeners.forEach(cb => cb(event));
  }
}
