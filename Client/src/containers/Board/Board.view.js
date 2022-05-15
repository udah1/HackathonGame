import React, {Component} from 'react';
import {connect} from 'react-redux';
import Card from 'react-bootstrap/Card';
import {subscribe_events} from './Board.actions'

class Board extends Component {

  constructor(props) {
    super(props);
    this.socket = props.socket;
    //props.subscribeEvents(this.socket, props);
  }


  renderSentence = () => {
    const {sentence, lastLetterIndexUpdated} = this.props;
    const myArray = sentence.split(" ");
    let index = 0;
    return myArray.map((item, indexj) => {
      return (
        <>
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
        </>

      );
    });
  };


  render() {
    const {sentence, scoreForGame} = this.props;
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
