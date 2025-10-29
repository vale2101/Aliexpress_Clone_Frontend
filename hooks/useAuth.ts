import { useAuthContext } from "../contexts/AuthContext";
import { User } from "../interfaces/user.interface";

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  login: (email: string, contrasena: string) => Promise<User | null>;
  logout: () => Promise<void>;
  register: (data: any) => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isCustomer: boolean;
  isVendor: boolean;
  userFullName: string;
}


export const useAuth = (): UseAuthReturn => {
  const auth = useAuthContext();
  const { user, loading, login, logout, register, isAuthenticated } = auth;

  const isAdmin = user?.rol === 1;
  const isCustomer = user?.rol === 2;
  const isVendor = user?.rol === 3;

  const userFullName = user 
    ? `${user.nombre} ${user.apellido}`.trim()
    : "Usuario";

  return {
    ...auth,
    isAdmin,
    isCustomer,
    isVendor,
    userFullName,
  };
};

export { AuthProvider } from "../contexts/AuthContext";
 