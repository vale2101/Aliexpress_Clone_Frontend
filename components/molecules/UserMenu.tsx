"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
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
  Store,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import MenuItem from "../atoms/MenuItem";
import Divider from "../atoms/Divider";

interface UserMenuProps {
  onLogin?: () => void;
  onLogout?: () => Promise<void>;
}

const UserMenu: React.FC<UserMenuProps> = ({ onLogin, onLogout }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLoginRedirect = () => {
    if (onLogin) onLogin();
    router.push("/user");
  };

  const handleRegisterRedirect = () => {
    router.push("/registro");
  };

  const handleVendedorLoginRedirect = () => {
    router.push("/vendedor");
  };

  const handleLogout = async () => {
    await logout();
    if (onLogout) await onLogout();
    router.push("/");
  };

  return (
    <div className="relative" ref={menuRef}>
      <div
        onClick={toggleMenu}
        className="flex items-center gap-1 sm:gap-2 cursor-pointer hover:text-orange-500 transition-colors"
      >
        <User size={16} className="text-gray-600" />
        <span className="text-xs sm:text-sm text-gray-700 hidden sm:inline">
          {isAuthenticated ? `¡Hola, ${user?.nombre || "Usuario"}!` : "Identifícate / Regístrate"}
        </span>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 sm:w-72 bg-white shadow-lg rounded-2xl border border-gray-200 z-50">
          {isAuthenticated ? (
            <div className="p-2 sm:p-3">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Mi cuenta</h3>
              <ul className="space-y-1">
                <MenuItem icon={<ClipboardList size={14} />} label="Mis pedidos" />
              </ul>
              <Divider />
              <MenuItem
                icon={<Settings size={14} />}
                label="Configuración"
                onClick={() => router.push("/cuenta")}
              />
              <MenuItem icon={<Briefcase size={14} />} label="AliExpress Business" />
              <MenuItem
                icon={<LogOut size={14} />}
                label="Cerrar sesión"
                danger
                onClick={handleLogout}
              />
            </div>
          ) : (
            <div className="p-2 sm:p-3">
              <button
                onClick={handleLoginRedirect}
                className="bg-black text-white rounded-full px-4 py-2 text-center font-semibold mb-2 w-full text-sm sm:text-base hover:bg-gray-800 transition"
              >
                Iniciar sesión
              </button>

              <button
                onClick={handleRegisterRedirect}
                className="bg-orange-500 text-white rounded-full px-4 py-2 text-center font-semibold mb-3 w-full text-sm sm:text-base hover:bg-orange-600 transition"
              >
                Registrarse
              </button>

              <ul className="space-y-1">
                <MenuItem
                  icon={<Store size={14} />}
                  label="Iniciar sesión como vendedor"
                  onClick={handleVendedorLoginRedirect}
                />
                <Divider />
                <MenuItem icon={<HelpCircle size={14} />} label="Atención al cliente" />
                <MenuItem icon={<FileText size={14} />} label="Política de devoluciones" />
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;