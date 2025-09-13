import React from "react";

export default function CategoriesGrid() {
  const categories = [
    { id: 1, name: "Informática y escuela", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400" },
    { id: 2, name: "Juguetes y juegos", image: "https://lingokids.com/wp-content/uploads/2020/04/shutterstock_329683400.jpg" },
    { id: 3, name: "Hogar y jardín", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400" },
    { id: 4, name: "Cabello y pelucas", image: "https://images.unsplash.com/photo-1522336572468-97b06e8ef143?w=400" },
    { id: 5, name: "Moda hombre", image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=400" },
    { id: 6, name: "Accesorios", image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {categories.map((category) => (
        <div
          key={category.id}
          className="bg-gray-100 rounded-xl overflow-hidden flex items-center p-4 hover:shadow transition"
        >
          <img
            src={category.image}
            alt={category.name}
            className="w-20 h-20 object-cover rounded-lg mr-4"
          />
          <h3 className="text-lg font-medium">{category.name}</h3>
        </div>
      ))}
    </div>
  );
}
