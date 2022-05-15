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
            dispatch({
                type: ROOMS_FETCHED,
                payload: res
            });
        });
    }
};

export const join_room = (socket, roomNumber, userName) => {
    socket.emit('join-room', {roomNumber, userName});
    return dispatch => {
        socket.on('room-joined', (res) => {
            dispatch({
                 type: ROOM_JOINED,
                 payload: res
             });
        });
    }
};

export const create_new_room = (socket, roomNumber, userName) => {
    socket.emit('create-room', {roomNumber, userName});
    return dispatch => {
        socket.on('room-created', (res) => {
            dispatch({
                type: ROOM_CREATED,
                payload: res
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
