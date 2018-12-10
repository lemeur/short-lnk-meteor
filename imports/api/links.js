import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
  Meteor.publish('links', function () {
    // Meteor.userId() Doesn't work in publish functions !
    userId = this.userId;
    return Links.find({userId}); // Return a Cursor
  })
}
