import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
const pages = [{
    text: "My recipes",
    value: "myRecipes"},{
    text: "Add Recipe",
    value: "addRecipe"}];
export const NavBar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };


    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ backgroundColor: "#2D4356" }}>
                <Toolbar>
                    
                    <Typography variant="h6" component="a" href='/' sx={{ flexGrow: 1 , textDecoration: "none", color: "white"}}>
                        Chef En Casa
                    </Typography>
                    
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.text} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page.text}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button key={page.value}><Typography key={page.value} sx={{textDecoration: 'none', color: 'white', textTransform: "Capitalize"}} component='a' href={`/${page.value}`}>{page.text}</Typography></Button>
                        ))}
                    </Box>
                    <Typography variant="h6" component="div">
                        Sebastian
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}