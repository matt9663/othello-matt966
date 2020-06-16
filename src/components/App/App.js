import React, { useContext } from "react";
import PageTitle from "../PageTitle/PageTitle";
import Gameboard from "../Gameboard/Gameboard.component";
import Scoreboard from "../Scoreboard/Scoreboard";
import GameOptions from "../GameOptions/GameOptions.component";
import GameContext from "../../context/GameContext";
import "./App.styles.scss";

function App() {
  const game = useContext(GameContext);

  return (
    <div className="App">
      <PageTitle />
      <div className="main-container">
        <GameOptions />
        <Gameboard size={game.gridSize || 8} />
        <Scoreboard />
      </div>
    </div>
  );
}

export default App;
