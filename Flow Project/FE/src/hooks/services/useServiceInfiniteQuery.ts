import { useInfiniteQuery } from "@tanstack/react-query";
import { getServices } from "../../services/services/serviceService";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

export const useInfiniteServicesQuery = (size: number = 4) => {
  const { logoutExpiredSession } = useAuth();

  return useInfiniteQuery({
    queryKey: ["getServicesInfinite", size],
    queryFn: async ({ pageParam }) => {
      try {
        const response = await getServices(pageParam, size);
        return response;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 403) {
            logoutExpiredSession();
          }
        }
        throw error;
      }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const morePagesExist = lastPage?.content.length === size;
      if (!morePagesExist) return undefined;
      return allPages.length;
    },
  });
};
