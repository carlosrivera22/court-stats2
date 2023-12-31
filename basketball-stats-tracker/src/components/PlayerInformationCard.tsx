import { Card, CardContent, Box, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import EditPlayerInformationModal from "./EditPlayerInformationModal";
import { useAuth } from "@/providers/AuthProvider";

export default function PlayerInformationCard({
  player,
  onUpdate,
}: {
  player: any;
  onUpdate: () => void;
}) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Card
        sx={{
          width: "100%",
          maxWidth: { sm: 400 },
          marginTop: 2,
          marginBottom: { xs: 2, sm: 0 },
          marginLeft: { xs: 0, sm: 0 },
          height: { xs: 220, sm: 200 },
          boxShadow: "none",
          border: 1, // defines the border width
          borderColor: "#c2c2c2", // use the theme's primary color
        }}
      >
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6" gutterBottom marginBottom={0}>
              Personal Information
            </Typography>
            {user && (
              <IconButton
                size="small"
                style={{
                  background: "rgba(0, 0, 0, 0.04)",
                  borderRadius: "50%",
                  backgroundColor: "#ffe7e0",
                  color: "#ff8b68",
                }}
                onClick={() => setOpen(true)}
              >
                <EditIcon />
              </IconButton>
            )}
          </Box>
          <Box display="flex" alignItems="center" marginBottom={2}>
            <Typography variant="body1" marginRight={1}>
              Age:
            </Typography>
            {player.birthDate && (
              <Typography variant="body1" color="secondary" fontWeight="800">
                {new Date().getFullYear() -
                  new Date(player.birthDate).getFullYear()}
              </Typography>
            )}
          </Box>

          <Box display="flex" alignItems="center" marginBottom={2}>
            <Typography variant="body1" marginRight={1}>
              Birth Date:
            </Typography>
            {player.birthDate && (
              <Typography variant="body1" color="secondary" fontWeight="800">
                {new Date(player.birthDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
            )}
          </Box>

          <Box display="flex" alignItems="center" marginBottom={2}>
            <Typography variant="body1" marginRight={1}>
              Hometown:
            </Typography>
            <Typography variant="body1" color="secondary" fontWeight="800">
              {player.homeTown}
            </Typography>
          </Box>
        </CardContent>
      </Card>
      <EditPlayerInformationModal
        open={open}
        player={player}
        onClose={() => setOpen(false)}
        onSubmit={onUpdate}
      />
    </>
  );
}
