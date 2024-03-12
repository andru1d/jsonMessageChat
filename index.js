const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// express route to index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

//app.get('/', (req, res) => {
//  res.send('<h1>Hello world</h1>');
//});
let clientNum = 0;

io.on('connection', (socket) => { 
  let me = clientNum++;
 console.log('Client ' + me + ' connected.');
 io.emit('init', me);
});

io.on('connection', (socket) => 
{
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

const socketNum = 4000;
server.listen(socketNum, () => {
  console.log('listening on *:'+socketNum);
});
