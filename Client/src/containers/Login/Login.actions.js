export const START_GAME = 'START_GAME';
export const JOIN_ROOM = 'JOIN_ROOM';
export const ROOM_CREATED = 'ROOM_CREATED';
export const FETCHING_ROOMS = 'FETCHING_ROOMS';
export const ROOMS_FETCHED = 'ROOMS_FETCHED';
export const FETCH_ROOMS_ERROR = 'FETCH_ROOMS_ERROR';
export const UPDATE_SELECTED_ROOM = 'UPDATE_SELECTED_ROOM';

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

export const create_new_room = (socket, userName) => {
    return dispatch => {
        socket.emit('create-room', {'userName': userName});
        socket.on('new-room', (res) => {
            dispatch({
                type: ROOM_CREATED,
                payload: res
            });
        });
    }
};

export const get_rooms = (socket) => {
    return dispatch => {
        dispatch({type: FETCHING_ROOMS});
        return fetch("http://localhost:4000/getRoomStats")
            .then(handleErrors)
            .then(res => res.json())
    .then(res => dispatch({
            type: ROOMS_FETCHED,
            payload: res
        }))
    .catch(err => dispatch({
            type: FETCH_ROOMS_ERROR,
            payload: err
        }));
    };
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
