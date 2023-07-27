
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from '@mui/material';
import { Link as RouterLink } from "react-router-dom";
import HomeHero from "../components/home/hero";

export default function LandingPage() {
	return (
		<Container maxWidth="xl">
			<HomeHero />
		</Container>
	);
}
