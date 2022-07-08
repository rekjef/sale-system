/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SnackbarProvider, useSnackbar } from 'notistack';
import './App.css';
import './styles.css';

import { Button } from '@mui/material';
import axios from 'axios';
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import SignOut from './Pages/SignOut';
import Home from './Pages/Home';

import Header from './components/Header';
import Footer from './components/Footer';
import ErrorPage from './Pages/ErrorPage';
import Profile from './Pages/Profile';
import { UserContext, User, NullUser } from './UserContext';

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
      <Button onClick={() => { closeSnackbar(id); }}>
        Dismiss
      </Button>
    );
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
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
            <Route path="/signout" element={<SignOut />} />
            <Route path="/profile/:username" element={<Profile />} />

            {/* Invalid url */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>

          <Footer />
        </Router>
      </SnackbarProvider>
    </UserContext.Provider>
  );
}

export default App;
