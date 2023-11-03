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
import { addPlayerStats } from "@/services/players";

interface Props {
  open: boolean;
  playerId: number;
  onClose: () => void;
  onSubmit: () => void;
}

export default function AddStatsModal({
  open,
  playerId,
  onClose,
  onSubmit,
}: Props) {
  const [formData, setFormData] = React.useState({
    date: "",
    points: "",
    assists: "",
    rebounds: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await addPlayerStats(playerId, formData);
    onSubmit();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Stats</DialogTitle>
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
