import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  OutlinedInput,
  OutlinedInputProps,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OrangeLine, Panel } from "../../styledComponents";

interface FiltersProps {
  selectedCondition: string;
  setSelectedCondition: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  minPrice: number;
  setMinPrice: React.Dispatch<React.SetStateAction<number>>;
  maxPrice: number;
  setMaxPrice: React.Dispatch<React.SetStateAction<number>>;
}

const condition: string[] = ["new", "used"];
const categories: string[] = ["all", "women", "men", "kids", "home"];

const Filters = ({
  selectedCondition,
  setSelectedCondition,
  selectedCategory,
  setSelectedCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}: FiltersProps) => {
  const navigate = useNavigate();
  const [localMinPrice, setLocalMinPrice] = useState<number>(0);
  const [localMaxPrice, setLocalMaxPrice] = useState<number>(3000);

  const handleMinPriceChange: OutlinedInputProps["onChange"] = (event) => {
    const newValue = parseFloat(event.target.value);
    setLocalMinPrice(isNaN(newValue) ? 0 : newValue);
  };

  const handleMaxPriceChange: OutlinedInputProps["onChange"] = (event) => {
    const newValue = parseFloat(event.target.value);
    setLocalMaxPrice(isNaN(newValue) ? 0 : newValue);
  };

  useEffect(() => {
    console.log(maxPrice);
    navigate(
      `/offers/${selectedCondition}/${selectedCategory}${
        maxPrice > 0 ? `/${minPrice}/${maxPrice}` : ""
      }`
    );
  }, [selectedCondition, selectedCategory, minPrice, maxPrice, navigate]);

  return (
    <Panel>
      <Box sx={{ p: 2 }}>
        <List>
          <Typography variant="h6">Categories</Typography>
          <OrangeLine />
          {/* Categories */}
          {categories.map((cat) => (
            <ListItem key={cat} disablePadding>
              <ListItemButton
                selected={selectedCategory === cat}
                onClick={() => {
                  setSelectedCategory(cat);
                }}
              >
                <ListItemText primary={cat[0].toUpperCase() + cat.slice(1)} />
              </ListItemButton>
            </ListItem>
          ))}
          <Typography variant="h6">Condition</Typography>
          <OrangeLine />
          {/* Conditions */}
          {condition.map((cond) => (
            <ListItem key={cond} disablePadding>
              <ListItemButton
                selected={selectedCondition === cond}
                onClick={() => {
                  // CONDITION: Used -> used
                  setSelectedCondition(cond);
                }}
              >
                <ListItemText primary={cond[0].toUpperCase() + cond.slice(1)} />
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
                <InputLabel htmlFor="outlined-adornment-amount">Min</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  defaultValue="0"
                  onChange={handleMinPriceChange}
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
                <InputLabel htmlFor="outlined-adornment-amount">Max</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  defaultValue="3000"
                  onChange={handleMaxPriceChange}
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
              onClick={() => {
                setMinPrice(localMinPrice);
                setMaxPrice(localMaxPrice);
                console.log(localMaxPrice);
              }}
              sx={{ width: 1 }}
              variant="contained"
              color="secondary"
            >
              Apply price
            </Button>
          </Grid>
          <Grid item sx={{ mt: 1 }}>
            <Button
              onClick={() => {
                setMinPrice(0);
                setMaxPrice(0);
              }}
              sx={{ width: 1 }}
              variant="contained"
              color="secondary"
            >
              Clear
            </Button>
          </Grid>
        </List>
      </Box>
    </Panel>
  );
};

export default Filters;
