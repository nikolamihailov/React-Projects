import { Box } from "@mui/material";
import { useEffect } from "react";
import { UserWithRole } from "../../../types/User";
import { userContainerSx } from "../../../utils/StylesHelper/AdminUsers";
import UserItemAdmin from "./UsersItemAdmin";

type UsersContainerProps = {
  users: UserWithRole[] | undefined;
  refetchUsers: () => void;
};

function UsersContainerAdmin({ users, refetchUsers }: UsersContainerProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box sx={userContainerSx}>
      {users?.map((user) => (
        <UserItemAdmin
          key={user.email}
          id={user?.id}
          email={user.email}
          firstName={user.firstName}
          lastName={user.lastName}
          phone={user.phone}
          age={user.age}
          role={user.role}
          serviceIds={user.serviceIds}
          refetchUsers={refetchUsers}
        />
      ))}
    </Box>
  );
}

export default UsersContainerAdmin;
