import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MessageIcon from "@mui/icons-material/Message";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import noOfferImage from "../assets/images/no-offer-image.png";

type offerType = {
  details: {
    id: number;
    title: string;
    description: string;
    image: string;
    category: string;
    price: number;
    condition: string;
    date: string;
  };
  seller: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    join_date: string;
  };
};

const blankOffer = {
  details: {
    id: -1,
    title: "",
    description: "",
    image: "",
    category: "",
    price: -1,
    condition: "",
    date: "",
  },
  seller: {
    id: -1,
    first_name: "",
    last_name: "",
    email: "",
    join_date: "",
  },
};

function OfferPage() {
  const { offerID } = useParams();
  const [data, setData] = useState<offerType>(blankOffer);
  useEffect(() => {
    (async () => {
      const response = await axios.get(`/api/offer/get/${offerID}`);
      setData(response.data);
    })();
  }, [offerID]);

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        <Grid container item md={8}>
          <Grid
            item
            container
            justifyContent="center"
            alignItems="center"
            sx={{
              bgcolor: "themeWhite.main",
              borderRadius: 2,
              boxShadow: 2,
              width: 1,
            }}
          >
            <Grid
              item
              component="img"
              alt="No offer's image"
              src={
                data.details.image === "" ? noOfferImage : data.details.image
              }
              sx={{ height: 233, mx: "auto" }}
            />
          </Grid>
        </Grid>

        <Grid container item md direction="column" spacing={2}>
          <Grid item md={4}>
            <Box
              sx={{
                bgcolor: "themeWhite.main",
                borderRadius: 2,
                boxShadow: 2,
                width: 1,
              }}
            >
              <Grid container sx={{ p: 2 }}>
                <Avatar>
                  <AccountCircleIcon />
                </Avatar>
                <Box sx={{ ml: 2 }}>
                  <Link
                    to={`/profile/${data.seller.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Typography variant="body2" color="text.primary">
                      {data.seller.first_name} {data.seller.last_name}
                    </Typography>
                  </Link>
                  <Typography color="text.secondary" variant="body2">
                    Joined in {data.seller.join_date.split(" ")[3]}
                  </Typography>
                </Box>
              </Grid>
              <Box sx={{ p: 2, pt: 0 }}>
                <Button
                  variant="outlined"
                  sx={{ width: 1 }}
                  startIcon={<MessageIcon />}
                >
                  Contact me
                </Button>
              </Box>
            </Box>
          </Grid>

          <Grid item container md>
            <Box
              sx={{
                bgcolor: "themeWhite.main",
                borderRadius: 2,
                p: 2,
                boxShadow: 2,
                width: 1,
              }}
            >
              <Box sx={{ mb: 1 }}>{data.details.title}</Box>

              <Divider />

              <Box sx={{ mt: 1 }}>
                <Typography color="text.secondary" variant="body2">
                  Condition: {data.details.condition ? "New" : "Used"}
                </Typography>

                <Typography color="text.secondary" variant="body2">
                  Category: {data.details.category}
                </Typography>

                <Typography color="text.secondary" variant="body2">
                  Price: {data.details.price}$
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

        <Grid item md={8} xs={12}>
          <Box
            sx={{
              bgcolor: "themeWhite.main",
              borderRadius: 2,
              p: 2,
              boxShadow: 2,
            }}
          >
            <Box sx={{ mb: 1 }}>Additional information</Box>

            <Divider />

            <Typography sx={{ mt: 1 }}>{data.details.description}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default OfferPage;
