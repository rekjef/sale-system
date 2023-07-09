import { Box, Button, Container, Grid, Typography } from "@mui/material";
import appStoreImage from "../../assets/images/appstore1.png";
import frontPageImage from "../../assets/images/phone.png";
import playStoreImage from "../../assets/images/play.png";

const appStores: { [key: string]: string } = {
  google_play: playStoreImage,
  app_store: appStoreImage,
};

const PhoneSection = () => {
  return (
    <Box
      sx={{
        width: 1,
        pt: 2,
      }}
    >
      <Container>
        <Grid container justifyContent="space-between" alignItems="center">
          {/* left side */}
          <Grid
            item
            container
            justifyContent="center"
            alignItems="center"
            md={4}
            xs={12}
            sx={{
              backgroundColor: (theme) => theme.palette.primary.main,
              boxShadow: 2,
              borderRadius: 2,
            }}
          >
            <Grid
              item
              sx={{
                margin: 2,
                mb: 0,
              }}
            >
              <Typography>Check out our apps</Typography>
              <Typography variant="h5" sx={{ mb: 1, fontWeight: "bold" }}>
                Tired of using a browser?
                <br />
                Check out our app that will improve your experience.
              </Typography>
            </Grid>
            {/* App Store buttons */}
            <Grid container item spacing="4" ml={1}>
              {Object.entries(appStores).map(([key, val]) => {
                return (
                  <Grid
                    item
                    key={key}
                    md={6}
                    xs={6}
                    sx={{
                      height: "100px",
                      backgroundImage: `url(${val})`,
                      backgroundPosition: "center",
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></Grid>
                );
              })}
            </Grid>
          </Grid>

          {/* Phone Preview Image */}
          <Grid item md={6} xs={12} sx={{ height: 1 }}>
            <Box
              sx={{
                height: "90%",
                margin: 5,
                mb: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={frontPageImage}
                alt="Front Page Image"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default PhoneSection;
