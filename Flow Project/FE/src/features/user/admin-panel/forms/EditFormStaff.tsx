import { useEffect, useState } from "react";
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
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import { useForm } from "react-hook-form";
import { UserFormFields } from "../../../../types/User";
import { useUserQuery } from "../../../../hooks/users/useUser";
import Spinner from "../../../../components/Spinner/Spinner";
import { useInfiniteServicesQuery } from "../../../../hooks/services/useServiceInfiniteQuery";
import { useInView } from "react-intersection-observer";
import { useServicesQuery } from "../../../../hooks/services/useServices";

type EditFormStaffProps = {
  id: number | undefined;
  handleClose: () => void;
  onSubmit: (userData: UserFormFields) => void;
};

function EditFormStaff({ id, handleClose, onSubmit }: EditFormStaffProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm<UserFormFields>({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      age: 18,
      serviceIds: [],
    },
  });

  const { data: user, isLoading, isError } = useUserQuery(id);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteServicesQuery();
  const { data: userServices } = useServicesQuery();
  const [selectedServices, setSelectedServices] = useState<number[]>([]);

  const { ref: inViewRef, inView } = useInView({
    threshold: 1,
    triggerOnce: false,
  });

  const services = data?.pages.flatMap((page) => page.content) ?? [];

  useEffect(() => {
    if (user) {
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("email", user.email);
      setValue("phone", user.phone);
      setValue("age", user.age);
      setValue("serviceIds", user.serviceIds);
      setSelectedServices(user.serviceIds);
    }
  }, [user, setValue]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

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

      <FormControl fullWidth>
        <InputLabel>Services</InputLabel>
        <Select
          multiple
          {...register("serviceIds", { required: "At least one service must be selected!" })}
          error={!!errors.serviceIds}
          value={selectedServices}
          onChange={handleServiceChange}
          input={<OutlinedInput label="Services" aria-hidden={false} />}
          renderValue={(selected) => (
            <Stack gap={1} direction="row" flexWrap="wrap">
              {selected.map((serviceId) => {
                const serviceName = userServices?.content.find(
                  (service) => service.id === serviceId
                )?.name;
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
          Save Changes
        </Button>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
      </Box>
    </Box>
  );
}

export default EditFormStaff;
