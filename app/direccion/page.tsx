"use client";

import React, { useState } from "react";
import ShippingAddressForm from "@/components/organisms/ShippingAddressForm";
import AddressManager from "@/components/organisms/AddressManager";
import Breadcrumb from "@/components/molecules/Breadcrumb";
import SidebarCuenta from "@/components/organisms/SidebarCuenta";
import { AddressInterface } from "@/interfaces/address.interface";

const DireccionesPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [refreshList, setRefreshList] = useState(false);

  const handleAddNew = () => {
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const handleSubmit = async (data: AddressInterface) => {
    console.log("Dirección enviada:", data);
    setShowForm(false);
    setRefreshList(!refreshList);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb items={[{ label: "Cuenta", href: "/cuenta" }, { label: "Direcciones" }]} />

      <div className="flex">
        <SidebarCuenta />

        <div className="flex-1 p-6 space-y-6">
          {!showForm && (
            <>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Mis direcciones</h2>
                <button
                  onClick={handleAddNew}
                  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
                >
                  Añadir nueva dirección
                </button>
              </div>

              <AddressManager />
            </>
          )}

          {showForm && (
            <ShippingAddressForm
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DireccionesPage;