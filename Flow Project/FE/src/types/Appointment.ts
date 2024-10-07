import { Role } from "./Role";
import { Status } from "./Status";

export enum StatusTypeParam {
  All = "",
  Scheduled = "scheduled",
  Cancelled = "cancelled",
}
export type TimeSlot = {
  startDate: Date;
  endDate: Date;
};

export type AppointmentBookFields = {
  serviceId: number | undefined;
  staffMemberId: number | undefined;
  clientId: number | undefined;
  startTime: string | undefined;
};

export type AppointmentService = {
  name: string;
  durationMinutes: number;
  price: number;
};

export type AppointmentUser = {
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
};

export type Appointment = {
  id: number;
  service: AppointmentService;
  staffMember: AppointmentUser;
  client: AppointmentUser;
  startTime: Date;
  endTime: Date;
  status: Status;
};

export type PaginatedAppointment = {
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  content: Appointment[];
  size: number;
};

export type AppointmentEvent = {
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  status: Status;
  appointmentDetails: Appointment;
};
