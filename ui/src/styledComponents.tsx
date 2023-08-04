import { Box, BoxProps, Button, Divider } from "@mui/material";

interface PanelProps extends BoxProps {
  sx?: any;
}

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

const BuyButton = ({ content }: { content: string }) => (
  <Button variant="contained" color="secondary" sx={{ width: 1, mt: 1 }}>
    {content}
  </Button>
);

const Panel: React.FC<PanelProps> = ({ children, sx, ...props }) => (
  <Box
    sx={{
      bgcolor: "themeWhite.main",
      borderRadius: 2,
      boxShadow: 2,
      width: 1,
      height: 1,
      ...sx, // Merge dynamic sx properties
    }}
    {...props}
  >
    {children}
  </Box>
);

export { BuyButton, OrangeLine, Panel };
