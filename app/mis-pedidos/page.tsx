"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { pedidoService } from "../../services/pedidoService";
import { Pedido } from "../../interfaces/pedido.interface";
import Breadcrumb from "../../components/molecules/Breadcrumb";
import SidebarCuenta from "../../components/organisms/SidebarCuenta";
import Text from "../../components/atoms/Typography";
import Button from "../../components/atoms/Button";
import { Package, Eye, Calendar } from "lucide-react";
import Link from "next/link";

export default function MisPedidosPage() {
  const { user, isAuthenticated } = useAuth();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPedidos = async () => {
      if (!user || !isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        const pedidosData = await pedidoService.getByUser(user.id_usuario);
        setPedidos(pedidosData);
      } catch (error) {
        console.error("Error al obtener pedidos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, [user, isAuthenticated]);

  const breadcrumbItems = [
    { label: "Inicio", href: "/" },
    { label: "Mi cuenta", href: "/cuenta" },
    { label: "Mis pedidos" }
  ];

  const getEstadoColor = (estado: string) => {
    switch (estado.toLowerCase()) {
      case "pendiente":
        return "bg-yellow-500";
      case "pagado":
      case "en proceso":
        return "bg-blue-500";
      case "enviado":
        return "bg-purple-500";
      case "completado":
      case "entregado":
        return "bg-green-500";
      case "cancelado":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatDate = (fecha: string) => {
    const date = new Date(fecha);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const renderOrderCard = (pedido: Pedido) => (
    <div key={pedido.id_pedido} className="bg-white rounded-lg border border-gray-200 mb-6 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        {/* Badge de estado */}
        <div className="mb-4">
          <span className={`px-3 py-1 rounded-md text-white text-sm font-medium ${getEstadoColor(pedido.estado)}`}>
            {pedido.estado}
          </span>
        </div>

        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <Text variant="subtitle" className="font-bold mb-2">
              Pedido #{pedido.id_pedido}
            </Text>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(pedido.fecha_pedido)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Productos del pedido */}
        <div className="space-y-4 mb-4">
          {pedido.productos && pedido.productos.length > 0 ? (
            pedido.productos.map((producto, index) => (
              <div key={index} className="flex gap-4 items-center bg-gray-50 p-3 rounded-lg">
                <img
                  src={producto.imagen || "/placeholder.jpg"}
                  alt={producto.nombre}
                  className="w-28 h-28 object-cover rounded-lg border-2 border-white"
                />
                <div className="flex-1">
                  <Text variant="body" className="font-medium mb-1 text-gray-900">
                    {producto.nombre}
                  </Text>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>Cantidad: {producto.cantidad}</span>
                    <span className="text-orange-500 font-bold text-base">
                      ${producto.precio * producto.cantidad}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center gap-3 text-gray-500">
              <Package className="w-5 h-5" />
              <Text variant="body">No hay productos disponibles</Text>
            </div>
          )}
        </div>

        {/* Total y acciones */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <div className="flex items-baseline gap-4">
            <div>
              <Text variant="small" className="text-gray-500 block mb-1">
                Total del pedido
              </Text>
              <Text variant="subtitle" className="font-bold text-2xl text-orange-500">
                ${pedido.total}
              </Text>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md flex items-center gap-2 font-medium"
              onClick={() => window.location.href = `/pedidos/${pedido.id_pedido}`}
            >
              <Eye className="w-4 h-4" />
              Ver detalles
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="flex">
        <SidebarCuenta />
        
        <div className="flex-1 p-6">
          <div className="mb-6">
            <Text variant="title" className="font-bold text-2xl mb-2">
              Mis Pedidos
            </Text>
            <Text variant="body" className="text-gray-600">
              Revisa el estado de todos tus pedidos
            </Text>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                <Text variant="body" className="text-gray-600">
                  Cargando pedidos...
                </Text>
              </div>
            </div>
          ) : !isAuthenticated || !user ? (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <Text variant="title" className="font-bold mb-2">
                Inicia sesión para ver tus pedidos
              </Text>
              <Text variant="body" className="text-gray-600 mb-6">
                Necesitas estar autenticado para acceder a tus pedidos
              </Text>
              <Link href="/user">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  Iniciar sesión
                </Button>
              </Link>
            </div>
          ) : pedidos.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <Text variant="title" className="font-bold mb-2">
                No tienes pedidos
              </Text>
              <Text variant="body" className="text-gray-600 mb-6">
                Cuando realices tu primera compra, aparecerá aquí
              </Text>
              <Link href="/">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  Comenzar a comprar
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {pedidos.map(renderOrderCard)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

