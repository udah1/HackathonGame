import {
    INIT_BORAD,
    RECIEVE_LETTER,
    RECEIVE_GUESS,
    ALL_REVEALED
} from './Board.actions';

const initial_state = {
    sentence: "",
    lastLetterIndexUpdated: [],
    scoreForGame: 200,
    gameStatus: {
        user: null,
        winner: null,
        guess: null,
        status: 'NA'
    }
}
export default (state = initial_state, action) => {

    switch (action.type) {
        case INIT_BORAD:
            return {
                ...state,
                sentence: action.payload.sentence,
                guessedLetters: [],
                lastLetterIndexUpdated: [],
                scoreForGame: action.payload.score
            };
        case RECEIVE_GUESS:
            console.log('receive guess ' + JSON.stringify(action.payload))
            return {
                ...state,
                gameStatus: {
                    ...action.payload,
                    status: "GUESSED"
                }
            };
        case ALL_REVEALED:
            console.log('receive data ' + JSON.stringify(action.payload))
            return {
                ...state,
                gameStatus: {
                    ...action.payload,
                    status: "GAME_OVER"
                }
            };
        case RECIEVE_LETTER:
            let {sentence} = state;
            let splittedArray = sentence.split('');
            let lastLetterIndexUpdated = [];
            console.log(JSON.stringify(action.payload));
            for(let i=0; i < action.payload.letters.length; i++) {
                splittedArray[action.payload.letters[i].ind] = action.payload.letters[i].val;
                lastLetterIndexUpdated.push(action.payload.letters[i].ind);
            }
            return {
                ...state,
                sentence: splittedArray.join(''),
                lastLetterIndexUpdated: lastLetterIndexUpdated,
                scoreForGame: action.payload.score
            };
        default:
            return state
    }

}

