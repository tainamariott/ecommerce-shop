import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import ProductLayout from "./cases/products/components/product-layout";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "./components/layout/header";

function App() {
  return (
    <div className="wrapper flex flex-col min-h-screen">

      <Header />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<ProductLayout />} />
        </Routes>
      </main>

      <ToastContainer />
    </div>
  );
}

export default App;
