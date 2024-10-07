import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { getAllAppointentsForStaff } from "../../services/appointments/apointmentService";

export const useAppointmentsStaff = (staffId: number | undefined) => {
  const { logoutExpiredSession } = useAuth();

  return useQuery({
    queryKey: ["getAppointmentsClient", staffId],
    queryFn: async () => {
      try {
        const response = await getAllAppointentsForStaff(staffId);
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
