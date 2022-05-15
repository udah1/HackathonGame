export const START_GAME = 'START_GAME';
export const ROOM_JOINED = 'ROOM_JOINED';
export const ROOMS_FETCHED = 'ROOMS_FETCHED';
export const FETCH_ROOMS_ERROR = 'FETCH_ROOMS_ERROR';

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

export const get_categories = () => {
    return dispatch => {
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
