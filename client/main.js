import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDom from 'react-dom';
import {Router, Route, browserHistory } from 'react-router';
import {Tracker} from 'meteor/tracker';


import Signup from './../imports/ui/Signup';
import Link from './../imports/ui/Link';
import NotFound from './../imports/ui/NotFound';
import Login from './../imports/ui/Login';

const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.replace('/links');
  }
}
const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    browserHistory.replace('/');
  }
}
const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} onEnter={onEnterPublicPage}/>
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
    <Route path="/links" component={Link} onEnter={onEnterPrivatePage}/>
    <Route path="*" component={NotFound} onEnter={onEnterPrivatePage}/>
  </Router>
);

//window.bh = browserHistory;


const unAuthenticatedPages = ['/','/signup'];
const authenticatedPages = ['/links'];

Tracker.autorun( () => {
  const isAuthenticated = !!Meteor.userId(); // True if not null or empty
  const pathName = browserHistory.getCurrentLocation().pathname;
  console.log('isAuthentcated:',isAuthenticated, ' on ',pathName);
  const isUnauthenticatedPage = unAuthenticatedPages.includes(pathName);
  const isAthenticatedPage = authenticatedPages.includes(pathName);
  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/links');
  }
  else if (authenticatedPages && !isAuthenticated) {
    browserHistory.replace('/');
  }
});

Meteor.startup(() => {
  ReactDom.render(routes,document.getElementById('app'));
});
