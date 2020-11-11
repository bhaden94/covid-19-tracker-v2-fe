import React from 'react';
import { useChangeTheme } from '../../themes';
import useTheme from '@material-ui/core/styles/useTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Switch from '@material-ui/core/Switch/Switch';

const useStyles = makeStyles({
  root: {
  },
});

const ThemeSwitcher: React.FC = ()=>{
  const classes = useStyles();
  const theme = useTheme();
  const changeTheme = useChangeTheme();
  const checked = theme.palette.type === 'dark'

  return (
    <div>
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