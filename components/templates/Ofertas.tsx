import OfferSection from "../molecules/OfferSection";
import OffersCarousel from "../organisms/OffersCarousel"; // 👈 ajusta la ruta a donde tengas el archivo

export default function Ofertas() {
  return (
    <>
      {/* Secciones superiores */}
      <div className="mx-auto mt-8 grid max-w-7xl grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:grid-cols-3">
        <OfferSection
          title="Packs de ofertas"
          subtitle="3 desde 2,99$ US | -20% dto. Extra"
          type="packs"
          products={[
            { image: "/images/dragon.jpg", title: "Kawaii Anime Dragon Tamer desdentado", price: "$24.891,55", oldPrice: "$81.891,09", rating: 4.9, sold: "1.000+" },
            { image: "/images/kitty.jpg",  title: "Sanrio Hello Kitty funda de teléfono",  price: "$11.403,52", oldPrice: "$30.042,94", rating: 4.7, sold: "900+" },
            { image: "/images/kitty.jpg",  title: "Sanrio Hello Kitty funda de teléfono",  price: "$11.403,52", oldPrice: "$30.042,94", rating: 4.7, sold: "900+" },
            { image: "/images/kitty.jpg",  title: "Sanrio Hello Kitty funda de teléfono",  price: "$11.403,52", oldPrice: "$30.042,94", rating: 4.7, sold: "900+" },
          ]}
        />

        <OfferSection
          title="SuperOfertas"
          subtitle="Acaba en: 07:00:00"
          type="super"
          products={[
            { image: "/images/adapter.jpg", title: "Adaptador 2 en 1 Apple CarPlay", price: "$38.930,33", oldPrice: "$84.627,66", discount: "-54%" },
            { image: "/images/mantel.jpg",  title: "Mantel de cuero para el hogar",  price: "$10.438,37", oldPrice: "$58.235,19", discount: "-82%" },
          ]}
        />

        <OfferSection
          title="Big Save"
          subtitle="+500 Marcas"
          type="big"
          products={[
            { image: "/images/ulanzi.jpg", title: "Ulanzi AS-D30 Softbox",         price: "$90.545,76", oldPrice: "$240.051,26", discount: "Ahorras $149.505,50" },
            { image: "/images/bzdoll.jpg", title: "BZDOLL Muñeca Reborn realista", price: "$207.901,77", oldPrice: "$562.113,84", discount: "Ahorras $354.212,07" },
          ]}
        />
      </div>

      {/* Carrusel de “Ofertas de hoy” ABAJO */}
      <OffersCarousel />
    </>
  );
}
