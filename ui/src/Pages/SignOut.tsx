import { Button } from '@mui/material';
import axios from 'axios';
import { useSnackbar, VariantType } from 'notistack';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext, NullUser } from '../UserContext';

function SignOut() {
  const navigate = useNavigate();
  const { setUser } = useGlobalContext();
  const { enqueueSnackbar } = useSnackbar();

  const notification = (message: string, category?: VariantType) => {
    enqueueSnackbar(message, { variant: category });
  };

  const signOut = async () => {
    const response = await axios.post('/signout');
    setUser(NullUser);
    notification(response.data.notification.message, response.data.notification.category);
    navigate('/');
  };

  return (
    <Button onClick={signOut}>Sign out</Button>
  );
}

export default SignOut;
