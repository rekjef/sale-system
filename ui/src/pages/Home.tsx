import {
  Box, Button, Container, Grid, Typography, Divider,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useGlobalContext } from '../UserContext';
import frontPageImage from '../assets/images/front_page.jpg';
import OfferCard, { OfferWithSellerType } from '../components/OfferCard';

function Home() {
  const { user } = useGlobalContext();
  const navigate = useNavigate();
  const [latestOffers, setLatestOffers] = useState<OfferWithSellerType[]>([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get('/offer/latest/');
      setLatestOffers(response.data.offers);
    })();
  }, []);

  return (
    <Box>
      <Box sx={{
        width: 1,
        height: 400,
        backgroundImage: `url(${frontPageImage})`,
        backgroundSize: 'cover',
        backgroundPosition: '0% 30%',
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
                  <Typography variant="h6" sx={{ mb: 1 }}>
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

      <Container sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Latest offers
        </Typography>
        <Divider />
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {latestOffers.map((data: OfferWithSellerType) => (
            <Grid key={data.details.id} item xs={12} md={4}>
              <OfferCard
                details={{
                  id: data.details.id,
                  title: data.details.title,
                  image: data.details.image,
                  price: data.details.price,
                  condition: data.details.condition,
                  category: data.details.category,
                  date: data.details.date,
                }}
                seller={{
                  email: data.seller.email,
                  first_name: data.seller.first_name,
                  last_name: data.seller.last_name,
                }}
              />
            </Grid>
          ))}

        </Grid>
      </Container>
    </Box>
  );
}

export default Home;
