import { ENV } from "../config/env";
const API_URL = ENV.API_URL;

import { AddressInterface } from "../interfaces/address.interface";

interface ApiResponse<T> {
  message?: string;
  error?: string;
  data?: T;
}

async function parseApiResponse<T>(response: Response): Promise<T> {
  const json: ApiResponse<T> = await response.json();
  if (!response.ok) {
    throw new Error(json.message || json.error || "Error en la respuesta del servidor");
  }
  return json.data as T;
}

export const addressService = {
  async getAllByUser(id_usuario: number): Promise<AddressInterface[]> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const response = await fetch(`${API_URL}/address/user/${id_usuario}`, {
        method: "GET",
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const direcciones = await parseApiResponse<AddressInterface[]>(response);
      return Array.isArray(direcciones) ? direcciones : [];
    } catch (error) {
      console.error("❌ Error en addressService.getAllByUser:", error);
      return [];
    }
  },

  async create(address: AddressInterface): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/address/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(address),
      });

      await parseApiResponse<null>(response);
      return true;
    } catch (error) {
      console.error("❌ Error en addressService.create:", error);
      return false;
    }
  },

  async update(id_direccion: number, address: Omit<AddressInterface, "id_direccion" | "id_usuario">): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/address/update/${id_direccion}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(address),
      });

      await parseApiResponse<null>(response);
      return true;
    } catch (error) {
      console.error("❌ Error en addressService.update:", error);
      return false;
    }
  },

  async delete(id_direccion: number): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/address/delete/${id_direccion}`, {
        method: "DELETE",
        headers: { Accept: "application/json" },
      });

      await parseApiResponse<null>(response);
      return true;
    } catch (error) {
      console.error("❌ Error en addressService.delete:", error);
      return false;
    }
  },
};