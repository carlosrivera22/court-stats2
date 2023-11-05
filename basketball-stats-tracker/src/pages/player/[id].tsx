import { useRouter } from "next/router";
import { Avatar, Box, Button, Typography } from "@mui/material";
import ProfileTabs from "@/components/ProfileTabs";
import { getPlayer } from "../../services/players";
import { useEffect, useState, useRef } from "react";

const PlayerProfilePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [player, setPlayer] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null); // Reference to the file input

  const getPlayerById = async (playerId: number) => {
    const data = await getPlayer(playerId);
    setPlayer(data);
  };

  useEffect(() => {
    if (id) {
      getPlayerById(parseInt(id.toString()));
    }
  }, [id]);

  const handleAvatarClick = () => {
    // Trigger file input click when Avatar is clicked
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Handle the file upload here
    console.log("Selected file:", file);
    // You can call an upload function here
  };

  if (!player) return null;

  return (
    <Box display="flex" flexDirection="column" alignItems="center" padding={5}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept="image/*" // Accept only image files
      />
      <Button onClick={handleAvatarClick}>
        <Avatar
          src="/images/player_placeholder.png"
          sx={{ width: 150, height: 150, marginBottom: 2, marginTop: 1 }}
        />
      </Button>
      <Typography variant="h5" gutterBottom>
        {player.firstName} {player.lastName}
      </Typography>
      <ProfileTabs player={player} refetchPlayer={getPlayerById} />
    </Box>
  );
};

export default PlayerProfilePage;
