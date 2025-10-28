export interface ProductoPedido {
  id_producto: number;
  nombre: string;
  imagen: string;
  precio: number;
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