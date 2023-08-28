import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import noOfferImage from "../../assets/images/no-offer-image.png";

export type OfferWithSellerType = {
  details: {
    id: number;
    title: string;
    image: string;
    price: number;
    condition: string;
    category: string;
    date: string;
  };
  seller: {
    email: string;
    first_name: string;
    last_name: string;
  };
};

export type OfferCardProps = {
  details: {
    id: number;
    title: string;
    image: string;
    price: number;
    condition: string;
    category: string;
    date: string;
  };
  seller: {
    email: string;
    first_name: string;
    last_name: string;
  };
};

function OfferSearchCard({ details, seller }: OfferCardProps) {
  const navigate = useNavigate();
  return (
    <Card sx={{ width: 1, height: 1, boxShadow: 3, borderRadius: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: "auto", height: 180, mx: "auto" }}
        image={details.image === "" ? noOfferImage : details.image}
        alt="Offer's image"
      />

      <Divider sx={{ mt: 2, mx: 2 }} />

      <CardContent>
        <Box sx={{ fontWeight: "bold" }}>{details.title}</Box>

        <Grid container>
          <Grid item xs={6} md={6}>
            <Typography variant="body2" color="text.secondary">
              Price: {details.price}$
            </Typography>
          </Grid>
          <Grid item xs={6} md={6}>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="right"
            >
              C: {details.category}
            </Typography>
          </Grid>
          <Grid item xs={6} md={6}>
            <Typography variant="body2" color="text.secondary">
              {details.condition}
            </Typography>
          </Grid>
          <Grid item xs={6} md={6}></Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="body2" color="text.secondary">
              Seller: {seller.first_name} {seller.last_name}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions>
        <Button
          onClick={() => navigate(`/offer/${details.id}`)}
          sx={{ width: 1 }}
          variant="contained"
          color="secondary"
        >
          View offer
        </Button>
      </CardActions>
    </Card>
  );
}

export default OfferSearchCard;
