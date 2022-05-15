import {
    INIT_BORAD,
    RECIEVE_LETTER
} from './Board.actions';

const initial_state = {
    sentence: "חתלתול",
    guessedLetters: ['ת', 'A', 'N', 'T'],
    lastLetterUpdated: ['T'],
    scoreForGame: 200,
    scoreStep: 0
}
export default (state = initial_state, action) => {

    switch (action.type) {
        case INIT_BORAD:
            let stepSize = 0;
            const sentenceLength = state.sentence.length;
            if(sentenceLength > 10) {
                stepSize = 5;
            } else {
                stepSize = 10;
            }
            return {
                ...state,
                sentence: action.payload.sentence,
                guessedLetters: [],
                lastLetterUpdated: [],
                scoreForGame: 100,
                scoreStep: stepSize
            };
        case RECIEVE_LETTER:
            const updatedScore = state.scoreForGame - state.scoreStep;
            return {
                ...state,
                guessedLetters: [...state.guessedLetters, action.payload.letter],
                lastLetterUpdated: [action.payload.letter],
                score: updatedScore
            };
        default:
            return state
    }

}

