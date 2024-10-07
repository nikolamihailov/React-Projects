import axios from "axios";
import { PaginatedService, Service, ServiceFormFields } from "../../types/Service";

const BASE_URL: string = import.meta.env.VITE_BASE_URL;
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth") || "{}").token
      : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const serviceEndpoints = {
  getAll: "/service",
  getOne: "/service/",
  create: "/service",
  update: "/service/",
  delete: "/service/",
};

export const getServices = async (page: number = 0, size: number = 20) => {
  const response = await apiClient.get<PaginatedService>(
    `${serviceEndpoints.getAll}?page=${page}&size=${size}`
  );
  return response.data;
};

export const getService = async (id: number | undefined) => {
  const response = await apiClient.get<Service>(`${serviceEndpoints.getOne}${id}`);
  return response.data;
};

export const createService = async (serviceData: ServiceFormFields) => {
  const response = await apiClient.post<Service>(serviceEndpoints.create, serviceData);
  return response.data;
};

export const updateService = async (id: number, serviceData: ServiceFormFields) => {
  const response = await apiClient.patch<Service>(`${serviceEndpoints.update}${id}`, serviceData);
  return response.data;
};

export const deleteService = async (id: number) => {
  const response = await apiClient.delete(`${serviceEndpoints.delete}${id}`);
  return response.data;
};
