import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Link from "next/link";
import Box from "@mui/material/Box"; // import Box component

export default function PlayerCard({ player }: { player: any }) {
  return (
    <Link
      href={`/player/${player.id}`}
      passHref
      style={{
        textDecoration: "none",
      }}
    >
      <Card sx={{ display: "flex", maxWidth: 600 }}>
        {" "}
        {/* Update here */}
        <CardActionArea sx={{ display: "flex", flexDirection: "row" }}>
          {" "}
          {/* Update here */}
          <CardMedia
            component="img"
            sx={{ width: 180 }} // Adjust the image width as needed
            image="./images/player_placeholder.png"
            alt="Player Image"
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {" "}
            {/* Add this */}
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {player.firstName} {player.lastName}
              </Typography>
              <Typography fontWeight={"600"}>
                Points Per Game (PPG): {player.ppg}
              </Typography>
              <Typography fontWeight={"600"}>
                Assists Per Game (APG): {player.apg}
              </Typography>
              <Typography fontWeight={"600"}>
                Rebounds Per Game (RPG): {player.rpg}
              </Typography>
            </CardContent>
          </Box>
        </CardActionArea>
      </Card>
    </Link>
  );
}
