import { useQuery } from "@tanstack/react-query";
import { fetchLoggedInUser } from "../../services/users/userService";

export const useLoggedUser = (token: string) => {
  return useQuery({
    queryKey: ["logged-in", { token }],
    queryFn: () => fetchLoggedInUser(token),
    enabled: !!token,
  });
};
