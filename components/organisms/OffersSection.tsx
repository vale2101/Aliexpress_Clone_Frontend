import OfferSection from "./OfferSection";

export default function OffersSection() {
  return (
    <>
      {/* Secciones superiores */}
      <div className="bg-white py-8">
        <div className="max-w-full mx-auto px-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <OfferSection
          title="Packs de ofertas"
          subtitle="3 desde 2,99$ US | -20% dto. Extra"
          type="packs"
          products={[
            { image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&crop=center", title: "Kawaii Anime Dragon Tamer desdentado", price: "$24.891,55", oldPrice: "$81.891,09", rating: 4.9, sold: "1.000+" },
            { image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300&h=300&fit=crop&crop=center", title: "Sanrio Hello Kitty funda de teléfono", price: "$11.403,52", oldPrice: "$30.042,94", rating: 4.7, sold: "900+" },
            { image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop&crop=center", title: "Pulsera de plata con perlas", price: "$8.500,00", oldPrice: "$15.000,00", rating: 4.5, sold: "500+" },
            { image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop&crop=center", title: "Ratón gaming RGB", price: "$12.000,00", oldPrice: "$25.000,00", rating: 4.6, sold: "300+" },
            { image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop&crop=center", title: "Cámara de seguridad", price: "$45.000,00", oldPrice: "$80.000,00", rating: 4.4, sold: "200+" },
            { image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&h=300&fit=crop&crop=center", title: "Gafas de sol polarizadas", price: "$18.000,00", oldPrice: "$35.000,00", rating: 4.8, sold: "150+" },
          ]}
        />

        <OfferSection
          title="SuperOfertas"
          subtitle="Acaba en: 07:00:00"
          type="super"
          products={[
            { image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop&crop=center", title: "Adaptador 2 en 1 Apple CarPlay", price: "$38.930,33", oldPrice: "$84.627,66", discount: "-54%", rating: 4.9, sold: "1.000+" },
            { image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop&crop=center", title: "Mantel de cuero para el hogar", price: "$10.438,37", oldPrice: "$58.235,19", discount: "-82%", rating: 4.9, sold: "1.000+" },
            { image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300&h=300&fit=crop&crop=center", title: "Smartwatch deportivo", price: "$89.500,00", oldPrice: "$150.000,00", discount: "-40%", rating: 4.9, sold: "1.000+" },
            { image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop&crop=center", title: "Teclado mecánico RGB", price: "$45.000,00", oldPrice: "$80.000,00", discount: "-44%", rating: 4.9, sold: "1.000+" },
            { image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop&crop=center", title: "Aspiradora robot", price: "$120.000,00", oldPrice: "$200.000,00", discount: "-40%", rating: 4.9, sold: "1.000+" },
            { image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&h=300&fit=crop&crop=center", title: "Auriculares inalámbricos", price: "$35.000,00", oldPrice: "$60.000,00", discount: "-42%" , rating: 4.9, sold: "1.000+"},
          ]}
        />

        <OfferSection
          title="Big Save"
          subtitle="+500 Marcas"
          type="big"
          products={[
            { image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop&crop=center", title: "Ulanzi AS-D30 Softbox", price: "$90.545,76", oldPrice: "$240.051,26", discount: "Ahorras $149.505,50", rating: 4.9, sold: "1.000+" },
            { image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop&crop=center", title: "BZDOLL Muñeca Reborn realista", price: "$207.901,77", oldPrice: "$562.113,84", discount: "Ahorras $354.212,07" , rating: 4.9, sold: "1.000+"},
            { image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300&h=300&fit=crop&crop=center", title: "Cámara profesional DSLR", price: "$450.000,00", oldPrice: "$800.000,00", discount: "Ahorras $350.000,00", rating: 4.9, sold: "1.000+" },
            { image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop&crop=center", title: "Laptop gaming RTX 4060", price: "$1.200.000,00", oldPrice: "$2.000.000,00", discount: "Ahorras $800.000,00", rating: 4.9, sold: "1.000+" },
            { image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop&crop=center", title: "Smartphone flagship", price: "$600.000,00", oldPrice: "$1.000.000,00", discount: "Ahorras $400.000,00" , rating: 4.9, sold: "1.000+"},
            { image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&h=300&fit=crop&crop=center", title: "Tablet profesional", price: "$350.000,00", oldPrice: "$600.000,00", discount: "Ahorras $250.000,00" , rating: 4.9, sold: "1.000+"},
          ]}
        />
          </div>
        </div>
      </div>
    </>
  );
}
