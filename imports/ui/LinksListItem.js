import {Meteor} from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import ClipBoard from 'clipboard';

export default class LinksListItem extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      justCopied: false
    }
  }
  componentDidMount() {
    console.log('LinksLitsItem did mount',this.props.url);
    this.clipBoard = new ClipBoard(this.refs.copy);

    this.clipBoard.on('success', () => {
      this.setState({justCopied: true});
      setTimeout(() => { this.setState({justCopied: false}) }, 1000);
    }).on('error', () => {
      console.log('ERROR copying link URL to clipboard');
      this.setState({justCopied: false});
    });

  }

  componentWillUnmount() {
    console.log('LinksLitsItem will Unmount',this.props.url);
    if (this.clipboard) {
      this.clipboard.destroy(); // Clean callbacks
    }
    console.log('LinksLitsItem UnmountED', this.props.url);
  }

  render() {
    return (
      <div>
        <p>{this.props.url}</p>
        <p>{this.props.shortUrl}</p>
        <p>{this.props.visible?'Visible':'Hidden'}</p>
        <button ref='copy' data-clipboard-text={this.props.shortUrl}>{this.state.justCopied?'Copied':'Copy'}</button>
        <button onClick={() => { Meteor.call('links.setVisibility', this.props._id, !this.props.visible) } }>
          {this.props.visible?'Hide':'UnHide'}
        </button>
      </div>
    );
  }
}

LinksListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  shortUrl: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired
}
