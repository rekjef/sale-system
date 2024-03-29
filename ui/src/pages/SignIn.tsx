import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar, VariantType } from "notistack";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

import axios, { AxiosError } from "axios";
import { responseNotificationType } from "../globalTypes";
import { useGlobalContext } from "../UserContext";

function SignIn() {
  const { setUser } = useGlobalContext();

  const { enqueueSnackbar } = useSnackbar();

  const notification = (message: string, category?: VariantType) => {
    enqueueSnackbar(message, { variant: category });
  };

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    axios
      .post("api/user/sign-in", {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        notification(
          response.data.notification.message,
          response.data.notification.category
        );
        setUser({
          id: response.data.id,
          email: response.data.id,
          isLogged: true,
        });
        navigate("/");
      })
      .catch((err: AxiosError) => {
        if (err.response) {
          const n = err.response.data as responseNotificationType;
          notification(n.notification.message, n.notification.category);
        }
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          method="POST"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
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
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/signup">Don&apos;t have an account? Sign Up</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignIn;
