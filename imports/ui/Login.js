import React from 'react';
import {Link} from 'react-router';
import { Meteor } from 'meteor/meteor';

export default class Login extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      error: ''
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();
    Meteor.loginWithPassword({email}, password, (err) => {
      console.log('Login Callback',err);
    }

    );
    // this.setState({
    //   ...this.state,
    //   error: 'There was an error'
    // });
  }
  render() {
    return (
        <div>
          <h1>Login to Short-lnk</h1>
          {this.state.error ? <p>{this.state.error}</p>:undefined}
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input type='text' ref='email' placeholder='foo.bar@gmail.com'/>
            <input type='password' ref='password' placeholder='your password'/>
            <button>Login</button>
          </form>
          <Link to='/signup'>Sign up for an account</Link>
        </div>
      );
  }
}
