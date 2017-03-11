import React, {Component} from 'react';
import Message from "./Message.jsx";
class MessageList extends Component {
  render() {
    return (
      <ul>
        {this.props.messages.map( message => {
          if (message.type != 'updateUserCount') {
            return <Message key={message.id} {...message}/>
          }
        
        })}
      </ul>
    );
  }
}

export default MessageList;
