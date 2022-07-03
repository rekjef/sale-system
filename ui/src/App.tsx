import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './styles.css';

import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import LogOut from './Pages/LogOut';
import Home from './Pages/Home';

import Header from './components/Header';
import Footer from './components/Footer';
import ErrorPage from './Pages/ErrorPage';
import Profile from './Pages/Profile';

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/profile/:username" element={<Profile />} />

        {/* Invalid url */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>

      <Footer sx={{ mt: 3 }} />
    </Router>
  );
}

export default App;
