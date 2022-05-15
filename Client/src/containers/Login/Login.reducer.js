import {
    START_GAME,
    JOIN_ROOM,
    ROOM_CREATED,
    FETCHING_ROOMS,
    ROOMS_FETCHED,
    FETCH_ROOMS_ERROR,
    UPDATE_SELECTED_ROOM
} from './Login.actions';

const initial_state = {
    userName: "",
    availableRooms: [1, 7, 9],
    selectedRoom: null
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
        case FETCHING_ROOMS:
            return {
                ...state,
                fetching: true
        };
        case ROOMS_FETCHED:
            return {
                ...state,
                totalRooms: action.payload.totalRoomCount,
                availableRooms: action.payload.emptyRooms,
                fetching: false
        };
        case FETCH_ROOMS_ERROR:
            return {
                ...state,
                error: action.payload,
                fetching: false
        };
        case UPDATE_SELECTED_ROOM:
            return {
                ...state,
                selectedRoom: action.payload
        };

        default:
            return state
    }

}

