import React from 'react';
import { hydrate } from 'react-dom';
import theme from './theme';
// import {Router} from 'react-router-dom';
import { MuiThemeProvider } from 'material-ui/styles';
import App from './client/App';
// import history from './server/history';

// This is needed in order to deduplicate the injection of CSS in the page.
const sheetsManager = new WeakMap();

hydrate(
  
  <MuiThemeProvider sheetsManager={sheetsManager} theme={theme}>
  {/* <Router history={history} > */}
      <App />
  {/* </Router> */}
  </MuiThemeProvider>,
  document.getElementById('root'),
  () => {
    // [ReHydratation](https://github.com/cssinjs/jss/blob/master/docs/ssr.md)
    const jssStyles = document.getElementById('jss-ssr');
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles);
  }
);

if (module.hot) {
  module.hot.accept();
}
