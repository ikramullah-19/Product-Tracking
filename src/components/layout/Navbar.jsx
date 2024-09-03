import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
// import {Menu as MenuIcon} from "@mui/icons-material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { greenDark } from "../constants/color";
import Menu from "../../assets/menu.png"

const Navbar = () => {
  const location = useLocation(); // Get the current path
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const linkStyle = (path) => ({
    textDecoration: "none",
    color: location.pathname === path ? "#ffffff" : "#bbbbbb",
    backgroundColor: location.pathname === path ? "#004d40" : "transparent",
    padding: "15px",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    transition: "background-color 0.3s, color 0.3s",
    "&:hover": {
      color: "#ffffff",
      backgroundColor: greenDark,
    },
  });

  const renderLinks = () => (
    <>
      <Link to="/" style={linkStyle("/")}>
        <Typography variant="h6">Product Tracking</Typography>
      </Link>
      <Link to="/add-product" style={linkStyle("/add-product")}>
        <Typography variant="h6">Add Product</Typography>
      </Link>
    </>
  );

  return (
    <>
      <Box height={"5rem"} width={"100%"} sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            bgcolor: greenDark,
          }}
        >
          <Toolbar>
            {isMobile ? (
              <>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleDrawer(true)}
                  sx={{ mr: 2 }}
                >
                  {/* <MenuIcon /> */}
                  <img style={{
                    width: "20px",
                    height: "20px"
                  }} src={Menu} alt="" />
                </IconButton>
                <Drawer
                  anchor="left"
                  open={drawerOpen}
                  onClose={toggleDrawer(false)}
                >
                  <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                  >
                    <List>
                      <ListItem button>
                        <Link to="/" style={linkStyle("/")}>
                          <ListItemText primary="Product Tracking" />
                        </Link>
                      </ListItem>
                      <ListItem button>
                        <Link to="/add-product" style={linkStyle("/add-product")}>
                          <ListItemText primary="Add Product" />
                        </Link>
                      </ListItem>
                    </List>
                  </Box>
                </Drawer>
              </>
            ) : (
              renderLinks()
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar;
