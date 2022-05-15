import React, {Component} from 'react';
import {connect}    from 'react-redux';
import Card from 'react-bootstrap/Card';
import {subscribe_events} from './Board.actions'

class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {
          sentence: "חתלתול",
          guessedLetters: ['ת', 'A', 'N', 'T'],
          lastLetterUpdated: ['T'],
          scoreForGame: 100
        };
        this.socket = props.socket;
        //props.subscribeEvents(this.socket, props);
    }

    renderWord = (word) => {
        const {guessedLetters, lastLetterUpdated} = this.state;
        return word.split('').map( letter => {
            const letterFormatted = letter.toUpperCase();
            const isIncluded = guessedLetters.includes(letterFormatted);
            let styleCalc = isIncluded ? 'CardSelected' : '';
            styleCalc = styleCalc + (lastLetterUpdated.includes(letterFormatted) ? ' CardSelectedLast' : '');
            return (
              <Card className={styleCalc}>
                  <Card.Body>
                      <Card.Title>{isIncluded ? letterFormatted : " "}</Card.Title>
                  </Card.Body>
              </Card>
            );
        })
    };
    renderSentence = () => {
      const {sentence} = this.props;
        const myArray = sentence.split(" ");
        return myArray.map( item => {
            return (
              <>
                  <div className="row sentenceRow">
                      {this.renderWord(item)}
                  </div>
                  <div className="row sentenceRowDivider">
                  </div>
              </>

            );
        });
    };


    render() {
      const {sentence, scoreForGame} = this.props;
        if(!sentence) return (<></>);
        return (
            <div className="container containerBoard">
              <div className="row scoreForGame">
                <div className="col colScoreLabel">Score</div>
                <div className="col">{scoreForGame}</div>
              </div>
                <div className="row sentence">
                    {this.renderSentence()}
                </div>
            </div>

        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
      subscribeEvents: (socket, props) => dispatch(subscribe_events(socket, props.sign)),
    }
}

function mapStateToProps(state) {
    return {
        ...state.reducer.board
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
