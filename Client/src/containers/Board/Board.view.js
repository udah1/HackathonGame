import React, {Component} from 'react'
import {connect}    from 'react-redux'
import Card from 'react-bootstrap/Card'
import {subscribe_events, play_move} from './Board.actions'

class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sentence: "Elephant ",
            guessedLetters: ['L', 'H', 'A', "S", "B", "I", "E", "M"]
        };
        this.gamePlainGrid = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
        // this.socket = props.socket;
        // props.subscribeEvents(this.socket, props);
    }

    renderPlayedText = (number) => {
        return this.props.gameGrid[number] || ''
    };
    renderWord = (word) => {
        const {guessedLetters} = this.state;
        return word.split('').map( letter => {
            const letterFormatted = letter.toUpperCase();
            const isIncluded = guessedLetters.includes(letterFormatted);
            return (
              <Card className={isIncluded &&  'CardSelected'}>
                  <Card.Body>
                      <Card.Title>{isIncluded ? letterFormatted : " "}</Card.Title>
                  </Card.Body>
              </Card>
            );
        })
    };
    renderSentence = () => {
        const {sentence} = this.state;
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
        const {roomNumber, sign, myTurn, playMove} = this.props;
        const {sentence} = this.state;
        if(!sentence) return (<></>);
        return (
            <div className="container containerBoard">
                <div className="row">
                    {this.renderSentence()}
                </div>
            </div>

        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        subscribeEvents: (socket, props) => dispatch(subscribe_events(socket, props.sign)),
        playMove: (socket, number, props) => dispatch(play_move(socket, number, props))
    }
}

function mapStateToProps(state) {
    return {
        ...state.reducer.board
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
