import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { isAuthSelector, setIsAuth, setUser } from "../store/slices/userSlice";
import {  LOGIN_ROUTE } from "../utils";
import { useLocation, useNavigate } from "react-router-dom";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuth = useSelector(isAuthSelector);

  const logOut = () => {
    dispatch(setIsAuth(false));
    dispatch(setUser({}));
    localStorage.removeItem("token");
    navigate(LOGIN_ROUTE);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          {isAuth && (
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
          )}
          {isAuth && (
            <Button color="inherit" onClick={logOut}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
