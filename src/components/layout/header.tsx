import { ShoppingCart, Heart, Package, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CartSidebar } from "./cart-sidebar";

export function Header() {
    const navigate = useNavigate();

    function goToFavoritos() {
        navigate('/favoritos');
    }

    function goToPedidos() {
        navigate('/orders');
    }

    function handleLogout() {
        localStorage.removeItem("user");
        localStorage.removeItem("token"); // caso você use token
        navigate("/login"); // Redireciona para login
    }

    return (
        <header className="w-full bg-white shadow p-4">
            <div className="w-full flex items-center justify-between">

                <div className="flex items-center gap-3">
                    <div className="bg-black text-white flex w-8 h-8 items-center justify-center rounded-lg">
                        <ShoppingCart className="w-4 h-4" />
                    </div>

                    <div className="flex flex-col gap-0.5 leading-none">
                        <span className="font-medium">E-commerce SHOP</span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* FAVORITOS */}
                    <button onClick={goToFavoritos}>
                        <Heart className="w-6 h-6 hover:text-red-500 transition" />
                    </button>

                    {/* PEDIDOS */}
                    <button onClick={goToPedidos}>
                        <Package className="w-6 h-6 hover:text-blue-600 transition" />
                    </button>

                    {/* Carrinho */}
                    <CartSidebar />

                    {/* SAIR */}
                    <button
                        onClick={handleLogout}
                        className="hover:text-red-600 transition"
                        title="Sair"
                    >
                        <LogOut className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </header>
    );
}