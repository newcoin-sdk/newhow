import React, {useEffect} from 'react';
import { fetchUsers, fetchPosts, fetchCategories } from '../actions';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Register from '../containers/Register';
import Dashboard from '../containers/Dashboard';
import NewPost from '../containers/NewPost';
import theme from '../theme';
import { Provider as OProvider } from "overmind-react";
import { overmind } from '../Overmind/overmind';
import NcAuth from "../containers/NcAuth";
import "../index.css"

const Root = ({ store }) => {

  useEffect(() => {
    store.dispatch(fetchUsers());
    store.dispatch(fetchPosts());
    store.dispatch(fetchCategories());
  });

  const om = overmind();

  return (
    <Provider store={store}>
      <OProvider value={om}>
      <Router>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Switch>
            <Route key="a" exact path="/" component={NcAuth} />
            <Route key="a" exact path="/explore" component={Dashboard} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/(login|signup)" component={Register} />
            <Route path="/dashboard/new" component={NewPost} />
            {/* <Route component={NoMatch} /> */}
          </Switch>
        </MuiThemeProvider>
      </Router>
    </OProvider>
    </Provider>
  );
};

export default Root;
