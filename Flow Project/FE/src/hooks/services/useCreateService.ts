import { useMutation } from "@tanstack/react-query";
import { ServiceFormFields } from "../../types/Service";
import { createService } from "../../services/services/serviceService";

export const useCreateServiceMutation = () => {
  return useMutation({
    mutationKey: ["create service"],
    mutationFn: (serviceData: ServiceFormFields) => createService(serviceData),
  });
};
