import { Box, Container, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();
const NotFound = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md" sx={{ marginTop: "2rem" }}>
        <CssBaseline />
        <Box
          sx={{
            textAlign: "center",
            py: "10rem",
          }}
          data-testid="not-found-box"
        >
          <Typography variant="h3">404 - Page Not Found</Typography>
          <br />
          <Typography variant="h6">
            Oops! The page you are looking for does not exist.
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default NotFound;
