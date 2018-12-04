import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDom from 'react-dom';
import {Tracker} from 'meteor/tracker';
import {routes, onAuthChange} from './../imports/routes/routes';
import {Links} from '../imports/api/links';


Tracker.autorun( () => {
  const allLinks = Links.find({}).fetch();
  console.log(allLinks);
});

Tracker.autorun( () => {
  const isAuthenticated = !!Meteor.userId(); // True if not null or empty
  onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
  ReactDom.render(routes,document.getElementById('app'));
});
