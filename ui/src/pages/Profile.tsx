import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Avatar,
  Box,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OfferCard, { OfferCardProps } from "../components/OfferCard";

type profileType = {
  first_name: string;
  last_name: string;
  email: string;
  join_date: string;
};

function Profile() {
  const { userID } = useParams<string>();
  const [profile, setProfile] = useState<profileType>({
    first_name: "",
    last_name: "",
    email: "",
    join_date: "",
  });
  const [offers, setOffers] = useState<OfferCardProps["details"][]>([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get(`/api/user/${userID}`);
      console.log(response);
      setProfile(response.data.user);
      setOffers(response.data.offers);
    })();
  }, [userID]);

  return (
    <Container sx={{ mt: 4 }}>
      <Box
        sx={{
          width: 1,
          boxShadow: 2,
          borderRadius: 2,
          bgcolor: "themeWhite.main",
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">User&apos;s profile</Typography>

          <Divider />

          <Box sx={{ mt: 1 }}>
            <Grid container>
              <Avatar sx={{ width: 100, height: 100 }} variant="rounded">
                <AccountCircleIcon sx={{ width: 50, height: 50 }} />
              </Avatar>
              <Box sx={{ ml: 2 }}>
                {profile.first_name} {profile.last_name}
                <br />
                {profile.email}
                <Typography color="text.secondary">
                  Joined in {profile.join_date.split(" ")[3]}
                </Typography>
              </Box>
            </Grid>

            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">User&apos;s offers</Typography>
              <Divider />

              <Grid container sx={{ mt: 1 }} spacing={2}>
                {offers.map((_details: OfferCardProps["details"]) => (
                  <Grid item key={_details.id} xs={12} md={4}>
                    <OfferCard
                      details={_details}
                      seller={{
                        email: profile.email,
                        first_name: profile.first_name,
                        last_name: profile.last_name,
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Profile;
