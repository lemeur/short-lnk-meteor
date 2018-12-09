import React from 'react';
import {Tracker} from 'meteor/tracker';
import {Links} from '../api/links';

export default class LinksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: []
    }
  }
  componentDidMount() {
    console.log('LinksList DidMount');
    this.linksTracker = Tracker.autorun( () => {
      const allLinks = Links.find({}).fetch();
      this.setState({links: allLinks});
    });
  }
  componentWillUnmount() {
    console.log('LinksList WillUnmount');
    this.linksTracker.stop(); // Stopping the Tracker to save CPU
  }
  renderLinksListItems () {
    return this.state.links.map( (link) => {
      return <p key={link._id}>{link.url}</p>;
    });
  }
  render() {
    return (
        <div>
          <p>Links List</p>
          {this.renderLinksListItems()}
        </div>
    );
  }

}
