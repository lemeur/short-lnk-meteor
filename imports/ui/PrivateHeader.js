import React from 'react';
import  {Accounts}  from 'meteor/accounts-base';
import PropTypes from 'prop-types';


const PrivateHeader = (props) => {
      const onLogout = () => {
        Accounts.logout();
      }
      return (
        <div>
          <h1>{props.title}</h1>
          <button onClick={onLogout}>Logout</button>
          {/*  <button onClick={() => Accounts.logout() }>Logout</button>  */}
        </div>);
}

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired
}

export default PrivateHeader;
