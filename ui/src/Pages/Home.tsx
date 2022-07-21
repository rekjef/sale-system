import {
  Box, Button, Container, Grid, Typography,
} from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../UserContext';
import frontPageImage from '../assets/images/front_page.jpg';

function Home() {
  const { user } = useGlobalContext();
  const navigate = useNavigate();
  return (
    <Box>
      {/* https://www.pexels.com/photo/assorted-clothes-996329/ */}
      <Box sx={{
        width: 1, height: 400, backgroundImage: `url(${frontPageImage})`, backgroundSize: 'cover',
      }}
      >
        <Container sx={{ height: 1 }}>
          <Grid container alignItems="center" sx={{ height: 1 }}>
            <Grid item md={4} xs>
              <Box sx={{
                width: 1, boxShadow: 2, borderRadius: 2, bgcolor: 'themeWhite.main',
              }}
              >
                <Box sx={{ p: 2 }}>
                  <Typography variant="h6">
                    Want to sell your stuff?
                  </Typography>
                  {user.isLogged ? (
                    <Button onClick={() => navigate('/add-offer')} sx={{ mt: 1, width: 1 }} variant="contained">Add offer</Button>
                  ) : (
                    <>
                      <Button onClick={() => navigate('/signup')} variant="outlined" sx={{ mt: 1, width: 1 }}>
                        Sign up
                      </Button>
                      <Button onClick={() => navigate('/signin')} variant="contained" color="secondary" sx={{ mt: 1, width: 1 }}>
                        Sign in
                      </Button>
                    </>
                  )}

                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
