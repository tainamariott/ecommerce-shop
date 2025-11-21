import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./cases/auth/components/login";
import Register from "./cases/auth/components/register";
import ProductLayout from "./cases/products/components/product-layout";
import { Header } from "./components/layout/header";
import { PublicRoute } from "./cases/auth/guards/public-route";
import { ProtectedRoute } from "./cases/auth/guards/protected-route";
import { CartProvider } from "./cases/cart/context/cart-provider";
import "react-toastify/dist/ReactToastify.css";
import { AccountLayout } from "./cases/account/components/account-layout";
import { FavoritesProvider } from "./cases/favorites/favorites-provider";
import { FavoriteLayout } from "./cases/favorites/components/favorite-layout";
import { OrderLayout } from "./cases/order/components/order-layout";
import { OrderHistoryLayout } from "./cases/order/components/order-history";

function App() {
    const location = useLocation();
    const isLoginPage = location.pathname === "/login" || location.pathname === "/register";
    const token = JSON.parse(localStorage.getItem("user")!)?.token;

    return (
        <FavoritesProvider>
            <CartProvider>
                <div className="wrapper">
                    {!isLoginPage && <Header />}

                    <main>
                        <Routes>
                            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                            <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
                            <Route path="/products" element={<ProtectedRoute><ProductLayout /></ProtectedRoute>} />
                            <Route path="/account" element={<ProtectedRoute><AccountLayout /></ProtectedRoute>} />
                            <Route path="/orders" element={<ProtectedRoute><OrderLayout /></ProtectedRoute>} />
                            <Route path="/history" element={<ProtectedRoute><OrderHistoryLayout /></ProtectedRoute>} />
                            <Route path="/favoritos" element={<ProtectedRoute><FavoriteLayout /></ProtectedRoute>} />
                            <Route path="*" element={<Navigate to={token ? "/products" : "/login"} replace />} />
                        </Routes>
                    </main>

                    <ToastContainer />
                </div>
            </CartProvider>
        </FavoritesProvider>
    );
}

export default App;