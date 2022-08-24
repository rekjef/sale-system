/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SnackbarProvider, useSnackbar } from 'notistack';
import './App.css';

import { Button, ThemeProvider } from '@mui/material';
import axios from 'axios';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';

import Header from './components/Header';
import Footer from './components/Footer';
import ErrorPage from './pages/ErrorPage';
import AddOffer from './pages/AddOffer';
import { UserContext, User, NullUser } from './UserContext';
import Offer from './pages/Offer';
import theme from './Theme';
import Profile from './pages/Profile';

function App() {
  const [user, setUser] = useState<User>(NullUser);

  useEffect(() => {
    (async () => {
      const response = await axios.get('/user/current');
      setUser(response.data);
    })();
  }, [user?.isLogged]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function CloseSnackbarAction({ id }: any) {
    const { closeSnackbar } = useSnackbar();
    return (
      <Button sx={{ color: 'white' }} onClick={() => { closeSnackbar(id); }}>
        Dismiss
      </Button>
    );
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={3}
          action={(key) => <CloseSnackbarAction id={key} />}
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
