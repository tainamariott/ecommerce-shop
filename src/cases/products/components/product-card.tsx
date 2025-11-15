import { Card, CardContent } from "@/components/ui/card";
import { Tag } from "lucide-react";
import type { ProductDTO } from "../dtos/product.dto";


interface ProductCardProps {
  product: ProductDTO;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer">
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
      </CardContent>
    </Card>
  );
}