import { useForm } from "react-hook-form";

import { Box, Button, CircularProgress, TextField } from "@mui/material";

import { toast } from "react-toastify";
import { useAuth } from "../../../../contexts/AuthContext";
import { useCreateServiceMutation } from "../../../../hooks/services/useCreateService";
import { ServiceFormFields } from "../../../../types/Service";
import { serviceFormBox, serviceFormButtons } from "../../../../utils/StylesHelper/Services";

type AddFormProps = {
  handleClose: () => void;
  refetchServices: () => void;
};

function AddForm({ handleClose, refetchServices }: AddFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ServiceFormFields>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      durationMinutes: 0,
    },
  });
  const { logoutExpiredSession } = useAuth();
  const { mutateAsync, isPending } = useCreateServiceMutation();

  const onSubmit = async (serviceData: ServiceFormFields) => {
    mutateAsync(serviceData)
      .then((serviceData) => {
        toast.success(`Service ${serviceData.name} created!`);
        handleClose();
        refetchServices();
      })
      .catch((error) => {
        if (error.response?.status === 403) {
          logoutExpiredSession();
        } else if (error?.response?.status === 409) {
          toast.error("Service with this name exists!");
        } else {
          toast.error("Something went wrong");
        }
      });
  };

  return (
    <>
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
              {isPending ? <CircularProgress size={24} color="inherit" /> : "Add"}
            </Button>
            <Button onClick={handleClose} variant="outlined">
              Cancel
            </Button>
          </Box>
        </Box>
      </form>
    </>
  );
}

export default AddForm;
