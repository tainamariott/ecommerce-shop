import { useState, useEffect } from "react";
import { useProducts } from "../hooks/use-product";
import { ProductCard } from "./product-card";

import { useCategories } from "@/cases/categories/hooks/use-category";
import type { CategoryDTO } from "@/cases/categories/dtos/category.dto";

export default function ProductLayout() {
  const { data: products = [], isLoading } = useProducts();
  const { data: categories = [] } = useCategories();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // <-- campo de busca
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  if (isLoading) return <p>Carregando...</p>;

  const handleFilter = () => {
    let filtered = products;

    // filtro por categoria
    if (selectedCategory) {
      filtered = filtered.filter(
        (p) => p.category?.id?.toString() === selectedCategory
      );
    }

    // filtro por busca (nome do produto)
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        Catálogo de Produtos
      </h1>

      {/* Filtros */}
      <div className="flex items-end gap-4 mb-8">
        
        {/* Campo de busca */}
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">
            Buscar produto
          </label>

          <input
            type="text"
            placeholder="Digite o nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* Categoria */}
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">
            Categoria
          </label>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full border rounded-lg p-2"
          >
            <option value="">Todas</option>
            {categories.map((categoria: CategoryDTO) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleFilter}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Filtrar
        </button>
      </div>

      {/* Lista */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>Nenhum registro encontrado.</p>
        )}
      </div>
    </div>
  );
}
