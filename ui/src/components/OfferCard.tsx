import {
  Button, Card, CardActions, CardContent, CardMedia, Grid, Typography, Divider,
} from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import noOfferImage from '../assets/images/no-offer-image.png';

export type OfferWithCreatorType = {
  'id': number,
  'title': string,
  'image': string,
  'price': number,
  'condition': boolean,
  'category': string,
  'date': string,
  'creator': {
    'email': string,
    'first_name': string,
    'last_name': string
  },
};

export type OfferCardProps = {
  data: {
    'id': number,
    'title': string,
    'image': string,
    'price': number,
    'condition': boolean,
    'category': string,
    'date': string,
  },
  creator: {
    'email': string,
    'first_name': string,
    'last_name': string,
  },
}

function OfferCard({ data, creator }: OfferCardProps) {
  const navigate = useNavigate();
  return (
    <Card sx={{ width: 1, boxShadow: 3, borderRadius: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={noOfferImage}
        alt="Offer's image"
      />

      <Divider sx={{ mt: 2, mx: 2 }} />

      <CardContent>
        <Grid container>
          <Grid item xs md>
            <Typography gutterBottom variant="h5" component="div">
              {data.title}
            </Typography>
          </Grid>
          <Grid item xs md>
            <Typography color="text.secondary" sx={{ textAlign: 'right' }}>
              Posted
              {' '}
              {data.date.split(' ').slice(1, 4).join(' ')}
            </Typography>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={6} md={6}>
            <Typography variant="body2" color="text.secondary">
              Price:
              {' '}
              {data.price}
              $
            </Typography>
          </Grid>
          <Grid item xs={6} md={6}>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'right' }}>
              Category:
              {' '}
              {data.category}
            </Typography>
          </Grid>
          <Grid item xs={6} md={6}>
            <Typography variant="body2" color="text.secondary">
              Condition:
              {' '}
              {data.condition ? 'New' : 'Used'}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button onClick={() => navigate(`/offer/${data.id}`)} sx={{ width: 1 }} variant="contained" color="secondary">Check it out</Button>
      </CardActions>
    </Card>
  );
}

export default OfferCard;
