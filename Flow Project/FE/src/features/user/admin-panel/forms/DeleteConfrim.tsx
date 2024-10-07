import { Box, Button, Typography } from "@mui/material";

type DeleteConfirmProps = {
  handleClose: () => void;
  onSubmit: () => void;
};

function DeleteConfirm({ handleClose, onSubmit }: DeleteConfirmProps) {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6">Are you sure you want to delete this user?</Typography>
      <Box sx={{ display: "flex", gap: "1rem", justifyContent: "center", mt: 2 }}>
        <Button variant="contained" color="primary" onClick={onSubmit}>
          Delete
        </Button>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
      </Box>
    </Box>
  );
}

export default DeleteConfirm;
