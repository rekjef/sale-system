import {
  AppBar, Container, Toolbar, Typography, Box, Button, Avatar, MenuItem, Menu,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import { grey } from '@mui/material/colors';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useSnackbar, VariantType } from 'notistack';
import axios from 'axios';
import { NullUser, useGlobalContext } from '../UserContext';

function Header() {
  const { user } = useGlobalContext();
  const navigate = useNavigate();

  const { setUser } = useGlobalContext();
  const { enqueueSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const notification = (message: string, category?: VariantType) => {
    enqueueSnackbar(message, { variant: category });
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOut = async () => {
    const response = await axios.post('/signout');
    setUser(NullUser);
    notification(response.data.notification.message, response.data.notification.category);
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Box sx={{ bgcolor: 'themeBackground.main', width: 1 }}>
        <Container maxWidth="xl" sx={{ py: 1 }}>
          <Typography variant="body2" color="text.secondary" align="center">
            FREE DELIVERY AND RETURN
          </Typography>
        </Container>
      </Box>
      <Box sx={{ bgcolor: 'themeWhite.main', width: 1 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Button sx={{ color: 'black', textTransform: 'none' }} onClick={() => navigate('/')}>
              <CheckroomIcon sx={{ mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >

                SaleSystem
              </Typography>
            </Button>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button sx={{ color: 'black' }} onClick={() => navigate('/offer/1')}>
                Offers
              </Button>
              <Button sx={{ color: 'black' }} onClick={() => navigate('/offer/1')}>
                FAQ
              </Button>
              <Button sx={{ color: 'black' }} onClick={() => navigate('/offer/1')}>
                Contact
              </Button>
              <Button sx={{ color: 'black' }} onClick={() => navigate('/offer/1')}>
                About us
              </Button>
            </Box>
            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
              {user.isLogged ? (
                <div>
                  <Button onClick={() => navigate('/add-offer')} sx={{ mr: 1, py: 1 }} variant="contained" startIcon={<AddIcon />}>Add offer</Button>
                  <Button onClick={handleMenu}>
                    <Avatar sx={{ bgcolor: 'themeAvatarBackground.main' }} variant="rounded">
                      <AccountCircleIcon />
                    </Avatar>
                  </Button>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    sx={{ mt: '45px' }}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={() => { handleClose(); navigate('/profile'); }}>
                      Profile
                    </MenuItem>
                    <MenuItem onClick={() => { handleClose(); signOut(); }}>Sign out</MenuItem>
                  </Menu>
                </div>
              ) : (
                <div>
                  <Button onClick={() => navigate('/signup')} sx={{ mr: 1 }} variant="contained" color="secondary" startIcon={<HowToRegIcon />}>Sign Up</Button>
                  <Button onClick={() => navigate('/signin')} variant="contained" startIcon={<LoginIcon />}>Sign In</Button>
                </div>
              )}
            </Box>
          </Toolbar>
        </Container>
      </Box>
    </AppBar>
  );
}

export default Header;
