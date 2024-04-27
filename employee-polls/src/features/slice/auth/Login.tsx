import { FormHelperText } from "@mui/material";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserList } from "../../../utils/_DATA";
import { useAppDispatch } from "../../store";
import { User } from "../../models/User";
import { fetchQuestions } from "../questions/questionsSlice";
import { login } from "./authSlice";
import banner from "../../../assets/banner.png";

const defaultTheme = createTheme();

interface IFormInput {
  id: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirect = searchParams.get("redirect");
  const {
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = useForm<IFormInput>({
    defaultValues: {
      id: "",
      password: "",
    },
  });

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const getUser = (await getUserList()) as Record<string, User>;

    const findUser: User | undefined = Object.values(getUser).find(
      (gU) => gU.id === data.id && gU.password === data.password,
    );

    if (findUser && findUser.id && findUser.password) {
      const fUser: User = {
        ...data,
        name: findUser.name,
        avatarURL: findUser.avatarURL,
        answers: findUser.answers,
        questions: findUser.questions,
      };

      dispatch(login(fUser));
      dispatch(fetchQuestions());
      navigate(state?.path || redirect);
    } else {
      setError("root.wrongUsr", {
        type: "invalidUsrOrPwd",
        message: "Invalid username",
      });
      setError("root.wrongPwd", {
        type: "invalidUsrOrPwd",
        message: "Invalid password",
      });
    }
  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src={banner} alt={"banner"} />
            <Typography
              variant="h5"
              sx={{ marginTop: 2, fontWeight: "bold" }}
              gutterBottom
            >
              Log In
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 1, textAlign: "center" }}
            >
              <Controller
                name="id"
                control={control}
                rules={{
                  required: "Username is required!",
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    style={{ width: 450 }}
                    id="id"
                    data-testname="id"
                    label="User name"
                    autoFocus
                    required
                    error={Boolean(errors?.id)}
                    helperText={
                      typeof errors?.id?.message === "string"
                        ? errors?.id?.message
                        : ""
                    }
                  />
                )}
              />
              {errors?.root?.wrongUsr ? (
                <FormHelperText
                  id="id-helper-text"
                  error
                  className="custom-class"
                >
                  {errors?.root?.wrongUsr?.message}
                </FormHelperText>
              ) : null}

              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Password is required!",
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    required
                    style={{ width: 450 }}
                    label="Password"
                    type="password"
                    id="password"
                    data-testid="password"
                    autoComplete="current-password"
                    error={Boolean(errors?.password)}
                    helperText={
                      typeof errors?.password?.message === "string"
                        ? errors?.password?.message
                        : ""
                    }
                  />
                )}
              />
              {errors?.root?.wrongPwd ? (
                <FormHelperText
                  id="password-helper-text"
                  error
                  className="custom-class"
                >
                  {errors?.root?.wrongPwd?.message}
                </FormHelperText>
              ) : null}

              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                Submit
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};
export default Login;
