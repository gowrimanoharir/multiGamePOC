const express = require('express');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const gmhr = require('./gamehandler');

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

io.set('log level',1);



io.sockets.on('connection', function (socket) {
    //console.log('client connected');
    gmhr.initGame(io, socket);
});


server.listen(port, () => {
    console.log('server on port'+port);
});