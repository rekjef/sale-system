import { Box } from "@mui/material";
import AdvantagesSection from "../components/home/Advantages";
import Baner from "../components/home/Baner";
import PhoneSection from "../components/home/Phone";
import RecommendedOffers from "../components/home/RecommendedOffers";

function Home() {
  return (
    <Box>
      {/* Baner immediately as user opens website */}
      <Baner />
      {/* Recommended offers section */}
      <RecommendedOffers />
      {/* Advantages section */}
      <AdvantagesSection />
      {/* Phone section */}
      <PhoneSection />
    </Box>
  );
}

export default Home;
