import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDom from 'react-dom';
import {Router, Route, browserHistory } from 'react-router';

import Signup from './../imports/ui/Signup';
import Link from './../imports/ui/Link';
import NotFound from './../imports/ui/NotFound';
import Login from './../imports/ui/Login';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/links" component={Link} />
    <Route path="*" component={NotFound} />
  </Router>
);


Meteor.startup(() => {
  ReactDom.render(routes,document.getElementById('app'));
});
