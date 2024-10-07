import { useMutation } from "@tanstack/react-query";
import { register } from "../../services/users/userService";
import { User } from "../../types/User";

export const useRegister = () => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: (userData: User) => register(userData),
  });
};
