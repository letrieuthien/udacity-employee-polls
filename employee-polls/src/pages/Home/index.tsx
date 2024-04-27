import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Container, Tab, Tabs } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import QuestionList from "../../components/Questions/QuestionList";
import { selectIsLoggedIn } from "../../features/slice/auth/authSlice";
import CssBaseline from "@mui/material/CssBaseline";
import Loading from "../../components/Loading";
import { RootState } from "../../features/store";

const Home = () => {
  const defaultTheme = createTheme();
  const isUserLoggedIn = useSelector(selectIsLoggedIn);
  const loading = useSelector((state: RootState) => state.users.loading);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

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
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "50vh",
                }}
              >
                <Loading />
              </Box>
            )}
            {!loading && (
              <div>
                <Tabs value={selectedTab} onChange={handleTabChange}>
                  <Tab label="Unanswered Questions" />
                  <Tab label="Answered Questions" />
                </Tabs>
                <div style={{ marginTop: "1rem" }}>
                  {selectedTab === 0 ? (
                    <QuestionList showAnswered={false} />
                  ) : (
                    <QuestionList showAnswered={true} />
                  )}
                </div>
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
