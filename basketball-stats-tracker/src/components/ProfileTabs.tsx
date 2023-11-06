import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, Card, CardContent, styled } from "@mui/material";
import StatsTable from "./StatsTable";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import GroupIcon from "@mui/icons-material/Group";
import { useEffect, useState } from "react";
import { getPlayerAverages } from "@/services/players";
import PlayerInformationCard from "./PlayerInformationCard";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useAuth } from "@/providers/AuthProvider";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

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
        {user && !videoUrl ? (
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            <Typography fontWeight={"800"}>Upload video</Typography>
            <VisuallyHiddenInput
              type="file"
              accept="video/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const videoFile = e.target.files[0];
                  const url = URL.createObjectURL(videoFile);
                  setVideoUrl(url);
                }
              }}
            />
          </Button>
        ) : !videoUrl ? (
          <Typography fontWeight={"800"}>No Highlights Found</Typography>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center", // Center children horizontally
              width: "100%", // Use the full screen width
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
