import { Key, useEffect, useState } from "react";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import PlayerCard from "@/components/PlayerCard";
import PlayerModal from "@/components/PlayerModal";
import { getPlayers } from "@/services/players";

export default function Home() {
  const [players, setPlayers] = useState<any>(null);

  useEffect(() => {
    // Moved the function inside the useEffect to avoid unnecessary redeclarations
    const fetchPlayers = async () => {
      const data = await getPlayers();
      setPlayers(data); // Set the player data directly here
    };

    fetchPlayers();
  }, []);

  const [isModalOpen, setModalOpen] = useState(false);

  if (!players) return null; // Add a loading state or some placeholder if the data isn't fetched yet

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
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  fullWidth
                  id="outlined-search"
                  label="Search player"
                  type="search"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Button
                  fullWidth
                  startIcon={<AddIcon />}
                  size="large"
                  variant="contained"
                  color="primary"
                  style={{
                    borderRadius: 25,
                    fontWeight: "800",
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
            {players.map((player: any, index: Key | null | undefined) => (
              <Box key={index} m={5}>
                <PlayerCard player={player} />
              </Box>
            ))}
          </Box>
        )}
      </Container>
      <PlayerModal open={isModalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
