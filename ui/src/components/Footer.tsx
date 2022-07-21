import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

function Footer() {
  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link to="/" className="footer-link">
          SaleSystem
        </Link>
        {' 2022.'}
      </Typography>
    </Box>
  );
}

export default Footer;
