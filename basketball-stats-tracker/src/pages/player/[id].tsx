import { useRouter } from "next/router";
import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import GroupIcon from "@mui/icons-material/Group";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";

const PlayerProfilePage = () => {
  const router = useRouter();
  const { id } = router.query;

  const player = {
    id: `Player ${id}`,
    firstName: "John",
    lastName: "Doe",
    ppg: 24.1,
    apg: 6.3,
    rpg: 5.5,
    team: "Lakers",
    birthDate: "1995-01-15",
    hometown: "Los Angeles",
    age: 28,
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" padding={5}>
      <Avatar
        src="/images/player_placeholder.png"
        sx={{ width: 200, height: 200, marginBottom: 5, marginTop: 1 }}
      />
      <Typography variant="h4" gutterBottom>
        {player.firstName} {player.lastName}
      </Typography>
      <Typography variant="h6" gutterBottom>
        ID: {player.id}
      </Typography>
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }} // Vertical on small and below, horizontal on medium and above
        alignItems="start"
        width="100%"
        justifyContent="center"
      >
        <Card
          elevation={3}
          sx={{
            width: "100%",
            maxWidth: { sm: 400 }, // Responsive width
            marginTop: 2,
            marginBottom: { xs: 2, sm: 0 }, // Margin at bottom for small screens
            marginLeft: { xs: 0, sm: 2 }, // Margin left only for screens bigger than small
            height: 200,
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom marginBottom={2}>
              Personal Information
            </Typography>
            <Typography variant="body1" marginBottom={2}>
              Birth Date: {player.birthDate}
            </Typography>
            <Typography variant="body1" marginBottom={2}>
              Hometown: {player.hometown}
            </Typography>
            <Typography variant="body1" marginBottom={2}>
              Age: {player.age}
            </Typography>
          </CardContent>
        </Card>
        <Card
          elevation={3}
          sx={{
            width: "100%",
            maxWidth: { sm: 400 }, // Responsive width
            marginTop: 2,
            marginBottom: { xs: 2, sm: 0 }, // Margin at bottom for small screens
            marginLeft: { xs: 0, sm: 2 }, // Margin left only for screens bigger than small
            height: 200,
          }}
        >
          <CardContent>
            <Box display="flex" alignItems="center" marginBottom={2}>
              <SportsBasketballIcon
                color="primary"
                style={{ marginRight: 10 }}
              />
              <Typography variant="body1">
                Points Per Game (PPG): {player.ppg}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" marginBottom={2}>
              <GroupIcon color="primary" style={{ marginRight: 10 }} />
              <Typography variant="body1">
                Assists Per Game (APG): {player.apg}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" marginBottom={2}>
              <EmojiPeopleIcon color="primary" style={{ marginRight: 10 }} />
              <Typography variant="body1">
                Rebounds Per Game (RPG): {player.rpg}
              </Typography>
            </Box>

            <Typography>Team: {player.team}</Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default PlayerProfilePage;
