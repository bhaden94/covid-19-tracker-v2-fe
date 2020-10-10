import * as React from 'react';
import { Grid, Typography } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
    padTop: {
        paddingTop: '10px',
    },
    font: {
        fontSize: '1.5rem'
    },
});

export interface IStatProps {
    name: string,
    stat: number,
    properties: any
}

export default function Stat({ name, stat, properties }: IStatProps) {
    const classes = useStyles();

    return (
        <Grid item xs={12} sm={6} md={3} className={classes.padTop}>
            <Typography color='textSecondary' className={classes.font} variant='h2' align='center'>
                <u>{name}</u>
            </Typography><br />
            <Typography className={properties} gutterBottom variant='h2' align='center'>
                {stat}
            </Typography>
        </Grid>
    );
}
