import React, {Component} from 'react';
import {connect} from 'react-redux';
import Card from 'react-bootstrap/Card';
import { withRouter } from "react-router-dom";
import {subscribe_events, play_guess} from './Board.actions'
import Dictaphone from './Dictaphone';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

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
    const {sentence, scoreForGame, gameStatus} = this.props;
    if (!sentence) return (<></>);
    return (
      <div className="container containerBoard">
        <div className="row scoreForGame">
          <div className="col colScoreLabel">Score</div>
          <div className="col">{scoreForGame}</div>
        </div>
        <div className="row sentence">
          {this.renderSentence()}
        </div>
        {gameStatus && gameStatus.status === "GAME_OVER" && <div className="row">No one guessed</div>
        }
        {gameStatus && gameStatus.winner &&
          <div className="row">
            {gameStatus.winner && <div>Winner is {gameStatus.winner}</div>}
            <div>Sentence `{gameStatus.guess}` was guessed by {gameStatus.user}</div>
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
    playGuess: (socket, number, sentence, user) => dispatch(play_guess(socket, number, sentence, user))
  }
}

function mapStateToProps(state) {
  return {
    ...state.reducer.board,
    ...state.reducer.login

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Board))
