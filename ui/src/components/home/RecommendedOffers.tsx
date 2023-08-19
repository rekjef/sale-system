import { Container, Divider, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import OfferCard, { OfferWithSellerType } from "../offer/OfferCard";
const RecommendedOffers = () => {
  const [latestOffers, setLatestOffers] = useState<OfferWithSellerType[]>([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get("api/offer/latest/");
      setLatestOffers(response.data.offers);
    })();
  }, []);

  return (
    <Container sx={{ my: 3 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Recommended offers
      </Typography>
      <Divider />
      <Grid container spacing={2} sx={{ mt: 0 }}>
        {latestOffers.slice(0, 3).map((data: OfferWithSellerType) => (
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
  );
};

export default RecommendedOffers;
