import React from "react";

const CategoriesBar: React.FC = () => {
  const items = [
    "Packs de ofertas",
    "Choice",
    "SuperOfertas",
    "AliExpress Business",
    "Telefonía y comunicación",
    "Accesorios",
    "Bisutería y relojes",
    "Más",
  ];

  return (
    <div className="w-full border-b bg-white">
      <div className="container-xl flex items-center gap-6 h-12">
        {/* Botón: Todas las categorías */}
        <button className="flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm hover:bg-gray-50 whitespace-nowrap">
          <span className="text-xl">☰</span>
          <span>Todas las categorías</span>
          <span className="text-xs">▼</span>
        </button>

        {/* Links (una sola línea, sin cortes) */}
        <nav className="flex flex-1 items-center gap-8 lg:gap-10 xl:gap-12 text-sm font-medium text-gray-800 whitespace-nowrap overflow-x-auto no-scrollbar">
          {items.map((item) => (
            <a
              key={item}
              href="#"
              className={`inline-flex items-center px-1 hover:text-orange-500 transition ${
                item === "Packs de ofertas" ? "text-red-500" : ""
              }`}
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default CategoriesBar;
