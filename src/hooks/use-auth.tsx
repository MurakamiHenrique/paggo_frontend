import React, { createContext, useContext, useEffect, useState } from "react";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { User } from "../interfaces";
import { useRouter } from "next/router";
import LoginService from "../services/login-service";
import api from "../services/api";

interface LoginData {
  email: string;
  password: string;
}

interface UserData {
  user: User | null;
  token: string | null;
}

interface AuthContextData {
  login: (values: LoginData) => Promise<boolean>;
  register: (values: LoginData) => Promise<boolean>;
  userData: UserData;
  setUserData: (data: UserData) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<UserData>({
    user: null,
    token: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const logout = () => {
    destroyCookie(undefined, "Paggo:token");
    destroyCookie(undefined, "Paggo:userId");

    setUserData({ user: null, token: null });

    if (api.defaults.headers) {
      delete (api.defaults.headers as any).Authorization;
    }

    router.push("/");
  };

  useEffect(() => {
    const getRecentUserData = async () => {
      try {
        const { "Paggo:userId": userId, "Paggo:token": token } = parseCookies();

        if (token && userId) {
          if (api.defaults.headers) {
            (api.defaults.headers as any).Authorization = `Bearer ${token}`;
          }

          try {
            const response = await LoginService.getUser({ id: userId });
            if (!response.data || response.error) {
              console.error("Error getting user:", response.error);
              throw new Error(response.error || "Failed to get user data");
            }
            setUserData({ user: response.data, token });
          } catch (error) {
            console.error("Error validating token:", error);
            logout();
          }
        } else {
          setUserData({ user: null, token: null });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    getRecentUserData();
  }, []);

  const login = async ({ email, password }: LoginData): Promise<boolean> => {
    try {
      setUserData({ user: null, token: null });
      if (api.defaults.headers) {
        delete (api.defaults.headers as any).Authorization;
      }
      destroyCookie(undefined, "Paggo:token");
      destroyCookie(undefined, "Paggo:userId");

      const response = await LoginService.login({ email, password });

      if (!response.data || response.error) {
        console.error("Login failed:", response.error);
        return false;
      }

      if (response.data.access_token && response.data.user) {
        setCookie(undefined, "Paggo:token", response.data.access_token, {
          path: "/",
          maxAge: 60 * 60 * 24,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });

        setCookie(undefined, "Paggo:userId", response.data.user.id, {
          path: "/",
          maxAge: 60 * 60 * 24,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });

        if (api.defaults.headers) {
          (api.defaults.headers as any).Authorization =
            `Bearer ${response.data.access_token}`;
        }

        setUserData({ user: response.data.user, token: response.data.access_token });

        return true;
      }
      throw new Error("Invalid response from server");
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const register = async ({ email, password }: LoginData): Promise<boolean> => {
    try {
      setUserData({ user: null, token: null });
      if (api.defaults.headers) {
        delete (api.defaults.headers as any).Authorization;
      }
      destroyCookie(undefined, "Paggo:token");
      destroyCookie(undefined, "Paggo:userId");

      const response = await LoginService.register({ email, password });

      if (!response.data || response.error) {
        console.error("Registration failed:", response.error);
        return false;
      }

      if (response.data.access_token && response.data.user) {
        setCookie(undefined, "Paggo:token", response.data.access_token, {
          path: "/",
          maxAge: 60 * 60 * 24,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });

        setCookie(undefined, "Paggo:userId", response.data.user.id, {
          path: "/",
          maxAge: 60 * 60 * 24,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });

        if (api.defaults.headers) {
          (api.defaults.headers as any).Authorization =
            `Bearer ${response.data.access_token}`;
        }

        setUserData({ user: response.data.user, token: response.data.access_token });

        return true;
      }
      return false;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        register,
        userData,
        setUserData,
        logout,
        isAuthenticated: !!userData.token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
