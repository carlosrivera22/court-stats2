import { updatePlayer } from "@/services/players";
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
  playerId: number;
  onClose: () => void;
  onSubmit: () => void;
}
export default function EditPlayerInformationModal({
  open,
  playerId,
  onClose,
  onSubmit,
}: Props) {
  const [formData, setFormData] = useState({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("formData", formData);
  };

  const handleSubmit = async () => {
    await updatePlayer(playerId, formData);
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
            setFormData({ ...formData, birthDate: value });
          }}
        />

        <TextField
          margin="dense"
          name="homeTown"
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
