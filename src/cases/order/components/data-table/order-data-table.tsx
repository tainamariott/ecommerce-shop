import { orderColumns } from "./order-columns";
import { useCustomerByAuthId } from "@/cases/customers/hooks/use-customer";
import { DataTable } from "@/components/ui/data-table";
import type { OrderDTO } from "../../dto/order.dto";
import { useOrdersCustommer } from "../../hooks/use-order";

export function OrderDataTable() {
    const userStorage = localStorage.getItem("user");
    const user = userStorage ? JSON.parse(userStorage) : null;
    const { data: customer, isLoading: loadingCustomer } = useCustomerByAuthId(user?.id);
    const { data: orders, isLoading: loadingOrders } = useOrdersCustommer(customer?.id as string);

    const isLoading = loadingCustomer || loadingOrders;

    const openRatingSidebar = (order: OrderDTO) => {
        console.log("Abrir sidebar para avaliar:", order);
    };

    return (
        <div>
            {isLoading ? (
                <p>Carregando...</p>
            ) : (
                <DataTable 
                    columns={orderColumns(openRatingSidebar)} 
                    data={orders ?? []}
                />
            )}
        </div>
    );
}