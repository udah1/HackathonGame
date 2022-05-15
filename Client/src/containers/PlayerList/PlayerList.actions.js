export const START_GAME = 'START_GAME';
export const ROOM_JOINED = 'ROOM_JOINED';

export const room_joined = (socket) => {
    return dispatch => {
        socket.on('room-joined', (res) => {
            dispatch({
                 type: ROOM_JOINED,
                 payload: res
             });
        });
    }
};

export const start_game = (socket, selectedRoom) => {
    socket.emit('start-game', {roomNumber: selectedRoom});
    return dispatch => {
        socket.on('room-created', (res) => {
            dispatch({
                type: "",
                payload: {res}
            });
        });
    }
};

