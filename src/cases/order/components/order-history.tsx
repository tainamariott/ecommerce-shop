import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { PackageSearch } from "lucide-react"
import { DataTable } from "@/components/ui/data-table"
import { orderColumns } from "./data-table/order-columns"
import { useCustomerByAuthId } from "@/cases/customers/hooks/use-customer"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useState } from "react"
import type { OrderDTO } from "../dto/order.dto"

import { useRateProduct } from "@/cases/products/hooks/use-product"
import { useOrdersEntregues } from "../hooks/use-order"
import type { OrderItemDTO } from "../dto/order-item.dto"
import { StarRating } from "@/components/layout/star-rating"

export function OrderHistoryLayout() {

    const userStorage = localStorage.getItem("user");
    const user = userStorage ? JSON.parse(userStorage) : null;
    const { data: customer } = useCustomerByAuthId(user?.id);

    const { data: orders, isLoading } = useOrdersEntregues(customer!.id!);

    const [isOpen, setIsOpen] = useState(false);

    const [selectedOrder, setSelectedOrder] = useState<OrderDTO>({} as OrderDTO);

    const openRatingSidebar = (order: OrderDTO) => {
        setSelectedOrder(order);
        setIsOpen(true);
    };

    const enrichedColumns = orderColumns(openRatingSidebar);

    const rateProduct = useRateProduct();

    const [localRatings, setLocalRatings] = useState<Record<string, number>>({});

    const handleRating = (productId: string, rating: number) => {
        setLocalRatings(prev => ({
            ...prev,
            [productId]: rating,
        }));

        // Chama API
        rateProduct.mutate(
            { productId, rating },
            {
                onSuccess: () => console.log("Avaliação salva!"),
                onError: (err) => console.error("Erro ao salvar", err),
            }
        );
    };


    return (
        <>
            <div className="p-4 w-full flex justify-center">
                <Card className="w-full max-w-5xl shadow-md rounded-2xl">

                    <CardHeader className="flex flex-row items-center gap-2 pb-2">
                        <PackageSearch className="w-6 h-6 text-primary" />
                        <CardTitle className="text-2xl font-bold text-primary">
                            Histórico de Pedidos
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        {isLoading ? (
                            <p>Carregando...</p>
                        ) : (
                            <DataTable
                                columns={enrichedColumns}
                                data={orders ?? []}
                            />
                        )}
                    </CardContent>

                </Card>
            </div>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetContent side="right" className="w-[400px] sm:w-[500px]">
                    <SheetHeader>
                        <SheetTitle className="text-xl font-bold">
                            Avaliar Produtos
                        </SheetTitle>
                    </SheetHeader>

                    {selectedOrder ? (
                        <div className="mt-6 space-y-4">
                            {selectedOrder.items?.map((item: OrderItemDTO) => (
                                <div
                                    key={item.id}
                                    className="border p-4 rounded-xl shadow-sm"
                                >
                                    <p className="font-semibold">{item.product.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                        Quantidade: {item.quantity}
                                    </p>
                                    <div className="mt-3">
                                        <StarRating
                                            value={localRatings[item.product.id!] ?? item.product.rating ?? 0}
                                            onChange={(rating) => handleRating(item.product.id!, rating)}
                                        />
                                    </div>

                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="mt-4 text-muted-foreground">Selecione um pedido</p>
                    )}
                </SheetContent>
            </Sheet>
        </>
    );
}