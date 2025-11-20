import { useContext } from "react";
import { CartContext } from "../context/cart-context";

export function useCartContext() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCartContext deve ser usado dentro de um <CartProvider>"
    );
  }

  return context;
}