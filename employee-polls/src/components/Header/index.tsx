import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import {
  selectIsLoggedIn,
  logout,
  selectUserLoggedIn,
} from "../../features/slice/auth/authSlice";
import { Link, useNavigate, NavLink } from "react-router-dom";
import {useEffect, useState} from "react";
import '../../assets/style.css'

export default function Header() {
  const [image, setImage] = useState(null);
  const isLogged = useSelector(selectIsLoggedIn);
  const userLoggedIn: any = useSelector(selectUserLoggedIn);
  const navigate = useNavigate()

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login')
  };
  useEffect(() => {
    if(userLoggedIn){
      setImage(userLoggedIn.avatarURL)
    }
  }, [userLoggedIn]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 1.5,
        borderBottom: 1.5,
        borderColor: "divider",
      }}
      data-testid="header-box"
    >
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={1} sm={1} sx={{ textAlign: "center" }}>
          <NavLink className={({isActive}) => isActive ? "nav-link active": "nav-link" }  to="/" style={{ textDecoration: "none" }}>
            Home
          </NavLink >
        </Grid>
        <Grid item xs={1} sm={1} sx={{ textAlign: "center" }}>
          <NavLink className={({isActive}) => isActive ? "nav-link active": "nav-link" } to="/leaderBoard" style={{ textDecoration: "none" }}>
            Leaderboard
          </NavLink>
        </Grid>
        <Grid item xs={1} sm={1} sx={{ textAlign: "center" }}>
          <NavLink className={({isActive}) => isActive ? "nav-link active": "nav-link" } to="/add" style={{ textDecoration: "none" }}>
            New
          </NavLink>
        </Grid>
        <Grid item xs={1} sm={2} sx={{ textAlign: "center" }}></Grid>
        {isLogged ? (
          <Grid item xs={3} sm={2} sx={{ textAlign: "center", cursor: "default" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {image && <img src={'/src/assets/'+image} alt={userLoggedIn?.name} style={{ width: 50, height: 50, marginRight: "10px" }}/>}


              {userLoggedIn?.name}
            </Box>
          </Grid>
        ) : (
          <Grid item xs={1} sm={2} sx={{ textAlign: "center" }}></Grid>
        )}
        <Grid item xs={1} sm={1} sx={{ textAlign: "center" }}>
          {isLogged ? (
            <Button
              onClick={handleLogout}
              size="small"
              variant="outlined"
              color="primary"
            >
              Logout
            </Button>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button size="small" variant="outlined" color="success">
                Login
              </Button>
            </Link>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
