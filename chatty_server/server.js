// server.js

const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuid = require('node-uuid');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};


wss.on('connection', (ws) => {
  console.log('Client connected');
    ws.on('message', (msg) => {
      console.log('message is: ' + msg)
        let message = JSON.parse(msg);
        switch(message.type) {
            case 'postMessage':
                wss.broadcast(JSON.stringify({
                    type: 'incomingMessage',
                    id: uuid.v1(),
                    currentUser: {
                        username: message.username,
                    },
                      content: message.content
                }));
                break;
            case 'postNotification':
                console.log(message.content);
                wss.broadcast(JSON.stringify({
                    type: 'incomingNotification',
                    id: uuid.v1(),
                    content: message.content
                }));
                break;
            default:
        }
    })

    // Set up a callback for when a client closes the socket. This usually means they closed their browser.
      ws.on('close', () => console.log('Client disconnected'));

    })
