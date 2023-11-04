import { Card, CardContent, Box, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import EditPlayerInformationModal from "./EditPlayerInformationModal";

export default function PlayerInformationCard({
  player,
  onUpdate,
}: {
  player: any;
  onUpdate: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: { sm: 400 },
          marginTop: 2,
          marginBottom: { xs: 2, sm: 0 },
          marginLeft: { xs: 0, sm: 0 },
          height: 200,
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
            <IconButton
              size="small"
              style={{
                background: "rgba(0, 0, 0, 0.04)",
                borderRadius: "50%",
              }}
              onClick={() => setOpen(true)}
            >
              <EditIcon />
            </IconButton>
          </Box>
          <Box display="flex" alignItems="center" marginBottom={2}>
            <Typography variant="body1" marginRight={1}>
              Age:
            </Typography>
            <Typography variant="body1" color="secondary" fontWeight="800">
              {player.age}
            </Typography>
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
