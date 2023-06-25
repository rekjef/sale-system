import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useSnackbar, VariantType } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../UserContext";

function AddOffer() {
  const [condition, setCondition] = useState("");
  const [category, setCategory] = useState("");

  const { user } = useGlobalContext();
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const notification = (message: string, type?: VariantType) => {
    enqueueSnackbar(message, { variant: type });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
      image: formData.get("image"),
      category,
      price: formData.get("price"),
      condition,
      user_id: user.id,
    };
    axios.post("api/offer/add", data).then((response) => {
      notification(
        response.data.notification.message,
        response.data.notification.category
      );
      if (response.data.notification.category === "success") {
        navigate(`/offer/${response.data.offer_id}`);
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid alignItems="center" justifyContent="center" container>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LocalOfferIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add offer
          </Typography>
        </Grid>
        <Box
          component="form"
          method="POST"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth name="title" label="Title" autoFocus />
            </Grid>

            <Grid item xs={12}>
              <TextField
                multiline
                rows={3}
                fullWidth
                id="description"
                label="Description"
                name="description"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField name="image" label="Image" fullWidth />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Condition</InputLabel>
                <Select
                  value={condition}
                  label="Condition"
                  onChange={(event: SelectChangeEvent) =>
                    setCondition(event.target.value)
                  }
                >
                  <MenuItem value="new">New</MenuItem>
                  <MenuItem value="used">Used</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={category}
                  label="Category"
                  onChange={(event: SelectChangeEvent) =>
                    setCategory(event.target.value)
                  }
                >
                  <MenuItem value="Women">Women</MenuItem>
                  <MenuItem value="Men">Men</MenuItem>
                  <MenuItem value="Kids">Kids</MenuItem>
                  <MenuItem value="Home">Home</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="price"
                label="Price"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                fullWidth
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add offer
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default AddOffer;
