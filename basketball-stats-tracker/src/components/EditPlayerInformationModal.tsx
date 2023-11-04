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
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

interface Props {
  open: boolean;
  player: any;
  onClose: () => void;
  onSubmit: () => void;
}
export default function EditPlayerInformationModal({
  open,
  player,
  onClose,
  onSubmit,
}: Props) {
  const [formData, setFormData] = useState<{
    birthDate: Dayjs | null;
    homeTown: string | null;
  }>({
    birthDate: player.birthDate ? dayjs(new Date(player.birthDate)) : null,
    homeTown: player.homeTown ?? null,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await updatePlayer(player.id, formData);
    await onSubmit();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Player Information</DialogTitle>
      <DialogContent>
        <DatePicker
          label="Birth Date"
          sx={{ width: "100%", marginTop: 2 }}
          onChange={(value) => {
            if (value) {
              setFormData({ ...formData, birthDate: dayjs(value) });
            }
          }}
          defaultValue={formData.birthDate ? dayjs(formData.birthDate) : null}
        />
        <TextField
          sx={{ marginTop: 5 }}
          margin="dense"
          name="homeTown"
          label="Hometown"
          type="text"
          fullWidth
          onChange={handleChange}
          value={formData.homeTown}
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
