// pages/_app.tsx
import Navbar from "../components/Navbar";
import { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

const theme = createTheme({
  // your custom theme configurations go here
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Box mb={15}>
        <Navbar />
      </Box>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
