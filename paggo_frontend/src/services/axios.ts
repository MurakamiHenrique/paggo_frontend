import axios, { InternalAxiosRequestConfig, AxiosError } from "axios";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import Router from "next/router";

export function getApi() {
  const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const { "Paggo:token": token } = parseCookies();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      if (error.response?.status === 401) {
        destroyCookie(undefined, "Paggo:token");
        Router.push("/");
      }
      return Promise.reject(error);
    },
  );

  return api;
}
