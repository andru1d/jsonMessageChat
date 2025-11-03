// Socket.io tutorial revised by @andru1d to show JSON messaging
const express = require('express');
const app = express();
const http = require('http');
const nodeServer = http.createServer(app);
const { Server } = require("socket.io");
const socketServer = new Server(nodeServer);
const path = require('path');
const fs = require('fs');
const clientServer = require(path.join(__dirname, 'includes/clientServer.js'));
//import {INIT} from path.join(__dirname, 'includes/clientServer.mjs');

//app.use('/includes', express.static(path.join(__dirname, 'includes')));
app.use(express.static(__dirname)); // set express path for static content to be our directory

// express route to index.html
app.get('/flexChat.html', (req, res) => {
  res.sendFile('./flexChat.html'); // use path.join for platform independence
//  res.sendFile(path.join(__dirname, 'flexChat.html')); // use path.join for platform independence
});


//eval('var INIT = "init";');
//eval(fs.readFileSync('./includes/clientServer.js').toString());

//app.get('/', (req, res) => {
//  res.send('<h1>Hello world</h1>');
//});
// keep track of which client we are.
let clientNum = 0;

// when a client (web browser) connects, send it an init message with clientNum, then bump that
socketServer.on('connection', (socket) => 
  { 
    let me = clientNum++;
    console.log(`Socket.io Client ${me} connected.`);
    // send init message right away for new connection
    socketServer.emit(clientServer.INIT, me, socket.id);

    // setup chat message handler for latest connection
    // pass messages from one client to all the clients
    socket.on('chat', (msg) => 
      {
        console.log(`Socket.io.chat(${msg})`);
        //TODO add server side functionality here
        socketServer.emit(clientServer.CHAT, msg); // send to all clients
      });
  }
);

const socketNum = 4000;
nodeServer.listen(socketNum, () => 
  {
    console.log('Node.js web server listening on *:'+socketNum);
  }
);
