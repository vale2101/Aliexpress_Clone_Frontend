
export { authService, default as auth } from './authService';
export { productService, ProductService } from './productService';

export * from './utils';

export type {
  User,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  Product,
  ApiResponse,
  ServiceResponse,
  SearchParams,
  PaginationParams,
} from '../config/types';
