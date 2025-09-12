"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { productService, Product } from "../../services/productService";
import ProductImageGallery from "../molecules/ProductImageGallery";
import ProductInfo from "../molecules/ProductInfo";
import ProductActions from "../molecules/ProductActions";
import ProductTabs from "../molecules/ProductTabs";
import Button from "../atoms/Button";
import Breadcrumb from "../atoms/Breadcrumb";
import ProductSkeleton from "../atoms/ProductSkeleton";
import RelatedProducts from "./RelatedProducts";

const ProductDetail: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const productId = params?.id ? parseInt(params.id as string) : null;

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const productData = await productService.getById(productId!);
      setProduct(productData);
    } catch (err) {
      setError("Error al cargar el producto");
      console.error("Error fetching product:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (productId: number, quantity: number, size?: string) => {
    console.log("Añadir al carrito:", { productId, quantity, size });
    // Aquí implementarías la lógica para añadir al carrito
  };

  const handleAddToWishlist = (productId: number) => {
    console.log("Añadir a favoritos:", productId);
    // Aquí implementarías la lógica para añadir a favoritos
  };

  const handleShare = (productId: number) => {
    console.log("Compartir producto:", productId);
    // Aquí implementarías la lógica para compartir
  };

  const handleContact = (productId: number) => {
    console.log("Contactar vendedor:", productId);
    // Aquí implementarías la lógica para contactar
  };

  if (loading) {
    return <ProductSkeleton />;
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || "Producto no encontrado"}</p>
          <Button onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
        </div>
      </div>
    );
  }

  // Generar imágenes de ejemplo (en un caso real vendrían del backend)
  const productImages = [
    `https://images.unsplash.com/photo-${1500000000000 + product.id_producto}?w=800&h=800&fit=crop`,
    `https://images.unsplash.com/photo-${1500000000001 + product.id_producto}?w=800&h=800&fit=crop`,
    `https://images.unsplash.com/photo-${1500000000002 + product.id_producto}?w=800&h=800&fit=crop`,
  ];

  // Tallas de ejemplo
  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];

  // Tabs de contenido
  const tabs = [
    {
      id: "description",
      label: "Descripción",
      content: (
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed">
            {product.descripcion || "Descripción detallada del producto no disponible."}
          </p>
          <div className="mt-6 space-y-4">
            <h4 className="font-semibold text-gray-900">Características principales:</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Material de alta calidad</li>
              <li>Diseño moderno y elegante</li>
              <li>Fácil de usar</li>
              <li>Garantía del fabricante</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "specifications",
      label: "Especificaciones",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-medium text-gray-900">Precio:</span>
              <span className="ml-2 text-gray-700">{product.moneda} {product.precio}</span>
            </div>
            <div>
              <span className="font-medium text-gray-900">Stock:</span>
              <span className="ml-2 text-gray-700">{product.stock} unidades</span>
            </div>
            <div>
              <span className="font-medium text-gray-900">Estado:</span>
              <span className="ml-2 text-gray-700 capitalize">{product.estado}</span>
            </div>
            <div>
              <span className="font-medium text-gray-900">Fecha de publicación:</span>
              <span className="ml-2 text-gray-700">
                {new Date(product.fecha_publicacion).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "reviews",
      label: "Reseñas",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">Las reseñas aparecerán aquí cuando estén disponibles.</p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Productos", href: "/" },
            { label: product.nombre }
          ]}
        />

        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Galería de imágenes */}
          <div>
            <ProductImageGallery
              images={productImages}
              alt={product.nombre}
            />
          </div>

          {/* Información del producto */}
          <div className="space-y-6">
            <ProductInfo
              title={product.nombre}
              price={product.precio}
              originalPrice={product.precio_original}
              currency={product.moneda}
              discount={product.descuento}
              rating={4.5} // Rating de ejemplo
              reviewCount={128} // Número de reseñas de ejemplo
              soldCount={500} // Vendidos de ejemplo
              storeName="Tienda AliExpress"
              badges={product.descuento ? [`-${product.descuento}%`] : []}
              description={product.descripcion}
            />

            <ProductActions
              productId={product.id_producto}
              availableSizes={availableSizes}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
              onShare={handleShare}
              onContact={handleContact}
            />
          </div>
        </div>

        {/* Tabs de información adicional */}
        <div className="mt-12 bg-white rounded-lg shadow-sm">
          <div className="px-6">
            <ProductTabs tabs={tabs} />
          </div>
        </div>

        {/* Productos relacionados */}
        <div className="mt-12">
          <RelatedProducts currentProductId={product.id_producto} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
