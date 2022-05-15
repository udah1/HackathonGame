import {
    INIT_BORAD,
    RECIEVE_LETTER
} from './Board.actions';

const initial_state = {
    sentence: "*ת***ל",
    lastLetterIndexUpdated: [5],
    scoreForGame: 200
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
        case RECIEVE_LETTER:
            let {sentence} = state;
            let lastLetterIndexUpdated = [];
            for(let i=0; i < action.payload.letters.length; i++) {
                sentence[action.payload.letters[i].ind] = action.payload.letters[i].val;
                lastLetterIndexUpdated.push(action.payload.letters[i].ind);
            }
            return {
                ...state,
                sentence: sentence,
                lastLetterIndexUpdated: lastLetterIndexUpdated,
                scoreForGame: action.payload.score
            };
        default:
            return state
    }

}

