import React from 'react';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { useChangeTheme } from '../themes';
import useTheme from '@material-ui/core/styles/useTheme';
import { Fab } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  root: {
      position: 'fixed',
      bottom: '40px',
      right: '40px',
  },
});

const ThemeSwitcher: React.FC = ()=>{
  const classes = useStyles();
  
  const theme = useTheme();
  const changeTheme = useChangeTheme();
  return (
    <div className={classes.root}>
      <Fab color="primary" aria-label="dark mode" onClick={()=>changeTheme()}>
        {theme.palette.type === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
      </Fab>
    </div>
  )
}

export default ThemeSwitcher;