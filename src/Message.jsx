import React, {Component} from 'react';

class Message extends Component {
  render() {
    console.log(this.props)
    switch(this.props.type) {
      case "incomingMessage":
      return (
        <div className="message">
            <span className="message-username">{this.props.currentUser.username}</span>
            <span className="message-content">{this.props.content}</span>
        </div>
      );
        break;
      case "incomingNotification":
      return (
        <div className="message system">
            <span className="message-content">{this.props.content}</span>
        </div>
      );
        break;
      default:
        return <div>error</div>
    }
  // return (
  //     <li>
  //       <strong>{}</strong>: {this.props.content}
  //     </li>
  //
  // );
 }
}

export default Message;
