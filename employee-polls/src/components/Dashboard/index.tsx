import React from "react";
import { useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { selectUserLoggedIn } from "../../features/slice/auth/authSlice";
import { selectQuestions } from "../../features/slice/questions/questionsSlice";
import Box from "@mui/material/Box";
import {
  Grid,
  Container,
  Card,
  Button,
  CardContent,
  CardHeader,
} from "@mui/material";

const DashBoard = () => {
  const navigate = useNavigate();
  const userLoggedIn = useSelector(selectUserLoggedIn);
  const questions = useSelector(selectQuestions);

  const handleShowQuestion = (questionId: string) => {
    navigate(`/question/${questionId}`);
  };

  const unansweredQuestions =
    questions?.filter(
      (question) =>
        userLoggedIn &&
        question.optionOne.votes &&
        question.optionTwo.votes &&
        !question.optionOne.votes.includes(userLoggedIn.id) &&
        !question.optionTwo.votes.includes(userLoggedIn.id)
    ) ?? [];

  const answeredQuestions =
    questions?.filter(
      (question) =>
        userLoggedIn &&
        question.optionOne.votes &&
        question.optionTwo.votes &&
        (question.optionOne.votes.includes(userLoggedIn.id) ||
          question.optionTwo.votes.includes(userLoggedIn.id))
    ) ?? [];

  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Grid container justifyContent="center" data-testid="dashboard">
      <Grid item xs={12} md={8}>
        <Box sx={{ width: "100%", typography: "div" }}>
          <Container>
            <Grid container spacing={2}>
              {unansweredQuestions &&
                unansweredQuestions.map((question) => (
                  <Grid item xs={12} md={4}>
                    <Link
                      to={`/question/${question.id}`}
                      key={`unanswered-${question.id}`}
                    >
                      <Card>
                        <CardContent>
                          <CardHeader textAlign="center">
                            {question.author}
                          </CardHeader>

                          {moment(question.timestamp).format(
                            "hh:mm:A | MM/DD/YYYY"
                          )}
                          <Button
                            variant="outlined"
                            fullWidth
                            onClick={() => handleShowQuestion(question.id)}
                          >
                            Show
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  </Grid>
                ))}
            </Grid>
          </Container>
          <Container>
            <Grid container spacing={2}>
              {answeredQuestions &&
                answeredQuestions.map((question) => (
                  <Grid item xs={12} md={4}>
                    <Link
                      to={`/question/${question.id}`}
                      key={`answered-${question.id}`}
                    >
                      <Card>
                        <CardContent>
                          <CardHeader textAlign="center">
                            {question.author}
                          </CardHeader>

                          {moment(question.timestamp).format(
                            "hh:mm:A | MM/DD/YYYY"
                          )}
                          <Button
                            variant="outlined"
                            fullWidth
                            onClick={() => handleShowQuestion(question.id)}
                          >
                            Show
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  </Grid>
                ))}
            </Grid>
          </Container>
        </Box>
      </Grid>
    </Grid>
  );
};

export default DashBoard;
