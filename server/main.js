import { Meteor } from 'meteor/meteor';
import '../imports/api/users'; // only import and execute
import '../imports/api/links'; // direct import, not a named import contrary to client/main.js
import '../imports/startup/simple-schema-configuration.js';

Meteor.startup(() => {



});
