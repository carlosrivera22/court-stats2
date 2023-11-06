import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, Card, CardContent } from "@mui/material";
import StatsTable from "./StatsTable";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import GroupIcon from "@mui/icons-material/Group";
import { useEffect, useState } from "react";
import { getPlayerAverages, updatePlayer } from "@/services/players";
import PlayerInformationCard from "./PlayerInformationCard";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useAuth } from "@/providers/AuthProvider";
import { storage } from "@/firebase/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { CircularProgressWithLabel } from "./CircularProgressWithLabel";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"div"}>{children}</Typography>
        </Box>
      )}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ProfileTabs({
  player,
  refetchPlayer,
}: {
  player: any;
  refetchPlayer: (playerId: number) => void;
}) {
  const { user } = useAuth();
  const [value, setValue] = useState(0);
  const [averages, setAverages] = useState<any>([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const onUploadProgress = (progress: number) => {
    setUploadProgress(progress);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const fetchAverages = async () => {
    const averages = await getPlayerAverages(player.id);
    setAverages(averages);
  };

  useEffect(() => {
    fetchAverages();
  }, []);

  const uploadHighlights = async (
    file: File,
    onProgress: (percent: number) => void,
  ) => {
    if (!file) return;

    // Create a storage reference
    const storageRef = ref(storage, `highlights/${file.name}`);

    try {
      setUploading(true);
      // Upload the file to Firebase Storage and monitor progress
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get upload progress
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress(progress);
        },
        (error) => {
          setUploading(false);
          console.error("Error uploading file:", error);
          // Handle errors here
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            updatePlayer(player.id, {
              highlightsUrl: downloadURL,
            });
            setVideoUrl(downloadURL);
            setUploading(false);
          });
        },
      );
    } catch (error) {
      setUploading(false);
      console.error("Error uploading file:", error);
      // Handle errors here
    }
  };

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Handle the file upload here
    uploadHighlights(file, onUploadProgress);
    // You can call an upload function here
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label="Player Information"
            {...a11yProps(0)}
            style={{
              fontWeight: "800",
            }}
          />
          <Tab
            label="Highlights"
            {...a11yProps(1)}
            style={{
              fontWeight: "800",
            }}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          padding={5}
        >
          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }} // Vertical on small and below, horizontal on medium and above
            alignItems="start"
            width="100%"
            justifyContent="center"
            marginBottom={5}
          >
            <Card
              elevation={3}
              sx={{
                width: "100%",
                maxWidth: { sm: 400 }, // Responsive width
                marginTop: 2,
                marginBottom: { xs: 2, sm: 0 }, // Margin at bottom for small screens
                marginRight: { xs: 0, sm: 3 }, // Margin left only for screens bigger than small
                height: 200,
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom marginBottom={2}>
                  Player Stats
                </Typography>

                <Box display="flex" alignItems="center" marginBottom={2}>
                  <SportsBasketballIcon
                    color="primary"
                    style={{ marginRight: "10px" }}
                  />
                  <Typography variant="body1" style={{ marginRight: "5px" }}>
                    Points Per Game (PPG):
                  </Typography>
                  <Typography
                    variant="body1"
                    color="secondary"
                    fontWeight="800"
                  >
                    {averages.ppg}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" marginBottom={2}>
                  <GroupIcon color="primary" style={{ marginRight: "10px" }} />
                  <Typography variant="body1" style={{ marginRight: "5px" }}>
                    Assists Per Game (APG):
                  </Typography>
                  <Typography
                    variant="body1"
                    color="secondary"
                    fontWeight="800"
                  >
                    {averages.apg}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" marginBottom={2}>
                  <EmojiPeopleIcon
                    color="primary"
                    style={{ marginRight: "10px" }}
                  />
                  <Typography variant="body1" style={{ marginRight: "5px" }}>
                    Rebounds Per Game (RPG):
                  </Typography>
                  <Typography
                    variant="body1"
                    color="secondary"
                    fontWeight="800"
                  >
                    {averages.rpg}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
            <PlayerInformationCard
              player={player}
              onUpdate={() => refetchPlayer(player.id)}
            />
          </Box>
          <StatsTable player={player} onUpdate={() => fetchAverages()} />
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {user ? (
          <Box
            justifyContent={"center"}
            alignContent={"center"}
            display={"flex"}
            mb={5}
          >
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              <Typography fontWeight="800">Upload video</Typography>
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                style={{ display: "none" }} // Visually hide the input but keep it accessible
              />
            </Button>
          </Box>
        ) : null}{" "}
        {/* Added null for the false condition */}
        {uploading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={10}
          >
            <CircularProgressWithLabel value={uploadProgress} />
          </Box>
        ) : !videoUrl ? (
          <Typography fontWeight="800">No Highlights Found</Typography>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <video width="90%" controls>
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>
        )}
      </CustomTabPanel>
    </Box>
  );
}
