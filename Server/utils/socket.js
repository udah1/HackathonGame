'use strict';
const categories = require('../categories.json');

function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

class Socket {

    getAvailableRooms = () => {
        let rooms = {};
        console.log(this.data.rooms, 'rooms');
        Object.keys(this.data.rooms).forEach(key => {
            if (this.data.rooms[key].available) {
                rooms[key] = this.data.rooms[key];
            }
        });
        return rooms
    };

    constructor(socket, data) {
        this.io = socket;
        this.data = data;
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
                console.log('create-room', socketData);
                let id = 1;
                let found = false;
                while (!found) {
                    found = Object.keys(this.data.rooms).every(key => key !== String(id));
                    if (!found) {
                        id += 1;
                    }
                }
                const {user} = socketData;
                socket.join("room-" + id);
                this.data.rooms[String(id)] = {
                    id,
                    players: {},
                    available: true
                };
                this.data.rooms[id].players[user] = {user, points: 0};
                console.log('room created', id);
                IO.emit('room-created', {id});
                const rooms = this.getAvailableRooms();
                socket.broadcast.to("room-list").emit( 'rooms', {
                    rooms: rooms
                });
            });
            /*
             * In this event will user can join the selected room
             */
            socket.on('room-list', () => {
                console.log('room-list');
                /* User Joining socket room */
                socket.join("room-list");
                /* Getting the room number from socket */
                const rooms = this.getAvailableRooms();
                IO.emit('rooms', {
                    rooms
                });
            });

            /*
             * In this event will user can join the selected room
             */
            socket.on('join-room', (socketData) => {
                console.log('join-room', socketData);
                const {roomNumber, user} = socketData;
                const room = this.data.rooms[roomNumber];
                if (!room.available) {
                    IO.emit('room-joined', {error: 'NOT-AVAILABLE'});
                    return;
                }

                /* Getting the room number from socket */
                if (room.players[user]) {
                    IO.emit('room-joined', {error: 'USER-EXIST'});
                    return;
                }

                /* User Joining socket room */
                socket.join("room-" + roomNumber);
                room.players[user] = {user, points: 0};
                if (room.players.length === 4) {
                    room.available = false;

                    const rooms = this.getAvailableRooms();
                    IO.sockets.in('room-list').emit('rooms', {
                        rooms
                    });
                }

                IO.sockets.in("room-" + roomNumber).emit('room-joined', {
                    room,
                    new: user
                });
            });


            /*
             * In this event will user can join the selected room
             */
            socket.on('start-game', (socketData) => {
                console.log('start-game', socketData);
                const {roomNumber, category} = socketData;
                const room = this.data.rooms[roomNumber];

                room.timeout = setTimeout(() => {
                    room.gamePoints -= 10;

                    const {sentence, reveledSentence} = room;
                    const availableIndexToReveal = [];
                    reveledSentence.split('').forEach((letter, index) => {
                       if (letter === '*') {
                           availableIndexToReveal.push(index);
                       }
                    });

                    if (availableIndexToReveal.length === 0) {
                        IO.sockets.in("room-" + roomNumber).emit('all-revealed');
                        return;
                    }
                    const randomIndex= randomIntFromInterval(0, availableIndexToReveal.length - 1)
                    const index = availableIndexToReveal[randomIndex];
                    room.reveledSentence = reveledSentence.substr(0,index) + sentence[index] + reveledSentence.substr(index + 1);

                    IO.sockets.in("room-" + roomNumber).emit('reveal-letter', {
                        letters: [{ind: 5, val: 'א'}],
                        score: room.gamePoints
                    })
                }, 10000);
                const sentences = categories[category];
                const sentence = sentences[index];
                let toReveal;
                let toRevealIndex;
                do {
                    toRevealIndex = randomIntFromInterval(0, sentence.length -1)
                    toReveal = sentence[toRevealIndex];
                } while (toReveal === ' ');
                let reveledSentence = '';
                sentence.split('').forEach((letter, index) => {
                    if (letter === ' ' || index === toRevealIndex) {
                        reveledSentence += letter;
                    } else {
                        reveledSentence += '*';
                    }
                });
                room.sentence = sentence;
                room.reveledSentence= reveledSentence;

                IO.sockets.in("room-" + roomNumber).emit('init-board', {
                    sentence: reveledSentence,
                    score: room.gamePoints
                })
            });


            /*
             * This event will send played moves between the users
             * Also Here we will calculate the winner.
             */
            socket.on('player-guess', (socketData) => {
                console.log('player-guess', socketData);
                const {user, roomNumber, guess} = socketData;
                const room = this.data.rooms[roomNumber];
                const {generatedClause} = room;
                let winner;

                if (generatedClause.toLowerCase().indexOf(guess.toLowerCase()) >= 0) {
                    winner = user;
                    room.players[user].points += room.gamePoints;
                }

                if (!winner) {
                    socket.broadcast.to("room-" + roomNumber).emit('receive-guess', {
                        'guess': socketData.guess,
                        'winner': null
                    });
                } else {
                    clearTimeout(room.timeout);
                    room.timeout = undefined;
                    IO.sockets.in("room-" + roomNumber).emit('receive-guess', {
                        'guess': generatedClause,
                        'winner': winner
                    });
                }
            });



            /*
             * Here we will remove the room number from fullrooms array
             * And we will update teh Redis DB keys.
             */
            socket.on('disconnect', ()=> {
                console.log(socket, 'socket');
            });

        });
    }

    socketConfig() {
        this.socketEvents();
    }
}
module.exports = Socket;