"use client";

import React, { useEffect, useState } from "react";
import { AddressInterface } from "../../interfaces/address.interface";
import { addressService } from "../../services/addressService";
import { useAuth } from "../../contexts/AuthContext"; 

const AddressManager = () => {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<AddressInterface[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAddresses = async () => {
    if (!user) return; 
    setLoading(true);
    const res = await addressService.getAllByUser(user.id_usuario); 
    setAddresses(res);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    await addressService.delete(id);
    fetchAddresses();
  };

  useEffect(() => {
    fetchAddresses();
  }, [user]); 

  if (!user) return <p>Cargando usuario...</p>; 

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl">
      <h2 className="text-lg font-semibold mb-4">Tus direcciones guardadas</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <ul className="space-y-4">
          {addresses.map((addr) => (
            <li key={addr.id_direccion} className="border p-4 rounded">
              <p>{addr.direccion_detalle}, {addr.ciudad}, {addr.pais}</p>
              <p>Código postal: {addr.codigo_postal}</p>
              <button
                onClick={() => handleDelete(addr.id_direccion!)}
                className="mt-2 text-red-500 hover:underline text-sm"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressManager;