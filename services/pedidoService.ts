import { ENV } from "../config/env";
import { CrearPedidoDTO } from "../interfaces/pedido.interface";

const API_URL = ENV.API_URL;

export const pedidoService = {
  async crearPedido(data: CrearPedidoDTO): Promise<{ success: boolean; id_pedido?: number }> {
    try {
      const response = await fetch(`${API_URL}/pedido/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || result.error || "Error al crear el pedido");
      }

      return {
        success: true,
        id_pedido: result.id_pedido,
      };
    } catch (error) {
      console.error("❌ Error en pedidoService.crearPedido:", error);
      return { success: false };
    }
  },

  async getByUser(id_usuario: number): Promise<any[]> {
    try {
      const response = await fetch(`${API_URL}/pedido/user/${id_usuario}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || result.error || "Error al obtener pedidos");
      }

      return result.data || result.pedidos || [];
    } catch (error) {
      console.error("❌ Error en pedidoService.getByUser:", error);
      return [];
    }
  },
};