// Socket.io tutorial revised by @andru1d to show JSON messaging
const express = require('express');
const app = express();
const http = require('http');
const nodeServer = http.createServer(app);
const { Server } = require("socket.io");
const socketServer = new Server(nodeServer);

// express route to index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

//app.get('/', (req, res) => {
//  res.send('<h1>Hello world</h1>');
//});
// keep track of which client we are.
let clientNum = 0;

// when a client (web browser) connects, send it an init message with clientNum, then bump that
socketServer.on('connection', (socket) => 
  { 
    let me = clientNum++;
    console.log('Client ' + me + ' connected.');
    socketServer.emit('init', me, socket.id);
  }
);

// set up chat message event handler
// pass messages from one client to all the clients
socketServer.on('connection', (socket) => 
{
    socket.on('chat message', (msg) => 
      {
        console.log('message: ' + msg);
        //TODO add server side functionality here
        socketServer.emit('chat message', msg);
    });
  }
);

const socketNum = 4000;
nodeServer.listen(socketNum, () => 
  {
    console.log('listening on *:'+socketNum);
  }
);
