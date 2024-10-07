import { useMutation } from "@tanstack/react-query";
import { addStaffMember } from "../../services/users/userService";
import { AddStaffFormField } from "../../types/User";

export const useAddStaffMutation = () => {
  return useMutation({
    mutationKey: ["create service"],
    mutationFn: (userData: AddStaffFormField) => addStaffMember(userData),
  });
};
