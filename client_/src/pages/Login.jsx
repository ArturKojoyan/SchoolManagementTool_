import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  FormControl,
  Input,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import { useMutation } from "@apollo/client";
import { jwtDecode } from "jwt-decode";
import { DASHBOARD_ROUTE, REGISTER_ROUTE } from "../utils";
import { LOGIN } from "../graphql/mutation/user";
import { setIsAuth, setUser } from "../store/slices/userSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login] = useMutation(LOGIN);

  function action() {
    login({
      variables: {
        input: {
          username,
          password,
        },
      },
    }).then((res) => {
      const { token } = res.data.login;
      localStorage.setItem("token", token);
      const user = jwtDecode(token);
      dispatch(setUser(user));
      dispatch(setIsAuth(true));
      navigate(DASHBOARD_ROUTE);
    });
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "500px",
          height: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4" sx={{ mb: 1 }}>
          Login
        </Typography>
        <FormControl>
          <Input
            placeholder="username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "end",
            }}
          >
            <div>
              No account ? <Link href={REGISTER_ROUTE}>Register</Link>
            </div>
            <Button variant="contained" sx={{ mt: 2 }} onClick={action}>
              Login
            </Button>
          </Box>
        </FormControl>
      </Paper>
    </Box>
  );
};

export default Login;
