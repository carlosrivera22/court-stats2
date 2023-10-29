// pages/player/[id].tsx
import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";

const PlayerProfilePage = () => {
  const router = useRouter();
  const { id } = router.query;

  // Here, you would typically fetch the player's data using the id.
  // For simplicity, we'll use a static example.
  const player = {
    name: `Player ${id}`,
    firstName: "John",
    lastName: "Doe",
    ppg: 24,
    apg: 6,
    rpg: 5,
    team: "Lakers",
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" padding={5}>
      <Typography variant="h4">{player.name}</Typography>
      <Typography variant="h6">
        {player.firstName} {player.lastName}
      </Typography>
      <Typography>Points Per Game (PPG): {player.ppg}</Typography>
      <Typography>Assists Per Game (APG): {player.apg}</Typography>
      <Typography>Rebounds Per Game (RPG): {player.rpg}</Typography>
      <Typography>Team: {player.team}</Typography>
    </Box>
  );
};

export default PlayerProfilePage;
