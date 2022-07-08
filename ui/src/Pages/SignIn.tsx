import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useSnackbar, VariantType } from 'notistack';

import axios from 'axios';
import { useGlobalContext } from '../UserContext';

function SignIn() {
  const { setUser } = useGlobalContext();

  const { enqueueSnackbar } = useSnackbar();

  const notification = (message: string, type?: VariantType) => {
    enqueueSnackbar(message, { variant: type });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    axios.post('/signin', {
      email: data.email,
      password: data.password,
    }).then((response) => {
      notification(response.data.notification.message, response.data.notification.category);
      setUser({
        id: response.data.id,
        email: response.data.id,
        isLogged: true,
      });
      window.location.href = '/';
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" method="POST" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
           /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            {/* <Grid item xs>
              <Link href="/" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Link to="/signup">
                Don&apos;t have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
          <Link to="/">
            Go home page
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

export default SignIn;
