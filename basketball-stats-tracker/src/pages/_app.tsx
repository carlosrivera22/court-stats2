// pages/_app.tsx
import Navbar from "../components/Navbar";
import { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CssBaseline from "@mui/material/CssBaseline";
import "../css/lato.css";

const theme = createTheme({
  // your custom theme configurations go here
  palette: {
    mode: "light",
    primary: {
      main: "#0e293d",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#ffffff",
      paper: "#e8e8e8",
    },
  },
  typography: {
    fontFamily: "Lato",
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box mb={10}>
          <Navbar />
        </Box>
        <Component {...pageProps} />
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default MyApp;
