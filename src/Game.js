import React from 'react';

const winnerCombinations = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8]
];

class Game extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      cells: Array(9).fill(null),
      winner: null,
      currentTurn: 1
    }
    this.markCell = this.markCell.bind(this);
  }
  fillCells(value) {
    return value || '';
  }

  markCell(index) {
    const { winner, currentTurn, cells } = this.state;
    let newWinner;

    if (cells[index] !== null) return;
    if (winner) return;

    const currentSign = currentTurn % 2 === 1 ? 'X' : 'O';
    cells[index] = currentSign;

    newWinner = this.checkWinner(cells);

    if (currentTurn === 9 && newWinner === null) {
      newWinner = 'Draw';
    }

    this.setState((prevState) => {
      return {
        cells: cells,
        winner: newWinner,
        currentTurn: prevState.currentTurn + 1
      }
    });
  }

  checkWinner(cells) {
    for (let combination of winnerCombinations) {
      let [index1, index2, index3] = combination;

      if ( cells[index1] !== null && 
        cells[index1] === cells[index2] && 
        cells[index2] === cells[index3] ) {
          return cells[index1];
      };
    };
    return null;
  }

  restartGame() {
    this.setState(prevState => {
      return {
        cells: Array(9).fill(null),
        winner: null,
        currentTurn: 1
      }
    })
  }

  render() {
    const { cells, winner, currentTurn } = this.state;

    const stylesForWinMessage = {
      display: "none"
    };
    winner && ( stylesForWinMessage.display = "block" );

    const stylesForCurrentTurnMessage = {
      display: "block"
    }
    winner && ( stylesForCurrentTurnMessage.display = "none" );

    return (
      <div className="game">
        <div className="current-turn" style={stylesForCurrentTurnMessage}>
          The <span> { (currentTurn % 2 === 1 ) ? `first (X)`: `second (O)` }
          </span> players turn
        </div>
        <div className="field">
          { cells.map((cell, index) => (
            <div 
            key={index} 
            className="field__cell" 
            onClick={() => this.markCell(index)}
            >{ this.fillCells(cell) }</div>
          )) }
        </div>
        <div className="result" style={stylesForWinMessage}>
          { winner !== 'Draw' ?
           `The winner is ${ winner === 'X' ? 'Player 1 (X)' : 'Player 2 (O)'}` 
           : 'Draw'
          }
        </div>
        <div 
        className="restart-btn"
        onClick={() => this.restartGame()}
        >Restart</div>
      </div>
    )
  }
}

export default Game;