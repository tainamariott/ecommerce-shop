import { orderColumns } from "./order-columns";
import { useCustomerByAuthId } from "@/cases/customers/hooks/use-customer";
import { DataTable } from "@/components/ui/data-table";
import { useOrdersCustommer } from "../../hooks/use-order";

export function OrderDataTable() {

    const userStorage = localStorage.getItem("user");
    const user = userStorage ? JSON.parse(userStorage) : null;

    const { data: customer, isLoading: loadingCustomer } = useCustomerByAuthId(user?.id);

    const { data: orders, isLoading: loadingOrders } = useOrdersCustommer(customer?.id as string);

    console.log("id do customer:", customer?.id);
    console.log("Orders do customer:", orders);

    const isLoading = loadingCustomer || loadingOrders;

    return (
        <div>
            {isLoading ? (
                <p>Carregando...</p>
            ) : (
                <DataTable columns={orderColumns} data={orders ?? []} />
            )}
        </div>
    );
}