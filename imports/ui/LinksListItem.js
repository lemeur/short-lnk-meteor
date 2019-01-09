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
    this.clipboard.destroy(); // Clean callbacks
  }

  render() {
    return (
      <div>
        <p>{this.props.url}</p>
        <p>{this.props.shortUrl}</p>
        <button ref='copy' data-clipboard-text={this.props.shortUrl}>{this.state.justCopied?'Copied':'Copy'}</button>
      </div>
    );
  }
}

LinksListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  shortUrl: PropTypes.string.isRequired
}
