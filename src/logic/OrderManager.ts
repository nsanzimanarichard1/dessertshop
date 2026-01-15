import  type { CartItem } from "../types/cart";
import type { OrderStatus } from "../types/shared";

export interface Order {
  id: string;
  items: CartItem[];
  status: OrderStatus;
  createdAt: Date;
}

export class OrderManager {
  private orders: Order[] = [];

  createOrder(items: CartItem[]): Order {
    const order: Order = {
      id: crypto.randomUUID(),
      items,
      status: "pending",
      createdAt: new Date(),
    };

    this.orders.push(order);
    return order;
  }

  confirmOrder(id: string) {
    const order = this.orders.find(o => o.id === id);
    if (order) order.status = "paid";
  }

  getOrder(id: string) {
    return this.orders.find(o => o.id === id);
  }

  getAllOrders() {
    return [...this.orders];
  }
}
