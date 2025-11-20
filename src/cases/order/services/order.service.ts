import { api } from "../../../lib/axios";
import type { OrderDTO } from "../dto/order.dto";

const _ENDPOINT = '/orders';

export const OrderService = {

    async list(): Promise<OrderDTO[]> {
        const result = await api.get(_ENDPOINT);
        return result.data;
    },

    async getById(id: string): Promise<OrderDTO> {
        const result = await api.get(`${_ENDPOINT}/${id}`);
        return result.data;
    },

    async create(order: Omit<OrderDTO, 'id'>): Promise<OrderDTO> {
        const response = await api.post("/orders", order);
        return response.data as OrderDTO;
    },

    async listOrderCustommer(idUser: string): Promise<OrderDTO[]> {
        const result = await api.get(`${_ENDPOINT}?customerId=${idUser}`);
        return result.data;
    },

    async listOrdersEntregues(idUser: string): Promise<OrderDTO[]> {
        const result = await api.get(`${_ENDPOINT}/entregues/${idUser}`);
        return result.data;
    }
};