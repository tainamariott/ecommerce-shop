import type { ReactNode } from "react";
import { CartContext } from "./cart-context";
import { useCart } from "../hooks/use-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}