import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Link from "next/link";

export default function PlayerCard({ player }: { player: any }) {
  return (
    <Link
      href={`/player/${player.id}`}
      passHref
      style={{
        textDecoration: "none",
      }}
    >
      <Card sx={{ maxWidth: 450, margin: "auto" }}>
        {" "}
        {/* Adjust max width as needed */}
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
              {" "}
              {/* Smaller variant */}
              {player.firstName} {player.lastName}
            </Typography>
            <Typography variant="body2" fontWeight={"600"}>
              {" "}
              {/* Smaller variant */}
              Points Per Game (PPG): {player.ppg}
            </Typography>
            <Typography variant="body2" fontWeight={"600"}>
              Assists Per Game (APG): {player.apg}
            </Typography>
            <Typography variant="body2" fontWeight={"600"}>
              Rebounds Per Game (RPG): {player.rpg}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
