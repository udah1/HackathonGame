import React, {Component} from 'react'
import {connect}    from 'react-redux'
import Card from 'react-bootstrap/Card'
import {subscribe_events, play_move} from './Board.actions'

class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {
          sentence: "Hello my name is Slim Shady"
        };
        this.gamePlainGrid = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
        // this.socket = props.socket;
        // props.subscribeEvents(this.socket, props);
    }

    renderPlayedText = (number) => {
        return this.props.gameGrid[number] || ''
    };
    renderWord = (word) => {
        return word.split('').map( letter => {
            return (
              <Card style={{ width: '18rem' }}>
                  <Card.Body>
                      <Card.Title>{letter.toUpperCase()}</Card.Title>
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
              <div>
                  {this.renderWord(item)}
              </div>
            );
        });
    };


    render() {
        const {roomNumber, sign, myTurn, playMove} = this.props;
        const {sentence} = this.state;
        if(!sentence) return (<></>);
        return (
            <div className="container containerBoard">
                <div className="row heading-row">
                    {sentence}
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
