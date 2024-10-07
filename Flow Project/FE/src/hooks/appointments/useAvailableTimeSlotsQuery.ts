import { useQuery } from "@tanstack/react-query";
import { getAvailableTimeSlots } from "../../services/appointments/apointmentService";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

export const useAvailableTimeSlots = (
  staffId: number | undefined,
  serviceId: number | undefined,
  date: string | undefined
) => {
  const { logoutExpiredSession } = useAuth();

  return useQuery({
    queryKey: ["getAvailableTimeSlots"],
    queryFn: async () => {
      try {
        const response = await getAvailableTimeSlots(staffId, serviceId, date);
        return response;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 403) {
            logoutExpiredSession();
          }
        }
      }
    },
  });
};
