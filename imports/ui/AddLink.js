import React from 'react';
import Modal from 'react-modal';
import {Meteor} from 'meteor/meteor';


export default class AddLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      modalIsOpen: false,
      error: ''
    }
  }
  onSubmit(e) {
    //const url = this.state.url;
    // equivalent to:
    const {url} = this.state;
    e.preventDefault();

    Meteor.call('links.insert', url, (err, res) => {
      if (!err) {
        // If there is NO error, reset the URL in state
        this.handleModalClose()
      } else {
        this.setState({error: err.reason});
      }
    });
  }
  onChange(e) {
    this.setState({
        url: e.target.value
    });
  }
  handleModalClose() {
    this.setState(
      {
        url: '',
        modalIsOpen: false,
        error: ''
      });
  }
  render() {
    return (
      <div>
        <button className="button" onClick={() => this.setState({modalIsOpen: true})}>+Add link</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          contentLabel="AddLink"
          onAfterOpen={() => this.refs.url.focus()}
          onRequestClose={this.handleModalClose.bind(this)}
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view__modal">
          <h1>Add Link</h1>
          {this.state.error?<p>{this.state.error}</p>:undefined}
          <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)}>
            <input type="text"
                   ref="url"
                   placeholder="url"
                   value={this.state.url}
                   onChange={this.onChange.bind(this)}/>
            <button className="button">Add Link</button>
            <button type="button" className="button button--secondary" onClick={this.handleModalClose.bind(this)}>Cancel</button>
          </form>

        </Modal>
      </div>
    );
  }
}
