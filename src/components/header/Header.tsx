import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

const useStyles = makeStyles((theme: Theme) => ({
    header: {
        [theme.breakpoints.up('sm')]: {
            fontSize: '3rem'
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '2.5rem'
        },
        width: '100%',
        flexGrow: 1,
        align: 'center',
        padding: '0 25px'
    },

}));

const Header = ({ location }: RouteComponentProps) => {
    const classes = useStyles();
    const [headerText, setHeaderText] = useState<string>('Covid-19 Tracker')

    React.useEffect(() => {
        location.pathname === '/site_info' ?
            setHeaderText('Site Information') :
            setHeaderText('Covid-19 Tracker')
    }, [location])

    return (
        <Typography
            variant="h1"
            color='primary'
            align='center'
            className={classes.header}
        >
            {headerText}
        </Typography>
    );
}

export default withRouter(Header);
