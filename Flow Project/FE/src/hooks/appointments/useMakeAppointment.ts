import { useMutation } from "@tanstack/react-query";
import { bookAppointment } from "../../services/appointments/apointmentService";
import { AppointmentBookFields } from "../../types/Appointment";

export const useMakeAppointmentMutation = () => {
  return useMutation({
    mutationKey: ["make appointment"],
    mutationFn: (appointmentData: AppointmentBookFields) => bookAppointment(appointmentData),
  });
};
