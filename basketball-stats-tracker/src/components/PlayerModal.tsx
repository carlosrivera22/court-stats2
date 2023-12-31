// PlayerModal.tsx
import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { addPlayer } from "@/services/players";
import { useRouter } from "next/router";

interface PlayerModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const PlayerModal: React.FC<PlayerModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const router = useRouter(); // Initialize the router

  const handleSave = async () => {
    const newPlayer = await addPlayer({ firstName, lastName });
    await onSubmit();
    setFirstName("");
    setLastName("");
    onClose();
    // Assuming addPlayer returns the added player object including an id
    // Now navigate to the player route, for example 'player/123'
    if (newPlayer && newPlayer.id) {
      router.push(`/player/${newPlayer.id}`);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Player</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {"Please enter the player's first and last name."}
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="First Name"
          fullWidth
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Last Name"
          fullWidth
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlayerModal;
