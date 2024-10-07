import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useAuth } from "../../contexts/AuthContext";
import { UserTypes } from "../../types/User";
import { getAllUsers } from "../../services/users/userService";
import axios from "axios";

export const useUsersQuery = (role: UserTypes, page: number = 0, size: number = 20) => {
  const { logoutExpiredSession } = useAuth();

  return useQuery({
    queryKey: ["getUsers", role, page, size],
    queryFn: async () => {
      try {
        const response = await getAllUsers(role, page, size);
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
