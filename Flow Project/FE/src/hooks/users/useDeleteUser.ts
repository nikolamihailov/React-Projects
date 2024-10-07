import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../../services/users/userService";

export const useDeleteUserMutation = (id: number) => {
  return useMutation({
    mutationKey: ["delete user", id],
    mutationFn: () => deleteUser(id),
  });
};
