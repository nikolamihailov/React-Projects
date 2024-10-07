import axios from "axios";
import {
  Appointment,
  AppointmentBookFields,
  PaginatedAppointment,
  StatusTypeParam,
  TimeSlot,
} from "../../types/Appointment";

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

const appointmentEndpoints = {
  getAllAdmin: "/appointment",
  getAvailableTimeSlots: "/appointment/available-time-slots",
  getAllForClient: "/appointment/client/",
  getAllForStaff: "/appointment/staff/",
  book: "/appointment/book",
  cancel: "/appointment/cancel/",
};

export const getAllAppointmentsAdmin = async (
  page: number = 0,
  size: number = 20,
  status?: StatusTypeParam
) => {
  const statusQuery = status !== StatusTypeParam.All ? `&status=${status}` : "";

  const response = await apiClient.get<PaginatedAppointment>(
    `${appointmentEndpoints.getAllAdmin}?page=${page}&size=${size}${statusQuery}`
  );

  return response.data;
};

export const getAvailableTimeSlots = async (
  staffId: number | undefined,
  serviceId: number | undefined,
  date: string | undefined
) => {
  const response = await apiClient.get<TimeSlot[]>(
    `${appointmentEndpoints.getAvailableTimeSlots}?staffId=${staffId}&serviceId=${serviceId}&date=${date}`
  );
  return response.data;
};

export const getAllAppointentsForClient = async (clientId: number | undefined) => {
  const response = await apiClient.get<Appointment[]>(
    `${appointmentEndpoints.getAllForClient}${clientId}`
  );
  return response.data;
};

export const getAllAppointentsForStaff = async (staffId: number | undefined) => {
  const response = await apiClient.get<Appointment[]>(
    `${appointmentEndpoints.getAllForStaff}${staffId}`
  );
  return response.data;
};

export const bookAppointment = async (data: AppointmentBookFields) => {
  const response = await apiClient.post<Appointment>(`${appointmentEndpoints.book}`, data);
  return response.data;
};

export const cancelAppointment = async (appointmentId: number | undefined) => {
  const response = await apiClient.patch<Appointment>(
    `${appointmentEndpoints.cancel}${appointmentId}`
  );
  return response.data;
};
