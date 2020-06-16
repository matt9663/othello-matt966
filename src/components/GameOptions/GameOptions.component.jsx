import React, { useContext, useState } from "react";
import GameContext from "../../context/GameContext";
import "./GameOptions.styles.scss";

const GameOptions = () => {
  const game = useContext(GameContext);
  const [gridRowSize, setGridRowSize] = useState(8);
  const [errorMessage, setErrorMessage] = useState("");
  const changeSettings = (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (gridRowSize % 2 !== 0) {
      setErrorMessage("Grid rows must be an even number between 4 and 16");
    } else {
      game.setSize(gridRowSize);
    }
  };
  return (
    <div className="game-options">
      <form className="options-form" onSubmit={(e) => changeSettings(e)}>
        <div className="color-pickers">
          <label htmlFor="player-one-color">Player One:</label>
          <input
            name="player-one-color"
            type="color"
            onChange={(e) => game.setPlayerColor("playerOne", e.target.value)}
            defaultValue="#000000"
          />
          <label htmlFor="player-two-color">Player Two:</label>
          <input
            name="player-two-color"
            type="color"
            onChange={(e) => game.setPlayerColor("playerTwo", e.target.value)}
            defaultValue="#ffffff"
          />
        </div>
        <div className="grid-size-option">
          <label htmlFor="grid-size">Grid Row Size</label>
          <input
            name="grid-size"
            defaultValue={8}
            type="number"
            step={2}
            min={4}
            max={16}
            onChange={(e) => setGridRowSize(e.target.value)}
          />
          <button type="submit">Set Board</button>
        </div>
      </form>
      <p className="error-message">{errorMessage}</p>
    </div>
  );
};

export default GameOptions;
