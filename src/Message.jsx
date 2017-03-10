import React, {Component} from 'react';

class Message extends Component {
  render() {
    return (
      <li>
        <strong>{this.props.username}</strong>: {this.props.content}
      </li>

  );
 }
}

export default Message;
