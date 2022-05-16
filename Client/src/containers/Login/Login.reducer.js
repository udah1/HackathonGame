import {
    START_GAME,
    ROOM_CREATED,
    ROOMS_FETCHED,
    ROOM_JOINED,
    ROOM_CLEAR,
    UPDATE_SELECTED_ROOM,
    UPDATE_USER_NAME
} from './Login.actions';

import * as PlayerAction from '../PlayerList/PlayerList.actions';

const initial_state = {
    user: "",
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
                user: action.payload
        };
        case ROOMS_FETCHED:
                return {
                    ...state,
                    rooms: action.payload.rooms,
                    selectedRoom: state.selectedRoom || action.payload.selectedRoom
        };
        case ROOM_CLEAR:
            return {
                rooms: [],
                selectedRoom: null,
                roomCreated: false
            };
        case ROOM_JOINED:
            return {
                ...state,
                lastRoomJoiner: action.payload.new,
                currentRoom: action.payload.room,
                gamePlayers: action.payload.room.players,
                roomJoined: true
        };
        case PlayerAction.ROOM_INFO:
            return {
                ...state,
                lastRoomJoiner: action.payload.new,
                currentRoom: action.payload.room,
                gamePlayers: action.payload.room.players,
                roomJoined: true
            };
        case ROOM_CREATED:
                return {
                    ...state,
                    roomNumber: state.roomNumber || action.payload.res.id,
                    gamePlayers: action.payload.res.players,
                    gameOwner: action.payload.gameOwner,
                    roomCreated: true
        };

        default:
            return state
    }

}

