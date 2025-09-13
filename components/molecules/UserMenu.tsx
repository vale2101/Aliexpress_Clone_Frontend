"use client";

import { useState } from "react";
import {
  User,
  ClipboardList,
  Wallet,
  MessageSquare,
  CreditCard,
  Heart,
  Ticket,
  Settings,
  Briefcase,
  PackageSearch,
  LogOut,
  HelpCircle,
  FileText,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import MenuItem from "../atoms/MenuItem";
import Divider from "../atoms/Divider";

const UserMenu: React.FC<{ onLogin: () => void; onLogout: () => void }> = ({
  onLogin,
  onLogout,
}) => {
  const { isAuthenticated, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Botón principal */}
      <div
        onClick={!isAuthenticated ? onLogin : undefined}
        className="flex items-center gap-1 sm:gap-2 cursor-pointer hover:text-orange-500 transition-colors"
      >
        <User size={16} className="text-gray-600" />
        {isAuthenticated ? (
          <span className="text-xs sm:text-sm text-gray-700 hidden sm:inline">
            ¡Hola, {user?.nombre || "Usuario"}!
          </span>
        ) : (
          <span className="text-xs sm:text-sm text-gray-700 hidden sm:inline">
            ¡Bienvenido Identifícate / Regístrate
          </span>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 sm:w-72 bg-white shadow-lg rounded-2xl border border-gray-200 z-50">
          {isAuthenticated ? (
            <div className="p-2 sm:p-3">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Mi cuenta</h3>
              <ul className="space-y-1">
                <MenuItem icon={<ClipboardList size={14} className="sm:w-4 sm:h-4" />} label="Mis pedidos" />
                <MenuItem icon={<Wallet size={14} className="sm:w-4 sm:h-4" />} label="Mis monedas" />
                <MenuItem
                  icon={<MessageSquare size={14} className="sm:w-4 sm:h-4" />}
                  label="Centro de mensajes"
                />
                <MenuItem icon={<CreditCard size={14} className="sm:w-4 sm:h-4" />} label="Pago" />
                <MenuItem icon={<Heart size={14} className="sm:w-4 sm:h-4" />} label="Lista de deseos" />
                <MenuItem icon={<Ticket size={14} className="sm:w-4 sm:h-4" />} label="Mis cupones" />
              </ul>
              <Divider />
              <MenuItem icon={<Settings size={14} className="sm:w-4 sm:h-4" />} label="Configuración" />
              <MenuItem
                icon={<Briefcase size={14} className="sm:w-4 sm:h-4" />}
                label="AliExpress Business"
              />
              <MenuItem
                icon={<PackageSearch size={14} className="sm:w-4 sm:h-4" />}
                label="Centro de dropshipping"
              />
              <MenuItem
                icon={<LogOut size={14} className="sm:w-4 sm:h-4" />}
                label="Cerrar sesión"
                danger
                onClick={onLogout}
              />
            </div>
          ) : (
            <div className="p-2 sm:p-3">
              {/* Encabezado */}
              <div className="bg-black text-white rounded-full px-3 sm:px-4 py-2 text-center font-semibold mb-2 text-sm sm:text-base">
                Identifícate
              </div>
              <p className="text-xs text-gray-500 mb-2 text-center">
                Registrarse
              </p>

              {/* Opciones */}
              <ul className="space-y-1">
                <MenuItem icon={<Settings size={14} className="sm:w-4 sm:h-4" />} label="Configuración" />
                <MenuItem
                  icon={<HelpCircle size={14} className="sm:w-4 sm:h-4" />}
                  label="Atención al cliente"
                />
                <MenuItem
                  icon={<FileText size={14} className="sm:w-4 sm:h-4" />}
                  label="Política de devoluciones"
                />
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
