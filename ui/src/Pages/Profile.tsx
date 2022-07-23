import {
  Container, Box, Typography, Divider, Avatar, Grid,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import OfferCard, { OfferCardProps } from '../components/OfferCard';

type profileType = {
  first_name: string,
  last_name: string,
  email: string,
  join_date: string,
};

function Profile() {
  const { userID } = useParams<string>();
  const [profile, setProfile] = useState<profileType>({
    first_name: '', last_name: '', email: '', join_date: '',
  });
  const [offers, setOffers] = useState<OfferCardProps['data'][]>([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get(`/profile/${userID}`);
      setProfile(response.data.user);
      setOffers(response.data.offers);
    })();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{
        width: 1, boxShadow: 2, borderRadius: 2, bgcolor: 'themeWhite.main',
      }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">
            User&apos;s profile
          </Typography>

          <Divider />

          <Box sx={{ mt: 1 }}>
            <Grid container>
              <Avatar sx={{ width: 100, height: 100 }} variant="rounded">
                <AccountCircleIcon sx={{ width: 50, height: 50 }} />
              </Avatar>
              <Box sx={{ ml: 2 }}>
                {profile.first_name}
                {' '}
                {profile.last_name}
                <br />
                {profile.email}
                <Typography color="text.secondary">
                  Joined in
                  {' '}
                  {profile.join_date.split(' ')[3]}
                </Typography>
              </Box>
            </Grid>

            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">
                User&apos;s offers
              </Typography>
              <Divider />

              <Grid container sx={{ mt: 1 }} spacing={2}>
                {offers.map((_offer: OfferCardProps['data']) => (
                  <Grid item key="{_offer}" xs={12} md={4}>
                    <OfferCard
                      data={_offer}
                      creator={{
                        email: profile.email,
                        first_name: profile.first_name,
                        last_name: profile.last_name,
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Profile;
