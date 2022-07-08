import { Button } from '@mui/material';
import axios from 'axios';
import React from 'react';

function SignOut() {
  const signOut = async () => {
    await axios.post('/signout');
    window.location.href = '/';
  };

  return (
    <Button onClick={signOut}>Sign out</Button>
  );
}

export default SignOut;
