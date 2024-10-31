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
    console.log(`Client ${me} connected.`);
    // send init message right away for new connection
    socketServer.emit('init', me, socket.id);

    // setup chat message handler for latest connection
    // pass messages from one client to all the clients
    socket.on('chat', (msg) => 
      {
        console.log(`chat(${msg})`);
        //TODO add server side functionality here
        socketServer.emit('chat', msg); // send to all clients
      });
  }
);

const socketNum = 4000;
nodeServer.listen(socketNum, () => 
  {
    console.log('listening on *:'+socketNum);
  }
);
