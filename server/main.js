import { Meteor } from 'meteor/meteor';
import {Webapp} from 'meteor/webapp';

import '../imports/api/users'; // only import and execute
import {Links} from '../imports/api/links';
import '../imports/startup/simple-schema-configuration.js';



Meteor.startup(() => {

WebApp.connectHandlers.use((req,res,next) => {
  const _id = req.url.slice(1); // Strip leading / in URL
  const link = Links.findOne({_id})
  if (link) {
    // If there's a mathc, redirect to the url of the found link
    console.log('Redirect id:'+_id+' to url:'+link);
    Meteor.call('links.trackVisit', _id);
    res.statusCode = 302; // Redirect
    res.setHeader('Location',link.url);
    res.end();
  }
  else {
    // Just let the application handle the request if ther is no -id match
    next();
  }

})



});
