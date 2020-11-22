import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { Theme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    [theme.breakpoints.up('lg')]: {
      padding: '20px 30%'
    },
    [theme.breakpoints.down('md')]: {
      padding: '20px 20%'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '20px 10%'
    }
  },
  headerSize: {
      fontSize: '2rem'
  }
}));

const SiteInfo: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Grid container direction='column' spacing={3}>
        <Grid item>
          <Typography
            className={classes.headerSize}
            color='textSecondary'
            variant='h2'
            gutterBottom
          >
            Sourcing
          </Typography>
          <Typography color='textSecondary' gutterBottom>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam. Suspendisse sed nisi lacus sed. Gravida rutrum quisque non tellus orci ac. Et sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque. Lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque</Typography>
        </Grid>
        <Grid item>
          <Typography
            className={classes.headerSize}
            color='textSecondary'
            variant='h2'
            gutterBottom
          >
            Data
          </Typography>
          <Typography color='textSecondary' gutterBottom>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua. Suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam. Suspendisse sed
            nisi lacus sed. Gravida rutrum quisque non tellus orci ac. Et sollicitudin ac orci phasellus egestas tellus
            rutrum tellus pellentesque. Lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant.
            Donec et odio pellentesque diam volutpat commodo sed egestas egestas. Cursus eget nunc scelerisque viverra.
            Eros in cursus turpis massa tincidunt dui ut ornare lectus. Sed libero enim sed faucibus turpis in. Sem
            viverra aliquet eget sit amet tellus. Ac tincidunt vitae semper quis. Felis eget nunc lobortis mattis aliquam
            faucibus purus in massa. Sed sed risus pretium quam vulputate dignissim suspendisse in.
            Cursus metus aliquam eleifend mi in. Fringilla ut morbi tincidunt augue interdum velit euismod in. Bibendum at
            varius vel pharetra vel turpis nunc. Nunc sed augue lacus viverra vitae congue. Urna id volutpat lacus laoreet non
            curabitur gravida arcu. Egestas sed tempus urna et pharetra. Quisque egestas diam in arcu cursus. Enim facilisis
            gravida neque convallis a cras semper auctor. Sagittis vitae et leo duis ut. Velit aliquet sagittis id consectetur
            purus ut faucibus pulvinar elementum.
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
}

export default SiteInfo;