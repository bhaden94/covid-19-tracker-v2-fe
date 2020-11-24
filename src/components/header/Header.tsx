import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

const useStyles = makeStyles((theme: Theme) => ({
    headerStyle: {
        [theme.breakpoints.up('sm')]: {
            fontSize: '3rem !important'
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '2.5rem !important'
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
        const loc = location.pathname
        if(loc === '/site_info') {
            setHeaderText('Site Information')
        } else if (loc === '/news') {
            setHeaderText('Covid-19 News')
        } else {
            setHeaderText('Covid-19 Data')
        }
    }, [location])

    return (
        <Typography
            className={classes.headerStyle}
            variant="h1"
            color='textPrimary'
            align='center'
        >
            {headerText}
        </Typography>
    );
}

export default withRouter(Header);
