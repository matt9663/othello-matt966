import React, { useContext } from "react";
import "./Square.styles.scss";
import GameContext from "../../context/GameContext";

const Square = ({
  coordinates,
  claim = null,
  potential = false,
  size,
  claimSquare,
}) => {
  const game = useContext(GameContext);
  function clickSquare(e) {
    if (!claim && potential) {
      claimSquare(coordinates, game.currentTurn);
    }
  }
  return (
    <div
      className={`square ${potential ? "highlighted" : ""}`}
      style={{
        height: `calc((93/${size}) * 1vw)`,
        width: `calc((93/${size}) * 1vw)`,
      }}
      onClick={(e) => clickSquare(e)}
    >
      <div
        className="square-marker"
        style={{
          height: `95%`,
          width: `95%`,
          borderRadius: "50%",
          backgroundColor: `${claim ? game[claim] : "inherit"}`,
        }}
      />
    </div>
  );
};

export default Square;
