import React from "react";
import Breadcrumb from "../molecules/Breadcrumb";
import PedidoDetailHeader from "../molecules/PedidoDetailHeader";
import PedidoProductList from "../molecules/PedidoProductList";
import PedidoSummary from "../molecules/PedidoSummary";
import { Pedido } from "../../interfaces/pedido.interface";

interface PedidoDetailLayoutProps {
  pedido: Pedido;
}

const PedidoDetailLayout: React.FC<PedidoDetailLayoutProps> = ({ pedido }) => {
  const breadcrumbItems = [
    { label: "Inicio", href: "/" },
    { label: "Mis pedidos", href: "/mis-pedidos" },
    { label: `Pedido #${pedido.id_pedido}` }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="max-w-6xl mx-auto px-4 py-6">
        <PedidoDetailHeader
          idPedido={pedido.id_pedido}
          estado={pedido.estado}
          fechaPedido={pedido.fecha_pedido}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PedidoProductList productos={pedido.productos || []} />
          </div>

          <div className="lg:col-span-1">
            <PedidoSummary
              total={pedido.total}
              subtotal={pedido.total * 0.95}
              envio={pedido.total * 0.05}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PedidoDetailLayout;

