import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WorkIcon from '@mui/icons-material/Work';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router';

export default function SideBar() {
    return (
        <Box sx={{ width: '100%', maxWidth: 360, }}>
            <nav aria-label="main mailbox folders">
                <List>
                    <Link to={"http://localhost:5173/dashboard"}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Home" />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Link to={"http://localhost:5173/dashboard/roles"}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <WorkIcon />
                                </ListItemIcon>
                                <ListItemText primary="Role" />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Link to={"http://localhost:5173/dashboard/users"}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <AccountCircleIcon />
                                </ListItemIcon>
                                <ListItemText primary="Users" />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                </List>
            </nav>
        </Box>
    );
}
