import { CardTitle } from "@/components/ui/card"
import { OrderDataTable } from "./data-table/order-data-table"
import { Outlet, useNavigate } from "react-router-dom"
import { Package } from "lucide-react"
import { Button } from "@/components/ui/button"

export function OrderLayout() {

    const navigate = useNavigate()

    function handleGoToHistory() {
        navigate("/history") 
    }

    return (
        <div className="p-4">
            <div className="flex items-center justify-between pb-4">
                <div className="flex items-center gap-2">
                    <Package className="w-6 h-6 text-primary" />
                    <CardTitle className="text-2xl font-bold text-primary">
                        Meus Pedidos
                    </CardTitle>
                </div>
                <Button variant="outline" onClick={handleGoToHistory}>
                    Histórico de pedidos
                </Button>
            </div>
            <div className="flex flex-col gap-4">
                <OrderDataTable />
                <Outlet />
            </div>
        </div>
    )
}