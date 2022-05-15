'use strict';

class Socket {

    constructor(socket, data) {
        this.io = socket;
        this.data = data;
        /* Win combination to check winner of the Game.*/
        this.winCombination = [
            [1, 2, 3], [4, 5, 6], [7, 8, 9],
            [1, 4, 7], [2, 5, 8], [3, 6, 9],
            [1, 5, 9], [7, 5, 3]
        ];
    }

    socketEvents() {
        const IO = this.io;
        let allRooms = null;
        let totalRoomCount = null;

        IO.on('connection', (socket) => {

            socket.setMaxListeners(20);
            /* Setting Maximum listeners */

            /*
             * In this Event user will create a new Room and can ask someone to join.
             */
            socket.on('create-room', (socketData) => {

                let id = 1;
                let found = false;
                while (!found) {
                    found = Object.keys(this.data).every(key => key !== String(id));
                    if (!found) {
                        id += 1;
                    }
                }
                const {user} = socketData;

                this.data.rooms[id] ={
                    players: {},
                    isFull: false
                };
                this.data.rooms[id].players[user] = {points: 0};

                IO.emit('room-created', {id});
                socket.broadcast.emit( {
                    rooms: this.data.rooms
                });
            });

            /*
             * In this event will user can join the selected room
             */
            socket.on('join-room', (socketData) => {
                const {roomNumber, user} = socketData;
                const room = this.data.rooms[roomNumber];
                if (room.isFull) {
                    IO.emit('room-joined', 'FULL');
                    return;
                }

                /* User Joining socket room */
                socket.join("room-" + roomNumber);
                this.data.allRooms = JSON.stringify({
                    emptyRooms: emptyRooms,
                    fullRooms: fullRooms
                });
                /* Getting the room number from socket */
                const currentRoom = (Object.keys(IO.sockets.adapter.sids[socket.id]).filter(item => item !== socket.id)[0]).split('-')[1];
                IO.emit('rooms-available', {
                    'totalRoomCount': totalRoomCount,
                    'fullRooms': fullRooms,
                    'emptyRooms': emptyRooms
                });
                IO.sockets.in("room-" + roomNumber).emit('start-game', {
                    'totalRoomCount': totalRoomCount,
                    'fullRooms': fullRooms,
                    'emptyRooms': emptyRooms,
                    'roomNumber': currentRoom
                });

            });

            /*
             * This event will send played moves between the users
             * Also Here we will calaculate the winner.
             */
            socket.on('send-move', (socketData) => {
                const playedGameGrid = socketData.gameGrid;
                const {user, roomNumber, playedClause} = socketData;
                const room = this.data.rooms[roomNumber];
                const {generatedClause} = room;
                let winner;

                if (generatedClause.toLowerCase().indexOf(playedClause.toLowerCase()) >= 0) {
                    winner = user;
                    room.players[user].points += room.gamePoints;
                }

                if (!winner) {
                    socket.broadcast.to("room-" + roomNumber).emit('receive-move', {
                        'playedClause': socketData.playedClause,
                        'winner': null
                    });
                } else {
                    IO.sockets.in("room-" + roomNumber).emit('receive-move', {
                        'playedClause': generatedClause,
                        'winner': winner
                    });
                }


            });



            /*
             * Here we will remove the room number from fullrooms array
             * And we will update teh Redis DB keys.
             */
            socket.on('disconnecting', ()=> {
                const rooms = Object.keys(socket.rooms);
                const roomNumber = ( rooms[1] !== undefined && rooms[1] !== null) ? (rooms[1]).split('-')[1] : null;
                if (rooms !== null) {
                    Promise.all(['totalRoomCount', 'allRooms'].map(key => this.data[key])).then(values => {
                        console.log(values);
                        const allRooms = values[1];
                        let totalRoomCount = values[0];
                        let fullRooms = allRooms['fullRooms'];
                        let emptyRooms = allRooms['emptyRooms'];

                        let fullRoomsPos = fullRooms.indexOf(parseInt(roomNumber));
                        if (fullRoomsPos > -1) {
                            fullRooms.splice(fullRoomsPos, 1);
                        }
                        if (totalRoomCount > 1) {
                            totalRoomCount--;
                        } else {
                            totalRoomCount = 1;
                        }
                        this.data.totalRoomCount = totalRoomCount;
                        this.data.allRooms = JSON.stringify({
                            emptyRooms: emptyRooms,
                            fullRooms: fullRooms
                        });
                        IO.sockets.in("room-" + roomNumber).emit('room-disconnect', {id: socket.id});
                    });
                }//if ends
            });

        });
    }

    socketConfig() {
        this.socketEvents();
    }
}
module.exports = Socket;