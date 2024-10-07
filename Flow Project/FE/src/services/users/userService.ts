import axios from "axios";
import {
  AddStaffFormField,
  LoggedUser,
  PaginatedUsers,
  User,
  UserFormFields,
  UserTypes,
  UserWithRole,
} from "../../types/User";

const BASE_URL: string = import.meta.env.VITE_BASE_URL;

const userEndpoints = {
  login: BASE_URL + "/auth/login",
  loggedInUser: BASE_URL + "/auth/logged-in",
  register: BASE_URL + "/user",
  getAll: BASE_URL + "/user",
  get: BASE_URL + "/user/",
  addStaff: BASE_URL + "/user/add-staff-member",
  update: BASE_URL + "/user/",
  delete: BASE_URL + "/user/",
};

const apiClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const storedToken = localStorage.getItem("auth");
    const token = storedToken ? JSON.parse(storedToken).token : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = async ({ email, password }: { email: string; password: string }) => {
  return (
    await axios.post(userEndpoints.login, {
      email,
      password,
    })
  ).data;
};

export const register = async (userData: User) => {
  return (await axios.post(userEndpoints.register, userData)).data;
};

export const fetchLoggedInUser = async (token: string) => {
  const response = await axios.get<LoggedUser>(userEndpoints.loggedInUser, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getAllUsers = async (userType: UserTypes, page: number = 0, size: number = 20) => {
  const response = await apiClient.get<PaginatedUsers>(
    `${userEndpoints.getAll}?role=${userType}&page=${page}&size=${size}`
  );
  return response.data;
};

export const getUser = async (id: number | undefined) => {
  const response = await apiClient.get<UserWithRole>(`${userEndpoints.get}${id}`);
  return response.data;
};

export const addStaffMember = async (userData: AddStaffFormField) => {
  const response = await apiClient.post<UserWithRole>(`${userEndpoints.addStaff}`, userData);
  return response.data;
};

export const updateUser = async (id: number | undefined, userData: UserFormFields) => {
  const response = await apiClient.patch<UserWithRole>(`${userEndpoints.update}${id}`, userData);
  return response.data;
};

export const deleteUser = async (id: number) => {
  const response = await apiClient.delete(`${userEndpoints.delete}${id}`);
  return response.data;
};
