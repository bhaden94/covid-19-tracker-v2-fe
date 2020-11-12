import React from 'react';
import { useChangeTheme } from '../../themes';
import useTheme from '@material-ui/core/styles/useTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Switch from '@material-ui/core/Switch/Switch';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  pad: {
    paddingLeft: '16px'
  },
});

const ThemeSwitcher: React.FC = ()=>{
  const classes = useStyles();
  const theme = useTheme();
  const changeTheme = useChangeTheme();
  const checked = theme.palette.type === 'dark'

  return (
    <div className={classes.pad}>
      <Typography color='textSecondary' display='inline'>Dark Mode</Typography>
      <Switch
        checked={checked}
        onChange={changeTheme}
        color="primary"
        name="checkedB"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      
    </div>
  )
}

export default ThemeSwitcher;