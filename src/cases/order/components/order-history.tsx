import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { PackageSearch } from "lucide-react"
import { DataTable } from "@/components/ui/data-table"
import { orderColumns } from "./data-table/order-columns"
import { useCustomerByAuthId } from "@/cases/customers/hooks/use-customer"
import { useOrdersEntregues } from "../hooks/use-order"

export function OrderHistoryLayout() {
    const userStorage = localStorage.getItem("user");
    const user = userStorage ? JSON.parse(userStorage) : null;

    // carrega o customer pelo authId
    const { data: customer } = useCustomerByAuthId(user?.id);

    // carrega os pedidos entregues do customer
    const { data: orders, isLoading } = useOrdersEntregues(customer!.id!);

    return (
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
                            columns={orderColumns}
                            data={orders ?? []}
                        />
                    )}
                </CardContent>

            </Card>
        </div>
    )
}