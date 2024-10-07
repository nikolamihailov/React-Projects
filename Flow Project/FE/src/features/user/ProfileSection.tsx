import { Avatar, Box, Button, List, ListItem, Typography, useTheme } from "@mui/material";
import Section from "../../components/UI/Section/Section";
import { sectionStyles } from "../../utils/StylesHelper/Section";
import SectionInfo from "../../components/Sections/SectionInfo";
import avatar from "/user-avatar.png";
import { useAuth } from "../../contexts/AuthContext";
import {
  userIconSx,
  userItemAvatarSx,
  userItemListSx,
  userItemListItemSx,
} from "../../utils/StylesHelper/AdminUsers";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import EditIcon from "@mui/icons-material/Edit";
import { useCallback, useState } from "react";
import { useUserQuery } from "../../hooks/users/useUser";
import Spinner from "../../components/Spinner/Spinner";
import Modal from "../../components/UI/Modal/Modal";
import EditProfile from "./EditProfile";

function ProfileSection() {
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const { user, isLoading: loadingLoggedUser, updateLoggedUser, logoutExpiredSession } = useAuth();
  const { data, isLoading, error, refetch } = useUserQuery(user?.id);
  const theme = useTheme();

  const handleClose = useCallback(() => {
    setIsEditOpen(false);
  }, []);

  if (!user && !loadingLoggedUser) {
    logoutExpiredSession();
  }
  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return <Typography>Problem fetching user!</Typography>;
  }

  return (
    <Section
      bgColor={theme.palette.secondary.light}
      style={{ ...sectionStyles(theme), height: "100%" }}
    >
      <SectionInfo subheading="Profile" heading="My Profile" />

      <Button
        sx={{
          bgcolor: theme.palette.primary.main,
          color: theme.palette.secondary.main,
          "&:hover": {
            backgroundColor: theme.palette.primary.light,
          },
        }}
        onClick={() => setIsEditOpen(true)}
      >
        <EditIcon />
      </Button>
      <Box>
        <Box component="img" src={avatar} alt={"avatar"} sx={{ width: "10rem" }} />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "3.2rem" }}>
        <Typography
          variant="h5"
          component="p"
          sx={{ fontWeight: 600, color: theme.palette.primary.main }}
        >
          {`${data?.firstName} ${data?.lastName}`}
        </Typography>

        <List sx={userItemListSx}>
          <ListItem sx={userItemListItemSx}>
            <Avatar sx={userItemAvatarSx}>
              <EmailIcon sx={userIconSx(theme)} />
            </Avatar>
            <span>{data?.email}</span>
          </ListItem>
          <ListItem sx={userItemListItemSx}>
            <Avatar sx={userItemAvatarSx}>
              <BadgeIcon sx={userIconSx(theme)} />
            </Avatar>
            <span>{data?.role}</span>
          </ListItem>
        </List>

        <Modal open={isEditOpen} handleClose={handleClose} title={"Edit Profile"}>
          <EditProfile
            handleClose={handleClose}
            id={user?.id}
            refetch={refetch}
            updateCtx={updateLoggedUser}
          />
        </Modal>
      </Box>
    </Section>
  );
}

export default ProfileSection;
