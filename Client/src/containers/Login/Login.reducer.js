import {
    START_GAME,
    JOIN_ROOM,
    ROOM_CREATED
} from './Login.actions';

const initial_state = {
    show: true
}

export default (state = initial_state, action) => {

    switch (action.type) {
        case START_GAME:
            return {
                ...state,
                roomNumber: action.payload.roomNumber,
                show: false
            };
        case JOIN_ROOM:
            return {
                ...state
            };
        case ROOM_CREATED:
            return {
                ...state,
                roomNumber: action.payload.roomNumber
            };
        default:
            return state
    }

}

