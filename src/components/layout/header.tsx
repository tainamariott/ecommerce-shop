import { ShoppingCart, Heart, Package, LogOut, ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { CartSidebar } from "./cart-sidebar";

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/products";

  function goHome() {
    navigate("/products");
  }

  function goToFavoritos() {
    navigate("/favoritos");
  }

  function goToPedidos() {
    navigate("/orders");
  }

  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <header className="w-full bg-white shadow-sm px-6 py-4 border-b border-gray-200">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          {!isHome && (
            <button onClick={goHome} className="p-2 rounded-xl hover:bg-gray-100 transition">
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}

          <div className="flex items-center gap-3 cursor-pointer" onClick={goHome}>
            <div className="p-2 rounded-xl bg-black text-white flex items-center justify-center">
              <ShoppingCart className="w-5 h-5" />
            </div>

            <h1 className="font-semibold text-lg tracking-tight">E-commerce Shop</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={goToFavoritos}
            className="p-2 rounded-xl hover:bg-gray-100 transition flex items-center justify-center"
          >
            <Heart className="w-5 h-5" />
          </button>

          <button
            onClick={goToPedidos}
            className="p-2 rounded-xl hover:bg-gray-100 transition flex items-center justify-center"
          >
            <Package className="w-5 h-5" />
          </button>

          <CartSidebar />

          <button
            onClick={handleLogout}
            className="p-2 rounded-xl hover:bg-red-100 text-red-600 transition flex items-center justify-center"
            title="Sair"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
