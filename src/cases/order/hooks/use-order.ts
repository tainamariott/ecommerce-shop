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

export function useOrdersEntregues(idUser: string) {
    return useQuery<OrderDTO[]>({
        queryKey: ['orders-entregues', idUser],
        queryFn: () => OrderService.listOrdersEntregues(idUser),
        enabled: !!idUser // evita chamar antes de existir user
    });
}

export function useCreateOrder() {
    return useMutation<OrderDTO, Error, Omit<OrderDTO, 'id'>>({
        mutationFn: (order) => OrderService.create(order)
    });
}

export function useOrdersCustommer(idUser: string) {
    return useQuery<OrderDTO[]>({
        queryKey: ['orders-user', idUser],
        queryFn: () => OrderService.listOrderCustommer(idUser),
        enabled: !!idUser 
    });
}