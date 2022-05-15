export const INIT_BORAD = 'INIT_BORAD';
export const RECIEVE_LETTER = 'RECIEVE_LETTER';

// export const ROOM_DISCONNECTED = 'ROOM_DISCONNECTED';
// export const PLAY_MOVE = 'PLAY_MOVE';

export const subscribe_events = (socket) => {
    return dispatch => {
        socket.on('initBoard', (res) => {
            dispatch({
                type: INIT_BORAD,
                payload: res
            });
        });

        socket.on('reveal-letter', (res) => {
            dispatch({
                type: RECIEVE_LETTER,
                payload: {
                    score: 50,
                    letters: [ {ind: 5, val: 'p'}, {ind: 1, val: 'A'} ]
                }
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
