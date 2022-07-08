import React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function Footer() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://localhost:3000">
        Your Website
      </Link>
      {' 2022.'}
    </Typography>
  );
}

export default Footer;
