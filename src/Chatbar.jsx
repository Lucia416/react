import React, {Component} from 'react';

class Chatbar extends Component {
  render() {
    const { username, message, changeUsername, changeMessage, publishMsg } = this.props;

    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          value={username}
          onChange={changeUsername}
          placeholder="Your Name (Optional)"
        />
        <input
          value={message}
          onChange={changeMessage}
          onKeyDown={publishMsg}
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
        />
      </footer>
    )
  }
}

export default Chatbar;
