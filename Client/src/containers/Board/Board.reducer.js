import {
    PLAY_MOVE,
    RECEIVE_MOVE
} from './Board.actions';

const initial_state = {
    show: true,
    gameGrid: []
}

export default (state = initial_state, action) => {

    switch (action.type) {
        case PLAY_MOVE:
            return {
                ...state,
                gameGrid: action.gameGrid,
                myTurn: false,
                sign: action.sign
            };
        case RECEIVE_MOVE:
            if (action.payload.winner === null) {
                const gameGrid = state.gameGrid.slice();
                const position = action.payload.position;
                gameGrid[position] = action.payload.playedText
                return {
                    ...state,
                    gameGrid,
                    myTurn: true
                }
            } else {
                alert(action.payload.winner);
                return {
                    ...state,
                    gameGrid: [],
                    myTurn: state.sign === 'X'
                }
            }
        default:
            return state
    }

}

