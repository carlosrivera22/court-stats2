import { useRouter } from "next/router";
import { Avatar, Box, Button, Typography } from "@mui/material";
import ProfileTabs from "@/components/ProfileTabs";
import { getPlayer, updatePlayer } from "../../services/players";
import { useEffect, useState, useRef } from "react";
import { storage } from "@/firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import CircularProgress from "@mui/material/CircularProgress";

const PlayerProfilePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [player, setPlayer] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null); // Reference to the file input
  const [loading, setLoading] = useState(false);

  const getPlayerById = async (playerId: number) => {
    const data = await getPlayer(playerId);
    setPlayer(data);
  };

  useEffect(() => {
    if (id) {
      getPlayerById(parseInt(id.toString()));
    }
  }, [id, player]);

  const handleAvatarClick = () => {
    // Trigger file input click when Avatar is clicked
    fileInputRef.current?.click();
  };

  const uploadProfileImage = async (file: File) => {
    if (!file) return;

    // Create a storage reference
    const storageRef = ref(storage, `profileImages/${file.name}`);

    try {
      setLoading(true);
      // Upload the file to Firebase Storage
      const snapshot = await uploadBytes(storageRef, file);

      // Get the downloadable URL
      const url = await getDownloadURL(snapshot.ref);
      await updatePlayer(player.id, {
        profilePictureUrl: url,
      });
      setLoading(false);
      return url; // This URL can be saved to your database
    } catch (error) {
      setLoading(false);
      console.error("Error uploading file:", error);
      // Handle errors here
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Handle the file upload here
    uploadProfileImage(file);
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
      {loading ? (
        <Box mt={2} mb={2}>
          <CircularProgress />
        </Box>
      ) : (
        <Button onClick={handleAvatarClick}>
          <Avatar
            src={player.profilePictureUrl ?? "/images/player_placeholder.png"}
            sx={{ width: 150, height: 150, marginBottom: 2, marginTop: 1 }}
          />
        </Button>
      )}
      <Typography variant="h5" gutterBottom>
        {player.firstName} {player.lastName}
      </Typography>
      <ProfileTabs player={player} refetchPlayer={getPlayerById} />
    </Box>
  );
};

export default PlayerProfilePage;
