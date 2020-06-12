import React from "react";
import GameContext from "../../context/GameContext";

const Scoreboard = ({ score }) => {
  return (
    <div className="scoreboard">
      {score[0]}-{score[1]}
    </div>
  );
};

export default Scoreboard;
