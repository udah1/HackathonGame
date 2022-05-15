export const START_GAME = 'START_GAME';
export const JOIN_ROOM = 'JOIN_ROOM';
export const ROOM_CREATED = 'ROOM_CREATED';

export const subscribe_events = (socket) => {
    return dispatch => {
        socket.on('start-game', (res) => {
            dispatch({
                type: START_GAME,
                payload: res
            });
        });
    }
};

export const join_room = (socket, roomNumber) => {
    socket.emit('join-room', {roomNumber});
    return dispatch => {
        dispatch({
            type: JOIN_ROOM,
            roomNumber
        });
    };
};

export const create_new_room = (socket) => {
    return dispatch => {
        socket.emit('create-room', {'createroom': 1});
        socket.on('new-room', (res) => {
            dispatch({
                type: ROOM_CREATED,
                payload: res
            });
        });
    }
};
