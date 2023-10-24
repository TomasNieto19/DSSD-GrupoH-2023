import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { toLoginUser, unLoginUser } from "../../store/auth/authSlice";
import { Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const pages = [
  {
    text: "My recipes",
    value: "myRecipes",
  },
  {
    text: "Add Recipe",
    value: "addRecipe",
  },
  {
    text: "Users",
    value: "users",
  },
  { text: "Favorite Recipes", value: "favorites" },
  { text: "Popular Users", value: "popularUsers" },
  { text: "Popular Recipes", value: "popularRecipes" },
  { text: "Drafts", value: "drafts" },
    { text: "Add Recipes Books", value: "addRecipesBooks" },
    { text: "Recipes Books", value: "recipesBooks" },
];
export const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const dispatch = useDispatch();

  const unLogin = () => {
    dispatch(unLoginUser());
  };

  const toRedirect = (page) => {
    if (page) {
      navigate(`/${page}`);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user")) !== null) {
      dispatch(toLoginUser({ user: JSON.parse(localStorage.getItem("user")) }));
    }
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "#2D4356" }}>
        <Toolbar>
          <Button onClick={() => toRedirect()}>
            <Typography
              variant="h6"
              sx={{ flexGrow: 1, textDecoration: "none", color: "white" }}
            >
              Chef En Casa
            </Typography>
          </Button>
          {user.userId !== 0 && (
            <>
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page.text} onClick={handleCloseNavMenu}>
                      <Button
                        key={page.value}
                        sx={{ backgroundColor: "#2D4356", width: "100%" }}
                        onClick={() => toRedirect(page.value)}
                      >
                        <Typography
                          key={page.value}
                          sx={{
                            textDecoration: "none",
                            color: "white",
                            textTransform: "Capitalize",
                          }}
                        >
                          {page.text}
                        </Typography>
                      </Button>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Button
                    key={page.value}
                    onClick={() => toRedirect(page.value)}
                  >
                    <Typography
                      key={page.value}
                      sx={{
                        textDecoration: "none",
                        color: "white",
                        textTransform: "Capitalize",
                      }}
                    >
                      {page.text}
                    </Typography>
                  </Button>
                ))}
              </Box>
            </>
          )}
          <Typography variant="h6" component="div">
            {user && user.username}
          </Typography>

          {user && user.username && (
            <Button>
              <Logout onClick={() => unLogin()} sx={{ color: "red" }} />
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
