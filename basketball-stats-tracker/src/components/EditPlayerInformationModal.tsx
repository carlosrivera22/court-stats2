import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}
export default function EditPlayerInformationModal({
  open,
  onClose,
  onSubmit,
}: Props) {
  const [formData, setFormData] = useState({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await onSubmit();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Player Information</DialogTitle>
      <DialogContent>
        <DatePicker
          label="Birth Date"
          sx={{ width: "100%" }}
          onChange={(value) => {
            setFormData({ ...formData, date: value });
          }}
        />

        <TextField
          margin="dense"
          name="hometown"
          label="Hometown"
          type="text"
          fullWidth
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
