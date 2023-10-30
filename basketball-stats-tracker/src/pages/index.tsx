import { useState } from "react";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import PlayerCard from "@/components/PlayerCard";
import PlayerModal from "@/components/PlayerModal";

export default function Home() {
  const players: any[] = [
    // Uncomment these lines to simulate players
    { id: 1, name: "Player 1" },
    { id: 2, name: "Player 2" },
    { id: 3, name: "Player 3" },
    { id: 4, name: "Player 4" },
    { id: 5, name: "Player 5" },
    { id: 6, name: "Player 6" },
  ];

  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Container>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          marginTop={5}
          minHeight="30vh"
        >
          <img
            src={"./images/hoop_logo.png"}
            alt={"logo"}
            width={200}
            height={200}
          />
          <Box marginTop={5} marginBottom={5}>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12} sm={12} md={7}>
                <TextField
                  fullWidth
                  id="outlined-search"
                  label="Search player"
                  type="search"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={5}>
                <Button
                  fullWidth
                  startIcon={
                    <AddIcon
                      style={{
                        paddingBottom: 5,
                      }}
                    />
                  }
                  size="large"
                  variant="contained"
                  color="primary"
                  style={{
                    borderRadius: 25,
                    fontWeight: "800",
                    paddingTop: 12,
                    marginTop: 5,
                  }}
                  onClick={() => setModalOpen(true)}
                >
                  Add Player
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {players.length === 0 ? (
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h6" marginTop={20}>
              No players have been added yet.
            </Typography>
          </Box>
        ) : (
          <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="center"
            mx={-5}
          >
            {players.map((player, index) => (
              <Box key={index} m={5}>
                <PlayerCard player={player} />
              </Box>
            ))}
          </Box>
        )}
      </Container>
      <PlayerModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={() => console.log("NOT IMPLEMENTED YET")}
      />
    </>
  );
}
