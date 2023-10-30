import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function AddStatsModal({ open, onClose, onSubmit }: Props) {
  const [formData, setFormData] = React.useState({
    date: "",
    points: "",
    assists: "",
    rebounds: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Data Point</DialogTitle>
      <DialogContent>
        <DatePicker sx={{ width: "100%" }} />

        <TextField
          margin="dense"
          name="points"
          label="Points"
          type="number"
          fullWidth
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="assists"
          label="Assists"
          type="number"
          fullWidth
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="rebounds"
          label="Rebounds"
          type="number"
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
