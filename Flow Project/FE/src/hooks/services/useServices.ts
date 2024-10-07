import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getServices } from "../../services/services/serviceService";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

export const useServicesQuery = (page: number = 0, size: number = 20) => {
  const { logoutExpiredSession } = useAuth();

  return useQuery({
    queryKey: ["getServices", page, size],
    queryFn: async () => {
      try {
        const response = await getServices(page, size);
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
