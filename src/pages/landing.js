
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from '@mui/material';
import { Link as RouterLink } from "react-router-dom";

export default function LandingPage() {
  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
        Landing page
        </Typography>
        <Link component={RouterLink} to="/chat">Chat page</Link>
      </Box>
    </Container>
  );
}