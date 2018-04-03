import './App.css';
import React from "react";
// import Route from "react-router-dom/Route";
// import Switch from "react-router-dom/Switch";
import Home from "./pages/Home/Home";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import NavBar from './components/Nav/Nav';
import CharactersSection from './components/Characters/CharactersSection';
// import Paper from 'material-ui/Paper';
// import Typography from 'material-ui/Typography';


const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    margin: theme.spacing.unit * 3,
  }),
});

const App = ({classes}) => (

  <div className={classes.root}>
    <NavBar title='marvel'/>
    <main >
      <CharactersSection isMobile={this.isMobile} />
    </main>
    <footer>
      <small>Data provided by Marvel. © 2014 Marvel</small>
    </footer>
  </div>
  // <Switch>
  //   <Route exact path="/" render={props => <Home {...props} />} />
    // {/* <Route exact path='/favorites' component={Favorites} /> */}
  // </Switch>
  // <Paper className={classes.root} elevation={4}>
  //   <Typography type="headline" component="h3">
  //     This is a sheet of paper.
  //   </Typography>
  //   <Typography type="body1" component="p">
  //     Paper can be used to build surface or other elements for your application.
  //   </Typography>
  // </Paper>
);

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
