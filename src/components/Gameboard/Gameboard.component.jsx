import React, { Component } from "react";
import "./Gameboard.styles.scss";
import Square from "../Square/Square.component";
import GameContext from "../../context/GameContext";
import GameLogic from "./Gameboard.logic";

export default class Gameboard extends Component {
  static contextType = GameContext;
  constructor(props) {
    super(props);
    this.state = {
      board: [],
    };
  }
  componentDidMount() {
    const { size } = this.props;
    this.setState({ board: this.createBoard(size) });
  }

  createBoard = (gridSize) => {
    let board = [];
    for (let rows = 0; rows < gridSize; rows++) {
      let row = [];
      for (let column = 0; column < gridSize; column++) {
        if (
          (rows + 1 === gridSize / 2 && column + 1 === gridSize / 2) ||
          (rows + 1 === gridSize / 2 + 1 && column + 1 === gridSize / 2 + 1)
        ) {
          row.push({
            coordinates: [rows, column],
            potential: false,
            claim: this.context.playerTwo,
          });
        } else if (
          (rows + 1 === gridSize / 2 && column + 1 === gridSize / 2 + 1) ||
          (rows + 1 === gridSize / 2 + 1 && column + 1 === gridSize / 2)
        ) {
          row.push({
            coordinates: [rows, column],
            potential: false,
            claim: this.context.playerOne,
          });
        } else
          row.push({
            coordinates: [rows, column],
            potential: false,
            claim: null,
          });
      }
      board.push(row);
    }
    this.props.updateScore(
      GameLogic.getScore(board, this.context.playerOne, this.context.playerTwo)
    );

    let potentials = GameLogic.checkPossibleMoves(
      board,
      this.context[this.context.currentTurn]
    );
    this.addPotentialMoves(potentials, board);
    return board;
  };
  claimSquare = (coordinates, color) => {
    const { board } = this.state;
    let potentials = board
      .map((row) => row.filter((row) => row.potential === true))
      .flat()
      .map((row) => row.coordinates);
    this.removePotentialMoves(potentials, board);
    const [x, y] = coordinates;
    board[x][y].claim = color;
    let newBoard = GameLogic.flipSquares(board, coordinates);
    let nextPlayer =
      this.context.currentTurn === "playerOne" ? "playerTwo" : "playerOne";
    let newPotentials = GameLogic.checkPossibleMoves(
      newBoard,
      this.context[nextPlayer]
    );
    if (newPotentials.length) {
      this.addPotentialMoves(newPotentials, newBoard);
    }
    this.setState({ board: newBoard });
    this.context.toggleTurn();
    this.props.updateScore(
      GameLogic.getScore(board, this.context.playerOne, this.context.playerTwo)
    );
  };
  addPotentialMoves(squares, board) {
    squares.forEach((square) => {
      const [x, y] = square;
      board[x][y].potential = true;
    });
  }
  removePotentialMoves(squares, board) {
    squares.forEach((square) => {
      const [x, y] = square;
      board[x][y].potential = false;
    });
  }

  render() {
    const { size } = this.props;
    const { board } = this.state;

    return (
      <div
        className="gameboard"
        style={{
          gridTemplateColumns: `repeat(${size}, minmax(max-content, max-content))`,
        }}
      >
        {[...board].map((row) =>
          [...row].map((square) => (
            <Square
              key={square.coordinates}
              coordinates={square.coordinates}
              claim={square.claim}
              potential={square.potential}
              size={size}
              claimSquare={this.claimSquare}
            />
          ))
        )}
      </div>
    );
  }
}
