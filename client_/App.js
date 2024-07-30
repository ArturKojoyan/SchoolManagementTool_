import { BrowserRouter as Router } from "react-router-dom";
import { Container } from "@mui/material";
import NavBar from "./components/AppBar";
import AppRouter from "./routes";

function App() {
  return (
    <Container>
      <Router>
        <NavBar />
        <AppRouter />
      </Router>
    </Container>
  );
}

export default App;
