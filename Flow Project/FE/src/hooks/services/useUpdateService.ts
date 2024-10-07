import { useMutation } from "@tanstack/react-query";
import { ServiceFormFields } from "../../types/Service";
import { updateService } from "../../services/services/serviceService";

export const useUpdateServiceMutation = (id: number) => {
  return useMutation({
    mutationKey: ["update service", id],
    mutationFn: (serviceData: ServiceFormFields) => updateService(id, serviceData),
  });
};
