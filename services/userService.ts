import axios from "axios";
import { ENV } from "../config/env";
import {
  CreateUserRequest,
  UpdateUserRequest,
  LoginRequest,
  LoginResponse,
  User,
  ApiResponse,
} from "../interfaces/user.interface";

axios.defaults.withCredentials = true;

export const UserService = {
  async login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await axios.post<ApiResponse<LoginResponse>>(
      `${ENV.BACKEND_URL}/api/user/login`,
      data,
      { withCredentials: true }
    );
    return response.data;
  },

  async logout(): Promise<ApiResponse<null>> {
    const response = await axios.post<ApiResponse<null>>(
      `${ENV.BACKEND_URL}/api/user/logout`,
      {},
      { withCredentials: true }
    );
    return response.data;
  },

  async getUsers(): Promise<User[]> {
    const response = await axios.get<ApiResponse<User[]>>(
      `${ENV.BACKEND_URL}/api/user/getUsers`,
      { withCredentials: true }
    );
    return response.data.data || [];
  },

  async getUserById(id: string): Promise<User> {
    const response = await axios.get<ApiResponse<User>>(
      `${ENV.BACKEND_URL}/api/user/findUserById/${id}`,
      { withCredentials: true }
    );
    return response.data.data as User;
  },

  async getCurrentUser(): Promise<User | null> {
    const response = await axios.get<ApiResponse<User>>(
      `${ENV.BACKEND_URL}/api/user/me`,
      { withCredentials: true }
    );
    return response.data.data || null;
  },

  async createUser(data: CreateUserRequest): Promise<ApiResponse<null>> {
    const response = await axios.post<ApiResponse<null>>(
      `${ENV.BACKEND_URL}/api/user/createUser`,
      data,
      { withCredentials: true }
    );
    return response.data;
  },

  async updateUser(id: string, data: UpdateUserRequest): Promise<ApiResponse<null>> {
    const response = await axios.put<ApiResponse<null>>(
      `${ENV.BACKEND_URL}/api/user/updateUser/${id}`,
      data,
      { withCredentials: true }
    );
    return response.data;
  },

  async changeUserState(id: string, estado: User["estado"]): Promise<ApiResponse<null>> {
    const response = await axios.patch<ApiResponse<null>>(
      `${ENV.BACKEND_URL}/api/user/${id}/state`,
      { estado },
      { withCredentials: true }
    );
    return response.data;
  },

  async deleteUser(id: string): Promise<ApiResponse<null>> {
    const response = await axios.delete<ApiResponse<null>>(
      `${ENV.BACKEND_URL}/api/user/delete/${id}`,
      { withCredentials: true }
    );
    return response.data;
  },
};