import * as React from 'react';
import { useEffect, useState } from 'react';
import { Grid, Tooltip, Typography } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { abbreviateNumber } from '../../utilities/statUtilities'


const useStyles = makeStyles({
    padTop: {
        paddingTop: '10px',
    },
    font: {
        fontSize: '1.5rem !important'
    },
});

export interface IStatProps {
    name: string,
    stat: number,
    properties: any
}

export default function Stat({ name, stat, properties }: IStatProps) {
    const classes = useStyles();
    const [num, setNum] = useState<any>('')

    useEffect(() => {
        setNum(abbreviateNumber(stat, 1))
    }, [stat])

    return (
        <Grid item xs={6} md={3} className={classes.padTop}>
            <Typography color='textSecondary' className={classes.font} variant='h2' align='center'>
                <u>{name}</u>
            </Typography><br />
            <Tooltip title={stat.toLocaleString()} enterTouchDelay={50} arrow>
                <Typography className={properties} gutterBottom variant='h2' align='center'>
                    {num}
                </Typography>
            </Tooltip>
        </Grid>
    );
}
