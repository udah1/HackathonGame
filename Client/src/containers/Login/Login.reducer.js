import {
    START_GAME,
    ROOM_CREATED,
    ROOMS_FETCHED,
    ROOM_JOINED,
    UPDATE_SELECTED_ROOM,
    UPDATE_USER_NAME
} from './Login.actions';

const initial_state = {
    userName: "",
    rooms: [],
    selectedRoom: null,
    roomCreated: false
}

export default (state = initial_state, action) => {

    switch (action.type) {
        case UPDATE_SELECTED_ROOM:
            return {
                ...state,
                selectedRoom: action.payload
        };
        case UPDATE_USER_NAME:
            return {
                ...state,
                userName: action.payload
        };
        case ROOMS_FETCHED:
                return {
                    ...state,
                    rooms: action.payload
        };
        case ROOM_JOINED:
            return {
                ...state,
                lastRoomJoiner: action.payload.newUser
        };
        case ROOM_CREATED:
                return {
                    ...state,
                    roomNumber: action.payload.roomNumber,
                roomCreated: true
        };
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

