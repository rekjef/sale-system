import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LoginIcon from "@mui/icons-material/Login";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useSnackbar, VariantType } from "notistack";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NullUser, useGlobalContext } from "../UserContext";

const menuItems: { [key: string]: string } = {
  offers: "/offers",
  faq: "/faq",
  contact: "/contact",
  "about us": "/about_us",
};

function Header() {
  const { user } = useGlobalContext();
  const navigate = useNavigate();

  const { setUser } = useGlobalContext();
  const { enqueueSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const location = useLocation();
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    for (const key in menuItems) {
      if (location.pathname === menuItems[key]) {
        setActiveTab(location.pathname);
        console.log(activeTab, location);
        return;
      }
    }
    setActiveTab("");
  }, [activeTab, location]);

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
    const response = await axios.get("/api/user/sign-out");
    setUser(NullUser);
    notification(
      response.data.notification.message,
      response.data.notification.category
    );
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Box sx={{ backgroundColor: (theme) => theme.palette.primary.main }}>
        <Container maxWidth="xl" sx={{ py: 1 }}>
          <Typography fontWeight="bold" variant="body2" align="center">
            * FREE DELIVERY AND RETURN *
          </Typography>
        </Container>
      </Box>
      <Box sx={{ bgcolor: "themeWhite.main", boxShadow: 3 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Button
              sx={{ color: "black", textTransform: "none" }}
              onClick={() => navigate("/")}
            >
              <CheckroomIcon sx={{ mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                SaleSystem
              </Typography>
            </Button>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
              }}
            >
              {/* menu items */}
              {Object.entries(menuItems).map(([key, value]) => (
                <Button
                  key={key}
                  sx={{
                    color: "black",
                    mx: 2,
                    bgcolor:
                      value === activeTab
                        ? (theme) => theme.palette.primary.main
                        : "white",
                  }}
                  onClick={() => navigate(value)}
                >
                  {key}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
              {user.isLogged ? (
                <div>
                  <Button
                    onClick={() => navigate("/add-offer")}
                    sx={{ mr: 1, py: 1 }}
                    variant="contained"
                    startIcon={<AddIcon />}
                  >
                    Add offer
                  </Button>
                  <Button onClick={handleMenu}>
                    <Avatar
                      sx={{ bgcolor: "themeAvatarBackground.main" }}
                      variant="rounded"
                    >
                      <AccountCircleIcon />
                    </Avatar>
                  </Button>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    sx={{ mt: "45px" }}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        navigate(`/profile/${user.id}`);
                      }}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        signOut();
                      }}
                    >
                      Sign out
                    </MenuItem>
                  </Menu>
                </div>
              ) : (
                <div>
                  <Button
                    onClick={() => navigate("/signup")}
                    sx={{ mr: 1 }}
                    variant="contained"
                    color="secondary"
                    startIcon={<HowToRegIcon />}
                  >
                    Sign Up
                  </Button>
                  <Button
                    onClick={() => navigate("/signin")}
                    variant="contained"
                    startIcon={<LoginIcon />}
                  >
                    Sign In
                  </Button>
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
