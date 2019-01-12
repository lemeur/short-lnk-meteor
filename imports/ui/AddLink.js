import React from 'react';
import {Meteor} from 'meteor/meteor';


export default class AddLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: ''
    }
  }
  onSubmit(e) {
    //const url = this.state.url;
    // equivalent to:
    const {url} = this.state;
    e.preventDefault();
    if (url) {
      Meteor.call('links.insert', url, (err, res) => {
      if (!err) {
        // If there is NO error, reset the URL in state
        this.setState({url: ''})
      }
      });
    }


  }
  onChange(e) {
    this.setState({
        url: e.target.value
    });
  }
  render() {
    return (
      <div>
        <h2>Add Link</h2>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="text"
                 placeholder="url"
                 value={this.state.url}
                 onChange={this.onChange.bind(this)}
          />
          <button>Add Link</button>
        </form>
      </div>
    );
  }
}
