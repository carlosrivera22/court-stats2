import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
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
  }, []);

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
            sx={{ width: 150 }} // Smaller width
            image="./images/player_placeholder.png"
            alt="Player Image"
          />
          <CardContent
            sx={{ "&:last-child": { paddingBottom: "16px" }, flex: "1" }}
          >
            <Typography gutterBottom variant="h6" component="div">
              {player.firstName} {player.lastName}
            </Typography>
            <Typography variant="body2" fontWeight={"600"}>
              Points Per Game (PPG): {averages.ppg}
            </Typography>
            <Typography variant="body2" fontWeight={"600"}>
              Assists Per Game (APG): {averages.apg}
            </Typography>
            <Typography variant="body2" fontWeight={"600"}>
              Rebounds Per Game (RPG): {averages.rpg}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
