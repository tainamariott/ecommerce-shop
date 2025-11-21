import type { ProductDTO } from "@/cases/products/dtos/product.dto";


export interface OrderItemDTO {
    id?: string;
    product: ProductDTO;
    quantity: number;
    value: number;
}