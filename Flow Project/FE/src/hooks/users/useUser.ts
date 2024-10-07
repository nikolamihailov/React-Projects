import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { getUser } from "../../services/users/userService";

export const useUserQuery = (id: number | undefined) => {
  const { logoutExpiredSession } = useAuth();

  return useQuery({
    queryKey: ["get user", id],
    queryFn: async () => {
      try {
        const response = await getUser(id);
        return response;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 403) {
            logoutExpiredSession();
          }
        }
      }
    },
    enabled: !!id,
  });
};
