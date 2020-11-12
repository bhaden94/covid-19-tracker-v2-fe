import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    header: {
        fontSize: '3rem',
        width: '100%',
        flexGrow: 1,
        align: 'center',
        padding: '25px 25px 10px'
    }
}));

const Header = () => {
    const classes = useStyles();

    return (
        <Typography
            variant="h1"
            color='primary'
            align='center'
            className={classes.header}
        >
            Covid-19 Tracker
        </Typography>
    );
}

export default Header;
