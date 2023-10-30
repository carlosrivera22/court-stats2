import { useRouter } from "next/router";
import { Avatar, Box, Typography } from "@mui/material";
import ProfileTabs from "@/components/ProfileTabs";

const PlayerProfilePage = () => {
  const router = useRouter();
  const { id } = router.query;

  const player = {
    id: `Player ${id}`,
    firstName: "John",
    lastName: "Doe",
    ppg: 24.1,
    apg: 6.3,
    rpg: 5.5,
    birthDate: "1995-01-15",
    hometown: "Los Angeles",
    age: 28,
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" padding={5}>
      <Avatar
        src="/images/player_placeholder.png"
        sx={{ width: 150, height: 150, marginBottom: 5, marginTop: 1 }}
      />
      <Typography variant="h4" gutterBottom>
        {player.firstName} {player.lastName}
      </Typography>
      <Typography variant="h6" gutterBottom>
        ID: {player.id}
      </Typography>
      <ProfileTabs player={player} />
    </Box>
  );
};

export default PlayerProfilePage;
