import * as React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { deepOrange, green, red, amber } from '@material-ui/core/colors';
import Stat from './Stat';

const useStyles = makeStyles({
    container: {
        minHeight: '100px',
        margin: '1%'
    },
    padTop: {
        paddingTop: '10px',
    },
    title: {
        fontSize: '2.5rem'
    },
    recovered: {
        fontSize: '1.5rem',
        color: green[500]
    },
    active: {
        fontSize: '1.5rem',
        color: amber[600]
    },
    confirmed: {
        fontSize: '1.5rem',
        color: deepOrange[500]
    },
    deaths: {
        fontSize: '1.5rem',
        color: red[500]
    }
});

interface IProps {
    title: string
    totals: any
}

const Header = ({ title, totals }: IProps) => {
    const classes = useStyles();

    return (
        <Paper className={classes.container}>
            <Grid
                container
                spacing={0}
            >
                <Grid item xs={12} className={classes.padTop}>
                    <Typography className={classes.title} color='textSecondary' gutterBottom variant='h1' align='center'>
                        {title}
                    </Typography>
                </Grid>
                <Stat name='Recovered' stat={totals.recovered} properties={classes.recovered} />
                <Stat name='Active' stat={totals.active} properties={classes.active} />
                <Stat name='Confirmed' stat={totals.confirmed} properties={classes.confirmed} />
                <Stat name='Deaths' stat={totals.deaths} properties={classes.deaths} />
            </Grid>
        </Paper>
    );
};

export default Header;