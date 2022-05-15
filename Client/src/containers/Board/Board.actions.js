export const INIT_BORAD = 'INIT_BORAD';
export const RECIEVE_LETTER = 'RECIEVE_LETTER';

export const subscribe_events = (socket) => {
    console.log('init');
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
