import { SnackbarProvider, useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import { Button, ThemeProvider } from "@mui/material";
import axios from "axios";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import Footer from "./components/Footer";
import Header from "./components/Header";
import AddOffer from "./pages/AddOffer";
import ErrorPage from "./pages/ErrorPage";
import Offer from "./pages/Offer";
import Profile from "./pages/Profile";
import theme from "./Theme";
import { NullUser, User, UserContext } from "./UserContext";
// axios.defaults.baseURL = `http://localhost:5000`;
function App() {
  const [user, setUser] = useState<User>(NullUser);

  useEffect(() => {
    (async () => {
      const response = await axios.get("/api/user/current");
      setUser(response.data);
    })();
  }, [user?.isLogged]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function CloseSnackbarAction({ id }: any) {
    const { closeSnackbar } = useSnackbar();
    return (
      <Button
        sx={{ color: "white" }}
        onClick={() => {
          closeSnackbar(id);
        }}
      >
        Dismiss
      </Button>
    );
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={3}
          action={(key: any) => <CloseSnackbarAction id={key} />}
        >
          <Router>
            <Header />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/add-offer" element={<AddOffer />} />
              <Route path="/offer/:offerID" element={<Offer />} />
              <Route path="/profile/:userID" element={<Profile />} />

              {/* Invalid url */}
              <Route path="*" element={<ErrorPage />} />
            </Routes>

            <Footer />
          </Router>
        </SnackbarProvider>
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default App;
