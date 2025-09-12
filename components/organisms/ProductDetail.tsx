"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { productService, Product } from "../../services/productService";
import ProductImageGallery from "../molecules/ProductImageGallery";
import ProductInfo from "../molecules/ProductInfo";
import PurchaseSidebar from "../molecules/PurchaseSidebar";
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
      id: "reviews",
      label: "Valoraciones (1998)",
      content: (
        <div className="space-y-6">
          {/* Resumen de reseñas */}
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold text-gray-900">4.8</div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-xl">★</span>
              ))}
            </div>
            <div className="text-sm text-gray-600">
              1992 calificaciones ✅ Todo desde compras verificadas
            </div>
          </div>

          {/* Filtros de reseñas */}
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm">
              Todas las valoraciones
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
              </svg>
              (292)
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm flex items-center gap-1">
              <span className="text-sm">🇨🇴</span>
              (8)
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
              </svg>
              (15)
            </button>
          </div>

          {/* Reseñas destacadas */}
          <div className="space-y-2">
            <div className="text-sm text-gray-600">
              "thank you very much to the seller for the excellent product and fast delivery (315)"
            </div>
            <div className="text-sm text-gray-600">
              "positivo (284)"
            </div>
          </div>

          {/* Reseña individual */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-pink-200 rounded-full flex items-center justify-center">
                <span className="text-pink-600 font-medium">U</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium">Color:Bitcoin</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-sm">★</span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  Todo está genial. El producto me llegó intacto.
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>Ordenar por defecto</span>
                  <span>Mostrar idioma original</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "details",
      label: "Detalles",
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
      id: "store",
      label: "Tienda",
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
            <div>
              <h3 className="font-semibold text-gray-900">Shop1103743899 Store</h3>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
                <span className="text-sm text-gray-600">4.2</span>
                <span className="text-sm text-gray-600">100K+ vendido(s)</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "related",
      label: "Te podría interesar",
      content: (
        <RelatedProducts currentProductId={product.id_producto} />
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Productos", href: "/" },
            { label: product.nombre }
          ]}
        />

        {/* Contenido principal - Layout de AliExpress */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Galería de imágenes - 1/3 del ancho */}
            <div className="lg:col-span-1">
              <ProductImageGallery
                images={productImages}
                alt={product.nombre}
              />
            </div>

            {/* Información del producto - 1/3 del ancho */}
            <div className="lg:col-span-1">
              <ProductInfo
                title={product.nombre}
                price={product.precio}
                originalPrice={product.precio_original}
                currency={product.moneda}
                discount={product.descuento}
                rating={4.5}
                reviewCount={128}
                soldCount={500}
                storeName="Tienda AliExpress"
                badges={product.descuento ? [`-${product.descuento}%`] : []}
                description={product.descripcion}
              />
            </div>

            {/* Sidebar de compra - 1/3 del ancho */}
            <div className="lg:col-span-1">
              <PurchaseSidebar
                productId={product.id_producto}
                price={product.precio}
                currency={product.moneda}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
                onShare={handleShare}
                onContact={handleContact}
              />
            </div>
          </div>
        </div>

        {/* Tabs de información adicional */}
        <div className="mt-6 bg-white rounded-lg shadow-sm">
          <div className="px-6">
            <ProductTabs tabs={tabs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
