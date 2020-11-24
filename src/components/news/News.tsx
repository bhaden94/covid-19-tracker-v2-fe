import * as React from 'react';
import Typography from '@material-ui/core/Typography/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    news: {
        fontSize: '1.5rem !important'
    },

}));

const News = () => {
    const classes = useStyles();

    return (
        <Typography
            variant="h4"
            color='textSecondary'
            align='center'
            className={classes.news}
        >
            News page coming soon!
        </Typography>
    );
}

export default News;
