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
                payload: res
            });
        });
    }
};
//
// export const play_move = (socket, number, props) => {
//     return dispatch => {
//         if (!props.myTurn) {
//             return;
//         }
//         const gameGrid = props.gameGrid.slice();
//         gameGrid[number] = props.sign;
//         dispatch({
//             type: PLAY_MOVE,
//             gameGrid,
//             sign: props.sign
//         });
//         socket.emit('send-move', {
//             'roomNumber' : props.roomNumber,
//             'playedText': props.sign,
//             'position' : number,
//             "gameGrid": gameGrid
//         });
//     };
// };
