import React from 'react';
import { browserHistory } from 'react-router';
import  {Accounts}  from 'meteor/accounts-base';
import {Links} from '../api/links';
import LinksList from './LinksList';
import {Meteor} from 'meteor/meteor';

export default class Link extends React.Component {
  onLogout() {
    console.log('logout');
    Accounts.logout();
    //browserHistory.push('/');

  }
  onSubmit(e) {
    e.preventDefault();
    const url = this.refs.url.value.trim();
    if (url) {
      Links.insert({
        url,
        userId: Meteor.userId()
      });
      this.refs.url.value = "";
    }

  }
  render() {
    return (
        <div>
          <p>Your links</p>
          <button onClick={this.onLogout.bind(this)}>Logout</button>
          <LinksList/>
          <p>Add Link</p>
          <form onSubmit={this.onSubmit.bind(this)}>
            <input type="text" ref="url" placeholder="url"/>
            <button>Add Link</button>
          </form>
        </div>
    );
  }
}
