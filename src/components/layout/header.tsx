import { ShoppingCart } from "lucide-react";

export function Header() {
  return (
    <header className="w-full bg-gray-100 shadow p-4">
      <div className="flex items-center gap-3">

        {/* Ícone quadrado */}
        <div
          className="bg-sidebar-primary text-sidebar-foreground 
          flex aspect-square size-8 items-center justify-center rounded-lg"
        >
          <ShoppingCart className="text-white size-4" />
        </div>

        {/* Título */}
        <div className="flex flex-col gap-0.5 leading-none">
          <span className="font-medium">E-commerce Shop</span>
        </div>

      </div>
    </header>
  );
}
