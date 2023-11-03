import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, Card, CardContent } from "@mui/material";
import AddStatsModal from "./AddStatsModal";
import StatsTable from "./StatsTable";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import { useState } from "react";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import GroupIcon from "@mui/icons-material/Group";

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

export default function ProfileTabs({ player }: { player: any }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [open, setOpen] = useState(false);

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
          <Box mb={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpen(true)}
              style={{
                fontWeight: "800",
              }}
            >
              Add Stats
            </Button>
          </Box>
          <AddStatsModal
            open={open}
            onClose={() => setOpen(false)}
            onSubmit={() => console.log("nothing for now")}
            playerId={player.id}
          />
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
                marginLeft: { xs: 0, sm: 0 }, // Margin left only for screens bigger than small
                height: 200,
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom marginBottom={2}>
                  Personal Information
                </Typography>
                <Typography variant="body1" marginBottom={2}>
                  Age: {player.age}
                </Typography>
                <Typography variant="body1" marginBottom={2}>
                  Birth Date: {player.birthDate}
                </Typography>
                <Typography variant="body1" marginBottom={2}>
                  Hometown: {player.hometown}
                </Typography>
              </CardContent>
            </Card>
            <Card
              elevation={3}
              sx={{
                width: "100%",
                maxWidth: { sm: 400 }, // Responsive width
                marginTop: 2,
                marginBottom: { xs: 2, sm: 0 }, // Margin at bottom for small screens
                marginLeft: { xs: 0, sm: 3 }, // Margin left only for screens bigger than small
                height: 200,
              }}
            >
              <CardContent>
                {" "}
                <Typography variant="h6" gutterBottom marginBottom={2}>
                  Player Stats
                </Typography>
                <Box display="flex" alignItems="center" marginBottom={2}>
                  <SportsBasketballIcon
                    color="primary"
                    style={{ marginRight: 10 }}
                  />
                  <Typography variant="body1">
                    Points Per Game (PPG): {player.ppg}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" marginBottom={2}>
                  <GroupIcon color="primary" style={{ marginRight: 10 }} />
                  <Typography variant="body1">
                    Assists Per Game (APG): {player.apg}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" marginBottom={2}>
                  <EmojiPeopleIcon
                    color="primary"
                    style={{ marginRight: 10 }}
                  />
                  <Typography variant="body1">
                    Rebounds Per Game (RPG): {player.rpg}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
          <StatsTable playerId={player.id} />
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        No Highlights
      </CustomTabPanel>
    </Box>
  );
}
