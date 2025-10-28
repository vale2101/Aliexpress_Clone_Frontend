"use client";

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import CheckoutLayout from "../../components/organisms/CheckoutLayout";
import { useCheckout } from "../../hooks/useCheckout";
import { AddressInterface } from "../../interfaces/address.interface";

const ConfirmarPedidoPage: React.FC = () => {
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const router = useRouter();

  const {
    items,
    handleQuantityChange,
    handlePlaceOrder,
    handleAddMoreItems,
    isCartEmpty,
  } = useCheckout(selectedAddressId); 

  useEffect(() => {
    if (isCartEmpty) {
      Swal.fire({
        title: "Tu carrito está vacío",
        text: "Agrega algunos productos antes de continuar con el checkout",
        icon: "warning",
        confirmButtonText: "Ir a comprar",
        confirmButtonColor: "#dc2626",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/user");
        }
      });
    }
  }, [isCartEmpty, router]);

  if (isCartEmpty) {
    return null;
  }

  return (
    <CheckoutLayout
      items={items}
      onPlaceOrder={handlePlaceOrder}
      onQuantityChange={handleQuantityChange}
      onAddMoreItems={handleAddMoreItems}
      onAddressSelect={(address: AddressInterface) =>
        setSelectedAddressId(address.id_direccion || null)
      } 
    />
  );
};

export default ConfirmarPedidoPage;