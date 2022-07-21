import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Avatar,
  Box, Button, Container, Divider, Grid, Typography,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MessageIcon from '@mui/icons-material/Message';
import { useGlobalContext } from '../UserContext';
import noOfferImage from '../assets/images/no-offer-image.png';

type offerType = {
  id: number,
  title: string,
  description: string,
  image: string,
  category: string,
  price: number,
  condition: string,
  date: string,
};

function Home() {
  const { user } = useGlobalContext();
  const { offerID } = useParams();
  const [offer, setOffer] = useState<offerType | null>(null);

  useEffect(() => {
    (async () => {
      const response = await axios.get(`/get-offer/${offerID}`);
      setOffer(response.data.offer);
    })();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={2}>

        <Grid
          container
          item
          md={8}
        >
          <Grid
            item
            container
            justifyContent="center"
            alignItems="center"
            sx={{
              bgcolor: 'themeWhite.main', borderRadius: 2, boxShadow: 2, width: 1,
            }}
          >
            <Grid item component="img" alt="No offer's image" src={noOfferImage} sx={{ height: 233, mx: 'auto' }} />
          </Grid>
        </Grid>

        <Grid container item md direction="column" spacing={2}>

          <Grid
            item
            md={4}
          >
            <Box sx={{
              bgcolor: 'themeWhite.main', borderRadius: 2, boxShadow: 2, width: 1,
            }}
            >
              <Grid container sx={{ p: 2 }}>
                <Avatar>
                  <AccountCircleIcon />
                </Avatar>
                <Box sx={{ ml: 2 }}>
                  Tadeusz Soplica
                  <Typography color="text.secondary" variant="body2">Joined in 2022</Typography>
                </Box>
              </Grid>
              <Box sx={{ p: 2, pt: 0 }}>
                <Button variant="outlined" sx={{ width: 1 }} startIcon={<MessageIcon />}>Contact me</Button>
              </Box>
            </Box>
          </Grid>

          <Grid
            item
            container
            md
          >
            <Box sx={{
              bgcolor: 'themeWhite.main', borderRadius: 2, p: 2, boxShadow: 2, width: 1,
            }}
            >
              <Box sx={{ mb: 1 }}>
                {offer?.title}
              </Box>

              <Divider />

              <Box sx={{ mt: 1 }}>
                <Typography color="text.secondary" variant="body2">
                  Condition:
                  {' '}
                  {offer?.condition ? 'New' : 'Used'}
                </Typography>

                <Typography color="text.secondary" variant="body2">
                  Category:
                  {' '}
                  {offer?.category}
                </Typography>

                <Typography color="text.secondary" variant="body2">
                  Price:
                  {' '}
                  {offer?.price}
                  $
                </Typography>
              </Box>
              <Button variant="contained" color="info" sx={{ width: 1, mt: 1 }}>
                Buy now
              </Button>
              <Button variant="outlined" color="info" sx={{ width: 1, mt: 1 }}>
                Ask seller
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Grid
          item
          md={8}
          xs={12}
        >
          <Box sx={{
            bgcolor: 'themeWhite.main', borderRadius: 2, p: 2, boxShadow: 2,
          }}
          >
            <Box sx={{ mb: 1 }}>
              Additional information
            </Box>

            <Divider />

            <Typography sx={{ mt: 1 }}>
              {offer?.description}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
