import React from "react";
import { useSelector } from "react-redux";
import { Box, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import QuestionList from "../../components/Questions/QuestionList";
import { selectIsLoggedIn } from "../../features/slice/auth/authSlice";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Loading from "../../components/Loading";
import {RootState} from "../../features/store";

const Home = () => {
  const defaultTheme = createTheme();
  const isUserLoggedIn = useSelector(selectIsLoggedIn);
  const loading = useSelector((state: RootState) => state.users.loading);

  const renderPleaseLoginTemplate = () => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          verticalAlign: "center",
          minHeight: "80vh",
        }}
      >
        {/* <Typography variant="h5" color="secondary" gutterBottom> */}
        Please log in to access the Employee Polls Page.
        {/* </Typography> */}
      </Box>
    );
  };

  const renderTemplateLoggedIn = () => {
    return (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="md" sx={{ marginTop: "2rem" }}>
          <CssBaseline />
          <div style={{ marginTop: "1rem" }}>
            {loading && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '50vh'
                }}
              >
                <Loading />
              </Box>
            )}
            {!loading && (
              <div>
                <Box sx={{ width: "100%", typography: "div", textAlign: "center", border: 1, borderColor: 'divider', padding: 2 }}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', borderBottom: 1, borderColor: 'divider', paddingBottom: 2 }} gutterBottom>
                    New Questions
                  </Typography>
                  <QuestionList showAnswered={false} />
                </Box>
                <Box sx={{ width: "100%", typography: "div", textAlign: "center", border: 1, borderColor: 'divider', padding: 2, marginTop: 4 }}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', borderBottom: 1, borderColor: 'divider', paddingBottom: 2 }} gutterBottom>
                    Done
                  </Typography>
                  <QuestionList showAnswered={true} />
                </Box>
              </div>
            )}
          </div>
        </Container>
      </ThemeProvider>
    );
  };

  return (
    <>
      {!isUserLoggedIn ? renderPleaseLoginTemplate() : renderTemplateLoggedIn()}
    </>
  );
};

export default Home;
