import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getPlayerAverages } from "@/services/players";

export default function PlayerCard({ player }: { player: any }) {
  const [averages, setAverages] = useState<any>();

  useEffect(() => {
    const fetchAverages = async () => {
      const averages = await getPlayerAverages(player.id);
      setAverages(averages);
    };
    fetchAverages();
  }, [player.id]);

  if (!averages) return null;
  return (
    <Link
      href={`/player/${player.id}`}
      passHref
      style={{
        textDecoration: "none",
      }}
    >
      <Card sx={{ maxWidth: 450, margin: "auto", maxHeight: 150, width: 390 }}>
        <CardActionArea sx={{ display: "flex", flexDirection: "row" }}>
          <CardMedia
            component="img"
            sx={{ width: 150, height: 150 }} // Smaller width
            image={
              player.profilePictureUrl ?? "./images/player_placeholder.png"
            }
            alt="Player Image"
          />
          <CardContent
            sx={{
              "&:last-child": { paddingBottom: "16px" },
              flex: "1",
              paddingBottom: "8px",
            }}
          >
            <Box mb={1}>
              <Typography gutterBottom variant="h5" component="div">
                {player.firstName} {player.lastName}
              </Typography>
              <Typography variant="body2" fontWeight={"600"} display="inline">
                Points Per Game (PPG):{" "}
              </Typography>
              <Typography
                variant="body2"
                color="secondary"
                display="inline"
                fontWeight={"800"}
              >
                {averages.ppg}
              </Typography>
              <br />
            </Box>
            <Box mb={1}>
              <Typography variant="body2" fontWeight={"600"} display="inline">
                Assists Per Game (APG):{" "}
              </Typography>
              <Typography
                variant="body2"
                color="secondary"
                display="inline"
                fontWeight={"800"}
              >
                {averages.apg}
              </Typography>
              <br />
            </Box>
            <Box mb={1}>
              <Typography variant="body2" fontWeight={"600"} display="inline">
                Rebounds Per Game (RPG):{" "}
              </Typography>
              <Typography
                variant="body2"
                color="secondary"
                display="inline"
                fontWeight={"800"}
              >
                {averages.rpg}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
