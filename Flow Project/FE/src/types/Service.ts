import { UserWithRole } from "./User";

export type Service = {
  id: number;
  name: string;
  description: string;
  durationMinutes: number;
  price: number;
  users: UserWithRole[];
};

export type ServiceFormFields = {
  name: string;
  description: string;
  durationMinutes: number;
  price: number;
};

export type PaginatedService = {
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  content: Service[];
  size: number;
};
