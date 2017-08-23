let io, gmsocket;

exports.initGame = (sio, socket) => {
    io = sio;
    gmsocket = socket;

    //host events
    gmsocket.on('createNewGame', createNewGame);


    //player events
    gmsocket.on('playerJoinGame', playerJoinGame);

}

//host functions
const createNewGame = () => {
    let thisGameId = (Math.random()*100000) | 0;

    this.emit('newGameCreated', {gameId: thisGameId, mySocketId: this.id});

    this.join(thisGameId.toString());
}

//player functions
const playerJoinGame = (data) => {
    let sock = this;

    let room = gmsocket.manager.rooms["/"+data.gameId];

    if(room != undefined){
        data.mySocketId = sock.id;
        sock.join(data.gameId);

        console.log('Player ' + data.playerName + ' joining game: ' + data.gameId );

        io.sockets.in(data.gameId).emit('playerJoinedRoom', data);
    } else {
        this.emit('error', {message: "the room does not exist"});
    }
}