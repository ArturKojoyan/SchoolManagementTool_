import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import {
  Box,
  Button,
  FormControl,
  Input,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { DASHBOARD_ROUTE, LOGIN_ROUTE } from "../utils";
import { REGISTER } from "../graphql/mutation/user";
import { setIsAuth, setUser } from "../store/slices/userSlice";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register] = useMutation(REGISTER);

  function action() {
    register({
      variables: {
        input: {
          username,
          password,
          role: "ADMIN",
        },
      },
    }).then((res) => {
      const { token } = res.data.register;
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
          Register
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
              Have account ? <Link href={LOGIN_ROUTE}>Login</Link>
            </div>
            <Button variant="contained" sx={{ mt: 2 }} onClick={action}>
              Register
            </Button>
          </Box>
        </FormControl>
      </Paper>
    </Box>
  );
};

export default Register;
