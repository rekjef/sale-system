import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../UserContext";
import frontPageImage from "../../assets/images/home_front.png";

const Baner = () => {
  const { user } = useGlobalContext();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: 1,
        pt: 2,
        backgroundColor: "white",
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
              }}
            >
              <Typography>Sell your stuff</Typography>
              <Typography variant="h5" sx={{ mb: 1, fontWeight: "bold" }}>
                Earn{" "}
                <Box
                  component="span"
                  sx={{ color: "white", fontWeight: "900" }}
                >
                  {" "}
                  BIG MONEY{" "}
                </Box>
                by selling your stuff you no longer need!
              </Typography>
              <Box>
                {user.isLogged ? (
                  <Button
                    onClick={() => navigate("/add-offer")}
                    sx={{ mt: 1, width: 1 }}
                    variant="contained"
                    color="secondary"
                  >
                    Add offer
                  </Button>
                ) : (
                  <Grid container spacing="4">
                    <Grid item md={6} xs={12}>
                      <Button
                        onClick={() => navigate("/signup")}
                        variant="outlined"
                        color="secondary"
                        sx={{ mt: 1, width: 1 }}
                      >
                        Sign up
                      </Button>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <Button
                        onClick={() => navigate("/signin")}
                        variant="contained"
                        color="secondary"
                        sx={{ mt: 1, width: 1 }}
                      >
                        Sign in
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </Box>
            </Grid>
          </Grid>
          {/* right side */}
          <Grid item md={6} xs={12} sx={{ height: 1 }}>
            <Box
              sx={{
                height: "90%",
                margin: 5,
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
export default Baner;
