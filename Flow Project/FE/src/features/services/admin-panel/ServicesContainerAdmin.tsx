import { Box } from "@mui/material";
import { useEffect } from "react";
import ServiceItemAdmin from "./ServiceItemAdmin";
import { Service } from "../../../types/Service";
import { serviceContainerSx } from "../../../utils/StylesHelper/Services";

type ServiceContainerProps = {
  services: Service[] | undefined;
  refetchServices: () => void;
};

function ServicesContainerAdmin({ services, refetchServices }: ServiceContainerProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box sx={serviceContainerSx}>
      {services?.map((service) => {
        return (
          <ServiceItemAdmin
            key={service.id}
            name={service.name}
            price={service.price}
            durationMinutes={service.durationMinutes}
            staffMembers={service.users.length}
            id={service.id}
            refetchServices={refetchServices}
          />
        );
      })}
    </Box>
  );
}

export default ServicesContainerAdmin;
