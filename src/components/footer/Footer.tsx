import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Grid, Typography, useTheme } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { Link } from 'react-router-dom';
import { deepPurple } from '@material-ui/core/colors';




const Footer = () => {
    const theme = useTheme();

    const useStyles = makeStyles({
        footer: {
            position: "fixed",
            bottom: 0,
            padding: 15,
            width: 240 // this is the fixed width of our drawer
        },
        center: {
            textAlign: 'center'
        },
        icons: {
            '&:hover': {
                color: theme.palette.primary.main
            }
        },
        links: {
            textDecoration: 'none',
            color: theme.palette.primary.main,
            '&:visited': {
                color: theme.palette.type === 'light' ? deepPurple[500] : deepPurple[200]
            },
            '&:hover': {
                textDecoration: 'underline'
            }
        }
    });

    const classes = useStyles();


    return (
        <div className={classes.footer}>
            <Grid container spacing={3}>
                <Grid className={classes.center} item xs={12}>
                    <Typography className={classes.links} component={Link} to="/site_info">Site information</Typography>
                </Grid>
                <Grid container xs={12} spacing={1}>
                    <Grid className={classes.center} item xs={6}>
                        <a href='https://github.com/bhaden94' target='_blank' rel="noopener noreferrer">
                            <GitHubIcon className={classes.icons} htmlColor={theme.palette.text.secondary} />
                        </a>
                    </Grid>
                    <Grid className={classes.center} item xs={6}>
                        <a href='https://www.linkedin.com/in/brady-haden/' target='_blank' rel="noopener noreferrer">
                            <LinkedInIcon className={classes.icons} htmlColor={theme.palette.text.secondary} />
                        </a>
                    </Grid>
                </Grid>
                <Grid item xs={12} alignItems='center'>
                    <Typography align='center' color='textSecondary' style={{ fontSize: 10 }}>
                        &#169; Copyright 2020 Brady Haden
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default Footer;