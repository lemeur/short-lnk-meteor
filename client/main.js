import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDom from 'react-dom';
import Signup from './../imports/ui/Signup';


Meteor.startup(() => {
  ReactDom.render(<Signup/>,document.getElementById('app'));
});
