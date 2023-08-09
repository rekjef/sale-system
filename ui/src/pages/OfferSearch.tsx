import {
  Container,
  Grid,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import OfferCard, { OfferWithSellerType } from "../components/offer/OfferCard";
import Filters from "../components/offer_search/Filters";

const searchOffers = async (url: string) => {
  const response = await axios.get(url);
  return response.data.offers;
};

const OfferSearch = () => {
  const navigate = useNavigate();

  const [offers, setOffers] = useState<OfferWithSellerType[]>([]);
  const pulledOffers = useRef<OfferWithSellerType[]>(offers);
  const [query, setQuery] = useState<string>("");
  const [condition, setCondition] = useState<string>("new");
  const [category, setCategory] = useState<string>("all");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  // const [serachInput, setserachInput] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await searchOffers("/api/offer/latest/");
        console.log(123, data);
        pulledOffers.current = data;
        setOffers(data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setOffers(pulledOffers.current);
  }, [pulledOffers]);

  useEffect(() => {
    if (query.length == 0) {
      setOffers(pulledOffers.current);
    } else {
      setOffers(
        offers.filter((offer) => {
          return offer.details.title
            .toLowerCase()
            .includes(query.toLowerCase());
        })
      );
    }
  }, [query]);

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
