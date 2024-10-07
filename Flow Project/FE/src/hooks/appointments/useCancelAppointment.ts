import { useMutation } from "@tanstack/react-query";
import { cancelAppointment } from "../../services/appointments/apointmentService";

export const useCancelAppointmentMutation = () => {
  return useMutation({
    mutationKey: ["cancel appointment"],
    mutationFn: (id: number | undefined) => cancelAppointment(id),
  });
};
