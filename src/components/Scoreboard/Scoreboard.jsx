import React, { useContext } from "react";
import GameContext from "../../context/GameContext";
import PlayerMarker from "../PlayerMarker/PlayerMarker.component";
import "./Scoreboard.styles.scss";

const Scoreboard = () => {
  const game = useContext(GameContext);
  return (
    <div className="scoreboard">
      <div className="scores">
        <PlayerMarker color={game.playerOne} />
        {game.currentScore[0]}-{game.currentScore[1]}
        <PlayerMarker color={game.playerTwo} />
      </div>
      <div className="current-turn">
        Current Turn: <PlayerMarker color={game[game.currentTurn]} />
      </div>
    </div>
  );
};

export default Scoreboard;
