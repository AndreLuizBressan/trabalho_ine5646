import React, { useState } from "react";
import { AppBar, 
         Toolbar, 
         Typography, 
         Button, 
         Menu, 
         MenuItem, 
         IconButton } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Roteiros Incríveis
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/main">
          Meus Roteiros
        </Button>
        <div>
          <IconButton
              color="inherit"
              onClick={handleMenuOpen}
              aria-controls="account-menu"
              aria-haspopup="true"
            >
              <AccountCircle />
                <Typography variant="body1" sx={{ ml: 1 }}>
                  Entrar
                </Typography>
            </IconButton>
          <Menu
            id="account-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              style: { minWidth: "150px", backgroundColor: "#f9f9f9" },
            }}
            MenuListProps={{
              "aria-labelledby": "account-menu-button",
            }}
          >
            <MenuItem component={Link} to="/signup" onClick={handleMenuClose}>
              Cadastro
            </MenuItem>
            <MenuItem component={Link} to="/login" onClick={handleMenuClose}>
              Login
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
