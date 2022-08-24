import {
  Button, Card, CardActions, CardContent, CardMedia, Divider, Grid, Typography,
} from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import noOfferImage from '../assets/images/no-offer-image.png';

export type OfferWithSellerType = {
  'details': {
    'id': number,
    'title': string,
    'image': string,
    'price': number,
    'condition': boolean,
    'category': string,
    'date': string,
  },
  'seller': {
    'email': string,
    'first_name': string,
    'last_name': string
  },
};

export type OfferCardProps = {
  details: {
    'id': number,
    'title': string,
    'image': string,
    'price': number,
    'condition': boolean,
    'category': string,
    'date': string,
  },
  seller: {
    'email': string,
    'first_name': string,
    'last_name': string,
  },
}

function OfferCard({ details, seller }: OfferCardProps) {
  const navigate = useNavigate();
  return (
    <Card sx={{ width: 1, boxShadow: 3, borderRadius: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 'auto', height: 180, mx: 'auto' }}
        image={details.image === '' ? noOfferImage : details.image}
        alt="Offer's image"
      />

      <Divider sx={{ mt: 2, mx: 2 }} />

      <CardContent>
        <Grid container>
          <Grid item minHeight={71} xs md>
            <Typography gutterBottom variant="h6" component="div">
              {details.title}
            </Typography>
          </Grid>
          <Grid item xs md>
            <Typography color="text.secondary" sx={{ textAlign: 'right' }}>
              Posted
              {' '}
              {details.date.split(' ').slice(1, 4).join(' ')}
            </Typography>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={6} md={6}>
            <Typography variant="body2" color="text.secondary">
              Price:
              {' '}
              {details.price}
              $
            </Typography>
          </Grid>
          <Grid item xs={6} md={6}>
            <Typography variant="body2" color="text.secondary" textAlign="right">
              Category:
              {' '}
              {details.category}
            </Typography>
          </Grid>
          <Grid item xs={6} md={6}>
            <Typography variant="body2" color="text.secondary">
              Condition:
              {' '}
              {details.condition ? 'New' : 'Used'}
            </Typography>
          </Grid>
          <Grid item xs={6} md={6}>
            <Typography variant="body2" color="text.secondary" textAlign="right">
              Seller:
              {' '}
              {seller.first_name}
              {' '}
              {seller.last_name}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions>
        <Button onClick={() => navigate(`/offer/${details.id}`)} sx={{ width: 1 }} variant="contained" color="secondary">Check it out</Button>
      </CardActions>
    </Card>
  );
}

export default OfferCard;
