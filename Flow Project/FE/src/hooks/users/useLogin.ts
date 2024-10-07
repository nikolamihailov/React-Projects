import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/users/userService";

type UserData = {
  email: string;
  password: string;
};

export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (userData: UserData) => login(userData),
  });
};
