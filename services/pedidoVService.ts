import axios from "axios";
import { ENV } from "../config/env";
import { PedidoV } from "../interfaces/pedido.interface";

axios.defaults.withCredentials = true;

export const PedidoVService = {
  async getPedidosPorVendedor(idVendedor: number): Promise<PedidoV[]> {
    const response = await axios.get<PedidoV[]>(
      `${ENV.BACKEND_URL}/api/pedidoV/vendedor/${idVendedor}`,
      { withCredentials: true }
    );
    return response.data || [];
  },
};