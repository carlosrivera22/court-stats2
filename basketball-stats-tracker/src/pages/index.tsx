import { Key, useEffect, useState } from "react";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import PlayerCard from "@/components/PlayerCard";
import PlayerModal from "@/components/PlayerModal";
import { getPlayers } from "@/services/players";
import Pagination from "@mui/material/Pagination";
import { useAuth } from "@/providers/AuthProvider";

export default function Home() {
  const { user } = useAuth();
  const [players, setPlayers] = useState<any>(null);
  const [, setSearchTerm] = useState("");
  useEffect(() => {
    // Moved the function inside the useEffect to avoid unnecessary redeclarations
    fetchPlayers();
  }, []);

  const fetchPlayers = async (page: number = 1, searchTerm = "") => {
    const data = await getPlayers(page, searchTerm);
    setPlayers(data); // Set the player data directly here
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const handlePageChange = async (event: any, value: any) => {
    await fetchPlayers(value);
  };

  const handleSearch = async (event: any) => {
    setSearchTerm(event.target.value);
    await fetchPlayers(1, event.target.value);
  };

  if (!players) return null; // Add a loading state or some placeholder if the data isn't fetched yet

  return (
    <>
      <Container>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          marginTop={15}
          minHeight="30vh"
        >
          <img
            src={"./images/logo.png"}
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
              <Grid item xs={12} sm={12} md={12} lg={12} width={400}>
                <TextField
                  fullWidth
                  id="outlined-search"
                  label="Search player"
                  type="search"
                  onChange={handleSearch}
                />
              </Grid>
              {user && (
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Button
                    fullWidth
                    startIcon={<AddIcon />}
                    size="large"
                    variant="contained"
                    color="primary"
                    style={{
                      fontWeight: "800",
                      marginTop: 5,
                    }}
                    onClick={() => setModalOpen(true)}
                  >
                    Add Player
                  </Button>
                </Grid>
              )}
            </Grid>
          </Box>
        </Box>
        {players.data.length === 0 ? (
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h6" marginTop={10}>
              No players found
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={7} mt={1} mb={5}>
            {players.data.map((player: any, index: Key | null | undefined) => (
              <Grid item key={index} xs={12} sm={12} md={6} lg={4}>
                <Box>
                  <PlayerCard player={player} />
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
        {players.data.length === 0 || players.totalPages <= 1 ? null : (
          <Box display="flex" justifyContent="center" mb={10}>
            <Pagination
              count={players.totalPages}
              // page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              color="secondary"
            />
          </Box>
        )}
      </Container>

      <PlayerModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={fetchPlayers}
      />
    </>
  );
}
