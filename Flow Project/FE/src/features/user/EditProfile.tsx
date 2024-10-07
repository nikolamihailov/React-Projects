import { Box, Button, TextField, Typography } from "@mui/material";
import { useUserQuery } from "../../hooks/users/useUser";
import { useForm } from "react-hook-form";
import { UserFormFields } from "../../types/User";
import { useEffect } from "react";
import Spinner from "../../components/Spinner/Spinner";
import { useUpdateUserMutation } from "../../hooks/users/useUpdateUser";
import { toast } from "react-toastify";

type EditProfileProps = {
  id: number | undefined;
  handleClose: () => void;
  refetch: () => void;
  updateCtx: () => void;
};

function EditProfile({ id, handleClose, refetch, updateCtx }: EditProfileProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UserFormFields>({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      age: 18,
    },
  });

  const { data: user, isLoading, isError } = useUserQuery(id);
  const { mutateAsync } = useUpdateUserMutation(id);

  useEffect(() => {
    if (user) {
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("email", user.email);
      setValue("phone", user.phone);
      setValue("age", user.age);
    }
  }, [user, setValue]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Typography>Failed to load user data.</Typography>;
  }

  const onSubmit = async (data: UserFormFields) => {
    mutateAsync(data)
      .then(() => {
        toast.success(`Profile updated`);
        handleClose();
        refetch();
        updateCtx();
      })
      .catch(() => {
        toast.error("Editing profile went wrong");
      });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: "2.4rem", padding: "2.4rem" }}
    >
      <TextField
        id="input-email"
        label="Email"
        variant="outlined"
        fullWidth
        type="email"
        {...register("email")}
        disabled
      />
      <TextField
        id="input-first-name"
        label="First Name"
        variant="outlined"
        fullWidth
        {...register("firstName", {
          required: "First name is required!",
          minLength: {
            value: 1,
            message: "First name must be at least 1 character long",
          },
          maxLength: {
            value: 50,
            message: "First name must be less than or equal to 50 characters",
          },
        })}
        error={!!errors.firstName}
        helperText={errors.firstName?.message}
        type="text"
      />
      <TextField
        id="input-last-name"
        label="Last Name"
        variant="outlined"
        fullWidth
        {...register("lastName", {
          required: "Last name is required!",
          minLength: {
            value: 1,
            message: "Last name must be at least 1 character long",
          },
          maxLength: {
            value: 50,
            message: "Last name must be less than or equal to 50 characters",
          },
        })}
        error={!!errors.lastName}
        helperText={errors.lastName?.message}
        type="text"
      />
      <TextField
        id="input-phone"
        label="Phone"
        variant="outlined"
        fullWidth
        {...register("phone", {
          required: "Phone is required!",
          pattern: {
            value: /^\+?\d+$/,
            message: "Invalid phone number",
          },
        })}
        error={!!errors.phone}
        helperText={errors.phone?.message}
        type="text"
      />
      <TextField
        id="input-age"
        label="Age"
        variant="outlined"
        fullWidth
        {...register("age", {
          required: "Age is required!",
          min: {
            value: 18,
            message: "You must be at least 18 years old.",
          },
          max: {
            value: 128,
            message: "Age must be less than or equal to 128.",
          },
        })}
        error={!!errors.age}
        helperText={errors.age?.message}
        type="number"
      />

      <Box sx={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
        <Button type="submit" variant="contained" color="primary">
          Save Changes
        </Button>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
      </Box>
    </Box>
  );
}

export default EditProfile;
