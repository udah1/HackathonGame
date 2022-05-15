export const START_GAME = 'START_GAME';
export const UPDATE_SELECTED_ROOM = 'UPDATE_SELECTED_ROOM';
export const UPDATE_USER_NAME = 'UPDATE_USER_NAME';
export const ROOMS_FETCHED = 'ROOMS_FETCHED';
export const ROOM_JOINED = 'ROOM_JOINED';
export const ROOM_CREATED = 'ROOM_CREATED';

export const subscribe_events = (socket) => {
    socket.emit('room-list');
    return dispatch => {
        socket.on('rooms', (res) => {
            const allRooms = (res.rooms !== null && res.rooms !== undefined) ? Object.keys(res.rooms) : null;
            const selectedRoom = allRooms && allRooms.length > 0 ? allRooms[0] : null;
            dispatch({
                type: ROOMS_FETCHED,
                payload: {rooms: res.rooms, selectedRoom}
            });
        });
    }
};

export const join_room = (socket, roomNumber, user) => {
    socket.emit('join-room', {roomNumber, user});
    return dispatch => {
        socket.on('room-joined', (res) => {
            dispatch({
                 type: ROOM_JOINED,
                 payload: res
             });
        });
    }
};

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

export const create_new_room = (socket, user) => {
    socket.emit('create-room', {user});
    return dispatch => {
        socket.on('room-created', (res) => {
            dispatch({
                type: ROOM_CREATED,
                payload: {res, gameOwner: user}
            });
        });
    }
};

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
};

export const update_selected_room = (e) => {
    return dispatch => {
        dispatch({
            type: UPDATE_SELECTED_ROOM,
            payload: e.target.value
        });
    }
};

export const update_user_name = (e) => {
    return dispatch => {
        dispatch({
            type: UPDATE_USER_NAME,
            payload: e.target.value
        });
    }
};
