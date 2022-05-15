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
            socket.on('create-game', (socketData) => {
                Promise.all(['totalRoomCount', 'allRooms'].map(key => this.data[key])).then(values => {
                    console.log(values);
                    const allRooms = JSON.parse(values[1]);
                    let totalRoomCount = values[0];
                    let fullRooms = allRooms['fullRooms'];
                    let emptyRooms = allRooms['emptyRooms'];
                    /*Checking the if the room is empty.*/
                    let isIncludes = emptyRooms.includes(totalRoomCount);
                    if (!isIncludes) {
                        totalRoomCount++;
                        emptyRooms.push(totalRoomCount);
                        socket.join("room-" + totalRoomCount);
                        this.data.totalRoomCount = totalRoomCount;
                        this.data.allRooms = JSON.stringify({
                            emptyRooms: emptyRooms,
                            fullRooms: fullRooms
                        });
                        IO.emit('rooms-available', {
                            'totalRoomCount': totalRoomCount,
                            'fullRooms': fullRooms,
                            'emptyRooms': emptyRooms
                        });
                        IO.sockets.in("room-" + totalRoomCount).emit('new-room', {
                            'totalRoomCount': totalRoomCount,
                            'fullRooms': fullRooms,
                            'emptyRooms': emptyRooms,
                            'roomNumber': totalRoomCount
                        });
                    }
                });
            });

            /*
             * In this event will user can join the selected room
             */
            socket.on('join-room', (socketData) => {
                const roomNumber = socketData.roomNumber;
                Promise.all(['totalRoomCount', 'allRooms'].map(key => this.data[key])).then(values => {
                    const allRooms = JSON.parse(values[1]);
                    let totalRoomCount = values[0];
                    let fullRooms = allRooms['fullRooms'];
                    let emptyRooms = allRooms['emptyRooms'];
                    let indexPos = emptyRooms.indexOf(roomNumber);
                    if (indexPos > -1) {
                        emptyRooms.splice(indexPos, 1);
                        fullRooms.push(roomNumber);
                    }
                    /* User Joining socket room */
                    socket.join("room-" + roomNumber);
                    this.data.allRooms = JSON.stringify({
                        emptyRooms: emptyRooms,
                        fullRooms: fullRooms
                    });
                    /* Getting the room number from socket */
                    const currentRoom = (Object.keys(IO.sockets.adapter.sids[socket.id]).filter(item => item != socket.id)[0]).split('-')[1];
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
            });

            /*
             * This event will send played moves between the users
             * Also Here we will calaculate the winner.
             */
            socket.on('send-move', (socketData) => {
                const playedGameGrid = socketData.gameGrid;
                const roomNumber = socketData.roomNumber;
                let winner = null;
                /* checking the winner */
                this.winCombination.forEach(singleCombination => {
                    if (playedGameGrid[singleCombination[0]] &&
                        playedGameGrid[singleCombination[0]] === playedGameGrid[singleCombination[1]] &&
                        playedGameGrid[singleCombination[0]] === playedGameGrid[singleCombination[2]]) {
                        winner = playedGameGrid[singleCombination[0]] + ' Wins !';
                    }
                    return false;
                });
                if (winner === null) {
                    let movesPlayed = 0;
                    playedGameGrid.forEach((cell) => {
                        if (cell) {
                            movesPlayed++;
                        }
                    })
                    if (movesPlayed === 9) {
                        winner = 'Game Draw';
                    }
                }

                if (winner === null) {
                    socket.broadcast.to("room-" + roomNumber).emit('receive-move', {
                        'position': socketData.position,
                        'playedText': socketData.playedText,
                        'winner': null
                    });
                } else {
                    IO.sockets.in("room-" + roomNumber).emit('receive-move', {
                        'position': socketData.position,
                        'playedText': socketData.playedText,
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
                        const allRooms = JSON.parse(values[1]);
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