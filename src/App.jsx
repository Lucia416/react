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
      const data = JSON.parse(event.data)
      console.log(data)

    }
  }

  addMessages = (content, username) => {
    const message = {
      type:"postMessage",
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
    if (event.key === 'Enter') {
      // this.addMessages(this.state.message, this.state.currentUser.name);

      this.setState({
        currentUser: {
          ...this.state.currentUser,
          name: event.target.value
        }
      })

    let newNotification = {
      type: 'postNotification',
      content: `${this.state.currentUser.name} changed their name to ${event.target.value}.`
    }
    this.socket.send(JSON.stringify(newNotification))
  }
}    // this.setState({ user: {
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
