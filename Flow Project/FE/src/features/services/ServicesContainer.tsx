import { Box } from "@mui/material";
import { Service } from "../../types/Service";
import ServiceItem from "./ServiceItem";
import { useEffect } from "react";
import { serviceContainerSx } from "../../utils/StylesHelper/Services";

function ServicesContainer({ services }: { services: Service[] | undefined }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box sx={serviceContainerSx}>
      {services?.map((service) => {
        return (
          <ServiceItem
            key={service.id}
            name={service.name}
            price={service.price}
            durationMinutes={service.durationMinutes}
            staffMembers={service.users.length}
            id={service.id}
          />
        );
      })}
    </Box>
  );
}

export default ServicesContainer;
