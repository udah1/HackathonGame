import {
    INIT_BORAD,
    RECIEVE_LETTER
} from './Board.actions';

const initial_state = {
    sentence: "",
    lastLetterIndexUpdated: [],
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

