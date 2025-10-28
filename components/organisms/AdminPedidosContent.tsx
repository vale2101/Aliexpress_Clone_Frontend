"use client";
import React, { useState, useEffect } from "react";
import { pedidoService } from "../../services/pedidoService";
import { Pedido } from "../../interfaces/pedido.interface";
import Text from "../atoms/Typography";
import { Package, Calendar, User, DollarSign, Filter } from "lucide-react";

const AdminPedidosContent: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEstado, setSelectedEstado] = useState<string>("all");

  useEffect(() => {
    loadPedidos();
  }, []);

  const loadPedidos = async () => {
    try {
      setLoading(true);
      // This would need to be replaced with an admin endpoint that gets all orders
      // For now, we'll use a placeholder
      // const data = await pedidoService.getAll(); // This endpoint needs to exist
      setPedidos([]); // Placeholder
    } catch (error) {
      console.error("Error loading pedidos:", error);
    } finally {
      setLoading(false);
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado.toLowerCase()) {
      case "pendiente":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "pagado":
      case "en proceso":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "enviado":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "completado":
      case "entregado":
        return "bg-green-100 text-green-800 border-green-300";
      case "cancelado":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const formatDate = (fecha: string) => {
    const date = new Date(fecha);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const filteredPedidos = selectedEstado === "all" 
    ? pedidos 
    : pedidos.filter(p => p.estado.toLowerCase() === selectedEstado.toLowerCase());

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Text variant="title" className="font-bold text-gray-900 mb-2">
            Gestión de Pedidos
          </Text>
          <Text variant="body" className="text-gray-600">
            Administra todos los pedidos del sistema
          </Text>
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={selectedEstado}
            onChange={(e) => setSelectedEstado(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="all">Todos los pedidos</option>
            <option value="pendiente">Pendiente</option>
            <option value="pagado">Pagado</option>
            <option value="en proceso">En proceso</option>
            <option value="enviado">Enviado</option>
            <option value="completado">Completado</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-5 h-5 text-gray-500" />
            <Text variant="small" className="text-gray-600">
              Total
            </Text>
          </div>
          <Text variant="subtitle" className="font-bold text-2xl text-gray-900">
            {pedidos.length}
          </Text>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-5 h-5 text-yellow-500" />
            <Text variant="small" className="text-gray-600">
              Pendientes
            </Text>
          </div>
          <Text variant="subtitle" className="font-bold text-2xl text-yellow-600">
            {pedidos.filter(p => p.estado.toLowerCase() === "pendiente").length}
          </Text>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-5 h-5 text-blue-500" />
            <Text variant="small" className="text-gray-600">
              Enviados
            </Text>
          </div>
          <Text variant="subtitle" className="font-bold text-2xl text-blue-600">
            {pedidos.filter(p => p.estado.toLowerCase().includes("enviado")).length}
          </Text>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-5 h-5 text-green-500" />
            <Text variant="small" className="text-gray-600">
              Completados
            </Text>
          </div>
          <Text variant="subtitle" className="font-bold text-2xl text-green-600">
            {pedidos.filter(p => p.estado.toLowerCase().includes("completado")).length}
          </Text>
        </div>
      </div>

      {/* Orders list */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {filteredPedidos.length === 0 ? (
          <div className="p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <Text variant="subtitle" className="text-gray-500 mb-2">
              No hay pedidos disponibles
            </Text>
            <Text variant="body" className="text-gray-400">
              Los pedidos aparecerán aquí cuando se realicen compras
            </Text>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredPedidos.map((pedido) => (
              <div key={pedido.id_pedido} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Text variant="subtitle" className="font-bold text-gray-900">
                        Pedido #{pedido.id_pedido}
                      </Text>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getEstadoColor(pedido.estado)}`}
                      >
                        {pedido.estado}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>Usuario #{pedido.id_usuario}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(pedido.fecha_pedido)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Text variant="small" className="text-gray-500 mb-1">
                      Total
                    </Text>
                    <Text variant="subtitle" className="font-bold text-2xl text-orange-500">
                      ${pedido.total}
                    </Text>
                  </div>
                </div>

                {pedido.productos && pedido.productos.length > 0 && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <Text variant="small" className="text-gray-600 mb-3 block">
                      Productos ({pedido.productos.length})
                    </Text>
                    <div className="flex gap-3 overflow-x-auto">
                      {pedido.productos.map((producto, index) => (
                        <div key={index} className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-200 min-w-[200px]">
                          <img
                            src={producto.imagen || "/placeholder.jpg"}
                            alt={producto.nombre}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <Text variant="body" className="text-sm font-medium text-gray-900 truncate">
                              {producto.nombre}
                            </Text>
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <span>Cant: {producto.cantidad}</span>
                              <span>·</span>
                              <span className="text-orange-500 font-medium">
                                ${producto.precio}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPedidosContent;

