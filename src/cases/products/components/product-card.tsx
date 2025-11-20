import { Card, CardContent } from "@/components/ui/card";
import { Tag, ShoppingCart, Heart } from "lucide-react";
import { useFavorites } from "../../favorites/hooks/use-favorites";
import { useCartContext } from "@/cases/cart/hooks/use-cart-context";
import type { ProductDTO } from "../dtos/product.dto";
;

interface ProductCardProps {
    product: ProductDTO;
}

export function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCartContext();
    const { toggleFavorite, isFavorite } = useFavorites();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = user?.id;

    const favorite = isFavorite(product.id!);

    function handleAddToCart() {
        addToCart({
            id: product.id!,
            name: product.name,
            price: product.price,
            userId: userId,
        });
    }

    return (
        <Card className="relative rounded-2xl shadow-md hover:shadow-lg transition-all">
            <CardContent className="p-4 flex flex-col gap-4">

                <button
                    onClick={() => toggleFavorite({
                        id: product.id!,
                        name: product.name,
                        idUser: userId,
                    })}
                    className="absolute top-3 right-3"
                >
                    <Heart
                        className={`w-6 h-6 transition ${favorite ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-400"
                            }`}
                    />
                </button>

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

                {/* Botão adicionar ao carrinho */}
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