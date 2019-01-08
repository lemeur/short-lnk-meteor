import {Meteor} from 'meteor/meteor';
import React from 'react';
import {Tracker} from 'meteor/tracker';
import {Links} from '../api/links';
import LinksListItem from './LinksListItem';


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
      Meteor.subscribe('links'); // Subscribing to the 'links' publication
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
      //return <p key={link._id}>{link.url}</p>;
      const shortUrl = Meteor.absoluteUrl(link._id)
      // On peut utiliser le psread operator ... pour expand les attributs de l'objet dans du JSX
      return <LinksListItem key={link._id} shortUrl={shortUrl} {...link} />
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
