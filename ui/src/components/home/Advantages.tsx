import { AddBoxTwoTone } from "@mui/icons-material";
import { Box, Container, Grid, Typography } from "@mui/material";
import a1 from "../../assets/images/a1.png";
import a2 from "../../assets/images/a2.png";
import a3 from "../../assets/images/a3.png";

const advantageDict: { [key: string]: [string, string] } = {
  a1: [
    "Easy navigation",
    "With our user-friendly UI, it is easy to find what you need.",
  ],
  a2: ["Contact Operator", "Our specialists quickly answer your questions."],
  a3: [
    "Free delivery",
    "You do not have to pay for shipment. We handle all the costs.",
  ],
};

const AdvantagesSection = () => {
  return (
    <Box sx={{ backgroundColor: "white", mt: 2 }}>
      <Container sx={{ py: 2 }}>
        <Grid
          container
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 2 }}
        >
          <Typography sx={{ fontWeight: "bold" }}>Main advantages</Typography>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            From our service
          </Typography>

          {/* icons with desc */}
          <Grid
            container
            item
            mt={1}
            direction="row"
            spacing={4}
            justifyContent="center"
            alignItems="flex-start"
          >
            {Object.entries(advantageDict).map(([key, list]) => {
              const [title, description] = list;
              const imageSrc = {
                a1: a1,
                a2: a2,
                a3: a3,
              }[key];

              return (
                <Grid
                  container
                  item
                  md={3}
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="center"
                  key={key}
                >
                  <img src={imageSrc} alt={title} width="100px" />
                  <Grid item>
                    <Typography
                      textAlign="center"
                      variant="body2"
                      color="text.secondary"
                    >
                      {title}
                    </Typography>
                    <Typography textAlign="center" fontWeight="bold">
                      {description}
                    </Typography>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AdvantagesSection;
