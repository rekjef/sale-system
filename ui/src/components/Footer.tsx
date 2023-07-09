import {
  Email,
  Facebook,
  Instagram,
  LocalPhone,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Grid,
  SvgIconProps,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
// import { Link } from "react-router-dom";
import { OrangeLine } from "../styledComponents";

const contactForms: { [key: string]: React.ComponentType<SvgIconProps> } = {
  "123-456-789": LocalPhone,
  "contact@ssystem.com": Email,
};
// color: black;
// background: wheat;
// border-radius: 4px;
// padding: 0px 2px 0px 2px;
const socialMedia: {
  [key: string]: [React.ComponentType<SvgIconProps>, string];
} = {
  facebook: [Facebook, "#3b5998"],
  instagram: [Instagram, "#E4405F"],
  youtube: [YouTube, "#FF0000"],
  twitter: [Twitter, "#1DA1F2"],
};

function Footer() {
  return (
    <Grid
      container
      justifyContent="center"
      sx={{
        backgroundColor: "#2D2E32",
        color: (theme) => theme.palette.secondary.contrastText,
      }}
    >
      {/* container for columns */}
      <Container>
        <Grid container justifyContent="space-between" spacing={2} paddingY={4}>
          {/* left */}
          <Grid item md xs={12}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                SaleSystem
              </Typography>
              <OrangeLine />
              {/* CONTACT */}
              {Object.entries(contactForms).map(([key, IconComponent]) => (
                <Grid container spacing={1} key={key}>
                  <Grid item>
                    <IconComponent />
                  </Grid>
                  <Grid item>{key}</Grid>
                </Grid>
              ))}
              <Grid container spacing={1} mt={0.5}>
                {/* SOCIAL MEDIA */}
                {Object.entries(socialMedia).map(([key, list]) => {
                  const [IconComponent, bgColor] = list;
                  return (
                    <Grid item>
                      <Button
                        key={key}
                        variant="contained"
                        sx={{
                          bgcolor: bgColor,
                          color: "white",
                          borderRadius: 10,
                        }}
                      >
                        <IconComponent />
                      </Button>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Grid>
          {/* mid */}
          <Grid item md xs={12}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                Working hours
              </Typography>

              <OrangeLine />
              <Typography>
                Mon - Fri: 6:00AM - 9:00PM <br />
                Sat: 9:00AM - 15:00PM <br />
                Sun: Closed
              </Typography>
            </Box>
          </Grid>
          {/* right */}
          <Grid item md xs={12}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                Newsletter
              </Typography>
              <OrangeLine />
              <Typography>
                Do you want to get notified about new changes ?
              </Typography>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                sx={{ width: 1, mb: 1 }}
              />
              <Button sx={{ width: 1 }} variant="contained">
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}

export default Footer;
