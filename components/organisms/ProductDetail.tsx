"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { productService, ProductoInterface } from "../../services/productService";
import ProductImageGallery from "../molecules/ProductImageGallery";
import ProductInfo from "../molecules/ProductInfo";
import PurchaseSidebar from "../molecules/PurchaseSidebar";
import ProductTabs from "../molecules/ProductTabs";
import Button from "../atoms/Button";
import Breadcrumb from "../molecules/Breadcrumb";
import ProductSkeleton from "../molecules/ProductSkeleton";
import RelatedProducts from "./RelatedProducts";
import AliExpressHeader from "./AliExpressHeader";
import CategoryBar from "./CategoryBar";

const ProductDetail: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<ProductoInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Obtener el ID del producto desde la URL
  const productId = params?.id ? Number(params.id) : null;

  const fetchProduct = useCallback(async () => {
    if (!productId || isNaN(productId)) {
      setError("ID de producto no válido");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await productService.getById(productId);
      if (!data) throw new Error("Producto no encontrado");
      setProduct(data);
    } catch (err) {
      console.error("❌ Error al cargar el producto:", err);
      setError("No se pudo cargar el producto. Intenta nuevamente.");
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleAddToCart = (productId: number, quantity: number, size?: string) => {
    console.log("🛒 Añadir al carrito:", { productId, quantity, size });
  };

  const handleAddToWishlist = (productId: number) => {
    console.log("💖 Añadir a favoritos:", productId);
  };

  const handleShare = (productId: number) => {
    console.log("🔗 Compartir producto:", productId);
  };

  const handleContact = (productId: number) => {
    console.log("📞 Contactar vendedor:", productId);
  };

  if (loading) return <ProductSkeleton />;

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-4">{error || "Producto no encontrado"}</p>
          <Button onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
        </div>
      </div>
    );
  }

  // ✅ Imágenes con fallback
  const productImages = product.imagen_url
    ? [product.imagen_url]
    : ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop&crop=center"];

  // ✅ Contenido de pestañas
  const tabs = [
    {
      id: "description",
      label: "Descripción",
      content: (
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed">
            {product.descripcionCom || product.descripcion || "Descripción no disponible."}
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700">
            {product.material && <li><strong>Material:</strong> {product.material}</li>}
            {product.color && <li><strong>Color:</strong> {product.color}</li>}
            {product.peso && <li><strong>Peso:</strong> {product.peso}</li>}
            {product.dimensiones && <li><strong>Dimensiones:</strong> {product.dimensiones}</li>}
            {product.estado && <li><strong>Estado:</strong> {product.estado}</li>}
            {product.fecha_publicacion && (
              <li><strong>Publicado el:</strong> {new Date(product.fecha_publicacion).toLocaleDateString()}</li>
            )}
          </ul>
        </div>
      ),
    },
    {
      id: "related",
      label: "Te podría interesar",
      content: <RelatedProducts currentProductId={product.id_producto ?? 0} />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AliExpressHeader />
      <CategoryBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb
          items={[
            { label: "Inicio", href: "/" },
            { label: "Productos", href: "/" },
            { label: product.nombre },
          ]}
        />

        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Imágenes */}
            <div className="lg:col-span-1">
              <ProductImageGallery images={productImages} alt={product.nombre} />
            </div>

            {/* Información del producto */}
            <div className="lg:col-span-1">
              <ProductInfo
                title={product.nombre}
                price={Number(product.precio)}
                originalPrice={Number(product.precio_original)}
                currency={product.moneda || "COP"}
                discount={product.descuento ? Number(product.descuento) : undefined}
                rating={4.5}
                reviewCount={128}
                soldCount={product.stock}
                storeName="Tienda AliExpress"
                badges={product.descuento ? [`-${product.descuento}%`] : []}
                description={product.descripcion}
              />
            </div>

            {/* Sidebar de compra */}
            <div className="lg:col-span-1">
              <PurchaseSidebar
                productId={product.id_producto ?? 0}
                price={Number(product.precio)}
                currency={product.moneda || "COP"}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
                onShare={handleShare}
                onContact={handleContact}
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 bg-white rounded-lg shadow">
          <div className="px-6">
            <ProductTabs tabs={tabs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
