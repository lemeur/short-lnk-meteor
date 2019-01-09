import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
  Meteor.publish('links', function () {
    // Meteor.userId() Doesn't work in publish functions !
    userId = this.userId;
    return Links.find({userId}); // Return a Cursor
  })
}

// Naming convention collectionNAme.action
Meteor.methods({
  'links.insert'(url) {
    if ( !this.userId) {
      throw new Meteor.Error('not-authorized', 'Not logged-in')
    }


    new SimpleSchema({
      url: {
        type: String,
        label: "Your link",
        regEx: SimpleSchema.RegEx.Url
      }
    }).validate({ url });
    Links.insert({
      _id: shortid.generate(),
      url,
      userId: this.userId,
      visible: true
    });
  },
  'links.setVisibility'(_id, visible) {
    if ( !this.userId) {
      throw new Meteor.Error('not-authorized', 'Not logged-in')
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      visible: {
        type: Boolean
      }
    }).validate({ _id, visible });

    Links.update({
        _id: _id,
        userId: this.userId
      },
      {
        $set: {
          visible: visible
        }
    });

  }

})
