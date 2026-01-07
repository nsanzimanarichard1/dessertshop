export const DessertCategory = {
  Waffle: "Waffle",
  CremeBrulee: "CremeBrulee",
  Macaron: "Macaron",
  Tiramisu: "Tiramisu",
  Baklava: "Baklava",
  Pie: "Pie",
  Cake: "Cake",
  Brownie: "Brownie",
  PannaCotta: "PannaCotta",
} as const;

export type DessertCategory = typeof DessertCategory[keyof typeof DessertCategory];

export type OrderStatus = "pending" | "paid" | "cancelled";
export type Currency = "USD" | "EUR" | "RWF";
export type DessertId = string;
