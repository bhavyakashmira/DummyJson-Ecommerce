import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { List,ListItem,ListItemText } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Drawer } from '@mui/material';
import { useApi } from '../Context/Context';
import { Avatar } from '@mui/material';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { signOut } from 'firebase/auth';
import { auth } from "../Firebase/Firebase.js"
import { useNavigate, Link } from 'react-router-dom';
import Button from '@mui/material/Button';




const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
      
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));



export default function SearchAppBar() {
    const { username } = useApi();
     console.log(username)
    const navigate = useNavigate();
    const handleLogout = () => {
        signOut(auth).then(() => {
            navigate("/login");
        }).catch((error) => {
            console.log(error);
        });
    }
     
    const [openDrawer, setOpenDrawer] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpenDrawer(true);
    };

    const handleDrawerClose = () => {
        setOpenDrawer(false);
    };

    const { sharedData, updateSharedData, searchQuery, setSearchQuery } = useApi();

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleUpdateData = (value) => {
        updateSharedData(value);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        BWI
                    </Typography>
                    <Search sx={{ margin: 1 }}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={handleSearchChange}
                            value={searchQuery}
                            sx={{margin:1}}
                        />
                    </Search >
                    <Link onClick={handleLogout} to="/about"><Button variant="contained" color="success">
                   Logout
                    </Button></Link>
                    
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="left"
                open={openDrawer}
                onClose={handleDrawerClose}
            >
                <List>
                    {navItems.map((text) => (
                        <ListItem  key={text}>
                            <ListItemText primary={text} />
                        </ListItem>

                    ))}
                </List>
            </Drawer>
        </Box>
    );
}



