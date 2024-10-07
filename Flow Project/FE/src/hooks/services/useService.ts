import { useQuery } from "@tanstack/react-query";
import { getService } from "../../services/services/serviceService";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

export const useServiceQuery = (id: number | undefined) => {
  const { logoutExpiredSession } = useAuth();

  return useQuery({
    queryKey: ["getOneService", id],
    queryFn: async () => {
      try {
        const response = await getService(id);
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
