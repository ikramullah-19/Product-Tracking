import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link, useLocation  } from "react-router-dom";
import { greenDark } from "../constants/color";

const Navbar = () => {

  const location = useLocation(); // Get the current path

  const linkStyle = (path) => ({
    textDecoration: "none",
    color: location.pathname === path ? "#ffffff" : "#bbbbbb", // Highlight active link
    // backgroundColor: location.pathname === path ? "#697a77" : "transparent",
    padding: "15px",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    // marginY: "15px",
    gap: "5px",
    transition: "background-color 0.3s, color 0.3s",
    "&:hover": {
      color: "#ffffff", // Change color on hover
      backgroundColor: greenDark, // Optional: change background on hover
    },
  });

  return (
    <>
      <Box height={"5rem"} sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            bgcolor: greenDark,
          }}
        >
          <Toolbar>
            <Link
              to={"/"}
              style={linkStyle("/")}
              // style={{
              //   textDecoration: "none",
              //   color: "#ffff",
              //   display: "flex",
              //   gap: "5px",
              //   padding:"15px"
              // }}
            > 
              <Typography
                variant="h6"
                sx={{
                  display: { xs: "none", sm: "block" },
                }}
                // display={"flex"}
              >
                Product Tracking
              </Typography>
            </Link>

            <Link
              to={"/add-product"}
              style={linkStyle("/add-product")}
              // style={{
              //   textDecoration: "none",
              //   color: "#ffff",
              //   display: "flex",
              //   gap: "5px",
              // }}
            > 
              <Typography
                variant="h6"
                sx={{
                  display: { xs: "none", sm: "block" },
                }}
                // display={"flex"}
              >
                Add Product
              </Typography>
            </Link>
            
          </Toolbar>
          
        </AppBar>
      </Box>
      

     
    </>
  );
};


export default Navbar