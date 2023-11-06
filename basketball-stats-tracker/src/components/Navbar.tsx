import * as React from "react";
import { useRouter } from "next/router"; // Import useRouter
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import { useAuth } from "@/providers/AuthProvider";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter(); // Create a router instance

  return (
    <AppBar>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => router.push("/")} // Use router for navigation
        >
          <HomeIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Full Court Metrics
        </Typography>
        {user ? (
          <Button
            color="inherit"
            onClick={() => {
              logout();
              router.push("/");
            }}
          >
            Logout
          </Button>
        ) : (
          <Button color="inherit" onClick={() => router.push("/login")}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
