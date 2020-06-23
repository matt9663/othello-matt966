import React, { Component } from "react";

const GameContext = React.createContext({
  currentTurn: "",
  playerOne: "",
  playerTwo: "",
  currentScore: [],
  gridSize: 0,
  setPlayerColor: () => {},
  toggleTurn: () => {},
  setScore: () => {},
  setSize: () => {},
  resetTurnOrder: () => {},
});

export default GameContext;

export class GameProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTurn: "playerOne",
      playerOne: "black",
      playerTwo: "white",
      currentScore: [0, 0],
      gridSize: 8,
    };
  }
  toggleTurn = () => {
    const { currentTurn } = this.state;
    this.setState({
      currentTurn: currentTurn === "playerOne" ? "playerTwo" : "playerOne",
    });
  };
  resetTurnOrder = () => {
    this.setState({ currentTurn: "playerOne" });
  };
  setPlayerColor = (player, color) => {
    this.setState({
      [player]: color,
    });
  };
  setScore = (arr) => {
    this.setState({
      currentScore: arr,
    });
  };
  setSize = (size) => {
    this.setState({ gridSize: size });
  };
  render() {
    const value = {
      currentTurn: this.state.currentTurn,
      playerOne: this.state.playerOne,
      playerTwo: this.state.playerTwo,
      currentScore: this.state.currentScore,
      gridSize: this.state.gridSize,
      setPlayerColor: this.setPlayerColor,
      toggleTurn: this.toggleTurn,
      setScore: this.setScore,
      setSize: this.setSize,
      resetTurnOrder: this.resetTurnOrder,
    };
    return (
      <GameContext.Provider value={value}>
        {this.props.children}
      </GameContext.Provider>
    );
  }
}
