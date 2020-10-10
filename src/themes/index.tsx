import React from 'react';
import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider,
  Theme
} from '@material-ui/core/styles';

import { useTheme } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';

interface ThemeProviderProps {
  children: React.ReactNode
  theme: Theme
}

const ThemeDispatchContext = React.createContext<any>(null);

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, theme }) => {

  const themeInitialOptions = {
    paletteType: localStorage.getItem('theme') === 'dark'? 'dark' : 'light'
  }

  const [themeOptions, dispatch] = React.useReducer((state: any, action: any)=> {
    switch (action.type) {
      case 'changeTheme':
        return {
          ...state,
          paletteType: action.payload
        }
      default:
        throw new Error();
    }
  }, themeInitialOptions);

  const memoizedTheme = React.useMemo(()=>{
    return createMuiTheme({
      ...theme,
      palette: {
        type: themeOptions.paletteType,
        primary: {
          main: themeOptions.paletteType === 'light' ? blueGrey[800] : blueGrey[400]
        }
      }
    })
  }, [theme,themeOptions.paletteType]);

  return (
    <MuiThemeProvider theme={memoizedTheme}>
      <ThemeDispatchContext.Provider value={dispatch}>
        {children}
      </ThemeDispatchContext.Provider>
    </MuiThemeProvider>
  )
}

export default ThemeProvider

export const useChangeTheme = () => {
  const dispatch = React.useContext(ThemeDispatchContext);
  const theme = useTheme();
  const changeTheme = React.useCallback(()=>
    dispatch({
      type: 'changeTheme',
      payload: theme.palette.type === 'light' ? 'dark' : 'light'
    }),
  [theme.palette.type, dispatch]);
  localStorage.setItem('theme', theme.palette.type)
  return changeTheme;
}