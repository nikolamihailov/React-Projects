import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { getAllAppointentsForClient } from "../../services/appointments/apointmentService";

export const useAppointmentsClient = (clientId: number | undefined) => {
  const { logoutExpiredSession } = useAuth();

  return useQuery({
    queryKey: ["getAppointmentsClient", clientId],
    queryFn: async () => {
      try {
        const response = await getAllAppointentsForClient(clientId);
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
