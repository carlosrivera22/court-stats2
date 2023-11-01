import { useRouter } from "next/router";
import { Avatar, Box, Typography } from "@mui/material";
import ProfileTabs from "@/components/ProfileTabs";
import { getPlayer } from "../../services/players";
import { useEffect, useState } from "react";

const PlayerProfilePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [player, setPlayer] = useState<any>(null);

  useEffect(() => {
    // Moved the function inside the useEffect to avoid unnecessary redeclarations
    const getPlayerById = async (playerId: string) => {
      const data = await getPlayer(playerId);
      setPlayer(data); // Set the player data directly here
    };

    if (id) {
      getPlayerById(id.toString());
    }
  }, [id]);

  if (!player) return null; // Add a loading state or some placeholder if the data isn't fetched yet

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
