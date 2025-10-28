"use client";
import React, { useState, useEffect } from "react";
import { productService } from "../../services/productService";
import { ProductoInterface } from "../../interfaces/product.interface";
import Text from "../atoms/Typography";
import Button from "../atoms/Button";
import { Edit, Trash2, Plus, Search } from "lucide-react";

const AdminProductosContent: React.FC = () => {
  const [productos, setProductos] = useState<ProductoInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadProductos();
  }, []);

  const loadProductos = async () => {
    try {
      setLoading(true);
      const data = await productService.getAll();
      setProductos(data);
    } catch (error) {
      console.error("Error loading productos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    
    if (confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        await productService.delete(id);
        loadProductos();
      } catch (error) {
        console.error("Error deleting producto:", error);
        alert("Error al eliminar el producto");
      }
    }
  };

  const filteredProductos = productos.filter(
    (producto) =>
      producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            Gestión de Productos
          </Text>
          <Text variant="body" className="text-gray-600">
            Administra todos los productos del sistema
          </Text>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Nuevo Producto
        </Button>
      </div>

      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Products table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProductos.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No hay productos disponibles
                  </td>
                </tr>
              ) : (
                filteredProductos.map((producto) => (
                  <tr key={producto.id_producto} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <img
                          src={producto.imagen_url || "/placeholder.jpg"}
                          alt={producto.nombre}
                          className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {producto.nombre}
                          </div>
                          <div className="text-sm text-gray-500">
                            {producto.categoria || "Sin categoría"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">
                        ${producto.precio}
                      </div>
                      {producto.precio_original && (
                        <div className="text-xs text-gray-500 line-through">
                          ${producto.precio_original}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {producto.stock} unidades
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          producto.estado === "activo"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {producto.estado || "Sin estado"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <Button
                          className="text-orange-600 hover:text-orange-800 p-2"
                          onClick={() => console.log("Edit:", producto.id_producto)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          className="text-red-600 hover:text-red-800 p-2"
                          onClick={() => handleDelete(producto.id_producto)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <Text variant="small" className="text-gray-600 mb-1">
            Total de Productos
          </Text>
          <Text variant="subtitle" className="font-bold text-2xl text-gray-900">
            {productos.length}
          </Text>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <Text variant="small" className="text-gray-600 mb-1">
            Activos
          </Text>
          <Text variant="subtitle" className="font-bold text-2xl text-green-600">
            {productos.filter(p => p.estado === "activo").length}
          </Text>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <Text variant="small" className="text-gray-600 mb-1">
            Inactivos
          </Text>
          <Text variant="subtitle" className="font-bold text-2xl text-red-600">
            {productos.filter(p => p.estado === "inactivo").length}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default AdminProductosContent;

