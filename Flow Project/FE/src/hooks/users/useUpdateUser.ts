import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../../services/users/userService";
import { UserFormFields } from "../../types/User";

export const useUpdateUserMutation = (id: number | undefined) => {
  return useMutation({
    mutationKey: ["update user", id],
    mutationFn: (userData: UserFormFields) => updateUser(id, userData),
  });
};
