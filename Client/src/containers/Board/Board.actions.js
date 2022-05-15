export const INIT_BORAD = 'INIT_BORAD';
export const RECIEVE_LETTER = 'RECIEVE_LETTER';
export const RECEIVE_GUESS = 'RECEIVE_GUESS';
export const ALL_REVEALED = 'ALL_REVEALED';

export const subscribe_events = (socket) => {
    return dispatch => {
        socket.on('init-board', (res) => {
            dispatch({
                type: INIT_BORAD,
                payload: res
            });
        });

        socket.on('reveal-letter', (res) => {
            dispatch({
                type: RECIEVE_LETTER,
                payload: res
            });
        });

        socket.on('receive-guess', (res) => {
            dispatch({
                type: RECEIVE_GUESS,
                payload: res
            });
        });
        socket.on('all-revealed', (res) => {
            dispatch({
                type: ALL_REVEALED,
                payload: res
            });
        });
    }
};

export const play_guess = (socket, number, sentence, user) => {
    return dispatch => {
        socket.emit('player-guess', {
            'roomNumber' : number,
            'guess': sentence,
            "user": user
        });
    };
};
