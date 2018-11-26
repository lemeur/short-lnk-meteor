import React from 'react';
import { browserHistory } from 'react-router';
import  {Accounts}  from 'meteor/accounts-base';

export default class Link extends React.Component {
  onLogout() {
    console.log('logout');
    Accounts.logout();
    //browserHistory.push('/');
    
  }
  render() {
    return (
        <div>
          <p>Your links</p>
          <button onClick={this.onLogout.bind(this)}>Logout</button>
        </div>
    );
  }
}
