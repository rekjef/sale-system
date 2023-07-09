import { Divider } from "@mui/material";

const OrangeLine = () => (
  <Divider
    sx={{
      mb: 2,
      mt: 1,
      width: "60%",
      height: "2px",
      borderRadius: 10,
      backgroundColor: (theme) => theme.palette.primary.main,
    }}
  />
);

export { OrangeLine };
