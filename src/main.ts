import "./style.css";
import { desserts } from "./data/dessertData";
import { ShoppingCart } from "./logic/ShoppingCart";
import { OrderManager } from "./logic/OrderManager";
import { DessertGrid } from "./components/DessertGrid";
import { CartPanel } from "./components/CartPanel";

const cart = new ShoppingCart();
const orderManager = new OrderManager();

const app = document.querySelector("#app")!;
app.className = "flex gap-10 p-10 bg-pink-100 min-h-screen";

app.appendChild(DessertGrid(desserts, cart));
app.appendChild(CartPanel(cart, orderManager));
