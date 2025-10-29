"use client";
import React, { useState, useEffect } from "react";
import { productService } from "../../services/productService";
import { ProductoInterface } from "../../interfaces/product.interface";
import { useAuth } from "../../hooks/useAuth";
import Text from "../atoms/Typography";
import Button from "../atoms/Button";
import { Plus } from "lucide-react";
import ProductRow from "../molecules/ProductRow";
import SearchBar from "../molecules/SearchBar";
import StatsCard from "../molecules/StatsCard";
import LoadingSpinner from "../molecules/LoadingSpinner";
import EmptyState from "../molecules/EmptyState";
import ProductFormModal from "./ProductFormModal";

const AdminProductosContent: React.FC = () => {
  const { user } = useAuth();
  const [productos, setProductos] = useState<ProductoInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  useEffect(() => {
    if (user?.id_usuario) {
      loadProductos();
    }
  }, [user?.id_usuario]);

  const loadProductos = async () => {
    try {
      setLoading(true);
      const data = await productService.getAll();
      
      console.log("🔍 Todos los productos de la API:", data);
      console.log("🔍 Usuario autenticado:", user);
      console.log("🔍 ID del usuario:", user?.id_usuario);
      
      // Filtrar solo los productos del usuario autenticado
      if (user?.id_usuario) {
        console.log("🔍 Filtrando productos con id_usuario =", user.id_usuario);
        
        const userProducts = data.filter(producto => {
          console.log(`🔍 Producto ${producto.id_producto}: id_usuario = ${producto.id_usuario}, coincide = ${producto.id_usuario === user.id_usuario}`);
          return producto.id_usuario === user.id_usuario;
        });
        
        setProductos(userProducts);
        console.log(`🔍 Productos filtrados para usuario ${user.id_usuario}:`, userProducts.length, "productos");
        console.log("🔍 Productos filtrados:", userProducts);
      } else {
        console.log("❌ No hay usuario autenticado");
        setProductos([]);
      }
    } catch (error) {
      console.error("Error loading productos:", error);
      setProductos([]);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleState = async (id: number) => {
    const producto = productos.find(p => p.id_producto === id);
    if (!producto) return;
    
    const isActive = producto.estado === "activo";
    const newEstado = isActive ? "inactivo" : "activo";
    const action = isActive ? "desactivar" : "activar";
    
    if (confirm(`¿Estás seguro de ${action} este producto?`)) {
      try {
        console.log(`Attempting to ${action} product with ID:`, id, "to estado:", newEstado);
        const success = await productService.changeState(id, newEstado);
        
        if (success) {
          console.log(`Product ${action} successfully`);
          alert(`Producto ${action} correctamente`);
          loadProductos();
        } else {
          console.error(`${action} operation returned false`);
          alert(`No se pudo ${action} el producto`);
        }
      } catch (error) {
        console.error(`Error ${action} producto:`, error);
        const errorMessage = error instanceof Error ? error.message : "Error desconocido";
        alert(`Error al ${action} el producto: ${errorMessage}`);
      }
    }
  };

  const filteredProductos = productos.filter(
    (producto) =>
      producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeProductos = productos.filter(p => p.estado === "activo");
  const inactiveProductos = productos.filter(p => p.estado === "inactivo");

  const handleOpenForm = () => {
    setIsFormModalOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormModalOpen(false);
  };

  const handleProductAdded = () => {
    loadProductos(); // Refresh the product list
  };

  if (loading) {
    return <LoadingSpinner />;
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
        <Button 
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg flex items-center gap-2"
          onClick={handleOpenForm}
        >
          <Plus className="w-5 h-5" />
          Nuevo Producto
        </Button>
      </div>

      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

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
                <EmptyState />
              ) : (
                filteredProductos.map((producto) => (
                  <ProductRow
                    key={producto.id_producto}
                    producto={producto}
                    onEdit={(id) => console.log("Edit:", id)}
                    onToggleState={handleToggleState}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatsCard title="Total de Productos" value={productos.length} />
        <StatsCard title="Activos" value={activeProductos.length} color="text-green-600" />
        <StatsCard title="Inactivos" value={inactiveProductos.length} color="text-red-600" />
      </div>

      {/* Product Form Modal */}
      <ProductFormModal
        isOpen={isFormModalOpen}
        onClose={handleCloseForm}
        onProductAdded={handleProductAdded}
      />
    </div>
  );
};

export default AdminProductosContent;

