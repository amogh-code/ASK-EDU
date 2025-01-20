const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join_channel', (channel) => {
    socket.join(channel); 
    console.log(`User joined channel: ${channel}`);
  });

  socket.on('send_message', (data) => {
    io.to(data.channel).emit('new_message', data); 
    console.log(`Message sent in channel ${data.channel}: ${data.message}`);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
