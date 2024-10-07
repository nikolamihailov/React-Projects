import {
  Button,
  TextField,
  Typography,
  OutlinedInput,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Stack,
  Chip,
  SelectChangeEvent,
  Box,
  CircularProgress,
  FormHelperText,
  InputAdornment,
  IconButton,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import { useForm } from "react-hook-form";
import { AddStaffFormField } from "../../../../types/User";
import Spinner from "../../../../components/Spinner/Spinner";
import { useAddStaffMutation } from "../../../../hooks/users/useAddStaffMember";
import { toast } from "react-toastify";
import { useAuth } from "../../../../contexts/AuthContext";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useInfiniteServicesQuery } from "../../../../hooks/services/useServiceInfiniteQuery";
import { useInView } from "react-intersection-observer";

type AddFormStaffProps = {
  handleClose: () => void;
  refetch: () => void;
};

function AddFormStaff({ handleClose, refetch }: AddFormStaffProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm<AddStaffFormField>({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      phone: "",
      age: 18,
      serviceIds: [],
    },
  });

  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { logoutExpiredSession } = useAuth();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteServicesQuery();
  const { mutateAsync, isPending } = useAddStaffMutation();

  const { ref: inViewRef, inView } = useInView({
    threshold: 1,
    triggerOnce: false,
  });

  const services = data?.pages.flatMap((page) => page.content) ?? [];

  const handleServiceChange = (event: SelectChangeEvent<number[]>) => {
    const {
      target: { value },
    } = event;
    const selectedValue = value as number[];

    setSelectedServices(selectedValue);
    setValue("serviceIds", selectedValue);

    if (selectedValue.length > 0) {
      clearErrors("serviceIds");
    }
  };

  const handleDeleteSelectedService = (serviceId: number) => {
    const updatedServices = selectedServices.filter((item) => item !== serviceId);
    setSelectedServices(updatedServices);
    setValue("serviceIds", updatedServices);

    if (updatedServices.length) {
      clearErrors("serviceIds");
    }
  };

  const onSubmit = async (userData: AddStaffFormField) => {
    mutateAsync(userData)
      .then((userData) => {
        toast.success(`Staff ${userData.firstName} created!`);
        handleClose();
        refetch();
      })
      .catch((error) => {
        if (error.response?.status === 403) {
          logoutExpiredSession();
        } else if (error?.response?.status === 409) {
          toast.error("User with this email exists!");
        } else {
          toast.error("Something went wrong");
        }
      });
  };

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Typography>Failed to load user data.</Typography>;
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: "1.6rem", padding: "2.4rem" }}
    >
      <TextField
        id="input-email"
        label="Email"
        variant="outlined"
        fullWidth
        type="email"
        {...register("email", {
          required: "Email is required!",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email address",
          },
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
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
      <FormControl variant="outlined" fullWidth error={!!errors.password}>
        <InputLabel htmlFor="outlined-adornment-password" error={!!errors.password}>
          Password
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword((isShown) => !isShown)}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          {...register("password", {
            required: "Password is required!",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
            maxLength: {
              value: 16,
              message: "Password must not be over 16 characters long",
            },
            pattern: {
              value: /(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
              message:
                "Password must contain at least one uppercase letter, one number, and one special character",
            },
          })}
          error={!!errors.password}
        />
        <FormHelperText error={!!errors.password}>{errors.password?.message}</FormHelperText>
      </FormControl>
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

      <FormControl fullWidth>
        <InputLabel>Services</InputLabel>
        <Select
          multiple
          {...register("serviceIds", { required: "At least one service must be selected!" })}
          error={!!errors.serviceIds}
          value={selectedServices}
          onChange={handleServiceChange}
          input={<OutlinedInput label="Services" />}
          renderValue={(selected) => (
            <Stack gap={1} direction="row" flexWrap="wrap">
              {selected.map((serviceId) => {
                const serviceName = services.find((service) => service.id === serviceId)?.name;
                return (
                  <Chip
                    key={serviceId}
                    label={serviceName}
                    onDelete={() => handleDeleteSelectedService(serviceId)}
                    deleteIcon={<CancelIcon onMouseDown={(event) => event.stopPropagation()} />}
                  />
                );
              })}
            </Stack>
          )}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: "15rem",
              },
            },
          }}
        >
          {services?.map((service) => (
            <MenuItem key={service.id} value={service.id} sx={{ justifyContent: "space-between" }}>
              {service.name}
              {selectedServices.includes(service.id) ? <CheckIcon color="primary" /> : null}
            </MenuItem>
          ))}
          <MenuItem ref={inViewRef}>
            {isFetchingNextPage && <CircularProgress size={24} />}
          </MenuItem>
        </Select>
        {!!errors.serviceIds && (
          <FormHelperText sx={{ color: "red" }}>{errors.serviceIds?.message}</FormHelperText>
        )}
      </FormControl>

      <Box sx={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
        <Button type="submit" variant="contained" color="primary">
          {isPending ? <CircularProgress size={24} color="inherit" /> : "Add"}
        </Button>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
      </Box>
    </Box>
  );
}

export default AddFormStaff;
