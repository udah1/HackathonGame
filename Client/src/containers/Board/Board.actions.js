export const RECEIVE_MOVE = 'RECEIVE_MOVE'
export const ROOM_DISCONNECTED = 'ROOM_DISCONNECTED';
export const PLAY_MOVE = 'PLAY_MOVE';

export const subscribe_events = (socket) => {
    return dispatch => {
        socket.on('receive-move', (res) => {
            dispatch({
                type: RECEIVE_MOVE,
                payload: res
            });
            /*return () => {
             socket.disconnect();
             };*/
        });

        socket.on('room-disconnect', (res) => {
            alert('Player Left');
            window.location.reload();
        });
    }
};

export const play_move = (socket, number, props) => {
    return dispatch => {
        if (!props.myTurn) {
            return;
        }
        const gameGrid = props.gameGrid.slice();
        gameGrid[number] = props.sign;
        dispatch({
            type: PLAY_MOVE,
            gameGrid,
            sign: props.sign
        });
        socket.emit('send-move', {
            'roomNumber' : props.roomNumber,
            'playedText': props.sign,
            'position' : number,
            "gameGrid": gameGrid
        });
    };
};
