"use client";

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Text from "../atoms/Typography";
import LinkButton from "../atoms/LinkButton";
import { addressService } from "../../services/addressService";
import { useAuth } from "../../hooks/useAuth";
import { AddressInterface } from "../../interfaces/address.interface";

interface DeliveryAddressSelectorProps {
  onSelect?: (address: AddressInterface) => void;
}

const DeliveryAddressSelector: React.FC<DeliveryAddressSelectorProps> = ({ onSelect }) => {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<AddressInterface[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAddresses = async () => {
      if (!user?.id_usuario) {
        setLoading(false);
        return;
      }

      try {
        const result = await addressService.getAllByUser(user.id_usuario);
        setAddresses(result);

        if (result.length > 0) {
          const firstId = Number(result[0].id_direccion);
          setSelectedId(firstId);
          onSelect?.(result[0]);
        }
      } catch (error) {
        console.error("❌ Error cargando direcciones:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [user, onSelect]);

  const handleSelect = (address: AddressInterface) => {
    const id = Number(address.id_direccion);
    setSelectedId(id);
    onSelect?.(address);

    Swal.fire({
      title: "Dirección seleccionada",
      text: `${address.direccion_detalle}, ${address.ciudad}, ${address.pais}`,
      icon: "info",
      confirmButtonColor: "#dc2626",
    });
  };

  const handleAddAddress = () => {
    Swal.fire({
      title: "Añadir dirección",
      text: "Aquí deberías abrir el flujo para añadir una nueva dirección",
      icon: "question",
      confirmButtonColor: "#dc2626",
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <Text variant="title" as="h2">Dirección de entrega</Text>
        <p className="text-gray-500 mt-2">Cargando direcciones...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <Text variant="title" as="h2" className="mb-4">Dirección de entrega</Text>
      {addresses.length > 0 ? (
        <ul className="space-y-4">
          {addresses.map((address) => {
            const id = Number(address.id_direccion);
            return (
              <li
                key={id}
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  selectedId === id
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200 hover:border-red-300"
                }`}
                onClick={() => handleSelect(address)}
              >
                <p className="text-gray-800 font-medium">{address.direccion_detalle}</p>
                <p className="text-gray-600">{address.ciudad}, {address.pais}</p>
                <p className="text-gray-500 text-sm">Código postal: {address.codigo_postal}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <LinkButton onClick={handleAddAddress}>+ Añadir nueva dirección</LinkButton>
      )}
    </div>
  );
};

export default DeliveryAddressSelector;