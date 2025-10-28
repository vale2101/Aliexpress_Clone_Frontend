import { ENV } from "../config/env";
import { CrearPedidoDTO } from "../interfaces/pedido.interface";

const API_URL = ENV.API_URL;

export const pedidoService = {
  async crearPedido(data: CrearPedidoDTO): Promise<boolean> {
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
      if (!response.ok) {
        throw new Error(result.message || result.error || "Error al crear el pedido");
      }

      return true;
    } catch (error) {
      console.error("❌ Error en pedidoService.crearPedido:", error);
      return false;
    }
  },
};