import React from "react";

const EmptyState: React.FC = () => (
  <tr>
    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
      No hay productos disponibles
    </td>
  </tr>
);

export default EmptyState;
