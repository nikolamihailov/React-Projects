import { Box } from "@mui/material";
import staffAvatar from "/user-avatar.png";
import { UserWithRole } from "../../types/User";
import { useCallback } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { RoleTypes } from "../../types/Role";
import { Avatar, BookButton, ContainerStaffMember } from "../../utils/StylesHelper/Services";
import { useNavigate } from "react-router-dom";

type ServiceStaffMembersProps = {
  staff: UserWithRole;
  openModal: () => void;
  changeSelectedStaff: (staff: UserWithRole) => void;
};

function ServiceStaffMember({ staff, openModal, changeSelectedStaff }: ServiceStaffMembersProps) {
  const { user } = useAuth();
  const navigateTo = useNavigate();

  const openBookForm = useCallback(() => {
    openModal();
    changeSelectedStaff(staff);
  }, [openModal, changeSelectedStaff, staff]);

  return (
    <ContainerStaffMember>
      <Avatar>
        <img src={staffAvatar} alt={"avatar"} />
      </Avatar>
      <Box sx={{ wordBreak: "break-word", whiteSpace: "break-spaces" }}>
        <h3>
          <p>{staff.firstName}</p>
          <p>{staff.lastName}</p>
        </h3>
      </Box>
      {user?.role === RoleTypes.User && <BookButton onClick={openBookForm}>Book</BookButton>}
      {user?.email === staff.email && (
        <BookButton onClick={() => navigateTo("/appointments")}>Appointments</BookButton>
      )}
    </ContainerStaffMember>
  );
}

export default ServiceStaffMember;
