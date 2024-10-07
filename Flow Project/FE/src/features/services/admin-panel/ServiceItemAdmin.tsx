import {
  Box,
  Typography,
  Chip,
  List,
  ListItem,
  Avatar,
  useTheme,
  Button,
  Grow,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import Modal from "../../../components/UI/Modal/Modal";
import EditForm from "./forms/EditForm";
import DeleteConfirm from "./forms/DeleteConfirm";
import { useAuth } from "../../../contexts/AuthContext";
import { useUpdateServiceMutation } from "../../../hooks/services/useUpdateService";
import { useDeleteServiceMutation } from "../../../hooks/services/useDeleteService";
import { ServiceFormFields } from "../../../types/Service";
import {
  serviceAvatarSx,
  serviceIconSx,
  serviceItemAdminBtnSx,
  serviceItemChipSx,
  serviceItemSX,
  serviceItemTextBoxSx,
  serviceListItemSx,
  serviceListSx,
} from "../../../utils/StylesHelper/Services";
import { Operation } from "../../../types/EntitiesOperations";

type ServiceItemProps = {
  id: number;
  name: string;
  price: number;
  durationMinutes: number;
  staffMembers: number;
  refetchServices: () => void;
};

function ServiceItemAdmin({
  id,
  name,
  price,
  durationMinutes,
  staffMembers,
  refetchServices,
}: ServiceItemProps) {
  const [open, setIsOpen] = useState(false);
  const [operation, setOperation] = useState<Operation>(Operation.None);
  const theme = useTheme();
  const { logoutExpiredSession } = useAuth();

  const { mutateAsync: updateService } = useUpdateServiceMutation(id);
  const { mutateAsync: deleteService } = useDeleteServiceMutation(id);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleActionClick = useCallback((operation: Operation) => {
    setIsOpen(true);
    setOperation(operation);
  }, []);

  const onUpdateSubmit = useCallback(
    async (serviceData: ServiceFormFields) => {
      updateService(serviceData)
        .then((serviceData) => {
          toast.success(`Service ${serviceData.name} updated!`);
          handleClose();
          refetchServices();
        })
        .catch((error) => {
          if (error.response?.status === 403) {
            logoutExpiredSession();
          } else if (error?.response?.status === 409) {
            toast.error("Service with this name exists!");
          } else {
            toast.error("Failed to update service.");
          }
        });
    },
    [logoutExpiredSession, updateService, handleClose, refetchServices]
  );

  const onDeleteSubmit = useCallback(async () => {
    deleteService()
      .then(() => {
        toast.success(`Service deleted!`);
        handleClose();
        refetchServices();
      })
      .catch((error) => {
        if (error.response?.status === 403) {
          logoutExpiredSession();
        } else {
          toast.error("Failed to delete service.");
        }
      });
  }, [logoutExpiredSession, deleteService, handleClose, refetchServices]);

  return (
    <Grow in={true} timeout={{ appear: 100, enter: 300, exit: 200 }}>
      <Box sx={serviceItemSX(theme)}>
        <Box sx={serviceItemTextBoxSx}>
          <Box sx={{ display: "flex", gap: "0.4rem", margin: "0 auto" }}>
            <Chip
              label={`${"specialists".toUpperCase()}: ${staffMembers}`}
              sx={serviceItemChipSx(theme)}
            />
          </Box>

          <Typography
            variant="h5"
            component="p"
            sx={{ fontWeight: 600, color: theme.palette.primary.main }}
          >
            {name}
          </Typography>

          <List sx={serviceListSx}>
            <ListItem sx={serviceListItemSx}>
              <Avatar sx={serviceAvatarSx}>
                <MonetizationOnIcon sx={serviceIconSx(theme)} />
              </Avatar>
              <span>
                <strong>{price.toFixed(2)}</strong> USD
              </span>
            </ListItem>
            <ListItem sx={serviceListItemSx}>
              <Avatar sx={serviceAvatarSx}>
                <AccessTimeIcon sx={serviceIconSx(theme)} />
              </Avatar>
              <span>
                <strong>{durationMinutes}</strong> minutes
              </span>
            </ListItem>
          </List>
          <Box
            sx={{ display: "flex", gap: "2.4rem", justifyContent: "center", alignItems: "center" }}
          >
            <Button
              sx={serviceItemAdminBtnSx(theme)}
              onClick={() => handleActionClick(Operation.Edit)}
            >
              Edit
              <EditIcon sx={{ fontSize: "2.4rem", cursor: "pointer" }} />
            </Button>

            <Button
              sx={serviceItemAdminBtnSx(theme)}
              onClick={() => handleActionClick(Operation.Delete)}
            >
              Delete
              <DeleteIcon sx={{ fontSize: "2.4rem", cursor: "pointer" }} />
            </Button>
          </Box>

          <Modal
            open={open}
            handleClose={handleClose}
            title={operation === Operation.Edit ? "Edit Service" : "Delete Service"}
          >
            {operation === Operation.Edit && (
              <EditForm handleClose={handleClose} serviceId={id} onSubmit={onUpdateSubmit} />
            )}
            {operation === Operation.Delete && (
              <DeleteConfirm handleClose={handleClose} onSubmit={onDeleteSubmit} />
            )}
          </Modal>
        </Box>
      </Box>
    </Grow>
  );
}

export default ServiceItemAdmin;
