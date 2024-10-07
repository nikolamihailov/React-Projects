import { useMutation } from "@tanstack/react-query";
import { deleteService } from "../../services/services/serviceService";

export const useDeleteServiceMutation = (id: number) => {
  return useMutation({
    mutationKey: ["delete service", id],
    mutationFn: () => deleteService(id),
  });
};
