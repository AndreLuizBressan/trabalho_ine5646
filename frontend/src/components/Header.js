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
import { useAuth } from "../context/AuthContext";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/home" sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}>
          Roteiros Incríveis
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        {isAuthenticated && (
          <Button color="inherit" component={Link} to="/main">
            Meus Roteiros
          </Button>
        )}
        {isAuthenticated && (
          <Button color="inherit" component={Link} to="/signupupdate">
            Atualizar cadastro
          </Button>
        )}
        {isAuthenticated && (
          <div>
          <IconButton
              color="inherit"
              onClick={handleLogout}
              component={Link} to="/home"
            >
              <ExitToAppIcon />
                <Typography variant="body1" sx={{ ml: 1 }}>
                  Sair
                </Typography>
            </IconButton>
        </div>
        )}
         {!isAuthenticated && (
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
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
