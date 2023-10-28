import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import Navbar from "@/components/Navbar";
import PlayerCard from "@/components/PlayerCard";

export default function Home() {
  const players: any[] = [
    // Uncomment these lines to simulate players
    { name: "Player 1" },
    { name: "Player 2" },
    { name: "Player 3" },
  ];

  return (
    <>
      <Navbar />
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

          <Button
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
              marginTop: 20,
              paddingTop: 12,
            }}
          >
            Add Player
          </Button>
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
    </>
  );
}
