import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import OfferCard, { OfferWithSellerType } from "../components/offer/OfferCard";
import { OrangeLine, Panel } from "../styledComponents";

const searchOffers = async (url: string) => {
  const response = await axios.get(url);
  return response.data.offers;
};

const categories: { [key: string]: string } = {
  All: "all",
  Women: "women",
  Men: "men",
  Kids: "kids",
  Home: "home",
};

const condition: string[] = ["New", "Used"];

const OfferSearch = () => {
  const [offers, setOffers] = useState<OfferWithSellerType[]>([]);
  const [selectedCondition, setCondition] = useState<string>("New");
  const [selectedCatgory, setCategory] = useState<string>("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await searchOffers("api/offer/latest/");
        setOffers(data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container sx={{ my: 4 }}>
      {/* Layout */}
      <Grid container spacing={2}>
        {/* Left side */}
        <Grid item md={4} xs={12}>
          <Panel>
            <Box sx={{ p: 2 }}>
              <List>
                <Typography variant="h6">Categories</Typography>
                <OrangeLine />
                {Object.entries(categories).map(([key, value]) => (
                  <ListItem key={key} disablePadding>
                    <ListItemButton
                      selected={selectedCatgory === key}
                      onClick={() => {
                        setCategory(key);
                      }}
                    >
                      <ListItemText primary={key} />
                    </ListItemButton>
                  </ListItem>
                ))}
                <Typography variant="h6">Condition</Typography>
                <OrangeLine />

                {Object.entries(condition).map(([index, cond]) => (
                  <ListItem key={cond} disablePadding>
                    <ListItemButton
                      selected={selectedCondition === cond}
                      onClick={() => {
                        setCondition(cond);
                      }}
                    >
                      <ListItemText primary={cond} />
                    </ListItemButton>
                  </ListItem>
                ))}

                <Typography variant="h6">Price</Typography>
                <OrangeLine />
                {/* Price range */}
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item xs={5}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="outlined-adornment-amount">
                        Min
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-amount"
                        startAdornment={
                          <InputAdornment position="start">$</InputAdornment>
                        }
                        label="Min"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item>---</Grid>
                  <Grid item xs={5}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="outlined-adornment-amount">
                        Max
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-amount"
                        startAdornment={
                          <InputAdornment position="start">$</InputAdornment>
                        }
                        label="Max"
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item sx={{ mt: 1 }}>
                  <Button
                    // onClick={() => navigate(`/offer/${details.id}`)}
                    sx={{ width: 1 }}
                    variant="contained"
                    color="secondary"
                  >
                    Apply filters
                  </Button>
                </Grid>
              </List>
            </Box>
          </Panel>
        </Grid>
        {/* Right side */}
        <Grid container item direction="column" spacing={2} md={8} xs={12}>
          {/* Search bar */}
          <Grid
            container
            item
            direction="row"
            justifyContent="space-between"
            alignItems="flex-end"
          >
            <Grid item xs={10}>
              <TextField
                id="filled-search"
                label="Search field"
                type="search"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={2} sx={{ textAlign: "right" }}>
              <Typography variant="body2">Showing 1/120</Typography>
            </Grid>
          </Grid>
          {/* Offers */}
          <Grid container item spacing={2}>
            {offers.map((data: OfferWithSellerType) => (
              <Grid item key={data.details.id} md={4} sm={12}>
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
          {/* Pagination */}
          <Grid item sx={{ textAlign: "center" }}>
            {"<"} 1 2 3 4 {">"}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OfferSearch;
