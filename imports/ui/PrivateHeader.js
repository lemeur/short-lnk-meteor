import React from 'react';
import  {Accounts}  from 'meteor/accounts-base';
import PropTypes from 'prop-types';

export default class PrivateHeader extends React.Component {
  onLogout() {
    console.log('logout');
    Accounts.logout();
  }

  render() {
    return (
      <div>
        <p>{this.props.title}</p>
        <button onClick={this.onLogout.bind(this)}>Logout</button>
      </div>
    );
  }
}

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired
}
