import { Role } from "./Role";

export type User = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  age: number;
};

export type LoggedUser = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  age: number;
  role: Role;
};

export enum UserTypes {
  Users = "user",
  Staff = "staff_member",
  Admins = "admin",
}

export type UserWithRole = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  age: number;
  role: Role;
  serviceIds: number[];
};

export type PaginatedUsers = {
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  content: UserWithRole[];
  size: number;
};

export type UserFormFields = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  age: number;
  role: Role;
  serviceIds: number[];
};

export type AddStaffFormField = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  age: number;
  serviceIds: number[];
};
