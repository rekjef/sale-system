import AccountCircleIcon from "@mui/icons-material/AccountCircle";
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
import { BuyButton } from "../styledComponents";
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
    <Container sx={{ my: 4 }}>
      {/* Layout */}
      <Grid container spacing={2}>
        {/* Main section */}
        <Grid item md={8} xs={12}>
          <Grid
            container
            sx={{
              bgcolor: "themeWhite.main",
              borderRadius: 2,
              boxShadow: 2,
              height: 1,
            }}
          >
            <Grid item sx={{ ml: 2, mt: 2 }}>
              <Typography>Warm winter hat</Typography>
            </Grid>
            <Grid
              item
              container
              justifyContent="center"
              alignItems="center"
              sx={{
                width: 1,
                height: 1,
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
        </Grid>
        {/* Right section */}
        <Grid item md={4} xs={12}>
          <Grid
            container
            sx={{
              bgcolor: "themeWhite.main",
              borderRadius: 2,
              boxShadow: 2,
              width: 1,
              p: 2,
            }}
          >
            <Grid container spacing={1}>
              {/* icon */}
              <Grid item>
                <Avatar>
                  <AccountCircleIcon />
                </Avatar>
              </Grid>
              {/* right */}
              <Grid item>
                <Link
                  to={`/profile/${data.seller.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Typography variant="body2" color="text.primary">
                    {data.seller.first_name} {data.seller.last_name}
                  </Typography>
                </Link>
                <Typography color="text.secondary" variant="body2">
                  rekjef
                </Typography>
              </Grid>
              {/* under */}
              <Grid item md={12} xs={12}>
                <Typography color="text.secondary" variant="body2">
                  michalak.filip.04@gmail.com
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  Joined in {data.seller.join_date.split(" ")[3]}
                </Typography>
              </Grid>
              {/* view profile button */}
              <Grid item xs={12}>
                <Link to={`/profile/${data.seller.id}`}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    sx={{ width: 1 }}
                  >
                    View profile
                  </Button>
                </Link>
              </Grid>
            </Grid>
            <Grid item sx={{ width: 1, mt: 1 }}>
              <Divider />
            </Grid>

            {/* info */}
            <Grid container flexDirection="column">
              <Grid item sx={{ mt: 0 }}>
                {data.details.title}
              </Grid>
              <Grid item>
                <Typography color="text.secondary" variant="body2">
                  Price: {data.details.price}$
                </Typography>
              </Grid>
              <Grid item>
                <Typography color="text.secondary" variant="body2">
                  Category: {data.details.category}
                </Typography>
              </Grid>
              <Grid item>
                <Typography color="text.secondary" variant="body2">
                  Condition: {data.details.condition ? "New" : "Used"}
                </Typography>
              </Grid>
              <Grid item>
                <Typography color="text.secondary" variant="body2">
                  Post date: {data.details.condition ? "New" : "Used"}
                </Typography>
              </Grid>
              <Grid item>
                <Typography color="text.secondary" variant="body2">
                  Location: {data.details.condition ? "New" : "Used"}
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="btnGrey"
                  sx={{ width: 1, mt: 1 }}
                >
                  Ask seller
                </Button>
                <BuyButton content="Buy now" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Description section */}
        <Grid item md={8} xs={12}>
          <Box
            sx={{
              bgcolor: "themeWhite.main",
              borderRadius: 2,
              p: 2,
              boxShadow: 2,
            }}
          >
            <Box sx={{ mb: 1 }}>Description</Box>

            <Divider />

            <Typography sx={{ mt: 1 }}>{data.details.description}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default OfferPage;
