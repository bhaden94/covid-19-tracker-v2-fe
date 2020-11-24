import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { Theme, makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link/Link';
import { blue, deepPurple } from '@material-ui/core/colors';

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
    },
    [theme.breakpoints.down('xs')]: {
      padding: '20px 5%'
    }
  },
  headerSize: {
    fontSize: '2rem !important'
  },
  links: {
    textDecoration: 'none',
    color: blue[600],
    '&:visited': {
      color: theme.palette.type === 'light' ? deepPurple[500] : deepPurple[200]
    },
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  paragraphs: {
    lineHeight: 1.6
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
          <Typography className={classes.paragraphs} color='textSecondary' gutterBottom>
            This site uses the information provided in the&nbsp;
            <Link
              className={classes.links}
              href='https://github.com/CSSEGISandData/COVID-19'
              target='_blank' rel="noopener noreferrer"
            >
              Github repository
            </Link>
            &nbsp;operated by&nbsp;
            <Link
              className={classes.links}
              href='https://systems.jhu.edu/'
              target='_blank' rel="noopener noreferrer"
            >
              Johns Hopkins University Center for Systems Science and Engineering (JHU CSSE)
            </Link>
            .

          </Typography>
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
          <Typography className={classes.paragraphs} color='textSecondary' gutterBottom>
            There are some points to note about the data here and the way it is displayed on the dashboard.
            <ul>
              <li>
                Some states and countries do not report recovered data (e.g. California). You may see this displayed as a '0'
                under the recovered section.
              </li>
              <li>
                For more information regarding this data like: update frequency, caclulations,
                and a detailed list of data modifications go to the&nbsp;
              <Link
                  className={classes.links}
                  href='https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data#table-of-contents'
                  target='_blank' rel="noopener noreferrer"
                >
                  JHU CSSE Github repositories table of contents
              </Link>
              .
              </li>

              <li>
                The bar graph under specific states or countries has scale breaks so that the incident rate
                and mortality rates can be displayed together. This does not effect the validity or
                reliability of the graphs as they still display the proper height differences between bars.
                <ul>
                  <li>
                    If you would like to see the graphs independently and without scale breaks then zoom into one side.
                  </li>
                </ul>
              </li>
            </ul>
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
}

export default SiteInfo;