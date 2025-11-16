// import { Navigate, Route, Routes } from "react-router-dom";
// import { ToastContainer } from "react-toastify";

// import ProductLayout from "./cases/products/components/product-layout";
// import "react-toastify/dist/ReactToastify.css";
// import { Header } from "./components/layout/header";
// import { CartProvider } from "./cases/cart/context/cart-provider";

// function App() {
//     return (
//         <CartProvider>
//             <div className="wrapper flex flex-col min-h-screen">

//                 <Header />

//                 <main className="flex-1">
//                     <Routes>
//                         <Route path="/" element={<Navigate to="/products" replace />} />
//                         <Route path="/products" element={<ProductLayout />} />
//                     </Routes>
//                 </main>

//                 <ToastContainer />
//             </div>
//         </CartProvider>
//     );
// }

// export default App;


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

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login" || location.pathname === "/register";
  const token = JSON.parse(localStorage.getItem("user")!)?.token;

  return (
    <CartProvider>
      <div className="wrapper">
        {!isLoginPage && <Header />}

        <main>
          <Routes>
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />

            <Route path="/register" element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } />

            <Route path="/products" element={
              <ProtectedRoute>
                <ProductLayout />
              </ProtectedRoute>
            } />

            <Route path="/account" element={
              <ProtectedRoute>
                <AccountLayout />
              </ProtectedRoute>
            } />

            <Route path="*" element={
              <Navigate to={token ? "/products" : "/login"} replace />
            } />
          </Routes>
        </main>

        <ToastContainer />
      </div>
    </CartProvider>
  );
}

export default App;