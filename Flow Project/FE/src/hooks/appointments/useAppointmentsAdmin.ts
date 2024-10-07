import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { getAllAppointmentsAdmin } from "../../services/appointments/apointmentService";
import { StatusTypeParam } from "../../types/Appointment";

export const useAppointmentsAdminQuery = (
  page: number = 0,
  size: number = 20,
  status: StatusTypeParam
) => {
  const { logoutExpiredSession } = useAuth();

  return useQuery({
    queryKey: ["get appointments", page, size, status],
    queryFn: async () => {
      try {
        const response = await getAllAppointmentsAdmin(page, size, status);
        return response;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 403) {
            logoutExpiredSession();
          }
        }
      }
    },
    placeholderData: keepPreviousData,
  });
};
