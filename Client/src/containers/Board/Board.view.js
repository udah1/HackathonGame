import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from "react-router-dom";
import {subscribe_events, play_guess} from './Board.actions'
import Dictaphone from './Dictaphone';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {Form, Card} from'react-bootstrap';
import {get_room_info, reset_game} from '../PlayerList/PlayerList.actions';

class Board extends Component {

  constructor(props) {
    super(props);
    this.socket = props.socket;
    this.sentenceToSubmit = null;
    props.subscribeEvents(this.socket, props);
  }

  componentDidMount() {
    SpeechRecognition.startListening({ continuous: true, language: 'he-IL' });
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if((prevProps.gameStatus && !prevProps.gameStatus.guess && !!this.props.gameStatus.guess)
      ||  this.props.gameStatus.status === "GAME_OVER"
    ){
      this.props.getRoomInfo(this.props.socket);
      this.props.resetGame();
      setTimeout(() => this.props.history.push('/players'), 5000);
    }
  }

  renderSentence = () => {
    const {sentence, lastLetterIndexUpdated} = this.props;
    const myArray = sentence.split(" ");
    let index = 0;
    return myArray.map((item, indexj) => {
      return (
        <span key={indexj}>
          <div className="row sentenceRow" key={indexj}>
            {
              item.split('').map(letter => {
                const letterFormatted = letter.toUpperCase();
                const isIncluded = letter !== '*';
                let styleCalc = isIncluded ? 'CardSelected' : '';

                if (lastLetterIndexUpdated && lastLetterIndexUpdated.length) {
                  styleCalc = styleCalc + (lastLetterIndexUpdated.includes(index) ? ' CardSelectedLast' : '');
                }
                index++;

                return (
                  <Card className={styleCalc} key={index - 1}>
                    <Card.Body>
                      <Card.Title>{isIncluded ? letterFormatted : " "}</Card.Title>
                    </Card.Body>
                  </Card>
                );
              })
            }
          </div>
          <div className="row sentenceRowDivider">
          </div>
        </span>
      );
    });
  };

  submitGuess = (transcript, interimTranscript) => {
    const {playGuess, user, socket, selectedRoom, gameOwner, roomNumber} = this.props;
    let value = '';
    if(!interimTranscript.length) {
      return;
    }
    if(interimTranscript !== this.sentenceToSubmit ) {

      if(interimTranscript.includes(this.sentenceToSubmit)){
        value = interimTranscript.replace(this.sentenceToSubmit, '');
      }
      else {
        value = interimTranscript;
      }
      value = value.trim();
      this.sentenceToSubmit = value.trim();
    }
    if(!!value.length) {
      playGuess(socket, gameOwner ? roomNumber : selectedRoom, value, user);
    }
  };

  render() {
    const {sentence, scoreForGame, gameStatus, selectedCategory} = this.props;
    const {selectedRoom, gameOwner, roomNumber} = this.props;
    console.log("**********  " + gameOwner ? roomNumber : selectedRoom);
    if (!sentence) return (<></>);
    return (
      <div className="container containerBoard">
        <Form.Label className="App-header">גלגל המזל</Form.Label>
        <div className="row scoreForGame">
            <div className="col colScoreLabel">קטגוריה</div>
            <div className="col">{selectedCategory}</div>
        </div>
        <div className="row scoreForGame">
          <div className="col colScoreLabel">זכייה</div>
          <div className="col">{scoreForGame}</div>
        </div>
        <div className="row sentence">
          {this.renderSentence()}
        </div>
        {gameStatus && gameStatus.status === "GAME_OVER" && <div className="row">אף אחד לא ניחש את התשובה</div>
        }
        {(gameStatus && gameStatus.winner) &&
          <div className="row">
            {gameStatus.winner && <div>הזוכה הוא {gameStatus.winner}</div>}
          </div>
        }
        <Dictaphone submitGuess={(transcript, interimTranscript) => this.submitGuess(transcript, interimTranscript)}/>
      </div>

    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    subscribeEvents: (socket, props) => dispatch(subscribe_events(socket, props.sign)),
    playGuess: (socket, number, sentence, user) => dispatch(play_guess(socket, number, sentence, user)),
    getRoomInfo: (socket) => dispatch(get_room_info(socket)),
    resetGame: () => dispatch(reset_game())

  }
}

function mapStateToProps(state) {
  return {
    ...state.reducer.board,
    ...state.reducer.login,
    ...state.reducer.playerList

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Board))
