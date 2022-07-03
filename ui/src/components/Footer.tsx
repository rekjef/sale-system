import React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function Footer(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>
      {' 2022.'}
    </Typography>
  );
}

export default Footer;
