import * as BoardActions from '../Board/Board.actions';
import { SERVER_URL} from '../../Util';
export const START_GAME = 'START_GAME';
export const ROOM_JOINED = 'ROOM_JOINED';
export const ROOM_INFO = 'ROOM_INFO';
export const CATEGORIES_FETCHED = 'CATEGORIES_FETCHED';
export const CATEGORIES_ERROR = 'CATEGORIES_ERROR';
export const UPDATE_SELECTED_CATEGORY = 'UPDATE_SELECTED_CATEGORY';
export const INIT_BORAD = 'INIT_BORAD';
export const RESET_GAME = 'RESET_GAME';

export const room_joined = (socket) => {
    return dispatch => {
        socket.on('room-joined', (res) => {
            dispatch({
                 type: ROOM_JOINED,
                 payload: res
             });
        });
        socket.on('init-board', (res) => {
            dispatch({
                 type: INIT_BORAD,
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
        return fetch(`${SERVER_URL}/categories`)
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

export const update_selected_category = (e) => {
    return dispatch => {
        dispatch({
            type: UPDATE_SELECTED_CATEGORY,
            payload: e.target.value
        });
    }
};
export const reset_board = (e) => {
    return dispatch => {
        dispatch({
            type: BoardActions.RESET_BORAD
        });
    }
};

export const get_room_info = (socket, roomNumber) => {
    socket.emit('room-info', {roomNumber});
    return dispatch => {
        socket.on('room-info', (res) => {
            dispatch({
                type: ROOM_INFO,
                payload: res
            });
        });
    }
};

export const leave_room = (socket, roomNumber, user) => {
    socket.emit('leave-room', {user, roomNumber});
};

export const reset_game = () => {
    return dispatch => {
        dispatch({
            type: RESET_GAME
        });
    }
};
