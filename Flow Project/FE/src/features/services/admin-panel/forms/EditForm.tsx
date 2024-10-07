import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useServiceQuery } from "../../../../hooks/services/useService";
import Spinner from "../../../../components/Spinner/Spinner";
import { ServiceFormFields } from "../../../../types/Service";
import { serviceFormBox, serviceFormButtons } from "../../../../utils/StylesHelper/Services";

type EditFormProps = {
  handleClose: () => void;
  onSubmit: (data: ServiceFormFields) => void;
  serviceId: number;
};

function EditForm({ handleClose, onSubmit, serviceId }: EditFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ServiceFormFields>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      durationMinutes: 0,
    },
  });

  const { data: service, isLoading, isError } = useServiceQuery(serviceId);

  useEffect(() => {
    if (service) {
      setValue("name", service.name);
      setValue("description", service.description);
      setValue("price", service.price);
      setValue("durationMinutes", service.durationMinutes);
    }
  }, [service, setValue]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Typography>Failed to load service data.</Typography>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={serviceFormBox}>
        <TextField
          label="Name"
          {...register("name", {
            required: "Name is required!",
            minLength: {
              value: 1,
              message: "Name must be at least 1 character long",
            },
            maxLength: {
              value: 50,
              message: "Name must be less than or equal to 50 characters",
            },
          })}
          error={!!errors.name}
          helperText={errors.name?.message}
          fullWidth
        />

        <TextField
          label="Description"
          {...register("description", {
            required: "Description is required!",
            minLength: {
              value: 1,
              message: "Description must be at least 1 character long",
            },
            maxLength: {
              value: 200,
              message: "Description must be less than or equal to 200 characters",
            },
          })}
          multiline
          rows={4}
          fullWidth
          error={!!errors.description}
          helperText={errors.description?.message}
        />

        <TextField
          label="Price"
          type="number"
          inputProps={{ step: "0.01" }}
          {...register("price", {
            valueAsNumber: true,
            min: {
              value: 1,
              message: "Price must be a positive number!",
            },
          })}
          fullWidth
          error={!!errors.price}
          helperText={errors.price?.message}
        />

        <TextField
          label="Duration (in minutes)"
          type="number"
          {...register("durationMinutes", {
            valueAsNumber: true,
            required: "Duration is required",
            min: {
              value: 1,
              message: "Duration must be above 0!",
            },
            max: {
              value: 300,
              message: "Duration cannot be over 300!",
            },

            validate: (value) => Number.isInteger(value) || "Duration must be a whole number",
          })}
          error={!!errors.durationMinutes}
          helperText={errors.durationMinutes?.message}
          fullWidth
        />

        <Box sx={serviceFormButtons}>
          <Button type="submit" variant="contained" color="primary">
            Save Changes
          </Button>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
        </Box>
      </Box>
    </form>
  );
}

export default EditForm;
