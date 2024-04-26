import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Loading from '../Loading';
import { useSelector } from 'react-redux';
import { selectUsers } from '../../features/slice/users/usersSlice';
import { RootState } from '../../features/store';
import CssBaseline from "@mui/material/CssBaseline";

export default function Leaderboard() {
  const defaultTheme = createTheme();

  const users = Object.values(useSelector(selectUsers));
  const loading = useSelector((state: RootState) => state.users.loading);
  const error = useSelector((state: RootState) => state.users.error);

  const renderTemplate = () => {
    return (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="md" sx={{ my: 4 }}>
          <CssBaseline />
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
          {error && (
              <h5>Error: {error}</h5>
          )}
          {!loading && (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>User's name</TableCell>
                    <TableCell style={{ textAlign: 'center'}}>Unanswered Question</TableCell>
                    <TableCell style={{ textAlign: 'center'}}>Answered Question</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((u, idx) => {
                    return (
                      <TableRow
                        key={`${u.name}-${idx}`}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 }
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <div style={{ display: 'flex', alignItems: 'center'}}>
                            <img src={'/src/assets/'+ u?.avatarURL} alt={u?.name} style={{ width: 30, height: 30, marginRight: "10px" }}/>
                            <span>{u.name}</span>
                          </div>
                        </TableCell>
                        <TableCell style={{ textAlign: 'center'}}>{u?.questions.length}</TableCell>
                        <TableCell style={{ textAlign: 'center'}}>
                          {Object.values(u?.answers).length}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Container>
      </ThemeProvider>
    );
  };

  return <>{renderTemplate()}</>;
}
