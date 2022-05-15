import {
    START_GAME
} from './PlayerList.actions';

const initial_state = {
}

export default (state = initial_state, action) => {

    switch (action.type) {
        case START_GAME:
            return {
                ...state,
                roomNumber: action.payload.roomNumber,
            show: false
        };

        default:
            return state
    }

}

