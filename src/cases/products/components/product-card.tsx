import { Card, CardContent } from "@/components/ui/card";
import { Tag, ShoppingCart } from "lucide-react";
import type { ProductDTO } from "../dtos/product.dto";
import { useCartContext } from "../../cart/hooks/use-cart-context";

interface ProductCardProps {
  product: ProductDTO;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCartContext();

  function handleAddToCart() {
    addToCart({
      id: product.id!,
      name: product.name,
      price: product.price,
    });
  }

  return (
    <Card className="rounded-2xl shadow-md hover:shadow-lg transition-all">
      <CardContent className="p-4 flex flex-col gap-4">

        {/* Informações */}
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-lg line-clamp-1">
            {product.name}
          </h2>

          {product.category && (
            <div className="flex items-center text-sm text-gray-500 gap-1">
              <Tag className="w-4 h-4" />
              {product.category.name}
            </div>
          )}

          {product.price !== undefined && (
            <p className="text-xl font-bold text-primary">
              R$ {product.price}
            </p>
          )}
        </div>

        {/* Botão verde */}
        <button
          onClick={handleAddToCart}
          className="
            mt-2 w-full flex items-center justify-center gap-2
            bg-green-600 text-white py-2 rounded-lg
            hover:bg-green-700 transition
          "
        >
          <ShoppingCart className="w-4 h-4" />
          Adicionar ao carrinho
        </button>
      </CardContent>
    </Card>
  );
}
