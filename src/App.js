import React from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route,   
} from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Index from './views/Index';
import TrackTimes from './views/TrackTimes';


function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
        <Router>
          <Switch>
            <Route path="/track_times">
              <TrackTimes/>
            </Route>
            <Route path="/">
              <Index/>
            </Route>
          </Switch>
        </Router>


    </ThemeProvider>

  );
}

export default App;
