import { Box, Button, Typography, useTheme } from "@mui/material";
import { useServiceQuery } from "../../hooks/services/useService";
import { sectionStyles } from "../../utils/StylesHelper/Section";
import serviceImg from "/service.png";
import SectionInfo from "../../components/Sections/SectionInfo";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import ServiceStaffMember from "./ServiceStaffMember";
import Spinner from "../../components/Spinner/Spinner";
import {
  servicePageImgSx,
  servicePageSectionBtnSx,
  servicePageSectionSx,
} from "../../utils/StylesHelper/Services";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import Modal from "../../components/UI/Modal/Modal";
import { UserWithRole } from "../../types/User";
import MakeAppointmentForm from "../appointments/forms/MakeAppointmentForm";

type ServicePageSectionProps = {
  id: number | undefined;
};

function ServicePageSection({ id }: ServicePageSectionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedStaff, setSelectedStaff] = useState<null | UserWithRole>(null);
  const theme = useTheme();
  const navigate = useNavigate();
  const { data, isLoading } = useServiceQuery(id);

  const navigateBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const changeSelectedStaff = useCallback((staff: UserWithRole) => {
    setSelectedStaff(staff);
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Box sx={sectionStyles(theme)}>
      <Button onClick={() => navigateBack()} sx={servicePageSectionBtnSx(theme)}>
        <ArrowBackIcon />
      </Button>

      <SectionInfo subheading="Service Details" heading={`${data?.name}`} />

      <Box sx={servicePageSectionSx}>
        <Box>
          <Box component="img" src={serviceImg} alt={data?.name} sx={servicePageImgSx} />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "3.2rem", textAlign: "left" }}>
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: theme.spacing(1) }}>
            <DescriptionIcon
              sx={{ marginRight: theme.spacing(1), color: theme.palette.primary.main }}
            />
            <Typography variant="body2" sx={{ fontSize: "2rem" }}>
              <strong>Description:</strong> {data?.description}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AccessTimeIcon
              sx={{ marginRight: theme.spacing(1), color: theme.palette.primary.main }}
            />
            <Typography variant="body2" sx={{ fontSize: "2rem" }}>
              <strong>Duration:</strong> {data?.durationMinutes} minutes
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <MonetizationOnIcon
              sx={{ marginRight: theme.spacing(1), color: theme.palette.primary.main }}
            />
            <Typography variant="body2" sx={{ fontSize: "2rem" }}>
              <strong>Price:</strong> ${data?.price}
            </Typography>
          </Box>

          {data?.users && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "3.2rem",
              }}
            >
              <Typography variant="h4" sx={{ fontSize: "2.1rem" }}>
                {data.users.length && "Specialists:"}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: "3.2rem",
                  flexWrap: "wrap",
                  margin: "0 auto",
                }}
              >
                {data?.users.map((user) => {
                  return (
                    <ServiceStaffMember
                      key={user.email}
                      staff={user}
                      openModal={() => setIsOpen(true)}
                      changeSelectedStaff={changeSelectedStaff}
                    />
                  );
                })}
              </Box>
            </Box>
          )}

          {data?.users.length === 0 && (
            <Typography variant="body1" sx={{ marginBottom: theme.spacing(2), fontSize: "2.1rem" }}>
              No specialist currently do this service.
            </Typography>
          )}
        </Box>
      </Box>

      <Modal open={isOpen} title="Make appointment" handleClose={handleClose} maxWidth={"80rem"}>
        <MakeAppointmentForm staff={selectedStaff} service={data} handleClose={handleClose} />
      </Modal>
    </Box>
  );
}

export default ServicePageSection;
