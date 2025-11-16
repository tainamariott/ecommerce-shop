import { ShoppingCart } from "lucide-react";
import { CartSidebar } from "./cart-sidebar";

export function Header() {
  return (
    <header className="w-full bg-white shadow p-4">
      <div className="w-full flex items-center justify-between">

        {/* Esquerda */}
        <div className="flex items-center gap-3">
          <div className="bg-black text-white flex w-8 h-8 items-center justify-center rounded-lg">
            <ShoppingCart className="w-4 h-4" />
          </div>

          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-medium">E-commerce CMS</span>
          </div>
        </div>

        {/* Direita — Sidebar do carrinho */}
        <CartSidebar />
      </div>
    </header>
  );
}
