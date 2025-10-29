export interface ProductoPedido {
  id_producto: number;
  nombre: string;
  imagen: string;
  precio: string; // Changed from number to string to match server response
  cantidad: number;
}

export interface Pedido {
  id_pedido: number;
  id_usuario: number;
  id_direccion: number;
  fecha_pedido: string;
  estado: string;
  total: number;
  productos: ProductoPedido[];
}

export interface CrearPedidoDTO {
  id_usuario: number;
  id_direccion: number;
  productos: {
    id_producto: number;
    cantidad: number;
  }[];
}


export interface PedidoV {
  id_pedido: number;
  comprador_id: number;
  comprador_nombre: string;
  id_direccion: number;
  fecha_pedido: string;
  estado: string;
  productos: ProductoPedido[];
  total: number;
}
