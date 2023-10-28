import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function PlayerCard({ player }: { player: any }) {
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image="./images/player_placeholder.png"
          alt="Player Image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {player.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Points Per Game (PPG): {player.ppg}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Assists Per Game (APG): {player.apg}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Rebounds Per Game (RPG): {player.rpg}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
