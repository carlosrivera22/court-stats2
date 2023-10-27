import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function Home() {
  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="80vh"
      >
        <Typography variant="h4" gutterBottom>
          Basketball Stats Tracker
        </Typography>

        <Button variant="contained" color="primary">
          Upload Stats
        </Button>
      </Box>
    </Container>
  );
}
