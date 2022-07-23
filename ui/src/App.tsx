/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SnackbarProvider, useSnackbar } from 'notistack';
import './App.css';

import { Button, ThemeProvider } from '@mui/material';
import axios from 'axios';
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import Home from './Pages/Home';

import Header from './components/Header';
import Footer from './components/Footer';
import ErrorPage from './Pages/ErrorPage';
import AddOffer from './Pages/AddOffer';
import { UserContext, User, NullUser } from './UserContext';
import Offer from './Pages/Offer';
import theme from './Theme';
import Profile from './Pages/Profile';

function App() {
  const [user, setUser] = useState<User>(NullUser);

  useEffect(() => {
    (async () => {
      const response = await axios.get('/currentuser');
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
