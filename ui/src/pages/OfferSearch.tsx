import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { OfferWithSellerType } from "../components/offer/OfferCard";
import Filters from "../components/offer_search/Filters";
import OfferSearchCard from "../components/offer_search/OfferSearchCard";

// offers per page
const OFFERS_LIMIT = 6;

const OfferSearch = () => {
  const [offers, setOffers] = useState<OfferWithSellerType[]>([]);
  const pulledOffers = useRef<OfferWithSellerType[]>(offers);
  const [query, setQuery] = useState<string>("");
  const [condition, setCondition] = useState<string>("all");
  const [category, setCategory] = useState<string>("all");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [pages, setPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/offers/`);
        const data = response.data.offers;
        pulledOffers.current = data;
        setOffers(data);
      } catch (error) {
        console.error("Error fetching offers:", error);
        throw error;
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    const filteredOffers = pulledOffers.current.filter((offer) => {
      return (
        (query.length === 0 ||
          offer.details.title.toLowerCase().includes(query.toLowerCase())) &&
        (category === "all" || offer.details.category === category) &&
        (condition === "all" || offer.details.condition === condition)
      );
    });

    setOffers(filteredOffers);
  }, [query, category, condition]);

  useEffect(() => {
    // pagination
    const pages = Math.max(1, Math.ceil(offers.length / OFFERS_LIMIT));
    setPages(pages);
  }, [offers]);

  const handleSearchBarChange: TextFieldProps["onChange"] = (event) => {
    const val = event.target.value;
    setQuery(val.length == 0 ? "" : val);
  };

  return (
    <Container sx={{ my: 4 }}>
      {/* Layout */}
      <Grid container spacing={2}>
        {/* Left side */}
        <Grid item md={4} xs={12}>
          <Box>
            <Filters
              selectedCondition={condition}
              setSelectedCondition={setCondition}
              selectedCategory={category}
              setSelectedCategory={setCategory}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
            />
          </Box>
        </Grid>
        {/* Main side */}
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
                label="Search here"
                type="search"
                onChange={handleSearchBarChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={2} sx={{ textAlign: "right" }}>
              <Typography variant="body2">
                Showing {offers.length}/{pulledOffers.current.length}
              </Typography>
            </Grid>
          </Grid>

          <Grid
            container
            item
            direction="column"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            sx={{ minHeight: "865px" }}
          >
            {/* Offers */}
            <Grid container item spacing={2}>
              {offers
                .slice(
                  (currentPage - 1) * OFFERS_LIMIT,
                  currentPage * OFFERS_LIMIT
                )
                .map((data: OfferWithSellerType) => (
                  <Grid item key={data.details.id} md={4} sm={12}>
                    <OfferSearchCard
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
            <Grid container item justifyContent="center" spacing={1}>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ borderRadius: 10 }}
                  onClick={() => {
                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                  }}
                >
                  {"<"}
                </Button>
              </Grid>
              {Array.from({ length: pages }, (_, i) => (
                <Grid item key={i}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      borderRadius: 10,
                      bgcolor:
                        i + 1 === currentPage
                          ? (theme) => theme.palette.primary.dark
                          : (theme) => theme.palette.primary.main,
                    }}
                    onClick={() => {
                      setCurrentPage(i + 1);
                    }}
                  >
                    {i + 1}
                  </Button>
                </Grid>
              ))}
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ borderRadius: 10 }}
                  onClick={() => {
                    if (currentPage < pages) setCurrentPage(currentPage + 1);
                  }}
                >
                  {">"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OfferSearch;
