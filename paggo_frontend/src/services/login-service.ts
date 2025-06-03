import { AxiosResponse } from "axios";
import { setCookie } from "nookies";
import { User } from "../interfaces";
import api from "./api";

export interface LoginResponse {
  access_token: string;
  user: User;
}

type GetUser = (data: { id: string }) => Promise<{ data: User | null; error: string | null }>;

type Login = (cred: {
  email: string;
  password: string;
}) => Promise<{ data: LoginResponse | null; error: string | null }>;

type Register = (cred: {
  email: string;
  password: string;
}) => Promise<{ data: LoginResponse | null; error: string | null }>;

export default class LoginService {
  static login: Login = async ({ email, password }) => {
    try {
      const response: AxiosResponse<LoginResponse> = await api.post(
        "/auth/login",
        { email, password },
      );
      const { user, access_token } = response.data;
      
      if (!user || !access_token) {
        return {
          data: null,
          error: "Invalid response from server - missing user or token"
        };
      }

      setCookie(undefined, "Paggo:token", access_token, {
        path: "/",
        maxAge: 60 * 60 * 24,
      });
      setCookie(undefined, "Paggo:userId", user.id, {
        path: "/",
        maxAge: 60 * 60 * 24,
      });

      (api.defaults.headers as any).Authorization = `Bearer ${access_token}`;
      
      return { data: response.data, error: null };
    } catch (error: any) {
      return {
        data: null,
        error: error.response?.data?.message || "Login failed"
      };
    }
  };
  static getUser: GetUser = async ({ id }) => {
    try {
      return {
        data: {
          id,
          email: "",
          name: "",
          avatar: undefined,
        },
        error: null
      };
    } catch (error: any) {
      return {
        data: null,
        error: error.message || "Failed to get user data"
      };
    }
  };

  static register: Register = async ({ email, password }) => {
    try {
      const response: AxiosResponse<LoginResponse> = await api.post(
        "/auth/register",
        { email, password },
      );

      const { user, access_token } = response.data;

      if (!user || !access_token) {
        return {
          data: null,
          error: "Invalid response from server - missing user or token",
        } as any;
      }

      setCookie(undefined, "Paggo:token", access_token, {
        path: "/",
        maxAge: 60 * 60 * 24,
      });

      setCookie(undefined, "Paggo:userId", user.id, {
        path: "/",
        maxAge: 60 * 60 * 24,
      });

      if (api.defaults.headers) {
        (api.defaults.headers as any).Authorization = `Bearer ${access_token}`;
      }

      return { data: response.data, error: null };
    } catch (error: any) {
      return {
        data: null,
        error: error.response?.data?.message || "Registration failed"
      };
    }
  };
}
