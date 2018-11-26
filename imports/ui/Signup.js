import React from 'react';
import {Link} from 'react-router';
import  {Accounts}  from 'meteor/accounts-base';

export default class Signup extends React.Component {
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
    Accounts.createUser(
      {email,password} ,
      (err) => {
          //console.log('Signup callback',err);
          if (err) {
            this.setState({error: err.reason});
          } else {
            this.setState({error: ''});
          }
      });
  }
  render() {
    return (
        <div>
          <h1>Signup here</h1>
          {this.state.error ? <p>{this.state.error}</p>:undefined}
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input type='text' ref='email' placeholder='foo.bar@gmail.com'/>
            <input type='password' ref='password' placeholder='your password'/>
            <button>Create account</button>
          </form>
            <Link to='/'>Already have an account ?</Link>
        </div>
    );
  }
}
