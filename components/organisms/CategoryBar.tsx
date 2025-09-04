import React from "react";

const items = [
  { label: "Packs de ofertas", href: "/ofertas" },
  { label: "Choice", href: "/choice" },
  { label: "SuperOfertas", href: "/superofertas" },
  { label: "AliExpress Business", href: "/business" },
  { label: "Informática y escuela", href: "/informatica" },
  { label: "Telefonía y comunicación", href: "/telefonia" },
  { label: "Accesorios", href: "/accesorios" },
  { label: "Bisutería y relojes", href: "/bisuteria" },
  { label: "Más", href: "/mas" },
];

const CategoriesBar: React.FC = () => {
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
          {items.map((it) => (
            <a
              key={it.label}
              href={it.href}
              className={`inline-flex items-center px-1 hover:text-orange-500 transition ${
                it.label === "Packs de ofertas" ? "text-red-500" : ""
              }`}
            >
              {it.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default CategoriesBar;
