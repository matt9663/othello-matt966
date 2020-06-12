import React, { Component } from "react";

const GameContext = React.createContext({
  currentTurn: "playerOne",
  playerOne: "black",
  playerTwo: "white",
  currentScore: [0, 0],
  setPlayerColor: () => {},
  toggleTurn: () => {},
  setScore: () => {},
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
    };
  }
  toggleTurn = () => {
    const { currentTurn } = this.state;
    this.setState({
      currentTurn: currentTurn === "playerOne" ? "playerTwo" : "playerOne",
    });
  };
  setPlayerColor = (player, color) => {
    this.setState({
      [player]: color,
    });
  };
  setScore = (playerOneScore, playerTwoScore) => {
    let scoreArr = [playerOneScore, playerTwoScore];
    this.setState({
      currentScore: scoreArr,
    });
  };
  render() {
    const value = {
      currentTurn: this.state.currentTurn,
      playerOne: this.state.playerOne,
      playerTwo: this.state.playerTwo,
      currentScore: this.state.currentScore,
      setPlayerColor: this.setPlayerColor,
      toggleTurn: this.toggleTurn,
      setScore: this.setScore,
    };
    return (
      <GameContext.Provider value={value}>
        {this.props.children}
      </GameContext.Provider>
    );
  }
}
