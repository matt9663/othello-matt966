import React, { Component } from "react";
import "./Gameboard.styles.scss";
import Square from "../Square/Square.component";
import GameContext from "../../context/GameContext";
import GameLogic from "./Gameboard.logic";

export default class Gameboard extends Component {
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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.size !== this.props.size) {
      this.setState({
        board: this.createBoard(this.props.size),
      });
      this.context.resetTurnOrder();
    }
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
            claim: "playerTwo",
          });
        } else if (
          (rows + 1 === gridSize / 2 && column + 1 === gridSize / 2 + 1) ||
          (rows + 1 === gridSize / 2 + 1 && column + 1 === gridSize / 2)
        ) {
          row.push({
            coordinates: [rows, column],
            potential: false,
            claim: "playerOne",
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
    this.context.setScore(
      GameLogic.getScore(board, this.context.playerOne, this.context.playerTwo)
    );

    let potentials = GameLogic.checkPossibleMoves(
      board,
      this.context.currentTurn
    );
    this.addPotentialMoves(potentials, board);
    return board;
  };

  claimSquare = (coordinates, player) => {
    const { board } = this.state;
    let potentials = board
      .map((row) => row.filter((row) => row.potential === true))
      .flat()
      .map((row) => row.coordinates);
    this.removePotentialMoves(potentials, board);
    const [x, y] = coordinates;
    board[x][y].claim = player;
    let newBoard = GameLogic.flipSquares(board, coordinates);
    let nextPlayer =
      this.context.currentTurn === "playerOne" ? "playerTwo" : "playerOne";
    let newPotentials = GameLogic.checkPossibleMoves(newBoard, nextPlayer);
    if (!newPotentials.length) {
      let newerPotentials = GameLogic.checkPossibleMoves(
        newBoard,
        this.context.currentTurn
      );
      if (!newerPotentials.length) {
        this.context.setScore(GameLogic.getScore(board));
      } else {
        alert(
          `${
            nextPlayer[0].toUpperCase() +
            nextPlayer.slice(1, 6) +
            " " +
            nextPlayer.slice(6)
          } passes`
        );
        this.context.setScore(GameLogic.getScore(board));
        this.addPotentialMoves(newerPotentials, newBoard);
        this.setState({ board: newBoard, passed: true });
      }
    } else {
      this.addPotentialMoves(newPotentials, newBoard);
      this.setState({ board: newBoard, passed: false });
      this.context.toggleTurn();
      this.context.setScore(GameLogic.getScore(board));
    }
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

  endGame() {
    let { currentScore } = this.context;
    if (currentScore[0] > currentScore[1]) {
      alert("Player 1 wins!");
    } else {
      alert("Player 2 wins!");
    }
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
Gameboard.contextType = GameContext;
