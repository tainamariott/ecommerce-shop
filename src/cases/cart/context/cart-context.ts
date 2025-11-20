import { createContext } from "react";
import type { CartItem } from "../hooks/use-cart";

export interface CartContextProps {
  cart: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextProps>(
  {} as CartContextProps
);