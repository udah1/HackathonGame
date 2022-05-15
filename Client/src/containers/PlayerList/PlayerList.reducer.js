import {
    START_GAME,
    CATEGORIES_FETCHED,
    UPDATE_SELECTED_CATEGORY,
    INIT_BORAD,
    RESET_GAME
} from './PlayerList.actions';

const initial_state = {
}

export default (state = initial_state, action) => {

    switch (action.type) {
        case START_GAME:
            return {
                ...state,
                roomNumber: action.payload.roomNumber
        };
        case CATEGORIES_FETCHED:
            return {
                ...state,
                categories: action.payload,
                selectedCategory: state.selectedCategory || action.payload[0]
        };
        case UPDATE_SELECTED_CATEGORY:
            return {
                ...state,
                selectedCategory: action.payload
        };
        case INIT_BORAD:
            return {
                ...state,
                gameStarted: true,
                selectedCategory: action.payload.category
        };
        case RESET_GAME:
            return {
                ...state,
                gameStarted: false
        };

        default:
            return state
    }
}

