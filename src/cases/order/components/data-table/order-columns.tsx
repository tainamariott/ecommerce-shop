import { type ColumnDef } from "@tanstack/react-table"
import { FormattedNumber, IntlProvider } from "react-intl";
import type { OrderDTO } from "../../dto/order.dto";

const statusMap: Record<string, { label: string; color: string }> = {
  NEW: { label: "Novo", color: "text-blue-500" },
  SEPARATION: { label: "Em separação", color: "text-yellow-500" },
  INVOINCED: { label: "Faturado", color: "text-indigo-500" },
  SHIPPED: { label: "Enviado", color: "text-cyan-500" },
  DELIVERED: { label: "Entregue", color: "text-green-600" },
  CANCELED: { label: "Cancelado", color: "text-red-500" },
};

export const orderColumns: ColumnDef<OrderDTO>[] = [
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => {
      const order = row.original
      return (
        <p>{order.id}</p>       
      )
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const order = row.original;
      const statusInfo = statusMap[order.status] || { label: order.status, color: "text-gray-500" };

      return <p className={`font-medium ${statusInfo.color}`}>{statusInfo.label}</p>;
    }
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      const order = row.original
      return (
        <p>
            <IntlProvider locale="pt-BR">
                <FormattedNumber value={order.total} style="currency" currency="BRL" />
            </IntlProvider>
        </p>       
      )
    }
  },
  {
    accessorKey: "createdAt",
    header: "Data",
    cell: ({ row }) => {
      const order = row.original;
      const createdAt = order.createdAt ? new Date(order.createdAt) : null;

      const formattedDate = createdAt
        ? new Intl.DateTimeFormat("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }).format(createdAt)
        : "—";

      return <p>{formattedDate}</p>;
    }
  }
];