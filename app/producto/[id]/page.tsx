import ProductDetail from "../../../components/organisms/ProductDetail";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  return <ProductDetail />;
}
