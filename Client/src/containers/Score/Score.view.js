import React, {Component} from 'react';
import {connect}    from 'react-redux';
import Table from 'react-bootstrap/Table'
import { withRouter } from "react-router-dom";


class Score extends Component {

    constructor(props) {
        super(props);
        this.state = {
          players: [
            {name: 'uda', score: 0},
            {name: 'kfir', score: 0},
            {name: 'Batel', score: 0},
            {name: 'Shai', score: 0},
            {name: 'Moshe', score: 0},
          ]
        };
    }

  renderScoreBoard = () => {
        const {players} = this.state;
        return players.map( (item, index) => {
            return (
              <tr key={item.name}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.score}</td>
              </tr>
            );
        });
    };


    render() {
        return (
          <Table striped bordered hover size="sm" className="scoreBoard">
            <thead>
            <tr>
              <th style={{width: '25px'}}>#</th>
              <th style={{width: '200px'}}>Player name</th>
              <th style={{width: '250px'}}>Score</th>
            </tr>
            </thead>
            <tbody>
              {this.renderScoreBoard()}
            </tbody>
          </Table>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Score))
