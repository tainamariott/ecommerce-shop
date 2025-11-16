import { useMutation, useQuery } from "@tanstack/react-query";
import type { OrderDTO } from "../dto/order.dto";
import { OrderService } from "../services/order.service";


export function useOrders() {
    return useQuery<OrderDTO[]>({
        queryKey: ['orders'],
        queryFn: OrderService.list
    });
}

export function useOrder(id: string) {
    return useQuery<OrderDTO>({
        queryKey: ['orders', id],
        queryFn: () => OrderService.getById(id),
        enabled: !!id
    });
}

export function useCreateOrder() {
    return useMutation<OrderDTO, Error, Omit<OrderDTO, 'id'>>({
        mutationFn: (order: Omit<OrderDTO, 'id'>) => OrderService.create(order)
    });
}