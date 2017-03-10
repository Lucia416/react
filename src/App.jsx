import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Chatbar from "./Chatbar.jsx";
import MessageList from "./MessageList.jsx";


export default class App extends Component {
  constructor(props){
    super(props)
  this.changeUsername = this.changeUsername.bind(this)
    this.state = {
      currentUser: {name:'Anonymous'},
      userCount: 0,
      messages: []
    }
  }


  componentDidMount() {
    this.socket = new WebSocket(`ws://0.0.0.0:3001`);

    this.socket.onmessage = (event) => {
      this.receiveMessages(JSON.parse(event.data))
      // console.log(event);
      console.log(JSON.parse(event.data))
      switch(data.type) {
        case "incomingMessage":
        return (
          <div className="message system">
              <span className="message-content">{this.props.content}</span>
          </div>
        );
          break;
        case "incomingNotification":
        return (
          <div className="message">
              <span className="message-username">{this.props.currentUser.name}</span>
              <span className="message-content">{this.props.content}</span>
          </div>
        );

          break;
        default:
          // show an error in the console if the message type is unknown
          console.log("Unknown event type ", message.type);
      }
    }
  }

  addMessages = (content, username) => {
    const message = {
      type:"incomingMessage",
      username,
      content,
    };

    this.socket.send(JSON.stringify(message))
    console.log('this.state:', this.state.messages);
  };

  receiveMessages = (message) => {
    let messages = [...this.state.messages, message]
    this.setState({ messages });
  };

  publishMsg = (event) => {
    if (event.key === 'Enter'){
      this.addMessages(this.state.message, this.state.currentUser.name);
      this.setState({ message: event.target.value });
    }
  };

  changeMessage = (event) => {
    this.setState({ message: event.target.value });
  };

  changeUsername = (event) => {
    this.setState({
      user: {
        ...this.state.currentUser,
        name: event.target.value
      }
    }, () => {
      if (event.key === 'Enter') {
        this.addMessages(this.state.message, this.state.currentUser.name);
      }
    })
    let newNotification = {
      type: 'postNotification',
      content: `${this.state.currentUser.name} changed their name to ${e.target.value}.`
    };
  }
    // this.setState({ user: {
    //   ...this.state.currentUser,
    //   name: event.target.value,




  render() {
    return (
      <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <Chatbar
        message={this.state.message}
        username={this.state.currentUser.name}
        changeUsername={this.changeUsername}
        changeMessage={this.changeMessage}
        publishMsg={this.publishMsg}
      />
      <MessageList messages={this.state.messages}/>
     </div>
    )
  }
}

// export default App;
