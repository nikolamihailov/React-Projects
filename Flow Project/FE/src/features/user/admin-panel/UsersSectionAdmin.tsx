import { Button, ButtonGroup, Typography, useTheme } from "@mui/material";
import Section from "../../../components/UI/Section/Section";
import SectionInfo from "../../../components/Sections/SectionInfo";
import {
  selectItemsAndBtnSx,
  userItemAdminBtnSx,
  usersAdminSectionStyles,
} from "../../../utils/StylesHelper/AdminUsers";
import { useState } from "react";
import { UserTypes } from "../../../types/User";
import Spinner from "../../../components/Spinner/Spinner";
import { useUsersQuery } from "../../../hooks/users/useUsers";
import SelectItemsPerPage from "../../../components/PaginationAndSelectItems/SelectItemsPerPage";
import { usePagination } from "../../../hooks/usePagination";
import Pagination from "../../../components/PaginationAndSelectItems/Pagination";
import UsersContainerAdmin from "./UsersContainerAdmin";
import Modal from "../../../components/UI/Modal/Modal";
import AddFormStaff from "./forms/AddFormStaff";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";

function UsersSectionAdmin() {
  const [activeUserType, setActiveUserType] = useState<UserTypes>(UserTypes.Users);
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const theme = useTheme();

  const { page, itemsPerPage, handleItemsPerPageChange, handlePageChange, resetPage } =
    usePagination();

  const { data, isLoading, error, refetch } = useUsersQuery(activeUserType, page, itemsPerPage);

  const buttonStyles = (type: UserTypes) => ({
    backgroundColor:
      activeUserType === type ? theme.palette.primary.light : theme.palette.primary.main,
    color: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
    transition: "all 0.5s linear",
  });

  const handleChangeUserType = (type: UserTypes) => {
    setActiveUserType(type);
    resetPage();
  };

  const handleClose = () => {
    setIsAddOpen(false);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Typography>Error loading services</Typography>;
  }
  return (
    <Section bgColor={theme.palette.secondary.dark} style={usersAdminSectionStyles(theme)}>
      <SectionInfo heading="Users" subheading="Admin Panel" />

      <ButtonGroup
        variant="contained"
        aria-label="Type of users"
        color="primary"
        sx={{
          borderRadius: "1.5rem",
          border: `3px solid ${theme.palette.primary.light}`,
          overflow: "hidden",
        }}
      >
        <Button
          sx={buttonStyles(UserTypes.Users)}
          onClick={() => handleChangeUserType(UserTypes.Users)}
        >
          Users
        </Button>
        <Button
          sx={buttonStyles(UserTypes.Admins)}
          onClick={() => handleChangeUserType(UserTypes.Admins)}
        >
          Admins
        </Button>
        <Button
          sx={buttonStyles(UserTypes.Staff)}
          onClick={() => handleChangeUserType(UserTypes.Staff)}
        >
          Staff
        </Button>
      </ButtonGroup>
      <Box sx={selectItemsAndBtnSx}>
        {activeUserType === UserTypes.Staff && (
          <Button sx={userItemAdminBtnSx(theme)} onClick={() => setIsAddOpen(true)}>
            <AddIcon /> Add Staff
          </Button>
        )}
        <SelectItemsPerPage
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
          itemName="Users"
        />
      </Box>

      <UsersContainerAdmin users={data?.content} refetchUsers={refetch} />
      <Pagination totalPages={data?.totalPages || 0} page={page} onPageChange={handlePageChange} />

      {activeUserType === UserTypes.Staff && (
        <Modal open={isAddOpen} handleClose={handleClose} title={"Add Staff"}>
          <AddFormStaff handleClose={handleClose} refetch={refetch} />
        </Modal>
      )}
    </Section>
  );
}

export default UsersSectionAdmin;
