// pages/_app.tsx
import Navbar from "../components/Navbar";
import { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CssBaseline from "@mui/material/CssBaseline";
import "../css/lato.css";
import { AuthProvider } from "@/providers/AuthProvider";

const theme = createTheme({
  // your custom theme configurations go here
  palette: {
    mode: "light",
    primary: {
      main: "#223345",
    },
    secondary: {
      main: "#FF3D00",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Lato",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none", // This removes the shadow
          "&:hover": {
            boxShadow: "none", // This removes the shadow when the button is hovered
          },
          "&:active": {
            boxShadow: "none", // This removes the shadow when the button is clicked
          },
          "&:focus": {
            boxShadow: "none", // This removes the shadow when the button is focused
          },
        },
      },
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box mb={10}>
            <Navbar />
          </Box>
          <Component {...pageProps} />
        </LocalizationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
