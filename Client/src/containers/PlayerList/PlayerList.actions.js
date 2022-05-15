export const START_GAME = 'START_GAME';
export const ROOM_JOINED = 'ROOM_JOINED';
export const CATEGORIES_FETCHED = 'CATEGORIES_FETCHED';
export const CATEGORIES_ERROR = 'CATEGORIES_ERROR';

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

export const start_game = (socket, selectedRoom, category) => {
    socket.emit('start-game', {roomNumber: selectedRoom, category});
};

export const get_categories = () => {
    return dispatch => {
        return fetch("http://192.168.41.199:4000/categories")
            .then(handleErrors)
            .then(res => res.json())
    .then(res => dispatch({
            type: CATEGORIES_FETCHED,
            payload: res
        }))
    .catch(err => dispatch({
            type: CATEGORIES_ERROR,
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