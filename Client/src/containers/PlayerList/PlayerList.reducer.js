import {
    START_GAME,
    CATEGORIES_FETCHED
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
        case CATEGORIES_FETCHED:
                return {
                    ...state,
                    categories: action.payload,
                show: false
        };

        default:
            return state
    }

}

