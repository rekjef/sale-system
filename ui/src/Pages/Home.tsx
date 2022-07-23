import {
  Box, Button, Container, Grid, Typography, Divider,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useGlobalContext } from '../UserContext';
import frontPageImage from '../assets/images/front_page.jpg';
import OfferCard, { OfferCardProps, OfferWithCreatorType } from '../components/OfferCard';

function Home() {
  const { user } = useGlobalContext();
  const navigate = useNavigate();
  const [latestOffers, setLatestOffers] = useState<OfferWithCreatorType[]>([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get('/get-latest-offers/');
      setLatestOffers(response.data.offers);
    })();
  }, []);

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

      <Container sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Latest offers
        </Typography>
        <Divider />
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {latestOffers.map((_offer: OfferWithCreatorType) => (
            <Grid item xs={12} md={4}>
              <OfferCard
                key="{_offer}"
                data={{
                  id: _offer.id,
                  title: _offer.title,
                  image: _offer.image,
                  price: _offer.price,
                  condition: _offer.condition,
                  category: _offer.category,
                  date: _offer.date,
                }}
                creator={{
                  email: _offer.creator.email,
                  first_name: _offer.creator.first_name,
                  last_name: _offer.creator.last_name,
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
