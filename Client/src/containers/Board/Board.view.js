import React, {Component} from 'react';
import {connect}    from 'react-redux';
import Card from 'react-bootstrap/Card';

class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sentence: "חתול",
            guessedLetters: ['ח', 'H', 'A', "S", "B", "I", "ל", "M"]
        };
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
    }
}

function mapStateToProps(state) {
    return {
        ...state.reducer.board
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
