import * as React from 'react';
import { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { RouteComponentProps } from 'react-router';
import { Link, withRouter } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Toolbar from '@material-ui/core/Toolbar';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { makeStyles } from '@material-ui/core/styles';
import ThemeSwitcher from '../theme-switcher/ThemeSwitcher';

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }
}));

const Navbar = ({ location, history }: RouteComponentProps) => {
    const classes = useStyles();
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        if (location.pathname === '/') {
            history.push('/united_states')
        }
    }, [location.pathname, history])

    useEffect(() => {
        handleDrawerClose();
    }, [location.pathname])

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <AppBar color='transparent' position="fixed" elevation={0} square={true}>
                <Toolbar>
                    <IconButton edge="start" color="primary" aria-label="open drawer" onClick={handleDrawerOpen}>
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Typography variant="h2" color='primary' align='center'>Covid-19 Tracker</Typography>
            <SwipeableDrawer
                className={classes.drawer}
                anchor="left"
                open={open}
                onClose={handleDrawerClose}
                onOpen={handleDrawerOpen}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon color='primary' />
                    </IconButton>
                </div>
                <Divider />
                <ThemeSwitcher />
                <Divider />
                <List>
                    <ListItem button component={Link} to="/united_states">
                        <Typography color='textSecondary' align='center'>United States</Typography>
                    </ListItem>
                    <ListItem button component={Link} to="/world">
                        <Typography color='textSecondary' align='center'>Global</Typography>
                    </ListItem>
                </List>
            </SwipeableDrawer>
        </div>
    );
}

export default withRouter(Navbar);
