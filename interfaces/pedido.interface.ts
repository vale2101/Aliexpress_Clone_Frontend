export interface ProductoPedido {
  id_producto: number;
  cantidad: number;
}

export interface CrearPedidoDTO {
  id_usuario: number;
  id_direccion: number;
  productos: ProductoPedido[];
}