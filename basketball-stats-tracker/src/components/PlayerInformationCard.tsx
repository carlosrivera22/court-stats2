import { Card, CardContent, Box, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import EditPlayerInformationModal from "./EditPlayerInformationModal";

export default function PlayerInformationCard({ player }: { player: any }) {
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
          <Typography variant="body1" marginBottom={2}>
            Age: {player.age}
          </Typography>
          <Typography variant="body1" marginBottom={2}>
            Birth Date: {player.birthDate}
          </Typography>
          <Typography variant="body1" marginBottom={2}>
            Hometown: {player.hometown}
          </Typography>
        </CardContent>
      </Card>
      <EditPlayerInformationModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={() => {}}
      />
    </>
  );
}
